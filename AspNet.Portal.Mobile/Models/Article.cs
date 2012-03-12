using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspNet.Portal.Mobile.Models
{
    public class Article
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
