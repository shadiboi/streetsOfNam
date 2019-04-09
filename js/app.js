console.log("RUNNING")




//////////////////GLOBAL VARIABLES/////////////////////////
let gamePlay = false;

/////////////////FUNCTIONS/////////////////////////////////
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


//when play reaches top row, trigger following:
const safeHouse = () => {
    if (player.y == 6 && player.x == 6 || player.y == 6 && player.x == 3 || player.y == 6 && player.x == 9){
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
        if (player.level == 5){
            makeScooter(0,4,"scooterNine", 100);
        }
    }
    if (player.y == 6 && player.x == 1 || player.y == 6 && player.x == 2 || player.y == 6 && player.x == 4 || player.y == 6 && player.x == 5
        || player.y == 6 && player.x == 7 || player.y == 6 && player.x == 8 || player.y == 6 && player.x == 10 || player.y == 6 && player.x == 11) {
        player.lives--;
        player.x = 6;
        player.y = 1; 
    }
}
//adds class name 'deathhouse' to divs for styling
const makeDeathHouse = () => {
    $('.game-square[x="1"][y="6"]').addClass('deathHouse');
    $('.game-square[x="2"][y="6"]').addClass('deathHouse');
    $('.game-square[x="4"][y="6"]').addClass('deathHouse');
    $('.game-square[x="5"][y="6"]').addClass('deathHouse');
    $('.game-square[x="7"][y="6"]').addClass('deathHouse');
    $('.game-square[x="8"][y="6"]').addClass('deathHouse');
    $('.game-square[x="10"][y="6"]').addClass('deathHouse');
    $('.game-square[x="11"][y="6"]').addClass('deathHouse');
}
//adds class 'safeHouse' to div for styling
const makeSafeHouse = () => {
    $('.game-square[x="3"][y="6"]').addClass('safeHouse');
    $('.game-square[x="6"][y="6"]').addClass('safeHouse');
    $('.game-square[x="9"][y="6"]').addClass('safeHouse');
}


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
//Make pho coin health
// class PhoHealth(or coins?) = {
//     x: 6,
//     y: 1,
//     render() {clear class after cordinates match add life||points
// }



// Adds event listener (up,down,left,right) to player
// Wont work unless gamePlay is true (fixes bug of player render via keys)
$('body').keydown(function(e) {
if (gamePlay == true){
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
    } 
});

//displays stats and is rendered in player.render()
const makeStats = () => {
    $('#stats').append(`<h3 id="level"> Level: ${player.level}<h3>`)
    $('#stats').append('<h2 id="name"> <h2>')
    $('#stats').append(`<h3 id="lives"> Lives: ${player.lives}x<h3>`)
   
    window.setInterval(function(){
        $('#level').text(`Level: ${player.level}`);
        $('#lives').text(`Lives: ${player.lives}x`);
            }, 20)
}

const makeStartBtn = () => {
$('#goTime').append('<input id="inputName" placeholder="Enter name to start"> </input>')
$('#goTime').append('<button id="play"> GO! </button>')

$('body').on('click','#play', function(e){
    console.log(e.target);
     gamePlay = true;
     const $inputName = $('#inputName').val();
     //#name is located stats
     $('#name').text($inputName)
     player.render();
 })
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
makeStats();
safeHouse();
makeDeathHouse();
makeSafeHouse();
makeStartBtn();



   





