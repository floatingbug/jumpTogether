const socket = io();

const c = document.createElement('canvas');
document.body.appendChild(c)
c.width = 800;
c.height = 600;
c.style.position = "absolute";
c.style.display = "block";
c.style.left = "0";
c.style.right = "0";
c.style.top = "0";
c.style.bottom = "0";
c.style.margin = "auto";
const ctx = c.getContext('2d');
var players = [];
var map = [];

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

	//receive map-data
	socket.on('map', (data)=>{
		map = data;
	})
	
	//draw the game
	draw()
	
	//clean game data
	cleanGameData()
	
	setTimeout(()=>{
		requestAnimationFrame(gameloop)
	}, 500)
}

//start the gameloop
gameloop()

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

function cleanGameData(){
	map = [];
}

function draw(){
	cleanCanvas()
	
	//draw the map
	for(var i=0; i<map.length; i++){
		ctx.fillStyle = 'green';
		ctx.fillRect(map[i].xpos, map[i].ypos, map[i].w, map[i].h)
	}

	//draw all players
	for(var i=0; i<players.length; i++){
		ctx.fillStyle = players[i].color;
		ctx.fillRect(players[i].x, players[i].y, players[i].w, players[i].h)
	} 
}
