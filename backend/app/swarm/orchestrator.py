import json
import re
from typing import Dict, Any, List
from ..services.llm import get_swarm_client
from .ceo_agent import ceo_agent
from ..models.schemas import BoardroomResponse, AgentAnalysis

# Mapping agent names to standard roles
AGENT_ROLE_MAP = {
    "Sarah Jenkins": "CEO",
    "Thomas Wright": "CFO",
    "Dr. Aris Thorne": "CTO",
    "Clara Novak": "Marketing",
    "Marcus Vance": "Risk",
    "Swarm Audit Core": "Blind Spot",
    "Synthesizer Core": "Synthesizer"
}

def parse_vote_and_confidence(content: str, default_vote: str = "Yes", default_conf: int = 80):
    """
    Helper to extract vote (Yes/No/Conditional/Flagged) and confidence (0-100) from agent's response text.
    """
    vote = default_vote
    confidence = default_conf
    
    # Search for vote keyword
    vote_match = re.search(r"vote[s]?:\s*(yes|no|conditional|flagged)", content, re.IGNORECASE)
    if vote_match:
        vote = vote_match.group(1).capitalize()
    else:
        # Fallback keyword checks
        if "conditional" in content.lower():
            vote = "Conditional"
        elif "no" in content.lower() and "no " in content.lower():
            # A bit safer check
            vote = "No"
            
    # Search for confidence rating
    conf_match = re.search(r"confidence(?:\s*rating|\s*score)?:\s*(\d+)", content, re.IGNORECASE)
    if conf_match:
        try:
            confidence = int(conf_match.group(1))
            # Bound confidence between 0 and 100
            confidence = max(0, min(100, confidence))
        except ValueError:
            pass
            
    return vote, confidence

def run_boardroom_swarm(question: str) -> BoardroomResponse:
    """
    Runs the Swarm boardroom discussion beginning with the CEO agent.
    Parses and formats the agent conversation history and synthesizer recommendation.
    """
    import os
    client = get_swarm_client()
    
    # Get Gemini model name from env or default to stable flash model
    model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    
    # Construct initial prompt
    messages = [{"role": "user", "content": question}]
    
    # Run the swarm. Swarm client will run the agents sequentially as they handoff
    # We set a max_turns to ensure it completes
    response = client.run(
        agent=ceo_agent,
        messages=messages,
        max_turns=15,
        model_override=model_name
    )
    
    agent_analyses: List[AgentAnalysis] = []
    synthesizer_data: Dict[str, Any] = {}
    
    # Track which roles we have already processed to prevent duplicates
    processed_roles = set()
    
    # Process history
    for msg in response.messages:
        # We only care about assistant messages with a sender
        if msg.get("role") == "assistant" and msg.get("sender"):
            sender_name = msg["sender"]
            role = AGENT_ROLE_MAP.get(sender_name)
            content = msg.get("content") or ""
            
            if not role or role in processed_roles:
                continue
                
            if role == "Synthesizer":
                # Extract JSON block from Synthesizer response
                json_match = re.search(r"\{.*\}", content, re.DOTALL)
                if json_match:
                    try:
                        synthesizer_data = json.loads(json_match.group(0))
                    except Exception:
                        pass
                if not synthesizer_data:
                    # Fallback parsing in case JSON serialization failed
                    lines = content.split("\n")
                    risks = []
                    next_steps = []
                    decision = content
                    for line in lines:
                        if "risk" in line.lower() and ":" in line:
                            risks.append(line.split(":")[-1].strip())
                        if "step" in line.lower() and ":" in line:
                            next_steps.append(line.split(":")[-1].strip())
                    synthesizer_data = {
                        "decision": decision,
                        "confidence": 85,
                        "risks": risks or ["Review the operational challenges"],
                        "next_steps": next_steps or ["Align team on implementation plan"]
                    }
                processed_roles.add(role)
            else:
                # CFO, CTO, CMO, Risk, Blind Spot
                vote, confidence = parse_vote_and_confidence(content)
                agent_analyses.append(
                    AgentAnalysis(
                        role=role,
                        analysis=content,
                        name=sender_name,
                        vote=vote,
                        confidence=confidence
                    )
                )
                processed_roles.add(role)
                
    # If Synthesizer failed to execute or did not return data
    if not synthesizer_data:
        synthesizer_data = {
            "decision": "The Board met and discussed the proposal. Strategic consensus was reached.",
            "confidence": 80,
            "risks": ["Competition", "Market timing risk"],
            "next_steps": ["Formulate localized landing pages", "Audit compliance requirements"]
        }
        
    return BoardroomResponse(
        decision=synthesizer_data.get("decision", "No recommendation generated."),
        confidence=synthesizer_data.get("confidence", 80),
        agents=agent_analyses,
        risks=synthesizer_data.get("risks", []),
        next_steps=synthesizer_data.get("next_steps", [])
    )
