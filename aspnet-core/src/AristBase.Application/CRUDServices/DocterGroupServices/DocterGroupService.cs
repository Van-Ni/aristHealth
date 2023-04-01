using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.DocterGroupServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DocterGroupServices
{
    public class DocterGroupService : AsyncCrudAppService<DocterGroup, DocterGroupDto, Guid>
    {
        public DocterGroupService(IRepository<DocterGroup, Guid> repository) : base(repository)
        {
        }
    }
}
