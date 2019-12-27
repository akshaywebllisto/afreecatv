function _au()
{
	

	var szReferer = '';
	var szParent  = '';
	var szType    = '';
	var szActionType = '';

	//리소스 처리 하기

	var nTotalResourceCnt = 0;
	var nTotalResourceDuration = 0;
	var nMAxResourceDuration = 0;
	var nMAxResourceDurationObject = 0;
	var szEtc = "";
	var bWebview = "";

	try{
		if("performance" in window == true) 
		{

			var aResource = performance.getEntriesByType("resource");
			for(var i = 0; i < aResource.length; i++) {
			
				if( aResource[i].duration > nMAxResourceDuration ){
					nMAxResourceDuration = aResource[i].duration;

					var ResourceObject = {"name":  encodeURIComponent(aResource[i].name) , "type" : aResource[i].initiatorType, "duration" : aResource[i].duration.toFixed(2)} ;
					nMAxResourceDurationObject = ResourceObject;

				}
				nTotalResourceCnt++;
				nTotalResourceDuration +=  aResource[i].duration;
			}

			//퍼포먼스 객체를 가공해줌 // 전송 데이터 양을 줄이려고
			var oPerformance = {"prompt":performance.timing.fetchStart-performance.timing.navigationStart,"unload":performance.timing.unloadEventEnd-performance.timing.unloadEventStart,"redirect":performance.timing.redirectEnd-performance.timing.redirectStart,
								"appcache":performance.timing.domainLookupStart-performance.timing.fetchStart, "dns":performance.timing.domainLookupEnd-performance.timing.domainLookupStart , "tcp":performance.timing.connectEnd-performance.timing.connectStart,
								"request":performance.timing.responseStart-performance.timing.requestStart, "responce":performance.timing.responseEnd-performance.timing.responseStart, "domloading":performance.timing.domInteractive-performance.timing.domLoading,
								"domactive":performance.timing.domContentLoadedEventStart-performance.timing.domInteractive, "domevent":performance.timing.domContentLoadedEventEnd-performance.timing.domContentLoadedEventStart, "domtotal":performance.timing.domComplete-performance.timing.domLoading,
								"onload":performance.timing.loadEventEnd-performance.timing.loadEventStart, "totalduration" : performance.timing.loadEventEnd-performance.timing.navigationStart , "resorcecnt": nTotalResourceCnt, "resorcetdur": nTotalResourceDuration.toFixed(2), "resorcemdur": nMAxResourceDuration.toFixed(2), "resorcemobj" :nMAxResourceDurationObject };

			szEtc = JSON.stringify(oPerformance);
		}
	}
	catch(e){
	}

	try {
		szParent  = location.href;
		szType    = (window.szSystemType != undefined ? window.szSystemType : '');
		szActionType  = (window.szLogAction != undefined ? window.szLogAction : '');
		szReferer = (document.referrer != '' ? document.referrer : (opener ? opener.location.href : ""));

		if (navigator && navigator.userAgent)	{
			bWebview = (RegExp("(Afreeca Webview)|([\\s\\(]wv[\\s\\)])", "i").test(navigator.userAgent)) ? "true" : "false";
		}

	}
	catch(e) {

	}

	var aParam = [];
	aParam.push("referer=" + encodeURIComponent(szReferer));
	aParam.push("parent=" + encodeURIComponent(szParent));
	aParam.push("type=" + szType);
	aParam.push("action=" + szActionType);
	aParam.push("szEtc=" + szEtc);

	if (bWebview !== "")	{
		aParam.push("webview=" + bWebview);
	}

	try {
		var _au = document.createElement("script"); _au.setAttribute("type", "text/javascript");
			_au.setAttribute("src", "//analysis.afreecatv.com/_au.php?" + aParam.join("&"));
			document.getElementsByTagName("head")[0].appendChild(_au);
	}
	catch(e) {
		
	}
}

_au();
