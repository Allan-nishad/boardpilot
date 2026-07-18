# BoardPilot AI Swarm Backend

This is the backend service for BoardPilot, built with **FastAPI** and orchestrating multi-agent boardroom simulations using OpenAI's **Swarm** framework.

## Architecture

```
backend/
├── app/
│   ├── main.py               # FastAPI application entrypoint & CORS setup
│   ├── routes/
│   │   └── boardroom.py      # /api/boardroom POST endpoint
│   ├── swarm/
│   │   ├── orchestrator.py   # Multi-agent Swarm setup and response parsing
│   │   ├── ceo_agent.py      # Sarah Jenkins (CEO Agent)
│   │   ├── cfo_agent.py      # Thomas Wright (CFO Agent)
│   │   ├── cto_agent.py      # Dr. Aris Thorne (CTO Agent)
│   │   ├── marketing_agent.py# Clara Novak (CMO Agent)
│   │   ├── risk_agent.py     # Marcus Vance (Risk Agent)
│   │   ├── blindspot_agent.py# Swarm Audit Core (Devil's Advocate)
│   │   └── synthesizer_agent.py# Synthesizer Core (Consensus Verdict compiler)
│   ├── services/
│   │   └── llm.py            # Swarm & OpenAI client builder
│   └── models/
│       └── schemas.py        # Pydantic request/response validation schemas
│
├── requirements.txt          # Python dependencies
├── .env.example              # Env template
└── README.md                 # Setup manual
```

## Setup & Running Instructions

### 1. Requirements
- Python 3.10+
- Git (to install Swarm from GitHub)
- Active `GEMINI_API_KEY`

### 2. Install Dependencies
It is recommended to run inside a virtual environment:
```bash
# Create and activate a virtual environment
python -m venv venv
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install required packages
pip install -r requirements.txt
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your Gemini API Key:
```bash
copy .env.example .env
```
Open `.env` and replace `your_gemini_api_key_here` with your actual Gemini API key from Google AI Studio. You can also specify the Gemini model to target (defaults to `gemini-1.5-flash`).

### 4. Start the API Server
Run the FastAPI development server:
```bash
uvicorn app.main:app --reload --port 8000
```
The server will start at: `http://localhost:8000`. You can access interactive Swagger documentation at `http://localhost:8000/docs`.

---

## API Spec

### **POST** `/api/boardroom`

#### Request Payload
```json
{
  "question": "Should we switch from flat subscription pricing to a strict credit-based usage model next month to capture developer market share?"
}
```

#### Response Format
```json
{
  "decision": "The Board recommends proceeding with a phased pilot of credit-based pricing in Q4 rather than a complete replacement next month. This captures dev-centric upsells while mitigating immediate ARR churn.",
  "confidence": 85,
  "agents": [
    {
      "role": "CFO",
      "name": "Thomas Wright",
      "analysis": "Calculated run-rate impacts show high upsell potential, but strict transition risks up to 8% ARR churn if not pilot-tested. A pilot retains predictability.",
      "vote": "Conditional",
      "confidence": 82
    },
    {
      "role": "CTO",
      "name": "Dr. Aris Thorne",
      "analysis": "Credit calculation and billing infrastructure changes require at least 6 weeks of engineering effort. Recommends queue-based tracking.",
      "vote": "Conditional",
      "confidence": 90
    }
  ],
  "risks": [
    "Billing engine implementation delays",
    "Customer churn due to confusing pricing structures"
  ],
  "next_steps": [
    "Build prototype credit meter in staging",
    "Run closed pilot with 20 developer accounts"
  ]
}
```

---

## Test Verification

Run the verification test script:
```bash
python test_request.py
```
This sends a sample question to the running server and verifies the response format matches the requested schema.
