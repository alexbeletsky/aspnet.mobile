using System;
using System.Linq;
using System.Web.Mvc;
using AspNet.Portal.Mobile.Core;

namespace AspNet.Portal.Mobile.Controllers
{
    public class ReadabilityController : Controller
    {
        public ActionResult Index(string url)
        {
            var readablePage = new ReadabilityAdapter().GetContent(url);

            var document = new HtmlAgilityPack.HtmlDocument();
            document.LoadHtml(readablePage);

            ViewBag.Url = url;
            ViewBag.Content = document.DocumentNode.Descendants("div").Single(p => p.Id == "readInner").InnerHtml;

            return View();
        }
    }
}
