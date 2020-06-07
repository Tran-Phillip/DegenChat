import React from "react"
import { Card, makeStyles, CardContent, Typography, MuiThemeProvider, createMuiTheme, Grid, Button } from "@material-ui/core"
import "./RoomPanel.scss"

const ButtonTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "10px",
                padding: "10px"
            }
        },
    },
    palette: {
        primary: {
        light: '#757ce8',
        main: '#FFFFFF',
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

type RoomPanelProps = {
    RoomName : string
    UsersInRoom: Array<string>
    RedirectTo: Function
}

type RoomPanelState = {

}

class RoomPanel extends React.Component<RoomPanelProps, RoomPanelState>{

    onClick() {
        this.props.RedirectTo(this.props.RoomName)
    }

    render(){
        const users = this.props.UsersInRoom.map( (user) => <p>• {user}</p>)

        return (
            <MuiThemeProvider theme={ButtonTheme}>
            <a>
                <Card className="RoomCard" color="primary" style={{backgroundColor:'#F87F7F'}}>
                    <CardContent>
                            <Grid
                                container 
                                direction="column"
                                alignItems="center"
                                justify="center">
                                <Button color="primary" variant="contained" className ="RoomNameBar" size="small" onClick={this.onClick.bind(this)}>
                                    {this.props.RoomName}
                                </Button>
                                
                            </Grid>
                        <Card className="PeopleInRoomContainer">
                            <CardContent>
                                <Typography>
                                    {users}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </a>

            
            </MuiThemeProvider>
        )
    }
}

export default RoomPanel