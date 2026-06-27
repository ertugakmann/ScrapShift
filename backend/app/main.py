from app.db import Base, engine
from app.routes import auth, listing, conversations
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, listing, conversations, websocket

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(listing.router)
app.include_router(conversations.router)
app.include_router(websocket.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}
