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
    image4 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/D1h9IZztEAFRqLTgYZxlIQ/348s.jpg',
        location_id=1,
        user_id=1,
    )
    image5 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/L8fJ120FAJdykpsfcesHEA/348s.jpg',
        location_id=1,
        user_id=1,
    )
    image6 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/8dSSqJMGaMmNi2sHcIIQ0w/348s.jpg',
        location_id=2,
        user_id=2,
    )
    image7 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/aUvbdeRhgz7klYyewFcQXA/348s.jpg',
        location_id=2,
        user_id=2,
    )
    image8 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/lmBv5gPsBXZqJ-7ELE4XMA/348s.jpg',
        location_id=3,
        user_id=3,
    )
    image9 = Image(
        img_url='https://s3-media0.fl.yelpcdn.com/bphoto/bar0P91_K3RM_stLbHG9wQ/348s.jpg',
        location_id=3,
        user_id=3,
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)

    db.session.commit()

def undo_location_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
