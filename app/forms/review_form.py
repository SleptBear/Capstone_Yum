from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, DateTimeField)
from wtforms.validators import DataRequired
from app.models import Review

class ReviewForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[(DataRequired())])
    location_id = IntegerField("Product Id", validators=[(DataRequired())])
    review = StringField("Review", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    # created_at = StringField("Created At")
    submit = SubmitField("Submit")
