import requests
import json
import sys

def test_boardroom_api():
    url = "http://localhost:8000/api/boardroom"
    payload = {
        "question": "Should we switch from flat subscription pricing to a strict credit-based usage model next month to capture developer market share?"
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    print(f"Sending POST request to: {url}...")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=120)
        
        print(f"\nResponse Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("\nSuccess! Response received:")
            print(json.dumps(response.json(), indent=2))
            
            # Simple verification checks
            data = response.json()
            required_keys = ["decision", "confidence", "agents", "risks", "next_steps"]
            missing_keys = [k for k in required_keys if k not in data]
            
            if missing_keys:
                print(f"\nError: Response is missing keys: {missing_keys}")
                sys.exit(1)
            else:
                print("\nVerification Passed: Response schema matches specifications.")
        else:
            print(f"\nError: API request failed with detail:")
            print(response.text)
            sys.exit(1)
            
    except requests.exceptions.ConnectionError:
        print("\nError: Connection Refused. Please make sure the FastAPI server is running on port 8000.")
        sys.exit(1)
    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    test_boardroom_api()
