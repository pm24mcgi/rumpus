from .db import db
from datetime import datetime


class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  color = db.Column(db.String(100), nullable=False, default='')
  favorite = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.now())

  # Relationships
  users = db.relationship("User", back_populates="projects")
  tasks = db.relationship("Task", back_populates="projects", cascade="all, delete")

  def to_dict(self):
    return {
        "id": self.id,
        'user_id': self.user_id,
        'title': self.title,
        'color': self.color,
        'favorite': self.favorite,
        'created_at': self.created_at
    }
