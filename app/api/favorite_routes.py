from flask import Blueprint, jsonify, request
from app.models import Favorite, db, User, Location
from flask_login import login_required, current_user

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('')
def allFavorites():
    user = current_user
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    print("TEST FAVORITES ===============>", favorites[0].user)
    users_favorites = [favorite.to_dict() for favorite in favorites]
    print("USER FAVORITES ===============>", users_favorites)
    return users_favorites

@favorite_routes.route('/<int:id>', methods=["POST"])
def newFavorite(id):
    user = current_user
    new_location = Location.query.get(id)
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    users_favorites = [favorite.to_dict() for favorite in favorites]
    print("LOOOOOOOOOOOOOOOOOOOOOOOOOOOK", users_favorites)
    only_locations = users_favorites[0]['locations']
    print("LOOOOOOOOOOOOOOOOOOOOOOOOOOOK2", only_locations)
    for location in only_locations:
        if(location["id"] == id):
            return {'errors': 'Spot already saved'}, 404
            continue
    print("NEW LOcation===================>", new_location)
    db_favorite = favorites[0]
    print("current Favs===================>", db_favorite)
    print("key into favorites=============>", db_favorite.locations[0])
    db_favorite.locations.append(new_location)
    db.session.commit()
    print("CHECKING AFTER========>", db_favorite.to_dict())
    fav_obj = db_favorite.to_dict()
    just_locations = fav_obj['locations']
    # create store state to determine return value here
    return just_locations


@favorite_routes.route('/<int:id>', methods=["DELETE"])
def delFavorite(id):
    # print("NUMBER=================>", id)
    user = current_user
    old_location = Location.query.get(id)
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    print("query results ==========>", favorites)
    db_favorite = favorites[0]
    print("DB FAVORITES for USER ==========>", db_favorite.locations)
    users_favorites = [favorite.to_dict() for favorite in favorites]
    only_locations = users_favorites[0]['locations']
    # print("ONLY LOCATIONS BEFORE============>", only_locations)
    for location in only_locations:
        # print("EACH LOCAL ===============>", location)
        if(location["id"] == int(id)):
            db_favorite.locations.remove(old_location)
            print("AFTER REMOVAL ============>", db_favorite.locations)
            db.session.commit()
            return db_favorite.locations[0].to_dict()
            # return []
            continue

    return {'errors': 'Spot not favorited'}, 404
