from swarm.util import function_to_json
import json

def transfer_to_cfo(context: str):
    """Transfer to CFO. Pass context as argument."""
    return None

print(json.dumps(function_to_json(transfer_to_cfo), indent=2))
