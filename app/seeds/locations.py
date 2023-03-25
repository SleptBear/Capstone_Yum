from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_locations():
    location1 = Location(
        name='Location 1', phone='123-456-7890', city='New York', state='NY',
        address='123 Main St', zipcode=10001, lat=40.7128, lng=-74.0060,
        category='Japanese', description="Best Japanese curry money can buy.",
        price=10, operating_hours='9am-5pm', owner_id=1)
    location2 = Location(
        name='Location 2', phone='987-654-3210', city='San Francisco', state='CA',
        address='456 Oak St', zipcode=94102, lat=37.7749, lng=-122.4194, category='Chinese', description="Best Chinese food money can buy.",
        price=20, operating_hours='10am-6pm', owner_id=2)
    location3 = Location(
        name='Location 3', phone='555-555-5555', city='Miami', state='FL',
        address='789 Broadway Ave', zipcode=33139, lat=25.7617, lng=-80.1918, category='take-out', description="Best quick and ready food this side of Mississipi.",
        price=15, operating_hours='8am-4pm', owner_id=3)
    # add more Location instances as needed

    db.session.add(location1)
    db.session.add(location2)
    db.session.add(location3)
    # add more Location instances to the session as needed

    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
