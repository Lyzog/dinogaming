
/* Scrolling down below the menu makes the menu stick to the
top and adds a link at the bottom that takes you to the top*/
window.onscroll = function() {stickyNav()};

var list = document.getElementById("hannnnnnna");
var sticky = list.offsetTop;
var title = document.getElementById("title");

function stickyNav() {

    if (window.pageYOffset > sticky ) {
      list.classList.add("sticky");
      title.classList.add("visible-title");
    } else {
      list.classList.remove("sticky");
      title.classList.remove("visible-title");
    }


}

/* Script for making the menubar clickable to
change the page content */

/* OBS change selectedMenu and selectedContent value to the same
start value to change startgame genre */
var menu = document.getElementsByClassName("menu");
var selectedMenu = document.getElementById("action");
var selectedContent = document.getElementsByClassName("action");

//Make the menubar clickable
for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", menuClicked);
}

//when a menuItem is clicked
function menuClicked() {
/* Menu options */
  //ta bort befintliga meny val
  selectedMenu.classList.remove("highlight");
  //highlighta det nya valet
  this.classList.add("highlight");
  selectedMenu = this;

/* Game changes */
  //Ta bort befintligt valda spel
  for (let i = 0; i < selectedContent.length; i++) {
    selectedContent[i].classList.remove("visible_game");
  }

  //Hitta nya valda spel
  selectedContent = document.getElementsByClassName(selectedMenu.id);

  /* display the choosen games for the genre */
  fillGames();
  /* fill the vote dropdown with the choosen games */
  votePrompt(bigScreen);
  /* pick which image to display for this genre */
  topGenreImg();
 /*  votePrompt("browser"); */

 //Temporary random game for top game of the week
   let rdGame = randomGame();
 //DIsplay this weeks game and remve it from the pages content display
   displayTopGame(rdGame);

//Change colorscheme depending on gametype
/*to change color on menues find css ending in _gamecontent
 and _menu:hover and change those corresponding values */
   switch (selectedMenu.id) {
     case "platform":
      colorScheme("purple", "black", "purple");
        break;
     case "strategy":
      colorScheme("rgb(8, 141, 48)", "black", "green");
        break;
     case "puzzle":
      colorScheme("rgb(253, 253, 147)", "purple", "lightyellow");
        break;
      case "rpg":
      colorScheme("orange", "brown", "orange");
        break;

     default:
      colorScheme("rgb(191, 220, 230)", "rgb(139, 139, 138)", "lightblue");
   }
}

/*window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}*/

/* On page load add the content for the selected genre, atm action,
depending on mobile(smaller format) or not.
 To change selected genre change the selectedMenu and selectedContent
 parameters at the top*/
window.onload = pageLoad;
var bigScreen = true;

function pageLoad() {

  /*Set selected menu to selectedMenu's id */
  selectedMenu.classList.add("highlight");

  /* display the choosen games for the genre */
  fillGames();
  /* fill the vote dropdown with the choosen games */
  votePrompt(bigScreen);
  /* pick which image to display for this genre */
  topGenreImg();


//Temporary random game for top game of the week
  let rdGame = randomGame();
//DIsplay this weeks game and remve it from the pages content display
  displayTopGame(rdGame);

  //prevents the page from loading and focusing on the middle
  //window.scrollTo(0, 0);
}

//Randomize this weeks topgame for now
function randomGame() {

  let visGames = document.getElementsByClassName("visible_game");
  let rd = Math.floor(Math.random() * visGames.length);

  if (visGames) {
    return visGames[rd].id;
  }
  else {
    return "1Quest";
  }
}


/*Display the top game for the genre and Fall back top game */
function displayTopGame(topGame) {

  let gameName =  topGame.replace(/ /g, "_");

  if (gameName.includes("Vote:")) {
    gameName = gameName.replace("Vote:_", "").trim();
  }

  let gameImg = "images\\" + gameName + "_icon.png"
  let gameLink = "games\\" + gameName + ".html";

  document.getElementById("top_game_img").src = gameImg;
  document.getElementById("top_game_a").href = gameLink;
  document.getElementById("imgtext").innerHTML= gameName.replace(/_/g," ").trim();


  //remove the top game from the content display IF exists
  for (var i = 0; i < selectedContent.length; i++) {
    if (selectedContent[i].id.includes(gameName)) {
      selectedContent[i].classList.remove("visible_game");
    }
  }
}


/* Choose which games are visible */
function fillGames() {

  //Visa nya valda spel
  for (var i = 0; i < selectedContent.length; i++) {
    //om på mobil
    if (screen.width < 481) { //481px 450
      if (selectedContent[i].classList.contains("mobile")) {
        selectedContent[i].classList.add("visible_game");
        bigScreen = false;
      } else { //making sure
        selectedContent[i].classList.remove("visible_game");
      }
    } else {
      selectedContent[i].classList.add("visible_game");
      //change vote options on bottom of page
      bigScreen = true;
    }
  }
}


/*Change the genre image depending on choosen genre
for the weekly top */
function topGenreImg() {

  document.getElementById("top_genre_img").src ="images\\" + selectedMenu.id + ".png";
 //selectedMenu
}


/* On  page load and on genre change the vote button looks
diffrent and offers diffrent options */
// TODO Visa att man redan klickat på knappen en gång
var voteDiv = document.getElementById("vote_btn");
var visibleGames = document.getElementsByClassName("visible_game");


/* TODO on resize */
function votePrompt(bigScreen) {

  if (bigScreen) {
    //texten är beskrivande
    voteDiv.innerHTML = "Next Weeks " + selectedMenu.id ;

  } else { //mobile
    //Texten är Vote
    voteDiv.innerHTML = "VOTE";
  }
  //remove the old games
  let oldTextNode = document.getElementById("drop_Down_Vote");

  while (oldTextNode.hasChildNodes()) {
    oldTextNode.removeChild(oldTextNode.firstChild);
  }

  //Add the new games
  for (var i = 0; i < visibleGames.length; i++) {
    let node = document.createElement("LI");
    let textnode = document.createTextNode("VOTE: " + visibleGames[i].childNodes[3].innerHTML);
    node.appendChild(textnode);
    document.getElementById("drop_Down_Vote").appendChild(node);
  }
}


//TODO Ta bort eller gör snyggare
document.getElementsByTagName("BODY")[0].onresize = function() {resize()};

function resize() {
  //console.log("HELLO ELLER");

if (screen.width < 481  && screen.width > 359) {
  //console.log("HELLO");

  fillGames(); //decides bigScreen as well
  votePrompt(bigScreen);

  let rdGame = randomGame();
  displayTopGame(rdGame);

}

}

/*Change the color of the page depending on which game genre you're looking at*/
var selectMenuHover = document.getElementsByClassName("menu");
var selectGameBg = document.getElementsByClassName("gamecontent_icon");

function colorScheme(color1, color2, maincolor) {

    //change the main elements' color
     document.body.style.background = "radial-gradient("+color1+", "+color2+ ")";
     document.getElementsByTagName("header")[0].style.background  = color1;
     document.getElementsByTagName("nav")[0].style.background  = color2;
     document.getElementsByTagName("footer")[0].style.background  = color1;

     let classes = "";
     let oldColor = "";

     //if applicable find the name of the old colorscheme
     classes = selectMenuHover[0].className.split(" ");
     for (var i = 0; i < classes.length; i++) {
       if (classes[i].includes("_menu")) {
         oldColor = classes[i].replace("_menu","").trim();
       }
     }

    // If an old colorscheme was found
     if (oldColor != "") { //classes.includes("_menu")

      //Overwrite the menubars css classes
       for (var i = 0; i < selectMenuHover.length; i++) {
         selectMenuHover[i].className = "menu " + maincolor + "_menu";
       }
       //Reattach the highlight class to the selected menu
       selectedMenu.classList.add("highlight");

       //remove and add the new colorscheme to the divs around the games
       for (var i = 0; i < selectGameBg.length; i++) {
         selectGameBg[i].classList.remove(oldColor + "_gamecontent");
         selectGameBg[i].classList.add(maincolor + "_gamecontent");
       }
    // backup, if nothing was choosen
     } else {
       for (var i = 0; i < selectMenuHover.length; i++) {
         selectMenuHover[i].classList.add(maincolor + "_menu");
        // console.log("Lägg till lila");
       }
       for (var i = 0; i < selectGameBg.length; i++) {
         selectGameBg[i].classList.add(maincolor + "_gamecontent");
       }
     }
}
