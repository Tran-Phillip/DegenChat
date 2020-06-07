package pool

import ( 
	"fmt"
	"log"
	"github.com/gorilla/websocket"
)

type Message struct { 
	Type int `json:"type"`
	Body string `json:"body"`
}

type Client struct {
	ID string 
	Conn *websocket.Conn 
	Pool *Pool
}

func (c *Client) Read() {
    defer func() {
        c.Pool.Unregister <- c
        c.Conn.Close()
    }()

    for {
        _, p, err := c.Conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
        message := Message{Type: 2, Body: string(p)}
        fmt.Printf("Message Received: %+v\n", message)
        c.Pool.Broadcast <- message
    }
}