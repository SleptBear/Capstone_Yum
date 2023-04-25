from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_locations
from .location_image import seed_location_images, undo_location_images
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_favorites()
        undo_reviews()
        undo_location_images()
        undo_locations()
        undo_users()
    seed_users()
    seed_locations()
    seed_location_images()
    seed_reviews()
    seed_favorites()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_locations()
    undo_location_images()
    undo_reviews()
    undo_favorites()
    # Add other undo functions here
