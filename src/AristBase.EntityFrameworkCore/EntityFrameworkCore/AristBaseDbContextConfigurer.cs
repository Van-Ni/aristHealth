using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace AristBase.EntityFrameworkCore
{
    public static class AristBaseDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AristBaseDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AristBaseDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
