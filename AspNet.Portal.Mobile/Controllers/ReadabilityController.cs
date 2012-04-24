using System.Web.Mvc;
using System.Web.UI;
using AspNet.Portal.Mobile.Core;

namespace AspNet.Portal.Mobile.Controllers
{
    public class ReadabilityController : Controller
    {
        public ActionResult Index(string url)
        {
            var readablePage = new ReadabilityAdapter().GetContent(url);

            ViewBag.Url = url;
            ViewBag.Content = readablePage;
            ViewBag.TweetUrl = string.Format("https://twitter.com/intent/tweet?url={0}", ViewBag.Url);

            return View();
        }
    }
}
