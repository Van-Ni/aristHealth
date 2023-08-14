

using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;

namespace AristBase.Extensions
{
    public class PathHelper
    {
        private static string uploadFolder = @"Files/Document/";
        private static string newFolder = @"Files/HistoryExport/";
        public static string GetTemplatePath(string webHostEnvironment, string id, string fileName)
        {
            return webHostEnvironment + "/" + uploadFolder + id + "/" + fileName;
        }
        public static string getUrlNewFile(string webHostEnvironment, Guid HistoryId, string fileName)
        {
            var filePath = Path.Combine(webHostEnvironment, newFolder, HistoryId.ToString());
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
            return webHostEnvironment + "/" + newFolder + HistoryId + "/" + fileName;
        }
    }
}
