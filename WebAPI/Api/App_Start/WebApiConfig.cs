﻿using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "ActionApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Raspunsurile vor fi trimise in format json, nu xml
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("multipart/form-data"));

            // Activeaza cross origin
            var cors = new EnableCorsAttribute("*", "*", "*");
            // var cors = new EnableCorsAttribute("https://www.gabrielhabet.com", "*", "*"); 
            config.EnableCors(cors);
        }
    }
}
