using Abp.Domain.Repositories;
using Abp.Timing;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.BaseEntity.XML;
using AristBase.CRUDServices.ApproveServices.Dto;
using AristBase.CRUDServices.SyncService.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace AristBase.CRUDServices.SyncService
{
    public sealed class Utf8StringWriter : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }
    public class SyncService : AsyncCrudPermissonAppService<CertificateSync, CertificateSyncDto, int>
    {
        private readonly IMapper _mapper;

        public SyncService(IRepository<CertificateSync, int> repository, IMapper _mapper) : base(repository, PermissionNames.Sync)
        {
            this._mapper = _mapper;
        }
        public async Task<CertificateSyncDto> GetSyncCertificate()
        {
            CheckGetAllPermission();
            var result = await Repository.GetAll().Where(c=>c.SyncStatus == SyncStatus.init).OrderBy(c=>c.CreationTime).FirstOrDefaultAsync();
            var xmlDto =  MapToEntityDto(result);
            if(xmlDto != null)
            {
                xmlDto.XmlUnSign = ToXMLString(xmlDto.MetaData);
            }
            
            return xmlDto;
        }
        string ToXMLString(CertificateDataSync certificateSync)
        {
            var currentYear = Clock.Now.ToString("yyyy");
            var obj = _mapper.Map<XMLUnsign>(certificateSync);
            obj.ACTION = string.Format("{0}LX{1}{2}", obj.IDBENHVIEN, Clock.Now.ToString("yy"), obj.SO.Substring(0, 5));
            var yob = string.Join("",certificateSync.NGAYSINH.TakeLast(4));
            obj.TUOI = int.Parse(currentYear) - int.Parse(yob);
            XmlSerializer serializer = new XmlSerializer(typeof(XMLUnsign));
            using (var stringWriter = new Utf8StringWriter())
            {
                serializer.Serialize(stringWriter, obj);
                string xmlString = stringWriter.ToString();

                return xmlString;
            }
        }
        public async Task UpdateXmlSyncSyncCertificate(UpdateSyncRequest certificateSync)
        {
            CheckUpdatePermission();
            var result = await Repository.GetAll().Where(c => c.Id == certificateSync.Id && c.SyncStatus == SyncStatus.init).FirstOrDefaultAsync();
            result.XmlEncrypted = certificateSync.XmlEncrypted;
            result.SyncStatus = SyncStatus.readyToSync;
        }
    }
}
