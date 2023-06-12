using System.Security.Cryptography.X509Certificates;
using System.Windows.Forms;

namespace SignDocument.MyForm
{
    public partial class SyncForm : Form
    {
        public SyncForm()
        {
            InitializeComponent();
        }

        private void toolStripMenuItem2_Click(object sender, EventArgs e)
        {
            var loginBHXH = new LoginBhxh();
            loginBHXH.ShowDialog();
        }

        private void SyncForm_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Properties.Settings.Default.bhxhUsername)|| string.IsNullOrEmpty(Properties.Settings.Default.bhxhPassMd5))
            {
                var loginBHXH = new LoginBhxh();
                loginBHXH.ShowDialog();
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
                    }
                }                
            }
            cbbCer.EndUpdate();
        }

        private void xToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cbbCer.SelectedItem != null)
            {
                var cer= (X509Certificate2)cbbCer.SelectedItem;
                Properties.Settings.Default.signThumbrint = cer.Thumbprint;
                Properties.Settings.Default.Save();
            }
        }
    }
}
