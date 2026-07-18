import os
from openai import OpenAI
from swarm import Swarm

def get_swarm_client() -> Swarm:
    """
    Initializes and returns the OpenAI Swarm client configured to target 
    Google's Gemini OpenAI-compatible API.
    """
    # Accept either GEMINI_API_KEY or fall back to OPENAI_API_KEY
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")
    
    if not api_key or api_key in ["placeholder_or_real_key", "your_gemini_api_key_here"]:
        raise ValueError("GEMINI_API_KEY environment variable is not configured. Please set it in your .env file.")
    
    # Configure to call Google Gemini's OpenAI-compatible API endpoint
    openai_client = OpenAI(
        api_key=api_key,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )
    
    # Apply our request payload wrapper to fix Gemini OpenAI-compatibility bugs
    original_create = openai_client.chat.completions.create

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

    openai_client.chat.completions.create = patched_create
    
    return Swarm(client=openai_client)

