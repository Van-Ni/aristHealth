using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.Dto;
using AristBase.Extensions;
using AristBase.Service;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public abstract class FileProceCtrl : ApplicationService
    {
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IRepository<ReportTemplate, Guid> repository;
        public FileProceCtrl(IStorageService _storageService, IWebHostEnvironment webHostEnvironment, IRepository<ReportTemplate, Guid> repository)
        {
            this._storageService = _storageService;
            this.webHostEnvironment = webHostEnvironment;
            this.repository = repository;
        }
        public async ValueTask<ReportTemplateDto> CreateTemplateData(IFormFile file)
        {
            //CheckFilePermission();
            var prcsv = GetProcessService(file.ContentType);
            var entity = new ReportTemplate
            {
                Id = Guid.NewGuid(),
                FilePath = file.FileName,
            };
            await _storageService.UploadFileAsync(file.FileName, entity.Id.ToString(), stream: file.OpenReadStream());
            var templatePath = PathHelper.GetTemplatePath(webHostEnvironment.WebRootPath, entity.Id.ToString(), entity.FilePath);
            entity.TemplateDescription = prcsv.ExtractDescription(templatePath);
            await repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<ReportTemplateDto>(entity);
            //return prcsv.ExtractDescription(file.FileName);
        }
        protected abstract IFileProcessService GetProcessService(string contentType);
    }
}
