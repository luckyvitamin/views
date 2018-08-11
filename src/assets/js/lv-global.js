/**
 * Global File is used to set information that will be used across
 */
var md = 992,
    sm = 767,
    lg = 1200,
    xl = 1200,
    currentPage = 1,
    body = $('body'),
    leftNavButton = $('.menuIcon'),
    leftNav = $('#flyOutNav'),
    rightNavButton =  $('.myAccountFixed'),
    rightNav =         $('#myAccountFlyOut'),
    fixedSearchBar = $('.fixedSearch'),
    desktopSearchBar = $('#searchBar'),
    miniCart = $('.cartHolder'),
    backToTop = $(".backToTop"),
    shadow = $('#shadow'),
    fixedNav = $('#movingNav'),
    mobileNav = $('.mobileNav'),
    mobileHelp = $('.mobileHelp'),

//Slicks Settings are a bit crazy
defaultSlideOptions = {
    mobileFirst: true,
    infinite: true,
    arrows: false,
    autoplaySpeed: 5000,
    prevArrow: '<span class="slick-prev"><svg viewBox="0 0 12 21"> <use xlink:href="#largeMenuArrowIconLeft"></use> </svg> </span>',
    nextArrow: '<span class="slick-next"><svg viewBox="0 0 12 21"> <use xlink:href="#largeMenuArrowIconRight"></use></svg></span>',
};
defaultSlideOptionsWithArrows = {
    mobileFirst: true,
    infinite: true,
    arrows: true,
    prevArrow: '<span class="slick-prev"><svg viewBox="0 0 12 21"> <use xlink:href="#largeMenuArrowIconLeft"></use> </svg> </span>',
    nextArrow: '<span class="slick-next"><svg viewBox="0 0 12 21"> <use xlink:href="#largeMenuArrowIconRight"></use></svg></span>',
};

productSlideResponsiveSettings = [{
    breakpoint: sm,
    settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        variableWidth: false,
        dots: true
    }
}, {
    breakpoint: md,
    settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        variableWidth: false,
        dots: true
    }
}, {
    breakpoint: lg,
    settings: {
        arrows: true,
        dots: true,
        slidesToScroll: 4,
        variableWidth: false,
        slidesToShow: 4
    }
},{
    breakpoint: xl,
    settings: {
        arrows: true,
        dots: true,
        variableWidth: false,
        slidesToScroll: 5,
        slidesToShow: 5
    }
}];
productSlideResponsiveNoScrollSettings = [{
    breakpoint: sm,
    settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        infinite: false,
        variableWidth: false,
        dots: true
    }
}, {
    breakpoint: md,
    settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        infinite: false,
        variableWidth: false,
        dots: true
    }
}, {
    breakpoint: lg,
    settings: {
        arrows: true,
        dots: true,
        infinite: false,

        slidesToScroll: 4,
        variableWidth: false,
        slidesToShow: 4
    }
},{
    breakpoint: xl,
    settings: {
        arrows: true,
        dots: true,
        infinite: false,
        variableWidth: false,
        slidesToScroll: 5,
        slidesToShow: 5
    }
}];

/**
 * Helper Function call this anywhere and it will try to close anything that could be open on a screen
 * place class .hidable on the object.
 */
var hideEverything = function() {
    LuckyVitamin.Header.unlockHeader();
    $('.hidable').hide().removeAttr('style').removeClass('forceShow');
    shadow.removeClass('fadeIn');
    mobileHelp.removeClass('open');
};

var getCurrentWidth = function(){
    return $(window).width();
};

var closeMenus = function(){
    resetLeftMenu();
    resetRightMenu();
    shadow.removeClass('fadeIn');
};
var resetLeftMenu = function (){
    leftNav.removeClass("menuOpened");
    leftNavButton.find(".hamburger").removeClass("menuClose");
    leftNavButton.find(".closeSpacer").addClass('menuClose');
    leftNavButton.find(".menuText").html("Menu");
};

var resetRightMenu = function (){
    rightNav.removeClass('menuOpened');
    if(rightNavButton.parents('.invert').length){
        rightNavButton.find('use').attr('xlink:href', '#myAccountNavIconWhite');
    } else {
        rightNavButton.find('use').attr('xlink:href', '#myAccountNavIcon');

    }
    rightNavButton.find(".menuText").html('Account');
};

/**
 * This loads the raw svg code into a div onto the page to give us a sprite sheet for SVGs
 */
$.get("images/svgMap.svg", function(data) {
    var div = document.createElement("div");
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    document.body.insertBefore(div, document.body.childNodes[0]);
});

$.validator.setDefaults({
    errorElement: "span",
    errorClass: "help-block",
    highlight: function (element, errorClass, validClass) {
        // Only validation controls
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        }
    },
    unhighlight: function(element, errorClass, validClass){
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    },

    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
            console.log(element.parent());
        }
        else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
            error.insertAfter(element.parent().parent());
        }
        else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
            error.appendTo(element.parent().parent());
        }
        else {
            error.insertAfter(element);
        }
    }
});