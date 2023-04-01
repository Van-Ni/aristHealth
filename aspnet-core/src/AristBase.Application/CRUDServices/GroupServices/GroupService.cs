using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.GroupServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.GroupServices
{
    public class GroupService : AsyncCrudAppService<Group, GroupDto, Guid>
    {
        public GroupService(IRepository<Group, Guid> repository) : base(repository)
        {
        }
    }
}
