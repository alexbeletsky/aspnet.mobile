function Article(article) {
    this.title = article.Title;
    this.link = decodeURIComponent(article.Link.replace(/\+/g, " "));
    this.linkForMobile = '/readability?url=' + this.link;
    this.date = article.Date;
    this.description = article.Description;
    this.imageUrl = article.ImageUrl;

    this.setRead = function() {
        var cache = JSON.parse(localStorage.getItem('cache'));
        if (_.isNull(cache)) {
            cache = { articles: [] };
        }

        cache.articles.push(this);
        localStorage.setItem('cache', JSON.stringify(cache));
    };
};