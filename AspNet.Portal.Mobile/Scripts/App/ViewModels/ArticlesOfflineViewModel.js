function ArticlesOfflineViewModel() {
    
    var self = this;
    self.articles = ko.observableArray([]);
    self.currentPage = ko.observable(1);

    var cache = JSON.parse(localStorage.getItem('cache'));
    if (cache.articles) {
        var mapped = $.map(cache.articles, function(a) { return new Article().fromCache(a); });
        self.articles(mapped);
    }

    self.prevPageClicked = function () {
        return true;
    };
    self.nextPageClicked = function () {
        return true;
    };
    self.onArticleClicked = function (article) {
        localStorage.setItem('url', article.url);
    };
}