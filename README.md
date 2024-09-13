
# PROJECT TITLE
Intranet Centar Municipality

# SETUP INSTRUCTIONS
## Prerequisites

Ensure Node.js is installed. This includes npm (Node Package Manager). You can download and install Node.js from nodejs.org. Alternatively, you can use nvm to manage multiple Node.js versions. 

Verify the installation with the command: npm - v  // this checks for the current NPM version installed on your machine

## Installation

Clone the repository
git clone https://github.com/yourusername/intranet-centar-municipality.git
use cd to locate the folder once cloned (usually C:\Users\...)

Install dependencies if necessary

## Start the backend server
cd api 

npm run build

npm start

the backend server will start at http://localhost:8800

## For the frontend
cd client

npm run dev

render the frontend on your browser, usually at http://localhost:3000

## For the dashboard CMS 
cd intranet-admin

npm run dev

render the CMS on your browser, usually at http://localhost:3000, unless the frontend app is running, in that case it will most likely re-route to http://localhost:3001

# USAGE
The Intranet Centar Municipality application is designed to provide a centralized hub for managing and accessing various employee and service data within the municipality. The application is split into two main interfaces:

*User Interface*

Navigate through the multi-page site using a responsive design that adapts to different devices.
Search for employee information using the search bar, which retrieves accurate results from the backend.
View service details, documents, and other relevant information.

*Admin Dashboard (CMS)*

Accessible to authorized personnel, the admin dashboard provides a clean and simple UI for managing employee data.
Perform CRUD (Create, Read, Update, Delete) operations on employee records, services, and documents.
The CMS ensures all changes are immediately reflected across the system.

# AUTHOR
Marko Šego - Shegara (https://github.com/Shegara)



