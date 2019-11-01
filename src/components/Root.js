import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from '../containers/Home';
import Game from '../containers/Game';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
function Root() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/game" >
                < Game />
            </Route>
            <Route exact path="/sign-in">
                <SignIn />
            </Route>
            <Route exact path="/sign-up">
                <SignUp />
            </Route>
        </Switch>
    )
}

export default Root;