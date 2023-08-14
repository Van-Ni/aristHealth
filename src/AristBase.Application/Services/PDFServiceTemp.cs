//using Abp.Application.Services;
//using Abp.Dependency;
//using Abp.Domain.Repositories;
//using Abp.Timing;
//using AristBase.Authorization.Users;
//using AristBase.BaseEntity;
//using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using iTextSharp.text.pdf.security;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Org.BouncyCastle.Crypto.Parameters;
//using Org.BouncyCastle.Pkcs;
//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.IO;
//using System.Linq;
//using System.Threading.Tasks;

//namespace AristBase.Services
//{

//    public class PDFService : ApplicationService, ITransientDependency
//    {
//        private readonly IRepository<Certificate, Guid> _certificateRepository;
//        private readonly IRepository<CertificateGroupStatus, Guid> _certificateStatus;

//        public PDFService(
//            IRepository<Certificate, Guid> certificateRepository,
//            IRepository<CertificateGroupStatus, Guid> certificateStatus

//            )
//        {
//            this._certificateRepository = certificateRepository;
//            this._certificateStatus = certificateStatus;
//        }
//        public async Task<ActionResult> FillPDFWithCertificate(Guid cerId)
//        {
//            //TODO: Check status 
//            var cerStatusData = await _certificateStatus.GetAll()
//                .Where(c => c.CertificateId == cerId).Include(c => c.User).ToListAsync();
//            //var now = Clock.Now;
//            var cerUserDic = cerStatusData.ToDictionary(c => c.Group, c => ObjectMapper.Map<CertificateGroupStatusDto>(c));


//            var cer = await _certificateRepository.GetAll()
//                .Where(c => c.Id == cerId)
//                .Include(c => c.CertificateType)
//                .Include(c => c.ClientInfo)
//                .SingleAsync();


//            // var result = await _repository.GetAll().Where(r => r.CertificateId == cerId).ToListAsync();

//            // var dic = result.ToDictionary(r => r.Key, r => r.Value);

//            //Set dic client info
//            // dic[PDFFieldConst.SoYTe] = "SỞ Y TẾ GIA LAI";
//            // dic[PDFFieldConst.TT] = "TRUNG TÂM GIÁM ĐỊNH Y KHOA";
//            //Set clientInfo status 

//            var dic = new Dictionary<string, Values>();
//            dic[PDFFieldConst.Hvt] = new Values
//            {
//                Value = cer.ClientInfo.FullName
//            };
//            dic[PDFFieldConst.Dob] = new Values
//            {
//                Value = cer.ClientInfo.DateOfBirth
//            };
//            dic[PDFFieldConst.Address] = new Values { Value = cer.ClientInfo.Address };
//            dic[PDFFieldConst.Reason] = new Values { Value = cer.Reason };
//            dic[PDFFieldConst.CCCD] = new Values { Value = cer.ClientInfo.CCCD };
//            dic[PDFFieldConst.CCCDTai] = new Values { Value = cer.ClientInfo.AddressCCCD };
//            dic[PDFFieldConst.CCCDNC] = new Values { Value = cer.ClientInfo.CreateTimeCCCD };
//            dic[PDFFieldConst.Female] = new Values { Value = cer.ClientInfo.Sex == "nu" ? "true" : "false" };
//            dic[PDFFieldConst.Male] = new Values { Value = cer.ClientInfo.Sex == "nam" ? "true" : "false" };
//            var clientInfo = new CertificateGroupStatusDto
//            {
//                Group = "client",
//                Content = dic
//            };
//            cerUserDic[clientInfo.Group] = clientInfo;
//            // Prepare datetimedata
//            var now = Clock.Now;
//            dic = new Dictionary<string, Values>();
//            // dic[PDFFieldConst.So] = "";
//            dic[PDFFieldConst.DayText] = new Values { Value = now.ToString("dddd", new CultureInfo("vi-VN")) };
//            dic[PDFFieldConst.Day] = new Values { Value = now.ToString("dd") };
//            dic[PDFFieldConst.Month] = new Values { Value = now.ToString("MM") };
//            dic[PDFFieldConst.Year] = new Values { Value = now.ToString("yyyy") };
//            var sys = new CertificateGroupStatusDto
//            {
//                Group = "sys",
//                Content = dic
//            };
//            cerUserDic[sys.Group] = sys;
//            //dic[PDFFieldConst.TTNBTH] = new Values { Value = dic["mat_radio_thitruong_ngang"] == "bth" ? "true" : "false" };
//            //dic[PDFFieldConst.TTNHC] = dic["mat_radio_thitruong_ngang"] == "hc" ? "true" : "false";
//            //dic[PDFFieldConst.TTDBTH] = dic["mat_radio_thitruong_dung"] == "bth" ? "true" : "false";
//            //dic[PDFFieldConst.TTDHC] = dic["mat_radio_thitruong_dung"] == "hc" ? "true" : "false";

//            var cername = Guid.NewGuid().ToString("n") + ".pdf";
//            var path = PathHelper.GetOutputPath(cername, cer.CertificateTypeId.ToString());
//            FiledPDF(cer.CertificateType.FilePath, path, cerUserDic);

//            cer.FileResult = path;
//            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

//            return new FileStreamResult(fileStream, "application/pdf")
//            {
//                FileDownloadName = cername
//            };

//        }

//        public async Task<FileResult> GetPDFFile(string path)
//        {
//            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

//            return new FileStreamResult(fileStream, "application/pdf");
//        }
//        void FiledPDF(string templatePath, string outputPath, Dictionary<string, CertificateGroupStatusDto> cerUserDic)
//        {
//            using (FileStream os = new FileStream(outputPath, FileMode.Create))
//            {
//                using PdfReader reader = new PdfReader(templatePath);
//                FillPDF(reader, os, cerUserDic);
//                reader.Close();
//            }
//        }
//        protected void FillPDF(PdfReader reader, FileStream os, Dictionary<string, CertificateGroupStatusDto> cerUserDic)
//        {
//            PdfStamper stamper = new PdfStamper(reader, os, '\0');
//            AcroFields formFields = stamper.AcroFields;
//            BaseFont font = BaseFont.CreateFont(PathHelper.FontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

//            formFields.AddSubstitutionFont(font);

//            foreach (var field in formFields.Fields)
//            {
//                var keys = field.Key.Split("_");
//                if (cerUserDic.TryGetValue(keys[0], out var group))
//                {
//                    if (field.Key.EndsWith(PDFFieldConst.SignImage))
//                    {
//                        var keyReplace = field.Key.Replace(PDFFieldConst.SignImage, string.Empty);
//                        AddImage(group.User.SignPath, stamper, formFields.GetFieldPositions(field.Key)[0]);
//                        continue;
//                    }
//                    else if (field.Key.EndsWith(PDFFieldConst.SignName))
//                    {
//                        var keyReplace = field.Key.Replace(PDFFieldConst.SignName, string.Empty);
//                        formFields.SetField(field.Key, group.User.FullName);
//                        formFields.SetFieldProperty(field.Key, "textfont", font, null);
//                        continue;
//                    }
//                    else
//                    {

//                        var contentKey = string.Join("_", keys.Skip(1));
//                        if (group.Content.TryGetValue(contentKey, out var contentValue) && contentValue != null)
//                        {
//                            formFields.SetField(field.Key, contentValue.Value);
//                            formFields.SetFieldProperty(field.Key, "textfont", font, null);
//                            continue;
//                        }
//                    }
//                }
//                //Set field empty
//                formFields.SetField(field.Key, string.Empty);



//                //string value;
//                //filedValues.TryGetValue(field.Key, out value);
//                //if (string.IsNullOrEmpty(value))
//                //{
//                //    formFields.SetField(field.Key, "");
//                //    continue;
//                //}

//                //if (filedValues.Keys.Contains(PDFFieldConst.RADIO_FIX) || filedValues.Keys.Contains(PDFFieldConst.CHECKBOX_FIX))
//                //{
//                //    formFields.GenerateAppearances = false;
//                //    formFields.SetField(field.Key, value);
//                //    //formFields.SetFieldProperty(field.Key, "textfont", font, null);
//                //    formFields.GenerateAppearances = true;
//                //}
//                //else
//                //{
//                //    formFields.SetField(field.Key, value);
//                //    formFields.SetFieldProperty(field.Key, "textfont", font, null);
//                //}

//            }
//            // SignPdf(filedValues[PDFFieldConst.SignatureField], stamper, formFields.GetFieldPositions(PDFFieldConst.SignatureField)[0]);
//            stamper.FormFlattening = true;
//            stamper.Close();
//        }
//        private void AddImage(string imgPath, PdfStamper stamper, AcroFields.FieldPosition pos)
//        {
//            Rectangle rect = pos.position;
//            Image image = Image.GetInstance(imgPath);
//            image.SetAbsolutePosition(rect.Left, rect.Bottom);
//            image.ScaleToFit(rect.Width, rect.Height);
//            PdfContentByte canvas = stamper.GetOverContent(pos.page);
//            canvas.AddImage(image);
//        }
//        private static void SignPdf(string pathToCert, PdfStamper stamper, AcroFields.FieldPosition pos, string passCert = "1234")
//        {
//            var pass = passCert.ToCharArray();

//            FileStream fs;
//            try
//            {
//                fs = new FileStream(pathToCert, FileMode.Open);
//            }
//            catch (Exception ex)
//            {
//                return;
//            }

//            var store = new Pkcs12Store(fs, pass);

//            fs.Close();

//            var alias = "";

//            // searching for private key
//            foreach (string al in store.Aliases)
//                if (store.IsKeyEntry(al) && store.GetKey(al).Key.IsPrivate)
//                {
//                    alias = al;
//                    break;
//                }

//            var pk = store.GetKey(alias);

//            var chain = store.GetCertificateChain(alias).Select(c => c.Certificate).ToList();

//            var parameters = pk.Key as RsaPrivateCrtKeyParameters;



//            var appearance = stamper.SignatureAppearance;
//            appearance.Reason = "MySign";

//            Rectangle rect = pos.position;
//            appearance.SetVisibleSignature(rect, pos.page, null);
//            IExternalSignature pks = new PrivateKeySignature(parameters, DigestAlgorithms.SHA256);
//            MakeSignature.SignDetached(appearance, pks, chain, null, null, null, 0, CryptoStandard.CMS);
//        }
//    }
//}
