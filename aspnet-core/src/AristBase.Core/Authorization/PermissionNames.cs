using Abp.Configuration;
using Abp;
using System.Collections.Generic;

namespace AristBase.Authorization
{
    public static class PermissionNames
    {
        public const string Pages_Tenants = "Pages.Tenants";

        public const string Pages_Users = "Pages.Users";
        public const string Pages_Users_Activation = "Pages.Users.Activation";

        public const string Pages_Roles = "Pages.Roles";
        public const string B1 = "B1";
        public const string B2 = "B2";
        public const string B3 = "B3";
        public const string B4 = "B4";
        public const string B5 = "B5";
        public const string B6 = "B6";
        public const string B7 = "B7";
        public const string B8 = "B8";
        public const string B9 = "B9";
        public static List<string> Pages = new List<string> { B1, B2, B3, B4, B5, B6, B7, B8, B9 };
    }
    public class CRUDPermissionName
    {
        public CRUDPermissionName(string baseName, string prefix = "Pages")
        {
            Create = $"{prefix}.{baseName}.Create";
            Read = $"{prefix}.{baseName}.Read";
            Update = $"{prefix}.{baseName}.Update";
            Delete = $"{prefix}.{baseName}.Delete";
        }
        public string Create { get; }
        public string Read { get; }
        public string Update { get; }
        public string Delete { get; }
    }
}
