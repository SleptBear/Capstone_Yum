from .db import db, environment, SCHEMA, add_prefix_for_prod


class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Float(precision=9, asdecimal=True))
    lng = db.Column(db.Float(precision=9, asdecimal=True))
    price = db.Column(db.Integer)
    operating_hours = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # Relationships
    owner = db.relationship("User", back_populates="locations")
    images = db.relationship("Image", back_populates="location", cascade="all, delete")
    reviews = db.relationship("Review", back_populates="location", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'phone': self.phone,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'zipcode': self.zipcode,
            'lat': self.lat,
            'lng': self.lng,
            'price': self.price,
            'operating_hours': self.operating_hours
        }
