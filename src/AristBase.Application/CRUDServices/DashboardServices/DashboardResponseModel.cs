
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DashboardServices
{

    public class DashboardResponseModel
    {
        public int TotalMedicalVisits { get; set; }
        public int TotalDrivingLicenses { get; set; }
        public int TotalHealthCertificationUnder18 { get; set; }
        public int TotalHealthCertificationOver18 { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}