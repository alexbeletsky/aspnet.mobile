/// <reference path="../../_references.js" />

function ArticlesViewModel() {

    var self = this;
    self.articles = ko.observableArray([]);
    self.currentPage = ko.observable(1);
        
    $.get('/api/articles', function (r) {
        updateArticles(r);
    });

    self.prevPageClicked = function () {
        var prevPage = self.currentPage() - 1;
        if (prevPage == 0)
            return false;

        $.get('/api/articles/' + prevPage, function (r) {
            self.currentPage(prevPage);
            updateArticles(r);
        });
            
        return true;
    };
    self.nextPageClicked = function () {
        var nextPage = self.currentPage() + 1;
        $.get('/api/articles/' + nextPage, function (r) {
            self.currentPage(nextPage);
            updateArticles(r);
        });

        return true;
    };
    self.onArticleClicked = function (article) {
        article.setRead();
    };
    var updateArticles = function (r) {
        var mapped = $.map(r, function (a) { return new Article().fromData(a); });
        self.articles(mapped);
    };
};