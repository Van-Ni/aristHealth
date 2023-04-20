using Abp.Domain.Repositories;
using Abp.Timing;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using iText.Forms.Fields;
using iText.Forms;
using iText.IO.Font;
using iText.IO.Image;
using iText.Kernel.Font;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp;
using Microsoft.EntityFrameworkCore;
using AristBase.Extensions;
using iText.Kernel.Geom;
using Abp.UI;

namespace AristBase.Services
{
    public class InternalPDFService: AbpServiceBase, ITransientDependency 
    {
        private readonly IRepository<Certificate, Guid> _certificateRepository;
        private readonly IRepository<CertificateGroupStatus, Guid> _certificateStatus;

        public InternalPDFService(
            IRepository<Certificate, Guid> certificateRepository,
            IRepository<CertificateGroupStatus, Guid> certificateStatus

            )
        {
            this._certificateRepository = certificateRepository;
            this._certificateStatus = certificateStatus;
        }
        public async Task<ActionResult> FillPDFWithCertificate(Guid cerId)
        {
            var cerStatusData = await _certificateStatus.GetAll()
                 .Where(c => c.CertificateId == cerId).Include(c => c.User).ToListAsync();
            if(cerStatusData.Any(c=>c.Status == GroupStatus.UNREADY))
            {
                throw new UserFriendlyException("Vui lòng khám đầy đủ");
            }
            //var now = Clock.Now;
            var cerUserDic = cerStatusData.ToDictionary(c => c.Group, c => ObjectMapper.Map<CertificateGroupStatusDto>(c));


            var cer = await _certificateRepository.GetAll()
                .Where(c => c.Id == cerId)
                .Include(c => c.CertificateType)
                .Include(c => c.ClientInfo)
                .SingleAsync();


            // var result = await _repository.GetAll().Where(r => r.CertificateId == cerId).ToListAsync();

            // var dic = result.ToDictionary(r => r.Key, r => r.Value);

            //Set dic client info
            // dic[PDFFieldConst.SoYTe] = "SỞ Y TẾ GIA LAI";
            // dic[PDFFieldConst.TT] = "TRUNG TÂM GIÁM ĐỊNH Y KHOA";
            //Set clientInfo status 

            var dic = new Dictionary<string, Values>();
            dic[PDFFieldConst.Hvt] = new Values
            {
                Value = cer.ClientInfo.FullName
            };
            dic[PDFFieldConst.Dob] = new Values
            {
                Value = cer.ClientInfo.DateOfBirth
            };
            dic[PDFFieldConst.Address] = new Values { Value = cer.ClientInfo.Address };
            dic[PDFFieldConst.Reason] = new Values { Value = cer.Reason };
            dic[PDFFieldConst.CCCD] = new Values { Value = cer.ClientInfo.CCCD };
            dic[PDFFieldConst.CCCDTai] = new Values { Value = cer.ClientInfo.AddressCCCD };
            dic[PDFFieldConst.CCCDNC] = new Values { Value = cer.ClientInfo.CreateTimeCCCD };
            dic[PDFFieldConst.Sex] = new Values { Value = cer.ClientInfo.Sex };
            dic[PDFFieldConst.HvtGuardian] = new Values { Value = cer.ClientInfo.GuardianName };
            var clientInfo = new CertificateGroupStatusDto
            {
                Group = "client",
                Content = dic
            };
            cerUserDic[clientInfo.Group] = clientInfo;
            // Prepare datetimedata
            var now = Clock.Now;
            dic = new Dictionary<string, Values>();
            // dic[PDFFieldConst.So] = "";
            dic[PDFFieldConst.DayText] = new Values { Value = now.ToString("dddd", new CultureInfo("vi-VN")) };
            dic[PDFFieldConst.Day] = new Values { Value = now.ToString("dd") };
            dic[PDFFieldConst.Month] = new Values { Value = now.ToString("MM") };
            dic[PDFFieldConst.Year] = new Values { Value = now.ToString("yyyy") };
            var sys = new CertificateGroupStatusDto
            {
                Group = "sys",
                Content = dic
            };
            cerUserDic[sys.Group] = sys;
            //dic[PDFFieldConst.TTNBTH] = new Values { Value = dic["mat_radio_thitruong_ngang"] == "bth" ? "true" : "false" };
            //dic[PDFFieldConst.TTNHC] = dic["mat_radio_thitruong_ngang"] == "hc" ? "true" : "false";
            //dic[PDFFieldConst.TTDBTH] = dic["mat_radio_thitruong_dung"] == "bth" ? "true" : "false";
            //dic[PDFFieldConst.TTDHC] = dic["mat_radio_thitruong_dung"] == "hc" ? "true" : "false";
            var cername = cer.ClientInfo.FullName.RemoveDiacritics() + Clock.Now.ToString("ddMMyyyhhmmsssss")+".pdf";
            var path = PathHelper.GetOutputPath(cername, cer.CertificateTypeId.ToString());
            FiledPDF(cer.CertificateType.FilePath, path, cerUserDic);

            cer.FileResult = path;
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

            return new FileStreamResult(fileStream, "application/pdf")
            {
                FileDownloadName = System.IO.Path.GetFileName(path)
            };


        }

        public async Task<FileResult> GetPDFFile(string path)
        {
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

            return new FileStreamResult(fileStream, "application/pdf");
        }
        void FiledPDF(string templatePath, string outputPath, Dictionary<string, CertificateGroupStatusDto> cerUserDic)
        {
            PdfDocument pdfDoc = new PdfDocument(new PdfReader(templatePath), new PdfWriter(outputPath));
            PdfAcroForm form = PdfAcroForm.GetAcroForm(pdfDoc, true);
            FillPDF(form, cerUserDic, pdfDoc);
            pdfDoc.Close();
        }
        protected void FillPDF(PdfAcroForm form, Dictionary<string, CertificateGroupStatusDto> cerUserDic, PdfDocument pdfDoc)
        {
            // BaseFont font = BaseFont.CreateFont("./file/arial.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            // formFields.AddSubstitutionFont(font);
            PdfFont font = PdfFontFactory.CreateFont(PathHelper.FontPath, PdfEncodings.IDENTITY_H);
            var fields = form.GetFormFields();


            foreach (var field in fields)
            {
                var keys = field.Key.Split("_");
                if (cerUserDic.TryGetValue(keys[0], out var group))
                {
                    if (group.Status != GroupStatus.SUBMITTED)
                    {
                        continue;
                    }
                    if (field.Key.EndsWith(PDFFieldConst.SignImage))
                    {
                        
                            FillImage(form, field.Value, group.User.SignPath, pdfDoc);
                        continue;
                    }
                    else if (field.Key.EndsWith(PDFFieldConst.SignName))
                    {                        
                            field.Value.SetValue(group.User.FullName, font, 12f);
                        continue;
                    }
                    else
                    {

                        var contentKey = string.Join("_", keys.Skip(1));
                        if (group.Content.TryGetValue(contentKey, out var contentValue) && contentValue != null)
                        {
                            if (field.Value.GetFormType() == PdfName.Btn)
                            {
                                field.Value.SetCheckType(PdfFormField.TYPE_CHECK);//PdfFormField.TYPE_CIRCLE,PdfFormField.TYPE_CROSS,PdfFormField.TYPE_DIAMOND,PdfFormField.TYPE_SQUARE,PdfFormField.TYPE_STAR,etc

                                if (!string.IsNullOrEmpty(contentValue.Value))
                                    field.Value.SetValue(contentValue.Value, true);
                            }
                            else
                            {
                                field.Value.SetValue(contentValue.Value, font, 12f);
                            }
                            continue;
                        }
                    }
                }

                //field.Value.SetValue(string.Empty, font, 12f);


            }
            form.FlattenFields();
        }

        private void FillImage(PdfAcroForm form, PdfFormField field, string imagePath, PdfDocument pdfDoc)
        {
            PdfArray sizingArray = field.GetWidgets()[0].GetRectangle();

            var width = (float)(sizingArray.GetAsNumber(2).GetValue() - sizingArray.GetAsNumber(0).GetValue());
            var height = (float)(sizingArray.GetAsNumber(3).GetValue() - sizingArray.GetAsNumber(1).GetValue());
            var rect = new Rectangle(sizingArray.GetAsNumber(0).FloatValue(),
                sizingArray.GetAsNumber(1).FloatValue(),
            width,
                height);

            PdfCanvas pdfCanvas = new PdfCanvas(pdfDoc, pdfDoc.GetPageNumber(field.GetWidgets()[0].GetPage()));

            pdfCanvas.AddImageFittedIntoRectangle(ImageDataFactory.Create(imagePath), rect, false);
        }
    }
}
