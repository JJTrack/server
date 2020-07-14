const net = require('net');
const port = 8080;
const host = "192.168.1.105";

// Create instance of server 
const server = net.createServer(onClientConnection);

// Start listening with the server on given port and host.
server.listen(port, host, function() {
	console.log(`server started on port ${port} at ${host}`);
});

// Declare connection listener function
function onClientConnection(sock){
	// Log when a client connects.
	console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
	// Listen for data from the connected client.
	sock.on('data', function(data){
			//Log data from the client 
			console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data} `);
			// Send back the data to the client
			sock.write(`Howwwddeedooo Joseph`);
		});
		
	// Handle client connection termination.
	sock.on('close', function() {
			console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection `);
		});
		
	// Hande client conenction error.
	sock.on('error', function(error){
			console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
		});
};
