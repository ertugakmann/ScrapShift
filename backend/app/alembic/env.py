from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

from app.db import Base
from app.models.user import User
from app.models.listing import Listing
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.offer import Offer

config = context.config
fileConfig(config.config_file_name)

# bunu değiştir
target_metadata = Base.metadata  # None yerine bunu yaz