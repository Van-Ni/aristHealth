using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;

namespace AristBase.EntityFrameworkCore.Repositories
{
    /// <summary>
    /// Base class for custom repositories of the application.
    /// </summary>
    /// <typeparam _name="TEntity">Entity type</typeparam>
    /// <typeparam _name="TPrimaryKey">Primary key type of the entity</typeparam>
    public abstract class AristBaseRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<AristBaseDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected AristBaseRepositoryBase(IDbContextProvider<AristBaseDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        // Add your common methods for all repositories
    }

    /// <summary>
    /// Base class for custom repositories of the application.
    /// This is a shortcut of <see cref="AristBaseRepositoryBase{TEntity,TPrimaryKey}"/> for <see cref="int"/> primary key.
    /// </summary>
    /// <typeparam _name="TEntity">Entity type</typeparam>
    public abstract class AristBaseRepositoryBase<TEntity> : AristBaseRepositoryBase<TEntity, int>, IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        protected AristBaseRepositoryBase(IDbContextProvider<AristBaseDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        // Do not add any method here, add to the class above (since this inherits it)!!!
    }
}
