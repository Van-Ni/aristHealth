using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.BaseEntity;
using AristBase.CRUDServices.Dto;
using AristBase.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ResportTemplate
{
    public class ResportTemplateController : FileProceCtrl
    {
        private readonly IRepository<ReportTemplate, Guid> repository;
        public ResportTemplateController(IStorageService _storageService, IWebHostEnvironment webHostEnvironment, IRepository<ReportTemplate, Guid> repository) : base(_storageService, webHostEnvironment, repository)
        {
            this.repository = repository;
        }
        protected override IFileProcessService GetProcessService(string contentType)
        {
            return ProcessServiceFactory.GetProcessService(contentType);
        }
        public async Task<ReportTemplateDto> UpdateAsync(ReportTemplateDto input)
        {
            var reportTemplateForUpdate = await repository.GetAsync(input.Id);
            if (reportTemplateForUpdate != null)
            {
                // Check input co du field hay khong
                foreach (var kd in reportTemplateForUpdate.TemplateDescription.Fields)
                {
                    var inputKd = input.TemplateDescription.Fields[kd.Key];
                    if (inputKd != null && !string.IsNullOrEmpty(inputKd.Description))
                    {
                    }
                    else
                    {
                        throw new UserFriendlyException(400, "Bad request");
                    }
                }
                foreach (var tkd in reportTemplateForUpdate.TemplateDescription.TableFields)
                {
                    var inputtKd = input.TemplateDescription.TableFields[tkd.Key];
                    if (inputtKd != null && !string.IsNullOrEmpty(inputtKd.Description))
                    {
                    }
                    else
                    {
                        throw new UserFriendlyException(400, "Bad request1");
                    }
                }
                reportTemplateForUpdate.TemplateDescription.Fields = input.TemplateDescription.Fields;
                reportTemplateForUpdate.TemplateDescription.TableFields = input.TemplateDescription.TableFields;
                await repository.UpdateAsync(reportTemplateForUpdate);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<ReportTemplateDto>(reportTemplateForUpdate);
            }
            else { throw new UserFriendlyException(400, "Bad request"); }
        }
    }
}
