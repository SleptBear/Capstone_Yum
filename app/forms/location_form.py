from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, DateTimeField)
from wtforms.validators import DataRequired, ValidationError
from app.models import Location



def name_exists(form, field):
    #Check if name is unique
    name = field.data
    location = Location.query.filter(Location.name == name).first()
    if location:
        raise ValidationError('Name already in use.')
def address_exists(form, field):
    #Check if name is uniue
    address = field.data
    location = Location.query.filter(Location.address == address).first()
    if location:
        raise ValidationError('Address already in use.')


class LocationForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), name_exists])
    phone = StringField("Phone", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired(), address_exists])
    zipcode = IntegerField("Zipcode", validators=[DataRequired()])
    price = StringField("Price")
    description = StringField("Description", validators=[(DataRequired())])
    category = StringField("Category", validators=[DataRequired()])
    operating_hours = StringField("Hours of Operation", validators=[DataRequired()])
    # owner_id = IntegerField("Owner_Id", validators=[DataRequired()])
    # created_at = StringField("Created At")
    # submit = SubmitField("Submit")
