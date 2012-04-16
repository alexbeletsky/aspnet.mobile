/// <reference path="../../_references.js" />

function ArticlesViewModel() {

    var self = this;
    self.articles = ko.observableArray([]);
    self.currentPage = ko.observable(1);

    self.prevPageClicked = function () {
        var prevPage = self.currentPage() - 1;
        if (prevPage == 0)
            return false;

        self.currentPage(prevPage);

        gotoPage(prevPage);
                    
        return true;
    };

    self.nextPageClicked = function () {
        var nextPage = self.currentPage() + 1;
        self.currentPage(nextPage);

        gotoPage(nextPage);

        return true;
    };

    self.onArticleClicked = function (article) {
        article.setRead();
    };

    var loadArticles = function () {
        $.mobile.showPageLoadingMsg();

        $('.content').hide();
        $.get('/api/articles', function (r) {
            $.mobile.hidePageLoadingMsg();

            updateArticles(r);
            $('.content').fadeIn();
        });
    };

    var updateArticles = function (r) {
        var mapped = $.map(r, function (a) { return new Article().fromData(a); });
        self.articles(mapped);
    };
    
    var gotoPage = function (nextPage) {
        $.mobile.showPageLoadingMsg();
        $.get('/api/articles/' + nextPage, function (r) {
            updateArticles(r);

            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $.mobile.hidePageLoadingMsg();
        });
    }

    $('#refresh').on('click', function () {
        setTimeout(loadArticles, 500);
    });

    loadArticles();

};