# streetsOfNam
Streets of Nam AKA Frogger


  <h1> GameFlow (MVP) </h1>
<ol>
  <li> Home screen will show two options: Instructions OR Play.</li>
  <li> Instructions page: either a new page or pop-up window, will explain game objective and key functions </li>
  <li> Key functions: up, down, left, right to control directions of character</li>
  <li> Game objective: cross the streets of Vietnam safely. Only three lives. When you reach the other side you move on to the next level. Speed and volume of motorcyclist will increase as level increase</li> 
  <li> Play page: game UI will be a 7x7 grid.</li> 
        <ol>
          <li>Bottom row will hold character in center position.</li> 
          <li> Following four rows will be "traffic zone" where cyclist wil be moving right to left at different speeds. </li> <li> Top row will be "safe zone", however only three of seven blocks will allow player to level up. Other four will kill player. </li> 
          <li> Top row will display stats including players lives and current level. </li>
    </ol>
 <li> Landing on "safe house" will invoke next level and render new position with new level displayed</li>
 <li> Difficulty (speed/volume) will increase as levels increase.</li>
  <li> If player loses all THREE lives, game ends</li>
  </ol>
  <h2>Objects:</h2>
  <ul> 
    <li> "Player" object</li>
    <li> "Motorcyclist" class and factory. Objects will take parameters of name, speed, image, etc. Function to lower players health when collision is made. </li>
    <li> Three "safe house" objects which have functions to increase level and render new position</li>
    <li> Four "danger blocks" surrounding the "safe houses". WIll have similar functions as cyclist class</li>
  </ul>
  <h1> Bonus: </h1>
  <ul> 
    <li> Include a pointing system! Have "gold coins" appear on road, adding to players points. Have "pho" objects appear that increases players lives. Make a high score which is reflected by "gold coins" gained </li>
    <li>Add a slow cyclist that always keeps the same speed and allows faster cyclest to pass</li>
  <li> Player 2 options which would use different keys to navigate character</li>
    <li> Graphical representation of players lives</li>
    <li> Music/additional animations </li>
  </ul>
![wireframe] (../images/streetsOfNam.jpg)

