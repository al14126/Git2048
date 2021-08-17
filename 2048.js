let cells = document.querySelectorAll(".cell");
let game = document.querySelector("body");
let randomValues = [2,4];
let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let randomPosition;

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

function up (column){
	for(let i = 0; i<3; i++){
		if(column[i]===0){
			for (let j = i+1; j<4; j++){
				if(column[j]!==0){
					column[i]=column[j];
					column[j]=0;
					j=4;
				}
			}
		}
	}
	for(let i = 0; i<3; i++){
		if(column[i]===column[i+1]){
			column[i] += column[i+1];
			column[i+1]=0;
		}
	}
	for(let i = 0; i<3; i++){
		if(column[i]===0){
			for (let j = i+1; j<4; j++){
				if(column[j]!==0){
					column[i]=column[j];
					column[j]=0;
					j=4;
				}
			}
		}
	}
}

function down(column){
	for(let i = 3; i>0; i--){
		if(column[i] === 0){
			for(let j = i-1 ; j>=0 ; j--){
				if(column[j]!==0){
					column[i] = column[j];
					column[j] = 0;
					j=-1;
				}
			}
		}
	}
	for(let i = 3; i>0; i--){
		if(column[i]===column[i-1]){
			column[i] += column[i-1];
			column[i-1]=0;
		}
	}
	for(let i = 3; i>0; i--){
		if(column[i] === 0){
			for(let j = i-1 ; j>=0 ; j--){
				if(column[j]!==0){
					column[i] = column[j];
					column[j] = 0;
					j=-1;
				}
			}
		}
	}
}

function moveRight(row){
	
}

newPlay();
newPlay();
fillBoard();

game.addEventListener( "keyup", evt=> {
	let col1 =[];
	let col2 =[];
	let col3 =[];
	let col4 =[];
	let row1 =[];
	let row2 =[];
	let row3 =[];
	let row4 =[];
	let copyBoard = [];	
	if(evt.key === "ArrowUp"){
		for(let i = 0; i<16; i++){
			if(i % 4 === 0 ){
				col1.push(board[i]);
			}else if(i % 4 === 1 ){
				col2.push(board[i]);
			}else if(i % 4 === 2 ){
				col3.push(board[i]);
			}else{
				col4.push(board[i]);
			}  
		}		
		up(col1);
		up(col2);
		up(col3);
		up(col4);

		for(let i = 0; i<4; i++){
			copyBoard.push(col1[i]);
			copyBoard.push(col2[i]);
			copyBoard.push(col3[i]);
			copyBoard.push(col4[i]);
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
				col1.push(board[i]);
			}else if(i % 4 === 1 ){
				col2.push(board[i]);
			}else if(i % 4 === 2 ){
				col3.push(board[i]);
			}else{
				col4.push(board[i]);
			}  
		}		
		down(col1);
		down(col2);
		down(col3);
		down(col4);

		for(let i = 0; i<4; i++){
			copyBoard.push(col1[i]);
			copyBoard.push(col2[i]);
			copyBoard.push(col3[i]);
			copyBoard.push(col4[i]);
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
				row1.push(board[i]);
			}else if(i < 8 ){
				row2.push(board[i]);
			}else if(i < 12 ){
				row3.push(board[i]);
			}else{
				row4.push(board[i]);
			}  
		}		
		moveRight(row1);
		moveRight(row2);
		moveRight(row3);
		moveRight(row4);
	}

});