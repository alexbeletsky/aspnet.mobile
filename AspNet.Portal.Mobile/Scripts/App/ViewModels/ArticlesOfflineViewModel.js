function ArticlesOfflineViewModel() {
    
    var self = this;
    self.articles = ko.observableArray([]);
    self.currentPage = ko.observable(1);

    var cache = JSON.parse(localStorage.getItem('cache'));
    self.articles(cache.articles);

    self.prevPageClicked = function () {
        return true;
    };
    self.nextPageClicked = function () {
        return true;
    };
    self.onArticleClicked = function (article) {
        article.setRead();
    };
}