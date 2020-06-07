package api 

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"log"
	"github.com/Tran-Phillip/DegenChat/pkg/pool"
	"github.com/gorilla/websocket"
	"github.com/gorilla/mux"
)

type Room struct {
	Name string `json:"Name"`
	UsersInRoom []string `json:"UsersInRoom"`
	Pool *pool.Pool `json:"Pool"`
}

type Rooms struct {
	ListOfRooms map[string]map[string]*Room `json:"ListOfRooms"`
}

func InitRooms() *Rooms {
	RoomMap := make(map[string]map[string]*Room)
	actualMap := make(map[string]*Room)
	RoomMap["rooms"] = actualMap
	// RoomMap["rooms"][testRoom.Name] = &testRoom
	// RoomMap["rooms"][testRoom2.Name] = &testRoom2
	return &Rooms{
		RoomMap,
	}
}

func (rooms *Rooms) GETAllRooms(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Rooms")
	toRet := []Room{}
	for _, room := range rooms.ListOfRooms["rooms"]{
		fmt.Println(room)
		newRoom := Room{room.Name, room.UsersInRoom, nil}
		toRet = append(toRet, newRoom)
	}
	json.NewEncoder(w).Encode(toRet)

}

func (rooms *Rooms) GETRoomsByUser(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Rooms by User")
	vars := mux.Vars(r)
	key := vars["username"]
	toRet := []Room{}
	for _, room := range rooms.ListOfRooms["rooms"] {
		for _, user := range room.UsersInRoom {
			if user == key {
				toRet = append(toRet, Room{room.Name, room.UsersInRoom, nil})
				break
			}
		}
	}
	json.NewEncoder(w).Encode(toRet)
	

}

func (rooms *Rooms) POSTRoom(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Post Room")
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatal("Could not parse request body")
	}

	var createdRoom Room;
	json.Unmarshal(body, &createdRoom)

	pool := pool.NewPool()
	createdRoom.Pool = pool
	fmt.Println("Creating: " , createdRoom)
	rooms.ListOfRooms["rooms"][createdRoom.Name] = &createdRoom
	
	// spin up the pool
	go createdRoom.Pool.Start()
}

func (rooms *Rooms) JoinRoom(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Join Room")
	vars := mux.Vars(r)
	roomName := vars["roomName"]
	username := vars["username"]

	if room, found := rooms.ListOfRooms["rooms"][roomName]; found {
		room.UsersInRoom = append(room.UsersInRoom, username)
		room.Pool.Broadcast <- pool.Message{Type: 1, Body: "New User Entered"}
		
	} else {
		fmt.Println("Room does not exisit")
		return 
	}

}

func (rooms *Rooms) OpenWS(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Endpoint hit: Opening WS")
	vars := mux.Vars(r)
	key := vars["roomName"]

	// create a websocket for that room to use
	var upgrader = websocket.Upgrader {
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool{return true},
	}

	ws, err := upgrader.Upgrade(w,r,nil)

	if err != nil {
		fmt.Println("Error: Failed to connect", err)
	}

	client := &pool.Client { 
		Conn: ws, 
		Pool: rooms.ListOfRooms["rooms"][key].Pool,
	}
	rooms.ListOfRooms["rooms"][key].Pool.Register <- client 
	fmt.Println("Client Connected", key, ws)
	client.Read();
}