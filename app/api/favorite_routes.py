from flask import Blueprint, jsonify, request
from app.models import Favorite, db, User, Location
from flask_login import login_required, current_user

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('')
@login_required
def allFavorites():
    user = current_user
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    # print("TEST FAVORITES ===============>", favorites[0].user)
    users_favorites = [favorite.to_dict() for favorite in favorites]
    # print("USER FAVORITES ===============>", users_favorites)
    return users_favorites[0]['locations']

@favorite_routes.route('/create')
def createFavorites():
    user = current_user
    new_favorite_list = Favorite(
        user_id = user.id
    )
    db.session.add(new_favorite_list)
    db.session.commit()

    return {'message': "Success"}

@favorite_routes.route('/<int:id>', methods=["POST"])
@login_required
def newFavorite(id):
    user = current_user
    new_location = Location.query.get(id)
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    users_favorites = [favorite.to_dict() for favorite in favorites]
    print("LOOOOOOOOOOOOOOOOOOOOOOOOOOOK", users_favorites)
    only_locations = users_favorites[0]['locations']
    reviews = [location.reviews for location in user.favorites[0].locations]
    print('REVIEWS=============>', reviews)
    print("LOOOOOOOOOOOOOOOOOOOOOOOOOOOK2", only_locations)
    for location in only_locations:
        print("TRUTHY=================================>>>>>>>>>>>>>>>>>>", (location["id"] == id))
        if location["id"] == id:
            return {'errors': 'Favorites POST Route Endpoint'}, 404
            continue
    # print("NEW LOcation===================>", new_location)
    db_favorite = favorites[0]
    # print("current Favs===================>", db_favorite)
    # print("key into favorites=============>", db_favorite.locations[0])
    db_favorite.locations.append(new_location)
    db.session.commit()
    # print("CHECKING AFTER========>", db_favorite.to_dict())
    fav_obj = db_favorite.to_dict()
    # reviews_obj = [review.to_dict() for review in reviews[i]]
    just_locations = fav_obj['locations']
    # create store state to determine return value here
    return just_locations


@favorite_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delFavorite(id):
    # print("NUMBER=================>", id)
    user = current_user
    old_location = Location.query.get(id)
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    # print("query results ==========>", favorites)
    db_favorite = favorites[0]
    # print("DB FAVORITES for USER ==========>", db_favorite.locations)
    users_favorites = [favorite.to_dict() for favorite in favorites]
    only_locations = users_favorites[0]['locations']
    # print("ONLY LOCATIONS BEFORE============>", only_locations)
    for location in only_locations:
        # print("EACH LOCAL ===============>", location)
        if(location["id"] == int(id)):
            db_favorite.locations.remove(old_location)
            # print("AFTER REMOVAL ============>", db_favorite.locations)
            db.session.commit()
            fav_obj = db_favorite.to_dict()
            # print('fav_obj =========================>', fav_obj)
            # return db_favorite.locations[0].to_dict()
            return fav_obj['locations']
            # return []
            continue

    return {'errors': 'Favorites Delete Route Endpoint'}, 404
