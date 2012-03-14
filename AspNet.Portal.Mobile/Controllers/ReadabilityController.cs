using System.Web.Mvc;
using AspNet.Portal.Mobile.Core;

namespace AspNet.Portal.Mobile.Controllers
{
    public class ReadabilityController : Controller
    {
        public ActionResult Index(string url)
        {
            var readability = new ReadabilityAdapter();

            return Content(readability.GetContent(url));
        }
    }
}
