using System.ComponentModel.DataAnnotations;

namespace AristBase.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}