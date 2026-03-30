using System.Net;
using System.Text.Json;
using GestionInventario.Domain.Exceptions;

namespace GestionInventarioLibros.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ha ocurrido un error no controlado.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = new ErrorResponse();

        switch (exception)
        {
            case NotFoundException notFoundEx:
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                response.Message = notFoundEx.Message;
                break;

            case ValidationException validationEx:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = validationEx.Message;
                response.Errors = validationEx.Errors;
                break;

            default:
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                // En desarrollo, mostrar el detalle completo del error para facilitar el debug
                if (_env.IsDevelopment())
                {
                    response.Message = exception.Message;
                    response.Detail = exception.InnerException?.Message ?? exception.StackTrace;
                }
                else
                {
                    response.Message = "Ha ocurrido un error interno en el servidor.";
                }
                break;
        }

        var result = JsonSerializer.Serialize(response);
        return context.Response.WriteAsync(result);
    }
}

public class ErrorResponse
{
    public string Message { get; set; } = string.Empty;
    public IDictionary<string, string[]>? Errors { get; set; }
    public string? Detail { get; set; }
}
