using System.Linq;
using NReadability;

namespace AspNet.Portal.Mobile.Core
{
    public class ReadabilityAdapter
    {
        public string GetContent(string url)
        {
            var readability = new NReadabilityWebTranscoder();            
            
            bool extracted;
            var read = readability.Transcode(url, out extracted);

            var document = new HtmlAgilityPack.HtmlDocument();
            document.LoadHtml(read);

            return document.DocumentNode.Descendants("div").Single(p => p.Id == "readInner").InnerHtml;
        }
    }
}