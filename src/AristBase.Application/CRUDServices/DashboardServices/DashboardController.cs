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
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("dashbord-Data")]
        public async Task<ActionResult<DashboardResponseModel>> GetDashboardData(DateTime from, DateTime to)
        {
            var dashboardData = new DashboardResponseModel
            {
                // Sử dụng IDashboardService để lấy dữ liệu
                TotalMedicalVisits = await _dashboardService.ToTalMedicalVisit(from, to),
                TotalDrivingLicenses = await _dashboardService.TotalDrivinglicense(from, to),
                TotalHealthCertificationUnder18 = await _dashboardService.TotalHealthCertificationUnder18(from, to),
                TotalHealthCertificationOver18 = await _dashboardService.TotalHealthCertificationOver18(from, to),
                TotalRevenue = await _dashboardService.TotalRevenue(from, to)
            };

            return Ok(dashboardData);
        }
    }

}
