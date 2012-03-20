function Article(article) {
    this.title = article.Title;
    this.link = decodeURIComponent(article.Link.replace(/\+/g, " "));
    this.linkForMobile = '/readability?url=' + this.link;
    this.date = article.Date;
    this.description = article.Description;
    this.imageUrl = article.ImageUrl;

    var cache = JSON.parse(localStorage.getItem('readArticles'));
    this.isRead = ko.observable(cache != null && cache[this.link] != null);
    
    if (this.isRead()) {
        this.linkForMobile = '/cache?url=' + this.link;
    }

    this.setRead = function() {
        this.isRead(true);
    };
};