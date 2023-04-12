using Abp.Application.Services;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Timing;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Pkcs;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public static class PDFFieldConst
    {
        public const string SignatureField = "Signature";
        public const string SignImage = "sign_image_";
        public const string SignName = "sign_chuki_";
        public const string Text = "_text_";
        public const string Hvt = "client_text_hovaten";
        public const string Male = "client_checkbox_male";
        public const string Female = "client_checkbox_female";
        public const string Dob = "client_text_dob";
        public const string CCCD = "client_text_cccd";
        public const string CCCDNC = "client_text_cccdngaycap";
        public const string CCCDTai = "client_text_cccdtai";
        public const string Address = "client_text_address";
        public const string Reason = "client_text_lidokham";
        public const string DayText = "sys_text_thu";
        public const string Day = "sys_text_ngay";
        public const string Month = "sys_text_thang";
        public const string Year = "sys_text_nam";


    }
    public class PDFService : ApplicationService, ITransientDependency
    {
        private readonly IRepository<MedicationKeyResult, Guid> _repository;
        private readonly IRepository<Certificate, Guid> _certificateRepository;
        private readonly IRepository<CertificateGroupStatus, Guid> _certificateStatus;

        public PDFService(
            IRepository<MedicationKeyResult, Guid> repository,
            IRepository<Certificate, Guid> certificateRepository,
            IRepository<CertificateGroupStatus, Guid> certificateStatus
            
            )
        {
            _repository = repository;
            this._certificateRepository = certificateRepository;
            this._certificateStatus = certificateStatus;
        }
        public async Task<FileStreamResult> FillPDFWithCertificate(Guid cerId)
        {
            //TODO: Check status 
            var cerStatusData = await _certificateStatus.GetAll()
                .Where(c=>c.CertificateId == cerId).Include(c=>c.User).ToListAsync();
            //var now = Clock.Now;
            var cerUserDic = cerStatusData.ToDictionary(c=>c.Group,c=>c.User);


            var cer =await _certificateRepository.GetAll()
                .Where(c => c.Id == cerId)
                .Include(c => c.CertificateType)
                .Include(c =>c.ClientInfo)
                .SingleAsync();
            switch (cer.CertificateType.Id)
            {
                default:
                    {
                        
                        break;
                    }
            }

            
            var result = await _repository.GetAll().Where(r => r.CertificateId == cerId).ToListAsync();
            var dic = result.ToDictionary(r => r.Key, r => r.Value);

            //Set dic client info
            dic[PDFFieldConst.Hvt] = cer.ClientInfo.FullName;
            dic[PDFFieldConst.Dob] = cer.ClientInfo.DateOfBirth;
            dic[PDFFieldConst.Address] = cer.ClientInfo.Address;
            dic[PDFFieldConst.Reason] = cer.Reason;
            dic[PDFFieldConst.CCCD] = cer.ClientInfo.CCCD;
            dic[PDFFieldConst.CCCDTai] = cer.ClientInfo.AddressCCCD;
            dic[PDFFieldConst.CCCDNC] = cer.ClientInfo.CreateTimeCCCD;
            dic[PDFFieldConst.Female] = cer.ClientInfo.Sex != "nam"? "True" : "False";
            dic[PDFFieldConst.Male] = cer.ClientInfo.Sex == "nam" ? "True" : "False";
            //Prepare datetimedata
            var now = Clock.Now;
            dic[PDFFieldConst.DayText] = now.ToString("dddd", new CultureInfo("vi-VN"));
            dic[PDFFieldConst.Day] = now.ToString("dd");
            dic[PDFFieldConst.DayText] = now.ToString("MM");
            dic[PDFFieldConst.DayText] = now.ToString("yyyy");

            var cername = Guid.NewGuid().ToString("n") + ".pdf";
            var path = PathHelper.GetOutputPath(cername, "giaypheplaixe");
            FiledPDF(cer.CertificateType.FilePath, path, dic, cerUserDic);

            using (var fs = File.OpenRead(path))
            {
                return new FileStreamResult(fs, "application/pdf")
                {
                    FileDownloadName = cername
                };
            }
        }
        public void FiledPDF(string templatePath, string outputPath, Dictionary<string, string> filedValues, Dictionary<string, User> cerUserDic)
        {
            using (FileStream os = new FileStream(outputPath, FileMode.Create))
            {
                using PdfReader reader = new PdfReader(templatePath);
                FillPDF(reader, os, filedValues, cerUserDic);
                reader.Close();
            }
        }
        protected void FillPDF(PdfReader reader, FileStream os, Dictionary<string, string> filedValues, Dictionary<string, User> cerUserDic)
        {            
            PdfStamper stamper = new PdfStamper(reader, os, '\0');
            AcroFields formFields = stamper.AcroFields;
            BaseFont font = BaseFont.CreateFont("./file/times new roman.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            formFields.AddSubstitutionFont(font);
            
            foreach (var field in formFields.Fields)
            {
                
                if (field.Key.StartsWith(PDFFieldConst.SignImage))
                {
                    var keyReplace = field.Key.Replace(PDFFieldConst.SignImage, string.Empty);
                    AddImage(cerUserDic[keyReplace].SignPath, stamper, formFields.GetFieldPositions(field.Key)[0]);
                    continue;
                }
                if (field.Key.StartsWith(PDFFieldConst.SignName))
                {
                    var keyReplace = field.Key.Replace(PDFFieldConst.SignName, string.Empty);
                    formFields.SetField(field.Key, cerUserDic[keyReplace].FullVNMName);
                    continue;
                }
                string value;
                filedValues.TryGetValue(field.Key, out value);
                if (string.IsNullOrEmpty(value))
                {
                    formFields.SetField(field.Key, "#############");
                    continue;
                }
                if (field.Key.Contains(PDFFieldConst.Text))

                    formFields.SetField(field.Key, value);
                else
                {
                    //formFields.GenerateAppearances = false;
                    formFields.SetField(field.Key, value);
                    //formFields.GenerateAppearances = true;
                }

            }
           // SignPdf(filedValues[PDFFieldConst.SignatureField], stamper, formFields.GetFieldPositions(PDFFieldConst.SignatureField)[0]);
            stamper.FormFlattening = true;
            stamper.Close();
        }
        private void AddImage(string imgPath, PdfStamper stamper, AcroFields.FieldPosition pos)
        {
            Rectangle rect = pos.position;
            Image image = Image.GetInstance(imgPath);
            image.SetAbsolutePosition(rect.Left, rect.Bottom);
            image.ScaleToFit(rect.Width, rect.Height);
            PdfContentByte canvas = stamper.GetOverContent(pos.page);
            canvas.AddImage(image);
        }
        private static void SignPdf(string pathToCert, PdfStamper stamper, AcroFields.FieldPosition pos, string passCert = "1234")
        {
            var pass = passCert.ToCharArray();

            FileStream fs;
            try
            {
                fs = new FileStream(pathToCert, FileMode.Open);
            }
            catch (Exception ex)
            {
                return;
            }

            var store = new Pkcs12Store(fs, pass);

            fs.Close();

            var alias = "";

            // searching for private key
            foreach (string al in store.Aliases)
                if (store.IsKeyEntry(al) && store.GetKey(al).Key.IsPrivate)
                {
                    alias = al;
                    break;
                }

            var pk = store.GetKey(alias);

            var chain = store.GetCertificateChain(alias).Select(c => c.Certificate).ToList();

            var parameters = pk.Key as RsaPrivateCrtKeyParameters;

           

            var appearance = stamper.SignatureAppearance;
            appearance.Reason = "MySign";

            Rectangle rect = pos.position;
            appearance.SetVisibleSignature(rect, pos.page, null);
            IExternalSignature pks = new PrivateKeySignature(parameters, DigestAlgorithms.SHA256);
            MakeSignature.SignDetached(appearance, pks, chain, null, null, null, 0, CryptoStandard.CMS);
        }
    }
}
