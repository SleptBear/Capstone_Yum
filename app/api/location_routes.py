from flask_wtf import FlaskForm
from flask import Blueprint, jsonify, request
from app.models import Location, db, Review, Image
from app.forms.location_form import LocationForm
from app.forms.image_form import ImageForm
from flask_login import login_required, current_user
from .aws_upload import get_unique_filename, upload_file_to_s3

location_routes = Blueprint('locations', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# GET ALL
@location_routes.route('')
def allLocations():
    locations = Location.query.all()

    reviews = [location.reviews for location in locations]

    images = [location.images for location in locations]
    images_obj = [image[0].to_dict() for image in images]

    image_only = [image['img_url'] for image in images_obj]

    location_objs = [location.to_dict() for location in locations]

    i = 0
    while i < len(locations):
        location_objs[i]['preview'] = image_only[i]
        reviews_obj = [review.to_dict() for review in reviews[i]]
        location_objs[i]['reviews'] = reviews_obj
        # if reviews_obj[0]:
        #     Ratings = [(rating) for rating in reviews[i]]
        #     # avgRating = sum(Ratings)/(len(reviews_obj))
        #     # location_objs[i]['avgRating'] = avgRating
        # else:
        #     location_objs[i]['reviews'] = []
        #     location_objs[i]['avgRating'] = 0
        i += 1
    return location_objs
# GET
@location_routes.route('/<int:id>')
def oneLocation(id):
    location = Location.query.get(id)
    reviews = location.reviews
    reviews_obj = [review.to_dict() for review in reviews]
    # print("location =========>", location)
    # print("location =========>", location.owner)
    # print("location =========>", location.images)
    images_obj = [images.to_dict() for images in location.images]
    # print("location =========>", images_obj)
    location_obj = location.to_dict()
    # location_objs = [location.to_dict() for location in locations]
    location_obj['images'] = images_obj
    location_obj['reviews'] = reviews_obj

    return location_obj

# Create
@location_routes.route('', methods=['POST'])
@login_required
def createLocation():
    data = request.get_json()
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    if form.validate_on_submit():
        new_location = Location(
            name = form.data["name"],
            description= form.data["description"],
            phone = form.data["phone"],
            city = form.data["city"],
            state = form.data["state"],
            address = form.data["address"],
            zipcode = form.data["zipcode"],
            price = form.data["price"],
            operating_hours = form.data["operating_hours"],
            category = form.data["category"],
            owner_id = current_user.id
        )
        db.session.add(new_location)
        db.session.commit()
        return new_location.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE Location
@location_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def removeLocation(id):
    location = Location.query.get(id)
    if not location:
        return ("Location not found"), 404

    if location.owner_id != current_user.id:
        return {"errors": "Not authorized User"}, 401

    db.session.delete(location)
    db.session.commit()

    return {"Location successfully Deleted": id}

# Edit Location
@location_routes.route('/<int:id>', methods=["PUT"])
@login_required
def updateLocation(id):
    location = Location.query.get(id)
    data = request.get_json()

    if location.owner.id != current_user.id:
        return {"errors": "Not Authorized User"}, 401
    # setup conditional to check if request data has value or not:
    # add in any additional relationship data after commit line 80
    if location:
        location.name = data['name']
        location.description = data['description']
        location.phone = data['phone']
        location.city = data['city']
        location.state = data['state']
        location.address = data['address']
        location.zipcode = data['zipcode']
        # location.lat = data['lat']
        # location.lng = data['lng']
        location.price = data['price']
        location.category = data['category']
        location.operating_hours = data['operating_hours']
        db.session.commit()
        # print("RETURN=====>", location.to_dict())

        return location.to_dict()
    else:
        return {"errors": "Location Does not Exist"}

# read location's reviews
@location_routes.route('/<int:id>/reviews')
def locationReviews(id):
    # print("ID========>", id)
    reviews = Review.query.filter(Review.location_id == id).all()
    reviewList = []
    for review in reviews:
        review_obj = review.to_dict()
        reviewer = review.user
        images = review.images
        images_obj = [image.to_dict() for image in images]
        reviewer_obj = reviewer.to_dict()
        review_obj['reviewer'] = reviewer_obj
        review_obj['images'] = images_obj
        # print("REVIEW==========================>", review_obj)
        reviewList.append(review_obj)
    return {'reviews': reviewList}


# Create Image for location on spot creation
@location_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def createLocationImage(id):
    # data = request.get_json()
    print("request===============>", request)
    data = request.files
    print("LOOOOK==================>", data)

    image = data['image']
    print("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK", image)
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("UPLOAD", upload)

    if "url" not in upload:
        return {'errors': "Not a valid file image file type"}
    # form = LocationForm()
    # form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    url = upload['url']

    new_image = Image(
        img_url = url,
        user_id = current_user.id,
        location_id = id
    )

    db.session.add(new_image)
    db.session.commit()
    # print("IMAGE RETURN", new_image.to_dict())
    return new_image.to_dict()
