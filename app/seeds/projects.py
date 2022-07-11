from app.models import db, Project

# Adds a demo user, you can add other users here if you want


def seed_projects():
    BeBetter = Project(user_id=1, title='Superman',
                       color='orange', favorite=False)
    project2 = Project(user_id=2, title='Project 2',
                       color='orange', favorite=False)
    project3 = Project(user_id=1, title='Project 3',
                       color='orange', favorite=False)

    db.session.add(BeBetter)
    db.session.add(project2)
    db.session.add(project3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
