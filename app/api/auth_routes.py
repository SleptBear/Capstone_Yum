from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user_obj = current_user.to_dict()
        print("CURRENT USER ================>", current_user.to_dict())
        user = User.query.filter(User.id == current_user.id).first()
        if len(user.favorites) > 0:

            favorites = user.favorites
            favorites_obj = [favorite.to_dict() for favorite in favorites]
            # print("TESTING FAVORITE lIST HERE===========================>", favorites_obj[0]['locations'])
            user_obj["favorites"] = favorites_obj[0]['locations']
            # login_user(user)
            return user_obj
            # user_obj["favorites"] = favorites.to_dict()
        # login_user(user)
        # return user.to_dict()
        user_obj['favorites'] = []
        return user_obj
        # return current_user.to_dict()
        # return user_obj
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        # print("TESTING USER HERE===========================>", user.favorites)
        # print("TESTING FAVORITE HERE===========================>", user.favorites[0].to_dict())
        user_obj = user.to_dict()
        if len(user.favorites) > 0:

            favorites = user.favorites
            # print("favorites", favorites[0])
            # favorite = favorites[0]
            # loc_list = [location.to_dict() for location in favorite.locations]
            # print("LOOOOOOOOOOOOOOOOOOOK@@@@@@@@@", loc_list)

            # locations = [location for location in fav_list]
            # print("LOOOOOOOOOOOOOOOOOOOOOOOK", locations)
            # locations = user.locations
            # print("LOCATIONS=============================>", locations)
            # print("LOCATIONS Preview=============================>", locations[0].images[0].img_url)
            favorites_obj = [favorite.to_dict() for favorite in favorites]
            # print("TESTING FAVORITE lIST HERE===========================>", favorites_obj[0]['locations'])
            user_obj["favorites"] = favorites_obj[0]['locations']
            # print("return value===============>", user_obj['favorites'])
            login_user(user)
            return user_obj
            # user_obj["favorites"] = favorites.to_dict()
        login_user(user)
        # return user.to_dict()
        user_obj['favorites'] = []
        return user_obj
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """

    form = SignUpForm()
    data = request.get_json()
    # print("DAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTAAAAAAAAAAAA", data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            city=form.data['city'],
            state=form.data['state'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        user_obj = user.to_dict()
        user_obj['favorites'] = []
        return user_obj
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
