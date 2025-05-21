import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { v4 as uuidv4 } from 'uuid';

import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use __dirname
const PROTO_PATH = path.join(__dirname, '../customers.proto');

//we need to load the proto file syncronously
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true,
    oneofs: true
});

//once loaded, we can define our grpc object
const customersProto = grpc.loadPackageDefinition(packageDefinition);

//using this customersProto object we can create a new grpc server
const server = new grpc.Server();


//In-memory database
const customers = [
    {
        id: "1",
        name: "Chirag Goel",
        age: 30,
        address: "123 Bangalore"
    },
    {
        id: "2",
        name: "Akshay Saini",
        age: 25,
        address: "Uttarakhand"
    }
]




//now we can add our service, (which takes the service name and the implementation object)
server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {
        //we can make a db-call and return the data to the client
        callback(null, { customers });    //the first-param "null" means no error i.e success
    },
    get: (call, callback) => {
        let customer = customers.find(c => c.id === call.request.id);

        if(customer){
            callback(null, customer);
        }else{
            callback({ 
                code: grpc.status.NOT_FOUND, details: "Customer not found" 
            }, null);
        }
    },
    insert: (call, callback) => {
        let customer = call.request;

        customer.id = uuidv4();
        customers.push(customer);
        callback(null, customer);
    },
    update: (call, callback) => {
        let existingCustomer = customers.find(c => c.id === call.request.id);

        if(!existingCustomer){
            callback({ 
                code: grpc.status.NOT_FOUND, details: "Customer not found" 
            }, null);
        }else{
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        }
    },
    remove: (call, callback) => {
        let existingCustomerIndex = customers.findIndex(c => c.id === call.request.id);

        if(existingCustomerIndex === -1){
            callback({ 
                code: grpc.status.NOT_FOUND, details: "Customer not found" 
            }, null);
        }else{
            customers.splice(existingCustomerIndex, 1);
            callback(null, {message: "Customer removed successfully"});
        }
    },

})


//let's bind the ip and port, allow the insecure calls to be made
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err) => {
    if(err){
        console.error("Error starting gRPC server", err);
    }else{
        server.start();
        console.log("gRPC server started on port 30043");
    }
});
