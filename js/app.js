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
        $(`.${this.name}`).removeClass(this.name);
        //loops through scooter garage and check for collision with player
        this.collision();
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
    collision() {
        //looks through garage for scooters with same cordinates
        for (let i =0; i < scooterGarage.length; i++){
            if (scooterGarage[i].x == player.x && scooterGarage[i].y == player.y && player.lives > 0) {
            console.log('collisionScooter')
            player.lives--;
            };
        }
    }
    makeScooter(){
        let newScooter = new Scooter(`${this.x}, ${this.y}, ${this.name}`)
    }
}

//when play reaches end, triggers following:
const safeHouse = () => {
    if (player.y == 6){
        player.x = 6;
        player.y = 1;
        player.level++;
        if(player.level == 1){
        makeScooter(0,3,"scooterFive",800);
        }
        if (player.level == 2){
            makeScooter(0,4,"scooterSix", 700);
        }
        if (player.level == 3){
            makeScooter(0,2,"scooterSeven", 600)
        }
    }
}

//makes new scooter when player levels up
const makeScooter = (x,y, name,speed) => {
        let newScooter = new Scooter (x,y,name,speed);
        window.setInterval(function(){
            newScooter.drive()
        }, speed);
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
    level: 0,
    lives: 3,
    points: 0,
    x: 6,
    y: 1,
    render(){
       safeHouse();
       this.collision();
    //clear class from prev div
       $('.player').removeClass('player');
    //add class to new square
       $(`.game-square[x=${this.x}][y=${this.y}]`).addClass("player");
    //updates stats via .text() ....probably a better way to do this
        $('#level').text(`Level: ${player.level}`);
        $('#lives').text(`Lives: ${player.lives}x`);
    }, 
    move(direction){
        if (direction === "right" && this.x < 11){
                 this.x++
        } else if (direction === "left" && this.x > 1) {
                this.x--
        } else if (direction === "down" && this.y > 1) {
                this.y--
        } else if (direction === "up" && this.y < 11) {
                this.y++
        }    
    this.render();
    },
     collision() {
         //checks if player has hit any scooters in the garage
        for (let i =0; i < scooterGarage.length; i++){
            if (scooterGarage[i].x == player.x && scooterGarage[i].y == player.y && player.lives > 0) {
            console.log('collisionPlayer')
            player.lives--;
            };
        }  
    } 
}

//adds event listener (up,down,left,right) to player
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

//displays stats and is rendered in player.render()
const updateStats = () => {
    $('#scoreboard').append(`<h3 id="lives"> Lives: ${player.lives}x<h3>`)
    $('#scoreboard').append(`<h3 id="level"> Level: ${player.level}<h3>`)
    window.setInterval(function(){
        $('#level').text(`Level: ${player.level}`);
        $('#lives').text(`Lives: ${player.lives}x`);
            }, 20)
}

// const render = () => {
//     window.setInterval(function(){
//         player.render();
//         scooterOne.render();
//         scooterFour.render();
//     }, 20)
// }
//Not sure what im doing here ^

// 3.) collision occures (triggers health) when player is in same div as scooter. HOW????

//4.) display score and levels which change with collision

//5.) add "safe house" at end which will increase player levels and scooter speed/volume

//console.log($('div[row="6"]'))
//$('#scoreboard').append(`<h3 id="lives"> ${player.lives}<h3>`)

//if this div has palyer class name && scooter1-4 class name...execute?


////////////////////MAIN//////////////////////////////////////

generateBoardSquares();
player.render();
moveScooters();
updateStats();
safeHouse();
//checkCollision();
//render();







