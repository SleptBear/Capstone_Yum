from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_locations():
    location1 = Location(
        name='J Curry', phone='123-456-7890', city='New York', state='NY',
        address='123 Main St', zipcode=10001, lat=40.7128, lng=-74.0060,
        category='Japanese', description="Best Japanese curry money can buy.",
        price=10, operating_hours='9am-5pm', owner_id=1)
    location2 = Location(
        name='Golden Moon', phone='987-654-3210', city='San Francisco', state='CA',
        address='456 Oak St', zipcode=94102, lat=37.7749, lng=-122.4194, category='Chinese', description="Best Chinese food money can buy.",
        price=20, operating_hours='10am-6pm', owner_id=2)
    location3 = Location(
        name='Fast And Go', phone='555-555-5555', city='Miami', state='FL',
        address='789 Broadway Ave', zipcode=33139, lat=25.7617, lng=-80.1918, category='take-out', description="Best quick and ready food this side of Mississipi.",
        price=15, operating_hours='8am-4pm', owner_id=3)
    location4 = Location(
        name='Basanti', phone='123-456-7890', city='New York', state='NY',
        address='356 Main St', zipcode=10001, lat=40.7128, lng=-74.0060,
        category='Japanese', description="Best Indian Curry this side of Mississippi.",
        price=10, operating_hours='9am-5pm', owner_id=4)
    location5 = Location(
        name='Golden Dragon', phone='987-654-3210', city='San Francisco', state='CA',
        address='482 Pine St', zipcode=94102, lat=37.7749, lng=-122.4194, category='Chinese', description="Best Chinese, Better than Golden Moon.",
        price=20, operating_hours='10am-6pm', owner_id=5)
    location6 = Location(
        name="Cheese N' Stuff", phone='555-555-5555', city='Miami', state='FL',
        address='700 Booming Blvd', zipcode=33139, lat=25.7617, lng=-80.1918, category='take-out', description="Best quick and ready food this side of Mississipi.",
        price=15, operating_hours='8am-4pm', owner_id=6)
    location7 = Location(
        name="Lupe's", phone='111-111-1111', city='Los Angeles', state='CA',
        address='567 Pacific Blvd', zipcode=90001, lat=34.0522, lng=-118.2437, category='Mexican', description="Authentic Mexican cuisine that will transport you to Mexico.",
        price=30, operating_hours='11am-7pm', owner_id=7)
    location8 = Location(
        name='Lil Italy', phone='222-222-2222', city='Boston', state='MA',
        address='890 Beacon St', zipcode=92125, lat=42.3601, lng=-71.0589, category='Italian', description="Classic Italian dishes made with fresh ingredients.",
        price=25, operating_hours='12pm-8pm', owner_id=8)
    location9 = Location(
        name='Costal Kitchen', phone='333-333-3333', city='Seattle', state='WA',
        address='246 Pike St', zipcode=98101, lat=47.6062, lng=-122.3321, category='Seafood', description="Fresh seafood that will make your taste buds dance.",
        price=35, operating_hours='11am-9pm', owner_id=9)
    location10 = Location(
        name='Hole in the Wall', phone='444-444-4444', city='Chicago', state='IL',
        address='369 Michigan Ave', zipcode=60601, lat=41.8781, lng=-87.6298, category='Burgers', description="Juicy burgers made with premium beef and delicious toppings.",
        price=12, operating_hours='8am-6pm', owner_id=10)




    # add more Location instances as needed

    db.session.add(location1)
    db.session.add(location2)
    db.session.add(location3)
    db.session.add(location4)
    db.session.add(location5)
    db.session.add(location6)
    db.session.add(location7)
    db.session.add(location8)
    db.session.add(location9)
    db.session.add(location10)
    # add more Location instances to the session as needed

    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
