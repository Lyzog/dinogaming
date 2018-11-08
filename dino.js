
/* Scrolling down below the menu makes the menu stick to the
top and adds a link at the bottom that takes you to the top*/
window.onscroll = function() {stickyNav()};

var list = document.getElementById("hannnnnnna");
var sticky = list.offsetTop;
var title = document.getElementById("title");

function stickyNav() {
/*
     if (window.pageYOffset < sticky ){ //136 140
      list.classList.remove("sticky");
      title.classList.remove("visible-title");
    }  else if (window.pageYOffset > sticky ) {
        list.classList.add("sticky");
        title.classList.add("visible-title");
      }
*/

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
  //Visa nya valda spel
  for (var i = 0; i < selectedContent.length; i++) {
    //om på mobil
    if (screen.width < 450) {
      if (selectedContent[i].classList.contains("mobile")) {
        selectedContent[i].classList.add("visible_game");
        votePrompt("mobile");
      }
    } else {
      selectedContent[i].classList.add("visible_game");
      //change vote options on bottom of page
      votePrompt("browser");
    }
  }
 //screen.width
 //min width 450
 // https://stackoverflow.com/questions/641857/javascript-window-resize-event

}


/* On  page load and on genre change the vote button looks
diffrent and offers diffrent options */
// TODO Visa att man redan klickat på knappen en gång
var voteDiv = document.getElementById("vote_btn");
var visibleGames = document.getElementsByClassName("visible_game");

function votePrompt(type) {
  if (type === "browser") {
    //texten är beskrivande
    voteDiv.innerHTML = "Next weeks " + selectedMenu.id ;

  } else { //mobile
    //Texten är Vote
        voteDiv.innerHTML = "Vote";
  }

  //Ladda med spel att rösta på efter klassen visible_game
  //visibleGames

}

/* On page load add the content for the selected genre, atm action,
depending on mobile(smaller format) or not.
 To change selected genre change the selectedMenu and selectedContent
 parameters at the top*/
window.onload = pageLoad;

function pageLoad() {

  /*Set selected menu to selectedMenu's id */
  selectedMenu.classList.add("highlight");

  for (var i = 0; i < selectedContent.length; i++) {
    //om på mobil
    if (screen.width < 450) {
      if (selectedContent[i].classList.contains("mobile")) {
        selectedContent[i].classList.add("visible_game");
        votePrompt("mobile");
      } else { //making sure
        selectedContent[i].classList.remove("visible_game");
      }
    } else {
      selectedContent[i].classList.add("visible_game");
      votePrompt("browser");
    }
  }
}
/*document.getElementById("myFrame").addEventListener("load", pageLoad);
document.getElementById("myFrame").onload = function() {pageLoad()};
*/
/*
window.onload = function() {
  console.log("MOBILE!!");
};*/



/* Vid kontakt klick- gör allt lila*/
// Hämta contact texten
var selectContact = document.getElementById("blah");
//Make the contacttext clickable
selectContact.addEventListener("click", contactClick);

//hämta elementen där vi vill ändra
var selectMenuHover = document.getElementsByClassName("menu");
var selectGameBg = document.getElementsByClassName("gamecontent_icon");
var bgOrig = true;
var bgPurple = "purple";
var bgBlack = "black";
var bgBlue = "rgb(191, 220, 230)";
var bgGray = "rgb(139, 139, 138)";

function contactClick() {

   if (!bgOrig) {   //"radial-gradient(rgb(191, 220, 230), rgb(139, 139, 138))";
     document.body.style.background = "radial-gradient("+bgBlue+", "+bgGray+ ")";
     document.getElementsByTagName("header")[0].style.background  = bgBlue;
     document.getElementsByTagName("nav")[0].style.background  = bgGray;
     document.getElementsByTagName("footer")[0].style.background  = bgBlue;

     for (var i = 0; i < selectMenuHover.length; i++) {
       selectMenuHover[i].classList.remove("purple_menu");
     }
     for (var i = 0; i < selectGameBg.length; i++) {
       selectGameBg[i].classList.remove("purple_gamecontent");
     }
     bgOrig = true;
   }
   else {
    document.body.style.background = "radial-gradient("+bgPurple+", "+bgBlack+")";
    document.getElementsByTagName("header")[0].style.background  = bgPurple;
    document.getElementsByTagName("nav")[0].style.background  = bgBlack;
    document.getElementsByTagName("footer")[0].style.background  = bgPurple;

    //gör alla hovers i menyn lila
    for (var i = 0; i < selectMenuHover.length; i++) {
      selectMenuHover[i].classList.add("purple_menu");
    }
    //gör alla spel divar bg lila
    for (var i = 0; i < selectGameBg.length; i++) {
      selectGameBg[i].classList.add("purple_gamecontent");
    }
    bgOrig = false;
  }
}
