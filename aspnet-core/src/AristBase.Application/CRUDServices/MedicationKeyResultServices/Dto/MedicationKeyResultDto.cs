using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices.Dto
{
    [AutoMapFrom(typeof(MedicationKeyResult))]
    [AutoMapTo(typeof(MedicationKeyResult))]
    public class MedicationKeyResultDto : EntityDto<Guid>
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Group { get; set; }
        public Guid CertificateId { get; set; }
        public long UserId { get; set; }
    }
}
