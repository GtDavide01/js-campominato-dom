// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
// **Consigli del giorno:** :party_wizard:
// ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

//Elementi HTML 
//recupero select in html
const userDifficolta = document.getElementById("difficolta");
console.log(userDifficolta);
//recupero il bottone in html
const btnPlay = document.getElementById("play");
console.log(btnPlay);
//recupero il wrapper che contiene la griglia di gioco 
const wrapperGame = document.querySelector(".wrapperbox");
console.log(wrapperGame);
const resultGame = document.getElementById("windefeat");
console.log(resultGame);
//recupero row che conterra il numero di caselle di gioco
const rowGame = document.querySelector(".row");
console.log(rowGame);
//recupero i box della griglia 
const boxGame = document.querySelectorAll(".box");
//richiamo funzione che permette di far comparire la griglia al click del bottone 
btnPlay.addEventListener("click" , createElement );
let click = false ; 










//FUNZIONI
/**
 * funzione per inserire le numeri di celle all'array 
 * @param {array } //array da incrementare 
 * @param {numbercells} //numero di celle di gioco 
 * @returns {arraypieno}//elemento array con lunghezza delle numero di celle 
 */ function numberCell (array,numbercells){
    for (let i=1 ; i<=numbercells ; i++){
        array.push(i);
    }
}

/**
 * funzione per generare numeri random 
 * @param {min} //numero minimo da generare 
 * @param {max} //numero massimo da generare 
 * @returns {number}//ritorna numero random da min a max 
 */
function randomNuber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Funzione che stampa il numero di celle all'interno dela griglia e contiene cosa succede al click della cella
 * @param {array} //array dove inserire le celle
 * @param {choice} //scelta contenente numero di celle
 * @returns {elementbox} //stampa celle 
 */
function createSquare (array , arrayBomb ,choice , box , boxGame){
    //per ogni elemento dell'array 
    for ( let i=0 ; i<array.length ; i++ ){
        //creo elemento div 
        const addBox = document.createElement("div");
        addBox.setAttribute("id", i+1);
        //lo collego alla row
        rowGame.append(addBox);
        //aggiungo la classe css box in base alla scelta dell'utente 
        addBox.classList.add("box");
        if(choice === "easy"){
            addBox.classList.add("easy");
        }else if(choice ==="medium"){
            addBox.classList.add("medium");
        }else if(choice ==="hard"){
            addBox.classList.add("hard");
        }
        //per ogni elemento stampo anche il numero
        addBox.innerHTML = array[i];
        //se clicclo sulla cella stampo numero della casella e la coloro di azzurro 
        addBox.addEventListener("click",function(){
            console.log(array[i]);
            if (click ===false ){
                //se l'array di bombe include un numero uguale all'array di celle coloro ogni elemento dell'array di bombe  di rosso 
            if(arrayBomb.includes(array[i])  ){
                for(let j=0 ; j<arrayBomb.length ; j++){
                    let bombBox = document.getElementById(arrayBomb[j]);
                    bombBox.classList.add("coloralert");
                }resultGame.innerHTML= 'Hai perso';
                click = true ; 
            }else{
                addBox.classList.add("color");
            }
            }
            
        })
}
}


//funzione che determina cosa succederà quando clicco il bottone 
function createElement (){
    //recupero il valore della diiffcolta 
    const userChoice = userDifficolta.value;
    console.log(userChoice);
    //rimuovo la classe none e metto active per mostrare la griglia 
    wrapperGame.classList.remove("none");
    wrapperGame.classList.add("active");
    //setto la griglia a 0 , ogni volta che clicco sul bottone si riazzera 
    rowGame.innerHTML = "";
    //determino in numero delle celle in base alla scelta dellla difficolta 
    let gameBoxes ;
    if(userChoice === "easy"){
        gameBoxes = 100;
    }else if(userChoice ==="medium"){
        gameBoxes = 81;
    }else if(userChoice ==="hard"){
        gameBoxes = 49;
    }
    
   
    //creo array 
    const arrayGame = [];
    //creo array contenente bombe 
    const arrayBomb = [];
    const arrayBombCreate = createBomb(arrayBomb);
    //richiamo funzione per determinare il numero di celle 
    const arrayGameCell = numberCell (arrayGame , gameBoxes);
    //richiamo  funzione che crea per ogni elemento dell'array creo una classe box 
    const allElement =  createSquare (arrayGame , arrayBomb , userChoice , boxGame , gameBoxes);

     
    console.log(arrayBomb);
    console.log(arrayGame);


    //funzione per creare le bombe
    function createBomb (array){
        while (array.length < 16){
            const rndNumber = randomNuber(1 ,gameBoxes);
            if(!array.includes(rndNumber)){
                array.push(rndNumber);
            }
        }
    }

}


