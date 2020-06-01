import React from "react";
import LoginView from "../LoginView/LoginView";
import RegisterView from "../RegisterView/RegisterView"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import "./LoginComponentRouter.scss";
/*
 This will handle the routing for the Login Components

  | - LoginComponent
  | - RegisterView
  | - LoginView 

*/
type LoginCompnentRouterProps = {

}

type LoginComponentRouterState = {
    redirectTo: string
}



class LoginComponentRouter extends React.Component<LoginCompnentRouterProps, LoginComponentRouterState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            redirectTo: "/"
        }

    }

    setRedirect(_redirectTo: string){
        this.setState({
            redirectTo: _redirectTo
        })
    }

    render() {
        console.log(this.state.redirectTo);
        return (
            <Router>
                <Switch>
        <Route path="/register" render={(props:any) => <RegisterView {...props} RedirectTo={this.setRedirect.bind(this)}/>}/>
                    <Route path= "/" render={(props: any) => <LoginView {...props} RedirectTo={this.setRedirect.bind(this)}/>}/>
                </Switch>
                <Redirect to={this.state.redirectTo}/>

            </Router>
        )
    }

}

export default LoginComponentRouter

