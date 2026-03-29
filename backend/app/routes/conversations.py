from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.conversation.conversation import ConversationCreate, ConversationResponse
from app.schemas.conversation.message import MessageCreate, MessageResponse
from app.schemas.conversation.offer import OfferCreate, OfferResponse, OfferUpdate
from app.models.listing import Listing
from app.models.user import User
from app.models.conversation.conversation import Conversation
from app.models.conversation.message import Message
from app.models.conversation.offer import Offer
from typing import List
from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user


router = APIRouter(prefix="/conversations", tags=["conversations"])

@router.post("/", response_model= ConversationResponse, status_code=201)
def create_conversation(data: ConversationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Check if the listing exists
    listing = db.query(Listing).filter(Listing.id == data.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    # Check if the user is trying to start a conversation on their own listing
    if listing.owner_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot start a conversation on your own listing")
    
    # Check if the listing is sold
    if listing.is_sold:
        raise HTTPException(status_code=400, detail="Cannot start a conversation on a sold listing")

    # Check if a conversation already exists for this listing and user
    existing_conversation = db.query(Conversation).filter(Conversation.listing_id == data.listing_id).filter(Conversation.buyer_id == current_user.id).first()

    if existing_conversation:
        return existing_conversation

    # Create a new conversation
    new_conversation = Conversation(
        listing_id=data.listing_id,
        buyer_id=current_user.id,
        seller_id=listing.owner_id
    )

    db.add(new_conversation)
    db.commit()
    db.refresh(new_conversation)
    return new_conversation

@router.get("/", response_model=List[ConversationResponse], status_code=200)
def get_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conversations = db.query(Conversation).filter(
        (Conversation.buyer_id == current_user.id) | (Conversation.seller_id == current_user.id)
    ).all()
    
    return conversations

@router.get("/{conversation_id}", response_model=ConversationResponse, status_code=200)
def get_conversation(conversation_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)): 
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if conversation.buyer_id != current_user.id and conversation.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this conversation")

    return conversation

@router.post("/{conversation_id}/messages", response_model=MessageResponse, status_code=201)
def create_message(conversation_id: int, data: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conversation.buyer_id != current_user.id and conversation.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to send a message in this conversation")

    new_message = Message(
        conversation_id=conversation.id,
        sender_id=current_user.id,
        content=data.content
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/{conversation_id}/messages", response_model=List[MessageResponse], status_code=200)
def get_messages(conversation_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conversation.buyer_id != current_user.id and conversation.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view messages in this conversation")
    
    db.query(Message).filter(
        Message.conversation_id == conversation_id,
        Message.sender_id != current_user.id,
        Message.is_read == False
    ).update({"is_read": True})
    db.commit()

    messages = db.query(Message).filter(Message.conversation_id == conversation_id).all()
    return messages

@router.post("/{conversation_id}/offers", response_model=OfferResponse, status_code=201)
def create_offer(conversation_id: int, data: OfferCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conversation.buyer_id != current_user.id and conversation.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to make an offer in this conversation")
    if conversation.listing.is_sold:
        raise HTTPException(status_code=400, detail="Cannot make an offer on a sold listing")
    
    new_offer = Offer(
        conversation_id=conversation.id,
        sender_id=current_user.id,
        amount=data.amount
    )
    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)
    return new_offer

@router.patch("/{conversation_id}/offers/{offer_id}", response_model=OfferResponse, status_code=200)
def answer_offer(conversation_id: int, offer_id: int, data: OfferUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conversation.buyer_id != current_user.id and conversation.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to answer an offer in this conversation")

    offer = db.query(Offer).filter(Offer.id == offer_id).first()

    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")

    if offer.conversation_id != conversation_id:
        raise HTTPException(status_code=400, detail="Offer does not belong to this conversation")

    if offer.is_accepted is not None:
        raise HTTPException(status_code=400, detail="Offer has already been answered")

    offer.status = data.is_accepted
    db.commit()
    db.refresh(offer)

    # If the offer is accepted, mark the listing as sold
    if data.is_accepted:
        listing = db.query(Listing).filter(Listing.id == conversation.listing_id).first()
        listing.is_sold = True
        db.commit()

    return offer

@router.get("/unread-count", status_code=200)
def get_unread_count(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    unread_count = db.query(Message).filter(
        Message.conversation.has(
            (Conversation.buyer_id == current_user.id) | (Conversation.seller_id == current_user.id)
        ),
        Message.sender_id != current_user.id,
        Message.is_read == False
    ).count()
    return {"unread_count": unread_count}