using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.DepartmentServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DepartmentServices
{
    public class DepartmentService : AsyncCrudAppService<Department, DepartmentDto, Guid>
    {
        public DepartmentService(IRepository<Department, Guid> repository) : base(repository)
        {
        }
    }
}
