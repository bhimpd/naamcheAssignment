# naamcheAssignment
web application that allows user to perform CRUD operation with login session.
# Design Choices and Technologies Used
- Node.js and Express.js: Used for the backend server and handling API routes.
- MongoDB: A NoSQL database used to store product and user data.
- Express Session: Used for session management to keep track of user authentication.
- Bcrypt: Used for hashing user passwords for secure storage.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
 # Project Structure
The project follows a modular structure with separate files for routes, controllers, models, and middleware. This promotes code organization and maintainability.
# Authentication and Sessions
User authentication is implemented using bcrypt for password hashing and Express Session for session management. The loginSession middleware ensures that routes requiring authentication are protected.
# Product Management
The application provides CRUD (Create, Read, Update, Delete) functionality for products. Pagination is implemented in the getAllProducts route to display products in a paginated manner.
# run application
- nodemon index.js
