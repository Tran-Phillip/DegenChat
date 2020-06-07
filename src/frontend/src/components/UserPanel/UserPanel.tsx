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
    addRoom: Function,
    displayRooms: Function
    appendMessage: Function
    updateParent: Function
    addSocket: Function
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
        let socket = new WebSocket("ws://localhost:8080/api/v1/OpenWS/" + roomName)
            socket.onopen = () =>{
                console.log("Socket connected: ")
            }
            socket.onmessage = (msg) => {
                console.log("Msg got: ", msg)
                let jsonMsg =JSON.parse(msg.data)
                if(jsonMsg.type == 1){
                    this.props.displayRooms()
                }
                else if(jsonMsg.type == 2){
                    this.props.appendMessage(jsonMsg.body)
                    this.props.updateParent()
                }
            }

        this.props.addSocket(roomName, socket)
        this.props.addRoom(roomName)
    }

    async joinRoom(){
        let roomName = window.prompt("Room To Join: ");
        await fetch("http://localhost:8080/api/v1/Join/"+roomName +"/" +this.props.username)
        let socket = new WebSocket("ws://localhost:8080/api/v1/OpenWS/" + roomName)
            socket.onopen = () =>{
                console.log("Socket connected: ")
            }
            socket.onmessage = (msg) => {
                console.log("Msg got: ", msg)
                let jsonMsg =JSON.parse(msg.data)
                if(jsonMsg.type == 1){
                    this.props.displayRooms()
                }
                else if(jsonMsg.type == 2){
                    this.props.appendMessage(jsonMsg.body)
                    this.props.updateParent()
                }
            }

        this.props.addSocket(roomName, socket)
        this.props.addRoom(roomName)
        this.props.addRoom("")
    }

    render(){
        return(
            <div className="UserPanel">
                <div className="Panel">
                    <div className="IconNameContainer">
                        <img className="UserPanelLogo" src={Logo}></img>
                        <div className="UsernameDisplay">
                            <h1>{this.props.username}</h1>
                        </div>
                    </div>
                    <div className="FriendsOnline">
                        
                    </div>
                    <MuiThemeProvider theme={ButtonTheme}>
                        <Button color="primary" variant="contained" onClick={this.createNewRoom.bind(this)} > New Room </Button>
                        <Button color="primary" variant="contained" onClick={this.joinRoom.bind(this)} > Join Room </Button>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default UserPanel