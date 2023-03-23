from flask import Blueprint, jsonify, request
from app.models import Location, db
from flask_login import login_required, current_user

location_routes = Blueprint('locations', __name__)

@location_routes.route('')
def allLocations():
    locations = Location.query.all()
    # print("locations =========>", locations)
    # print(locations[0].images)
    images = [location.images for location in locations]
    images_obj = [image[0].to_dict() for image in images]
    # print("images==========>", images)
    image_only = [image['img_url'] for image in images_obj]
    # print("images_obj==========>", images_obj)
    # print("images_only==========>", image_only)
    location_objs = [location.to_dict() for location in locations]
    # print("LOOOOOOOOOOOOOOK", len(locations))
    # print("LOOOOOOOOOOOOOOK", location_objs[0])
    # print("LOOOOOOOOOOOOOOK", image_only[0])
    i = 0
    while i < len(locations):
        location_objs[i]['preview'] = image_only[i]
        i += 1



    # location_images = [location['images'] = ]
    # print(location_objs)
    return location_objs

@location_routes.route('/<int:id>')
def oneLocation(id):
    location = Location.query.get(id)
    print("location =========>", location)
    print("location =========>", location.owner)
    print("location =========>", location.images)
    images_obj = [images.to_dict() for images in location.images]
    print("location =========>", images_obj)
    location_obj = location.to_dict()
    # location_objs = [location.to_dict() for location in locations]
    location_obj['images'] = images_obj
    return location_obj


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
