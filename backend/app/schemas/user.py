from pydantic import BaseModel


class User(BaseModel):
    username: str

    class Config:
        orm_mode = True
