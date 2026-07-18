from swarm import Agent

def transfer_to_cfo(context: str):
    """Transfer the boardroom discussion to the CFO for financial analysis. Pass context summary as argument."""
    from .cfo_agent import cfo_agent
    return cfo_agent

ceo_agent = Agent(
    name="Sarah Jenkins",
    instructions=(
        "You are Sarah Jenkins, the CEO of BoardPilot. "
        "Your role is to lead the board discussion, understand the founder's question, "
        "and coordinate the review. Initiate the meeting by summarizing the context "
        "and immediately hand over to the CFO (Thomas Wright) for financial audit by invoking "
        "the transfer_to_cfo tool. Do not try to answer the financial details yourself."
    ),
    functions=[transfer_to_cfo]
)
