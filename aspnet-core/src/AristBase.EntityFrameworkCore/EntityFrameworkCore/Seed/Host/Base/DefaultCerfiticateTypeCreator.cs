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
        public static Dictionary<string, Values> DefaultKeyValue = new Dictionary<string, Values>
        {
            { "text_ketluan" , new Values{ Value = "Đủ sức khỏe"}},
            { "text_phanloai" , new Values { Value = "Bình thường" }},
        };
        public static Dictionary<string, Values> MatKeyValue = new Dictionary<string, Values>
        {
            { "text_kk_mt" , new Values{ Value = "10/10" }},
            { "text_kk_mp" , new Values { Value = "10/10" }},
            { "text_ck_mt" , new Values { Value = "10/10" }},
            { "text_ck_mp" , new Values { Value = "10/10" }},
            { "text_cbvm" , new Values { Value = "Không" }},
            { "text_phanloai" , new Values { Value = "Đủ sức khỏe" }},
        };
        public static Dictionary<string, Values> TaiMuiHongKeyValue = new Dictionary<string, Values>
        {
            { "text_taitrai" , new Values{ Value = "05" }},
            { "text_taitrai_noitham" , new Values { Value = "" }},
            { "text_taiphai" , new Values { Value = "05" }},
            { "text_taiphai_noitham" , new Values { Value = "" }},
            { "text_cbvtmh" , new Values { Value = "" }},
            { "text_phanloai" , new Values { Value = "" }},
        };
        public static Dictionary<string, Values> RangHamMatKeyValue = new Dictionary<string, Values>
        {
            { "text_hamtren" , new Values{ Value = "Bình thường" }},
            { "text_hamduoi" , new Values { Value = "Bình thường" }},
            { "text_cbvrhm" , new Values { Value = "" }},
            { "text_phanloai" , new Values { Value = "" }},
        };
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
                    TenantId = 2,
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TamThan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_kk_mt" , new Values{ Value = "10/10" }},
                                { "text_kk_mp" , new Values { Value = "10/10" }},
                                { "text_ck_mt" , new Values { Value = "10/10" }},
                                { "text_ck_mp" , new Values { Value = "10/10" }},
                                { "text_2m_ck" , new Values { Value = "10/10" }},
                                { "text_2m_kk" , new Values { Value = "10/10" }},
                                { "radio_thitruong_ngang" , new Values { Value = "bth" }},
                                { "radio_thitruong_dung" , new Values { Value = "bth" }},
                                { "checkbox_bth" , new Values { Value = "true" }},
                                { "checkbox_mumau_all" , new Values { Value = "" }},
                                { "checkbox_mumau_do" , new Values { Value = "" }},
                                { "checkbox_mumau_xanh" , new Values { Value = "" }},
                                { "checkbox_mumau_vang" , new Values { Value = "" }},
                                { "text_cbvm" , new Values { Value = "Không" }},
                                { "text_ketluan" , new Values { Value = "Đủ sức khỏe" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_taitrai" , new Values{ Value = "05" }},
                                { "text_taitrai_noitham" , new Values { Value = "" }},
                                { "text_taiphai" , new Values { Value = "05" }},
                                { "text_taiphai_noitham" , new Values { Value = "" }},
                                { "text_phanloai" , new Values { Value = "Không" }},
                                { "text_ketluan" , new Values { Value = "Đủ sức khỏe" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TimMach,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_mach" , new Values{ Value = "" }},
                                { "text_huyetap" , new Values { Value = "" }},
                                { "text_phanloai" , new Values { Value = "" }},
                                { "text_ketluan" , new Values { Value = "Đủ sức khỏe" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.CoXuongKhop,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.NoiTiet,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThaiSan,
                            DefaultStatus = GroupStatus.OPTIONAL,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemMaTuyVaMau,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_morphin" , new Values{ Value = "Âm tính" }},
                                { "text_amphetamin" , new Values { Value = "Âm tính" }},
                                { "text_methamphetamin" , new Values { Value = "Âm tính" }},
                                { "text_marijuana" , new Values { Value = "Âm tính" }},
                                { "text_nongdomau" , new Values { Value = "0,0mg/l" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_phanloai" , new Values{ Value = "" }},
                                { "text_ketqua" , new Values { Value = "" }},
                                { "text_ketluan" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_ketluan" , new Values { Value = "Đủ điều kiện sức khỏe lái xe hạng: " }},
                                //{ "text_ngaykhamlai" , new Values { Value = "Đủ điều kiện sức khỏe lái xe hạng: " }},
                                //{ "text_lydokham" , new Values { Value = "Đủ điều kiện sức khỏe lái xe hạng: " }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.tdv,
                            DefaultStatus = GroupStatus.UNREADY,
                        }

                    },

                },
                new CertificateType
                {
                    Id = 2,
                    Price = 0,
                    FilePath = "",
                    FinalResult ="",
                    IsNeedSync = false,
                    TenantId = 2,
                    Name = "Giấy khám sức khỏe dành cho người trên 18 tuổi",
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TuanHoan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TieuHoa,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanTietNieu,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.CoXuongKhop,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TamThan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.NgoaiKhoa,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThaiSan,
                            DefaultStatus = GroupStatus.OPTIONAL,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = MatKeyValue,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent  = TaiMuiHongKeyValue,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.RangHamMat,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = RangHamMatKeyValue,
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.DaLieu,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemMau,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_hongcau" , new Values { Value = "" }},
                                { "text_bachcau" , new Values { Value = "" }},
                                { "text_tieucau" , new Values { Value = "" }},
                                { "text_duongmau" , new Values { Value = "" }},
                                { "text_ure" , new Values { Value = "" }},
                                { "text_creatinin" , new Values { Value = "" }},
                                { "text_asat" , new Values { Value = "" }},
                                { "text_alat" , new Values { Value = "" }},
                                { "text_khac" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemNuocTieu,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_duong" , new Values { Value = "Âm tính" }},
                                { "text_protein" , new Values { Value = "Âm tính" }},
                                { "text_khac" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ChanDoanHinhAnh,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_chandoan" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KhamTheLuc,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_chieucao" , new Values { Value = "" }},
                                { "text_cannang" , new Values { Value = "" }},
                                { "text_chisobmi" , new Values { Value = "" }},
                                { "text_mach" , new Values { Value = "" }},
                                { "text_huyetap" , new Values { Value = "" }},
                                { "text_phanloai" , new Values { Value = "" }},

                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_noidung" , new Values { Value = "" }},
                                { "text_ketluan" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.tdv,
                            DefaultStatus = GroupStatus.UNREADY,
                        }
                    },


                },
                new CertificateType
                {
                    Id = 3,
                    Price = 0,
                    FilePath = "",
                    FinalResult ="",
                    IsNeedSync = false,
                    TenantId = 2,
                    Name = "Giấy khám sức khỏe dành cho người dưới 18 tuổi",
                    TemplateGroups = new List<TemplateGroup> {
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TuanHoan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.HoHap,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TieuHoa,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanTietNieu,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.ThanKinh,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KhamLamSanKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = DefaultKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.Mat,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = MatKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.TaiMuiHong,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = TaiMuiHongKeyValue
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.RangHamMat,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = RangHamMatKeyValue
                        },
                         new TemplateGroup
                        {
                            GroupName = PermissionNames.XetNghiemKhac,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_ketqua" , new Values { Value = "" }},
                            },
                        },
                         new TemplateGroup
                        {
                            GroupName = PermissionNames.KhamTheLuc,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_chieucao" , new Values { Value = "" }},
                                { "text_cannang" , new Values { Value = "" }},
                                { "text_chisobmi" , new Values { Value = "" }},
                                { "text_mach" , new Values { Value = "" }},
                                { "text_huyetap" , new Values { Value = "" }},
                                { "text_phanloai" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.KetLuan,
                            DefaultStatus = GroupStatus.UNREADY,
                            DefaultContent = new Dictionary<string, Values>
                            {
                                { "text_noidung" , new Values { Value = "" }},
                                { "text_ketluan" , new Values { Value = "" }},
                            },
                        },
                        new TemplateGroup
                        {
                            GroupName = PermissionNames.tdv,
                            DefaultStatus = GroupStatus.UNREADY,
                        }
                    },

                },
            };
        }

        public DefaultCerfiticateTypeCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}
