console.log("RUNNING")




//////////////////GLOBAL VARIABLES/////////////////////////
let gamePlay = false;

/////////////////FUNCTIONS/////////////////////////////////
//Make game board
function generateBoardSquares(){
    for(let y = 7; y >= 1; y--) {
       //console.log('Making Row' + y)
      $('#gameBoard').append(`<div class='row' row='${y}' ></div>`)
        for(let x = 1; x <= 7; x++) {
        //console.log('Making Col' + x)
        $(`div [row="${y}"]`).append(`<div class='game-square' x='${x}' y='${y}'></div>`)
      }
    }
   }
//1.) make player move around map
$("#play").on('click', function(){
    gamePlay = true
})

const player = {
    x: 4,
    y: 1,
    render(){
        //console.log(`.game-square [x=${this.x}][y=${this.y}]`)
        //clear class from prev div
       $('.player').removeClass('player')
       //add class to new square
       $(`.game-square[x=${this.x}][y=${this.y}]`).addClass("player");
    }, 
    move(direction){
        if (direction === "right" && this.x < 7){
            this.x++
        }else if (direction === "left" && this.x > 1) {
                this.x--
        }else if (direction === "down" && this.y > 1) {
                this.y--
        }else if (direction === "up" && this.y < 7) {
                this.y++
        }    
    this.render();
    }
}


//2.) make scooter move right to left on interval

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
        $(`.game-square[x=${this.x}][y=${this.y}]`).addClass(this.name);
    }
    drive (){
        if (this.x < 8){
            this.x++;
            this.render()
        }
        if (this.x == 7){
            this.x = 0
        }
    }
}




const scooterOne = new Scooter(0,2, "scooterOne")
const scooterTwo = new Scooter(0,3, "scooterTwo")
const scooterThree = new Scooter(0,4, "scooterThree")
const scooterFour = new Scooter(0,5,"scooterFour")






// const scooterOne = {
//     x: 0,
//     y: 4,
//     render(){
//         $('.scooterOne').removeClass('scooterOne')
//         $(`.game-square[x=${this.x}][y=${this.y}]`).addClass("scooterOne");
//     },
//     drive (){
//         const thisx = this;
//         if (thisx.x < 8){
//             thisx.x++;
//         }
//         thisx.render()
//     }
// }


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



////////////////////MAIN//////////////////////////////////////

generateBoardSquares();
player.render();








