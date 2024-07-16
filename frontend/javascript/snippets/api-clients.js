// Simplest API clients, without external dependencies, usable from browser console

// Rest
let response = await fetch("https://example.com/", {
    "headers": {},
    "body": null,
    "method": "GET"
});
console.log(await response.text())

// GraphQL
let response = await fetch("https://countries.trevorblades.com/", {
    "headers": {
        "content-type": "application/json",
    },
    "body": "{\"query\":\"query {\\n  countries {\\n    name\\n  }\\n}\\n\",\"variables\":null}",
    "method": "POST"
});
console.log(await response.text())

// gRPC - no simple API client

// Websockets
const ws = new WebSocket('wss://ws.postman-echo.com/raw')
ws.onmessage = (message) => {
    console.log(`message received`, message.data)
}
ws.send('hello world')

// sse
const eventSource = new EventSource("//www.w3schools.com/html/demo_sse.php" );
eventSource.onmessage = (event) => {
    console.log(event)
}

