using Abp.Application.Services;
using AristBase.BaseEntity;
using AristBase.CRUDServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ResportTemplate
{
    public interface IResportTemplateService : IAsyncCrudAppService<ReportTemplateDto, Guid>
    {
        Task<ReportTemplateDto> UpdateAsync(ReportTemplateDto input);
    }
}
