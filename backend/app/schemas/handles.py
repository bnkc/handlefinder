from pydantic import BaseModel


class Handles(BaseModel):
    site: str
    url: str

    class Config:
        orm_mode = True
