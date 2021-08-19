let cells = document.querySelectorAll(".cell");
let game = document.querySelector("body");
let gameEnd = document.querySelector("#gameEnd");
let writeScore = document.querySelector("#score");
let writeMove = document.querySelector("#move");
let newGame = document.querySelector("#newGame");
let undo = document.querySelector("#undo");
let randomValues = [2,4];
let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let oldBoard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let randomPosition;
let aux1 =[];
let aux2 =[];
let aux3 =[];
let aux4 =[];	
let copyBoard = [];
let maxValue = 0;
let winner = false;
let score = 0;
let oldScore;
let nMoves = 0; 	
let nMoveWinner;

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length){
		return false;
	} 
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true; 
}

function hasardPosition(){
	let aux = [];
	for (let i = 0; i < board.length; i++){
		if (board[i] === 0){
			aux.push(i);
		}			
	}
	randomPosition = aux[Math.floor(Math.random() * aux.length)];
	return randomPosition;
}

function hasardValue(){
	return randomValues[Math.floor(Math.random() * 2)]
} 

function fillBoard(){
	for (let i = 0; i < cells.length; i++){
		cells[i].className = "cell";
		addClass(board[i],i);
		if(board[i]!==0){
			cells[i].innerHTML = board[i];
		} else{
			cells[i].innerHTML = "";
		}	
	}
}

function newPlay(){	
	board[hasardPosition()] = hasardValue();	
}

function addClass(number, position){
	switch (number){
		case 0:
			cells[position].classList.add('class0');
			break;			
		case 2:
			cells[position].classList.add('class2');
			break;
		case 4: 
			cells[position].classList.add('class4');
			break;
		case 8: 
			cells[position].classList.add('class8');
			break;	
		case 16:
				cells[position].classList.add('class16');
				break;
		case 32: 
				cells[position].classList.add('class32');
				break;
		case 64: 
				cells[position].classList.add('class64');
				break;
		case 128:
			cells[position].classList.add('class128');
			break;
		case 256: 
			cells[position].classList.add('class256');
			break;
		case 512: 
			cells[position].classList.add('class512');
			break;
		case 1024:
				cells[position].classList.add('class1024');
				break;
		case 2048: 
				cells[position].classList.add('class2048');
				break;
		default:
			cells[position].classList.add('classBigger2048');				
	} 
}

function fillRows(){
	for(let i = 0; i < 16; i++){
			if(i < 4 ){
				aux1.push(board[i]);
			}else if(i < 8 ){
				aux2.push(board[i]);
			}else if(i < 12 ){
				aux3.push(board[i]);
			}else{
				aux4.push(board[i]);
			}  
		}		
}

function fillColumns(){
	for(let i = 0; i<16; i++){
		if(i % 4 === 0 ){
			aux1.push(board[i]);
		}else if(i % 4 === 1 ){
			aux2.push(board[i]);
		}else if(i % 4 === 2 ){
			aux3.push(board[i]);
		}else{
			aux4.push(board[i]);
		}  
	}		
}

function upLeft (aux){
	for(let i = 0; i<3 ; i++){
		if(aux[i]!==0){
			for(let j = i+1; j<4; j++){
				if(aux[j]!==0){
					if(aux[i]===aux[j]){
						score += aux[j];
						aux[i] += aux[j];
						if(aux[i] > maxValue){
							maxValue = aux[i];
						}
						aux[j] = 0;
						j = 4;
					} else {
						j = 4;
					}
				}
			}
		}
	}
	for(let i = 0; i<3; i++){
		if(aux[i]===0){
			for (let j = i+1; j<4; j++){
				if(aux[j]!==0){
					aux[i]=aux[j];
					aux[j]=0;
					j=4;
				}
			}
		}
	}
	
}

function downRight(aux){
	for(let i = 3; i>0 ; i--){
		if(aux[i]!==0){
			for(let j = i-1; j>=0; j--){
				if(aux[j]!==0){
					if(aux[i]===aux[j]){
						score += aux[j];
						aux[i] += aux[j];
						if(aux[i] > maxValue){
							maxValue = aux[i];
						}
						aux[j] = 0;
						j = -1;
					} else {
						j = -1;
					}
				}
			}
		}
	}
	for(let i = 3; i>0; i--){
		if(aux[i] === 0){
			for(let j = i-1 ; j>=0 ; j--){
				if(aux[j]!==0){
					aux[i] = aux[j];
					aux[j] = 0;
					j=-1;
				}
			}
		}
	}	
}

function copyBoardRows(){
	for(let val of aux1){
		copyBoard.push(val);
	}
	for(let val of aux2){
		copyBoard.push(val);
	}
	for(let val of aux3){
		copyBoard.push(val);
	}
	for(let val of aux4){
		copyBoard.push(val);
	}
}

function copyBoardColumns(){
	for(let i = 0; i<4; i++){
		copyBoard.push(aux1[i]);
		copyBoard.push(aux2[i]);
		copyBoard.push(aux3[i]);
		copyBoard.push(aux4[i]);
	}	
}

undo.disabled = true;
newPlay();
newPlay();
fillBoard();
newGame.addEventListener("click", ()=>{
	board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	newPlay();
	newPlay();
	fillBoard();
	score = 0;
	writeScore.innerHTML = score;
	gameEnd.innerHTML="";
});	
undo.addEventListener("click", ()=>{
	for(let i = 0; i<16; i++){
		board[i]=oldBoard[i];
	}		
	fillBoard();	
	score = oldScore;
	writeScore.innerHTML = score;
	if(!winner|| (nMoveWinner === nMoves)){
		gameEnd.innerHTML="";
		nMoveWinner = "";
	} 
	nMoves = nMoves - 1;
	writeMove.innerHTML = nMoves;
	undo.disabled = true;
});	
game.addEventListener( "keyup", evt=> {
	aux1 = [];
	aux2 = [];
	aux3 = [];
	aux4 = [];
	copyBoard = [];
	oldScore = score;	
	if(board.indexOf(0) == -1){
		let nextPositionEqual = false;
		for(let i = 0; i < 12; i++){
			if(board[i] === board[i+4]){
				nextPositionEqual = true;
				i = 12;
			}
		}
		if(!nextPositionEqual){
			for(let i = 0; i < 16; i++){
				if((board[i]===board[i+1]) && ((i % 4)!==3)){
					nextPositionEqual = true;
					i = 16;
				}
			}
		}
		if(!nextPositionEqual){
			if(!winner){
				gameEnd.innerHTML="Game Over";
			} else {
				gameEnd.innerHTML="No more moves";
			}			
			return;
		}
	}

	if(evt.key === "ArrowUp"){
		fillColumns();
		upLeft(aux1);
		upLeft(aux2);
		upLeft(aux3);
		upLeft(aux4);
		copyBoardColumns();	
	} else if(evt.key === "ArrowDown"){
		fillColumns();
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);
		copyBoardColumns();		
	} else if(evt.key === "ArrowRight"){
		fillRows();
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);
		copyBoardRows();		
	} else if(evt.key === "ArrowLeft"){
		fillRows();
		upLeft(aux1);
		upLeft(aux2);
		upLeft(aux3);
		upLeft(aux4);
		copyBoardRows();		
	} else {
		return;
	}	
	
	if(!arraysAreIdentical(board, copyBoard)){		
		for(let i = 0; i<16; i++){
			oldBoard[i] =board[i];
		}				
		for(let i = 0; i<16; i++){
			board[i]=copyBoard[i];
		}				
		newPlay();		
		fillBoard();
		nMoves ++;		
		writeScore.innerHTML = score;
		writeMove.innerHTML = nMoves;
		undo.disabled = false;			
	}

	if(maxValue === 2048){		
		winner = true;
		nMoveWinner = nMoves;
		gameEnd.innerHTML="Winner!!! at move " + nMoveWinner;		
	}
});