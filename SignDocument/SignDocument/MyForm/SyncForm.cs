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
            this.Hide();
            loginBHXH.ShowDialog();
            this.Show();
        }

        private void SyncForm_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Properties.Settings.Default.bhxhUsername)|| string.IsNullOrEmpty(Properties.Settings.Default.bhxhPassMd5))
            {
                var loginBHXH = new LoginBhxh();
                this.Hide();
                loginBHXH.ShowDialog();
                this.Show();
            }
            if (string.IsNullOrEmpty(Properties.Settings.Default.signThumbrint))
            {
                var signSetting = new SignSetting();
                this.Hide();
                signSetting.ShowDialog();
                this.Show();
            }
        }

        private void xToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }
        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            
        }

        private void signSettingMenu_Click(object sender, EventArgs e)
        {
            var signSetting = new SignSetting();
            this.Hide();
            signSetting.ShowDialog();
            this.Show();
        }
    }
}
