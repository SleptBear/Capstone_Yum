from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', city='Big City', state='IDK', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='User', city='Sacramento', state='CA', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='User', city='New York', state='NY', email='bobbie@aa.io', password='password')
    mario = User(
        first_name='Mario', last_name='Brother', city='Redmond', state='WA', prof_pic='https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=1280', email='mario@aa.io', password='password')
    luigi = User(
        first_name='Luigi', last_name='Brother', city='Redmond', state='WA', prof_pic='https://avatarfiles.alphacoders.com/291/thumb-291102.jpg', email='luigi@aa.io', password='password')
    peach = User(
        first_name='Peach', last_name='Princess', city='Redmond', state='WA', prof_pic='https://64.media.tumblr.com/93b096607629341a89f6b1643577ec10/c3b9114db41f4be1-84/s1280x1920/4dc5b69ecf3fb162d2a9fe42c80564cfb4376f8b.png', email='peach@aa.io', password='password')
    daisy = User(
        first_name='Daisy', last_name='Princess', city='Redmond', state='WA', prof_pic='https://pbs.twimg.com/media/EofWiXGWMAs4F6x.jpg', email='daisy@aa.io', password='password')
    bowser = User(
        first_name='Bowser', last_name='Koopa', city='Redmond', state='WA', prof_pic='https://play.nintendo.com/images/profile-mk-bowser.7bf2a8f2.aead314d58b63e27.png', email='bowser@aa.io', password='password')
    bowserjr = User(
        first_name='Bowser', last_name='Junior', city='Redmond', state='WA', prof_pic='https://www.ssbworld.com/images/character-profiles/square/Bowser-Jr-Profile-Square.png', email='bowserjr@aa.io', password='password')
    toad = User(
        first_name='Toad', last_name='Kinopio', city='Redmond', state='WA', prof_pic='https://play.nintendo.com/images/profile-mk-toad.7df41cfd.png', email='toad@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mario)
    db.session.add(luigi)
    db.session.add(peach)
    db.session.add(daisy)
    db.session.add(bowser)
    db.session.add(bowserjr)
    db.session.add(toad)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
