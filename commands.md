flask db downgrade
rm -rf migrations/
flask db init
flask db migrate
flask db upgrade
flask seed all
