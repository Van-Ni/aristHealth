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
    public class ClientInfoService : AsyncCrudAppService<ClientInfo, ClientInfoDto, int, ClientInfoDto, CreateClientInfoDto, ClientInfoDto>
    {
        public ClientInfoService(IRepository<ClientInfo, int> repository) : base(repository)
        {
        }
        public async override Task<ClientInfoDto> CreateAsync(CreateClientInfoDto input)
        {
            try
            {
                return await base.CreateAsync(input);
            }
            catch (Exception ex) { throw new Exception(); }
        }
    }
}
