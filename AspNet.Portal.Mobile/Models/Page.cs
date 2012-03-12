using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNet.Portal.Mobile.Models
{
    public class Page
    {
        public string Media { get; set; }
        public int First { get; set; }
        public int Last { get; set; }

        public IEnumerable<Article> Data { get; set; }
    }
}