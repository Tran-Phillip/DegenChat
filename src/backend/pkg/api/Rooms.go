package api 

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"log"
)

type Room struct {
	Name string `json:"Name"`
	UsersInRoom []string `json:"UsersInRoom"`
}

type Rooms struct {
	ListOfRooms map[string]*Room `json:"ListOfRooms"`
}

func InitRooms() *Rooms {
	testRoom := Room{"TestRoom", nil}
	RoomMap := make(map[string]*Room)
	RoomMap[testRoom.Name] = &testRoom
	return &Rooms{
		RoomMap,
	}
}

func (rooms *Rooms) GETAllRooms(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Rooms")

	for _, room := range rooms.ListOfRooms{
		fmt.Println(room)
		json.NewEncoder(w).Encode(room)
	}
}

func (rooms *Rooms) POSTRoom(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	fmt.Println("Endpoint hit: Post Room")
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatal("Could not parse request body")
	}

	var createdRoom Room;
	json.Unmarshal(body, &createdRoom)

	fmt.Println("Creating: " , createdRoom)

	rooms.ListOfRooms[createdRoom.Name] = &createdRoom
}