using System.Threading.Tasks;
using AristBase.Configuration.Dto;

namespace AristBase.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
