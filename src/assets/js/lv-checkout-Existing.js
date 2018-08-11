if (typeof(LuckyVitamin) === 'undefined' || LuckyVitamin === null) {
    LuckyVitamin = {};
}
if (typeof(LuckyVitamin.Checkout) === 'undefined' || LuckyVitamin.Checkout === null) {
    LuckyVitamin.Checkout = {};
}
(function(rootNamespace, $) {


    this.getShippingInformation = function(param1){
        var promise = $.Deferred();
        $.ajax('json/shippingAddress.json', {  //
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

    this.updateShipping = function(param1){
        var promise = $.Deferred();
        $.ajax('json/shippingInfo.json', {  //
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

    this.updateShippingMethod = function(param1){
        var promise = $.Deferred();
        $.ajax('json/shippingMethod.json', {  //
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


    this.getCurrentShipping = function(param1){
        var promise = $.Deferred();
        $.ajax('json/currentShipping.json', {  //
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

    this.updateBillingAddress = function(param1){
        var promise = $.Deferred();
        $.ajax('json/currentShipping.json', {  //
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



    this.getCurrentPaymentMethod = function(param1){
        var promise = $.Deferred();
        $.ajax('json/currentCreditCard.json', {  //
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

    this.getPaymentMethod = function(param1){
        var promise = $.Deferred();
        $.ajax('json/currentCreditCard.json', {  //
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

    this.updatePaymentMethod = function(param1){
        var promise = $.Deferred();
        $.ajax('json/returnedCreditCard.json', {  //
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

    rootNamespace.getShippingInformation = this.getShippingInformation;
    rootNamespace.updateShipping = this.updateShipping;
    rootNamespace.updateShippingMethod = this.updateShippingMethod;
    rootNamespace.getCurrentShipping = this.getCurrentShipping;
    rootNamespace.updateBillingAddress = this.updateBillingAddress;
    rootNamespace.getCurrentPaymentMethod = this.getCurrentPaymentMethod;
    rootNamespace.getPaymentMethod = this.getPaymentMethod;
    rootNamespace.updatePaymentMethod = this.updatePaymentMethod;


})(LuckyVitamin.Checkout, jQuery);