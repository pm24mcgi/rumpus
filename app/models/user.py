from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    photo = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    tasks = db.relationship("Task", back_populates="users")
    projects = db.relationship("Project", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'photo': self.photo
        }
