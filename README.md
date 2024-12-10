# online-gui-system

## i. Instructions to setup your app

### Cloning the Repository
On your local computer, navigate to the directory where you want to clone the repository.

To clone the repository, run the following command:

```
git clone https://github.com/stadimeti19/online-gui-system.git
```
Open the `online-gui-system` directory on your text editor or IDE.

### Frontend setup
1. Navigate to the frontend directory `cd /path/to/frontend`
2. Install dependencies `npm install`

### Backend setup
1. Navigate to the backend directory `cd /path/to/backend`
2. Install dependencies `npm install`
3. Create a .env file in the backend directory with the following content:
```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=business_supply
```
Replace your_password with your MySQL account password.

## ii. Instructions to run your app

### Frontend
Start the React development server:
```
npm start
```
Access the app in your browser at http://localhost:3000

### Backend
For development (with auto-reloading):
```
npm run dev
```

For production:
```
npm start
```

The backend server will be available at http://localhost:5001

## iii. Brief explanation of technologies used

### Technologies

Frontend
- React: To build a dynamic user interface for executing stored procedures and viewing database records.
* React Router: To manage navigation between screens.

Backend:
- Node.js: For running the backend server.
* Express.js: For creating API endpoints to handle stored procedure execution and view data retrieval.
+ MySQL2: For connecting to the MySQL database and executing SQL queries

Database:
- MySQL and MySQL Server: For managing data and supporting stored procedures and views.

Together, these technologies work together to create a full-stack application where users can interact with the database
through an intuitive UI, with backend MySQL integration for executing complex stored procedures, views, and other operations.

## iv. Work Distribution Among Team Members

Sashank Tadimeti
- Setup GitHub, frontend, backend and MySql db connection
* Integrated frontend with backend through express api routes
- Tested and fixed stored procedure/view issues

Maanas Baraya
- Designed and implemented majority of front-end 
* Tested and fixed stored procedure/view issues

Rithvik Reddygari
- Added dropdown menus for different attributes
* Tested and fixed stored procedure/view issues

Rithvik Mattipalli
- Added phase 3 stored procs and views logic (parameters) to UI
* Tested and fixed stored procedure/view issues