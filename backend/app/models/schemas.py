from pydantic import BaseModel, Field
from typing import List, Optional

class BoardroomRequest(BaseModel):
    question: str = Field(..., description="The founder's business decision or question.")

class AgentAnalysis(BaseModel):
    role: str = Field(..., description="The role/agent name (e.g., CEO, CFO, CTO, CMO, Risk, Blind Spot).")
    analysis: str = Field(..., description="The detailed analysis and perspective provided by this agent.")
    name: Optional[str] = Field(None, description="The human-like name of the agent.")
    vote: Optional[str] = Field(None, description="The vote of this agent (e.g., Yes, No, Conditional).")
    confidence: Optional[int] = Field(None, description="The confidence score of this agent (0-100).")

class BoardroomResponse(BaseModel):
    decision: str = Field(..., description="The final boardroom verdict/recommendation.")
    confidence: int = Field(..., description="The overall confidence score of the decision (0-100).")
    agents: List[AgentAnalysis] = Field(..., description="The list of agent analyses.")
    risks: List[str] = Field(..., description="Key risks identified during the debate.")
    next_steps: List[str] = Field(..., description="Recommended next actions.")
