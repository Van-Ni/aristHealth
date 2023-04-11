using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ClientInfoServices.Dto
{
    [AutoMapFrom(typeof(ClientInfo))]
    [AutoMapTo(typeof(ClientInfo))]
    public class ClientInfoDto : EntityDto<int>
    {
        public string FullName { get; set; }
        //Male = true
        public string Sex { get; set; }
        public string CCCD { get; set; }
        public string DateOfBirth { get; set; }
        public string CreateTimeCCCD { get; set; }
        public string AddressCCCD { get; set; }
        public string Address { get; set; }
        public string? GuardianName { get; set; }
    }
}
