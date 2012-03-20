using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AspNet.Portal.Mobile.Controllers
{
    public class ResourcesController : Controller
    {
        public ActionResult Manifest()
        {
            var pages = new List<string>();
            pages.Add("/");
            pages.Add("/cache");

            var scriptsPaths = GetRelativePathsToRoot("~/Scripts/");
            var contentPaths = GetRelativePathsToRoot("~/Content/");

            var cacheResources = new List<string>();
            cacheResources.AddRange(pages);
            cacheResources.AddRange(contentPaths);
            cacheResources.AddRange(scriptsPaths);

            var manifestResult = new ManifestResult("1.0")
            {
                NetworkResources = new [] { "*", "/api/articles", "/readability" },
                CacheResources = cacheResources,
                FallbackResources = new Dictionary<string, string> 
                    { 
                        { "/", Url.Action("Fallback", "Portal") },
                        { "/Modes/Online.js", "/Modes/Offline.js" }
                    },
                ExprirationToken = DateTime.Now.ToString("dd/MM/yyyy HH:mm")
            };

            return manifestResult;
        }

        private IEnumerable<string> GetRelativePathsToRoot(string virtualPath)
        {
            var physicalPath = Server.MapPath(virtualPath);
            var absolutePaths = Directory.GetFiles(physicalPath, "*.*", SearchOption.AllDirectories);

            return absolutePaths.Select(
                x => Url.Content(virtualPath + x.Replace(physicalPath, ""))
            );
        }
    }

    public class ManifestResult : FileResult
    {
        public ManifestResult(string version) : base("text/cache-manifest")
        {
            CacheResources = new List<string>();
            NetworkResources = new List<string>();
            FallbackResources = new Dictionary<string, string>();
            Version = version;
        }

        public string Version { get; set; }
        public IEnumerable<string> CacheResources { get; set; }
        public IEnumerable<string> NetworkResources { get; set; }
        public Dictionary<string, string> FallbackResources { get; set; }
        public string ExprirationToken { get; set; }

        protected override void WriteFile(HttpResponseBase response)
        {
            WriteManifestHeader(response);
            WriteCacheResources(response);
            WriteNetwork(response);
            WriteFallback(response);
            WriteExpires(response);
        }

        private void WriteManifestHeader(HttpResponseBase response)
        {
            response.Output.WriteLine("CACHE MANIFEST");
            response.Output.WriteLine("#V" + Version);
        }

        private void WriteCacheResources(HttpResponseBase response)
        {
            response.Output.WriteLine("CACHE:");
            foreach (var cacheResource in CacheResources)
                response.Output.WriteLine(cacheResource);
        }

        private void WriteNetwork(HttpResponseBase response)
        {
            response.Output.WriteLine();
            response.Output.WriteLine("NETWORK:");
            foreach (var networkResource in NetworkResources)
                response.Output.WriteLine(networkResource);
        }

        private void WriteFallback(HttpResponseBase response)
        {
            response.Output.WriteLine();
            response.Output.WriteLine("FALLBACK:");
            foreach (var fallbackResource in FallbackResources)
                response.Output.WriteLine(fallbackResource.Key + " " + fallbackResource.Value);
        }

        private void WriteExpires(HttpResponseBase response)
        {
            response.Output.WriteLine();
            response.Output.WriteLine("# Expire the cache after server restart");
            response.Output.WriteLine("# " + ExprirationToken);
        }
    }
}
