var defaultFilters = {
    keywordSearch: [],
    department: [],
    category: [],
    brandSearch: [],
    brand: [],
    price: {
        min: 0,
        max: 75
    },
    rating: null,
    specialty: [],
    form: [],
    size: [],
    flavor: [],
    healthConcern: [],
    mainIngredient: [],
    goal: []
};
var activeFilters = $.extend({}, defaultFilters);
// pre expand/collapse filter menus
if (isMobileNav()) {
    $('.filterContainer').removeClass('open')
}
createPriceSlider();

$('.toggleRows').on('click', function(e) {
        e.preventDefault();
        self = $(this);
        self.parent().prev().slideToggle();
        var altText = self.data("alt-text");
        if (altText) {
            self.data("alt-text", self.html());
            self.html(altText);
        }
});

$('.toggleCollapse').on('click', function() {
        var self = $(this);
        var delayLength = self.parent()
            .hasClass('open') ? 0 : 250;
        //self.siblings(".collapsibleContent").find("span.search-icon").hide().delay(delayLength).fadeIn(delayLength * 3);
        self.siblings(".collapsibleContent")
            .slideToggle(300, function() {
                self.parent()
                    .toggleClass('open');
            });
});

$('.filterContainer input[type="text"]').keyup(function(e) {
        if (e.which === 13) {
            var filterGroup = $(this).closest('.filterContainer').data('filter');
            if ($(this).val().length > 0 && activeFilters[filterGroup + 'Search'].indexOf($(this).val()) === -1) {
                activeFilters[filterGroup + 'Search'].push($(this).val());
                var identifier = createIdentifier();
                $(this).attr('identifier', identifier);
                addFilterTag($(this).val(), identifier, true);
            }
            if (!isMobileNav()) updateProducts();
        }
    });

$('.filterContainer li').on('click', function() {
        $(this).find('label').toggleClass('active');
        var filterVal = $(this).data('value');
        var filterCopy = $(this).find('label').text();
        var filterGroup = $(this).closest('.filterContainer').data('filter');
        // transforms to camelCase
        filterGroup = filterGroup.replace(/-([a-z])/g, function(g) {
            return g[1].toUpperCase();
        });
        if ($(this).find('label').hasClass('active')) {
            if (activeFilters[filterGroup].indexOf(filterVal) === -1) {
                activeFilters[filterGroup].push(filterVal);
                var identifier = createIdentifier();
                $(this).attr('identifier', identifier);
                addFilterTag(filterCopy, identifier, false);
            }
        } else {
            var filterId = $(this).attr('identifier');
            if (filterId) removeFilterTag(filterId);
            activeFilters[filterGroup].splice(activeFilters[filterGroup].indexOf(filterVal), 1);
        }
        if (!isMobileNav()) updateProducts();
    });
$('div.stars input').on('change', function() {
        if (this.checked) {
            activeFilters.rating = $(this).val();
            if (!isMobileNav()) updateProducts();
        }
});

$('a#openFilter').on('click', function(e) {
        e.preventDefault();
        var filterMenu = $('.filterWrapper');
        if (!filterMenu.hasClass('open')) {
            $('#shadow').addClass('fadeIn').one('click', function() {
                    slideOutFilters();
                });
            filterMenu.addClass('open');
            $(body).css({
                    overflow: 'hidden'
                });
            slideInFilters();
        }
    });
$('.buttonsContainer .clearAll').on('click', function() {
        clearAllFilters();
    });

$('.buttonsContainer .done').on('click', function() {
        updateProducts();
        slideOutFilters();
    });

$('.filterTagsContainer .clearAll').on('click', function() {
        clearAllTags();
        $(this).hide();
    });

$('.canClear').on('click', function() {
        $(this).siblings('.clearSearch').show();
    }).focusout(function() {
        if ($('.clearSearch:hover').length) {
            $('.canClear').val("");
        }
        $(this).siblings('.clearSearch').hide();
    });

function createIdentifier() {
    return ("" + new Date().getMilliseconds() + (Math.floor(Math.random() * 250)));
}

function isMobileNav() {
    return $(document).width() <= 991;
}

function createPriceSlider() {
    $("#price-slider").slider({
            range: true,
            min: 0,
            max: 5,
            values: [0, 5],
            slide: function(event, ui) {
                var dollarValues = [0, 15, 30, 45, 60, 75];
                var priceCopy = $('span.slider-price');
                priceCopy.removeClass('active');
                $(priceCopy[ui.values[0]])
                    .addClass('active');
                $(priceCopy[ui.values[1]])
                    .addClass('active');
                activeFilters.price.min = dollarValues[ui.values[0]];
                activeFilters.price.max = dollarValues[ui.values[1]];
                if (!isMobileNav()) updateProducts();
            }
        }).each(function() {
            // Dynamically adds slider labels
            var dollarValues = [0, 15, 30, 45, 60, 75];
            var opt = $(this)
                .data()
                .uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var el = $('<span class="slider-price">$' + (dollarValues[i]) + '</span>')
                    .css('left', (i / vals * 100) + '%');
                // Add the element inside #slider
                $("#price-slider")
                    .append(el);
            }
        });
}

function addFilterTag(copy, identifier, isTextInput) {
    // strips item count from filter text
    copy = copy.replace(/\s{1}\([0-9]+\)/g, '');
    $('.filterTagsContainer').show()
    var tagsContainer = $('.filterTagsContainer ul'),
        clearText = $('.filterTagsContainer .clearAll'),
        newTag = '<li class="filterTag btn-filter-tag" identifier="' + identifier + '">' + '<svg width="11" height="11" viewBox="0 0 14 14">' + '<use xlink:href="#closeIconGray"></use>' + '</svg>' + copy + '</li>';
    $(newTag).insertBefore(clearText);
    clearText.css('display', 'inline-block');
    $('.filterTagsContainer .filterTag').off().on('click', function() {
            var filterId = $(this)
                .attr('identifier');
            removeFilterTag(filterId);
            removeFilterFromNav(filterId, isTextInput);
            removeFromTextFilters($(this).text());
            if ($('li.filterTag').length === 0) clearText.hide();
        });
}

function removeFromTextFilters(copy) {
    console.log(activeFilters, copy);
    var keywordIndex = activeFilters.keywordSearch.indexOf(copy),
        brandIndex = activeFilters.brandSearch.indexOf(copy);
    if (keywordIndex !== -1) activeFilters.keywordSearch.splice(keywordIndex, 1);
    if (brandIndex !== -1) activeFilters.brandSearch.splice(brandIndex, 1);
    console.log(activeFilters);
}

function removeFilterFromNav(filterId, isTextInput) {
    if (isTextInput) {
        $('.filterContainer input[identifier="' + filterId + '"]').val("").trigger("change");
    } else {
        $('.filterContainer li[identifier="' + filterId + '"]').trigger('click');
    }
}

function removeFilterTag(filterId) {
    $('li.filterTag[identifier="' + filterId + '"]').remove();
}

function clearAllTags() {
    $('.filterContainer').find('.active').trigger('click');
    $('.filterContainer input[type="text"]').val('').trigger('change');
    var filterTags = $('li.filterTag');
    if (filterTags.length > 0) {
        $.each(filterTags, function(index, tag) {
            var filterId = $(tag).attr('identifier');
            if (filterId) {
                removeFilterTag(filterId);
            }
        });
    }
}

function clearAllFilters() {
    var filters = $('.filterContainer');
    filters.find('*').removeClass('active');
    filters.find('input').val('').attr('checked', 'false');
    $("#price-slider").slider('values', 0, 0).slider('values', 1, 5);
    clearAllTags();
    activeFilters = $.extend({}, defaultFilters);
}

function slideInFilters() {
    $('#shadow').css('z-index', 1101).addClass('fadeIn');
    $('.filterWrapper').animate({
            'left': 0
        }, 400);
    $('.buttonsContainer').animate({
            'left': 0
        }, 400);
}

function slideOutFilters() {
    $('#shadow').css('z-index', 0).removeClass('fadeIn');
    $(body).css({
            overflow: 'auto'
        });
    $('.filterWrapper').animate({
            'left': '-304px'
        }, 400)
        .removeClass('open');
    $('.buttonsContainer').animate({
            'left': '-304px'
        }, 400);
}

function updateProducts() {
    //TODO THIS IS WHAT IS TRIGGERED WHENEVER THE FILTER CHANGES THIS WOULD UPDATE PRODUCTS THE FILTERS ARE INCLOSED
    console.log(activeFilters);
}