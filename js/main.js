$(document).ready(function() {
  bodyHeight();
  carousel();
});
$(window).on({
  resize: bodyHeight
});
//scroll fixed element vertically or horizontally
function verticalScroll(elem, startingColumn) {
  let top = startingColumn * $(window).width() - $(window).scrollTop();
  $(elem).css({ top: top, left: -$(window).width() * startingColumn });
}
function horizontalScroll(elem, startingRow) {
  let left = startingRow * $(window).height() - $(window).scrollTop();
  $(elem).css({ left: left, top: -$(window).height() * startingRow });
}
//matches body height to scroll height
function bodyHeight() {
  $("body").css({ height: $(window).width() * 1 + $(window).height() * 3 });
  switchScroll();
}
//hightlight selection nav menu item
function navHighlight(section) {
  $("#menu>li>a").css({ background: (0, 0, 0, 0), color: "#ddd" });
  $("header").css({ background: "black" });
  $(`#menu>li>a:eq(${section})`).css({
    background: "#ddd",
    color: "black"
  });
}
function sectionPosition(section) {
  return $(section).offset().top + $(section).offset().left;
}

document.querySelectorAll("#menu>li>a").forEach(function(link) {
  let id = link.getAttribute("href");
  link.addEventListener("click", function() {
    $("html,body").animate({ scrollTop: sectionPosition(id) }, "slow");
  });
});
document.querySelectorAll("#hamburger-menu>li").forEach(function(link) {
  let id = link.firstChild.getAttribute("href");
  link.addEventListener("click", function() {
    $("html,body").animate({ scrollTop: sectionPosition(id) }, "slow");
  });
});
$("#branded-name").click(function() {
  $("html,body").animate({ scrollTop: 0 }, "slow");
});
$("#computer-pic").click(function() {
  $("html,body").animate({ scrollTop: sectionPosition($("#contact")) }, "slow");
});

$(document).on({
  scroll: switchScroll
});

// toggle dropdown menu
$("#hamburger-icon").click(function() {
  $("#hamburger-menu").slideToggle("slow");
  $("#menu>li>a").css({ background: (0, 0, 0, 0), color: "#ddd" });
  $("header").css({
    background: "black",
    transition: ".4s ease-in-out"
  });
});

//carousel
let portfolioIndex = 0;
let testimonialsIndex = 0;
function carousel() {
  $(".carousel-buttons").click(function(event) {
    console.log(`${event.target.parentElement.parentElement.id}`);

    let carousel = event.target.parentElement.parentElement.getElementsByClassName(
      "carousel"
    )[0];
    let carouselItems = event.target.parentElement.parentElement.getElementsByClassName(
      "carousel-item"
    );

    if (event.target.className == "left") {
      console.log("left");
      portfolioIndex -= 1;
      if (portfolioIndex < 0) {
        portfolioIndex = carouselItems.length - 1;
      }
      $(carousel).css({ left: `${portfolioIndex * -100}vw` });
    } else if (event.target.className == "right") {
      console.log("right");
      if (portfolioIndex > carouselItems.length - 2) {
        portfolioIndex = -1;
      }
      portfolioIndex += 1;
      $(carousel).css({ left: `${portfolioIndex * -100}vw` });
    }
  });
}

// switch scroll direction and transition background of links in menu
function switchScroll() {
  let winTop = $(window).scrollTop();
  let winHeight = $(window).height();
  let winWidth = $(window).width();
  let main = $("#scroll-main");
  switch (true) {
    // case winTop >= 2 * winWidth + 3 * winHeight:
    //   verticalScroll(main, 2);
    //   navHighlight(4);
    //   break;
    // case winTop >= 2 * winWidth + 2.5 * winHeight:
    //   verticalScroll(main, 2);
    //   navHighlight(4);
    //   break;
    // case winTop >= 2 * winWidth + 2 * winHeight:
    //   verticalScroll(main, 2);
    //   navHighlight(3);
    //   break;
    // case winTop >= 1.5 * winWidth + 2 * winHeight:
    //   horizontalScroll(main, 2);
    //   navHighlight(3);
    //   break;
    case winTop >= winWidth + 2 * winHeight:
      horizontalScroll(main, 2);
      navHighlight(2);
      break;
    case winTop >= winWidth + 1.5 * winHeight:
      verticalScroll(main, 1);
      navHighlight(2);
      break;
    case winTop >= winWidth + winHeight:
      verticalScroll(main, 1);
      navHighlight(1);
      break;
    case winTop >= winWidth / 2 + winHeight:
      horizontalScroll(main, 1);
      navHighlight(1);
      break;
    case winTop >= winHeight:
      horizontalScroll(main, 1);
      navHighlight(0);
      break;
    case winTop >= winHeight / 2:
      verticalScroll(main, 0);
      navHighlight(0);
      break;
    case winTop < 1:
      verticalScroll(main, 0);
      $("header").css({
        background: (0, 0, 0, 0),
        transition: ".4s ease-in-out"
      });
      $("#menu>li>a").css({ background: (0, 0, 0, 0), color: "black" });
      break;
    case winTop < winHeight / 2:
      verticalScroll(main, 0);
      $("#menu>li>a").css({ background: (0, 0, 0, 0), color: "#ddd" });
      $("header").css({
        background: "black",
        transition: ".4s ease-in-out"
      });
      break;
  }
}
