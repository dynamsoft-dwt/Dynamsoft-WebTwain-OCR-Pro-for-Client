<!DOCTYPE html>
<html>
<head>
<title>Online OCR | Dynamic Web TWAIN SDK | Dynamsoft</title>
<meta http-equiv="description" content="The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side." />
<script src="Resources/dynamsoft.webtwain.config.js?new=true"></script>
<script src="Resources/dynamsoft.webtwain.initiate.js"></script>
<script src="Resources/addon/dynamsoft.webtwain.addon.ocrpro.js"> </script>
<script src="Resources/addon/dynamsoft.webtwain.addon.pdf.js"></script>
<link rel="stylesheet" href="Style/ds.demo.css">
</head>
<body>
<div id="tipTop"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <p>This demo only works on modern browsers on Windows like Chrome 27+ &amp; Firefox 27+ and Edge & IE 11</p>
</div>
<div id="header"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <div class="container">
        <div id="headerTop" class="row">
            <div class="ct-lt fl clearfix">
                <div class="logo mr20 fl"> <img src="Style/Images/logo-dwt-56x56.png" alt="Logo"> </div>
                <div class="fl">
                    <div class="linkGroup"> <a target="_blank" class="bluelink ds-font-size-14" href="http://www.dynamsoft.com">Dynamsoft</a><span> / </span> <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx">Dynamic Web TWAIN</a><span> / </span> <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx">Code Gallery</a><span> / </span> </div>
                    <h1>Scan Documents and Client-side OCR pro</h1>
                </div>
            </div>
            <div class="ct-rt fr"><a target="_blank" href="http://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx" class="btn lgBtn bgOrange">Download SDK</a> </div>
        </div>
        <div id="headerBtm" class="row">The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side.</div>
    </div>
</div>
<div id="main">
    <div class="container">
        <div class="ct-lt clearfix"> 
            <!-- dwtcontrolContainer is the default div id for Dynamic Web TWAIN control.
             If you need to rename the id, you should also change the id in the dynamsoft.webtwain.config.js accordingly. -->
            <div id="dwtcontrolContainer"></div>
        </div>
        <div class="ct-rt">
            <div class="content clearfix">
                <div class="item">
                    <div class="left">
                        <input type="button" value="Scan" onclick="AcquireImage();" class="btn" />
                    </div>
                    <div class="right">
                        <input type="button" value="Open a Local Image" onclick="LoadImages();" class="btn" />
                    </div>
                </div>
                <div class="item">
                    <div class="left">Language:</div>
                    <div class="right">
                        <select size="1" id="ddlLanguages" class="w100p">
                        </select>
                    </div>
                </div>
                <div class="item">
                    <div class="left">Recognition Mode:</div>
                    <div class="right">
                        <select size="1" id="ddlOCRRecognitionModule" class="w100p">
                        </select>
                    </div>
                </div>
                <div class="item">
                    <div class="left">Output Format:</div>
                    <div class="right">
                        <select size="1" id="ddlOCROutputFormat" class="w100p" onchange="SetIfUseRedaction();">
                        </select>
                    </div>
                </div>
                <div id="divVersion" class="item" style="display: none">
                    <div class="left">PDF Version:</div>
                    <div class="right">
                        <select size="1" id="ddlPDFVersion" class="w100p">
                        </select>
                    </div>
                    <div class="left">PDF/A Version:</div>
                    <div class="right">
                        <select size="1" id="ddlPDFAVersion" class="w100p">
                        </select>
                    </div>
                </div>
                <div id="divIfUseRedaction" class="item" style="display: none;">
                    <div class="left">&nbsp;</div>
                    <div class="right">
                        <label for="chkUseRedaction">
                            <input type="checkbox" id="chkUseRedaction" onclick="SetRedaction();" />
                            Search Text and Redact</label>
                    </div>
                </div>
                <div id="divRedaction" class="item" style="display: none">
                    <div class="left">Find Text:</div>
                    <div class="right">
                        <input type="text" id="txtFindText" value="" class="w100p" />
                    </div>
                    <div class="left">Match Mode:</div>
                    <div class="right">
                        <select size="1" id="ddlFindTextFlags" class="w100p">
                        </select>
                    </div>
                    <div class="left">Find Text Action:</div>
                    <div class="right">
                        <select size="1" id="ddlFindTextAction" class="w100p">
                        </select>
                    </div>
                </div>
                <div class="item">
                    <div class="left">&nbsp;</div>
                    <div class="right pr">
                        <input type="button" value="OCR and Save" onclick="DoOCR();" class="btn bgBlue mt15"/>
                        <span id="info"></span>
                        <div id="tipInfo">
                            <p>You can use the mouse to choose an image area and do zonal OCR</p>
                        </div>
                    </div>
                </div>
                <div class="item" style="display: none;">
                    <div class="left">&nbsp;</div>
                    <div class="right">
                        <input type="file" id="fileInput" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="footer"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <div class="container">
        <div id="footerTop" class="row">
            <div class="item contact"> <strong class="fc4">Contact Us</strong>
                <ul>
                    <li><a class="graylink" href="mailto:support@dynamsoft.com">support@dynamsoft.com</a></li>
                    <li><a target="_blank" class="graylink" href="http://www.dynamsoft.com/Support/LiveHelp.aspx">Live Chat</a> / <a target="_blank" class="graylink" href="http://www.dynamsoft.com/Support/LiveHelp.aspx">Submit a Form</a></li>
                    <li>1-604-605-5491 (Toll-Free)</li>
                </ul>
            </div>
            <div class="item features"> <strong class="fc4">Features Demonstrated</strong>
                <ul class="org-li">
                    <li>Scan documents & load local Images</li>
                    <li>Rasterize and load local PDF files</li>
                    <li>Perform OCR on loaded image(s)</li>
                    <li>Redact a specified text in the resulting file</li>
                </ul>
            </div>
            <div class="item license"> <strong class="fc4">License Required</strong>
                <ul class="org-li">
                    <li>Core SDK licenses (Windows)</li>
                    <li>Core SDK licenses for Mac (if needed)</li>
                    <li>Add-on License for PDF Rasterizer (if needed)</li>
                    <li>Add-on License for Professional OCR on the Client-side (if needed)</li>
                    <li><a class="bluelink ds-demo-font-size-14" href="mailto:sales@dynamsoft.com">Contact Dynamsoft Sales</a>&nbsp;<span class="fcBlue"> | </span>&nbsp;<a target="_blank" class="bluelink ds-demo-font-size-14" href="https://www.dynamsoft.com/Secure/WebTWAIN_BuyIt.aspx">Visit Online Store</a></li>
                </ul>
            </div>
        </div>
        <div id="footerBtm" class="row">
            <div class="ct-lt tc fl">&copy; 2003 - <script>document.write((new Date()).getFullYear());</script> Dynamsoft. All rights reserved. <a href="http://www.dynamsoft.com/PrivacyStatement.aspx">Privacy Statement</a> / <a href="http://www.dynamsoft.com/SiteMap.html">Site Map</a> </div>
            <div class="ct-rt tr fr"><a href="http://www.dynamsoft.com/">Home</a> / <a href="http://www.dynamsoft.com/Purchase/Purchase.aspx">Purchase</a> / <a href="http://www.dynamsoft.com/Support/Support.aspx">Support</a></div>
        </div>
    </div>
</div>
<script>
var target = document.getElementById('info');
target.onmouseover = function(){
	document.getElementById('tipInfo').style.display = 'block';
	}
target.onmouseout = function(){
	document.getElementById('tipInfo').style.display = 'none';
	}
</script> 
<script src="ocrproclientside.js"></script>
</body>
</html>
