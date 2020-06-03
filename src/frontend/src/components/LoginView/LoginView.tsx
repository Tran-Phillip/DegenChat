import React from "react"
import { Fade } from "react-awesome-reveal"
import TransitionButton from "../TransitionButton/TransitionButton"
import Logo from "../../images/logo_black_white.png";

import "./LoginView.scss";


type LoginViewProps = {
    RedirectTo: Function
}

type LoginViewState = {
    choiceSelected: boolean
}

class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    
    constructor(props:any){
        super(props);
        this.state = {
            choiceSelected: false
        }
    }
    async login() {
        this.setState({
            choiceSelected: true
        })

        await new Promise(r => setTimeout(r, 500)); // wait for our animation to finish
        this.props.RedirectTo("/login")
    }

    async register() {
        this.setState({
            choiceSelected: true 
        })
        await new Promise(r => setTimeout(r, 500)); // wait for our animation to finish
        this.props.RedirectTo("/register");
    }

    render() {
        return (
                <div className="LoginComponent">
                    <img className="LoginPageLogo" src={Logo} />
                <Fade delay={300}>

                    <TransitionButton color={"primary"} text="Login" onClick={this.login.bind(this)} listen={this.state.choiceSelected} />
                    <TransitionButton color={"secondary"} text="Register" onClick={this.register.bind(this)} listen={this.state.choiceSelected}/>
                </Fade>

                </div>
        )
    }
}

export default LoginView