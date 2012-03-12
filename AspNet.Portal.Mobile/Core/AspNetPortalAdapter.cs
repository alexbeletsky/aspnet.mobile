using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using AspNet.Portal.Mobile.Models;
using Newtonsoft;
using Newtonsoft.Json;

namespace AspNet.Portal.Mobile.Core
{
    public class AspNetPortalAdapter
    {
        private static string BaseUrl = "http://www.asp.net/raw/spotlight";

        public Page GetPage(int pageNumber, int pageSize)
        {
            using (var httpClient = new WebClient())
            {
                var response = httpClient.DownloadString(BaseUrl.With(pageNumber, pageSize));
                return JsonConvert.DeserializeObject<Page>(response);
            }
        }
    }

    static class BaseUrlExtensions
    {
        public static string With(this string baseUrl, int pageNumber, int pageSize)
        {
            return string.Format("{0}?pageNum={1}&pageSize={2}", baseUrl, pageNumber, pageSize);
        }
    }
}