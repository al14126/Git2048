let cells = document.querySelectorAll(".cell");
let game = document.querySelector("body");
let gameEnd = document.querySelector("#gameEnd");
let writeScore = document.querySelector("#score");
let writeMove = document.querySelector("#move");
let newGame = document.querySelector("#newGame");
let undo = document.querySelector("#undo");
let writeAddScore = document.querySelector("#addScore");
let timeCount = document.querySelector("#time");
let secondsCount = 0;
let randomValues = [2,2,2,2,4]; 
let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // tableau du jeu
let oldBoard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //garde le tableau du mouvement antérieur, pour le bouton undo
let aux1 =[];
let aux2 =[];
let aux3 =[];
let aux4 =[];	
let copyBoard = []; 
let maxValue = 0; //pour vérifier si nous avous atteint la valeur 2048
let winner = false;
let score = 0;
let addScore = 0;
let oldScore;
let nMoves = 0; 	
let nMoveWinner;
let moveWinner = false;
let t;

function setTime(){
    secondsCount ++;    
    timeCount.innerHTML =writeTime((parseInt(secondsCount/3600))%24) + ":" + writeTime((parseInt(secondsCount/60))%60) + ":" + writeTime(secondsCount%60);
}

function writeTime (number){
    let numberString = number + "";
    if (numberString.length<2){
        return("0" + numberString);
    } else{
        return numberString;
    }
}

function arraysAreIdentical(arr1, arr2){ //Vérifier si deux tableaux sont identiques    
    for (var i = 0; i < arr1.length; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true; 
}

function hasardPosition(){ //returne une position vide du tableau au hasard 
	let aux = [];
	for (let i = 0; i < board.length; i++){
		if (board[i] === 0){
			aux.push(i);
		}			
	}	 
	return aux[Math.floor(Math.random() * aux.length)];
}

function hasardValue(){ //returne au hasard 2 ou 4 
	return randomValues[Math.floor(Math.random() * 5)] 
} 

function newPlay(){	//ajoute dans le tableau la nouvelle valeur (2 ou 4)
	board[hasardPosition()] = hasardValue();	
}

function fillBoard(){ //rempli le plateau de jeu (les valeurs et les différentes coleurs)
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


function addClass(number, position){//additionne une classe à nous cases de jeux, selon sa valeur
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

function fillRows(){ //création d'une copie de chaque ligne du tableau
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

function fillColumns(){ //création d'une copie de chaque colonne du tableau
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

function upLeft (aux){ //résultat quand on joue vers le haut ou vers la gauche
	writeAddScore.innerHTML = "";	
	for(let i = 0; i<3 ; i++){ 
		if(aux[i]!==0){
			for(let j = i+1; j<4; j++){
				if(aux[j]!==0){
					if(aux[i]===aux[j]){
						score += 2*aux[j];
						addScore += 2*aux[j];
						aux[i] += aux[j];
						if(aux[i] > maxValue){
							maxValue = aux[i];
						}
						aux[j] = 0;						
					}
					break;					
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
					break;
				}
			}
		}
	}	
}

function downRight(aux){ //résultat quand on joue vers le bas ou vers la droite	
	writeAddScore.innerHTML = "";
	for(let i = 3; i>0 ; i--){
		if(aux[i]!==0){
			for(let j = i-1; j>=0; j--){
				if(aux[j]!==0){
					if(aux[i]===aux[j]){
						score += 2*aux[j];
						addScore += 2*aux[j];
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

function copyBoardRows(){ //copie les nouvelles lignes dans un tableau auxiliaire (copyBoard)
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

function copyBoardColumns(){ //copie les nouvelles colonnes dans un tableau auxiliaire (copyBoard) 
	for(let i = 0; i<4; i++){
		copyBoard.push(aux1[i]);
		copyBoard.push(aux2[i]);
		copyBoard.push(aux3[i]);
		copyBoard.push(aux4[i]);
	}	
}

function startGame (){ 
t = setInterval(setTime, 1000); //démarre le temps de jeux
undo.disabled = true; //désactive le button undo
newPlay(); //tire la première valeur 
newPlay(); //tire la deuxième valeur 
fillBoard(); // rempli le plateau de jeu 
}

startGame();

newGame.addEventListener("click", ()=>{ //commence un nouveau jeu quand on click sur le button New Game
	/*board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    secondsCount = 0;      
	score = 0;
    nMoves = 0;
	addScore = 0;
    writeMove.innerHTML = nMoves;
	writeScore.innerHTML = score;
    writeAddScore.innerHTML = "";
	gameEnd.innerHTML=""; 	   
	startGame();*/
	window.location.reload();	
});	

undo.addEventListener("click", ()=>{ //revient un mouvement en arrière    
	for(let i = 0; i<16; i++){
		board[i]=oldBoard[i];
	}		
	fillBoard();	
	score = oldScore;
	writeScore.innerHTML = score;
	writeAddScore.innerHTML = "-" + addScore;
	if(!winner || (nMoveWinner === nMoves)){
		gameEnd.innerHTML="";
		nMoveWinner = 0;
	} 
	nMoves = nMoves - 1;
	writeMove.innerHTML = nMoves;
	undo.disabled = true;
});	

game.addEventListener( "keyup", evt=> {
	addScore=0;
	writeAddScore.innerHTML = "";
	aux1 = [];
	aux2 = [];
	aux3 = [];
	aux4 = [];
	copyBoard = [];
	oldScore = score;	
	if(board.indexOf(0)==-1){ // s'il n'y a pas des cases vides dans notre plateau...
		let nextPositionEqual = false;
		for(let i = 0; i < 12; i++){ // vérifie s'il y a deux valeurs identiques consecutives dans nos colonnes
			if(board[i] === board[i+4]){
				nextPositionEqual = true;
				i = 12;
			}
		}
		if(!nextPositionEqual){ 
			for(let i = 0; i < 16; i++){ // vérifie s'il y a deux valeurs identiques consecutives dans nos lignes
				if((board[i]===board[i+1]) && ((i % 4)!==3)){
					nextPositionEqual = true;
					i = 16;
				}
			}
		}
		if(!nextPositionEqual){
			if(!winner){
				gameEnd.innerHTML="Game Over"; //s'il n'y a plus des mouvements possibles et le joueur n'a pas gagné
                undo.disabled = true;
                clearInterval(t);
			} else {
				gameEnd.innerHTML="No more moves";//s'il n'y a plus des mouvements possibles et le joueur a gagné
			}			
			return;
		}
	}

	if(evt.key === "ArrowUp"){ //création d'une copie des colonnes de notre tableau et éxecute la function upLeft
		fillColumns();
		upLeft(aux1);
		upLeft(aux2);
		upLeft(aux3);
		upLeft(aux4);
		copyBoardColumns();	
	} else if(evt.key === "ArrowDown"){//création d'une copie des colonnes de notre tableau et éxecute la function downRight
		fillColumns();
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);
		copyBoardColumns();		
	} else if(evt.key === "ArrowRight"){//création d'une copie des lignes de notre tableau et éxecute la function downRight
		fillRows();
		downRight(aux1);
		downRight(aux2);
		downRight(aux3);
		downRight(aux4);
		copyBoardRows();		
	} else if(evt.key === "ArrowLeft"){//création d'une copie des lignes de notre tableau et éxecute la function upLeft
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
		writeAddScore.innerHTML = "+" + addScore;
		undo.disabled = false;
		if(maxValue === 2048){		
			winner = true;
			if (!moveWinner){
				moveWinner = true;
				nMoveWinner = nMoves;
			}			
			gameEnd.innerHTML="Winner!!! At move " + nMoveWinner;		
		}		
	}
	
});