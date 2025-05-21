import {client} from './client.js';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//TODO: to expose REST call  (DONE:)
//which internally call gRPC server functions using gRPC client

// using this grpc-client(client), we can make gRPC calls to the gRPC server

app.get('/', (req, res) => {
    //(first param is the metadata (what we want to send), second param is the callback)
    client.getAll(null, (err, data) => {
    //   res.send(data.customers);  

        if(!err){
        res.send(data);  
        }else{
            res.status(500).send(err);
        }
    })

})
app.post('/create', (req, res) => {

    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    client.insert(newCustomer, (err, data) => {
        if(err){
            throw err;
        }else{
            console.log("Customer added successfully", data);
            res.send({message: "Customer added successfully"});
        }
    })

})
app.post('/update', (req, res) => {

    const updateCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    client.update(updateCustomer, (err, data) => {
        if(err){
            throw err;
        }else{
            console.log("Customer updated successfully", data);
            res.send({message: "Customer updated successfully"});
        }
    })

})
app.post("/remove", (req, res) => {

    // const removeCustomer = {
    //     id: req.params.id
    // }

    //for now get the id from body itself instead of params
    const removeCustomer = {
        id: req.body.customer_id
    }

    client.remove(removeCustomer, (err, data) => {
        if(err){
            throw err;
        }else{
            console.log("Customer removed successfully", data);
            res.send({message: "Customer removed successfully"});
        }
    })
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})