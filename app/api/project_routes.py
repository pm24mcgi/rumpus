from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms.project_form import ProjectForm
from .utils import validation_errors_to_error_messages

project_routes = Blueprint('projects', __name__)


@project_routes.route('')
@login_required
def all_projects():
  projects = Project.query.all()
  return {project.id: project.to_dict() for project in projects}

@project_routes.route('/add', methods=['POST'])
@login_required
def new_project():
  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    new_project = Project(
      user_id=current_user.to_dict()['id'],
      title=data['title'],
      color=data['color'],
      favorite=data['favorite']
    )
    db.session.add(new_project)
    db.session.commit()
    return new_project.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
  project = Project.query.get(id)
  form = ProjectForm()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    project.title=data['title'],
    project.color=data['color'],
    project.favorite=data['favorite']

    db.session.commit()
    return project.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    db.session.delete(project)
    db.session.commit()
    return "Project deleted successfully"
