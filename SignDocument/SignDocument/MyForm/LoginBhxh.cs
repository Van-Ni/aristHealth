using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SignDocument.MyForm
{
    public partial class LoginBhxh : Form
    {
        public bool canclable = false;
        public LoginBhxh()
        {
            InitializeComponent();
        }

        //cancle
        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }


        //save
        private void button1_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(txtUsername.Text) && !string.IsNullOrEmpty(txtPassword.Text))
            {
                Properties.Settings.Default.bhxhUsername = txtUsername.Text;
                Properties.Settings.Default.bhxhPassMd5 = CreateMD5(txtPassword.Text);
                Properties.Settings.Default.Save();
                this.Close();
            }
            else
            {
                MessageBox.Show("Không được để trống thông tin");
            }
        }

        private void LoginBhxh_Load(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(Properties.Settings.Default.bhxhUsername))
            {
                txtUsername.Text = Properties.Settings.Default.bhxhUsername;
            }
            if (string.IsNullOrEmpty(Properties.Settings.Default.bhxhPassMd5))
            {
                btnCancle.Enabled = false;
            }
            btnSave.Enabled = false;
        }
        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);
                return Convert.ToHexString(hashBytes);
            }
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void txtUsername_TextChanged(object sender, EventArgs e)
        {
            this.btnSave.Enabled = true;
        }

        private void txtPassword_TextChanged(object sender, EventArgs e)
        {
            this.btnSave.Enabled = true;
        }
    }
}
