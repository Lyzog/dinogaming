

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
