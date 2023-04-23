using AristBase.EntityFrameworkCore.Seed.Host.Base;

namespace AristBase.EntityFrameworkCore.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly AristBaseDbContext _context;

        public InitialHostDbBuilder(AristBaseDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
            new DefaultCerfiticateTypeCreator(_context).Create();
            new DefaultTenantCreator(_context).Create();
            new DefaultRolesCreator(_context).Create();
            _context.SaveChanges();
        }
    }
}
