using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.DepartmentServices.Dto;
using System;

namespace AristBase.CRUDServices.DepartmentServices
{
    public class DepartmentService : AsyncCrudAppService<Department, DepartmentDto, Guid, PagedAndSortedResultRequestDto, CreateDepartmentDto, DepartmentDto>
    {
        public DepartmentService(IRepository<Department, Guid> repository) : base(repository)
        {
        }
    }
}
