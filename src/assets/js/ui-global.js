/**
 * Adding .blockOnHover to any class drops the z-index to 500 which is currently lower then the header.
 * through css this could be changed to accommodate anything.
 */
$(".blockOnHover").hover(
    function() {
        shadow.addClass("belowHeader");
        closeMenus();
    }, function() {
        shadow.removeClass("belowHeader");

    });
/**
 * Similar to above but we need to force the fixed nav to be displayed and there is some jumping to deal with
 * going from fixed to absolute so this accounts for that
 */
$(".blockOnHoverFixed").hover(
    function() {
        $('.fixedNav').addClass('forceShow');
        shadow.addClass("belowHeader");
        closeMenus();
    }, function() {
        shadow.removeClass("belowHeader");
        LuckyVitamin.Header.unlockHeader();
        if(typeof yOffset !== 'undefined'){
            $(window).scrollTop(yOffset);
        }
    });

/**
 * close everything on shadow click
 */
shadow.on('click',function() {
    resetLeftMenu();
    resetRightMenu();
    hideEverything();
    LuckyVitamin.Header.unlockHeader();
    shadow.removeClass('fadeIn belowHeader');
    if(typeof yOffset !== 'undefined'){
        $(window).scrollTop(yOffset);
    }

});


backToTop.click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
});

//handles any cart qty object
$(document).on("click", '.qtyController', function() {
    LuckyVitamin.CartController.handleQtyChange($(this));
});

//TODO Update to whatever is needed for a UI pricechange Desktop
$(document).on('click', '.quickControls .shippingOptions div', function () {
    var selector = $(this);
    if (selector.parents('.shippingOptions').hasClass("greyOut")) {
        return false;
    }
    if(selector.hasClass('saveTime') || selector.parents('div').hasClass('saveTime')){
        return false;
    }
    selector.find('input[type="radio"]').prop('checked', 'true');
    if (!selector.hasClass('selected')) {
        selector.toggleClass("selected");
        selector.siblings().toggleClass("selected");
        LuckyVitamin.CartController.updatePriceUI(selector);
        selector.find('select.form-control').show();
        selector.siblings().find('select.form-control').hide();
        var addToCartIcon = selector.closest('.quickControls').find('button');
        if(addToCartIcon.length == 0 ){
            addToCartIcon = selector.parents().siblings('.quickControls').find('button');
        }
        addToCartIcon.trigger("typeChange");
    }
});

//TODO Update to whatever is needed for a UI pricechange Desktop
$(document).on('click', '.mobileAutoShip .shippingOptions div', function () {
    var selector = $(this);
    if (selector.parents('.shippingOptions').hasClass("greyOut") ) {
        return false;
    }
    selector.find('input[type="radio"]').prop('checked', 'true');
    if (!selector.hasClass('selected')) {
        selector.toggleClass("selected");
        selector.siblings().toggleClass("selected");
        LuckyVitamin.CartController.updatePriceUI(selector);
        selector.find('select.form-control').show();
        selector.siblings().find('select.form-control').hide();
        addToCartIcon = selector.parents('.productDescription').siblings('.quickControls').find('button');
        addToCartIcon.trigger("typeChange");
    }
});
$(document).on("typeChange", '.addToCart', function(){
    $(this).toggleClass("gridBtn");
    addToCartIcon = $(this).find('svg');
    icon = addToCartIcon.find('use').attr('xlink:href');
    addToCartIcon.find('use').attr('xlink:href', icon == '#cartAutoship' ? '#cartBalls' : '#cartAutoship');
    $(this).find('.autoTag').toggle();
    
    addToCartIcon.find('small').toggle();
    autoshipWidth =  $(document).outerWidth() >= sm ? "36px" : "30";
    addToCartIcon.width( icon == '#cartAutoship' ? "24px" : autoshipWidth);
    addToCartIcon.removeAttr('viewBox');
    viewbox = icon == '#cartAutoship' ? "0 0 24 16.76" : "0 0 36 26.76" ;
    addToCartIcon.each(function () { $(this)[0].setAttribute('viewBox', viewbox) });

    $('#mobileAddToCart').toggleClass("gridBtn");
    $('#mobileAddToCart').find('.autoTag').toggle();
});

//handles any add to cart instance
//TODO: Grab attributes from the radio and qty box and anything else that needs to be used/
$(document).on("click", '.addToCart, .addToAutoShip', function() {
    self = $(this);
    var oldHtml = self.html();
    id = $(this).data("product-id");
    self.addClass("processing");
    self.find("span").text("Processing");
    self.prop("disabled",true);
    addtoCartPromise = LuckyVitamin.CartController.addToCart(id);
    addtoCartPromise.done(function (result) {
        if($(document).outerWidth() >= md){
            miniCart.html(result).addClass('forceDisplay');
            setTimeout(function() { $('.cartHolder').removeClass('forceDisplay'); }, 3000);
        } else{
            body.append(result);
            $("#mobileCartModal").modal();
        }
        self.removeClass("processing");
        self.html(oldHtml);
        self.prop("disabled",false);
    });
});

//Language Select
$(document).on("change", '.shippingSelect', function(e) {
    selectedRow = $(e.target).find("option:selected").data();
    $('.flag').attr('class', 'flag ' + selectedRow.country);
    $('.currentLanguage').html(selectedRow.language);
    $('.shippingSelect').val(selectedRow.country);
    $('.langSelect').val(selectedRow.language);
});

$(document).on("click", '.subscribeButton', function(e){
    $(this).parents().find('.emailError').html("");
    email = $('.subscribeEmail').val();
    var validations ={
        email: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please enter a valid email address']
    };
    validation = new RegExp(validations['email'][0]);
    // validate the email value against the regular expression
    if (!validation.test(email)) {
        // If the validation fails then we show the custom error message
        $(this).parents().find('.emailError').html(validations['email'][1]);
        return false;
    }
    subscribePromise = LuckyVitamin.EmailServices.newsLetterSignup(email);
    subscribePromise.done(function (result){
        body.append(result);
        $("#signupModal").modal();
    });
});

$(document).on("click", '.notifyMe', function(e){
    notifyMeModal = $('#notifyMeModal');
    var title = $(this).data("title");
    if(typeof title == "undefined"){
        console.log("must have data attribute for title");
        return;
    }
    notifyMeModal.find('b').html(title);
    notifyMeModal.modal();
});

$(document).on("click", '.backOrderModalTrigger', function(e){
    backOrderModal = $('#backOrderModal');
    var productName = $(this).data("productname");
    if(typeof productName == "undefined"){
        console.log("must have data attribute for title");
        return;
    }
    backOrderModal.find('.modal-body .name').html(productName);
    backOrderModal.modal();
});

$(document).on("click", '.backOrderToggle', function(e){
    var self = $(this);
    self.parent().toggleClass('open');
});


$(document).on("click", '#notifyMeBtn', function(e){
    firstName = $('#notifyFirstName');
    email = $('#notifyEmailAddress');
    firstName.closest(".form-group").removeClass('has-error').find('span').html("");
    email.closest(".form-group").removeClass('has-error').find('span').html("");
    var validations ={
        email: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please enter a valid email address']};
    validationEmail = new RegExp(validations['email'][0]);
    if (!validationEmail.test(email.val()) || firstName.val() == "") {
        if(!validationEmail.test(email.val())){
            email.closest(".form-group").append("<span>" + validations['email'][1] + "</span>").addClass("has-error");
        }
        if(firstName.val() == ""){
            firstName.closest(".form-group").append("<span>First name is required</span>").addClass("has-error");
        }
        return false;
    }
    notifyPromise = LuckyVitamin.EmailServices.notifyMe(firstName.val(),email.val());
    notifyPromise.done(function (result){
        notifyMeModal.find('.modal-body').html("<b>Thank You</b>");
        notifyMeModal.modal('hide');
    });
});

$(document).on("click", '#backOrderBtn', function(e){
    firstName = $('#backOrderFirstName');
    email = $('#backOrderEmailAddress');
    firstName.closest(".form-group").removeClass('has-error').find('span').html("");
    email.closest(".form-group").removeClass('has-error').find('span').html("");
    var validations ={
        email: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please enter a valid email address']};
    validationEmail = new RegExp(validations['email'][0]);
    if (!validationEmail.test(email.val()) || firstName.val() == "") {
        if(!validationEmail.test(email.val())){
            email.closest(".form-group").append("<span>" + validations['email'][1] + "</span>").addClass("has-error");
        }
        if(firstName.val() == ""){
            firstName.closest(".form-group").append("<span>First name is required</span>").addClass("has-error");
        }
        return false;
    }
    notifyPromise = LuckyVitamin.EmailServices.notifyMe(firstName.val(),email.val());
    notifyPromise.done(function (result){
        backOrderModal.find('.modal-body').html("<b>Thank You</b>");
        backOrderModal.modal('hide');
    });
});

$(document).on("click", '.autoShipModalTrigger', function(e){
    $('#autoshipModal').modal();
});

mobileHelp.on("click", function(e){
    if (!LuckyVitamin.Header.checkHeader()) {
        yOffset = parseInt($(window).scrollTop());
        LuckyVitamin.Header.lockHeader();
    } else {
        LuckyVitamin.Header.unlockHeader();
    }
    $(this).toggleClass('open');
    shadow.toggleClass('fadeIn');
});
