# CollabCode
Collaborative code editor developed as part of the Discover Intern Hackathon. Allows for live editing from multiple users. 

## Use Case Scenario: 
Many companies use proxies and IT Policies to restrict access to data coming in from and going out to different networks. Because of this, it's often tricky to employ pair programming tasks, as applications such as VSCode's LiveShare aren't available for use. CollabCode attempts to solve this problem by creating a code editor capable of highlighting syntax for multiple languages, while allowing users to edit said code on-the-fly, with each other.

## Tech Stack:

### Frontend:
- React.js (CRA Template) - Javascript framework for building PWAs
- Socket.io-client - websocket library for streaming information to and from a server
- Codemirror - versatile text editor implemented in Javascript
- Bootstrap - Popular Front-end css framework used for styling applications

### Backend:
- Socket.io - Library that enables real-time, event-based communication
- Node.js - Javascript runtime built on Chrome's V8 Javascript engine
- Nodemon - Tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## How to Run:
Run `npm install` in the collabCode folder to install all frontend dependencies.
Run `npm install` in the server directory inside the collabCode folder to install all backend dependencies.

Run `npm start` in the collabCode folder to start the UI.
Run `npm run dev` in the server directory inside the collabCode folder to start the backend server with nodemon if running locally.
Run `npm start` in the server directory inside the collabCode folder to start the backend server with node.