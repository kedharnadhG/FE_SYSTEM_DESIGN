//this is the gRPC client

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

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

//when we are loading, what we need is CustomerService
const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;


//using this customersProto object we can create a new grpc client (with the params of ip & kind of credentials)
export const client = new CustomerService('127.0.0.1:30043', grpc.credentials.createInsecure());

// module.exports = client;

//now we are all set to make gRPC calls