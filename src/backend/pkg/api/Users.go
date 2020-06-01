package api 

import (
	"net/http"
	"encoding/json"
)

type User struct { 
	Username string `json:"Username"`
	ID int `json:"ID"`
}

type Users struct {
	currentUsers []User
}


func InstantiateUsers() *Users {
	return( &Users{
		currentUsers: []{ User{"phillz", 1111}, UserP"cloud", 2222}
	})
}

func (users *Users) HandleGetRequest(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint hit: Users")

	for _, user := range users.currentUsers{
		json.NewEncoder(w).Encode(user)
	}

}