from flask import Blueprint, jsonify, request
from app.models import Location, db
from flask_login import login_required, current_user

location_routes = Blueprint('locations', __name__)

@location_routes.route('')
def allLocations():
    locations = Location.query.all()
    print("locations =========>", locations)

    return []
