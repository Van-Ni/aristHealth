using Abp.Authorization;
using AristBase.Authorization;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultCerfiticateTypeCreator : DefaultCreator<CertificateType, int, AristBaseDbContext>
    {
        protected override List<CertificateType> GetInitial()
        {
            return new List<CertificateType>
            {
                new CertificateType
                {
                    Id = 1,
                    Price = 0,
                    FilePath = "",
                    FinalResult ="",
                    IsNeedSync = true,
                    Name = "Giấy khám sức khỏe lái xe",
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TamThan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TimMach,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.CoXuongKhop,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.NoiTiet,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThaiSan,
                            DefaultStatus = GroupStatus.OPTIONAL,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemMaTuyVaMau,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },

                    },

                },
                new CertificateType
                {
                    Id = 2,
                    Price = 0,
                    FilePath = "",
                    FinalResult ="",
                    IsNeedSync = false,
                    Name = "Giấy khám sức khỏe dành cho người trên 18 tuổi",
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TuanHoan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TieuHoa,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanTietNieu,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.CoXuongKhop,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TamThan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.NgoaiKhoa,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThaiSan,
                            DefaultStatus = GroupStatus.OPTIONAL,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.RangHamMat,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.DaLieu,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemMau,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemNuocTieu,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ChanDoanHinhAnh,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KhamTheLuc,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                    },


                },
                new CertificateType
                {
                    Id = 3,
                    Price = 0,
                    FilePath = "",
                    FinalResult ="",
                    IsNeedSync = true,
                    Name = "Giấy khám sức khỏe dành cho người dưới 18 tuổi",
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TuanHoan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TieuHoa,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanTietNieu,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KhamLamSanKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.RangHamMat,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                         new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                        },
                    },

                },
            };
        }

        public DefaultCerfiticateTypeCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}
