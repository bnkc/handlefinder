cd backend/app


cd ..
hypercorn -b 0.0.0.0:${PORT} app.main:app 
