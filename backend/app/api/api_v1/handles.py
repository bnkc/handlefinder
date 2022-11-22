import asyncio

from fastapi import APIRouter, WebSocket

from app.sherlock import main
import asyncio
import billiard as multiprocessing
from queue import Empty
from fastapi import WebSocket, WebSocketDisconnect


router = APIRouter()


@router.websocket("/{username}")
async def sherlock(websocket: WebSocket):
    username = websocket.path_params["username"]
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(data)
            q = multiprocessing.Queue()
            p = multiprocessing.Process(target=main, args=(q, username))
            p.start()
            while p.is_alive():
                try:
                    result = q.get(timeout=1)
                    await websocket.send_text(result)
                except Empty:
                    pass
            p.join()
    except WebSocketDisconnect:
        await websocket.close()
