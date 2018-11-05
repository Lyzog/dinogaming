
/* Scrolling down below the menu makes the menu stick to the
top and adds a link at the bottom that takes you to the top*/
window.onscroll = function() {stickyNav()};

function stickyNav() {
    var list = document.getElementById("hannnnnnna");
    var sticky = list.offsetTop;
    var title = document.getElementById("title");
    if (window.pageYOffset > sticky ) {
      list.classList.add("sticky");
      title.classList.add("visible-title");
    } else {
      list.classList.remove("sticky");
      title.classList.remove("visible-title");
    }

}

var menu = document.getElementsByClassName("menu");
var selectedMenu = document.getElementById("rpg");
var selectedContent = document.getElementsByClassName("rpg");

//Make the menubar clickable
for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", menuClicked);
}

//when a menuItem is clicked
function menuClicked() {

  //ta bort befintliga meny val
  selectedMenu.classList.remove("highlight");
  //highlighta det nya valet
  this.classList.add("highlight");
  selectedMenu = this;

  //Ta bort befintligt valda spel
  for (let i = 0; i < selectedContent.length; i++) {
    console.log("test");
    selectedContent[i].classList.remove("visible_game");
  }

  //Hitta nya valda spel
  selectedContent = document.getElementsByClassName(selectedMenu.id);
  console.log(selectedContent);
  //Visa nya valda spel
  for (var i = 0; i < selectedContent.length; i++) {
    selectedContent[i].classList.add("visible_game");
  }


}
