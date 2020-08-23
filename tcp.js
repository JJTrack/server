const net = require('net');
const port = 8080;
const host = "";
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


// Create instance of server 
const server = net.createServer(onClientConnection);

// CSV writer 
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: ['TIME', 'NODEUUID', 'BLEUUID', 'RSSI', 'PACKETID']
});

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
			let today = new Date();
			let time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			let RSSI = `${data[0]}`;
			let BLEUUID = `${data[1]}:${data[2]}:${data[3]}:${data[4]}:${data[5]}:${data[6]}`;
			let NodeUUID = `${data[7]}:${data[8]}:${data[9]}:${data[10]}:${data[11]}:${data[12]}`;
			let PacketID =  `${data[13]}:${data[14]}:${data[15]}:${data[16]}:${data[17]}:${data[18]}:${data[19]}:${data[20]}`;
			
			console.log(`${sock.remoteAddress}:${sock.remotePort} Says : 
			RSSI = ${RSSI}
			BLEUUID = ${BLEUUID}
			NodeUUID = ${NodeUUID}
			PacketID = ${PacketID}
			Time = ${time}`);
			console.log()

			let record = [[time, NodeUUID, BLEUUID, RSSI, PacketID]];

			csvWriter.writeRecords(record).then( console.log("data written"));       // returns a promise
			
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


// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
// var blah = time +" "+date;
// Send back the data to the client
// sock.write(blah);