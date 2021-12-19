function Map1(w, h){
	this.w = w/10;
	this.h = h/10;

	//10 obstacles in a row
	//1 = platform, 0 = nothing
	this.map_array = [
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		1,1,1,1,1,1,1,1,1,1,
		0,0,0,0,0,0,0,0,0,0
	];

	//save boundaries from map_array for collision
	this.rows = this.map_array.length / 10;
	this.geometric_map_array = [];
	var tmp = 0;
	var curr_row = 1;
	
	for(var i=0; i<this.rows; i++){
		for(var j=0; j<10; j++){
			if(this.map_array[j+tmp] === 1){
				var new_boundarie = {xpos: this.w * j, ypos: this.h * i, w: this.w, h: this.h, isObstacle: true};
				this.geometric_map_array.push(new_boundarie)
			}
			if(this.map_array[j+tmp] === 0){
				continue
			}
		}
		tmp += 10;
	}
	
	console.log(this.collision_array)
}

module.exports = Map1;
