const net = require('net');
const port = 8080;
const host = "192.168.1.76";

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
			console.log(`${sock.remoteAddress}:${sock.remotePort} Says : 
			RSSI = ${data[0]} 
			BLEUUID = ${data[1]}:${data[2]}:${data[3]}:${data[4]}:${data[5]}:${data[6]}
			NodeUUID = ${data[7]}:${data[8]}:${data[9]}:${data[10]}:${data[11]}:${data[12]}
			PacketID = ${data[13]}:${data[14]}:${data[15]}:${data[16]}:${data[17]}:${data[18]}:${data[19]}:${data[20]}`);
			console.log()
			
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			var blah = time +" "+date;
			// Send back the data to the client
			sock.write(blah);
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
