# Trafikrapport

POC for getting reports from SR's API for traffic incidents

## Application

### Structure
 
A backend serving the frontend with refreshed reports
 
#### Backend

A backend in node.js with an express server serving htmltemplates to the frontend.
A Json file mocks a database, but along with it comes some shortcomings and missed opportunities in trade for a faster POC.

- Express, body-parser, cors for server
- Socket.io for communication between server/client
- Axios for datafetching
- Nodecron for scheduling.

#### Frontend

The frontend is split in two pages where you either register or login with one form and remove a user with the other form.
When registering/logging in the user is sent to another page that connects to the server via socket.io. 
The user has to share geolocation to get reports. 

The report consists of title, prio, location, description, and category. 

- HTML
- CSS
- JQuery

### Todo

- Add proper database 
- Separate sockets more and make them more specific for each user
- Work on scheduling (commented out ATM)
- Add more tests
- Add more rigourus error handling
- More work on usability 
- Remake backend to serve as api for a frontend application

## Run
### `yarn`
To install the dependencies

### `yarn start`
Runs the app on [http://localhost:5000](http://localhost:5000).

### `yarn test`

Launches a limited amount of test (1). The tests needs to be further developed, this falls outside my experience.

## Deployment

Currently lives on:  [https://backend-challenge-doro.herokuapp.com/](https://backend-challenge-doro.herokuapp.com/)

