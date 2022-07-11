from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Task, db
from app.forms import TaskForm
from .utils import validation_errors_to_error_messages

task_routes = Blueprint('tasks', __name__)


# Route provides all avaialble tasks
@task_routes.route('')
def all_tasks():
    tasks = Task.query.all()
    return {task.id: task.to_dict() for task in tasks}


# Route creates a new task
@task_routes.route('/<int:project_id>/new', methods=['POST'])
@login_required
def new_task(project_id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        new_task = Task(
            user_id=current_user.to_dict()['id'],
            project_id=project_id,
            task=data['task'],
            priority=data['priority'],
            due_date=data['due_date']
        )
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Route updates a task
@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def update_review(task_id):
    task = Task.query.get(task_id)
    form = TaskForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task.project_id=data['project_id'],
        task.task=data['task'],
        task.completed=data['completed'],
        task.priority=data['priority'],
        task.due_date=data['due_date']
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Route deletes a task
@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    return task.to_dict()
