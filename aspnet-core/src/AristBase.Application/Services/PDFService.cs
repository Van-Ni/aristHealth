using Abp.Application.Services;
using Abp.Dependency;
using Abp.Domain.Repositories;
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
    }
    public class PDFService : ApplicationService, ITransientDependency
    {
        private readonly IRepository<MedicationKeyResult, Guid> _repository;

        public PDFService(IRepository<MedicationKeyResult, Guid> repository)
        {
            _repository = repository;
        }
        public async Task<FileStreamResult> FillPDFWithCertificate(string templatePath, Guid cerId)
        {
            var cername = Guid.NewGuid().ToString("n");
            var result = await _repository.GetAll().Where(r => r.CertificateId == cerId).ToListAsync();
            var dic = result.ToDictionary(r => r.Key, r => r.Value);
            var ms = FiledPDF(templatePath, "./pdf/outputs/" + cername + ".pdf", dic);
            return new FileStreamResult(ms, "application/pdf");
        }
        public FileStream FiledPDF(string templatePath, string outputPath, Dictionary<string, string> filedValues)
        {
            using FileStream os = new FileStream(outputPath, FileMode.Create);
            using PdfReader reader = new PdfReader(templatePath);
            FillPDF(reader, os, filedValues);
            reader.Close();
            return os;
        }
        protected void FillPDF(PdfReader reader, FileStream os, Dictionary<string, string> filedValues)
        {            
            PdfStamper stamper = new PdfStamper(reader, os, '\0');
            AcroFields formFields = stamper.AcroFields;
            BaseFont font = BaseFont.CreateFont("./file/times new roman.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            formFields.AddSubstitutionFont(font);
            
            foreach (var field in formFields.Fields)
            {
                string value;
                filedValues.TryGetValue(field.Key, out value);

                if (string.IsNullOrEmpty(value))
                {
                    formFields.SetField(field.Key, "#############");
                    continue;
                }
                if (field.Key.StartsWith("image_"))
                {
                    AddImage(filedValues[field.Key], stamper, formFields.GetFieldPositions(field.Key)[0]);
                }

                if (field.Key.Contains(PDFFieldConst.Text))

                    formFields.SetField(field.Key, value);
                else
                {
                    formFields.GenerateAppearances = false;
                    formFields.SetField(field.Key, value);
                    formFields.GenerateAppearances = true;
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
