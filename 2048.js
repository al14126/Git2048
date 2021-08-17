let cells = document.querySelectorAll(".cell");
let game = document.querySelector("body");
let randomValues = [2,4];
let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let randomPosition;
let gameOver = document.querySelector("#gameOver");

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
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

function upLeft (aux){
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
	for(let i = 0; i<3; i++){
		if(aux[i]===aux[i+1]){
			aux[i] += aux[i+1];
			aux[i+1]=0;
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
	for(let i = 3; i>0; i--){
		if(aux[i]===aux[i-1]){
			aux[i] += aux[i-1];
			aux[i-1]=0;
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


newPlay();
newPlay();
fillBoard();

game.addEventListener( "keyup", evt=> {
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
			gameOver.innerHTML="Game Over";
			return;
		}
	}
	let aux1 =[];
	let aux2 =[];
	let aux3 =[];
	let aux4 =[];	
	let copyBoard = [];	
	if(evt.key === "ArrowUp"){
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
		upLeft(aux1);
		upLeft(aux2);
		upLeft(aux3);
		upLeft(aux4);

		for(let i = 0; i<4; i++){
			copyBoard.push(aux1[i]);
			copyBoard.push(aux2[i]);
			copyBoard.push(aux3[i]);
			copyBoard.push(aux4[i]);
		}		
		if(!arraysAreIdentical(board, copyBoard)){			
			for(let i = 0; i<16; i++){
				board[i]=copyBoard[i];
			}
			newPlay();
			fillBoard();			
		}	
		

	};
	if(evt.key === "ArrowDown"){
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
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);

		for(let i = 0; i<4; i++){
			copyBoard.push(aux1[i]);
			copyBoard.push(aux2[i]);
			copyBoard.push(aux3[i]);
			copyBoard.push(aux4[i]);
		}		
		if(!arraysAreIdentical(board, copyBoard)){			
			for(let i = 0; i<16; i++){
				board[i]=copyBoard[i];
			}
			newPlay();
			fillBoard();			
		}
	};
	if(evt.key === "ArrowRight"){
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
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);
		for(let val of aux1){
			copyBoard.push(val);
		};
		for(let val of aux2){
			copyBoard.push(val);
		};
		for(let val of aux3){
			copyBoard.push(val);
		};
		for(let val of aux4){
			copyBoard.push(val);
		};
		if(!arraysAreIdentical(board, copyBoard)){			
			for(let i = 0; i<16; i++){
				board[i]=copyBoard[i];
			}
			newPlay();
			fillBoard();			
		};
	};
	if(evt.key === "ArrowLeft"){
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
		upLeft(aux1);
		upLeft(aux2);
		upLeft(aux3);
		upLeft(aux4);
		for(let val of aux1){
			copyBoard.push(val);
		};
		for(let val of aux2){
			copyBoard.push(val);
		};
		for(let val of aux3){
			copyBoard.push(val);
		};
		for(let val of aux4){
			copyBoard.push(val);
		};
		if(!arraysAreIdentical(board, copyBoard)){			
			for(let i = 0; i<16; i++){
				board[i]=copyBoard[i];
			}
			newPlay();
			fillBoard();			
		};
	};

});