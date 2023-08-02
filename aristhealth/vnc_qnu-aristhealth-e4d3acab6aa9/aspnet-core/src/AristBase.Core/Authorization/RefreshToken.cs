using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using AristBase.Authorization.Users;
using System;

namespace AristBase.Authorization
{
    public class RefreshToken : Entity<Guid>, ICreationAudited<User>, IModificationAudited<User>, IPassivable
    {
        public string Token { get; set; }
        public string JwtTokenTrim { get; set; }
        public DateTime ExpireTime { get; set; }

        #region Audit
        public DateTime CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public User CreatorUser { get; set; }
        public User LastModifierUser { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        #endregion
        public bool IsActive { get; set; }
        public RefreshToken()
        {
            IsActive = true;
        }
    }
}
