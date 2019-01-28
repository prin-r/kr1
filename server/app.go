package main

import (
	"log"
	"net/http"

	"github.com/dgraph-io/badger"
)

func main() {

	opts := badger.DefaultOptions
	opts.Dir = "./badgerdb"
	opts.ValueDir = "./badgerdb"
	db, err := badger.Open(opts)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fs := http.FileServer(http.Dir("../front/public"))
	http.Handle("/", fs)

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
