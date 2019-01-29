package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/dgraph-io/badger"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var urlMapping = make(map[string]string)

type DomainName struct {
	ID string `json:"id"`
}

func getDir() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return dir
}

func GetLink(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	json.NewEncoder(w).Encode(params["id"])
}

func Register(w http.ResponseWriter, r *http.Request) {

	domain := DomainName{}
	_ = json.NewDecoder(r.Body).Decode(&domain)

	json.NewEncoder(w).Encode("zxzxkzlkxlzkx : " + domain.ID)
}

func main() {
	dir := getDir()

	log.Println(dir)

	opts := badger.DefaultOptions
	opts.Dir = dir + "/badgerdb"
	opts.ValueDir = dir + "/badgerdb"
	db, err := badger.Open(opts)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := mux.NewRouter()

	router.HandleFunc("/register", Register).Methods("POST")
	router.HandleFunc("/{id}", GetLink).Methods("GET")

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":9091", handler))
}
