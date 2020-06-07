import React from "react" 


type RoomViewProps = {
    roomName: string
    messages: Array<any>
    addMessage: Function
}

type RoomViewState = {

}

class RoomView extends React.Component<RoomViewProps, RoomViewState> {

    componentDidMount(){

    }

    onKeyPressed(event : any){
        if(event.key == "Enter") { 
            console.log("Message recieved")
            this.props.addMessage(event.target.value, this.props.roomName)
            event.target.value = ""
        }
    }

    render() {
        let shownMessages = this.props.messages.map( (msg) => <p> {msg} </p> )
        return( 
            <div className="RoomView">
                {shownMessages}
                <input onKeyPress={this.onKeyPressed.bind(this)} />
            </div>
        )
    }

}

export default RoomView