import React from "react"
import Logo from "../../images/logo_black_white.png";
import { TextField, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import TransitionButton from "../TransitionButton/TransitionButton"
import TransitionTextInput from "../TransitionTextInput/TransitionTextInput"
import "./RegisterView.scss"
import { Slide, Fade } from "react-awesome-reveal";
import { Redirect } from "react-router-dom";

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

type RegisterViewProps = {
    RedirectTo: Function
}

type RegisterViewState = {
    choiceMade: boolean
    validEntry: boolean | undefined
}


class RegisterView extends React.Component<RegisterViewProps, RegisterViewState> {
    
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

        if(Object.keys(jsonResponse).length === 0){
            console.log(jsonResponse)
            console.log("ok")
            
            // POST our user 
            await fetch("http://localhost:8080/api/v1/PostUsers", {
                method: 'POST',
                body: JSON.stringify({Username: this.username, Password: this.password, ID: 0})
            })

            this.setState({
                validEntry: true,
                choiceMade: true
            })
            await new Promise(r => setTimeout(r, 2000)); // wait for our animation to finish
            this.props.RedirectTo("/")

            
        }
        else {
            this.setState({
                validEntry: false,
                choiceMade: false
            })
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
                <div className="RegisterView">
                    <img className="LoginPageLogo" src={Logo} />
                    <p>Username is already taken. Please try again</p>
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
                <div className="RegisterView">
                    <img className="LoginPageLogo" src={Logo} />
                    <p>Account Successfully Created!</p>
                </div>
            </MuiThemeProvider>
            )
        }
        return(
            <MuiThemeProvider theme={TextFieldTheme}>
                <div className="RegisterView">
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

export default RegisterView;