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
    const $inputName = $('#inputName').val();
    $('#name').text($inputName)
    gamePlay = true;
    player.render();
})

const scooterGarage = [];

class Scooter {
    constructor(x,y,name,speed){
        this.x = x;
        this.y = y;
        this.name = name;
        this.speed = speed
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
        if (this.x == player.x && this.y == player.y) {
            console.log('collisionScooter')
            player.x = 6;
            player.y = 1;
            player.render();
                if(player.lives > 0){ //NOT WORKING! lives go down too fast
                     player.lives--;
                     player.gameOver();
                };      
        }
    }
}

//when play reaches end, triggers following:
const safeHouse = () => {
    if (player.y == 6){
        player.x = 6;
        player.y = 1; 
        player.level++;
        if(player.level == 1){
        makeScooter(0,3,"scooterFive",400);
        }
        if (player.level == 2){
            makeScooter(0,4,"scooterSix", 300);
        }
        if (player.level == 3){
            makeScooter(0,2,"scooterSeven", 200)
        }
        if (player.level == 4){
            makeScooter(0,5,"scooterEight", 100);
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

const scooterOne = new Scooter(0,2, "scooterOne", 300)
const scooterTwo = new Scooter(0,3, "scooterTwo",1000 )
const scooterThree = new Scooter(0,4, "scooterThree", 2000)
const scooterFour = new Scooter(0,5,"scooterFour", 800)

//Move scooters on interval via 'window' selector
const moveScooters = ( )=> {
    window.setInterval(function(){
    scooterOne.drive()
}, scooterOne.speed)

window.setInterval(function(){
    scooterTwo.drive()
}, scooterTwo.speed)

window.setInterval(function(){
    scooterThree.drive()
}, scooterThree.speed)

window.setInterval(function(){
    scooterFour.drive()
}, scooterFour.speed)

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
       this.gameOver();
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
            if (scooterGarage[i].x == player.x && scooterGarage[i].y == player.y) {
                console.log('collisionPlayer')
                player.x = 6;
                player.y = 1;
                   if(player.lives > 0){ //NOT WORKING! lives go down too fast
                    player.lives--;
                    this.gameOver();
                    }
            }
        }     
    },
    gameOver() {
        if(this.lives < 1){
        // $('.player').removeClass('player');
        // $(`.game-square[x=${this.x}][y=${this.y}]`).addClass("player");
        alert("gameOver!!!");
        location.reload();
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
    //$('#scoreboard').append(`<h2 id="name"> <h3>`)
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
//          scooter.render();
//     }, 20)
// }
//Not sure what im doing here ^

////////////////////MAIN//////////////////////////////////////
generateBoardSquares();
moveScooters();
updateStats();
safeHouse();








