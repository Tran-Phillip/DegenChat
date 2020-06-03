import React from "react"
import "./UserPanel.scss"
import Logo from "../../images/logo_black_white.png"
import { Button, MuiThemeProvider, createMuiTheme } from "@material-ui/core"

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


type UserPanelProps = {
    username: string,
    addRoom: Function
}

type UserPanelState = {
    rooms: Array<any>
}


class UserPanel extends React.Component<UserPanelProps, UserPanelState>{

    constructor(props:any){
        super(props);
        this.state = {
            rooms: []
        }
    }

    async createNewRoom() {
        let roomName = window.prompt("room Name: ");
        await fetch("http://localhost:8080/api/v1/PostRoom", {
                method: 'POST',
                body: JSON.stringify({Name: roomName, UsersInRoom: [this.props.username]})
        })
        this.props.addRoom(roomName)
        
    }

    render(){
        return(
            <div className="UserPanel">
                <div className="Panel">
                    <img className="UserPanelLogo" src={Logo}></img>
                    <div className="UsernameDisplay">
                        <h1>{this.props.username}</h1>
                    </div>
                    <div className="FriendsOnline">
                        <p>Friends 1:</p>
                        <p>Online</p>
                    </div>
                    <MuiThemeProvider theme={ButtonTheme}>
                        <Button color="primary" variant="contained" onClick={this.createNewRoom.bind(this)} > New Room </Button>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default UserPanel