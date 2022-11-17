from typing import Any

from fastapi import FastAPI, Request, APIRouter
from .api_v1 import handles

api_router = APIRouter()


api_router.include_router(handles.router, prefix="/handles", tags=["handles"])
