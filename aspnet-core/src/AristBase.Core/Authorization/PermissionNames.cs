using Abp.Configuration;
using Abp;
using System.Collections.Generic;

namespace AristBase.Authorization
{
    public static class PermissionNames
    {
        public const string Pages_Tenants = "Pages.Tenants";

        public const string Pages_Users = "Pages.Users";
        public const string Pages_Users_Activation = "Pages.Users.Activation";

        public const string Pages_Roles = "Pages.Roles";
        public const string TamThan = "TamThan";
        public const string ThanKinh = "ThanKinh";
        public const string Mat = "Mat";
        public const string TaiMuiHong = "TaiMuiHong";
        public const string TimMach = "TimMach";
        public const string HoHap = "HoHap";
        public const string CoXuongKhop = "CoXuongKhop";
        public const string ThaiSan = "ThaiSan";
        public const string NoiTiet = "NoiTiet";
        public const string NhiKhoa = "NhiKhoa";
        public const string RangHamMat = "RangHamMat";
        public const string NgoaiKhoa = "NgoaiKhoa";
        public const string DaLieu = "DaLieu";
        public const string TuanHoan = "TuanHoan";
        public const string TieuHoa = "TieuHoa";
        public const string ThanTietNieu = "ThanTietNieu";
        public const string XetNghiemMaTuyVaMau = "XetNghiemMaTuyVaMau";
        public const string XetNghiemNuocTieu = "XetNghiemNuocTieu";
        public const string XetNghiemMau = "XetNghiemMau";
        public const string XetNghiemKhac = "XetNghiemKhac";
        public const string ChanDoanHinhAnh = "ChanDoanHinhAnh";
        public const string KhamTheLuc = "KhamTheLuc";
        public const string KetLuan = "KetLuan";
        public const string TruongDonViKySo = "TruongDonViKySo";
        public const string KhamLamSanKhac = "KhamLamSanKhac";

        public static List<string> Pages = new List<string>
        { TamThan, ThanKinh, Mat, TaiMuiHong, TimMach, HoHap, CoXuongKhop, ThaiSan, NoiTiet,NhiKhoa, RangHamMat,XetNghiemMaTuyVaMau, XetNghiemMau,XetNghiemKhac,XetNghiemNuocTieu, ChanDoanHinhAnh,KhamTheLuc,TruongDonViKySo, KetLuan,KhamLamSanKhac};
    }
    public class CRUDPermissionName
    {
        public CRUDPermissionName(string baseName, string prefix = "Pages")
        {
            Create = $"{prefix}.{baseName}.Create";
            Read = $"{prefix}.{baseName}.Read";
            Update = $"{prefix}.{baseName}.Update";
            Delete = $"{prefix}.{baseName}.Delete";
        }
        public string Create { get; }
        public string Read { get; }
        public string Update { get; }
        public string Delete { get; }
    }
}
