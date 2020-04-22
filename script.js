var canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const  sq = 20;

// tetrominos 
const Z = [[[1,1,0],[0,1,1],[0,0,0]],
			[[0,0,1],[0,1,1],[0,1,0]],
			[[0,0,0],[1,1,0],[0,1,1]],
			[[0,1,0],[1,1,0],[1,0,0]]];

const S = [[[0,1,1],[1,1,0],[0,0,0]],
			[[0,1,0],[0,1,1],[0,0,1]],
			[[0,0,0],[0,1,1],[1,1,0]],
			[[1,0,0],[1,1,0],[0,1,0]]];

const J = [[[0,1,0],[0,1,0],[1,1,0]],
			[[0,0,0],[1,0,0],[1,1,1]],
			[[1,1,0],[1,0,0],[1,0,0]],
			[[1,1,1],[0,0,1],[0,0,0]]];

const T = [[[0,0,0],[1,1,1],[0,1,0]],
			[[0,1,0],[1,1,0],[0,1,0]],
			[[0,1,0],[1,1,1],[0,0,0]],
			[[0,1,0],[0,1,1],[0,1,0]]];

const L = [[[0,1,0],[0,1,0],[0,1,1]],
			[[0,0,1],[1,1,1],[0,0,0]],
			[[1,1,0],[0,1,0],[0,1,0]],
			[[0,0,0],[1,1,1],[1,0,0]]];


const I = [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
			[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
			[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
			[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]];

const O = [[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
			[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
			[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
			[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]];
//creating the board 
const ROW = 15;
const COL = 30;
const VACANT = "#eee";
var board = [];
for (var r=0; r<ROW;r++){
	board[r] = [];
	for(var c=0; c<COL;c++){
		board[r][c] = VACANT;
		drawSq(r,c,VACANT);
	}
}

// drawing functions
function drawSq(x,y,color){
	context.fillStyle = color;
	context.fillRect(x*sq,y*sq,sq,sq);
	context.strokeStyle = "#ddd";
	context.strokeRect(x*sq,y*sq,sq,sq);
}

//tetromino construction function
function piece(tetromino,color){
	this.tetromino = tetromino;
	this.tetrominoN = 0;
	this.activeTetromino = this.tetromino[this.tetrominoN];
	this.color = color;
	this.x = 3;
	this.y = -2;
}
piece.prototype.draw = function(){
	for(var r=0; r<this.activeTetromino.length;r++){
	for(var c=0; c<this.activeTetromino.length;c++){
		if(this.activeTetromino[r][c]) drawSq((this.x)+c,(this.y)+r,this.color);
	}
	}
}
piece.prototype.unDraw = function(){
	for(var r=0; r<this.activeTetromino.length;r++){
	for(var c=0; c<this.activeTetromino.length;c++){
		if(this.activeTetromino[r][c]) drawSq((this.x)+c,(this.y)+r,VACANT);
	}
	}
}
piece.prototype.collision = function(x,y,piece){
	for(var r=0; r<30;r++){
		for(var c=0; c<15; c++){
			if(!piece[r][c]){continue;}
			let newX = this.x + c + x;
			let newY = this.y + r + y;
			if(newY<0) {continue;}
			return(newX<0 || newX>ROW || newY<0 ||newY>COL || board[newY][newX] != VACANT);
			
			}
		}
	}

piece.prototype.moveDown = function(){
	if(!this.collision(0,1,this.activeTetromino)){
		this.unDraw();
		this.y++;
		this.draw();
	}else{
		//lock
	}
	
}
piece.prototype.moveLeft = function(){
	if(!this.collision(-1,0,this.activeTetromino)){
		this.unDraw();
		this.x--;
		this.draw();
	}	
}

piece.prototype.moveRight = function(){
	if(!this.collision(1,0,this.activeTetromino)){
		this.unDraw();
		this.x++;
		this.draw();
	}	
}


piece.prototype.rotate = function(){
	let nextPattern = this.tetromino[(this.tetrominoN +1)% this.tetromino.length];
	if(!this.collision(1,0,nextPattern)){
		this.unDraw();
		this.tetrominoN = (this.tetrominoN +1)% this.tetromino.length;
		this.activeTetromino = this.tetromino[this.tetrominoN];
		this.draw();
	}
}

// event listener for keyboard 
document.addEventListener("keydown", control);
function control(event){
	switch(event.keyCode){
		case 37:
		//move left
		case 38: 
		//rotate
		case 39: 
		//move right
		case 40:
		//move down
	}
}


let Zpiece = new piece(Z,"yellow");
Zpiece.y = 4;
Zpiece.draw();
setInterval(Zpiece.moveDown(), 100);