﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public static class PDFFieldConst
    {
        public static int MaxLength { get; set; } = 10;
        public const string SignatureField = "Signature";
        public const string SignImage = "sign_image";
        public const string SignName = "sign_chuki";
        public const string TEXT_FIX = "_text_";
        public const string RADIO_FIX = "_radio_";
        public const string CHECKBOX_FIX = "_checkbox_";
        public const string Hvt = "text_hovaten";
        public const string HvtGuardian = "text_nguoigiamho";
        public const string Male = "checkbox_male";
        public const string Sex = "checkbox_sex";
        public const string CrossNam = "cross_nam";
        public const string Female = "checkbox_female";
        public const string Dob = "text_dob";
        public const string CCCD = "text_cccd";
        public const string CCCDNC = "text_cccdngaycap";
        public const string CCCDTai = "text_cccdtai";
        public const string Address = "text_address";
        public const string Address1 = "text_address1";
        public const string Reason = "text_lidokham";
        public const string DayText = "text_thu";
        public const string Day = "text_ngay";
        public const string Month = "text_thang";
        public const string Year = "text_nam";
        public const string SoYTe = "text_tenancyName";
        public const string TT = "text_branchName";
        public const string So = "text_so";

        public const string TTN = "radio_thitruong_ngang";
        public const string TTD = "radio_thitruong_dung";
        public const string TTNBTH = "text_thitruong_ngang_bth";
        public const string TTNHC = "text_thitruong_ngang_hc";
        public const string TTDBTH = "text_thitruong_dung_bth";
        public const string TTDHC = "text_thitruong_dung_hc";


    }
}
