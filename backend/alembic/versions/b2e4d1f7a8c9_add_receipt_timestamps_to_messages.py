"""add delivered_at and read_at to messages

Revision ID: b2e4d1f7a8c9
Revises: 9deb043653c2
Create Date: 2026-06-27 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b2e4d1f7a8c9"
down_revision: Union[str, Sequence[str], None] = "9deb043653c2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("messages", sa.Column("delivered_at", sa.DateTime(), nullable=True))
    op.add_column("messages", sa.Column("read_at", sa.DateTime(), nullable=True))


def downgrade() -> None:
    op.drop_column("messages", "read_at")
    op.drop_column("messages", "delivered_at")
