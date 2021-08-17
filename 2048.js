let cells = document.querySelectorAll(".cell");
let game = document.querySelector("body");
let randomValues = [2,4];
let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

/*for (let i = 0; i < cells.length; i++){
	cells[i].innerHTML = i;
}*/


function hasardPosition(){
	let aux = [];
	for (let i = 0; i < board.length; i++){
		if (board[i] === 0){
			aux.push(i);
		}			
	}
	return aux[Math.floor(Math.random() * aux.length)];
}

function hasardValue(){
	return randomValues[Math.floor(Math.random() * 2)]
} 

function fillBoard(){
	for (let i = 0; i < cells.length; i++){
		if(board[i]!==0){
			cells[i].innerHTML = board[i];
		}	
	}
}

function newPlay(){
	board[hasardPosition()] = hasardValue();
	fillBoard();
}

board[hasardPosition()] = hasardValue();
newPlay();

game.addEventListener( "keyup", evt=> {
	if(evt.key === "ArrowUp"){
		newPlay();	
	};
});