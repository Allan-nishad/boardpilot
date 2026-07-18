from fastapi import APIRouter, HTTPException
from ..models.schemas import BoardroomRequest, BoardroomResponse
from ..swarm.orchestrator import run_boardroom_swarm

router = APIRouter()

@router.post("/boardroom", response_model=BoardroomResponse)
async def analyze_decision(payload: BoardroomRequest):
    """
    Exposes POST /api/boardroom to run the boardroom simulation.
    Under the hood, coordinates multiple OpenSwarm agents to debate, audit,
    and synthesize a final decision recomendation for the founder.
    """
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    try:
        response = run_boardroom_swarm(payload.question)
        return response
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while executing the boardroom swarm: {str(e)}"
        )
