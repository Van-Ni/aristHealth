using Abp;
using Abp.Application.Services;
using Abp.Dependency;
using AristBase.BaseEntity;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.Collections.Generic;

namespace AristBase.Services
{
    public interface IFileProcessService
    {
        public TemplateDescription ExtractDescription(string templatePath);
        public void LoopThroughDataFields(string templatePath, string templatePathNew, TemplateValue templateValue);
    }
}
