package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/dgraph-io/badger"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

const letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

var url2urlMapping = make(map[string]string)
var address2Message = make(map[string]string)

type Registration struct {
	URL     string `json:"url"`
	Address string `json:"address"`
	R       string `json:"r"`
	S       string `json:"S"`
	V       uint8  `json:"v"`
}

func getRandString(n uint8) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
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
	shorten, ok := params["id"]
	if !ok {
		json.NewEncoder(w).Encode("wrong input format")
		return
	}

	log.Println(shorten)

	url, ok := url2urlMapping[shorten]
	if !ok {
		json.NewEncoder(w).Encode("unknown url")
		return
	}

	json.NewEncoder(w).Encode(url)
}

func GetMessage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	address, ok := params["id"]
	if ok {
		message := getRandString(16)
		address2Message[address] = message
		json.NewEncoder(w).Encode(message)
		return
	}
	json.NewEncoder(w).Encode(nil)
}

func Register(w http.ResponseWriter, r *http.Request) {
	registration := Registration{}
	err := json.NewDecoder(r.Body).Decode(&registration)
	if err != nil {
		json.NewEncoder(w).Encode("wrong input format")
		return
	}
	message, ok := address2Message[registration.Address]
	if !ok {
		json.NewEncoder(w).Encode("address not found")
		return
	}

	shortenUrl := getRandString(8)
	url2urlMapping[shortenUrl] = registration.URL
	json.NewEncoder(w).Encode(registration.Address + " | " + message + " | " + shortenUrl)
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
	router.HandleFunc("/getmessage/{id}", GetMessage).Methods("GET")
	router.HandleFunc("/mapping/{id}", GetLink).Methods("GET")

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":9091", handler))
}
