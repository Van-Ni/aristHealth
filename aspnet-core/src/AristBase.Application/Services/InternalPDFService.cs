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
    public class InternalPDFService : AbpServiceBase, ITransientDependency
    {
        private readonly IRepository<Certificate, Guid> _certificateRepository;
        private readonly IRepository<CertificateGroupStatus, Guid> _certificateStatus;
        private readonly IRepository<CertificateSync> _syncRepo;

        public InternalPDFService(
            IRepository<Certificate, Guid> certificateRepository,
            IRepository<CertificateGroupStatus, Guid> certificateStatus,
            IRepository<CertificateSync> syncRepo
            )
        {
            this._certificateRepository = certificateRepository;
            this._certificateStatus = certificateStatus;
            this._syncRepo = syncRepo;
        }
        public async Task<FileStreamResult> FillPDFWithCertificate(Guid cerId)
        {
            var cerStatusData = await _certificateStatus.GetAll()
                 .Where(c => c.CertificateId == cerId).Include(c => c.User).ToListAsync();
            if (cerStatusData.Any(c => c.Status == GroupStatus.UNREADY))
            {
                throw new UserFriendlyException("Vui lòng khám đầy đủ");
            }
            var unSignUser = cerStatusData.Where(c => c.Status == GroupStatus.SUBMITTED && string.IsNullOrEmpty(c.User.SignPath)).Select(c => c.User.FullName).Distinct();
            if (unSignUser.Any())
            {
                throw new UserFriendlyException(string.Format("Chưa có chữ ký: {0}", string.Join(", ", unSignUser)));
            };
            //var now = Clock.Now;
            var cerUserDic = cerStatusData.ToDictionary(c => c.Group, c => ObjectMapper.Map<CertificateGroupStatusDto>(c));
            if(cerUserDic.TryGetValue("mat", out var mat))
            {
                if(mat.Content.TryGetValue(PDFFieldConst.TTD,out var ttdValue))
                {
                    if (ttdValue.Value.Equals("bth"))
                    {
                        mat.Content[PDFFieldConst.TTDBTH] = new Values { Value = "X" };
                    }else
                    {
                        mat.Content[PDFFieldConst.TTDHC] = new Values { Value = "X" };
                    }
                }
                if (mat.Content.TryGetValue(PDFFieldConst.TTN, out var ttnValue))
                {
                    if (ttnValue.Value.Equals("bth"))
                    {
                        mat.Content[PDFFieldConst.TTNBTH] = new Values { Value = "X" };
                    }
                    else
                    {
                        mat.Content[PDFFieldConst.TTNHC] = new Values { Value = "X" };
                    }
                }
            };

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
            dic[PDFFieldConst.Address] = new Values { Value = string.Join(", ", cer.ClientInfo.Address, cer.ClientInfo.Commune, " ") };
            dic[PDFFieldConst.Address1] = new Values { Value = string.Join(", ", cer.ClientInfo.District, cer.ClientInfo.Province) };
            dic[PDFFieldConst.Reason] = new Values { Value = cer.Reason };
            dic[PDFFieldConst.CCCD] = new Values { Value = cer.ClientInfo.CCCD };
            dic[PDFFieldConst.CCCDTai] = new Values { Value = cer.ClientInfo.AddressCCCD };
            dic[PDFFieldConst.CCCDNC] = new Values { Value = cer.ClientInfo.CreateTimeCCCD };
            dic[PDFFieldConst.Sex] = new Values { Value = cer.ClientInfo.Sex };
            dic[PDFFieldConst.CrossNam] = new Values
            {
                Value = cer.ClientInfo.Sex.Equals("nam", StringComparison.OrdinalIgnoreCase) 
                ? PathHelper.CrossPath : ""
            };
            dic[PDFFieldConst.HvtGuardian] = new Values { Value = cer.ClientInfo.GuardianName };
            var clientInfo = new CertificateGroupStatusDto
            {
                Group = "client",
                Content = dic,
                Status = GroupStatus.SUBMITTED
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
            if (cer.CertificateType.IsNeedSync)
            {
                var xml = await _syncRepo.GetAll().Where(s => s.CertificateId == cerId).Select(c => c.MetaData).SingleAsync();
                dic[PDFFieldConst.So] = new Values { Value = xml.SO };            }
            var sys = new CertificateGroupStatusDto
            {
                Group = "sys",
                Content = dic,
                Status = GroupStatus.SUBMITTED
            };
            cerUserDic[sys.Group] = sys;
            //dic[PDFFieldConst.TTNBTH] = new Values { Value = dic["mat_radio_thitruong_ngang"] == "bth" ? "true" : "false" };
            //dic[PDFFieldConst.TTNHC] = dic["mat_radio_thitruong_ngang"] == "hc" ? "true" : "false";
            //dic[PDFFieldConst.TTDBTH] = dic["mat_radio_thitruong_dung"] == "bth" ? "true" : "false";
            //dic[PDFFieldConst.TTDHC] = dic["mat_radio_thitruong_dung"] == "hc" ? "true" : "false";
            var cername = cer.ClientInfo.FullName.RemoveDiacritics() + Clock.Now.ToString("ddMMyyyhhmmsssss") + ".pdf";
            var path = PathHelper.GetOutputPath(cername, cer.CertificateTypeId.ToString());
            FiledPDF(cer.CertificateType.FilePath, path, cerUserDic);

            cer.FileResult = path;
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

            return new FileStreamResult(fileStream, "application/pdf")
            {
                FileDownloadName = System.IO.Path.GetFileName(path)
            };


        }
        void FiledPDF(string templatePath, string outputPath, Dictionary<string, CertificateGroupStatusDto> cerUserDic)
        {
            using var read = new PdfReader(templatePath);
            using var write = new PdfWriter(outputPath);
            using PdfDocument pdfDoc = new PdfDocument(read, write);
            PdfAcroForm form = PdfAcroForm.GetAcroForm(pdfDoc, true);
            FillPDF(form, cerUserDic, pdfDoc);
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
                    if (field.Key.Contains(PDFFieldConst.CrossNam))
                    {
                        var contentKey = string.Join("_", keys.Skip(1));
                        if (group.Content.TryGetValue(contentKey, out var contentValue) && contentValue != null)
                        {
                            if (!string.IsNullOrEmpty(contentValue.Value))
                            {
                                field.Value.SetValue("X", font, 50f);
                                continue;
                            }
                        }
                    }
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
                            if (string.IsNullOrEmpty(contentValue.Value))
                            {
                                continue;
                            }
                            else if (field.Value.GetFormType() == PdfName.Btn)
                            {
                                field.Value.SetCheckType(PdfFormField.TYPE_CROSS);//PdfFormField.TYPE_CIRCLE,PdfFormField.TYPE_CROSS,PdfFormField.TYPE_DIAMOND,PdfFormField.TYPE_SQUARE,PdfFormField.TYPE_STAR,etc
                              
                                if (!string.Equals(contentValue.Value, "false", StringComparison.OrdinalIgnoreCase))
                                    field.Value.SetValue(contentValue.Value, false);
                            }
                            else
                            {
                                //var skip = PDFFieldConst.MaxLength;
                                //var valueStr = contentValue.Value.Split(" ");
                                //var currentKey = field.Key;
                                //var currentValue = contentValue.Value;
                                //do
                                //{
                                //    valueStr = valueStr.Skip(skip).to;
                                //}
                                //while(valueStr.Length > skip)
                                //{


                                //}


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
