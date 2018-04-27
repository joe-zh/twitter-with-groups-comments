import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import SignX from './SignX';
import Logout from './Logout';
import AuthHOC from './AuthHOC';
import NewsFeed from './NewsFeed';
import NavBar from './NavBar';
import EditProfile from './EditProfile';
import EditGroup from './EditGroup';
import Flashes from './Flashes';
import Profile from './Profile';
import Group from './Group';
import CreateGroup from './CreateGroup';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container-fluid">
        <NavBar />
        <Flashes />
        <Switch>
          <Route path="/signx" component={SignX}/>
          <Route path="/feed" component={AuthHOC(NewsFeed)}/>
          <Route path="/logout" component = {AuthHOC(Logout)}/>
          <Route path="/profile/:id?" component={AuthHOC(Profile)} />
          <Route path="/group/:id?" component={AuthHOC(Group)} />
          <Route path="/create-group" component={AuthHOC(CreateGroup)} />
          <Route path="/edit-profile" component={AuthHOC(EditProfile)}/>
          <Route path="/edit-group" component={AuthHOC(EditGroup)}/>
          <Route component={SignX}/>
        </Switch>
        <div>    
        </div>
      </div>
    );
    // should create a router with the following structure
    // /profile/:id? => Profile must be protected (hint how  can we use AuthHOC?)
    // /signx => SignX
    // /logout => Logout (must be protected)
    // /edit-profile  => EditProfile must be authenticated
    // /feed => NewsFeed must be authenticated

    // If it doesn't match anything, just put  the following syntax to say, render the signx page
    // <Route component={SignX}/>
    // Note the above should all be within a switch
    //
    // final html structure will look like
    //
    // <div class="container-fluid">
    //    ...navigation bar from NavBar
    //    ...flashes from Flashes
    //    <div>
    //      .. whatever route we are on
    //    </div>
    //  </div>
  }
}


export default App;
