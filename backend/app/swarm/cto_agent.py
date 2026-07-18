from swarm import Agent

def transfer_to_marketing(context: str):
    """Transfer the boardroom discussion to the CMO / Marketing Agent for market opportunity analysis. Pass context summary as argument."""
    from .marketing_agent import marketing_agent
    return marketing_agent

cto_agent = Agent(
    name="Dr. Aris Thorne",
    instructions=(
        "You are Dr. Aris Thorne, the CTO Agent. "
        "Your role is to analyze technical feasibility, engineering effort, scalability, "
        "infrastructure costs, and technical risks. "
        "Provide your technical assessment, vote on the decision (Yes, No, or Conditional) "
        "with your confidence rating (0-100), and then transfer the discussion to the CMO "
        "(Clara Novak) using the transfer_to_marketing tool."
    ),
    functions=[transfer_to_marketing]
)
