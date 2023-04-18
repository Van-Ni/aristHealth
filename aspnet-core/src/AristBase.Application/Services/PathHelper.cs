using Abp.Timing;
using DocumentFormat.OpenXml.VariantTypes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Services
{
    static class PathHelper
    {
        public const string BaseOutputPath = "./VolumeMap/pdf/output/{0}/{1}";
        public const string FontPath = "./Data/arial.ttf";
        public static string GetOutputPath(string fileName, string type)
        {
            var now = Clock.Now;
            var path = string.Format(BaseOutputPath, now.ToString("yyyyMMdd"), type);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            return path + string.Format("/{0}", fileName);
        }
    }
}
