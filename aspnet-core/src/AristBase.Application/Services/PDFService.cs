using Abp;
using Abp.Application.Services;
using Abp.Dependency;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace AristBase.Services
{
    public class PDFService : ApplicationService, ITransientDependency
    {

        public void FiledPDF(string templatePath, string outputPath, Dictionary<string, string> filedValues)
        {
            using FileStream os = new FileStream(outputPath, FileMode.Create);
            using PdfReader reader = new PdfReader(templatePath);
            FillPDF(reader, os, filedValues);

        }

        protected void FillPDF(PdfReader reader, FileStream os, Dictionary<string, string> filedValues)
        {
            PdfStamper stamper = new PdfStamper(reader, os);
            

            AcroFields formFields = stamper.AcroFields;
            foreach (var field in formFields.Fields)
            {
                string value;
                filedValues.TryGetValue(field.Key, out value);
                if (string.IsNullOrEmpty(value))
                {
                    formFields.SetField(field.Key, "");
                    continue;
                }
                if (field.Key.StartsWith("image_"))
                {

                    AddImage(filedValues[field.Key], stamper, formFields.GetFieldPositions(field.Key)[0]);
                }
                else
                {                 
                    formFields.SetField(field.Key, value);
                }

            }
            stamper.FormFlattening = true;
            stamper.Close();
        }
        void AddImage(string imgPath, PdfStamper stamper, AcroFields.FieldPosition pos)
        {
            Rectangle rect = pos.position;
            Image image = Image.GetInstance(imgPath);
            image.SetAbsolutePosition(rect.Left, rect.Bottom);
            image.ScaleToFit(rect.Width, rect.Height);
            PdfContentByte canvas = stamper.GetOverContent(pos.page);
            canvas.AddImage(image);
        }

        //void SmartCopy(PdfReader reader,string outputPath)
        //{
        //    Document document = new Document();

        //    // Create a PdfSmartCopy object to optimize the size
        //    PdfSmartCopy writer = new PdfSmartCopy(document, new FileStream(outputPath, FileMode.Create));
        //    document.Open();

        //    // Iterate through each page of the input PDF and copy it to the output PDF
        //    for (int i = 1; i <= reader.NumberOfPages; i++)
        //    {
        //        var page = reader.GetPageN(i);
        //        writer.AddPage(page);
        //    }

        //    PdfStamper stamper = new PdfStamper(reader, writer);
        //}
    }
}
