using AristBase.CRUDServices.CertificateServices;
using CsvHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Extensions
{
    public static class ExportExcelCSV
    {
        public static byte[] ExportToCsv(List<CertificateCsvDto> certificates)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var writer = new StreamWriter(memoryStream))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(certificates);
                }
                return memoryStream.ToArray();
            }
        }
    }
}
