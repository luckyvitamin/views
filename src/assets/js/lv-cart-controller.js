//Some file
if (typeof(LuckyVitamin) === 'undefined' || LuckyVitamin === null) {
    LuckyVitamin = {};
}
if (typeof(LuckyVitamin.CartController) === 'undefined' || LuckyVitamin.CartController === null) {
    LuckyVitamin.CartController = {};
}
(function(rootNamespace, $) {

    /**
     * Retrieves json data for templates
     * @param clickObject $(this) is passed through so they can handle any qty change
     * @returns void
     */
    this.handleQtyChange = function(clickObject) {
        var direction = clickObject.data("direction"),
            qtyBox = clickObject.siblings("input"),
            originalValue = qtyBox.data("original-value"),
            qtyValue = qtyBox.val(),
            btn = clickObject.parent().next('.btn');

        if (direction == '+') {
            qtyValue++;
            qtyBox.val(qtyValue);
            clickObject.siblings(".qtyController").removeClass('disabled');
        } else {
            if (qtyValue > 1) {
                qtyValue--;
                qtyBox.val(qtyValue);
            }
            if (qtyValue == 1) {
                clickObject.addClass('disabled');
            }

        }
        qtyBox.trigger('change'); //new as of october
        if (qtyValue != originalValue) {
            btn.show();
        } else {
            btn.hide();
        }
    };
    this.updatePriceUI = function(clickObject){
        self = $(clickObject);
        var description = self.parents('.quickControls').prev('.productDescription');
        if(description.length > 0) { //listing page
            description.find(".bigPrice").html(self.data('price'));
            self.hasClass('standard') ? description.find(".autoShipText").hide() : description.find(".autoShipText").show();
            if(self.data('priceper') !== 'undefined'){
                description.find(".perServing").html("Per Serving $" +self.data('priceper'));
            }
        } else {//product page
            description = self.parents('.quickControls').closest('.productDescription');
            description.find(".price b").html(self.data('price'));
            self.hasClass('standard') ? description.find(".autoShipText").hide() : description.find(".autoShipText").show();
            if(self.data('priceper') !== 'undefined'){
                description.find(".perServing").html("Per Serving $" +self.data('priceper'));
            }
            $('.navProduct').find('.price b').html(self.data('price'));
            self.hasClass('standard') ?  $('.navProduct').find(".price > span").hide() :  $('.navProduct').find(".price > span").show();
        }
    };

    this.updateProductPagePrices = function(price){
        $('.price b','.productDescription').html(price);
        $('.price b','.navProduct').html(price);
    };
    /**
     * TODO: Params should be whatever data you need to send to server to add to cart
     * TODO: Need to set Ajax endpoint for request as well
     * Add Item to the current users cart
     * @param productId - to be replaced
     * @returns Deferred Promise
     */
    this.addToCart = function(productId){
        if($(document).outerWidth() >= 992){ //md
            template = '#desktopAddToCart';
        } else {
            template = '#mobileAddToCart';
        }
        var promise = $.Deferred();
        $.ajax('', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                tmpl = $.templates(template);
                html = tmpl.render(result);
                promise.resolve(html);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return promise;
    };


    this.removePromoCode = function (promoCode){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.addPromoCode = function (promoCode){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",// change to post
            success: function(result) {
                promise.resolve(result);
            }, //fail validation
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.getShippingOptions = function (zipCode){
        var promise = $.Deferred();
        if(zipCode.length < 5){  //more validation ?
            promise.reject("invalid zipcode");
        }
        $.ajax('json/shippingOptions.json', {  //
            cache : false,
            type  : "GET", //change to post
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.getShippingOptionsInterTEMP = function (zipCode){
        var promise = $.Deferred();
       
        $.ajax('json/shippingOptionsInternational.json', {  //
            cache : false,
            type  : "GET", //change to post
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };


    this.updateShippingOption = function (someData){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.updateProductQty = function (productID, qty){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.getSavedForLater = function (param){
        var promise = $.Deferred();
        $.ajax('json/savedForLater.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.moveToCart = function (productID){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.addToCheckout = function (productID){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.updateDelivery = function (param1, param2){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.updateDeliveryFrequency = function (param1, param2){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.swapProducts = function (param1, param2){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.removeFreeItem = function (param1){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };
    this.addFreeItem = function (param1){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };
    this.removeItem = function (param1){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };
    this.saveForLater = function (param1){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    this.removeFromSaveForLater = function (param1){
        var promise = $.Deferred();
        $.ajax('json/promoCodes.json', {  //
            cache : false,
            type  : "GET",
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                promise.reject(errorThrown);
            }
        });
        return promise;
    };

    rootNamespace.handleQtyChange = this.handleQtyChange;
    rootNamespace.addToCart = this.addToCart;
    rootNamespace.updatePriceUI = this.updatePriceUI;
    rootNamespace.updateProductPagePrices = this.updateProductPagePrices;
    rootNamespace.removePromoCode = this.removePromoCode;
    rootNamespace.addPromoCode = this.addPromoCode;
    rootNamespace.getShippingOptions = this.getShippingOptions;
    rootNamespace.updateShippingOption = this.updateShippingOption;
    rootNamespace.updateProductQty = this.updateProductQty;
    rootNamespace.getSavedForLater = this.getSavedForLater;
    rootNamespace.moveToCart = this.moveToCart;
    rootNamespace.addToCheckout = this.addToCheckout;
    rootNamespace.updateDelivery = this.updateDelivery;
    rootNamespace.updateDeliveryFrequency = this.updateDeliveryFrequency;
    rootNamespace.swapProducts = this.swapProducts;
    rootNamespace.removeFreeItem = this.removeFreeItem;
    rootNamespace.removeItem = this.removeItem;
    rootNamespace.addFreeItem = this.addFreeItem;
    rootNamespace.saveForLater = this.saveForLater;
    rootNamespace.removeFromSaveForLater = this.removeFromSaveForLater;
    rootNamespace.getShippingOptionsInterTEMP = this.getShippingOptionsInterTEMP;
})(LuckyVitamin.CartController, jQuery);