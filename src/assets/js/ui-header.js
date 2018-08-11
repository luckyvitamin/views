$(document).ready(function() {
    //Selectors that i felt could be added dynamically stayed dynamic selectors
    var timeoutId;
    offset = $(this).outerWidth() >= sm ? 180 : 100;
    var myElement = document.querySelector("#movingNav");
    var headroom = new Headroom(myElement,{offset : offset,
        onTop : function() {
            $("#backToTopCircle").fadeOut();
        },
        onNotTop : function() {
            $("#backToTopCircle").fadeIn();
        }});
    headroom.init();

    //Left Navigation Icon handler
    leftNavButton.click(function() {
        if (!leftNav.hasClass('menuOpened') && !rightNav.hasClass('menuOpened')) {
            if (!LuckyVitamin.Header.checkHeader()) {
                yOffset = parseInt($(window).scrollTop());
                LuckyVitamin.Header.lockHeader();
            }
            shadow.addClass('fadeIn');
            leftNav.addClass('menuOpened');
        } else if (leftNav.hasClass('menuOpened') && shadow.hasClass('fadeIn')) {
            leftNav.removeClass('menuOpened');
            shadow.removeClass('fadeIn belowHeader');
            hideEverything();
            LuckyVitamin.Header.unlockHeader();
            $(window).scrollTop(yOffset);
        } else {
            resetRightMenu();
            leftNav.addClass('menuOpened');
        }
        $(this).find(".hamburger").toggleClass('menuClose');
        $(this).find(".menuText").html($(this).find(".menuText").html() == 'Menu' ? 'Close' : 'Menu');
    });

    //rightIcon MyAccount Icon Handler.
    rightNavButton.click(function() {
        if (!leftNav.hasClass('menuOpened') && !rightNav.hasClass('menuOpened')) {
            if (!LuckyVitamin.Header.checkHeader()) {
                yOffset = parseInt($(window).scrollTop());
                LuckyVitamin.Header.lockHeader();
            }
            shadow.addClass('fadeIn');
            rightNav.addClass('menuOpened');
        } else if (rightNav.hasClass('menuOpened') && shadow.hasClass('fadeIn')) {
            rightNav.removeClass('menuOpened');
            shadow.removeClass('fadeIn belowHeader');
            hideEverything();
            LuckyVitamin.Header.unlockHeader();
            $(window).scrollTop(yOffset);
        } else {
            resetLeftMenu();
            rightNav.addClass('menuOpened');
        }
        icon = $(this).find('use').attr('xlink:href');
        if($(this).parents('.invert').length){
            $(this).find('use').attr('xlink:href', icon == '#myAccountNavIconWhite' ? '#closeWhiteIcon' : '#myAccountNavIconWhite');
        } else {
            $(this).find('use').attr('xlink:href', icon == '#myAccountNavIcon' ? '#closeGreenIcon' : '#myAccountNavIcon');

        }
        $(this).find(".menuText").html($(this).find(".menuText").html() == 'Account' ? 'Close' : 'Account');
    });

    //DesktopSearchBar
    $(".closeSearchBar").click(function() {
        LuckyVitamin.Header.unlockHeader();
        desktopSearchBar.val('');
        shadow.removeClass("belowHeader");
        hideEverything();
    });
    //close button on the fixed nav search bar
    $(".closeSearch").click(function() {
        LuckyVitamin.Header.unlockHeader();
        shadow.removeClass("belowHeader");
        fixedSearchBar.val('');
        $(window).scrollTop(yOffset);
        hideEverything();
    });

    //glass icon on mobile menu
    $(".menuSearch").click(function() {
        resetLeftMenu();
        resetRightMenu();
        yOffset = parseInt($(window).scrollTop());
        LuckyVitamin.Header.lockHeader();
        shadow.addClass("belowHeader");
        $('.mobilePromoSpot,.greyGlass').hide();
        $('.toggleSearch, .closeSearch').show();
    });

    //fake search bar on mobile
    $(".searchPlaceHolder").click(function() {
        resetLeftMenu();
        resetRightMenu();
        yOffset = parseInt($(window).scrollTop());
        LuckyVitamin.Header.lockHeader();
        shadow.addClass("belowHeader");
        $('.mobilePromoSpot, .greyGlass').hide();
        $('.mobile').hide();
        $('.fixedNav,.toggleSearch, .closeSearch').show();
        $('.fixedSearch').focus();
    });

    //cancel button on mobile overlay search
    $(".cancelSearch").click(function() {
        LuckyVitamin.Header.unlockHeader();
        shadow.removeClass("belowHeader");
        $(window).scrollTop(yOffset);
        fixedSearchBar.val('');
        $('.fixedNav,.toggleSearch,.mobile,.mobilePromoSpot,.closeSearch').removeAttr("style");
        hideEverything();
    });

    //Department Links close button.
    $(".close").click(function() {
        $('.flyOut').hide();
        $('.miniCart').unbind('mouseout');
        timeoutId = null;
    });

    searchResultsTemplate = $.templates("#searchResultsTemplate");

    /**
     * Desktop Search Bar
     * Uses when to only display when search and suggestions return
     */
    desktopSearchBar.on('textInput input', function(e) {
        var self = $(this);
        var value = $(this).val();
        var width = getCurrentWidth() > sm ? $(this).innerWidth() - 40 : '100%';
        if (value.replace(/ /g, '').length >= 3) {

            searchResultObject = LuckyVitamin.Header.typeAheadSearch(value, "EN");
            suggestionResultObject = LuckyVitamin.Header.getSuggestions(value);

            $.when(searchResultObject, suggestionResultObject).done(function(search, suggestions) {
                htmlResult = searchResultsTemplate.render($.extend(search, suggestions));
                $('.searchResultsBar').html(htmlResult.replace(new RegExp(value, 'gi'), '<b>$&</b>')).width(width).show();
                $('.greenSearch, .closeSearchBar').show();
                resetLeftMenu(); resetRightMenu();
                shadow.addClass("belowHeader");
            });
        }
    });

    $('#searchBar, .fixedSearch').keydown(function(e){
        term = $(this).val();
        if(e.keyCode == 13){
            e.preventDefault();
            LuckyVitamin.Header.submitSearch(term);
        }
    });

    LuckyVitamin.Header.scrollEntries('#searchBar',false);
    LuckyVitamin.Header.scrollEntries('.fixedSearch',true);

    //moving Nav Search Bar
    fixedSearchBar.on('textInput input', function(e) {
        var self = $(this);
        var value = $(this).val();
        var width = getCurrentWidth() > sm ? $(this).innerWidth() - 40 : '100%';
        var xoffset = getCurrentWidth() > sm ? $(this).offset().left : '0';
        var yoffset = $('.fixedNav').innerHeight() - 10;
        if (value.replace(/ /g, '').length >= 3) {
            searchResultObject = LuckyVitamin.Header.typeAheadSearch(value, "EN");
            suggestionResultObject = LuckyVitamin.Header.getSuggestions(value);
            $.when(searchResultObject, suggestionResultObject).done(function(search, suggestions) {
                htmlResult = searchResultsTemplate.render($.extend(search, suggestions));
                $('.searchResults').html(htmlResult.replace(new RegExp(value, 'gi'), '<b>$&</b>')).width(width).css({
                    left: xoffset,
                    top: yoffset
                }).show();
                $('.greenSearch, .closeSearch').addClass("forceShow");
                resetLeftMenu();
                resetRightMenu();
                shadow.addClass("belowHeader");
                LuckyVitamin.Header.lockHeader();
            });
        }
    });
    //This is to fix the terrible background jump that occurs.
    fixedSearchBar.on('focus', function() {
        bodyPosition = parseInt($('body').css('top'));
        resetLeftMenu();
        resetRightMenu();
        yOffset = bodyPosition != 0 ? bodyPosition * -1 : parseInt($(window).scrollTop());
        LuckyVitamin.Header.lockHeader();
        shadow.addClass("belowHeader");
        $('.fixedNav').css({
            top: yOffset,
            position: "absolute"
        });
    });

    //removing jump code to return to normal
    fixedSearchBar.on('blur', function() {
        $('.fixedNav').removeAttr("style");
    });


    /*
     when a fly out is hover there is a slight delay before showing, we also need to adjust the flyout cover on each hover
     */
    $('.flyOutLink').hover(function() {
            flySelector = $(this).find('.flyOut');
            if (!timeoutId) {
                timeoutId = window.setTimeout(function() {
                    timeoutId = null; // EDIT: added this line
                    flySelector.removeAttr("style");
                    shadow.addClass("belowHeader");
                    flySelector.show();
                    $('#navFlyOuts').height(flySelector.height()).show();
                }, 600);
            }
        },
        function () {
            flySelector = $(this).find('.flyOut');
            if (timeoutId) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
            }
            else {
                flySelector.removeAttr("style");
                flySelector.hide();
                shadow.removeClass("belowHeader");
                $('#navFlyOuts').height(flySelector.height()).hide();
            }
        });
});

$('.toggleLang').click(function(e){
    e.preventDefault();
    self = $(this);
    if(self.next(".form").is(':visible')){
        self.next(".form").hide();
    } else {
        self.next(".form").show();
    }
    self.parent().toggleClass("open closed");
});