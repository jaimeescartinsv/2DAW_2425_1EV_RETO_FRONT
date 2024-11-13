using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/movies")]
public class MoviesController : ControllerBase
{
    private static List<Movie> Movies = new List<Movie>
    {
        new Movie { Id = 1, Title = "Inception", Description = "Dom Cobb, un ladrón experto en la extracción de secretos del subconsciente, se enfrenta al desafío de realizar la tarea inversa: implantar una idea en la mente de otra persona." },
        new Movie { Id = 2, Title = "Interstellar", Description = "En un futuro sombrío donde los recursos de la Tierra se están agotando, un grupo de astronautas se embarca en una misión para explorar planetas potencialmente habitables en otra galaxia." },
        new Movie { Id = 3, Title = "The Dark Knight", Description = "Bruce Wayne, bajo la identidad de Batman, debe enfrentarse a su enemigo más peligroso, el Joker, quien busca sumir a Gotham en el caos absoluto." },
        new Movie { Id = 4, Title = "The Matrix", Description = "Neo, un hacker, descubre la verdad sobre la Matrix, una simulación creada por máquinas para controlar a la humanidad, y se une a la lucha para liberar a la humanidad." },
        new Movie { Id = 5, Title = "Fight Club", Description = "Un hombre insomne se encuentra con un vendedor de jabón carismático y juntos crean un club de pelea clandestino que se convierte en algo mucho más peligroso." },
        new Movie { Id = 6, Title = "Pulp Fiction", Description = "La vida de varios personajes de Los Ángeles se entrelaza en una serie de historias violentas y absurdas que exponen la crudeza y lo impredecible del destino." },
        new Movie { Id = 7, Title = "The Shawshank Redemption", Description = "Andy Dufresne, un banquero condenado por asesinato, forma un vínculo inesperado con otro preso y busca la redención y la esperanza dentro de los muros de Shawshank." },
        new Movie { Id = 8, Title = "Forrest Gump", Description = "La historia de Forrest Gump, un hombre con un corazón puro, que vive experiencias extraordinarias y cambia el curso de la historia estadounidense sin proponérselo." },
        new Movie { Id = 9, Title = "The Godfather", Description = "La crónica de la familia Corleone, una de las más poderosas del crimen organizado en Nueva York, y de cómo el poder cambia a sus miembros a lo largo de las décadas." },
        new Movie { Id = 10, Title = "The Lord of the Rings: The Fellowship of the Ring", Description = "Frodo, un hobbit de la Comarca, emprende una peligrosa misión para destruir el Anillo Único y evitar que caiga en manos de Sauron, el señor oscuro." },
        new Movie { Id = 11, Title = "Gladiator", Description = "Máximo Décimo Meridio, un general romano traicionado y convertido en esclavo, busca vengar la muerte de su familia en la arena del Coliseo." },
        new Movie { Id = 12, Title = "Saving Private Ryan", Description = "Durante la Segunda Guerra Mundial, un grupo de soldados liderados por el Capitán Miller se embarca en una peligrosa misión para encontrar y rescatar al soldado James Ryan." },
        new Movie { Id = 13, Title = "The Lion King", Description = "Simba, un joven león, debe reclamar su lugar como rey tras la trágica muerte de su padre, enfrentando su destino y superando sus miedos." },
        new Movie { Id = 14, Title = "Avatar", Description = "Jake Sully, un exmarine parapléjico, se infiltra en un mundo alienígena y lucha por proteger a sus habitantes del intento humano de extraer sus recursos." },
        new Movie { Id = 15, Title = "Jurassic Park", Description = "Un parque temático donde dinosaurios clonados cobran vida se convierte en una trampa mortal cuando las medidas de seguridad fallan y los depredadores escapan." },
        new Movie { Id = 16, Title = "The Silence of the Lambs", Description = "La agente del FBI Clarice Starling busca la ayuda de Hannibal Lecter, un astuto asesino, para capturar a un peligroso asesino en serie." },
        new Movie { Id = 17, Title = "Schindler's List", Description = "La historia real de Oskar Schindler, un empresario alemán que salvó la vida de miles de judíos durante el Holocausto empleándolos en su fábrica." },
        new Movie { Id = 18, Title = "Back to the Future", Description = "Marty McFly, un adolescente de los años 80, viaja accidentalmente al pasado y debe asegurarse de que sus padres se conozcan para evitar cambiar su propia existencia." },
        new Movie { Id = 19, Title = "Star Wars: A New Hope", Description = "Luke Skywalker, un joven granjero, se une a un grupo de rebeldes en su lucha contra el Imperio Galáctico y su superarma, la Estrella de la Muerte." },
        new Movie { Id = 20, Title = "The Green Mile", Description = "Un guardia de prisión descubre que un preso en el corredor de la muerte tiene un don especial, lo que le hace cuestionar la justicia de su ejecución." }
    };

    [HttpGet]
    public ActionResult<List<Movie>> GetMovies()
    {
        return Ok(Movies);
    }
}