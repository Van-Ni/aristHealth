using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Timing;
using System;
using System.Threading.Tasks;

namespace AristBase.Authorization
{
    public class RefreshTokenManager : DomainService
    {
        private readonly IRepository<RefreshToken, Guid> _repository;

        public RefreshTokenManager(IRepository<RefreshToken, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<long> GetUserFromToken(string token, string jwtTrim, long userId)
        {
            try
            {
                var refreshToken = await _repository.SingleAsync(t => t.Token == token && t.JwtTokenTrim == jwtTrim && t.CreatorUserId == userId && t.IsActive && t.ExpireTime > Clock.Now);
                refreshToken.IsActive = false;
                refreshToken.LastModifierUserId = userId;
                _repository.Update(refreshToken);

                return (long)refreshToken.CreatorUserId;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
        public async ValueTask AddRefreshToken(RefreshTokenÍnsertDto refreshTokenÍnsertDto)
        {
            await _repository.InsertAsync(ObjectMapper.Map<RefreshToken>(refreshTokenÍnsertDto));
        }
    }
}
