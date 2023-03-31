using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultPropertyTypeValueCreator : DefaultCreator<PropertyTypeValue>
    {
        protected override List<PropertyTypeValue> GetInitial()
        {
            return new List<PropertyTypeValue>
            {
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("C9B09AE1-5E95-4E04-8768-9316EE8CC22F"),
                    Value = "Giấy phép",
                    PropertyTypeId =System.Guid.Parse("9AC041D4-299F-41EA-9104-CCFC5FAE9AB3"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("BE36BBBA-2A33-4FFC-9F76-1951E0039860"),
                    Value = "Văn bản xác nhận thông báo hoạt động",
                    PropertyTypeId =System.Guid.Parse("9AC041D4-299F-41EA-9104-CCFC5FAE9AB3"),
                },

                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("8B7DBD50-2F5E-447A-BF8B-A9FA8283D661"),
                    Value = "Nội tỉnh",
                    PropertyTypeId =System.Guid.Parse("10BD0B7C-FC4E-423B-AA02-20DEE6242E8D"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("102E262E-BAD3-4199-A918-634DAB38F98E"),
                    Value = "Liên tỉnh",
                    PropertyTypeId =System.Guid.Parse("10BD0B7C-FC4E-423B-AA02-20DEE6242E8D"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("6C88787E-D2FA-48B2-9E29-361359A01014"),
                    Value = "Quốc tế",
                    PropertyTypeId =System.Guid.Parse("10BD0B7C-FC4E-423B-AA02-20DEE6242E8D"),
                },

                 new PropertyTypeValue
                {
                    Id = System.Guid.Parse("1F40CD48-412B-4901-8CD3-2E3F3D0AA446"),
                    Value = "Cung cấp dịch vụ chuyển phát cho TMĐT",
                    PropertyTypeId = System.Guid.Parse("1BB38036-90C3-4E10-A1C2-E06ECE814490"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("13865458-4D0F-41F1-B4B0-744A35BB08AD"),
                    Value = "Cung cấp dịch vụ logistics cho TMĐT",
                    PropertyTypeId = System.Guid.Parse("1BB38036-90C3-4E10-A1C2-E06ECE814490"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("6D6C4DEE-0CB9-428E-955D-1C5E59D931C1"),
                    Value = "Có sàn TMĐT",
                    PropertyTypeId = System.Guid.Parse("1BB38036-90C3-4E10-A1C2-E06ECE814490"),
                },

                 new PropertyTypeValue
                {
                    Id = System.Guid.Parse("EFEC263E-093F-445D-B462-58F3CD80F6CF"),
                    Value = "Có website",
                    PropertyTypeId = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("FC0857A7-9989-4675-A757-7A00C7E5C6AC"),
                    Value = "Sử dụng mạng xã hội trong kinh doanh",
                    PropertyTypeId = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("6F158603-2AF5-44D1-854F-CE54CB9A1935"),
                    Value = "Cung cấp dịch vụ qua ứng dụng trên nền tảng di động",
                    PropertyTypeId = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("377DB74C-DE4E-498A-A0C8-26F3D5729AC5"),
                    Value = "Sử dụng chữ kí số trong hợp đồng cung cấp dịch vụ",
                    PropertyTypeId = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                },
                new PropertyTypeValue
                {
                    Id = System.Guid.Parse("C6D2F29F-5D63-499F-9CC7-C82DEB4F4B85"),
                    Value = "Sử dụng kênh thanh toán",
                    PropertyTypeId = System.Guid.Parse("C21AA4EC-9F9C-496F-9664-11DC53FF1C2C"),
                },
            };
        }

        public DefaultPropertyTypeValueCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}
