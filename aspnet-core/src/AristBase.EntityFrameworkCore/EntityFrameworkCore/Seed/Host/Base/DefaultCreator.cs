using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public abstract class DefaultCreator<T> : DefaultCreator<T, Guid, AristBaseDbContext>
        where T : Entity<Guid>
    {
        protected DefaultCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
    public abstract class DefaultCreator<T, PrimaryKey, Context>
        where T : Entity<PrimaryKey>
        where Context : DbContext
    {

        private readonly Context _context;

        protected abstract List<T> GetInitial();

        public DefaultCreator(Context context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateAreas();
        }

        private void CreateAreas()
        {
            var list = GetInitial();
            foreach (var i in list)
            {
                AddAreaIfNotExists(i);
            }
        }

        private void AddAreaIfNotExists(T Base)
        {
            var dbSet = _context.Set<T>();
            if (dbSet.IgnoreQueryFilters().Any(l => l.Id.Equals(Base.Id)))
            {
                return;
            }
            dbSet.Add(Base);
            _context.SaveChanges();
        }
    }
}
