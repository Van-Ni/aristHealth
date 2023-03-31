using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.BaseEntity;
using AristBase.CRUDServices.Dto;
using AristBase.Extensions;
using AristBase.Services;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Table = DocumentFormat.OpenXml.Wordprocessing.Table;

namespace AristBase.CRUDServices.ResportTemplate
{
    public abstract class ReportTemplateService : AsyncCrudAppService<ReportTemplate, ReportTemplateDto, Guid>, IResportTemplateService
    {
        public const string TableColPrefix = "col_";
        private readonly IStorageService _storageService;
        private readonly IRepository<ReportTemplate, Guid> repository;
        private readonly IWebHostEnvironment webHostEnvironment;
        public ReportTemplateService(IRepository<ReportTemplate, Guid> repository,
            IStorageService storageService,
            IWebHostEnvironment webHostEnvironment) : base(repository)
        {
            this._storageService = storageService;
            this.repository = repository;
            this.webHostEnvironment = webHostEnvironment;
        }

        protected abstract IFileProcessService GetProcessService();
        public async ValueTask<ReportTemplateDto> CreateFile([Required] IFormFile file)
        {
            var entity = new ReportTemplate
            {
                Id = Guid.NewGuid(),
                FilePath = file.FileName,
            };
            await _storageService.UploadFileAsync(file.FileName, entity.Id.ToString(), stream: file.OpenReadStream());
            var templatePath = PathHelper.GetTemplatePath(webHostEnvironment.WebRootPath, entity.Id.ToString(), entity.FilePath);
            //var contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            //entity.TemplateDescription = fileProcessService.LoopThroughDataFields(templatePath);
            await repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();
            return MapToEntityDto(entity);
        }
        public async override Task<ReportTemplateDto> UpdateAsync(ReportTemplateDto input)
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
                reportTemplateForUpdate.TemplateDescription.Fields = input.TemplateDescription.Fields;
                await repository.UpdateAsync(reportTemplateForUpdate);
                await CurrentUnitOfWork.SaveChangesAsync();
                return MapToEntityDto(reportTemplateForUpdate);
            }
            else { throw new UserFriendlyException(400, "Bad request"); }
        }
    }
}
