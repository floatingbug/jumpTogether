const io = require('socket.io')();
const socketapi = {
	io: io
}
const Player = require('./Player');
const players = [];
const Map1 = require('./maps/map1');
const map1 = new Map1(800, 600);

io.on('connection', (socket)=>{
	var player = new Player(50, 50, socket.id, 20, 20, 'orange')
	players.push(player)

	//handle player-input
	socket.on('keyCode', (keyCode)=>{
		movePlayer(socket, keyCode)
	})
	
	socket.on('disconnect', (socket)=>{
		players.pop()
	})

	//game-loop
	setInterval(()=>{
		if(players.length !== 0){
			//call useGravity-function from all Players
			players[0].useGravity()

			//send all updated players to all clients
			io.emit('allPlayers', players)
			
			//send the map to all user
			io.emit('map', map1.geometric_map_array)
		}
	}, 1000/60);
	
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




module.exports = socketapi;
