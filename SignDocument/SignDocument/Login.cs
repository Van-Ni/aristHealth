using AristBaseLib;
using SignDocument.MyForm;

namespace SignDocument
{
    public partial class Login : Form
    {
        private readonly ArishHealthClientService _arishHealthClientService;

        public Login(ArishHealthClientService arishHealthClientService)
        {
            InitializeComponent();
            this._arishHealthClientService = arishHealthClientService;
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            if(!string.IsNullOrEmpty(this.txtUsername.Text)&& !string.IsNullOrEmpty(this.txtPassword.Text))
            {
                await _arishHealthClientService.Login(txtUsername.Text, txtPassword.Text);
                var syncForm = new SyncForm();
                syncForm.FormClosing += (s, e) => {
                    this.Close();
                };
                syncForm.Show();
                if(cbRememberme.Checked)
                {
                    Properties.Settings.Default.username = txtUsername.Text;
                    Properties.Settings.Default.password = txtPassword.Text;
                    Properties.Settings.Default.Save();                   
                }
                this.Hide();
            }
        }

        private void Login_Load(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(Properties.Settings.Default.username))
            {
                this.txtUsername.Text = Properties.Settings.Default.username;
            }
            if (!string.IsNullOrEmpty(Properties.Settings.Default.password))
            {
                this.txtPassword.Text = Properties.Settings.Default.password;
            }

        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {

        }
    }
}