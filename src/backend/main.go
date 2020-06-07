package main 
import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/Tran-Phillip/DegenChat/pkg/api"
)



func main() {
	r := mux.NewRouter()

	Users := api.InstantiateUsers()
	Rooms := api.InitRooms()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "api home page")
	})

	// Users
	r.HandleFunc("/api/v1/Users", Users.GETAllUsers)
	r.HandleFunc("/api/v1/Users/{username}", Users.GETSingleUser)
	r.HandleFunc("/api/v1/PostUsers", Users.POSTUser).Methods("POST")

	// Rooms
	r.HandleFunc("/api/v1/Rooms", Rooms.GETAllRooms)
	r.HandleFunc("/api/v1/Rooms/{username}", Rooms.GETRoomsByUser)
	r.HandleFunc("/api/v1/PostRoom", Rooms.POSTRoom).Methods("POST")
	r.HandleFunc("/api/v1/OpenWS/{roomName}", Rooms.OpenWS)
	r.HandleFunc("/api/v1/Join/{roomName}/{username}", Rooms.JoinRoom)


	http.ListenAndServe(":8080", r)
}