using AristBase.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Extensions
{
    public static class DateTimeExtension
    {
        public static DateTimeOffset ToVNTime(this DateTime datetime)
        {            
            var approveTimeOffset = new DateTimeOffset(datetime);
            return approveTimeOffset.ToOffset(TimeSpan.FromHours(7));
        }
    }
}
