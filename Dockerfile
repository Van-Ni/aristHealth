FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/AristBase.Web.Host/AristBase.Web.Host.csproj", "src/AristBase.Web.Host/"]
COPY ["src/AristBase.Web.Core/AristBase.Web.Core.csproj", "src/AristBase.Web.Core/"]
COPY ["src/AristBase.Application/AristBase.Application.csproj", "src/AristBase.Application/"]
COPY ["src/AristBase.Core/AristBase.Core.csproj", "src/AristBase.Core/"]
COPY ["src/AristBase.EntityFrameworkCore/AristBase.EntityFrameworkCore.csproj", "src/AristBase.EntityFrameworkCore/"]
WORKDIR "/src/src/AristBase.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/AristBase.Web.Host", "src/AristBase.Web.Host"]
COPY ["src/AristBase.Web.Core", "src/AristBase.Web.Core"]
COPY ["src/AristBase.Application", "src/AristBase.Application"]
COPY ["src/AristBase.Core", "src/AristBase.Core"]
COPY ["src/AristBase.EntityFrameworkCore", "src/AristBase.EntityFrameworkCore"]
WORKDIR "/src/src/AristBase.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "AristBase.Web.Host.dll"]
