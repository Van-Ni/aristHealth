using Abp.Timing;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultPropertyTypeCreator : DefaultCreator<PropertyType>
    {
        protected override List<PropertyType> GetInitial()
        {
            return new List<PropertyType>
            {
                new PropertyType
                {
                    Id = System.Guid.Parse("9AC041D4-299F-41EA-9104-CCFC5FAE9AB3"),
                    Name = "Loại giấy phép",
                    DepartmentId =System.Guid.Parse("84C4995D-BEAD-4443-876D-188B1B79AD5B"),
                },
                new PropertyType
                {
                    Id = System.Guid.Parse("10BD0B7C-FC4E-423B-AA02-20DEE6242E8D"),
                    Name = "Phạm vi cung ứng",
                    DepartmentId =System.Guid.Parse("84C4995D-BEAD-4443-876D-188B1B79AD5B"),
                },
                new PropertyType
                {
                    Id = System.Guid.Parse("1BB38036-90C3-4E10-A1C2-E06ECE814490"),
                    Name = "Mức độ tham gia TMĐT",
                    DepartmentId =System.Guid.Parse("84C4995D-BEAD-4443-876D-188B1B79AD5B"),
                },
                new PropertyType
                {
                    Id = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                    Name = "Ứng dụng công nghệ",
                    DepartmentId =System.Guid.Parse("84C4995D-BEAD-4443-876D-188B1B79AD5B"),
                },
            };
        }

        public DefaultPropertyTypeCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}
