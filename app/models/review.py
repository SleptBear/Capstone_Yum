from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    # Relationships
    user = db.relationship("User", back_populates='reviews')
    location = db.relationship("Location", back_populates="reviews")
    images = db.relationship("Image", back_populates="review")

    def to_dict(self):
        return {
            'id': self.id,
            'review': self.review,
            'rating': self.rating,
            'user_id': self.user_id,
            'location_id': self.location_id,
            'created_at': self.created_at,
            'updated_at': self.created_at
        }
