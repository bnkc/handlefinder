import asyncio
from typing import Any

from fastapi import APIRouter, WebSocket

from app.sherlock import main

import asyncio
import multiprocessing as mp
from concurrent.futures import ProcessPoolExecutor
from queue import Empty

from fastapi import FastAPI, WebSocket, WebSocketDisconnect


router = APIRouter()
pool = ProcessPoolExecutor()


@router.websocket_route("/{username}")
async def websocket_endpoint(websocket: WebSocket):
    loop = asyncio.get_event_loop()
    username = websocket.path_params["username"]
    m = mp.Manager()
    q = m.Queue()

    await websocket.accept()

    result = loop.run_in_executor(pool, main, q, username)
    while True:

        # None of the coroutines called in this block (e.g. send_json())
        # will yield back control. asyncio.sleep() does, and so it will allow
        # the event loop to switch context and serve multiple requests
        # concurrently.
        await asyncio.sleep(0)

        try:
            # see if our long running task has some intermediate result.
            # Will result None if there isn't any.
            q_result = q.get(block=False)
        except Empty:
            # if q.get() throws Empty exception, then nothing was
            # available (yet!).
            q_result = None

        # If there is an intermediate result, let's send it to the client.
        if q_result:
            try:
                await websocket.send_json(q_result)
            except WebSocketDisconnect:
                # This happens if client has moved on, we should stop the long
                #  running task
                result.cancel()
                # break out of the while loop.
                break

        # We want to stop the connection when the long running task is done.
        if result.done():
            try:
                await websocket.send_json(result.result())
                await websocket.close()
            except WebSocketDisconnect:
                # This happens if client has moved on, we should stop the long
                #  running task
                result.cancel()
            finally:
                # Make sure we break out of the infinte While loop.
                break
