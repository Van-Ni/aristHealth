using AristBase.BaseEntity;
using AristBase.Extensions;
using AristBase.Services;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.Service
{
    public class StorageService : IStorageService
    {
        private readonly IWebHostEnvironment hostEnvironment;
        private string uploadFolder = @"Files/Document/";
        public const string TableColPrefix = "col_";
        public StorageService(IWebHostEnvironment environment)
        {
            this.hostEnvironment = environment;
        }
        public async ValueTask<string> UploadFileAsync(string filename, string folderPath = "", byte[] imageBuffer = null, Stream stream = null)
        {
            var filePath = Path.Combine(hostEnvironment.WebRootPath, uploadFolder, folderPath);
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);

            await File.WriteAllBytesAsync(Path.Combine(filePath, filename), stream.ToByteArray());

            return Path.Combine("/", uploadFolder, folderPath, filename);
        }
    }
}
