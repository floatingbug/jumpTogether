function Map1(){
	//10 obstacles in a row
	//1 = platform, 0 = nothing
	this.map_array = [
		1,1,1,1,1,1,1,1,1,1
	];

	//save boundaries from map_array for collision
	this.rows = this.map_array.length / 10;
	this.collision_array = [];
	var tmp = 0;
	var curr_row = 1;
	var boundaries_1 = {x: 10, y: 10};
	
	for(var i=1; i<=this.rows; i++){
		for(var j=1; j<=10; j++){
			if(this.map_array[j+tmp] === 1){
				this.collision_array.push(boundaries_1.pos_x = )
			}
			if(this.map_array[j+tmp] === 0){

			}
		}
		tmp += 10;
	}
}

module.exports = Map1;
