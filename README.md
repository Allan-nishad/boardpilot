# BoardPilot ✈️

> **Think Like a Board. Decide Like a Founder.**

BoardPilot is an AI-powered Executive Boardroom simulator designed to help startup founders validate strategic business decisions. When a founder submits a decision or proposal, a multi-agent executive board (CEO, CFO, CTO, CMO, Risk, and Devil's Advocate) simulates a live debate, aligns their votes, and synthesizes an official **Joint Board Resolution and Executive Memorandum**.

---

## 🚀 Key Features

* **Multi-Agent Boardroom Swarm**: Powered by OpenAI Swarm and mapped to **Google Gemini 2.5/3.5 Flash** models via an OpenAI-compatibility layer.
* **Specialized Executive Personas**:
  * **Sarah Jenkins (CEO)**: Focuses on core strategic mission alignment.
  * **Thomas Wright (CFO)**: Analyzes cash runway, ROI, capital buffers, and unit economics.
  * **Dr. Aris Thorne (CTO)**: Evaluates codebase scaling, technical feasibility, infrastructure overhead, and database layout.
  * **Clara Novak (Marketing)**: Assesses Customer Acquisition Cost (CAC), competitive churn offset, and market demand.
  * **Marcus Vance (Risk)**: Audits regulatory volatility, data compliance (GDPR/SOC2), and operational risks.
  * **Swarm Audit Core (Devil's Advocate)**: Uncovers strategic blind spots and competitive moats.
* **Premium Dashboard UI**: Built with a sleek dark-themed, glassmorphic layout using Next.js and Tailwind CSS:
  * **Memo Tab**: Displays the compiled Resolution Verdict, Evaluated Risks, and checklist of Next Action Items.
  * **Swarm Debate Tab**: Houses active agent cards. Click any agent to inspect their custom analysis, vote, and confidence ratings in a dedicated pane.
  * **Voting Matrix Tab**: Summarizes the official voting matrix (YES, NO, CONDITIONAL) and consensus scores.

---

## 🛠️ Architecture

```
[ Founder Input ]  ──>  [ Next.js Frontend ]
                                │
                                ▼ (POST /api/boardroom)
                        [ FastAPI Backend ]
                                │
                                ▼ (OpenAI Swarm Client)
                  [ Gemini API Compatibility Layer ]
                                │
   ┌───────────────────┬────────┴──────────┬──────────────────┐
   ▼                   ▼                   ▼                  ▼
[ CEO Agent ]    [ CFO Agent ]       [ CTO Agent ]      [ CMO Agent ] ...
   │                   │                   │                  │
   └───────────────────┴────────┬──────────┴──────────────────┘
                                ▼
                       [ Risk / Blind Spot ]
                                │
                                ▼
                      [ Synthesizer Verdict ]
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Allan-nishad/boardpilot.git
cd boardpilot
```

### 2. Backend Setup (FastAPI & Swarm)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables. Copy `.env.example` to `.env` and fill in your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Modify `.env`:
   ```env
   GEMINI_API_KEY=your_real_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```
5. Start the backend API server:
   ```bash
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```

### 3. Frontend Setup (Next.js)
1. Go back to the root folder:
   ```bash
   cd ..
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to: `http://localhost:3000/decision`

---

## 📊 Testing the Application

### Free Tier API Quota Safety & Presets
To prevent hitting Google AI Studio Free Tier rate limits (15 RPM), BoardPilot contains **pre-compiled swarm simulations** for key founder scenarios. If you use one of the following prompt templates, the frontend will bypass the API and load a scenario-specific boardroom dashboard immediately:
* **Pricing Switch**: *"Should we switch from flat subscription pricing to a strict credit-based usage model next month to capture developer market share?"*
* **Team Scaling**: *"Should we expand our engineering spend by 18% in Q3 to accelerate the AI core modules?"*
* **SaaS Migration**: *"Should we deprecate the legacy on-premise offering and migrate all enterprise clients to the managed cloud tier next quarter?"*

*If you write a completely custom prompt and your Gemini API key fails or hits a rate limit, the system gracefully falls back to a custom mock boardroom debate context so you can still view the full dashboard functionality.*
