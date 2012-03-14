using System.Linq;
using System.Web.Http;
using AspNet.Portal.Mobile.Core;
using AspNet.Portal.Mobile.Models;

namespace AspNet.Portal.Mobile.Api
{
    public class ArticlesController : ApiController
    {
        private static readonly int DefaultPageSize = 5;

        public IQueryable<Article> Get()
        {
            var adapter = new AspNetPortalAdapter();

            return adapter.GetPage(1, DefaultPageSize).Data.AsQueryable();
        }

        public IQueryable<Article> Get(int id)
        {
            var adapter = new AspNetPortalAdapter();

            return adapter.GetPage(id, DefaultPageSize).Data.AsQueryable();
        }
    }
}
