﻿using Abp.Dependency;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Extensions.Storage
{
    public interface IStorageService : ITransientDependency
    {
        ValueTask<string> UploadFileAsync(string filename, string folderPath = "", byte[] imageBuffer = null, Stream stream = null);

    }
    public class StorageService : IStorageService
    {
        private readonly IWebHostEnvironment hostEnvironment;
        private string uploadFolder = @"VolumeMap/sign/";
        public StorageService(IWebHostEnvironment hostEnvironment)
        {
            this.hostEnvironment = hostEnvironment;
        }
        public async ValueTask<string> UploadFileAsync(string filename, string folderPath = "", byte[] imageBuffer = null, Stream stream = null)
        {
            var filePath = Path.Combine(hostEnvironment.ContentRootPath, uploadFolder, folderPath);
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);

            await File.WriteAllBytesAsync(Path.Combine(filePath, filename), stream.ToByteArray());

            return Path.Combine("/", uploadFolder, folderPath, filename);
        }
    }
}
