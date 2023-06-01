namespace AristBase.CRUDServices.CertificateServices.Dto
{
    public class ImageUploadDto
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public byte[] Data { get; set; }
    }
    public class ImageResultDto
    {
        public string Path { get; set; }
    }
}
