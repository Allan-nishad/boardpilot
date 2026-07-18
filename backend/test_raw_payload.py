import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

# Base payload with only extra fields added
payload = {
  "messages": [
    {"role": "system", "content": "You are CFO. Say hi and finish."},
    {"role": "user", "content": "Hello"},
    {
      "content": None,
      "role": "assistant",
      "refusal": None,
      "function_call": None,
      "tool_calls": [
        {
          "id": "336nx1ty",
          "function": {
            "arguments": '{"context":"User initiated contact. Transferring to CFO as instructed."}',
            "name": "transfer_to_cfo"
          },
          "type": "function"
        }
      ]
    }
  ],
  "model": "gemini-3.5-flash",
  "stream": False
}

def test_payload(name, payload_data):
    print(f"Testing {name}...")
    res = requests.post(url, headers=headers, json=payload_data)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}\n")

# Test 1: With refusal=None
p1 = json.loads(json.dumps(payload))
p1["messages"][2]["refusal"] = None
test_payload("Payload with refusal=None", p1)

# Test 2: With function_call=None
p2 = json.loads(json.dumps(payload))
p2["messages"][2]["function_call"] = None
test_payload("Payload with function_call=None", p2)

# Test 3: With both None
p3 = json.loads(json.dumps(payload))
p3["messages"][2]["refusal"] = None
p3["messages"][2]["function_call"] = None
test_payload("Payload with refusal=None AND function_call=None", p3)
