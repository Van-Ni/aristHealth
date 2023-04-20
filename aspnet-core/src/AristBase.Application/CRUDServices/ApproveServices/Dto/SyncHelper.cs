using Abp.Timing;
using AristBase.BaseEntity;
using AristBase.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ApproveServices.Dto
{
    static class SyncHelper
    {
        public static string IDBV = "64A01";
        public static string TenBV = "TRUNG TAM GIAM DINH Y KHOA";
        public static string DatimeFormat = "dd/MM/yyyy";
        public static string GetRealValue(Values values)
        {
            if (!string.IsNullOrEmpty(values.RealValue))
            {
                return values.RealValue;
            }
            return string.Equals("duong tinh", values.Value.RemoveDiacritics().ToLower())?"1":"0";
        }
        static public string GetNumberTitle(int number, string hospitalId) => string.Format("{0:5d}/{1}/{2}", number, hospitalId, Clock.Now.ToString("yy"));
    }
}
