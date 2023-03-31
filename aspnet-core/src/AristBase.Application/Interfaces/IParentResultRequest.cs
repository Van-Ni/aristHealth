using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Interfaces
{
    public interface IParentResultRequest
    {
        public Guid ParentId { get; set; }
    }
}
