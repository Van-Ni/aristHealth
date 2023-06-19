using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SignDocument.MyForm
{
    public partial class SignSetting : Form
    {
        public SignSetting()
        {
            InitializeComponent();
        }


        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cbbCer.SelectedItem != null)
            {
                var cer = (X509Certificate2)cbbCer.SelectedItem;
                SetInfo(cer);
                this.btnSave.Enabled = true;
            }
        }
        private void SetInfo(X509Certificate2 cer){
            txtSerial.Text = cer.SerialNumber;
            txtDateTo.Text = cer.GetExpirationDateString();
            txtDateFrom.Text = cer.GetEffectiveDateString();
            txtIsuer.Text = cer.Issuer;
        }
        private void SignSetting_Load(object sender, EventArgs e)
        {
            this.btnSave.Enabled= false;
            if (string.IsNullOrEmpty(Properties.Settings.Default.signThumbrint))
            {
                this.btnCancle.Enabled = false;
            }
                X509Store store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            store.Open(OpenFlags.ReadOnly);

            cbbCer.BeginUpdate();

            cbbCer.Items.Clear();
            foreach (X509Certificate2 certificate in store.Certificates)
            {
                cbbCer.Items.Add(certificate);
                if (!string.IsNullOrEmpty(Properties.Settings.Default.signThumbrint))
                {
                    if (certificate.Thumbprint.Equals(Properties.Settings.Default.signThumbrint, StringComparison.OrdinalIgnoreCase))
                    {
                        cbbCer.SelectedItem = certificate;
                        SetInfo(certificate);
                    }
                }
            }
            cbbCer.EndUpdate();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (cbbCer.SelectedItem != null)
            {
                var cer = (X509Certificate2)cbbCer.SelectedItem;
                Properties.Settings.Default.signThumbrint = cer.Thumbprint;
                Properties.Settings.Default.Save();
                this.Close();
            }
            else
            {
                MessageBox.Show("Chưa chọn chữ ký!");
            }
        }

        private void btnCancle_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(Properties.Settings.Default.signThumbrint))
            {
                this.Close();
            }
            else
            {
                MessageBox.Show("Chưa chọn chữ ký!");
            }
        }
    }
}
