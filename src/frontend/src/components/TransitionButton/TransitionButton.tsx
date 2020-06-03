import React from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";


import "./TransitionButton.scss";
import { Slide, Fade } from "react-awesome-reveal";
// UI Material Button that plays an animation and transitions out on click


const ButtonTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "10px",
                padding: "10px"
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

type TransitionButtonProps = {
    color: "primary" | "secondary"
    text: string
    onClick?: Function
    listen? : boolean // determines whether or not to 'listen' to a state variable in the parent
                      // if listen becomes true (the parent's state variable becoming true), then it will signal
                      // all transition buttons to play their transition.
}

type TransitionButtonState = {
    clicked: boolean
}

class TransitionButton extends React.Component<TransitionButtonProps, TransitionButtonState> {

    constructor(props: any){
        super(props);
        this.state = {
            clicked: false
        }
    }


    onClick() {
        this.setState({
            clicked: true
        })
        if(this.props.onClick != undefined){
            this.props.onClick()
        }
    }

    render() {

        if(this.state.clicked || this.props.listen) {
            return ( // slide transition the button out
                <MuiThemeProvider theme={ButtonTheme}>
                    <Slide reverse={true} triggerOnce={true} duration={500}>
                        <Fade reverse={true} triggerOnce={true} duration={500}>
                            <Button size="large" variant="contained" color={this.props.color}>  {this.props.text}  </Button>
                        </Fade>
                    </Slide>
                </MuiThemeProvider>
            )
        }
        else {
            return (
                <MuiThemeProvider theme={ButtonTheme}>
                    <Slide triggerOnce={true} delay={200}>
                        <Fade triggerOnce={true}>
                            <Button onClick={this.onClick.bind(this)} size="large" variant="contained" color={this.props.color}>  {this.props.text}  </Button>
                        </Fade>
                    </Slide>
                </MuiThemeProvider>
            )
        }
    }
}

export default TransitionButton