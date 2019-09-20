<!DOCTYPE html>
<html>

<head>
    <title>Online OCR | Dynamic Web TWAIN SDK | Dynamsoft</title>
    <meta http-equiv="description"
        content="The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side." />
    <script src="https://unpkg.com/dwt/dist/dynamsoft.webtwain.min.js"> </script>
    <script src="https://tst.dynamsoft.com/libs/dwt/15.2/OCRPResources/dynamsoft.webtwain.addon.ocrpro.js"> </script>
    <link rel="stylesheet" href="Style/ds.demo.css">
</head>

<body>
    <div id="tipTop">
        <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
        <p>This demo only works on modern browsers on Windows like Chrome 27+ &amp; Firefox 27+ and Edge &amp; IE 11</p>
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
                                <input type="checkbox" id="chkUseRedaction" onclick="SetRedaction();" /> Search Text and
                                Redact</label>
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
                        <div class="left">
                            <input type="button" value="Delete" onclick="RemoveSelected();" class="mt15 btn"
                                style="width:100px;" />
                        </div>
                        <div class="right pr">
                            <input type="button" value="OCR and Save" onclick="DoOCR();" class="btn bgBlue mt15" />
                            <span id="info"></span>
                            <div id="tipInfo">
                                <p>You can use the mouse to choose an image area and do zonal OCR</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="DWTcontainerBtm">
                <p>Result:</p>
                <div id="divNoteMessage" ondblclick="this.innerHTML=''"> </div>
            </div>
        </div>
    </div>
    <script>
        var target = document.getElementById('info');
        target.onmouseover = function () {
            document.getElementById('tipInfo').style.display = 'block';
        }
        target.onmouseout = function () {
            document.getElementById('tipInfo').style.display = 'none';
        }
    </script>
    <script src="ocrproclientside.js"></script>
</body>

</html>