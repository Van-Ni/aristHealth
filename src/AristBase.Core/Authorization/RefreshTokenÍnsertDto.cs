using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace AristBase.Authorization
{
    [AutoMapFrom(typeof(RefreshToken))]
    [AutoMapTo(typeof(RefreshToken))]
    public class RefreshTokenÍnsertDto : AuditedEntityDto<Guid>
    {
        public string Token { get; set; }
        public string JwtTokenTrim { get; set; }
        public DateTime ExpireTime { get; set; }
    }
}
