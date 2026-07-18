import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key present: {bool(api_key)}")

client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Test models for 2026
test_models = [
    "gemini-3.5-flash",
    "gemini-3.5-pro",
    "gemini-3.0-flash",
    "gemini-3.0-pro"
]

for model in test_models:
    try:
        print(f"Testing model: {model}...")
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": "Hi"}],
            max_tokens=10
        )
        print(f"Success with {model}: {response.choices[0].message.content}\n")
    except Exception as e:
        print(f"Failed with {model}: {e}\n")
