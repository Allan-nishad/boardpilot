import os
from openai import OpenAI
from dotenv import load_dotenv
from swarm import Swarm, Agent

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Apply our request payload wrapper to fix Gemini OpenAI-compatibility bugs
original_create = client.chat.completions.create

def patched_create(*args, **kwargs):
    messages = kwargs.get("messages", [])
    new_messages = []
    for msg in messages:
        if hasattr(msg, "model_dump"):
            msg_dict = msg.model_dump(exclude_none=True)
        elif isinstance(msg, dict):
            msg_dict = msg.copy()
        else:
            msg_dict = dict(msg)
            
        # Strip fields that are None or not allowed in Gemini compat layer
        keys_to_remove = ["refusal", "function_call", "audio", "annotations"]
        for key in keys_to_remove:
            if key in msg_dict:
                if msg_dict[key] is None:
                    del msg_dict[key]
                    
        # Do NOT strip extra_content (keep it intact for thought_signature validation)
        if "tool_calls" in msg_dict and msg_dict["tool_calls"]:
            new_tool_calls = []
            for tc in msg_dict["tool_calls"]:
                if hasattr(tc, "model_dump"):
                    tc_dict = tc.model_dump(exclude_none=True)
                elif isinstance(tc, dict):
                    tc_dict = tc.copy()
                else:
                    tc_dict = dict(tc)
                new_tool_calls.append(tc_dict)
            msg_dict["tool_calls"] = new_tool_calls
            
        if msg_dict.get("content") is None and "tool_calls" in msg_dict:
            msg_dict["content"] = ""
            
        new_messages.append(msg_dict)
        
    kwargs["messages"] = new_messages
    return original_create(*args, **kwargs)

client.chat.completions.create = patched_create

swarm_client = Swarm(client=client)

def transfer_to_cfo(context: str):
    """Transfer to CFO. Pass context as argument."""
    print(f"CEO handoff: {context}")
    return cfo_agent

ceo_agent = Agent(
    name="Sarah Jenkins",
    instructions="You are CEO. Immediately call transfer_to_cfo and state that you are handing off.",
    functions=[transfer_to_cfo],
    model="gemini-3.5-flash"
)

cfo_agent = Agent(
    name="Thomas Wright",
    instructions="You are CFO. Provide brief 1 sentence financial approval and finish.",
    functions=[],
    model="gemini-3.5-flash"
)

try:
    print("Running debug swarm with patched client (keeping extra_content)...")
    response = swarm_client.run(
        agent=ceo_agent,
        messages=[{"role": "user", "content": "Start the boardroom debate."}],
        max_turns=5
    )
    print("\nSwarm execution completed successfully! Messages:")
    for msg in response.messages:
        print(f"[{msg.get('sender') or msg.get('role')}]: {msg.get('content') or msg.get('tool_calls')}")
except Exception as e:
    import traceback
    traceback.print_exc()
