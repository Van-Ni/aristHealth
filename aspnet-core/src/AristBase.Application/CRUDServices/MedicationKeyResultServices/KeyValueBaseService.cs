namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    //public abstract class KeyValueBaseService : AsyncCrudPermissonAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, ParentPagedAndSortedResultRequestDto, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    //{
    //    private readonly string permissionName;
    //    public KeyValueBaseService(IRepository<CertificateGroupStatus, Guid> repository, string permissionName) : base(repository, permissionName)
    //    {
    //        this.permissionName = permissionName;
    //    }

    //    protected void CustomCheckPermission(CreateCertificateGroupStatusDto input)
    //    {
    //        if (input.Group.StartsWith(permissionName.ToLower()))
    //        {
    //            throw new AbpAuthorizationException(
    //                string.Format(
    //                    L(
    //                        "KeyNotAllow"
    //                    )
    //                )
    //            );
    //        }
    //    }
    //    public async ValueTask<CertificateGroupStatusDto> CreateList(CreateCertificateGroupStatusDto input)
    //    {
    //        CheckCreatePermission();
    //        CustomCheckPermission(input);
    //        var entity = ObjectMapper.Map<CertificateGroupStatus>(input);
    //        await Repository.InsertAsync(entity);
    //        await CurrentUnitOfWork.SaveChangesAsync();

    //        return ObjectMapper.Map<CertificateGroupStatusDto>(input);
    //    }
    //    public async ValueTask<CertificateGroupStatusDto> UpdateOrInsert(CreateCertificateGroupStatusDto input)
    //    {
    //        CheckCreatePermission();
    //        CustomCheckPermission(input);
    //        var check = await Repository.GetAll().Where(w => w.CertificateId == input.CertificateId && w.Group == input.Group).FirstOrDefaultAsync();
    //        if (check != null)
    //        {
    //            check.Content = input.Content;
    //            await Repository.UpdateAsync(check);
    //            await CurrentUnitOfWork.SaveChangesAsync();

    //            return ObjectMapper.Map<CertificateGroupStatusDto>(check);
    //        }
    //        await Repository.InsertAsync(ObjectMapper.Map<CertificateGroupStatus>(input));
    //        await CurrentUnitOfWork.SaveChangesAsync();
    //        return ObjectMapper.Map<CertificateGroupStatusDto>(input);
    //    }
    //    public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(ParentPagedAndSortedResultRequestDto input)
    //    {
    //        CheckGetAllPermission();

    //        var query = CreateFilteredQuery(input);
    //        query = query.Where(w => w.CertificateId == input.CertificateId);
    //        if (input.Group != null)
    //        {
    //            query = query.Where(w => w.Group.Equals(input.Group));
    //        }
    //        var totalCount = await AsyncQueryableExecuter.CountAsync(query);

    //        query = ApplySorting(query, input);
    //        query = ApplyPaging(query, input);

    //        var entities = await AsyncQueryableExecuter.ToListAsync(query);

    //        return new PagedResultDto<CertificateGroupStatusDto>(
    //            totalCount,
    //            entities.Select(MapToEntityDto).ToList()
    //        );
    //    }

    //    //public IDictionary<string, KeyValueInfo> TaskGetAll(ParentPagedAndSortedResultRequestDto input)
    //    //{
    //    //    return Repository.GetAll().Where(r => r.CertificateId == input.CertificateId).ToDictionary(c => c.Key, c => new KeyValueInfo
    //    //    {
    //    //        Value = c.Value,
    //    //    });
    //    //}
    //}
    //public class KeyValueInfo
    //{
    //    public string Value { get; set; }
    //    public long UserId { get; set; }
    //}
}
