const express = require("express");
const app = express();


let data = 'Initial Data';

const waitingClients = [];

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
})


app.get('/getData', (req,res) => {
    //if the data has changed
    if(data !== req.query.lastData){
        res.json({
            data
        })
    } else {
        //if the data has not changed, we have to hold the request (waiting for the data to change) (for that we have to add the request's response to the waitingClients array)
        waitingClients.push(res);     //“Hey, I’ll reply to this client later — I’ll just keep their res handy.” ( it holds the connection by saving res in waitingClients.)
    }

})


// Use post/put to update the data
//to leverage the data from the database/server (so that it can be updated in real-time , so that the client can get the updated data)
app.get('/updateData', (req, res) => {
    //lets get data from query-param
    data = req.query.data;

    //now we have to notify all the waiting clients
    while(waitingClients.length){
        const client = waitingClients.shift(); //shift() method removes the first element from an array and returns that element ( client is nothing but the client's response)
        client.json({
            data
        })
    }

    res.send({success: 'Data updated successfully'});
})



const port = process.env.PORT || 5011;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})