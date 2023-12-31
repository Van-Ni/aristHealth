﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices.Dto
{
    [AutoMapFrom(typeof(CertificateGroupStatus))]
    [AutoMapTo(typeof(CertificateGroupStatus))]
    public class UpdateCertificateGroupStatusDto : EntityDto<Guid>
    {
        public Guid CertificateId { get; set; }
        public Dictionary<string, Values> Content { get; set; }
        public string Group { get; set; }
        public GroupStatus Status { get; set; }

    }
}
