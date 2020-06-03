import React from "react"
import Logo from "../../images/logo_black_white.png";
import { TextField, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import TransitionButton from "../TransitionButton/TransitionButton"
import TransitionTextInput from "../TransitionTextInput/TransitionTextInput"
import "./SigninComponent.scss"
import { Slide, Fade } from "react-awesome-reveal";
import { Redirect } from "react-router-dom";

// TODO: Combine with RegisterView

const TextFieldTheme = createMuiTheme({
    overrides: {
        MuiTextField: {
            root: {
                margin: "5px",
                padding: "5px"
            }
        }
    },
    palette: {
        primary: {
        light: '#757ce8',
        main: '#7FC5F8',
        dark: '#6FB6EA',
        contrastText: '#000',
        },
        secondary: {
        light: '#ff7961',
        main: '#F87F7F',
        dark: '#E86A6A',
        contrastText: '#000',
        },
    },
    typography: {
        "fontFamily": `"Quicksand", sans-serif`,
        "fontSize": 20,
        "fontWeightLight": 300,
        "fontWeightRegular": 300,
    },
});

type SignInComponentProps = {
    RedirectTo: Function
    SetUser: Function
}

type SignInComponentState = {
    choiceMade: boolean
    validEntry: boolean | undefined
}


class SignInComponent extends React.Component<SignInComponentProps, SignInComponentState> {
    
    username: string 
    password: string 

    constructor(props:any){
        super(props);
        this.username = ""
        this.password = ""

        this.state = {
            choiceMade:false,
            validEntry: undefined
        }
    }  

    updateUsername(event:any){
        this.username = event.target.value 
    } 

    updatePassword(event2:any){
        this.password = event2.target.value
    }

    async submit(){
        this.setState({
            choiceMade: true
        })
        console.log(this.username + " | " + this.password )
        let response = await fetch("http://localhost:8080/api/v1/Users/"+this.username)
        let jsonResponse = await response.json()

        if(Object.keys(jsonResponse).length === 0){ // not in system
            this.setState({
                validEntry: false,
                choiceMade: false
            })
        }
        else {

            if(jsonResponse.Password != this.password){ // incorrect password
                this.setState({
                    validEntry: false,
                    choiceMade: false
                })
            }
            else {
                
                this.props.SetUser(this.username)
                this.setState({
                    choiceMade: true
                })
                await new Promise(r => setTimeout(r, 500)); // wait for our animation to finish
                this.setState({
                    validEntry: true
                })
                await new Promise(r => setTimeout(r, 500)); // wait for our animation to finish
                this.props.RedirectTo("/homepage")
            }
           
        }

    }

    async cancel(){
        this.setState({
            choiceMade: true
        })
        await new Promise(r => setTimeout(r, 500)); // wait for our animation to finish
        this.props.RedirectTo("/")
    }
    
    render() {

        if(this.state.validEntry != undefined && !this.state.validEntry){
            return (
                <MuiThemeProvider theme={TextFieldTheme}>
                <div className="SignInComponent">
                    <img className="LoginPageLogo" src={Logo} />
                    <p>Login credentials do not match any in our system. Please try again.</p>
                    <TransitionTextInput text="Username" onChange={this.updateUsername.bind(this)} listen={this.state.choiceMade} />
                    <TransitionTextInput text="Password" onChange={this.updatePassword.bind(this)} listen={this.state.choiceMade} />
                    <TransitionButton color="primary" text = "Submit" onClick={this.submit.bind(this)} listen={this.state.choiceMade}/>
                    <TransitionButton color="secondary" text = "Cancel" onClick={this.cancel.bind(this)} listen={this.state.choiceMade}/>
                </div>
                </MuiThemeProvider>
            )
        }
        else if(this.state.validEntry != undefined && this.state.validEntry){
            return (
            <MuiThemeProvider theme={TextFieldTheme}>
                <div className="SignInComponent">
                    <img className="LoginPageLogo" src={Logo} />
                    <p>Success!</p>
                </div>
            </MuiThemeProvider>
            )
        }
        return(
            <MuiThemeProvider theme={TextFieldTheme}>
                <div className="SignInComponent">
                    <img className="LoginPageLogo" src={Logo} />
                    <TransitionTextInput text="Username" onChange={this.updateUsername.bind(this)} listen={this.state.choiceMade} />
                    <TransitionTextInput text="Password" onChange={this.updatePassword.bind(this)} listen={this.state.choiceMade} />
                    <TransitionButton color="primary" text = "Submit" onClick={this.submit.bind(this)} listen={this.state.choiceMade}/>
                    <TransitionButton color="secondary" text = "Cancel" onClick={this.cancel.bind(this)} listen={this.state.choiceMade}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SignInComponent;