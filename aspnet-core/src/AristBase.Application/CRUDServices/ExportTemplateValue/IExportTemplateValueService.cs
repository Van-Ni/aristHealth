using Abp.Application.Services;
using AristBase.CRUDServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ExportTemplateValue
{
    public interface IExportTemplateValueService : IAsyncCrudAppService<HistoryExportDto, Guid>
    {
    }
}
