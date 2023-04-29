using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.CertificateServices;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Extensions;
using AristBase.Extensions.Storage;
using AristBase.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class CertificateGroupStatusService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, Guid, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        private readonly IRepository<HistoryExport, Guid> _historyRepo;
        private readonly IStorageService storageService;
        public CertificateGroupStatusService(IRepository<CertificateGroupStatus, Guid> repository, IStorageService storageService, IRepository<HistoryExport, Guid> historyRepo) : base(repository)
        {
            this.storageService = storageService;
            _historyRepo = historyRepo;
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(Guid input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Where(w => w.CertificateId == input).Include(i => i.User);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async ValueTask<IEnumerable<CertificateGroupStatusDto>> GetCertificateGroupStatusByDate( DateTime DateFrom, DateTime DateTo, Status status)
        {
            var query = Repository.GetAll();
            if (DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime.Date >= DateFrom.Date);
            }
            if (DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime.Date <= DateTo.Date);
            }
            if (status != null)
            {
                query = query.Where(w => w.Certificate.Status == status);
            }
            query = query.Include(i => i.Certificate).ThenInclude(i => i.CertificateType)
                .Include(i => i.Certificate).ThenInclude(i => i.ClientInfo);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<IEnumerable<CertificateGroupStatusDto>>(entities);
        }
        public async Task<FileContentResult> GetExportCertificate3List( DateTime DateFrom, DateTime DateTo, Status status)
        {
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            var list = await GetCertificateGroupStatusByDate( DateFrom, DateTo, status);
            var certificategr = list.Where(x => x.Group == "xetnghiemmau" || x.Group == "xetnghiemnuoctieu")
            .GroupBy(col => col.CertificateId)
            .Join(
               list.Where(x => x.Group == "xetnghiemmau" || x.Group == "xetnghiemnuoctieu").GroupBy(x => x.CertificateId),
                x => x.Key,
                y => y.Key,
                (x, y) => new { Group = x, Certificate = y }
            ).Select((s, index) => new CertificateGroupStatusCSVDto
            {
                NgayThang = s.Group.First().Certificate.CreationTime.Date.ToString("dd/MM/yyyy"),
                STT = index + 1,
                HoTen = s.Group.First().Certificate.ClientInfo.FullName,
                Tuoi = s.Group.First().Certificate.ClientInfo.DateOfBirth.ToString(),
                DiaChi = s.Group.First().Certificate.ClientInfo.Address,
                ALAT = s.Group.First().Content.ContainsKey("text_alat") ? s.Group.First().Content["text_alat"].Value : null,
                ASAT = s.Group.First().Content.ContainsKey("text_asat") ? s.Group.First().Content["text_asat"].Value : null,
                BC = s.Group.First().Content.ContainsKey("text_bachcau") ? s.Group.First().Content["text_bachcau"].Value : null,
                Cre = s.Group.First().Content.ContainsKey("text_creatinin") ? s.Group.First().Content["text_creatinin"].Value : null,
                DuongMau = s.Group.First().Content.ContainsKey("text_duongmau") ? s.Group.First().Content["text_duongmau"].Value : null,
                HC = s.Group.First().Content.ContainsKey("text_hongcau") ? s.Group.First().Content["text_hongcau"].Value : null,
                TC = s.Group.First().Content.ContainsKey("text_tieucau") ? s.Group.First().Content["text_tieucau"].Value : null,
                XetNghiemMauKhac = s.Group.First().Content.ContainsKey("text_khac") ? s.Group.First().Content["text_khac"].Value : null,
                Ure = s.Group.First().Content.ContainsKey("text_ure") ? s.Group.First().Content["text_ure"].Value : null,
                Duong = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_duong") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_duong"].Value : null,
                Protein = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_protein") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_protein"].Value : null,
                XetNuocTieuKhac = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_khac") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_khac"].Value : null,
            })
            .ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateGroupStatusCSVDto>(certificategr, reportname);
            var data = await storageService.SaveFileExcelAsync(reportname, "Excel", stream: new MemoryStream(exportbytes));
            var obj = new HistoryExport()
            {
                filePath = data,
                End = DateTo,
                Start = DateFrom,
                Status = Status.Finish,
                Type = "Báo cáo xét nghiệm (Trên 18)",
                UserId = AbpSession.UserId,

            };
            await _historyRepo.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = reportname
            };
        }
        public async Task<FileContentResult> GetExportCertificateMaTuyList(DateTime DateFrom, DateTime DateTo, Status status)
        {
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            var list = await GetCertificateGroupStatusByDate(DateFrom, DateTo, status);
            var certificategr = list.Where(x => x.Group == "xetnghiemmatuyvamau")
            .GroupBy(col => col.CertificateId)
            .Join(
               list.Where(x => x.Group == "xetnghiemmatuyvamau").GroupBy(x => x.CertificateId),
                x => x.Key,
                y => y.Key,
                (x, y) => new { Group = x, Certificate = y }
            ).Select((s, index) => new CertificateMaTuyDto
            {
                NgayThang = s.Group.First().Certificate.CreationTime.Date.ToString("dd/MM/yyyy"),
                STT = index + 1,
                HoTen = s.Group.First().Certificate.ClientInfo.FullName,
                Tuoi = s.Group.First().Certificate.ClientInfo.DateOfBirth.ToString(),
                DiaChi = s.Group.First().Certificate.ClientInfo.Address,
                Hang = s.Group.First().Certificate.Reason,
                Morphine = s.Group.First().Content.ContainsKey("text_morphin") ? s.Group.First().Content["text_morphin"].Value : null,
                Amphetamin = s.Group.First().Content.ContainsKey("text_amphetamin") ? s.Group.First().Content["text_amphetamin"].Value : null,
                Marijiana = s.Group.First().Content.ContainsKey("text_marijuana") ? s.Group.First().Content["text_marijuana"].Value : null,
                Methaphetamin = s.Group.First().Content.ContainsKey("text_methamphetamin") ? s.Group.First().Content["text_methamphetamin"].Value : null,
                NongDoCon = s.Group.First().Content.ContainsKey("text_nongdomau") ? s.Group.First().Content["text_nongdomau"].Value : null,
                MaSoDoiTuong = s.Group.First().Content.ContainsKey("text_stt") ? s.Group.First().Content["text_stt"].Value : null,

            })
            .ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateMaTuyDto>(certificategr, reportname);
            var data = await storageService.SaveFileExcelAsync(reportname, "Excel", stream: new MemoryStream(exportbytes));
            var obj = new HistoryExport()
            {
                filePath = data,
                End = DateTo,
                Start = DateFrom,
                Status = Status.Finish,
                Type = "Báo cáo xét nghiệm (Lái xe)",
                UserId = AbpSession.UserId,

            };
            await _historyRepo.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = reportname
            };
        }

        public override async Task<CertificateGroupStatusDto> CreateAsync(CreateCertificateGroupStatusDto input)
        {
            var getData = await Repository.GetAll().FirstOrDefaultAsync(w => w.CertificateId == input.CertificateId && w.Group == "cdv");
            if (getData != null)
            {
                throw new InvalidOperationException();
            }
            return await base.CreateAsync(input);
        }
    }
}
