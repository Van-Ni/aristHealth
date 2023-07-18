using AristBaseLib;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignDocument.MyForm;
using System.Text.Json;

namespace SignDocument
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var host = CreateHostBuilder().Build();
            ServiceProvider = host.Services;

            Application.Run(ServiceProvider.GetRequiredService<Login>());
        }
        public static IServiceProvider ServiceProvider { get; private set; }
        static IHostBuilder CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) => {

                    var config = JsonSerializer.Deserialize<Config>(File.ReadAllText("./config.json"));
                    if( string.IsNullOrEmpty(Properties.Settings.Default.bhxhUsername))
                    {
                        Properties.Settings.Default.bhxhUsername = config.bhxhUsername;
                    }
                    services.AddSingleton(new ArishHealthClientService(config.host, config.tenantid));
                    services.AddTransient<Login>();
                    services.AddTransient<SyncForm>();
                });
        }
    }
}