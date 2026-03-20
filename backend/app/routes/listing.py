from fastapi import APIRouter
from app.schemas.listing import ListingCreate, ListingResponse
from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user
from fastapi import Depends, HTTPException
from app.models.listing import Listing
from app.models.user import User
from typing import List
from sqlalchemy.orm import Session

router = APIRouter(prefix="/listings", tags=["listings"])

@router.post("/", response_model=ListingResponse, status_code=201)
def create_listing(listing: ListingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_listing = Listing(
        title=listing.title,
        description=listing.description,
        price=listing.price,
        mileage=listing.mileage,
        year=listing.year,
        location_city=listing.location_city,
        image_url=listing.image_url,
        status=listing.status,
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

@router.get("/", response_model=List[ListingResponse], status_code=200)
def get_listings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    listings = db.query(Listing).filter(Listing.status == "active").all()
    return listings

@router.get("/{listing_id}", response_model=ListingResponse, status_code=200)
def get_listing(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()

    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.put("/{listing_id}", response_model=ListingResponse, status_code=200)
def update_listing(listing_id: int, listing: ListingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != db.query(Listing).filter(Listing.id == listing_id).first().user_id:
        raise HTTPException(status_code=403, detail="Unauthorized to update this listing")
        
    db_listing = db.query(Listing).filter(Listing.id == listing_id).first()

    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    db_listing.title = listing.title
    db_listing.description = listing.description
    db_listing.price = listing.price
    db_listing.mileage = listing.mileage
    db_listing.year = listing.year
    db_listing.location_city = listing.location_city
    db_listing.image_url = listing.image_url
    
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.delete("/{listing_id}", status_code=204)
def delete_listing(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    if current_user.id != db.query(Listing).filter(Listing.id == listing_id).first().user_id:
        raise HTTPException(status_code=403, detail="Unauthorized to delete this listing")

    db_listing = db.query(Listing).filter(Listing.id == listing_id).first()

    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    db.delete(db_listing)
    db.commit()
