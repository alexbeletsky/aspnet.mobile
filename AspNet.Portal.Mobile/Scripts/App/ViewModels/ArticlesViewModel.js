/// <reference path="../../_references.js" />

function ArticlesViewModel() {

    var self = this;
    self.articles = ko.observableArray([]);
    self.currentPage = ko.observable(1);

    // public

    self.onArticleClicked = function (article) {
        article.setRead();
    };

    self.refresh = function () {
        setTimeout(loadArticles, 500);
    }

    self.showMore = function () {
        var nextPage = self.currentPage() + 1;
        self.currentPage(nextPage);

        $.mobile.showPageLoadingMsg();
        $.get('/api/articles/' + nextPage, function (r) {
            updateArticles(r);

            $.mobile.hidePageLoadingMsg();
        });
    }

    // private

    var loadArticles = function () {
        $.mobile.showPageLoadingMsg();

        // init
        self.articles.removeAll();
        self.currentPage(1);

        $('.content').hide();
        $.get('/api/articles', function (r) {
            $.mobile.hidePageLoadingMsg();

            updateArticles(r);
            $('.content').fadeIn();
        });
    };

    var updateArticles = function (r) {
        var mapped = $.map(r, function (a) { return new Article().fromData(a); });
        _.each(mapped, function (article) { self.articles.push(article); });
    };
    
    var gotoPage = function (nextPage) {
        $.mobile.showPageLoadingMsg();
        $.get('/api/articles/' + nextPage, function (r) {
            updateArticles(r);

            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $.mobile.hidePageLoadingMsg();
        });
    }

    loadArticles();
};