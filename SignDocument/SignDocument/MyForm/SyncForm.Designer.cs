namespace SignDocument.MyForm
{
    partial class SyncForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.càiĐặtToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip2 = new System.Windows.Forms.MenuStrip();
            this.xToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.càiĐặtToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.signSettingMenu = new System.Windows.Forms.ToolStripMenuItem();
            this.btnSync = new System.Windows.Forms.Button();
            this.btnSign = new System.Windows.Forms.Button();
            this.menuStrip2.SuspendLayout();
            this.SuspendLayout();
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // càiĐặtToolStripMenuItem
            // 
            this.càiĐặtToolStripMenuItem.Name = "càiĐặtToolStripMenuItem";
            this.càiĐặtToolStripMenuItem.Size = new System.Drawing.Size(32, 19);
            // 
            // menuStrip2
            // 
            this.menuStrip2.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.menuStrip2.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.xToolStripMenuItem,
            this.càiĐặtToolStripMenuItem1});
            this.menuStrip2.Location = new System.Drawing.Point(0, 0);
            this.menuStrip2.Name = "menuStrip2";
            this.menuStrip2.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.menuStrip2.ShowItemToolTips = true;
            this.menuStrip2.Size = new System.Drawing.Size(438, 28);
            this.menuStrip2.TabIndex = 1;
            // 
            // xToolStripMenuItem
            // 
            this.xToolStripMenuItem.Name = "xToolStripMenuItem";
            this.xToolStripMenuItem.Size = new System.Drawing.Size(32, 24);
            this.xToolStripMenuItem.Text = "X";
            this.xToolStripMenuItem.Click += new System.EventHandler(this.xToolStripMenuItem_Click);
            // 
            // càiĐặtToolStripMenuItem1
            // 
            this.càiĐặtToolStripMenuItem1.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripMenuItem2,
            this.signSettingMenu});
            this.càiĐặtToolStripMenuItem1.Name = "càiĐặtToolStripMenuItem1";
            this.càiĐặtToolStripMenuItem1.Size = new System.Drawing.Size(70, 24);
            this.càiĐặtToolStripMenuItem1.Text = "Cài đặt";
            // 
            // toolStripMenuItem2
            // 
            this.toolStripMenuItem2.Name = "toolStripMenuItem2";
            this.toolStripMenuItem2.Size = new System.Drawing.Size(265, 26);
            this.toolStripMenuItem2.Text = "Tài khoản bảo hiểm xã hội";
            this.toolStripMenuItem2.Click += new System.EventHandler(this.toolStripMenuItem2_Click);
            // 
            // signSettingMenu
            // 
            this.signSettingMenu.Name = "signSettingMenu";
            this.signSettingMenu.Size = new System.Drawing.Size(265, 26);
            this.signSettingMenu.Text = "Chữ ký số";
            this.signSettingMenu.Click += new System.EventHandler(this.signSettingMenu_Click);
            // 
            // btnSync
            // 
            this.btnSync.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(117)))), ((int)(((byte)(214)))));
            this.btnSync.FlatAppearance.BorderSize = 0;
            this.btnSync.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSync.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnSync.ForeColor = System.Drawing.Color.White;
            this.btnSync.Location = new System.Drawing.Point(65, 295);
            this.btnSync.Name = "btnSync";
            this.btnSync.Size = new System.Drawing.Size(309, 79);
            this.btnSync.TabIndex = 10;
            this.btnSync.Text = "Liên thông tất cả hồ sơ";
            this.btnSync.UseVisualStyleBackColor = false;
            this.btnSync.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnSign
            // 
            this.btnSign.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(117)))), ((int)(((byte)(214)))));
            this.btnSign.FlatAppearance.BorderSize = 0;
            this.btnSign.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSign.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnSign.ForeColor = System.Drawing.Color.White;
            this.btnSign.Location = new System.Drawing.Point(65, 167);
            this.btnSign.Name = "btnSign";
            this.btnSign.Size = new System.Drawing.Size(309, 79);
            this.btnSign.TabIndex = 9;
            this.btnSign.Text = "Ký tất cả hồ sơ";
            this.btnSign.UseVisualStyleBackColor = false;
            this.btnSign.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // SyncForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(438, 470);
            this.Controls.Add(this.btnSync);
            this.Controls.Add(this.btnSign);
            this.Controls.Add(this.menuStrip2);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.MainMenuStrip = this.menuStrip2;
            this.Name = "SyncForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Đồng bộ bảo hiểm xã hội";
            this.Load += new System.EventHandler(this.SyncForm_Load);
            this.menuStrip2.ResumeLayout(false);
            this.menuStrip2.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private ContextMenuStrip contextMenuStrip1;
        private ToolStripMenuItem càiĐặtToolStripMenuItem;
        private MenuStrip menuStrip1;
        private MenuStrip menuStrip2;
        private ToolStripMenuItem càiĐặtToolStripMenuItem1;
        private ToolStripMenuItem toolStripMenuItem2;
        private ToolStripMenuItem xToolStripMenuItem;
        private Button btnSync;
        private Button btnSign;
        private ToolStripMenuItem signSettingMenu;
    }
}