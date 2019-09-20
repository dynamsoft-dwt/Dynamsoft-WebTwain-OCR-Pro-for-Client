using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Drawing;
using CheckLicense;
//using Framework;

namespace Dynamsoft
{
    public partial class  LicenseChecker : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.Request.Form["DTW_AjaxMethod"] != null)
            {
                String strMethod = this.Request.Form["DTW_AjaxMethod"];
                if (strMethod == "CheckLicense")
                {
                    Response.Write(LicenseCheckerServer.CheckLicense(this.Request.Form["Productkey"], HttpContext.Current.Server.MapPath("OCRPro.lic")));
                }
                else if (strMethod == "WriteOCRCount")
                {
                    Response.Write(LicenseCheckerServer.WriteOCRCount(this.Request.Form["OCRCount"], HttpContext.Current.Server.MapPath("OCRPro.lic")));
                }
            }
            else
            {
                Response.Write(LicenseCheckerServer.GetErrorString());
            }
        }

    }
}
