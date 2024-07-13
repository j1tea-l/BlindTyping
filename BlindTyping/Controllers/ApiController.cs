using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;
namespace BlindTyping.Controllers
{
    public class ApiController : Controller
    {
        //не используйте
        public IActionResult Index()
        {
            RunAPI();
            return View();
        }
        public void RunAPI()
        {
            HttpWebRequest client = (HttpWebRequest)WebRequest.Create("https://random-word-api.herokuapp.com/word?number=30");
            HttpWebResponse res = (HttpWebResponse)client.GetResponse();
            StreamReader sr = new StreamReader(res.GetResponseStream());
            string response = sr.ReadToEnd();
        }
    }
}
