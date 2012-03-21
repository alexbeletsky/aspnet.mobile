function Article() {

    var self = this;

    self.fromData = function (d) {
        this.title = d.Title;
        this.url = decodeURIComponent(d.Link.replace( /\+/g , " "));
        this.urlForMobile = '/readability?url=' + this.url;
        this.date = d.Date;
        this.description = d.Description;
        this.imageUrl = d.ImageUrl;
        this.cached = false;

        return this;
    };

    self.fromCache = function (d) {
        this.title = d.title;
        this.url = d.url;
        this.urlForMobile = '/cache';
        this.date = d.date;
        this.description = d.description;
        this.imageUrl = 'none';
        this.cached = true;

        return this;
    };
    
    self.setRead = function () {
        if (this.cached)
            return;

        var cache = JSON.parse(localStorage.getItem('cache'));

        if (_.isUndefined(cache.articles[self.url])) {
            cache.articles[self.url] = self;
            localStorage.setItem('cache', JSON.stringify(cache));
        }        
    };
};