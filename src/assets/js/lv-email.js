if (typeof (LuckyVitamin) === 'undefined' || LuckyVitamin === null ) {
    LuckyVitamin = {};
}
if (typeof (LuckyVitamin.EmailServices) === 'undefined' || LuckyVitamin.EmailServices ===     null ) {
    LuckyVitamin.EmailServices = {};
}
(function(rootNamespace, $) {
    /**
     * TODO: Params should be whatever data you need to send to server to sign up for email
     * TODO: Need to set Ajax endpoint for request as well
     * Submits an email for newsletter
     * @param email validated email address
     * @returns Deferred Promise
     */
    this.newsLetterSignup = function (email) {
        var promise = $.Deferred();
        $.ajax('', {///Newsletter.Subscribe.asmx/NewsletterSignup
            method: "POST",
            data: {CustomerEmail:email},
            success: function (result) {
                tmpl = $.templates('#emailSignupModal');
                html = tmpl.render(result);
                console.log(html);
                promise.resolve(html)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return promise;
    };

    this.notifyMe = function (firstName, email) {
        var promise = $.Deferred();
        $.ajax('https://jsonplaceholder.typicode.com/posts', {///Newsletter.Subscribe.asmx/NewsletterSignup
            method: "POST",
            data: {firstName:firstName, email:email},
            success: function (result) {
                promise.resolve(true)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return promise;
    };
    rootNamespace.newsLetterSignup = this.newsLetterSignup;
    rootNamespace.notifyMe = this.notifyMe;
})(LuckyVitamin.EmailServices, jQuery);
