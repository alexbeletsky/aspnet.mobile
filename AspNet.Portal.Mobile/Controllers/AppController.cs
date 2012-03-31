using System.Web.Mvc;

namespace AspNet.Portal.Mobile.Controllers
{
    public class AppController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Fallback()
        {
            return View();
        }
    }
}
