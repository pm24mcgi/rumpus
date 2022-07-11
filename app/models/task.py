from .db import db
from datetime import datetime


class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  project_id = db.Column(
      db.Integer, db.ForeignKey("projects.id"), nullable=False)
  task = db.Column(db.String(2000), nullable=False)
  completed = db.Column(db.Boolean, nullable=False, default=False)
  priority = db.Column(db.Integer, nullable=False)
  due_date = db.Column(db.Date)
  created_at = db.Column(db.DateTime, default=datetime.now())

  # Relationships
  users = db.relationship("User", back_populates="tasks")
  projects = db.relationship("Project", back_populates="tasks")

  def to_dict(self):
      return {
          "id": self.id,
          'user_id': self.user_id,
          'project_id': self.project_id,
          'task': self.task,
          'completed': self.completed,
          'priority': self.priority,
          'due_date': self.due_date,
          'created_at': self.created_at
      }
