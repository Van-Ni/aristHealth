using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SignDocument.Service
{
    public class XMLSigner
    {
        private readonly X509Certificate2 certificate;
        public XMLSigner(X509Certificate2 certificate)
        {
            this.certificate = certificate;
        }
        public string Sign(string xmlString)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xmlString);



            SignedXml signedXml = new SignedXml(xmlDoc);

            signedXml.SigningKey = certificate.GetRSAPrivateKey();


            Reference reference = new Reference();
            reference.Uri = "";

            //Transform and digist
            reference.AddTransform(new XmlDsigEnvelopedSignatureTransform());


            signedXml.SignedInfo.SignatureMethod = SignedXml.XmlDsigRSASHA1Url;
            //signedXml.SignedInfo.SignatureMethod = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
            reference.DigestMethod = "http://www.w3.org/2000/09/xmldsig#sha1";
            signedXml.AddReference(reference);

            X509Chain chain = new X509Chain();
            chain.Build(certificate);

            KeyInfo keyInfo = new KeyInfo();
            var keyinfoData = new KeyInfoX509Data(certificate);
            //keyinfoData.AddSubjectName(certificate.Subject);
            keyInfo.AddClause(keyinfoData);


            signedXml.KeyInfo = keyInfo;

            signedXml.ComputeSignature();

            XmlElement xmlDigitalSignature = signedXml.GetXml();

            xmlDoc.DocumentElement.AppendChild(xmlDoc.ImportNode(xmlDigitalSignature, true));

            return xmlDoc.OuterXml;
        }

        string ExtractStringContent(XmlNode node)
        {
            StringBuilder stringBuilder = new StringBuilder();

            foreach (XmlNode childNode in node.ChildNodes)
            {
                if (childNode.NodeType == XmlNodeType.Text || childNode.NodeType == XmlNodeType.CDATA)
                {
                    stringBuilder.Append(childNode.InnerText);
                }
                else if (childNode.HasChildNodes)
                {
                    stringBuilder.Append(ExtractStringContent(childNode));
                }
            }

            return stringBuilder.ToString();
        }
    }
}
