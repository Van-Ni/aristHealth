using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.CRUDServices.HistoryExportServices.Dto;
using AristBase.Extensions.Storage;
using AristBase.Extensions;
using AristBase.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using AristBase.CRUDServices.CertificateServices;
using AristBase.Authorization;

namespace AristBase.CRUDServices.HistoryExportServices
{
    public class HistoryExportService : AsyncCrudPermissonAppService<HistoryExport, HistoryExportDto, Guid, PagedAndSortedAndSearchAndDateResultDto>
    {
        private readonly IRepository<CertificateGroupStatus, Guid> _repositoryGr;
        private readonly IRepository<Certificate, Guid> _repositoryCer;
        private readonly IStorageService storageService;
        public HistoryExportService(IRepository<HistoryExport, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryGr, IRepository<Certificate, Guid> repositoryCer, IStorageService storageService) : base(repository, PermissionNames.Report)
        {
            _repositoryGr = repositoryGr;
            _repositoryCer = repositoryCer;
            this.storageService = storageService;
        }
        public async ValueTask<IEnumerable<CertificateDto>> GetCertificateByDate(DateTime DateFrom, DateTime DateTo, Status status)
        {
            CheckDeletePermission();
            var query = _repositoryCer.GetAll();
            if (DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime >= DateFrom);
            }
            if (DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime <= DateTo);
            }
            if (status != null)
            {
                query = query.Where(w => w.Status == status);
            }
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<IEnumerable<CertificateDto>>(entities);
        }
        public async Task<FileContentResult> GetExportCertificateList(DateTime DateFrom, DateTime DateTo, Status status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            var list = await GetCertificateByDate(DateFrom, DateTo, status);

            var certificate = list.Select((e, index) => new CertificateCsvDto
            {
                STT = index + 1,
                MaKhachHang = e.ClientInfo.Id,
                TenNguoiMua = e.ClientInfo.FullName,
                DiaChiKhachHang = e.ClientInfo.Address,
                HinhThucTT = "TM",
                SanPham = e.CertificateType.Name,
                DonViTinh = "Nguoi",
                TienBan = e.AmountPaid,
                ThueSuat = "-1.00",
                TongCong = e.AmountPaid,
                DonViTienTe = "VND"
            }).ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel(certificate, reportname);

            var data = await storageService.SaveFileExcelAsync(reportname, "Excel", stream: new MemoryStream(exportbytes));
            var obj = new HistoryExport()
            {
                filePath = data,
                End = DateTo,
                Start = DateFrom,
                Status = Status.Finish,
                Type = "RevenueReport"
            };
            await Repository.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = reportname
            };
        }
        public async ValueTask<IEnumerable<CertificateGroupStatusDto>> GetCertificateGroupStatusByDate(DateTime DateFrom, DateTime DateTo, Status status)
        {
            CheckCreatePermission();
            var query = _repositoryGr.GetAll();
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
        public async Task<FileContentResult> GetExportCertificate3List(DateTime DateFrom, DateTime DateTo, Status status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            var list = await GetCertificateGroupStatusByDate(DateFrom, DateTo, status);
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
                Type = "DriverReport"

            };
            await Repository.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = reportname
            };
        }
        public async Task<FileContentResult> GetExportCertificateMaTuyList(DateTime DateFrom, DateTime DateTo, Status status)
        {
            CheckCreatePermission();
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
                Type = "HeroinReport",
            };
            await Repository.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = reportname
            };
        }

        public async override Task<PagedResultDto<HistoryExportDto>> GetAllAsync(PagedAndSortedAndSearchAndDateResultDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            if (input.DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime >= input.DateFrom);
            }
            if (input.DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime <= input.DateTo);
            }
            //query = query.Include(i => i.User).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Type.Contains(input.Keyword));
            query = query.Include(i => i.CreatorUser);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<HistoryExportDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async Task<IActionResult> DownloadFilePath(string filePath)
        {
            CheckGetPermission();
            var fileBytes = await File.ReadAllBytesAsync(filePath);
            return new FileContentResult(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = Path.GetFileName(filePath)
            };
        }
    }
}
