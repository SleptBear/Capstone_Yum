from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, DateTimeField)
from wtforms.validators import DataRequired

class LocationForm(FlaskForm):
    name = StringField("Name", validators=[(DataRequired())])
    description = StringField("Description", validators=[(DataRequired())])
    phone = StringField("Phone", validators=[(DataRequired())])
    city = StringField("City", validators=[(DataRequired())])
    state = StringField("State", validators=[(DataRequired())])
    address = StringField("Address", validators=[(DataRequired())])
    operating_hours = StringField("Hours of Operation", validators=[DataRequired()])
    zipcode = IntegerField("Zipcode", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
    price = StringField("Price")
    # created_at = StringField("Created At")
    submit = SubmitField("Submit")
