from app.models import db, Task
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task1 = Task(id=1, user_id=1, project_id=1, task='Sign up for the blood drive',
                 completed=False, prioirty=1, due_date=date(2022, 7, 15))
    task2 = Task(id=2, user_id=1, project_id=1, task='Rescue the cat from the tree',
                 completed=False, prioirty=2, due_date=date(2022, 7, 21))
    task3 = Task(id=3, user_id=1, project_id=1, task='Mow the neighbors grass',
                 completed=False, prioirty=3, due_date=date(2022, 7, 7))
    task4 = Task(id=4, user_id=1, project_id=1, task='Make cookies with grandma',
                 completed=False, prioirty=4, due_date=date(2022, 7, 14))
    task5 = Task(id=5, user_id=1, project_id=1, task='Volunteer at the animal shelter',
                 completed=False, prioirty=1, due_date=date(2022, 7, 10))
    task6 = Task(id=6, user_id=1, project_id=1, task='Save the family from the burning car',
                 completed=False, prioirty=2, due_date=date(2022, 7, 22))

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
