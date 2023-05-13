using Abp.Application.Services.Dto;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Interfaces
{
    public class ParentPagedAndSortedResultRequestDto : PagedResultRequestDto, IPagedAndSortedResultRequest
    {
        public string Sorting { get; set; }
        [Required]
        public Guid CertificateId { get; set; }
        public string? Group { get; set; }
    }
    public class PagedAndSortedAndSearchResultDto : PagedResultRequestDto, IPagedAndSortedResultRequest
    {
        public string Sorting { get; set; }
        public string Keyword { get; set; }
    }
    public class PagedAndSortedAndSearchAndDateResultDto : PagedResultRequestDto, IPagedAndSortedResultRequest
    {
        public string Sorting { get; set; }
        public string Keyword { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
    public class PagedAndSortedAndSearchAndDateAndStatusResultDto : PagedResultRequestDto, IPagedAndSortedResultRequest
    {
        public string Sorting { get; set; }
        public string Keyword { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }

    public class PagedAndSortedAndSyncReqeustResultDto : PagedResultRequestDto, IPagedAndSortedResultRequest
    {
        public string Sorting { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public SyncStatus? SyncStatus { get; set; }
    }
}
