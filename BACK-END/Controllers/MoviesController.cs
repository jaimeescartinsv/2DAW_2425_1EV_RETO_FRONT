using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/movies")]
public class MoviesController : ControllerBase
{
    private static List<Movie> Movies = new List<Movie>
    {
        new Movie { Id = 1, Title = "Inception", Description = "A mind-bending thriller" },
        new Movie { Id = 2, Title = "Interstellar", Description = "A journey beyond the stars" }
    };

    [HttpGet]
    public ActionResult<List<Movie>> GetMovies()
    {
        return Ok(Movies);
    }
}