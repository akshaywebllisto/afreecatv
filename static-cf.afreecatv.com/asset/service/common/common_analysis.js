var oAnalysisUtil = {
	// 데이터 초기화
	szUrl : '//eventapi.' + DOMAIN + '/set_log_api.php'
	,base64_encode : function( szData  ){
		if (window.btoa) // Internet Explorer 10 and above
		{
			 return window.btoa(unescape(encodeURIComponent( szData )));
		}
		else
		{
			// Cross-Browser Method (compressed)
			// Create Base64 Object
			var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
			// Encode the String
			return Base64.encode(unescape(encodeURIComponent( szData )));
		}
	}
	,base64_decode : function( szData ){
		if (window.atob) // Internet Explorer 10 and above
		{
			return decodeURIComponent(escape(window.atob( szData )));
		}
		else
		{
			// Cross-Browser Method (compressed)
			// Create Base64 Object
			var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
			// Encode the String
			return decodeURIComponent(escape(Base64.decode( szData )));
		}
	}
	,setTranslationLog : function( szActionType, szSendData, szSysType ) {
		if (typeof(szSysType) == 'undefined' || szSysType == '')
		{
			szSysType = 'web'
		}

		//$.ajaxSettings.traditional = true;
		$.ajax({
			type : "POST"
			, url: this.szUrl
			, data : {
				sztype : 'TRANSLATION'
				,action_type : szActionType
				,send_data : szSendData
				,sys_type : szSysType
			}
			, dataType	: 'json'
			, cache	: false
			, crossDomain: true
			, xhrFields: {
				withCredentials: true
			}
			, beforeSend : function(request) {
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
			}
			, success : function( data ) {
			}
			, error : function(jqXHR, textStatus, errorThrown ) {
			}
			, complete : function(jqXHR, textStatus ) {
			}
		});
	}
	,setClickLog : function( szCodeType, szSendData, szSysType ) {
		// ucc
		szSendData = szSendData.replace('szBjId', 'bj_id');
		szSendData = szSendData.replace('nBbsNo', 'bbs_no');
		szSendData = szSendData.replace('nTitleNo', 'title_no');
		szSendData = szSendData.replace('szCategory', 'category_no');

		// sports
		szSendData = szSendData.replace('b_no', 'bbs_no');
		szSendData = szSendData.replace('c_id', 'category_id');

		if (typeof(szSysType) == 'undefined' || szSysType == '')
		{
			szSysType = 'web'
		}

		var oData = {
			sztype : 'CLICK'
			,code_type : szCodeType
			,send_data : szSendData
			,sys_type : szSysType
		};

		//$.ajaxSettings.traditional = true;
		$.ajax({
			type : "POST"
			, url: this.szUrl
			, data : oData
			, dataType	: 'json'
			, cache	: false
			, crossDomain: true
			, xhrFields: {
				withCredentials: true
			}
			, beforeSend : function(request) {
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
			}
			, success : function( data ) {
			}
			, error : function(jqXHR, textStatus, errorThrown ) {
			}
			, complete : function(jqXHR, textStatus ) {
			}
		});
	}
    , setInflowLog: function (codeType, contentNo, addData, isSet, paramPathKey) {
    	//@TODO. logData 엔 몇번째 항목까지 쓸건지 체크해봐야 할 듯
    	var logData, inflowLogData;
    	if (typeof (addData['path1']) !== 'undefined') {
    		logData = $.extend(logData, {
    			path1: addData['path1']
    		});
    		inflowLogData = $.extend(inflowLogData, {
    			path1: addData['path1']
    		});
    	}
    	if (typeof (addData['path2']) !== 'undefined') {
    		logData = $.extend(logData, {
    			path2: addData['path2']
    		});
    		inflowLogData = $.extend(inflowLogData, {
    			path2: addData['path2']
    		});
    	}
    	if (typeof (addData['path3']) !== 'undefined') {
    		logData = $.extend(logData, {
    			path3: addData['path3']
    		});
    		inflowLogData = $.extend(inflowLogData, {
    			path3: addData['path3']
    		});
    	}
    	if (typeof (addData['path4']) !== 'undefined') {
			// VOD의 경우 VOD LOG에도 path4 기록하기로
			if (codeType == 'VOD') {
				logData = $.extend(logData, {
					path4: addData['path4']
				});
			}
    		inflowLogData = $.extend(inflowLogData, {
    			path4: addData['path4']
    		});
    	}

    	inflowLogData = $.extend(inflowLogData, {
    		referer: location.href
    	});

		var path_key;
    	var tmToday = new Date();
                
		// 이미 세팅된 path_key 값 전달 받은게 있다면 그거를 path_key 세팅
		if (typeof paramPathKey !== 'undefined') {
			path_key = paramPathKey;
		} else {
            Parse_Cookie(document);
            var _au = Read_Cookie("_au");
            //@TODO. _au가 없을 경우엔 키를 뭐로 할까나..            
            path_key = _au + '_' + contentNo + '_' + tmToday.getTime();
        }
        //@TODO. 키를 한번 암호화라도 해야 하려나? 중복되믄 어케?

    	logData = $.extend(logData, {
    		path_key: path_key
		});

    	var name;
    	var value;
    	switch (codeType) {
    		case 'LIVE':
    			name = 'LIN';
    			value = $.param(logData);
    			inflowLogData = $.extend(inflowLogData, {
    				broad_no: contentNo
    			});
    			break;
    		case 'VOD':
    			name = 'VIN';
    			value = $.param(logData);
    			inflowLogData = $.extend(inflowLogData, {
    				title_no: contentNo
    			});
    			break;
    	}

    	$.ajax({
    		type: "POST",
    		url: this.szUrl,
    		data: {
    			sztype: 'INFLOW_PATH',
    			code_type: codeType,
    			path_key: path_key,
    			send_data: $.param(inflowLogData),
    			sys_type: 'web'
    		},
    		dataType: 'json',
    		cache: false,
    		crossDomain: true,
    		xhrFields: {
    			withCredentials: true
    		},
    		beforeSend: function (request) {
    			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    		},
    		success: function (data) {},
    		error: function (jqXHR, textStatus, errorThrown) {},
    		complete: function (jqXHR, textStatus) {}
    	});

    	if (typeof isSet == 'undefined') {
    		tmToday.setTime(tmToday.getTime() + (10 * 1000)); //10초 후 만료

    		document.cookie = name + '=' + escape(value) + '; ' +
    			"path=/; expires=" + tmToday.toGMTString() + '; ' +
    			"domain=" + DOMAIN + ";";
    	} else {
    		return value;
		}
		
	}
    , setVodPath: function (path1, path2, path3, path4, setType) {
		var fullpath = {};

		if (typeof setType == "undefined") {
			setType = 0;
		}

		// 유입 경로 데이터 세팅
		if (path1 !== undefined && path2 !== undefined && path3 !== undefined && path4 !== undefined) {
			fullpath = {path1:path1, path2:path2, path3:path3, path4:path4};
		}else if (path1 !== undefined && path2 !== undefined && path3 !== undefined) {
			fullpath = {path1:path1, path2:path2, path3:path3};
		} else if (path1 !== undefined && path2 !== undefined) {
			fullpath = {path1:path1, path2:path2};
		}else if(path1 !== undefined){
			fullpath = {path1:path1};
		}else{
			fullpath = {path1:'etc'};
		}

		// 디폴트 형태
		if(setType == 0){
			fullpath = JSON.stringify(fullpath).replace(/"/g, "'");
		}

		return fullpath;
	}
    , sendLiveInflowLog : function (bjId, broadNo, addData, paramPathKey, sendLogLength, szReferer) {
        this.sendInflowLog2('LIVE', bjId, broadNo, addData, paramPathKey, sendLogLength, szReferer);
    }
    , sendVodInflowLog : function (bjId, titleNo, addData, paramPathKey) {
        this.sendInflowLog2('VOD', bjId, titleNo, addData, paramPathKey);
    }
    , sendInflowLog: function (codeType, contentNo, addData, paramPathKey, sendLogLength, szReferer) {
        this.sendInflowLog2(codeType, '', contentNo, addData, paramPathKey, sendLogLength, szReferer);
    }
    , sendInflowLog2 : function (codeType, bjId, contentNo, addData, paramPathKey, sendLogLength, szReferer) {
        //@TODO. codeType, contentNo, addData, paramPathKey xss 필터링
    	var logData, inflowLogData;
        var tmpData = addData;
        
        //로그 전송용 경로
        inflowLogData = this.convertInflowPath.apply(this, tmpData); 
        //쿠키 세팅용 경로 (경로 중 일부만 세팅하고 싶으면 sendLogLength 값으로 slice 처리
        if(typeof sendLogLength !== 'undefined' && $.isNumeric(sendLogLength) && sendLogLength < 0) {
            logData = this.convertInflowPath.apply(this, tmpData.slice(0, sendLogLength));
        } else {
            logData = inflowLogData;
        }
        
        var referer = (typeof szReferer !== 'undefined' && szReferer !== null) ? szReferer : location.href;                
        inflowLogData = $.extend({
    		referer: referer
    	}, inflowLogData);   
        
        var path_key;
    	var tmToday = new Date();
         
		// 이미 세팅된 path_key 값 전달 받은게 있다면 그거를 path_key 세팅
		if (typeof paramPathKey !== 'undefined' && paramPathKey !== null && paramPathKey !== '') {
			path_key = paramPathKey;
		} else {
            //Parse_Cookie(document);
            //var _au = Read_Cookie("_au");
            var _au = this.getCookie('_au');
            //@TODO. _au가 없을 경우엔 키를 뭐로 할까나..            
            path_key = _au + '_' + ((typeof contentNo !== 'undefined' && contentNo !== null && contentNo !== '' && Number(contentNo) !== 0) ? contentNo : bjId) + '_' + tmToday.getTime();
        }
        //@TODO. 키를 한번 암호화라도 해야 하려나? 중복되믄 어케?

    	logData = $.extend({
    		path_key: path_key
		}, logData);

    	
        var name;
    	var value;
    	switch (codeType) {
    		case 'LIVE':
    			name = 'LIN';
    			value = $.param(logData);
    			inflowLogData = $.extend({
                    bj_id : bjId,
    				broad_no: contentNo                    
    			}, inflowLogData);
    			break;
    		case 'VOD':
    			name = 'VIN';
    			value = $.param(logData);
    			inflowLogData = $.extend({
                    bj_id : bjId,
    				title_no: contentNo
    			}, inflowLogData);
    			break;
    	}
        
        $.ajax({
    		type: "POST",
    		url: this.szUrl,
    		data: {
    			sztype: 'INFLOW_PATH',
    			code_type: codeType,
    			path_key: path_key,
    			send_data: $.param(inflowLogData),
    			sys_type: 'web'
    		},
    		dataType: 'json',
    		cache: false,
    		crossDomain: true,
    		xhrFields: {
    			withCredentials: true
    		},
    		beforeSend: function (request) {
    			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    		},
    		success: function (data) {},
    		error: function (jqXHR, textStatus, errorThrown) {},
    		complete: function (jqXHR, textStatus) {}
    	});

    	tmToday.setTime(tmToday.getTime() + (10 * 1000)); //10초 후 만료

    	document.cookie = name + '=' + escape(value) + '; ' +
    		"path=/; expires=" + tmToday.toGMTString() + '; ' +
    		"domain=" + DOMAIN + ";";
	}
    , convertInflowPath : function (path1, path2, path3, path4) {
		var fullpath = {};
        
        // 유입 경로 데이터 세팅
		if (path1 !== undefined && path2 !== undefined && path3 !== undefined && path4 !== undefined) {
            fullpath = {path1:path1, path2:path2, path3:path3, path4:path4};
        } else if (path1 !== undefined && path2 !== undefined && path3 !== undefined) {
			fullpath = {path1:path1, path2:path2, path3:path3};
		} else if (path1 !== undefined && path2 !== undefined) {
			fullpath = {path1:path1, path2:path2};
		} else if(path1 !== undefined){
			fullpath = {path1:path1};
		} else{
			fullpath = {path1:'etc'};
		}

		return fullpath;
	}
    , getCookie : function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
