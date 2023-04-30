using Abp.Configuration;
using Abp;
using System.Collections.Generic;

namespace AristBase.Authorization
{
    public static class PermissionNames
    {
        public const string Pages_Tenants = "Pages.Tenants";

        public const string Pages_Users = "Pages.Users";
        public const string ChangePassword = "Pages.Users.Password";
        public const string Pages_Users_Activation = "Pages.Users.Activation";

        public const string Pages_Roles = "Pages.Roles";
        public const string Pages_Certificates = "Pages.Certificates";
        public const string Pages_CertificateTypes = "Pages.Certificatetypes";
        public const string TamThan = "tamthan";
        public const string ThanKinh = "thankinh";
        public const string Mat = "mat";
        public const string TaiMuiHong = "taimuihong";
        public const string TimMach = "timmach";
        public const string HoHap = "hohap";
        public const string CoXuongKhop = "coxuongkhop";
        public const string ThaiSan = "thaisan";
        public const string NoiTiet = "noitiet";
        public const string NhiKhoa = "nhikhoa";
        public const string RangHamMat = "ranghammat";
        public const string NgoaiKhoa = "ngoaikhoa";
        public const string DaLieu = "dalieu";
        public const string TuanHoan = "tuanhoan";
        public const string TieuHoa = "tieuhoa";
        public const string ThanTietNieu = "thantietnieu";
        public const string XetNghiemMaTuyVaMau = "xetnghiemmatuyvamau";
        public const string XetNghiemNuocTieu = "xetnghiemnuoctieu";
        public const string XetNghiemMau = "xetnghiemmau";
        public const string XetNghiemKhac = "xetnghiemkhac";
        public const string ChanDoanHinhAnh = "chandoanhinhanh";
        public const string KhamTheLuc = "khamtheluc";
        public const string KhamTheLucInput = "khamtheluc_input";
        public const string KetLuan = "ketluan";
        public const string tdv = "tdv";
        public const string KhamLamSanKhac = "khamlamsankhac";

        public const string PageReadIn = "Pages.In.Read";

        public static List<string> Pages = new List<string>        
        { TuanHoan, 
            TamThan, 
            ThanKinh,
            Mat, 
            TaiMuiHong, 
            TimMach,
            HoHap,
            CoXuongKhop, 
            ThaiSan, 
            NoiTiet,
            NhiKhoa, 
            RangHamMat,
            XetNghiemMaTuyVaMau, 
            XetNghiemMau,
            XetNghiemKhac,
            XetNghiemNuocTieu, 
            ChanDoanHinhAnh,
            KhamTheLuc,
            tdv, 
            KetLuan,
            TieuHoa,
            KhamLamSanKhac,
            ThanTietNieu,
            NgoaiKhoa,
            DaLieu,
            KhamTheLucInput,
            Pages_CertificateTypes,
            Pages_Certificates
        };
    }
    public class CRUDPermissionName
    {
        public CRUDPermissionName(string baseName, string prefix = "Pages")
        {
            Create = $"{prefix}.{baseName}.Create";
            Read = $"{prefix}.{baseName}.Read";
            Update = $"{prefix}.{baseName}.Update";
            Delete = $"{prefix}.{baseName}.Delete";
            Page = $"{prefix}.{baseName}";
            this.BaseName = baseName;
        }
        public string BaseName { get; }
        public string Page { get; }
        public string Create { get; }
        public string Read { get; }
        public string Update { get; }
        public string Delete { get; }
    }
}
