using Abp.Application.Services;
using Abp.Authorization;
using Abp.Dependency;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.Services
{
    [AbpAuthorize(PermissionNames.PageReadIn)]
    public class PDFService : ApplicationService, ITransientDependency
    {
        private readonly IRepository<Certificate, Guid> _certificateRepository;
        private readonly InternalPDFService _internalPDFService;

        public PDFService(IRepository<Certificate, Guid> certificateRepository, InternalPDFService internalPDFService)
        {
            _certificateRepository = certificateRepository;
            this._internalPDFService = internalPDFService;
        }

        public async Task<ActionResult> GetCertificatePdfPrintedFile(Guid cerId)
        {          
            var path = await _certificateRepository.GetAll()
                .Where(c => c.Id == cerId).Select(c=>c.FileResult)
                .SingleAsync();
            if(string.IsNullOrEmpty(path)) {
                return await _internalPDFService.FillPDFWithCertificate(cerId);          
            }
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
            return new FileStreamResult(fileStream, "application/pdf")
            {
               FileDownloadName = Path.GetFileName(path)
            };
        }

    }
}
