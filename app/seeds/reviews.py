from app.models import db, Review, environment, SCHEMA, User
from sqlalchemy.sql import text
import datetime


def seed_reviews():
    reviews = [
        Review(
            user_id=2, location_id=1, review='GREAT spot!! 10/10 I recommend to anyone', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, location_id=1, review='Average place, average experience', rating=3,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=4, location_id=1, review='Waiter spit in my food...enough said', rating=1.5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, location_id=2, review="GREAT, it is a must try!", rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=4, location_id=2, review='Awesome, affordable, and has entertainment nearby.', rating=4,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, location_id=2, review='Terrible,  do not even bother unless starving.', rating=2,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, location_id=3, review='GREAT 10/10', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, location_id=3, review='THE GOOD STUFF', rating=3.5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=4, location_id=3, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, location_id=4, review='GREAT food and dirt cheap drink. I go every week.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, location_id=4, review='THE GOOD STUFF', rating=3,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, location_id=4, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=6, location_id=5, review='Amazing taste in both food and asthetic', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=7, location_id=5, review='THE GOOD STUFF', rating=4,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=8, location_id=5, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=6, location_id=7, review='Amazing taste in both food and asthetic', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=8, location_id=7, review='THE GOOD STUFF', rating=4.5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=9, location_id=7, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=7, location_id=8, review='Amazing taste in both food and asthetic', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=9, location_id=8, review='THE GOOD STUFF', rating=4,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=6, location_id=8, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=7, location_id=9, review='Amazing taste in both food and asthetic', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=8, location_id=9, review='THE MOST EVIL PLACE...BEWARE', rating=1,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=10, location_id=9, review='Had to give this place 2 stars.', rating=2,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=7, location_id=10, review='Average taste in both food and asthetic', rating=3,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=8, location_id=10, review='THE GOOD STUFF', rating=4,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),
        Review(
            user_id=9, location_id=10, review='Had to give this place 5 stars.', rating=5,
            created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()
        ),

    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
