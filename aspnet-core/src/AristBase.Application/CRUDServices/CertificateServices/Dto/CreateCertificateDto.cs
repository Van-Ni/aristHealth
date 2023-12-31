﻿using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.CRUDServices.ClientInfoServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateServices.Dto
{
    [AutoMapFrom(typeof(Certificate))]
    [AutoMapTo(typeof(Certificate))]
    public class CreateCertificateDto
    {
        public int CertificateTypeId { get; set; }
        public Status Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public ClientInfoDto ClientInfo { get; set; }
        public decimal AmountPaid { get; set; }
        public string Reason { get; set; }

    }
}
