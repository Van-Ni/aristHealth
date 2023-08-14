using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.DashboardServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IRepository<Certificate, Guid> _repository;

        public DashboardController(IRepository<Certificate, Guid> repository)
        {
            _repository = repository;
        }

        [HttpGet("dashbord-Data")]
        public async Task<ActionResult<DashboardResponseModel>> GetDashboardData(DateTime from, DateTime to)
        {
            var dashboard = new Dashboard(_repository);

            var dashboardData = new DashboardResponseModel
            {

                TotalMedicalVisits = await dashboard.ToTalMedicalVisit(from, to),
                TotalDrivingLicenses = await dashboard.TotalDrivinglicense(from, to),
                TotalHealthCertificationUnder18 = await dashboard.TotalHealthCertificationUnder18(from, to),
                TotalHealthCertificationOver18 = await dashboard.TotalHealthCertificationOver18(from, to),
                TotalRevenue = await dashboard.TotalRevenue(from, to)
            };

            return Ok(dashboardData);
        }
    }

}
