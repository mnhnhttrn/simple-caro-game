import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Caro from "../containers/Caro";
import SignIn from "../containers/SignIn"
import SignUp from "../containers/SignUp"

const isLog = true

function Root() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/game" />
            </Route>
            <Route exact path="/game" >
                {
                    isLog ? <Caro /> : <Redirect to="/sign-in" />
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