package main 
import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"https://github.com/Tran-Phillip/DegenChat/pkg/api"
)

func main() {
	r := mux.NewRouter()

	Users := api.InstantiateUsers()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "api home page")
	})

	r.HandleFunc("/Users", Users.HandleGetRequest)

	http.ListenAndServe(":8080", r)
}