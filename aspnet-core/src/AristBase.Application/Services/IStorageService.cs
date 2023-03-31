using Abp.Dependency;
using AristBase.BaseEntity;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Routing.Template;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public interface IStorageService : ITransientDependency
    {
        ValueTask<string> UploadFileAsync(string filename, string folderPath = "", byte[] imageBuffer = null, Stream stream = null);
    }
}
