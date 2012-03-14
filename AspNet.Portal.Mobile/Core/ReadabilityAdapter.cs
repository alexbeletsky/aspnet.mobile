using NReadability;

namespace AspNet.Portal.Mobile.Core
{
    public class ReadabilityAdapter
    {
        public string GetContent(string url)
        {
            var read = new NReadabilityWebTranscoder();            
            
            bool extracted;
            return read.Transcode(url, out extracted);
        }
    }
}