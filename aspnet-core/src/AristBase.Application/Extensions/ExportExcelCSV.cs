using AristBase.CRUDServices.CertificateServices;
using CsvHelper;
using DocumentFormat.OpenXml.Spreadsheet;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using LicenseContext = OfficeOpenXml.LicenseContext;
namespace AristBase.Extensions
{
    public static class ExportExcelCSV
    {
        public static byte[] ExporttoExcel<T>(List<T> table, string filename)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add(filename);
            if (table.Count > 0)
            {
                ws.Cells["A1"].LoadFromCollection(table, true, OfficeOpenXml.Table.TableStyles.Light18);
            }
            return pack.GetAsByteArray();
        }
    }
}
