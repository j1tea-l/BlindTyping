using BlindTyping.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
using System.Text;


namespace BlindTyping.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;


            public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        //страница с клавиатурой(откр по умолчанию)
            public IActionResult Keyboard()
        {
            return View();
        }
        //в будущем лидерборд
        public IActionResult Leaderboard()
        {
            return View();
        }
        //api для сайта со словами
		[HttpPost]
        public IActionResult RunAPI([FromBody] bool data)
        {

            if (data==false)
            {
                var client = new WebClient();
                string html = client.DownloadString("https://random-word-api.herokuapp.com/word?number=30");
                StringBuilder strbld = new StringBuilder(html);
                strbld.Replace("\",\"", " ");
                strbld.Remove(0, 3);
                strbld.Remove(strbld.Length - 2, 2);
                string result = strbld.ToString();
                return Json(result);
            }
            else { return BadRequest(); }
        }

        //логи при ошибках      
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
