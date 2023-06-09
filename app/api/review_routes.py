from flask import Blueprint, jsonify, request
from app.models import Review, db, Location
from app.forms.review_form import ReviewForm
from datetime import datetime
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

# get all reviews, mainly for testing
@review_routes.route('/recent')
def allReviews():
    reviews = Review.query.all()
    reviewList = []
    for review in reviews:
        # print(review.to_dict())
        review_obj = review.to_dict()
        reviewer = review.user
        images = review.images
        images_obj = [image.to_dict() for image in images]
        reviewer_obj = reviewer.to_dict()
        review_obj['reviewer'] = reviewer_obj
        review_obj['images'] = images_obj
        reviewList.append(review_obj)
    return {'reviews': reviewList}
# get all Users reviews, mainly for testing
@review_routes.route('/users')
def allUserReviews():
    reviews = Review.query.filter_by(user_id=current_user.id).all()
    reviewList = []
    for review in reviews:
        # print(review.to_dict())
        review_obj = review.to_dict()
        reviewer = review.user
        images = review.images
        images_obj = [image.to_dict() for image in images]
        reviewer_obj = reviewer.to_dict()
        review_obj['reviewer'] = reviewer_obj
        review_obj['images'] = images_obj
        reviewList.append(review_obj)
        # print("DATE==============================", datetime.now())
    return {'reviews': reviewList}

# create a review
@review_routes.route('', methods=['POST'])
@login_required
def createReview():
    data = request.get_json()
    # form = ReviewForm()
    # form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object

    # if form.validate_on_submit():
    old_review = Review.query.filter_by(location_id=data["location_id"], user_id=current_user.id).first()
        # print("old review===============>>>", old_review)
    if old_review:
        return {"errors": "You have reviewed this location. You can't submit another review"}, 400
    location = Location.query.get(data['location_id'])
    if location.owner_id is current_user.id:
        return {"errors": "You cannot review your own location"}, 400
    new_review = Review(
        review = data["review"],
        rating = data["rating"],
        location_id = data["location_id"],
        user_id=current_user.id,
        # created_at=date
    )
    # print(new_review.to_dict())
    db.session.add(new_review)
    db.session.commit()
    new_review_obj = new_review.to_dict()
    reviewer = new_review.user
    images = new_review.images
    images_obj = [image.to_dict() for image in images]
    reviewer_obj = reviewer.to_dict()
    new_review_obj['reviewer'] = reviewer_obj
    new_review_obj['images'] = images_obj
    # print("REVIEW==========================>", new_review_obj)
    return new_review_obj



@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editReview(id):
    date = datetime.utcnow()
    # print("edit review date=======================================", date)
    data = request.get_json()
    # form = ReviewForm()
    review = Review.query.filter_by(id=id).first()

    if review is None:
        return "Review not found", 404

    if review.user_id != current_user.id:
        return "You can't edit this review", 401

    # print("check here=========================>", data)
    # print("DATE==============================", datetime)
    if True:
        # date = datetime.now()
    # if form.validate_on_submit():
        review.review = data["review"]
        review.rating = data["rating"]
        review.updated_at = date

        db.session.commit()

        # print("updated Review================", review.to_dict())

        return review.to_dict()
    else:
        return "Bad data, try again", 404




# delete review by review id
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):
    review = Review.query.get(id)
    if not review:
        return ("Review not found"), 404

    if review.user_id != current_user.id:
        return {"error": "You can't delete this review."}, 401

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully Deleted": id}
