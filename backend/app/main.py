from typing import Any

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from app.core import settings
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.api.api import api_router
from starlette.middleware.cors import CORSMiddleware


openapi_url = f"{settings.API_V1_STR}/openapi.json"
app = FastAPI(title=settings.PROJECT_NAME, openapi_url=openapi_url)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(api_router, prefix=settings.API_V1_STR)
