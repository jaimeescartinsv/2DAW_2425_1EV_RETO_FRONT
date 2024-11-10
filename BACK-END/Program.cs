var builder = WebApplication.CreateBuilder(args);

// Agregar servicios de autorización y controladores al contenedor de servicios
builder.Services.AddAuthorization();
builder.Services.AddControllers();

// Agregar Swagger para la documentación
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar el pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilitar autorización en el pipeline
app.UseAuthorization();

app.MapControllers();

app.Run();