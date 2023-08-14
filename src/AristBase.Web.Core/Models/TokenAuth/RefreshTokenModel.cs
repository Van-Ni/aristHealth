using System.ComponentModel.DataAnnotations;
using Abp.Auditing;

namespace AristBase.Models.TokenAuth
{
    public class RefreshTokenModel
    {
        [Required]
        [MinLength(15)]
        [DisableAuditing]
        public string AccessToken { get; set; }

        [Required]
        [MinLength(15)]
        [DisableAuditing]
        public string RefreshToken { get; set; }
    }
}
