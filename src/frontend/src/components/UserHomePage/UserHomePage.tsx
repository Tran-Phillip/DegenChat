import React from "react"
import UserPanel from "../UserPanel/UserPanel"

import "./UserHomePage.scss"

type UserHomePageProps = {
    username: string
}

type UserHomePageState = {
    UserRooms: Array<any>
}


class UserHomePage extends React.Component<UserHomePageProps, UserHomePageState>{

    constructor(props:any){
        super(props);
        this.state = {
            UserRooms: []
        }
    }

    addRoom(room: string){
        this.state.UserRooms.push(room)
        this.setState({});
    }

    render(){
        const rooms = this.state.UserRooms.map(room => <p>{room}</p>);
        return (
            <>
                <div className="UserHomePage">
                    {rooms}
                    <UserPanel username = {this.props.username} addRoom={this.addRoom.bind(this)}/>
                </div>
     
            </>
        )
    }
}

export default UserHomePage