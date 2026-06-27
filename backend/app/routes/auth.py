from app.dependencies.auth import get_current_user
from sqlalchemy.orm import Session
from fastapi import Depends, Response
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.dependencies.db import get_db
from app.utils.auth import create_access_token, hash_password, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.user import User
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):

    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username is already taken")

    if db.query(User).filter(User.phone_number == user.phone_number).first():
        raise HTTPException(status_code=400, detail="Phone number is already taken")

    hashed_password = hash_password(user.password)
    new_user = User(
        email=user.email,
        username=user.username,
        phone_number=user.phone_number,
        hashed_password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": str(db_user.id),
        "email": db_user.email,
        "username": db_user.username,
    })

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,       # JS cannot read this cookie
        secure=False,        # set True in production (requires HTTPS)
        samesite="lax",      # change to "strict" in production if same-origin only
        path="/",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # matches token expiry
    )

    return {"message": "Login successful"}

@router.post("/logout")
def logout(response: Response):
   
    response.delete_cookie(
        key="access_token",
        path="/",
        httponly=True,
        samesite="lax",
        secure=False,        
    )
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user