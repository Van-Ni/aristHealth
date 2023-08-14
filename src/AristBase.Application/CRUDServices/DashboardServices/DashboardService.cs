using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.DashboardServices;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace YourNamespace
{
    public class DashboardService: IDashboardService
    {

        private readonly IRepository<Certificate, Guid> _repository;

        public DashboardService(IRepository<Certificate, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<int> ToTalMedicalVisit(DateTime from, DateTime to)
        {
            return await _repository.CountAsync(q => from <= q.CreationTime && to >= q.CreationTime);
        }

        public async Task<int> TotalDrivinglicense(DateTime from, DateTime to)
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.DriverTest && from <= q.CreationTime && to >= q.CreationTime);
        }

        public async Task<int> TotalHealthCertificationUnder18(DateTime from, DateTime to)
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.ChildrentTest && from <= q.CreationTime && to >= q.CreationTime);
        }

        public async Task<int> TotalHealthCertificationOver18(DateTime from, DateTime to)
        {
            return await _repository.CountAsync(q => q.CertificateType.TypeName == TypeName.AldultTest && from <= q.CreationTime && to >= q.CreationTime);
        }

        public async Task<decimal> TotalRevenue(DateTime from, DateTime to)
        {
            var certificates = _repository.GetAll();
            return certificates.Where(q => from <= q.CreationTime && to >= q.CreationTime).Sum(q => q.AmountPaid);
        }
    }
}

