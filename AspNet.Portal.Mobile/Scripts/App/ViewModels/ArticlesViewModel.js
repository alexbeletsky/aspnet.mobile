$(function () {

    function ArticlesViewModel() {

        var self = this;
        self.articles = ko.observableArray([]);

        $.get('/api/articles', function (r) {
            var mapped = $.map(r, function (a) { return new Article(a); });
            self.articles(mapped);
        });

    };

    ko.applyBindings(new ArticlesViewModel());

});