import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from '../containers/Home';
import SinglePlayer from '../containers/SinglePlayer';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
function Root() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/single-player" >
                < SinglePlayer />
            </Route>
            <Route exact path="/sign-in">
                <SignIn />
            </Route>
            <Route exact path="/sign-up">
                <SignUp />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default Root;