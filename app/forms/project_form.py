from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length,  NumberRange, ValidationError
from app.models import Project


def project_check(field):
  title = field.data
  project = Project.query.filter(Project.title ==title).first()
  if project:
    raise ValidationError('This project name already exsits.')

class ProjectForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired(message="Please provide a project title")])
  color = StringField("Color", validators=[DataRequired()])
  favorite = BooleanField("Favorite", validators=[DataRequired()])
