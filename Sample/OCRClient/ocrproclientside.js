Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady); // Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used


var DWObject, CurrentPath;
var _iLeft, _iTop, _iRight, _iBottom, _ocrResultFileType;
var CurrentPathName = unescape(location.pathname);
CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
		
var OCRFindTextFlags = [
		{ desc: "whole word", val: EnumDWT_OCRFindTextFlags.OCRFT_WHOLEWORD },
		{ desc: "match case", val: EnumDWT_OCRFindTextFlags.OCRFT_MATCHCASE },
		{ desc: "fuzzy match", val: EnumDWT_OCRFindTextFlags.OCRFT_FUZZYMATCH }
];


var OCRFindTextAction = [
		{ desc: "highlight", val: EnumDWT_OCRFindTextAction.OCRFT_HIGHLIGHT },
		{ desc: "strikeout", val: EnumDWT_OCRFindTextAction.OCRFT_STRIKEOUT },
		{ desc: "mark for redact", val: EnumDWT_OCRFindTextAction.OCRFT_MARKFORREDACT }
];


var OCRLanguages = [
		{ desc: "English", val: "eng" },
		{ desc: "Arabic", val: "arabic" },
		{ desc: "Italian", val: "italian" }
];   
		
var OCRRecognitionModule = [
		{ desc: "auto", val: EnumDWT_OCRProRecognitionModule.OCRPM_AUTO },
		{ desc: "most accurate", val: EnumDWT_OCRProRecognitionModule.OCRPM_MOSTACCURATE },
		{ desc: "balanced", val: EnumDWT_OCRProRecognitionModule.OCRPM_BALANCED },
		{ desc: "fastest", val: EnumDWT_OCRProRecognitionModule.OCRPM_FASTEST }
];   
	 
var OCROutputFormat = [
		{ desc: "TXT", val: EnumDWT_OCRProOutputFormat.OCRPFT_TXTS },
		{ desc: "CSV", val: EnumDWT_OCRProOutputFormat.OCRPFT_TXTCSV },
		{ desc: "Text Formatted", val: EnumDWT_OCRProOutputFormat.OCRPFT_TXTF },
		{ desc: "XML", val: EnumDWT_OCRProOutputFormat.OCRPFT_XML },
		{ desc: "PDF", val: EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF },
		{ desc: "PDF with MRC compression", val: EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF_MRC }
];

var OCRPDFVersion = [
		{ desc: "", val: ""},
		{ desc: "1.0", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_0 },
		{ desc: "1.1", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_1 },
		{ desc: "1.2", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_2 },
		{ desc: "1.3", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_3 },           
		{ desc: "1.4", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_4 },
		{ desc: "1.5", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_5 },
		{ desc: "1.6", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_6 },
		{ desc: "1.7", val: EnumDWT_OCRProPDFVersion.OCRPPDFV_7 }

];

var OCRPDFAVersion = [
		{ desc: "", val: "" },
		{ desc: "pdf/a-1a", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_1A },
		{ desc: "pdf/a-1b", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_1B },
		{ desc: "pdf/a-2a", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_2A },
		{ desc: "pdf/a-2b", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_2B },
		{ desc: "pdf/a-2u", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_2U },
		{ desc: "pdf/a-3a", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_3A },
		{ desc: "pdf/a-3b", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_3B },
		{ desc: "pdf/a-3u", val: EnumDWT_OCRProPDFAVersion.OCRPPDFAV_3U }

];

function downloadPDFR() {
	Dynamsoft__OnclickCloseInstallEx();
	DWObject.Addon.PDF.Download(
		location.protocol + '//' + location.hostname + ':' + location.port + CurrentPath + 'Resources/addon/Pdf.zip',
		function() {/*console.log('PDF dll is installed');*/
			downloadOCRPro_btn();
		},
		function(errorCode, errorString) {
			console.log(errorString);
		}
	);
}
	
function downloadOCRPro_btn(){
	var localOCRVersion = DWObject._innerFun('GetAddOnVersion', '["proocr"]');
	if (localOCRVersion != Dynamsoft.ProOCRVersion) {
		var ObjString = [];
		ObjString.push('<div class="p15" id="ocr-pro-install-dlg">');
		ObjString.push('The <strong>OCR Pro Module</strong> is not installed on this PC<br />Please click the button below to get it installed');
		ObjString.push('<p class="tc mt15 mb15"><input type="button" value="Install OCR Pro" onclick="downloadOCRPro();" class="btn lgBtn bgBlue" /><hr></p>');
		ObjString.push('<i><strong>The installation is a one-time process</strong> <br />It might take some time because the module is around <strong>90MB</strong> in size.</i>');
		ObjString.push('</div>');
		Dynamsoft.WebTwainEnv.ShowDialog(400,310, ObjString.join(''));
		document.getElementsByClassName("ClosetblCanNotScan")[0].style.display = "none";
	}
}

function downloadOCRPro() {
	Dynamsoft__OnclickCloseInstallEx();
	DWObject.Addon.OCRPro.Download(
		location.protocol + '//' + location.hostname + ':' + location.port + CurrentPath + 'Resources/addon/OCRPro.zip',
		function() {/*console.log('PDF dll is installed');*/},
		function(errorCode, errorString) {
			console.log(errorString);
		}
	);
};

function Dynamsoft_OnReady() {
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
	if (DWObject) {
		DWObject.RegisterEvent("OnImageAreaSelected", Dynamsoft_OnImageAreaSelected);
		DWObject.RegisterEvent("OnImageAreaDeSelected", Dynamsoft_OnImageAreaDeselected);
		
		_iLeft = 0;
		_iTop = 0;
		_iRight = 0;
		_iBottom = 0;
		
		for (var i = 0; i < OCRFindTextFlags.length; i++)
			document.getElementById("ddlFindTextFlags").options.add(new Option(OCRFindTextFlags[i].desc, i));
		for (var i = 0; i < OCRFindTextAction.length; i++)
			document.getElementById("ddlFindTextAction").options.add(new Option(OCRFindTextAction[i].desc, i));                  
		for (var i = 0; i < OCRLanguages.length; i++)
			document.getElementById("ddlLanguages").options.add(new Option(OCRLanguages[i].desc, i));
		for (var i = 0; i < OCROutputFormat.length; i++)
			document.getElementById("ddlOCROutputFormat").options.add(new Option(OCROutputFormat[i].desc, i));
		for (var i = 0; i < OCRRecognitionModule.length; i++)
			document.getElementById("ddlOCRRecognitionModule").options.add(new Option(OCRRecognitionModule[i].desc, i));
		for (var i = 0; i < OCRPDFVersion.length; i++)
			document.getElementById("ddlPDFVersion").options.add(new Option(OCRPDFVersion[i].desc, i));
		for (var i = 0; i < OCRPDFAVersion.length; i++)
			document.getElementById("ddlPDFAVersion").options.add(new Option(OCRPDFAVersion[i].desc, i));

		document.getElementById("ddlPDFVersion").selectedIndex = 6;

		DWObject.RegisterEvent("OnTopImageInTheViewChanged", Dynamsoft_OnTopImageInTheViewChanged);
		/*
		* Make sure the PDF Rasterizer and OCR Pro add-on are already installedsample
		*/
		if(!Dynamsoft.Lib.env.bMac) {	
			var localPDFRVersion = '';
			if(Dynamsoft.Lib.product.bChromeEdition){
				localPDFRVersion = DWObject._innerFun('GetAddOnVersion', '["pdf"]');
			}
            else {
				alert("Please note that your current browser doesn't support the OCRPro add-on, please use modern browsers like Chrome, Firefox or IE 11.");
				return;
                localPDFRVersion = DWObject.getSWebTwain().GetAddonVersion("pdf");
            }	
			if (localPDFRVersion != Dynamsoft.PdfVersion) {
				var ObjString = [];
				ObjString.push('<div class="p15" id="pdfr-install-dlg">');
				ObjString.push('The <strong>PDF Rasterizer</strong> is not installed on this PC<br />Please click the button below to get it installed');
				ObjString.push('<p class="tc mt15 mb15"><input type="button" value="Install PDF Rasterizer" onclick="downloadPDFR();" class="btn lgBtn bgBlue" /><hr></p>');
				ObjString.push('<i><strong>The installation is a one-time process</strong> <br />It might take some time depending on your network.</i>');
				ObjString.push('</div>');
				Dynamsoft.WebTwainEnv.ShowDialog(400,310, ObjString.join(''));
				document.getElementsByClassName("ClosetblCanNotScan")[0].style.display = "none";
			}
			else {
				downloadOCRPro_btn();
			}
		}
	}
}

function Dynamsoft_OnImageAreaSelected(index, left, top, right, bottom) {
	_iLeft = left;
	_iTop = top;
	_iRight = right;
	_iBottom = bottom;
}

function Dynamsoft_OnImageAreaDeselected(index) {
	_iLeft = 0;
	_iTop = 0;
	_iRight = 0;
	_iBottom = 0;
}

function Dynamsoft_OnTopImageInTheViewChanged(index) {
	DWObject.CurrentImageIndexInBuffer = index;
}

function AcquireImage() {
	if (DWObject) {
		var bSelected = DWObject.SelectSource();
		if (bSelected) {

			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function() {
				DWObject.CloseSource();
			};

			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;  //Scanner source will be disabled/closed automatically after the scan.
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}
	}
}

function LoadImages() {
	if (DWObject) {
		var nCount = 0, nCountLoaded = 0;;
		DWObject.IfShowFileDialog = false;
		function ds_load_pdfa(bSave, filesCount, index, path, filename){
			nCount = filesCount;
			if(nCount == -1) {
				console.log('user cancelled');
				Dynamsoft.Lib.detect.hideMask();
			}
			var filePath = path + "\\" +  filename;
			if((filename.substr(filename.lastIndexOf('.') + 1)).toLowerCase() == 'pdf'){
				DWObject.Addon.PDF.SetResolution(200);   
				DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConverMode.CM_RENDERALL);
			}
			DWObject.LoadImage(filePath, 
				function() {
					console.log('successful');},
				function (errorCode, errorString) {
					alert(errorString);
				});
			DWObject.UnregisterEvent('OnGetFilePath', ds_load_pdfa);
		}
		DWObject.RegisterEvent('OnGetFilePath', ds_load_pdfa);
		DWObject.RegisterEvent('OnPostLoad', function(path, name, type){
			nCountLoaded ++;
			if(nCountLoaded == nCount)
				Dynamsoft.Lib.detect.hideMask();
		});
		DWObject.ShowFileDialog(false,  "BMP, JPG, PNG, PDF and TIF | *.bmp;*.jpg;*.png;*.pdf;*.tif;*.tiff", 0, "", "", true, true, 0)		
		Dynamsoft.Lib.detect.showMask();
	}
}

function SetIfUseRedaction() {
	var selectValue = OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val;
	if (selectValue == EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF ||
		selectValue == EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF_MRC) {
		document.getElementById("divVersion").style.display = "";
		document.getElementById("divIfUseRedaction").style.display = "";
	}
	else if (selectValue == EnumDWT_OCRProOutputFormat.OCRPFT_TXTF) {
		document.getElementById("divVersion").style.display = "none";
		document.getElementById("divIfUseRedaction").style.display = "";
	}
	else {
		document.getElementById("divVersion").style.display = "none";
		document.getElementById("divIfUseRedaction").style.display = "none";
		document.getElementById("divRedaction").style.display = "none";
		document.getElementById("chkUseRedaction").checked = false;
	}
}

function SetRedaction() {
	 if (document.getElementById("chkUseRedaction").checked) {
		 document.getElementById("divRedaction").style.display = "";
	}
	else {
		document.getElementById("divRedaction").style.display = "none";
		document.getElementById("chkUseRedaction").checked = false;
	}
}

function GetErrorInfo(errorcode, errorstring, result) { //This is the function called when OCR fails
	alert(errorstring);
	var strErrorDetail = "";
	var aryErrorDetailList = result.GetErrorDetailList();
	for (var i = 0; i < aryErrorDetailList.length; i++) {
		if (i > 0)
			strErrorDetail += ";";
		strErrorDetail += aryErrorDetailList[i].GetMessage();
	}
	alert(strErrorDetail);
}

function GetRectOCRProInfo(sImageIndex, aryZone, result) { 
	return GetOCRProInfoInner(result);
}

function OnOCRSelectedImagesSuccess(result) {
	return GetOCRProInfoInner(result);
}

function GetOCRProInfo(sImageIndex, result) {        
	return GetOCRProInfoInner(result);
}

function GetOCRProInfoInner(result) {  
	if (result == null)
		return null;
		
	var pageCount = result.GetPageCount();
	if (pageCount == 0) {
		alert("OCR result is Null.");
		return;
	} else {

		var bRet = "";
		for (var i = 0; i < pageCount; i++) {
			var page = result.GetPageContent(i);
			var letterCount = page.GetLettersCount();
			for (var n = 0; n < letterCount; n++) {
				var letter = page.GetLetterContent(n);
				bRet += letter.GetText();

			}
		}
	   //console.log(bRet);  //Get OCR result.
	}

	if(savePath.length > 1)
		result.Save(savePath);
}

var savePath;
function ds_start_ocr(bSave, count, index, path, name) {
	DWObject.UnregisterEvent('OnGetFilePath', ds_start_ocr);
	if(name.substr(-4) != _ocrResultFileType) {
		name += _ocrResultFileType;
	}
	if (path.length > 0 || name.length > 0)
		savePath = path + "\\" + name; 
	if (bSave == true && index != -1032) //if cancel, do not ocr
		DoOCRInner();
}

function DoOCR() {                
	if (DWObject) {
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}

		var saveTye = "";
		_ocrResultFileType = "";
		switch (OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val) {
			case EnumDWT_OCRProOutputFormat.OCRPFT_TXTS:
				_ocrResultFileType = ".txt";
				saveTye = "Plain Text(*.txt)";
				break;
			case EnumDWT_OCRProOutputFormat.OCRPFT_TXTCSV:
				_ocrResultFileType = ".csv";
				saveTye = "CSV(*.csv)";
				break;  
			case EnumDWT_OCRProOutputFormat.OCRPFT_TXTF:
				_ocrResultFileType = ".rtf";
				saveTye = "Rich Text Format(*.rtf)";
				break; 
			case EnumDWT_OCRProOutputFormat.OCRPFT_XML:
				_ocrResultFileType = ".xml";
				saveTye = "XML Document(*.xml)";
				break; 
			case EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF:
			case EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF_MRC:
				_ocrResultFileType = ".pdf";
				saveTye = "PDF(*.pdf)";
				break;     
		}
		var fileName = "result" + _ocrResultFileType;
		DWObject.RegisterEvent("OnGetFilePath", ds_start_ocr);
		DWObject.ShowFileDialog(true, saveTye, 0, "", fileName, true, false, 0); 

	  }
}


function DoOCRInner() {
	if (DWObject) {
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}
		var settings = Dynamsoft.WebTwain.Addon.OCRPro.NewSettings();
		var bMultipage = false;
		settings.RecognitionModule = OCRRecognitionModule[document.getElementById("ddlOCRRecognitionModule").selectedIndex].val;
		settings.Languages = OCRLanguages[document.getElementById("ddlLanguages").selectedIndex].val;
		settings.OutputFormat = OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val;
		var selectValue = OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val;
		if (selectValue == EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF ||
			selectValue == EnumDWT_OCRProOutputFormat.OCRPFT_IOTPDF_MRC) {
			bMultipage = true;
			settings.PDFVersion = OCRPDFVersion[document.getElementById("ddlPDFVersion").selectedIndex].val;
			settings.PDFAVersion = OCRPDFAVersion[document.getElementById("ddlPDFAVersion").selectedIndex].val;
		}
		if (document.getElementById("chkUseRedaction").checked) {
			settings.Redaction.FindText = document.getElementById("txtFindText").value;
			settings.Redaction.FindTextFlags = OCRFindTextFlags[document.getElementById("ddlFindTextFlags").selectedIndex].val;
			settings.Redaction.FindTextAction = OCRFindTextAction[document.getElementById("ddlFindTextAction").selectedIndex].val;
		}
		DWObject.Addon.OCRPro.Settings = settings;

		//Get ocr result.
		if (_iLeft != 0 || _iTop != 0 || _iRight != 0 || _iBottom != 0) {

			var zoneArray = [];
			var zone = Dynamsoft.WebTwain.Addon.OCRPro.NewOCRZone(_iLeft, _iTop, _iRight, _iBottom);
			zoneArray.push(zone);
			DWObject.Addon.OCRPro.RecognizeRect(DWObject.CurrentImageIndexInBuffer, zoneArray, GetRectOCRProInfo, GetErrorInfo);
		}
		else if(bMultipage) {
			var nCount = DWObject.HowManyImagesInBuffer;
			DWObject.SelectedImagesCount = nCount;
			for(var i = 0; i < nCount;i++) {
				 DWObject.SetSelectedImageIndex(i,i);
			}
			DWObject.Addon.OCRPro.RecognizeSelectedImages(OnOCRSelectedImagesSuccess, GetErrorInfo);
		}
		else {
			DWObject.Addon.OCRPro.Recognize(DWObject.CurrentImageIndexInBuffer, GetOCRProInfo, GetErrorInfo);
		}
	}
}