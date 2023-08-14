using System.Threading.Tasks;
using AristBase.Models.TokenAuth;
using AristBase.Web.Controllers;
using Shouldly;
using Xunit;

namespace AristBase.Web.Tests.Controllers
{
    public class HomeController_Tests: AristBaseWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}