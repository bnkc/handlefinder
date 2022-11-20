import asyncio

from fastapi import APIRouter, WebSocket

from app.sherlock import main
from typing import Any
import asyncio
import multiprocessing as mp
from concurrent.futures import ProcessPoolExecutor
from queue import Empty

from fastapi import WebSocket, WebSocketDisconnect


router = APIRouter()
pool = ProcessPoolExecutor()


@router.websocket_route("/{username}")
async def handles(websocket: WebSocket):
    loop = asyncio.get_event_loop()
    username = websocket.path_params["username"]
    m = mp.Manager()
    q = m.Queue()
    await websocket.accept()
    result = loop.run_in_executor(pool, main, q, username)
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
                result.cancel()
                break
        if result.done():
            try:
                await websocket.send_json(result.result())
                await websocket.close()
            except WebSocketDisconnect:
                result.cancel()
            finally:
                break
