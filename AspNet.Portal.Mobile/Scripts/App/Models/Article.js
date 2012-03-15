function Article(article) {
    this.title = article.Title;
    this.link = article.Link;
    this.linkForMobile = '/readability?url=' + this.link;
    this.date = article.Date;
    this.description = article.Description;
    this.imageUrl = article.ImageUrl;

    this.isRead = ko.observable(localStorage.getItem(this.link) || false);

    this.setRead = function() {
        this.isRead(true);
        localStorage.setItem(this.link, true);
    };
};