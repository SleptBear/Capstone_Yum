from flask import Blueprint, jsonify, request
from app.models import Location, db
from flask_login import login_required, current_user

location_routes = Blueprint('locations', __name__)

@location_routes.route('')
def allLocations():
    locations = Location.query.all()
    print("locations =========>", locations)
    location_objs = [location.to_dict() for location in locations]

    return location_objs

@location_routes.route('/<int:id>')
def oneLocation(id):
    location = Location.query.get(id)
    print("location =========>", location)
    print("location =========>", location.owner)
    # location_objs = [location.to_dict() for location in locations]

    return location.to_dict()


@location_routes.route('', methods=['POST'])
def createLocation():
    data = request.get_json()
    # form = LocationForm()
    # form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    new_location = Location(
        name = data["name"],
        phone = data["phone"],
        city = data["city"],
        state = data["state"],
        address = data["address"],
        zipcode = data["zipcode"],
        lat = data["lat"],
        lng = data["lng"],
        price = data["price"],
        operating_hours = data["operating_hours"],
        owner_id = data["owner_id"]
    )

    db.session.add(new_location)
    db.session.commit()

    return new_location.to_dict()

@location_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def removeLocation(id):
    location = Location.query.get(id)
    if not location:
        return ("Location not found"), 404

    db.session.delete(location)
    db.session.commit()

    return {"Location successfully Deleted": id}


@location_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def updateLocation(id):
    location = Location.query.get(id)
    data = request.get_json()
    # setup conditional to check if request data has value or not:
    # add in any additional relationship data after commit line 80
    if location:
        location.name = data['name']
        location.phone = data['phone']
        location.city = data['city']
        location.state = data['state']
        location.address = data['address']
        location.zipcode = data['zipcode']
        location.lat = data['lat']
        location.lng = data['lng']
        location.price = data['price']
        location.operating_hours = data['operating_hours']
        db.session.commit()
        print("RETURN=====>", location.to_dict())

        return location.to_dict()
    else:
        return {"error": "Location Does not Exist"}
