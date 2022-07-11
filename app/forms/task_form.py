from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task


class TaskForm(FlaskForm):
  project_id = IntegerField("Project", validators=[DataRequired(message="Please associate task with a valid project")])
  task = StringField("Task", validators=[DataRequired(message="Please provide a description")])
  completed = BooleanField("Completed")
  prioirty = BooleanField("Priority")
  due_date = DateField('Due Date')
