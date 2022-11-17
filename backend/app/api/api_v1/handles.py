from typing import Any

from fastapi import APIRouter
from app import schemas

router = APIRouter()


@router.get("/{username}", response_model=schemas.User)
def return_handles(username: str):
    return {"username": "hahahha fuck you"}
