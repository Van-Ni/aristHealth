using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class GroupStatusService : KeyValueBaseService
    {
        public GroupStatusService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
    }
}
