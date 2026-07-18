from swarm import Agent

def transfer_to_cto(context: str):
    """Transfer the boardroom discussion to the CTO for technical and feasibility analysis. Pass context summary as argument."""
    from .cto_agent import cto_agent
    return cto_agent

cfo_agent = Agent(
    name="Thomas Wright",
    instructions=(
        "You are Thomas Wright, the CFO Agent. "
        "Your role is to analyze the financial impact of the founder's proposal. "
        "Focus on: cost projection, revenue potential, ROI, cash runway, and financial risks. "
        "Conduct your analysis, summarize it clearly, vote on the decision (Yes, No, or Conditional) "
        "with your confidence rating (0-100), and then transfer the discussion to the CTO "
        "(Dr. Aris Thorne) using the transfer_to_cto tool."
    ),
    functions=[transfer_to_cto]
)
