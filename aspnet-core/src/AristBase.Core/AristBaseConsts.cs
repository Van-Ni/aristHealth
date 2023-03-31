using AristBase.Debugging;

namespace AristBase
{
    public class AristBaseConsts
    {
        public const string LocalizationSourceName = "AristBase";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "521511bbe24e487fa92d035fa8535d46";
    }
}
