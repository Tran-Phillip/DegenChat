import React from "react"
import { TextField, createMuiTheme, MuiThemeProvider  } from '@material-ui/core';
import { Slide, Fade } from "react-awesome-reveal";

// Text input field that displays animation when clicked

type TransitionTextInputProps = {
    text: string
    onChange: Function
    listen?: boolean 
}

type TransitionTextInputState = {
    
}

class TransitionTextInput extends React.Component<TransitionTextInputProps, TransitionTextInputState>{
    text: string 
    constructor(props:any){
        super(props)
        this.text = ""
        
    }

    render() {
        if(this.props.listen) {
            return(
                <Slide reverse={true}  triggerOnce={true} duration={500}>
                    <Fade reverse={true} triggerOnce={true} duration={500}>
                        <TextField color="primary" id="outlined-basic" label={this.props.text} variant="outlined" onChange={this.props.onChange.bind(this)}/>
                    </Fade>
                </Slide>
            )
        }
        else {
            return(
                <Slide  triggerOnce={true}>
                    <Fade triggerOnce={true}>
                        <TextField color="primary" id="outlined-basic" label={this.props.text} variant="outlined" onChange={this.props.onChange.bind(this)}/>
                    </Fade>
                </Slide>
            )
        }
    }
}

export default TransitionTextInput