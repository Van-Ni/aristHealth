﻿namespace AristBase.Models.TokenAuth
{
    public class AuthenticateResultModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public string EncryptedAccessToken { get; set; }

        public int ExpireInSeconds { get; set; }

        public long UserId { get; set; }
    }
}
