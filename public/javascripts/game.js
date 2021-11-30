const socket = io();

const c = document.createElement('canvas');
document.body.appendChild(c)
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext('2d');
var players = [];

//send player inputs to server
window.addEventListener('keydown', sendPlayerInputs)

function gameloop(){
	//receive data from all players
	socket.on('allPlayers', (allPlayers)=>{
		for(var i=0; i<allPlayers.length; i++){
			players = [];
			players.push(allPlayers[i])
		}
	})
	
	//draw the game
	draw()
	
	//call the gameloop again
	requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)

function sendPlayerInputs(e){
	e.preventDefault()
	if(e.keyCode === 37 || e.keyCode === 39){
		socket.emit('keyCode', e.keyCode)
		console.log(e.keyCode)
	}
}

function cleanCanvas(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
}

function draw(){
	cleanCanvas()
	
	//draw all players
	for(var i=0; i<players.length; i++){
		ctx.fillStyle = players[i].color;
		ctx.fillRect(players[i].x, players[i].y, players[i].w, players[i].h)
	} 
}
