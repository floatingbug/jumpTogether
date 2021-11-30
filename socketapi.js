const io = require('socket.io')();
const socketapi = {
	io: io
}
const Player = require('./Player');

const players = [];

io.on('connection', (socket)=>{
	var player = new Player(50, 50, socket.id, 20, 20, 'orange')
	players.push(player)
	
	socket.on('keyCode', (keyCode)=>{
		movePlayer(socket, keyCode)
	})
	
	socket.on('disconnect', (socket)=>{
		players.pop()
	})

	//game-loop
	setInterval(()=>{
		//call useGravity-function from all Players
		players[0].useGravity()
		//send all updated players to all clients
		io.emit('allPlayers', players)
	}, 1000/60)
	
})


function movePlayer(socket, keyCode){
	const player = players.find(player => player.socket_id === socket.id)
	
	if(keyCode === 37){
		player.x -= 1;
	}
	else if(keyCode === 39){
		player.x += 1;
	}
}

function callGravityFunctions(){
	for(var i=0; i<players.length; i++){
		players[i].useGravity()
	}
}



module.exports = socketapi;
