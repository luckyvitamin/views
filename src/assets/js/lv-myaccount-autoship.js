if (typeof(LuckyVitamin) === 'undefined' || LuckyVitamin === null) {
    LuckyVitamin = {};
}
if (typeof(LuckyVitamin.MyAccountController) === 'undefined' || LuckyVitamin.MyAccountController === null) {
    LuckyVitamin.MyAccountController = {};
}
(function(rootNamespace, $) {

  

    this.autoShipShipNow = function (param1){
        var promise = $.Deferred();
        $.ajax('json/shipNow.json', {  //
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

    this.autoShipSkipNow = function (param1){
        var promise = $.Deferred();
        $.ajax('json/skipNow.json', {  //
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

    this.getCurrentPaymentInformation = function (param1){
        var promise = $.Deferred();
        $.ajax('json/paymentInformation.json', {  //
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


    this.autoShipUpdatePaymentMethod = function (param1){
        var promise = $.Deferred();
        $.ajax('json/currentPayment.json', {  //
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
    this.autoShipNewPaymentMethod = function (param1){
        var promise = $.Deferred();
        $.ajax('json/currentPayment.json', {  //
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

    this.createNewAddress = function(param1){
        var promise = $.Deferred();
        $.ajax('json/newAddress.json', {  //
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

    this.removeItemFromAutoship = function(param1){
        var promise = $.Deferred();
        $.ajax('json/autoshipSummary.json', {  //
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

    this.cancelAutoship = function(param1){
        var promise = $.Deferred();
        $.ajax('json/autoshipSummary.json', {  //
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

    this.saveNewAutoshipShipping = function(param1){
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

    this.updateAutoshipShipping = function(param1){
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

    this.useLuckyPoints = function(param1){
        var promise = $.Deferred();
        $.ajax('json/shipNow.json', {  //
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

    this.updateAutoShipDate = function (param1){
        var promise = $.Deferred();
        $.ajax('json/skipNow.json', {  //
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

    this.updateAutoProductSize = function(param1, param2){
        var promise = $.Deferred();
        $.ajax('json/autoshipSummary.json', {  //
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
    this.updateAutoShipProductQty = function(param1, param2, param3){
        var promise = $.Deferred();
        $.ajax('json/autoshipSummary.json', {  //
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

    this.updateAutoShipProductFrequency = function(param1, param2, param3){
        var promise = $.Deferred();
        $.ajax('json/autoshipSummary.json', {  //
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


    rootNamespace.updateAutoShipDate = this.updateAutoShipDate;
    rootNamespace.useLuckyPoints = this.useLuckyPoints;
    rootNamespace.autoShipUpdatePaymentMethod = this.autoShipUpdatePaymentMethod;
    rootNamespace.autoShipNewPaymentMethod = this.autoShipNewPaymentMethod;
    rootNamespace.autoShipShipNow = this.autoShipShipNow;
    rootNamespace.autoShipSkipNow = this.autoShipSkipNow;
    rootNamespace.getCurrentPaymentInformation = this.getCurrentPaymentInformation;
    rootNamespace.createNewAddress = this.createNewAddress;
    rootNamespace.removeItemFromAutoship = this.removeItemFromAutoship;
    rootNamespace.cancelAutoship = this.cancelAutoship;
    rootNamespace.saveNewAutoshipShipping = this.saveNewAutoshipShipping;
    rootNamespace.updateAutoshipShipping = this.updateAutoshipShipping;
    rootNamespace.updateAutoProductSize = this.updateAutoProductSize;
    rootNamespace.updateAutoShipProductQty = this.updateAutoShipProductQty;
    rootNamespace.updateAutoShipProductFrequency = this.updateAutoShipProductFrequency;

})(LuckyVitamin.MyAccountController, jQuery);