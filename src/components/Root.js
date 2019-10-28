import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Game from "../containers/Game";
import SignIn from "../containers/SignIn"
import SignUp from "../containers/SignUp"

const isLog = false

function Root() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/game" />
            </Route>
            <Route exact path="/game" >
                {
                    isLog ? <Game /> : <Redirect to="/sign-in" />
                }
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