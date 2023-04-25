from app.models import db, Location, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_favorites():
    locations = Location.query.all()
    favorites = [
        Favorite(        user_id = 1, locations=[choice(locations)]
    ),        Favorite(        user_id = 2, locations=[choice(locations)]
    ),        Favorite(        user_id = 3, locations=[choice(locations)]
    ),        Favorite(        user_id = 4, locations=[choice(locations)]
    ),        Favorite(        user_id = 5, locations=[choice(locations)]
    ),        Favorite(        user_id = 6, locations=[choice(locations)]
    ),        Favorite(        user_id = 7, locations=[choice(locations)]
    ),        Favorite(        user_id = 8, locations=[choice(locations)]
    ),        Favorite(        user_id = 9, locations=[choice(locations)]
    ),        Favorite(        user_id = 10, locations=[choice(locations)]
    ),
    ]

    for favorite in favorites:
        db.session.add(favorite)

    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
