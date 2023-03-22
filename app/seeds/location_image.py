from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_location_images():
    image1 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/tZsAdTClHKTuMdFctSIBIA/348s.jpg',
        location_id=1,
        user_id=1,
    )
    image2 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/ZUgWmrJw3gAOmyqR6dSBhw/348s.jpg',
        location_id=2,
        user_id=2,
    )
    image3 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/tFVNb6smvDgC73EpYMQl0A/348s.jpg',
        location_id=3,
        user_id=3,
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()

def undo_location_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
