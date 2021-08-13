import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

import Login from './components/Login/Login'
import Editor from './components/Editor/Editor'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
      <ReactNotification />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/:id" component={Editor} exact />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
