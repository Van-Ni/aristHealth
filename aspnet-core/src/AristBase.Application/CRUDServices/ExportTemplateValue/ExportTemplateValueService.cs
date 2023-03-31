using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.BaseEntity;
using AristBase.CRUDServices.Dto;
using AristBase.Extensions;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Collections.Generic;
using DocumentFormat.OpenXml.Office.CustomUI;
using AristBase.Services;

namespace AristBase.CRUDServices.ExportTemplateValue
{
    public class ExportTemplateValueService : AsyncCrudAppService<HistoryExport, HistoryExportDto, Guid>
    {
        private readonly IRepository<ReportTemplate, Guid> repositoryReportTemplate;
        private readonly IRepository<HistoryExport, Guid> repository;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ExportTemplateValueService(IRepository<HistoryExport, Guid> repository,
            IRepository<ReportTemplate, Guid> repositoryReportTemplate,
            IWebHostEnvironment webHostEnvironment) : base(repository)
        {
            this.repositoryReportTemplate = repositoryReportTemplate;
            this.repository = repository;
            this.webHostEnvironment = webHostEnvironment;
        }
        public async Task<HistoryExportDto> CreateFileAsync(HistoryExportDto input)
        {
            var getResportTemplate = await repositoryReportTemplate.GetAll().Where(w => w.Id == input.ReportTemplateId).FirstOrDefaultAsync();
            if (getResportTemplate != null)
            {

                TemplateValue templateValue = new TemplateValue
                {
                    Fields = new Dictionary<string, FieldValue>(),
                    TableFields = new Dictionary<string, TableValue>(),
                };
                foreach (var kd in getResportTemplate.TemplateDescription.Fields)
                {
                    templateValue.Fields.Add(kd.Key, new FieldValue { Value = "" });
                }
                foreach (var tkd in getResportTemplate.TemplateDescription.TableFields)
                {
                    TableValue tableValue = new TableValue();
                    Dictionary<string, FieldDescription> newDictionary = new Dictionary<string, FieldDescription>();
                    foreach (var item in tkd.Value.Fields)
                    {
                        newDictionary.Add(item.Key, item.Value);
                    }
                    tableValue.Fields = newDictionary;

                    templateValue.TableFields.Add(tkd.Key, tableValue);

                }
                input.TemplateValue = templateValue;
                var obj = ObjectMapper.Map<HistoryExport>(input);
                obj.Id = Guid.NewGuid();
                obj.CreatorUserId = 1;
                obj.DateExport = DateTime.Now;
                obj.FileExport = getResportTemplate.FilePath;
                await repository.InsertAsync(obj);
                await CurrentUnitOfWork.SaveChangesAsync();
                return MapToEntityDto(obj);
            }
            throw new UserFriendlyException(400, "Bad request");
        }
        public async Task<IActionResult> UpdateFileAsync(HistoryExportDto input)
        {
            var reportHistoryExport = await repository.GetAsync(input.Id);
            if (reportHistoryExport != null)
            {
                // Check input co du field hay khong
                foreach (var kd in reportHistoryExport.TemplateValue.Fields)
                {
                    var inputKd = input.TemplateValue.Fields[kd.Key];
                    if (inputKd != null && !string.IsNullOrEmpty(inputKd.Value))
                    {
                    }
                    else
                    {
                        throw new UserFriendlyException(400, "Bad request");
                    }
                }
                foreach (var tkd in input.TemplateValue.TableFields.Values)
                {
                    if (tkd.Values != null)
                    {
                        //var test = tkd.Values;
                        foreach (var tkd1 in tkd.Values)
                        {
                            //var test2 = tkd1.Values;
                            foreach (var tkd2 in tkd1.Values)
                            {
                                //var test3 = tkd2.Value;
                                if (tkd2 == null && string.IsNullOrEmpty(tkd2.Value))
                                {
                                    throw new UserFriendlyException(400, "Bad request");
                                }
                            }
                        }
                    }
                }
                reportHistoryExport.TemplateValue.Fields = input.TemplateValue.Fields;
                reportHistoryExport.TemplateValue.TableFields = input.TemplateValue.TableFields;
                await repository.UpdateAsync(reportHistoryExport);
                await CurrentUnitOfWork.SaveChangesAsync();
                //return ObjectMapper.Map<HistoryExportDto>(reportHistoryExport);
                var getResportTemplate = await repositoryReportTemplate.GetAsync(reportHistoryExport.ReportTemplateId);
                var templatePath = PathHelper.GetTemplatePath(webHostEnvironment.WebRootPath, getResportTemplate.Id.ToString(), getResportTemplate.FilePath);
                var templatePathNew = PathHelper.getUrlNewFile(webHostEnvironment.WebRootPath, reportHistoryExport.Id, getResportTemplate.FilePath);
                var contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

                var fileProcessService = ProcessServiceFactory.GetProcessService(contentType);
                fileProcessService.LoopThroughDataFields(templatePath, templatePathNew, input.TemplateValue);
                //return MapToEntityDto(obj);
                return new FileStreamResult(new FileStream(templatePathNew, FileMode.Open), contentType)
                {
                    FileDownloadName = reportHistoryExport.FileExport
                };
            }
            else { throw new UserFriendlyException(400, "Bad request"); }
        }
    }
}
