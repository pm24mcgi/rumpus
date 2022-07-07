from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    dylan = User(
        first_name='Dyaln', last_name='Peate', username='DPeaty', email='dpeate@aa.io', password='password')
    fino = User(
        first_name='Augustino', last_name='Elisaia', username='lilgusty', email='lilgusty@aa.io', password='password')
    john = User(
        first_name='John', last_name='Hinds', username='SeedData4life', email='seederman@aa.io', password='password')

    db.session.add(dylan)
    db.session.add(fino)
    db.session.add(john)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
