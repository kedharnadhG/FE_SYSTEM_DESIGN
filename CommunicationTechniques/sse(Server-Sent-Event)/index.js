const express = require("express");
const path = require("path");
const app = express();
const {join} = require('node:path');

app.get('/sse', (req, res) => { //it will keep-on streaming data from the server to the client
    //setup sse logic (how the server-side handling will be done)

    //1) data has going to be long-live 
    // 2) data is going to transfered in the event-stream
    // (these are the 2-info's that i have to set in the header(how my responses are going to be))

    res.setHeader('Content-Type', 'text/event-stream'); //i'm going to stream the data into the text-format

    res.setHeader('Connection', "keep-alive");  //single-connection
    res.setHeader("Cache-Control", "no-cache"); //while streaming we don't want any cache to happen

    // for to keep-on sending, we use (res.write), by this i keep-on writing any sort of data.
    res.write('data: Welcome to Server Sent Event \n\n ') ;

    //here: I want something to get the real-time data (connecting to db & getting some updated data that logic in a certain-Intervals...)

    const intervalId = setInterval(()=> {
        //(NOT req.json() & req.send(); instead we're using req.write() )
        // (eq.write() -> writing in a text format on the same Uni-directional Connection)
        res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`)
    }, 5000);

    //if in-any case Connection closed due to by manual/something ( we need to clear the Interval)

    req.on("close", () => {
        clearInterval(intervalId); //we don't want the interval keep-on running, so that There's No-Mem leak on the server
    })

})

app.get('/', (req, res) => {
    res.sendFile( join(__dirname, 'index.html'));
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})