import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import './globalcss.scss';


import Dashbord from './dashbord';
import Add_list from './add_list';



class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
      <div>

        <Link to="/list">
          <Button variant="primary" renderAs="button">
            Record List 
          </Button>
        </Link>

        <Link to="/list/new">
          <Button variant="primary" renderAs="button">
            Add Record 
          </Button>
        </Link>

        <Switch>
          <Route exact path="/list" component={Dashbord} />
          <Route exact path="/list/new" component={Add_list} />
          <Route path="/list/:id" component={Add_list} />
          
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
