from typing import Any

from fastapi import FastAPI, Request, WebSocket
from fastapi.responses import FileResponse
from app.core import settings
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.api.api import api_router
from starlette.middleware.cors import CORSMiddleware

templates_dir = "../frontend/build"
static_dir = "../frontend/build/static"

openapi_url = f"{settings.API_V1_STR}/openapi.json"
app = FastAPI(title=settings.PROJECT_NAME, openapi_url=openapi_url)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_websockets=True,
    )

app.mount("/static/", StaticFiles(directory=static_dir), name="static")
app.include_router(api_router, prefix=settings.API_V1_STR)
templates = Jinja2Templates(directory=templates_dir)


@app.get("/{full_path:path}", response_class=FileResponse, tags=["frontend"])
async def home(request: Request, full_path: str) -> Any:
    return templates.TemplateResponse("index.html", {"request": request})
