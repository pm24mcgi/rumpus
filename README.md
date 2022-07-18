<h1 align="center">Rumpus</h1>

<p align="center">The notes app to keep track of your daily activites</p>

<p align="center"><a  href="https://rumpus.herokuapp.com/">Live Demo</a></p>

## Splash Page
![Screenshot_1](https://user-images.githubusercontent.com/99216796/179481280-0103aeca-5938-4d36-a6cc-f2e52975c3c9.jpg)

## Login and Signup
![Screenshot_2](https://user-images.githubusercontent.com/99216796/179481281-200049cc-fe31-491b-b6dd-188400792ced.jpg)
![Screenshot_3](https://user-images.githubusercontent.com/99216796/179481282-51bf317e-837c-4929-9b08-4c72e695d5d2.jpg)

## Main
![Screenshot_4](https://user-images.githubusercontent.com/99216796/179481283-6c8c3925-8360-43b2-8dfc-f8706cc7611c.jpg)
![Screenshot_6](https://user-images.githubusercontent.com/99216796/179481286-9f0465b6-802e-4999-abb5-760cd4783f24.jpg)

## Add Projects and Tasks
![Screenshot_7](https://user-images.githubusercontent.com/99216796/179481287-8c8555b9-9008-413a-8965-d2ab575e9c94.jpg)
![Screenshot_5](https://user-images.githubusercontent.com/99216796/179481284-8c4e87ab-ba63-413c-84b0-e528dbd43a6e.jpg)
![Screenshot_8](https://user-images.githubusercontent.com/99216796/179481288-1518241b-f6c5-478a-843a-71ace663de8e.jpg)


# Summary & Next Steps
Rumpus is a full stack application mirrioring the fuinctionality of todist. Users can maintain valuable information in order to complete various tasks. Additional functionality is under development and can be found under **_Future Features_** in the Features section listed below.

# Getting started
1. Clone this repository
```
https://github.com/pm24mcgi/rumpus
```
2. Install dependencies at the root level
```
pipenv install
```
3. Install dependencies in the react-app folder
```
cd react-app
npm install
```

4. Create a .env file
5. Setup your PostgreSQL user and database
6. Create, migrate and seed your database
```
pipenv run flask db upgrade
pipenv run flask seed all
```
7. Run `pipenv shell` and `flask run` on the root level, then run `npm start` from the react-app folder


# Application Architecture
Rumpus utilizes a React.js/Redux frontend and a Flask backend. The database was constructed with PostgresSQL.

# Technologies Used
* [Javascript](https://www.javascript.com/)
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com/en/2.1.x/)
* [Flask SQL Alchmey](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [Flask Alembic](https://flask-alembic.readthedocs.io/en/stable/)
* [PostgresSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

# Future Features
<p>Rumpus would benefit greatly from chat and meetings components. Chat will utilize web socket technology in order to speak with other users in real-time. Meetings can be assigned from one user to another, with the inclusion of physical locations, encorporating the google maps API.</P>

# Contact
<a href="https://github.com/pm24mcgi">Developer's Github</a> | <a href="https://github.com/pm24mcgi/rumpus">Git for Rumpus</a> |
<a href="https://github.com/pm24mcgi/rumpus/wiki">Git Wiki for Rumpus</a>
