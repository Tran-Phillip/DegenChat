import React from "react";
import LoginView from "../LoginView/LoginView";
import RegisterView from "../RegisterView/RegisterView"
import SigninComponent from "../SigninComponent/SigninComponent"
import UserHomePage from "../UserHomePage/UserHomePage"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import "./LoginComponentRouter.scss";
import SignInComponent from "../SigninComponent/SigninComponent";
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
    currentUser: string
}



class LoginComponentRouter extends React.Component<LoginCompnentRouterProps, LoginComponentRouterState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            redirectTo: "/",
            currentUser: ""
        }

    }

    setRedirect(_redirectTo: string){
        this.setState({
            redirectTo: _redirectTo
        })
    }

    setUser(user: string){
        this.setState({
            currentUser: user
        })
    }

    render() {
        console.log(this.state.redirectTo);
        return (
            <Router>
                <Switch>
                    <Route path="/homepage" render={(props:any) => <UserHomePage {...props} username={this.state.currentUser} /> }/>
                    <Route path="/login" render={(props:any) => <SignInComponent {...props} RedirectTo={this.setRedirect.bind(this)} SetUser={this.setUser.bind(this)} />}/>
                    <Route path="/register" render={(props:any) => <RegisterView {...props} RedirectTo={this.setRedirect.bind(this)}/>}/>
                    <Route path= "/" render={(props: any) => <LoginView {...props} RedirectTo={this.setRedirect.bind(this)}/>}/>
                </Switch>
                <Redirect to={this.state.redirectTo}/>

            </Router>
        )
    }

}

export default LoginComponentRouter

