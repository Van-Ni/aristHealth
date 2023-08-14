using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.Users.Dto;
using System;

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
        public long? CreatorUserId { get; set; }
        public virtual UserDto CreatorUser { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
