using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Linq;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using AristBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public class KhoaTamThanService : KeyValueBaseService
    {
        public KhoaTamThanService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TamThan)
        {
        }
    }
    public class KhoaThanKinhService : KeyValueBaseService
    {
        public KhoaThanKinhService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.ThanKinh)
        {
        }
    }
    public class KhoaThaiSanService : KeyValueBaseService
    {
        public KhoaThaiSanService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.ThaiSan)
        {
        }
    }
    public class KhoaTimMachService : KeyValueBaseService
    {
        public KhoaTimMachService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TimMach)
        {
        }
    }
    public class KhoaNoiTietService : KeyValueBaseService
    {
        public KhoaNoiTietService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.NoiTiet)
        {
        }
    }
    public class KhoaMatService : KeyValueBaseService
    {
        public KhoaMatService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.Mat)
        {
        }
    }
    public class KhoaNhiKhoaService : KeyValueBaseService
    {
        public KhoaNhiKhoaService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.NhiKhoa)
        {
        }
    }
    public class KhoaRangHamMatService : KeyValueBaseService
    {
        public KhoaRangHamMatService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.RangHamMat)
        {
        }
    }
    public class KhoaHoHapService : KeyValueBaseService
    {
        public KhoaHoHapService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.HoHap)
        {
        }
    }
    public class KhoaCoXuongKhopService : KeyValueBaseService
    {
        public KhoaCoXuongKhopService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.CoXuongKhop)
        {
        }
    }
    public class KhoaTaiMuiHongService : KeyValueBaseService
    {
        public KhoaTaiMuiHongService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TaiMuiHong)
        {
        }
    }
    public class XetNghiemMauService : KeyValueBaseService
    {
        public XetNghiemMauService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.XetNghiemMau)
        {
        }
    }
    public class XetNghiemKhacService : KeyValueBaseService
    {
        public XetNghiemKhacService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.XetNghiemKhac)
        {
        }
    }
    public class XetNghiemMaTuyVaMauService : KeyValueBaseService
    {
        public XetNghiemMaTuyVaMauService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.XetNghiemMaTuyVaMau)
        {
        }
    }
    public class XetNghiemNuocTieuService : KeyValueBaseService
    {
        public XetNghiemNuocTieuService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.XetNghiemNuocTieu)
        {
        }
    }
    public class KhoaNgoaiKhoaService : KeyValueBaseService
    {
        public KhoaNgoaiKhoaService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.NgoaiKhoa)
        {
        }
    }
    public class KhoaDalieuService : KeyValueBaseService
    {
        public KhoaDalieuService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.DaLieu)
        {
        }
    }
    public class ChanDoanHinhAnhService : KeyValueBaseService
    {
        public ChanDoanHinhAnhService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.ChanDoanHinhAnh)
        {
        }
    }
    public class KhamTheLucService : KeyValueBaseService
    {
        public KhamTheLucService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.KhamTheLuc)
        {
        }
    }
    public class KetLuanService : KeyValueBaseService
    {
        public KetLuanService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.KetLuan)
        {
        }
    }
    public class TruongDonViKySoService : KeyValueBaseService
    {
        public TruongDonViKySoService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TruongDonViKySo)
        {
        }
    }
    public class TuanHoanService : KeyValueBaseService
    {
        public TuanHoanService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TuanHoan)
        {
        }
    }
    public class TieuHoaService : KeyValueBaseService
    {
        public TieuHoaService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.TieuHoa)
        {
        }
    }
    public class ThanTietNieuService : KeyValueBaseService
    {
        public ThanTietNieuService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.ThanTietNieu)
        {
        }
    }
    public class KhamLamSanService : KeyValueBaseService
    {
        public KhamLamSanService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS) : base(repository, repositoryCGS, PermissionNames.KhamLamSanKhac)
        {
        }
    }
    public class GetDataService : AsyncCrudAppService<MedicationKeyResult, MedicationKeyResultDto, Guid, Guid>
    {
        public GetDataService(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository)
        {
        }
        public async override Task<PagedResultDto<MedicationKeyResultDto>> GetAllAsync(Guid input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Where(w => w.CertificateId == input);

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<MedicationKeyResultDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async ValueTask<IEnumerable<MedicationKeyResultDto>> GetDataAllAsync(Guid id)
        {
            CheckGetAllPermission();
            var entities = await Repository.GetAll().Where(w => w.CertificateId == id).ToListAsync();

            return ObjectMapper.Map<IEnumerable<MedicationKeyResultDto>>(entities);
        }
        public override Task<MedicationKeyResultDto> CreateAsync(MedicationKeyResultDto input)
        {
            throw new NotImplementedException();
        }
        public override Task DeleteAsync(EntityDto<Guid> input)
        {
            throw new NotImplementedException();
        }
        public override Task<MedicationKeyResultDto> UpdateAsync(MedicationKeyResultDto input)
        {
            throw new NotImplementedException();
        }
    }
}
