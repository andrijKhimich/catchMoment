const scrollBtn = $(".scroll-btn");
const header = $(".header");
const logoImg = $(".logo img");

function setInnerHeader() {
  logoImg.attr("src", logoRedUrl);
  header.addClass("header_inner");
}

function setHomeHeader() {
  logoImg.attr("src", logoMainUrl);
  header.removeClass("header_inner");
}

const preloader = $(".preloader");
const body = $("body");

function hidePreloader() {
  preloader.removeClass("showed");
  body.addClass('fixed');
  setTimeout(() => {
    body.removeClass("fixed");
  }, 5000)
}

function showOnScroll(scrollValue) {
  $('.js-scroll').each(function () {
    let elem = $(this);

    let sectionPos = elem.offset().top;
    let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
    if (sectionPos < windowPos) {
      elem.removeClass('hidden');
    }
  });

  $('.js-scroll-footer').each(function () {
    let elem = $(this);
    let sectionPos = elem.offset().top;
    let windowPos = $(window).scrollTop() + $(window).height() - 300;
    if (sectionPos < windowPos) {
      elem.removeClass('hidden');
    }
  });
}


const hamburger = $(".js-hamburger");
const headerMenu = $(".js-header-menu");

function openMenu() {
  hamburger.addClass('open');
  headerMenu.addClass('open');
}

function closeMenu() {
  hamburger.removeClass('open');
  headerMenu.removeClass('open');
}

function showContent() {
  $(".main-wrapper").removeClass("js-fadeIn");
}

$(document).ready(function () {
  if ($('.inner-page').length) {
    setInnerHeader();
    $(".footer").removeClass("hidden");
  } else {
    setHomeHeader();
  }

  showContent();
  hidePreloader();

  hamburger.click(function () {
    if ($(this).hasClass('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // $('.nav-list li a[href^="#"], .btn[href^="#"]').click(function (e) {
  //   e.preventDefault();
  //   $(".nav-list li a").not(this).removeClass("active");
  //   $(this).addClass("active");
  //   closeMenu();
  //   let link = $($(this).attr('href'))
  //   $('html, body').animate({
  //     scrollTop: link.offset().top - 80
  //   }, 1000);
  // });
  if ($(".home-page").length) {
    const navbar = document.querySelector('.nav');
    const scrollspy = VanillaScrollspy(navbar);
    scrollspy.init();
  }
});


$(window).scroll(function () {
  const scrollValue = $(this).scrollTop();
  showOnScroll(scrollValue);
  scrollValue >= 1 ? closeMenu() : null;

  if (scrollValue > 100 && scrollValue < 500) {
    header.addClass('hidden');
  } else {
    header.removeClass('hidden');
  }

  if (scrollValue > 500) {
    header.addClass('sticky');
    logoImg.attr("src", logoRedUrl);

  } else {
    header.removeClass('sticky');
    logoImg.attr("src", logoMainUrl);
    $(".nav-list li a").removeClass("active");
  }

  let docHeight = $("body").height();
  let winHeight = $(window).height();
  let viewport = docHeight - winHeight;
  let scrollPos = $(window).scrollTop();
  let scrollPercent = (scrollPos / viewport) * 100;
  let scrollSkier = scrollPercent / 50 + 1;
  let scrollTitle = scrollPos / 2;
  let scrollPicture = scrollPercent / 200 + 1;

  $(".hero__title").css({
    transform: 'translate(' + "0," + scrollTitle + "px" + ')',
  });

  $(".skier").css({
    transform: 'scale(' + scrollSkier + ')',
  });


  let pictureBottom = $('.picture').offset().top;
  // let pictureBottomPosition = pictureBottom - scrollValue;
  // console.log(scrollValue, pictureBottom);
  if (scrollValue >= pictureBottom) {
    // $('body').addClass("fixed");
    $(".picture").css({
      transform: 'scale(' + scrollPicture + ')',
    });
  }
});

svg4everybody();