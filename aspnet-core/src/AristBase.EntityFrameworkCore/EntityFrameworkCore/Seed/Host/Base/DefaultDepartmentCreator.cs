using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultDepartmentCreator : DefaultCreator<Department>
    {
        protected override List<Department> GetInitial()
        {
            return new List<Department>
            {
                new Department
                {
                    Id = System.Guid.Parse("84C4995D-BEAD-4443-876D-188B1B79AD5B"),
                    Name = "Bưu chính",
                }
            };
        }

        public DefaultDepartmentCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}
