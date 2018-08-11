//Some file
if (typeof (LuckyVitamin) === 'undefined' || LuckyVitamin === null ) {
    LuckyVitamin = {};
}
if (typeof (LuckyVitamin.Header) === 'undefined' || LuckyVitamin.Header === null ) {
    LuckyVitamin.Header = {};
}
(function(rootNamespace, $) {
    /**
     * TODO: Need to set Ajax endpoint for request
     * TODO: Need to modify or set new enpoint meeting the json of search
     * Type ahead for any search object
     * @param searchTerm Term being searched
     * @param lang - language of search
     * @returns Deferred Promise
     */
    this.typeAheadSearch = function(searchTerm, lang) {
        var promise = $.Deferred();
        $.ajax({
            url:"json/searchResults.json",   /// to be replaced with custom endpoint returning data that matches the json
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
    /**
     * TODO: Verify this is setup correctly
     * Gets search suggestions from Vendor
     * @param searchTerm term to get suggestions
     * @returns Deferred Promise
     */
    this.getSuggestions = function(searchTerm){
        var promise = $.Deferred();
        $.ajax({
            url:'https://vector.nextopiasoftware.com/return_autocomplete_jsonp.php?',
            dataType: "jsonp",
            jsonpCallback: "resolvePromise",
            data: {
                q:searchTerm,
                cid:"ed441d95dfb1990ae79c4ba957447dcd",
                num_products:6,
                num_terms:5
            },
            success: function(result) {
                promise.resolve(result);
            },
            error: function(jqXHR, textStatus,errorThrown) {
            }
        });
        return promise;
    };
    /**
     * Allows search results to be scrolled with keyboard
     * @param searchInput Selector of the current search object
     * @param fixedInput BOOL if we are using the fixed search bar or not
     * @returns Deferred Promise
     */
    this.scrollEntries = function (searchInput, fixedInput){
        var selector = $(searchInput);
        var index = -1;
        var useParents = fixedInput;
        selector.keyup(function(e) {
            switch(e.keyCode){
                case 38:
                    index = self.updateSearchBar(selector,index,useParents,false);
                    break;
                case 40:
                    index = self.updateSearchBar(selector,index, useParents, true);
                    break;
                default:
                    break;
            }
        });
    };

    /**
     * private function to update the searchbar
     * @param $selector Selector of the current search object
     * @param index current index of the search scroll
     * @param useParents bool to know if to use parent selectors for fixed search
     * @param increment bool - add to index or remove from indexc
     * @returns Deferred Promise
     */
    this.updateSearchBar = function ($selector,index,useParents,increment){
        var resultSet = "";
        if(useParents){
            resultSet = $selector.parents().siblings('.scrollable').children();
        } else {
            resultSet = $selector.siblings('.scrollable').children();
        }
        var resultList = resultSet.find('.scrollItem');
        var length = resultList.length;
        if ((index == length - 1 && increment) || (index == 0 && !increment)){
            return index;
        } else {
            resultList.removeClass('active');
            index = increment ? index + 1 : index - 1 ;
            resultList.eq(index).addClass('active');
            var text = resultList.eq(index).find("a").text();
            $selector.val(text);
            return index;
        }
    };

    /**
     * Submit search and move to search results page
     * @param searchTerm
     */
    this.submitSearch = function (searchTerm) {
        formattedSearch = searchTerm;
        if($('body').data('language').toUpperCase()!='EN'){
            formattedSearch = encodeURI(searchTerm);
        }else{
            formattedSearch = formattedSearch.replace(/[^a-zA-Z 0-9]+/g,'').replace(/^\s+|\s+$/g,"");}
        formattedSearch = 'sb-'+formattedSearch.replace(new RegExp(" ","g"),"-");
        if(formattedSearch.length>3) {
            window.location = formattedSearch;
        }
    };

    /**
     * these are mostly used in the global helpers but can be used anywhere
     */
    this.toggleHeader = function () {
        $('body').toggleClass('noScroll');
        $('.fixedNav').toggleClass('forceShow');
    };
    this.unlockHeader = function (){
        $('body').removeClass('noScroll').css({ top: 0 });
        $('.fixedNav').removeClass('forceShow');

    };
    this.lockHeader = function (){
        $('body').addClass('noScroll').css({ top: (yOffset * -1) });
        $('.fixedNav').addClass('forceShow');
    };
    

    this.checkHeader = function (){
       return $('.fixedNav').hasClass('forceShow');
    };

    rootNamespace.getSuggestions = this.getSuggestions;
    rootNamespace.typeAheadSearch = this.typeAheadSearch;
    rootNamespace.toggleHeader = this.toggleHeader;
    rootNamespace.unlockHeader = this.unlockHeader;
    rootNamespace.lockHeader = this.lockHeader;
    rootNamespace.checkHeader = this.checkHeader;
    rootNamespace.scrollEntries = this.scrollEntries;
    rootNamespace.submitSearch = this.submitSearch;
})(LuckyVitamin.Header, jQuery);
