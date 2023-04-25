from .db import db, environment, SCHEMA, add_prefix_for_prod


favoriteJoined = db.Table(
    "favoritejoined",
    db.Model.metadata,
    db.Column("location_id", db.ForeignKey(add_prefix_for_prod("locations.id")), primary_key=True),
    db.Column("favorite_id", db.ForeignKey(add_prefix_for_prod("favorites.id")), primary_key=True),
)
if environment == "production":
    favoriteJoined.schema = SCHEMA


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    
     ## relationship attributes
    locations = db.relationship("Location", back_populates="favoriteJoined", secondary=favoriteJoined)
    user = db.relationship("User", back_populates="favorites")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "locations": [location.to_dict() for location in self.locations],
        }
