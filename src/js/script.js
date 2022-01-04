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
    let windowPos = $(window).scrollTop() + $(window).height() + 500;
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

  if ($(".home-page").length) {
    const navbar = document.querySelector('.nav');
    const scrollspy = VanillaScrollspy(navbar);
    scrollspy.init();
  }

  if ($(".services-card").length > 3) {
    const servicesSlider = $("#servicesSlider");
    servicesSlider.slick({
      dots: false,
      infinite: false,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: ".slider-btn_prev",
      nextArrow: ".slider-btn_next",

      responsive: [{
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
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
  if (scrollValue >= pictureBottom) {
    $(".picture").css({
      transform: 'scale(' + scrollPicture + ')',
    });
  }

});

svg4everybody();