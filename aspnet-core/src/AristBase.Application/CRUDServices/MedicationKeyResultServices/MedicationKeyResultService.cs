using Abp.Application.Services;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public class KhoaTamThanService : KeyValueBaseService
    {
        public KhoaTamThanService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.TamThan)
        {
        }
    }
    public class KhoaThanKinhService : KeyValueBaseService
    {
        public KhoaThanKinhService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.ThanKinh)
        {
        }
    }
    public class KhoaThaiSanService : KeyValueBaseService
    {
        public KhoaThaiSanService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.ThaiSan)
        {
        }
    }
    public class KhoaTimMachService : KeyValueBaseService
    {
        public KhoaTimMachService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.TimMach)
        {
        }
    }
    public class KhoaNoiTietService : KeyValueBaseService
    {
        public KhoaNoiTietService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.NoiTiet)
        {
        }
    }
    public class KhoaMatService : KeyValueBaseService
    {
        public KhoaMatService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.Mat)
        {
        }
    }
    public class KhoaNhiKhoaService : KeyValueBaseService
    {
        public KhoaNhiKhoaService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.NhiKhoa)
        {
        }
    }
    public class KhoaRangHamMatService : KeyValueBaseService
    {
        public KhoaRangHamMatService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.RangHamMat)
        {
        }
    }
    public class KhoaHoHapService : KeyValueBaseService
    {
        public KhoaHoHapService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.HoHap)
        {
        }
    }
    public class KhoaCoXuongKhopService : KeyValueBaseService
    {
        public KhoaCoXuongKhopService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.CoXuongKhop)
        {
        }
    }
    public class KhoaTaiMuiHongService : KeyValueBaseService
    {
        public KhoaTaiMuiHongService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.TaiMuiHong)
        {
        }
    }
    public class XetNghiemMauService : KeyValueBaseService
    {
        public XetNghiemMauService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.XetNghiemMau)
        {
        }
    }
    public class XetNghiemKhacService : KeyValueBaseService
    {
        public XetNghiemKhacService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.XetNghiemKhac)
        {
        }
    }
    public class XetNghiemMaTuyVaMauService : KeyValueBaseService
    {
        public XetNghiemMaTuyVaMauService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.XetNghiemMaTuyVaMau)
        {
        }
    }
    public class XetNghiemNuocTieuService : KeyValueBaseService
    {
        public XetNghiemNuocTieuService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.XetNghiemNuocTieu)
        {
        }
    }
    public class KhoaNgoaiKhoaService : KeyValueBaseService
    {
        public KhoaNgoaiKhoaService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.NgoaiKhoa)
        {
        }
    }
    public class KhoaDalieuService : KeyValueBaseService
    {
        public KhoaDalieuService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.DaLieu)
        {
        }
    }
    public class ChanDoanHinhAnhService : KeyValueBaseService
    {
        public ChanDoanHinhAnhService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.ChanDoanHinhAnh)
        {
        }
    }
    public class KhamTheLucService : KeyValueBaseService
    {
        public KhamTheLucService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.KhamTheLuc)
        {
        }
    }
    public class KetLuanService : KeyValueBaseService
    {
        public KetLuanService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.KetLuan)
        {
        }
    }
    public class TruongDonViKySoService : KeyValueBaseService
    {
        public TruongDonViKySoService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.TruongDonViKySo)
        {
        }
    }
}
