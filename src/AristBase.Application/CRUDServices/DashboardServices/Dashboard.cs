using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DashboardServices
{
    public class Dashboard : ApplicationService
    {
        private readonly IRepository<Certificate, Guid> _repository;
        public Dashboard(IRepository<Certificate, Guid> repository)
        {
            _repository = repository;
        }
        public async Task<int> ToTalMedicalVisit(DateTime from, DateTime to) // Tổng lượt khám
        {
            return await _repository.CountAsync(q => from <= q.CreationTime && to >= q.CreationTime);
        }
        public async Task<int> TotalDrivinglicense(DateTime from, DateTime to) // Tổng giấy phép lái xe
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.DriverTest && from <= q.CreationTime && to >= q.CreationTime);
        }
        public async Task<int> TotalHealthCertificationUnder18(DateTime from, DateTime to) // Tổng giấy khám người dưới 18 tuổi
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.ChildrentTest && from <= q.CreationTime && to >= q.CreationTime);
        }
        public async Task<int> TotalHealthCertificationOver18(DateTime from, DateTime to) // Tổng giấy khám người trên 18 tuổi
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.AldultTest && from <= q.CreationTime && to >= q.CreationTime);
        }
        public async Task<decimal> TotalRevenue(DateTime from, DateTime to) // Tổng doanh thu
        {
            var certificate =  _repository.GetAll();
            return certificate.Where(q => from <= q.CreationTime && to >= q.CreationTime).Sum(q => q.AmountPaid);
        }
    }
}
    