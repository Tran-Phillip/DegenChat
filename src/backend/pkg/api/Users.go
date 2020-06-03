package api 

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
)

type User struct { 
	Username string `json:"Username"`
	Password string `json:"Password"`
	ID int `json:"ID"`
}

type Users struct {
	currentUsers map[string]*User
}

// constructor
func InstantiateUsers() *Users {
	Users := Users{}
	Users.currentUsers = make(map[string]*User)
	// Testing api. DELE me
	Users.currentUsers["Phillip"] = &User{"Phillip", "admin", 1111}
	Users.currentUsers["Cloud"] = &User{"Cloud", "admin", 2222}

	return &Users
}

func (users *Users) GETAllUsers(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Users")

	for _, user := range users.currentUsers{
		fmt.Println(user)
		json.NewEncoder(w).Encode(user)
	}

}

func (users *Users) GETSingleUser(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Single User")
	vars := mux.Vars(r)
	key := vars["username"]

	toReturn := users.currentUsers[key]

	if(toReturn == nil){
		json.NewEncoder(w).Encode(Error("No results found"))
		return
	}

	json.NewEncoder(w).Encode(toReturn)
}

func (users *Users) POSTUser(w http.ResponseWriter, r *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Content-Type", "application/json")
	fmt.Println("Endpoint hit: Post User")

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatal("Could not parse request body")
	}


	var createdUser User;
	json.Unmarshal(body, &createdUser)

	fmt.Println("Creating: " , createdUser)

	users.currentUsers[createdUser.Username] = &createdUser

}