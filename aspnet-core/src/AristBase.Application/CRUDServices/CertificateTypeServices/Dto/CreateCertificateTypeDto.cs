﻿using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices.Dto
{
    [AutoMapFrom(typeof(CertificateType))]
    [AutoMapTo(typeof(CertificateType))]
    public class CreateCertificateTypeDto
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
        public List<TemplateGroup> TemplateGroups { get; set; }
        public bool IsNeedSync { get; set; }
        public string FilePath { get; set; }
        public string FinalResult { get; set; }
    }
}
