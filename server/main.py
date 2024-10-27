from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login(request: LoginRequest):
    if request.email == "testuser" and request.password == "password123":
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

@app.post("/register")
async def register(request: RegisterRequest):
    if request.name and request.email and request.password:
        return {"message": "Registration successful"}
    else:
        raise HTTPException(status_code=500, detail="Internal server error") 


class LearnRequest(BaseModel):
    topic: str

@app.post("/learn")
async def learn(request: LearnRequest):
    if not request.topic:
        raise HTTPException(status_code=422, detail="Topic is required")
    return {"message": f"Learning topic '{request.topic}' received successfully"}