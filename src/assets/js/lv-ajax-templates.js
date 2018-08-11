if (typeof (LuckyVitamin) === 'undefined' || LuckyVitamin === null ) {
    LuckyVitamin = {};
}
if (typeof (LuckyVitamin.AjaxTemplates) === 'undefined' || LuckyVitamin.AjaxTemplates ===     null ) {
    LuckyVitamin.AjaxTemplates = {};
}
(function(rootNamespace, $) {
    /**
     * Retrieves json data for templates
     * @param url the endpoint to retrieve the information
     * @returns {*}
     */
    this.getTemplateData = function (url) {
        var promise = $.Deferred();
        $.ajax(url, {
            cache: true,
            success: function (result) {
                promise.resolve(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return promise;
    };
    rootNamespace.getTemplateData = this.getTemplateData;
})(LuckyVitamin.AjaxTemplates, jQuery);
