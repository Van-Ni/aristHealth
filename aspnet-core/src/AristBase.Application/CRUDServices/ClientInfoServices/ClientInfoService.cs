using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.ClientInfoServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ClientInfoServices
{
    public class ClientInfoService : AsyncCrudAppService<ClientInfo, ClientInfoDto, int>
    {
        public ClientInfoService(IRepository<ClientInfo, int> repository) : base(repository)
        {
        }
    }
}
