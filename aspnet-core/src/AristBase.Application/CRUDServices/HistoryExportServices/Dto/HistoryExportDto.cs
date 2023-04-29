using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.HistoryExportServices.Dto
{
    [AutoMapFrom(typeof(HistoryExport))]
    [AutoMapTo(typeof(HistoryExport))]
    public class HistoryExportDto : EntityDto<Guid>
    {
        public string filePath { get; set; }
        public string Type { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Status Status { get; set; }
        public long? UserId { get; set; }
        public virtual User? User { get; set; }
        public DateTime CreationTime { get; set; }  
    }
}
