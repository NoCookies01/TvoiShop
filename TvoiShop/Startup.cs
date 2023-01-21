using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TvoiShop.Infrastructure;
using TvoiShop.Infrastructure.Repositories;
using TvoiShop.Infrastructure.Repositories.Implmentations;
using TvoiShop.Infrastructure.Services;
using TvoiShop.Infrastructure.Services.Implementations;
using TvoiShop.ApplicationCofiguration;
using System.Text.Json.Serialization;
using TvoiShop.Telegram.Bot;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TvoiShop
{
    public class Startup
    {
        private readonly AuthConfiguration _authConfiguration = new();

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            /*services.AddDbContext<TvoiShopDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ProductsDataBase")));*/
            services.AddDbContext<TvoiShopDBContext>(options => 
                options.UseNpgsql(Configuration.GetConnectionString("PostgreSQL"),
                    x => x.MigrationsHistoryTable("__efmigrationshistory", "public"))
                    /*.ReplaceService<IHistoryRepository, LoweredCaseMigrationHistoryRepository>()*/);

            services.AddTransient<IProductsRepository, ProductsRepository>();

            services.AddTransient<IProductsService, ProductsService>();

            services.AddTransient<BotManager>();

            services.AddTransient<OrderService>();

            services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme.
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
                        {
                            new OpenApiSecurityScheme
                                {
                                    Reference = new OpenApiReference
                                        {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                      },    
                      Scheme = "oauth2",
                      Name = "Bearer",
                      In = ParameterLocation.Header,

                    },
                    new List<string>()
                  }
                });
            });

            _authConfiguration.ConfigureAuth(services, Configuration);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build"; 
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            // TODO Remove
            if (env.IsDevelopment() || true)
            {

                app.UseSwagger(options =>
                {
                    /*options.AddSecurityDefinition("oauth2", new ApiKeyScheme
                    {
                        Description = "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
                        In = "header",
                        Name = "Authorization",
                        Type = "apiKey"
                    });

                    options.OperationFilter<SecurityRequirementsOperationFilter>();*/
                });
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            _authConfiguration.ConfigureAuth(app);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
