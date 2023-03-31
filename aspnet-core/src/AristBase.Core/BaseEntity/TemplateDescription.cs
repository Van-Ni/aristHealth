using System.Collections.Generic;

namespace AristBase.BaseEntity
{
    public interface IDescription
    {
        public string Description { get; set; }
        //public string Value { get; set; }
    }
    public interface IHaveFieldDescription
    {
        public Dictionary<string, FieldDescription> Fields { get; set; }
    }
    public class TemplateDescription : IHaveFieldDescription
    {
        public Dictionary<string, FieldDescription> Fields { get; set; }
        public Dictionary<string, TableDescription> TableFields { get; set; }
        public TemplateValue ToFieldValue()
        {
            return new TemplateValue();
        }
    }
    //public class TemplateValue
    //{
    //    public Dictionary<string, FieldValue> Fields { get; set; }
    //    public Dictionary<string, TableValue> TableFields { get; set; }
    //}
    public class FieldDescription : IDescription
    {
        public string Description { get; set; }
        //public string Value { get; set; }

    }
    public class TableDescription : IHaveFieldDescription
    {
        public string Description { get; set; }
        public Dictionary<string, FieldDescription> Fields { get; set; }
    }
}