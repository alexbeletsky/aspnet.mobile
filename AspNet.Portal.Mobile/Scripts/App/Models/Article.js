function Article(article) {
    this.title = article.Title;
    this.link = article.Link;
    this.linkForMobile = '/readability?url=' + this.link;
    this.date = article.Date;
    this.description = article.Description;
    this.imageUrl = article.ImageUrl;
};