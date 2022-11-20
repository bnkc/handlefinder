from typing import Any
from fastapi import APIRouter


router = APIRouter()


@router.get("/test")
def test_api() -> Any:
    return {"msg": 1}
