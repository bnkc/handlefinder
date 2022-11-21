import asyncio

from fastapi import APIRouter, WebSocket

from app.sherlock import main
import asyncio
import billiard as multiprocessing
from queue import Empty

from fastapi import WebSocket, WebSocketDisconnect


router = APIRouter()


@router.websocket_route("/{username}")
async def handles(websocket: WebSocket):
    username = websocket.path_params["username"]
    await websocket.accept()
    q = multiprocessing.Queue()
    p = multiprocessing.Process(target=main, args=(q, username))
    p.start()
    while True:
        await asyncio.sleep(0)
        try:
            q_result = q.get(block=False)
        except Empty:
            q_result = None
        if q_result:
            try:
                await websocket.send_json(q_result)
            except WebSocketDisconnect:
                p.terminate()
                break
        if not p.is_alive():
            try:
                await websocket.send_json(q_result)
                await websocket.close()
            except WebSocketDisconnect:
                p.terminate()
            finally:
                break
