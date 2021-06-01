# Wait For Weight Loss ![License](https://img.shields.io/badge/License-ISC-blue.svg)
Full stack application utilizing MVC paradigm to save, update, and render users' weights over time to track weight gain/loss progression.


## Deployed Site Link 
https://wait-for-weight-loss.herokuapp.com/


## Table of Contents

- [Description, Setup, and Installation](#description-setup-and-installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Full License Information](#license-information)
- [Conrtibutors](#contributors)
- [Testing Performed](#testing-performed)
- [Questions](#questions)


## Description, Setup, and Installation
This application serves as the MVP for a weight tracking application. The installation and setup of this application is simple when running locally and even simpler when running through the deployed form; simply initialzie the database using "mysql -u root -p < <path>," install all essential dependencies using "npm i," and run the application through "npm start." These commands should initialize the important components of the application, from establishing the database schema to installing all functionality components, to spinning up the server that will handle all requests made at the front end.

As for the stack, the front end is established using HTML and HandlebarsJS to dynamically render different pages to users. Based on requests sent to the server from the client, cusstom API routes will follow CRUD to update user information at the backend and reflect those changes based on what is rendered. Additionally, there is session information that is stored during the time frame a user is interacting with the application, allowing them to view information that would otherwise not be attainable. 


## Usage
Many people in the world take their weight into account when it comes to their involvement in many fields of life; some of which include sports, modeling, general wellbeing, and even trying to fit into your favorite pair of pants. This application exists as a very simple and intuitive addition to this endeavor, reminding users that losing weight is a long journey that requires much patience to wait during each stage of change. 

As such, this application will take user data to track goal weights, current weights, and progression over time. Additionally, it can also graph and visually portray to the user their own journey and the changes that have ensued since they began. There are a plethora of other features to be added, such as filtering by unit time, notes to be made per day, as well as tips to aid users in achieving their end goals. Though this is the case, this application serves as the MVP for the project and in time, more features will be added.


## Technologies Used
- JavaScript
- Node.JS
- Express.JS
- Handlebars JS
- MySQL
- Google Charts

NPM
- Sequelize
- dotenv

Other
- Custom API routes 


## License Information
![License](https://img.shields.io/badge/License-ISC-blue.svg)

[License Link](https://opensource.org/licenses/ISC)


## Contributors
- Austin Joo
- Daisha Morrow [gitHub: dtm5169]
- Jose Guerrero [gitHub: jos23867]


## Questions
Please contact me with any questions, comments, or concerns regarding this repo or if you would like to be a fellow contributor to this project!
- GitHub: AustinJoo97 
- Email: austinjoo1997@gmail.com