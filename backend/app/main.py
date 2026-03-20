from app.db import Base, engine
from app.routes import auth, listing
from fastapi import FastAPI

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(listing.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}
