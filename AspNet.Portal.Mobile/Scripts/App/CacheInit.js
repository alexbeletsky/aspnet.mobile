$(function() {

    var cache = JSON.parse(localStorage.getItem('cache'));
    
    if (_.isNull(cache)) {
        cache = { articles: [], content: {} };
        localStorage.setItem('cache', JSON.stringify(cache));
    }

});