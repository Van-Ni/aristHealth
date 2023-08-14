using Abp.MultiTenancy;
using AristBase.Authorization.Users;

namespace AristBase.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public string AgencyName { get; set; }
        public Tenant()
        {
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
