using Abp.Authorization.Roles;
using AristBase.Authorization;
using AristBase.Authorization.Roles;
using AristBase.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultRolesCreator : DefaultCreator<Role, int, AristBaseDbContext>
    {
        protected override List<Role> GetInitial()
        {
            return new List<Role>
            {
               new Role
               {
                   Name = PermissionNames.NgoaiKhoa,
                   DisplayName = PermissionNames.NgoaiKhoa,
               },
               new Role
               {
                   Name = PermissionNames.ChanDoanHinhAnh,
                   DisplayName = PermissionNames.ChanDoanHinhAnh,
               },
               new Role
               {
                   Name = PermissionNames.HoHap,
                   DisplayName = PermissionNames.HoHap,
               },
               new Role
               {
                   Name = PermissionNames.KetLuan,
                   DisplayName = PermissionNames.KetLuan,
               },
               new Role
               {
                   Name = PermissionNames.DaLieu,
                   DisplayName = PermissionNames.DaLieu,
               },
               new Role
               {
                   Name = PermissionNames.NoiTiet,
                   DisplayName = PermissionNames.NoiTiet,
               },
               new Role
               {
                   Name = PermissionNames.TieuHoa,
                   DisplayName = PermissionNames.TieuHoa,
               },
               new Role
               {
                   Name = PermissionNames.CoXuongKhop,
                   DisplayName = PermissionNames.CoXuongKhop,
               },
               new Role
               {
                   Name = PermissionNames.KhamLamSanKhac,
                   DisplayName = PermissionNames.KhamLamSanKhac,
               },
               new Role
               {
                   Name = PermissionNames.KhamTheLuc,
                   DisplayName = PermissionNames.KhamTheLuc,
               },
               new Role
               {
                   Name = PermissionNames.Mat,
                   DisplayName = PermissionNames.Mat,
               },
               new Role
               {
                   Name = PermissionNames.NhiKhoa,
                   DisplayName = PermissionNames.NhiKhoa,
               },
               new Role
               {
                   Name = PermissionNames.RangHamMat,
                   DisplayName = PermissionNames.RangHamMat,
               },
               new Role
               {
                   Name = PermissionNames.TaiMuiHong,
                   DisplayName = PermissionNames.TaiMuiHong,
               },
               new Role
               {
                   Name = PermissionNames.TamThan,
                   DisplayName = PermissionNames.TamThan,
               },
               new Role
               {
                   Name = PermissionNames.tdv,
                   DisplayName = PermissionNames.tdv,
               },
               new Role
               {
                   Name = PermissionNames.ThaiSan,
                   DisplayName = PermissionNames.ThaiSan,
               },
               new Role
               {
                   Name = PermissionNames.ThanKinh,
                   DisplayName = PermissionNames.ThanKinh,
               },
               new Role
               {
                   Name = PermissionNames.ThanTietNieu,
                   DisplayName = PermissionNames.ThanTietNieu,
               },
               new Role
               {
                   Name = PermissionNames.TieuHoa,
                   DisplayName = PermissionNames.TieuHoa,
               },
               new Role
               {
                   Name = PermissionNames.TimMach,
                   DisplayName = PermissionNames.TimMach,
               },
               new Role
               {
                   Name = PermissionNames.TuanHoan,
                   DisplayName = PermissionNames.TuanHoan,
               },
               new Role
               {
                   Name = PermissionNames.TuanHoan,
                   DisplayName = PermissionNames.TuanHoan,
               },
            };
        }
        public DefaultRolesCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}