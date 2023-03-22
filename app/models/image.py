from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String, nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')))

    location = db.relationship("Location", back_populates="images")
    user = db.relationship("User", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'img_url': self.img_url,
            'location_id': self.location_id,
            'user_id': self.user_id,
            # 'review_id': self.review_id
        }
