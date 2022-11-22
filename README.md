# handlefinder
search handles across hundreds of social networks
## 1. Backend local development

### Requirements

- Python >= 3.9.0
- Linux / MacOS _(not tested on Windows)_

### General workflow

By default, the dependencies are managed with pip.

From `./backend/app/` you can install all the dependencies with:

```console
$ pip install -r requirements.txt
```

Create a virtual environment from the requirements.txt (or installed globally).

Then you can start your local server with.

It will be running on localhost ie `127.0.0.1`

### Starting API

You will need to download the build of the frontend. To do this you'll need to install the aws cli and add your IAM credentials. As an alternative, an empty `frontend-build` folder in the root directory will allow the backend to start without crashing.

```
cd backend
uvicorn app.main:app --reload
```
## 2. Development URLs

Automatic Interactive Docs (Swagger UI): https://localhost/docs

## 3. Freezing Requirements

`pip freeze > requirements.txt`

