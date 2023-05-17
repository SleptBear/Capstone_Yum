from flask_wtf import FlaskForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.image_form import ImageForm
from .aws_upload import get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    print("TESTING USER HERE===========================>", user)
    return user.to_dict()

@user_routes.route('/profile-pic', methods=['POST'])
@login_required
def changePicture():
    # print(request)
    # data = request.get_json()
    # print("DATA===============================", data)
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
    user = User.query.get(current_user.id)

    user.prof_pic = url
    db.session.commit()

    return user.to_dict()
