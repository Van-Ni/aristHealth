using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DashboardServices
{
    public interface IDashboardService
    {
        Task<int> ToTalMedicalVisit(DateTime from, DateTime to);
        Task<int> TotalDrivinglicense(DateTime from, DateTime to);
        Task<int> TotalHealthCertificationUnder18(DateTime from, DateTime to);
        Task<int> TotalHealthCertificationOver18(DateTime from, DateTime to);
        Task<decimal> TotalRevenue(DateTime from, DateTime to);
    }
}
