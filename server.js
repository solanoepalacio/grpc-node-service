const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    './messages/webapp.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

messagesProto = grpc.loadPackageDefinition(packageDefinition).greetings;

const serviceMethods = {
    sayHello: (call, callback) => {
        const message = "hello" + call.request.name
        callback(null, { helloMessage: message });
    }
}

function main () {
    const server = new grpc.Server()
    server.addService(messagesProto.Greeter.service, serviceMethods);
    server.bind('0.0.0.0:9000', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("Server has started")
}

main()
