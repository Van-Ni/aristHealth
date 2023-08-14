#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/AristBase.Web.Host/AristBase.Web.Host.csproj", "src/AristBase.Web.Host/"]
COPY ["src/AristBase.Web.Core/AristBase.Web.Core.csproj", "src/AristBase.Web.Core/"]
COPY ["src/AristBase.Application/AristBase.Application.csproj", "src/AristBase.Application/"]
COPY ["src/AristBase.Core/AristBase.Core.csproj", "src/AristBase.Core/"]
COPY ["src/AristBase.EntityFrameworkCore/AristBase.EntityFrameworkCore.csproj", "src/AristBase.EntityFrameworkCore/"]
RUN dotnet restore "src/AristBase.Web.Host/AristBase.Web.Host.csproj"
COPY . .
WORKDIR "/src/src/AristBase.Web.Host"
RUN dotnet build "AristBase.Web.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AristBase.Web.Host.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AristBase.Web.Host.dll"]