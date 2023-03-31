using Abp.UI;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public enum SupportedType
    {
        word,
        pdf, excel
    }
    public static class ProcessServiceFactory
    {
        public static IFileProcessService GetProcessService(string ContentType)
        {
            if (ContentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            {
                return new WordMailMergeProcessService();
            }
            else
            {
                throw new UserFriendlyException(400, "Bad request");
            }
        }
        public static IFileProcessService GetProcessService(SupportedType type)
        {
            if(type == SupportedType.word)
                return new WordMailMergeProcessService();
            throw new UserFriendlyException(400, "Bad request");
        }
        public static string GetMergeFiledKey(string fieldText)
        {
            var key = fieldText.Replace("MERGEFIELD", string.Empty).Trim();
            //Get key of data, find in table keydata
            return key.Split(@"\*").First().Trim();
        }
    }
}
