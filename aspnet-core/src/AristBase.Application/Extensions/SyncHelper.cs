using Abp.Timing;
using AristBase.BaseEntity;

namespace AristBase.Extensions
{
    static class SyncHelper
    {
        //public static string IDBV = "64A01";
        //public static string TenBV = "PHÒNG KHÁM ĐA KHOA THUỘC TRUNG TÂM GIÁM ĐỊNH Y KHOA GIA LAI";
        public static string DatimeFormat = "dd/MM/yyyy";
        public static string GetRealValue(Values values)
        {
            if (!string.IsNullOrEmpty(values.RealValue))
            {
                return values.RealValue;
            }
            return string.Equals("duong tinh", values.Value.RemoveDiacritics().ToLower()) ? "1" : "0";
        }
        static public string GetNumberTitle(string template, int number, string hospitalId) => string.Format(template, number, hospitalId, Clock.Now.ToString("yy"));
        static public string GetNumberTitleNormal(string template, int number) => string.Format(template, number);
    }
}
