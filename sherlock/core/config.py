import os
from typing import List
from dotenv import load_dotenv
from pydantic import BaseSettings, AnyHttpUrl


load_dotenv()


class Settings(BaseSettings):
    """Global settings for the app."""

    ENV: str = os.environ.get("ENV", "DEV")
    host: str = "https://api.gotinder.com"
    DOMAIN = "https://www.handlefinder.com/"
    EMAILS_ENABLED: bool = True
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    PROJECT_NAME: str = "Handle Finder"
    API_V1_STR = "/api/v1"

    class Config:
        case_sensitive = True


settings = Settings()
