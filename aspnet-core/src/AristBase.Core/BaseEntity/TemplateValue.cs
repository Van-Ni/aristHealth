using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public interface IValue
    {
        public string Value { get; set; }
    }
    public interface IHaveFieldValue
    {
        public Dictionary<string, FieldValue> Fields { get; set; }
    }
    public class TemplateValue : IHaveFieldValue
    {
        public Dictionary<string, FieldValue> Fields { get; set; }
        public Dictionary<string, TableValue> TableFields { get; set; }
    }

    public class FieldValue : IValue
    {
        public string Value { get; set; }
    }
    public class TableValue
    {
        public List<Dictionary<string, FieldValue>> Values { get; set; }
        public Dictionary<string, FieldDescription> Fields { get; set; }
    }
}
