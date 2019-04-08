console.log("RUNNING")




//////////////////GLOBAL VARIABLES/////////////////////////
let gamePlay = false;


/////////////////FUNCTIONS/////////////////////////////////
//Make game board
function generateBoardSquares(){
    for(let y = 6; y >= 1; y--) {
       //console.log('Making Row' + y)
      $('#gameBoard').append(`<div class='row' row='${y}' ></div>`)
        for(let x = 1; x <= 11; x++) {
        //console.log('Making Col' + x)
        $(`div [row="${y}"]`).append(`<div class='game-square' x='${x}' y='${y}'></div>`)
        }
    }
}

$("#play").on('click', function(){
    gamePlay = true
})

const scooterGarage = [];

class Scooter {
    constructor(x,y,name){
        this.x = x;
        this.y = y;
        this.name = name;
        scooterGarage.push(this);
    }
    render(){
        $(`.${this.name}`).removeClass(this.name)
        if (this.x == player.x && this.y == player.y) {
            console.log('collision!')
            player.lives--;
            alert('you got hit')
        }
        $(`.game-square[x=${this.x}][y=${this.y}]`).addClass(this.name);
    }
    drive (){
        if (this.x < 12){
            this.x++;
            this.render()
        }
        if (this.x == 12){
            this.x = 0
        }
    }
}

const scooterOne = new Scooter(0,2, "scooterOne")
const scooterTwo = new Scooter(0,3, "scooterTwo")
const scooterThree = new Scooter(0,4, "scooterThree")
const scooterFour = new Scooter(0,5,"scooterFour")

//Move scooters on interval via 'window' selector
const moveScooters = ( )=> {
    window.setInterval(function(){
    scooterOne.drive()
}, 1000)

window.setInterval(function(){
    scooterTwo.drive()
}, 4000)

window.setInterval(function(){
    scooterThree.drive()
}, 5000)

window.setInterval(function(){
    scooterFour.drive()
}, 2000)
}

const player = {
    lives: 3,
    points: 0,
    x: 6,
    y: 1,
    render(){
        //console.log(`.game-square [x=${this.x}][y=${this.y}]`)
        //clear class from prev div
       $('.player').removeClass('player')
       //add class to new square
       if (this.x == scooterOne.x && this.y == scooterOne.y) {
        console.log('collision!')
        player.lives--;
        alert('you got hit')
    }
       $(`.game-square[x=${this.x}][y=${this.y}]`).addClass("player");
    }, 
    move(direction){
        if (direction === "right" && this.x < 11){
                 this.x++
        }else if (direction === "left" && this.x > 1) {
                this.x--
        }else if (direction === "down" && this.y > 1) {
                this.y--
        }else if (direction === "up" && this.y < 11) {
                this.y++
        }    
    this.render();
    }
}

$('body').keydown(function(e) {
    if(e.keyCode == 37) { 
      player.move('left');
    }
    else if(e.keyCode == 39) {
        player.move('right');
    }
    else if(e.keyCode == 38) { 
        player.move('up');
    }
    else if(e.keyCode == 40) { 
        player.move('down');
    }
  });

// const render = () => {
//     window.setInterval(function(){
//         player.render();
//         scooterOne.render();
//         scooterFour.render();
//     }, 20)
// }
//Not sure what im doing here 

// 3.) collision occures (triggers health) when player is insame div as scooter. HOW????

//4.) display score and levels which change with collision

//5.) add "safe house" at end which will increase player levels and scooter speed/volume

$('#scoreboard').append(`<h3 id="lives"> ${player.lives}<h3>`)

//if this div has palyer class name && scooter1-4 class name...execute?


////////////////////MAIN//////////////////////////////////////

generateBoardSquares();
player.render();
moveScooters();
//render();







