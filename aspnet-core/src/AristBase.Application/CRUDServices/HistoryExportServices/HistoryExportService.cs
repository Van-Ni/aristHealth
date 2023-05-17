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
using AristBase.Services;
using System.Runtime.ConstrainedExecution;

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
        public async ValueTask<IEnumerable<CertificateDto>> GetCertificateByDate(DateTime DateFrom, DateTime DateTo, Status? status)
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
            query = query.OrderBy(i => i.ClientInfoId);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<IEnumerable<CertificateDto>>(entities);
        }
        public async Task<FileContentResult> GetExportCertificateList(DateTime DateFrom, DateTime DateTo, Status? status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            string nameSheet = "Báo cáo doanh thu";
            var list = await GetCertificateByDate(DateFrom, DateTo, status);

            var certificate = list.Select((e, index) => new CertificateCsvDto
            {
                STT = index + 1,
                MaKhachHang = e.ClientInfo.Id,
                TenNguoiMua = e.ClientInfo.FullName,
                DiaChiKhachHang = string.Join(", ", e.ClientInfo.Commune, e.ClientInfo.District, e.ClientInfo.Province),
                HinhThucTT = "TM",
                SanPham = e.CertificateType.Name + ": " + e.Reason,
                DonViTinh = "Nguoi",
                TienBan = e.AmountPaid,
                ThueSuat = "-1.00",
                TongCong = e.AmountPaid,
                DonViTienTe = "VND",
                Reason = e.Reason,
                LoaiGiay = e.CertificateType.Name
            }).ToList();
            var sheetData = new List<ExcelDataSheet<CertificateCsvDto>>()
            {
                new ExcelDataSheet<CertificateCsvDto>
                {
                    Tables = certificate,
                    SheetName = "Tong"
                }
            };
            var groups = certificate.GroupBy(c => c.LoaiGiay);
            foreach ( var group in groups)
            {
                sheetData.Add(new ExcelDataSheet<CertificateCsvDto> { 
                SheetName = group.Key.RemoveDiacritics().Replace(" ", "_"),
                Tables = group.ToList(),
                });
            }
            var exportbytes = ExportExcelCSV.ExporttoExcel(sheetData);
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
        
        public async ValueTask<IEnumerable<CertificateGroupStatusDto>> GetCertificateGroupStatusByDate(DateTime DateFrom, DateTime DateTo, Status? status)
        {
            CheckCreatePermission();
            var query = _repositoryGr.GetAll();
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
                query = query.Where(w => w.Certificate.Status == status);
            }
            query = query.Include(i => i.Certificate).ThenInclude(i => i.CertificateType)
                .Include(i => i.Certificate).ThenInclude(i => i.ClientInfo);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<IEnumerable<CertificateGroupStatusDto>>(entities);
        }
        public async Task<FileContentResult> GetExportCertificate3List(DateTime DateFrom, DateTime DateTo, Status? status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            string nameSheet = "Làm việc";
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
                ALAT = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_alat") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_alat"].Value : null,
                ASAT = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_asat") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_asat"].Value : null,
                BC = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_bachcau") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_bachcau"].Value : null,
                Cre = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_creatinin") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_creatinin"].Value : null,
                DuongMau = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_duongmau") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_duongmau"].Value : null,
                HC = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_hongcau") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_hongcau"].Value : null,
                TC = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_tieucau") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_tieucau"].Value : null,
                XetNghiemMauKhac = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_khac") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_khac"].Value : null,
                Ure = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content.ContainsKey("text_ure") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemmau").Content["text_ure"].Value : null,
                Duong = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_duong") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_duong"].Value : null,
                Protein = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_protein") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_protein"].Value : null,
                XetNuocTieuKhac = s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu")?.Content.ContainsKey("text_khac") == true ? s.Certificate.FirstOrDefault(x => x.Group == "xetnghiemnuoctieu").Content["text_khac"].Value : null,
            })
            .ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateGroupStatusCSVDto>(certificategr, nameSheet);
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
        public async Task<FileContentResult> GetExportCertificateMaTuyList(DateTime DateFrom, DateTime DateTo, Status? status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            string nameSheet = "Lái xe";
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
                Morphine = s.Group.First().Content.ContainsKey("text_morphin") ? s.Group.First().Content["text_morphin"].RealValue == "1" ? "+" : "-" : null,
                Amphetamin = s.Group.First().Content.ContainsKey("text_amphetamin") ? s.Group.First().Content["text_amphetamin"].RealValue == "1" ? "+" : "-" : null,
                Marijiana = s.Group.First().Content.ContainsKey("text_marijuana") ? s.Group.First().Content["text_marijuana"].RealValue == "1" ? "+" : "-" : null,
                Methaphetamin = s.Group.First().Content.ContainsKey("text_methamphetamin") ? s.Group.First().Content["text_methamphetamin"].RealValue == "1" ? "+" : "-" : null,
                NongDoCon = s.Group.First().Content.ContainsKey("text_nongdomau") ? s.Group.First().Content["text_nongdomau"].Value : null,
                MaSoDoiTuong = s.Group.First().Content.ContainsKey("text_stt") ? s.Group.First().Content["text_stt"].Value : null,

            })
            .ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateMaTuyDto>(certificategr, nameSheet);
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
        public async Task<FileContentResult> GetExportCertificateMaTuyListDuongTinh(DateTime DateFrom, DateTime DateTo, Status? status)
        {
            CheckCreatePermission();
            string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
            string nameSheet = "Dương tính";
            var list = await GetCertificateGroupStatusByDate(DateFrom, DateTo, status);
            var certificategr = list.Where(x => x.Group == "xetnghiemmatuyvamau")
            .GroupBy(col => col.CertificateId)
            .Join(
               list.Where(x => x.Group == "xetnghiemmatuyvamau").GroupBy(x => x.CertificateId),
                x => x.Key,
                y => y.Key,
                (x, y) => new { Group = x, Certificate = y }
            )
            .Where(s => s.Group.First().Content["text_morphin"].RealValue == "1" || s.Group.First().Content["text_amphetamin"].RealValue == "1"
            || s.Group.First().Content["text_marijuana"].RealValue == "1" || s.Group.First().Content["text_methamphetamin"].RealValue == "1")
            .Select((s, index) => new CertificateMaTuyDto
            {
                NgayThang = s.Group.First().Certificate.CreationTime.Date.ToString("dd/MM/yyyy"),
                STT = index + 1,
                HoTen = s.Group.First().Certificate.ClientInfo.FullName,
                Tuoi = s.Group.First().Certificate.ClientInfo.DateOfBirth.ToString(),
                DiaChi = s.Group.First().Certificate.ClientInfo.Address,
                Hang = s.Group.First().Certificate.Reason,
                Morphine = s.Group.First().Content.ContainsKey("text_morphin") ? s.Group.First().Content["text_morphin"].RealValue == "1" ? "+" : "-" : null,
                Amphetamin = s.Group.First().Content.ContainsKey("text_amphetamin") ? s.Group.First().Content["text_amphetamin"].RealValue == "1" ? "+" : "-" : null,
                Marijiana = s.Group.First().Content.ContainsKey("text_marijuana") ? s.Group.First().Content["text_marijuana"].RealValue == "1" ? "+" : "-" : null,
                Methaphetamin = s.Group.First().Content.ContainsKey("text_methamphetamin") ? s.Group.First().Content["text_methamphetamin"].RealValue == "1" ? "+" : "-" : null,
                NongDoCon = s.Group.First().Content.ContainsKey("text_nongdomau") ? s.Group.First().Content["text_nongdomau"].Value : null,
                MaSoDoiTuong = s.Group.First().Content.ContainsKey("text_stt") ? s.Group.First().Content["text_stt"].Value : null,

            })
            .ToList();
            var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateMaTuyDto>(certificategr, nameSheet);
            var data = await storageService.SaveFileExcelAsync(reportname, "Excel", stream: new MemoryStream(exportbytes));
            var obj = new HistoryExport()
            {
                filePath = data,
                End = DateTo,
                Start = DateFrom,
                Status = Status.Finish,
                Type = "HeroinReport+",
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
