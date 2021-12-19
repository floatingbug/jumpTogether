function Player(x, y, socket_id, w, h, color){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.socket_id = socket_id;
	
}

Player.prototype.useGravity = function(){
	this.y += 1;
}

module.exports = Player;
