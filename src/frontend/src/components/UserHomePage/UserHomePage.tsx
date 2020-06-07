import React from "react"
import UserPanel from "../UserPanel/UserPanel"
import RoomPanel from "../RoomPanel/RoomPanel"
import RoomView from "../RoomView/RoomView"


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import "./UserHomePage.scss"
import { Socket } from "dgram";

type UserHomePageProps = {
    username: string
}

type UserHomePageState = {
    CurrentRoom: string
}


class UserHomePage extends React.Component<UserHomePageProps, UserHomePageState>{
    UserRooms:Array<any>
    Routes: Array<any>
    Messages: Array<any>
    sockets: any
    constructor(props:any){
        console.log("called")
        super(props);
        this.UserRooms = []
        this.Routes = []
        this.Messages = []
        this.sockets = {}
        this.state = {
            CurrentRoom: "/"
        }
        
    }

    componentDidMount(){
        console.log("Mounting")
        fetch("http://localhost:8080/api/v1/Rooms/"+this.props.username)
        .then( (result) => result.json())
        .then( (jsonData) => {
            for(var i = 0; i < jsonData.length; i++){
                let socket = new WebSocket("ws://localhost:8080/api/v1/OpenWS/" + jsonData[i]["Name"])
                socket.onopen = () =>{
                    console.log("Socket connected: ")
                }
                socket.onmessage = (msg) => {
                    console.log("Msg got: ", msg)
                    let jsonMsg =JSON.parse(msg.data)
                    if(jsonMsg.type == 1){
                        this.displayRooms()
                    }
                    else if(jsonMsg.type == 2){
                        console.log("Got chat message", jsonMsg.body)
                        this.Messages.push(jsonMsg.body)
                        this.setState({})
                    }
                }
                socket.onclose = () => {
                    console.log("Closing the socket")
                }
                this.sockets[jsonData[i]["Name"]] = socket
            }

        })
        this.displayRooms()
    }

    componentWillUnmount() {
        console.log("Unmounting")
    }

    addMessage(message: string, room: string) {
        this.sockets[room].send(message)
        
    }

    appendMessage(message: string){
        this.Messages.push(message)
    }

    displayRooms() {
        fetch("http://localhost:8080/api/v1/Rooms/"+this.props.username)
        .then( (result) => result.json())
        .then( (jsonData) => {
            for(var i = 0; i < jsonData.length; i++){
                console.log(jsonData[i]["UsersInRoom"])
                this.UserRooms.push({Name: jsonData[i]["Name"], InRoom: jsonData[i]["UsersInRoom"]})
            }
            this.setState({})
        })
    }

    addRoom(room: any){
        fetch("http://localhost:8080/api/v1/Rooms/"+this.props.username)
        .then( (result) => result.json())
        .then( (jsonData) => {
            for(var i = 0; i < jsonData.length; i++){
                console.log(jsonData[i]["UsersInRoom"])

                this.UserRooms.push({Name: jsonData[i]["Name"], InRoom: jsonData[i]["UsersInRoom"]})
            }
            this.setState({})
        })
    }

    addSocket(room: string, socket: any) {
        this.sockets[room] = socket
    }


    redirectTo(to:string){
        this.setState({CurrentRoom:"/rooms/"+to})
        this.Messages = []
    }

    updateParent(){
        this.setState({})
    }

    render(){
        console.log("DIR: " , this.state.CurrentRoom)
        console.log("MSG: ", this.Messages)
        return (
            <Router>
                <Switch>
                    {this.Routes}
                    <Route path="/" render={this.defaultView.bind(this)}/>
                </Switch>
                <Redirect to={this.state.CurrentRoom}/>
            </Router>
        )
    }



    defaultView(){
        console.log("DefaultView")
        if(this.state.CurrentRoom != "/"){
            return
        }
        let rooms = this.UserRooms.map(room => <RoomPanel RoomName={room.Name} UsersInRoom={room.InRoom} RedirectTo={this.redirectTo.bind(this)}/> );
        this.Routes = this.UserRooms.map(room => <Route path={"/rooms/"+room.Name} render = {( ) => <RoomView roomName={room.Name} messages={this.Messages} addMessage={this.addMessage.bind(this)} />  } /> );

        console.log(rooms, this.UserRooms)
        this.UserRooms = []
        return(
            <div className="Container">
            <div className="UserHomePage">
                {rooms}
            </div>
            <UserPanel username = {this.props.username} addRoom={this.addRoom.bind(this)} displayRooms={this.displayRooms.bind(this)} appendMessage={this.appendMessage.bind(this)} updateParent={this.updateParent.bind(this)} addSocket={this.addSocket.bind(this)} />
        </div>
        )
    }
}

export default UserHomePage