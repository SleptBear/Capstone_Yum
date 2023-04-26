from flask import Blueprint, jsonify, request
from app.models import db, Location

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:search>')
def get_search(search):
    locations = Location.query.filter(
        (Location.name.ilike(f'%%{search}%%')) |
        (Location.category.ilike(f'%%{search}%%')) |
        (Location.description.ilike(f'%%{search}%%'))
        # (Location.price.like(f'%%{search}%%'))
    ).all()
    # query_dict = [q.to_dict() for q in search_result]
    print("SEARCH RESULTS=====================>", locations)
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
    return location_objs, 200
    # return query_dict, 200
