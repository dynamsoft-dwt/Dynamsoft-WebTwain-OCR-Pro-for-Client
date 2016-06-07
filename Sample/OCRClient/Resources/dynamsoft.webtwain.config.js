//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2016, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 11.3.1
//
/// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = true;
///
Dynamsoft.WebTwainEnv.Containers = [{ContainerId:'dwtcontrolContainer', Width:'506px', Height:'650px'}];
///
Dynamsoft.WebTwainEnv.ProductKey = '734F9FE084D6BE236FE62B557B3E38E19C31EAA9BFA719CBE2800CCA401A1C01A2455CF26BE05E830D5F4C80350B84390565C120B6880C7B1DC6246FC3A68738608FC04E21343D60C19043FC470B04E210A1963D879F7C4A18DD7DA0CF5C8AB05D070B08942A28BD1AC8703C6F6F3DB55F0BA0C8BF3990430A7E4742BEC7583D353152E8123897F7F773FDC4E7C84E651CEF82DC76727C35A770388D02482509F6D68E1056A6F1D117CB1FAADA259E';
///
Dynamsoft.WebTwainEnv.Trial = true;//false;

Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = true;//false;
///
Dynamsoft.WebTwainEnv.Debug = false; // only for debugger output
///
Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
///
//Dynamsoft.WebTwainEnv.ScanDirectly = true;


/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.

// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });

