//Some file
if (typeof(LuckyVitamin) === 'undefined' || LuckyVitamin === null) {
    LuckyVitamin = {};
}
if (typeof(LuckyVitamin.MyAccount) === 'undefined' || LuckyVitamin.MyAccount === null) {
    LuckyVitamin.MyAccount = {};
}
(function(rootNamespace, $) {



    this.forgotPassword = function (param1){
        var promise = $.Deferred();
        $.ajax('', {  //
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
    
    rootNamespace.forgotPassword = this.forgotPassword;
})(LuckyVitamin.MyAccount, jQuery);