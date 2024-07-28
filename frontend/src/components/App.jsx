import Home from './Home';
import Login from './Login';
import CreateEvent from './CreateEvent';
import EventList from './EventList';
import Register from './Register';
import Admin from './Admin';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/create-event" element ={<CreateEvent/>} />
          <Route path="/event-list" component={<EventList/>} />
          <Route path="/admin" component={<Admin/>} />
          <Route path="/home" element ={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
/*import React from 'react';
import CreateEvent from './CreateEvent';
import EventList from './EventList';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/create-event" component={CreateEvent} />
            <Route path="/event-list" component={EventList} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/register" component={Register} />
            <Route exaAct path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="*">
              <h2>404 Not Found</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App; */
