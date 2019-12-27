//pm시풀기
if( document.location.protocol!="https:" )
{
    document.writeln('<script type="text/javascript"src="//static.file.afreecatv.com/pm/afreeca_full_pm.js"></script>');
}

var bLayerPopUp = false;		// 페이어 팝업 출력 유무

var bIsplaying=false;              // 시간 제한 두기위함
var oTimeId;
var Max_Time = 5000;

var szLocalUrl = "http://127.0.0.1:21201";  // AFCPackage와의 통신을 위함

// 공지사항 new 아이콘
function getIcon(flag)
{
	if(flag=='Y') {
		return '<img src="'+AFREECA_AUTO+'/images/help/icon_n.jpg" alt="new" />';
	} else {
		return '';
	}
}

//시간 제한 루틴
function ClearTimeout()
{
	bIsplaying = false;
	clearTimeout(oTimeId);
}

function isPossblePlaying()
{
	if( ! bIsplaying )
	{
		bIsplaying = true;
		clearTimeout(oTimeId);
		oTimeId = setTimeout("ClearTimeout()",Max_Time);
		return true;
	}
	else
	{
		return false;
	}
}

// 튜토리얼
function openTutorial()
{
	window.open( AFREECA+"/tutorial/tutorial_new.html", null, "height=595, width=960, toolbar=no,menubar=no,location=no, top=250, left=250,scrollbars=yes");
}

// 다운받기(다운로드 창 열기)
function openDownload()
{
	directDownload();
}
// 다운받기(바로 다운로드)
function directDownload()
{
	window.open( AFUPD1_NONE_SCHEME+"/afreeca_installer_s.exe", '_self');
}

// 해당 회원의 방송국 바로가기
function goStation(szId)
{
	if (szId == null || szId == "") {
		parent.location.href = AFREECA;
	} else {
		if (location.href == AFREECA+"/afreeca_app_main.htm") {
			goStationBlank(szId);
		} else {
			parent.location.href = BJ_AFREECA + '/' +szId;
		}
	}
}

function goStationBlank(szId)
{
	window.open(BJ_AFREECA + '/' + szId, "", "");

}

// 해당 회원의 동영상 리스트로 바로가기
function goOnDemand(szId)
{
	if (szId == null || szId == "")
	{
		parent.location.href = AFREECA;
	}
	else
	{
		parent.location.href = LIVE_8079 + "/app/index.cgi?szType=list_ucc_bbs&szBjId=" + szId;
	}
}

// 아이프레임 내에서 랭킹 바로가기(메인+로그인)
function goRank(szWhich)
{
	if(szWhich=="" || szWhich==null)
	{
		parent.location.href = AFEVENT2_8120 + "/app/rank/index.php";
	}
	else
	{
		parent.location.href = AFEVENT2_8120 + "/app/rank/index.php?szWhich="+szWhich;
	}
}

// 아이프레임 내에서 쪽지 바로가기
function goNote()
{
	var szUrl	= NOTE_8133 + "/app/index.php";
	try
	{
		if( parent.location == location )
		{
			location.href = szUrl;
		}
		else
		{
			parent.location.href = szUrl;
		}
	}
	catch (e)
	{
		location.href = szUrl;
	}
}

// 쪽지 보내기 팝업 열기
function goSendNote( szUserId )
{
	// 실명인증 체크
	$.ajax({
		url: MEMBER_8111 + "/app/chk_real_name.php"
		, type : 'post'
		, data : 'szWork=CHK_UID&szReturnType=jsonp&szCallback=?'
		, dataType : 'jsonp'
		, success : function ( result )
		{
			var szResult = result.CHANNEL[0];
			if ( szResult.RESULT != '200' )
			{
				return 0;
			}
			else if ( szResult.NAMECHK != 1 )
			{
				alert('비실명 아이디는 쪽지보내기가 불가능 합니다.');
				return;
			}
			else if (szResult.NAMECHK == 1)
			{
				if( szUserId == 'undefined' || szUserId == null )
				{
					szUserId = '';
				}

				var oWindow = window.open(NOTE_8133 + "/app/index.php?page=write&id_list=" + szUserId, 'noteWriteWindow','left=10,top=10,width=400,height=440,marginwidth=0,marginheight=0,resizable=0,scrollbars=no');
				if( !oWindow ) alert( "차단된 팝업을 허용해주세요.");
				else    oWindow.focus();
			}
		}
		, error : function (jqXHR, textStatus)
		{
			//console.log(textStatus);
			return 0;
		}
	});

}

/**
  *	@brief 쪽지 카운트 api 호출
  */
function getNoteCnt( spnId )
{
	include_js( NOTE_8133 + "/api/note_cnt_api.php?szType=json&szScriptVar=oNoteInfo", onLoadNoteCnt, "scrNote", spnId );
}

/**
  *	@brief 쪽지 카운트 출력
  */
function onLoadNoteCnt( spnId )
{
	try
	{
		eval( oNoteInfo );

		if( oNoteInfo.CHANNEL.RESULT  == 1 )
		{
			var nNoteCnt = oNoteInfo.CHANNEL.NOTE_CNT;

			try
			{
				document.getElementById( spnId ).innerHTML = nNoteCnt;
			}
			catch(e2)
			{
				document.write( nNoteCnt );
			}
		}
	}
	catch(e)
	{
	}
}

// 아이프레임 내에서 포인트 바로가기(메인+로그인) - 2008/03/11
function goPoint(szWhich)
{
	var szUrl = "";

	if( !checkPointPm() )
	{
		alert("[아프리카TV 정기점검]\n지금은 서비스 점검중입니다.\n\n서비스 점검시간\n" + PMSPM_TEXT );
		return;
	}

	switch( szWhich )
	{
		case "point" :
			szUrl = POINT + "/report/AfreecaUserOutList.asp";
			break;

		case "quickview" :
			szUrl = ITEM_DOMAIN + "/quickview.php";
			break;

		case "abroad" :
			szUrl = AFREECA + "/abroad.htm";
			break;

		case "balloon" :
			szUrl = ITEM_DOMAIN + "/starballoon.php";
			break;

		case "alimi" :
			szUrl = AFREECA + "/alimi.htm";
			break;

		case "my" :
			szUrl = POINT + "/report/AfreecaUseList.asp";
			break;

		case "my_balloon" :
			szUrl = POINT + "/Report/AfreecaBalloonList.asp";
			break;

		case "gold" :
			szUrl = ITEM_DOMAIN + "/gold.php";
			break;

		case "sticker" :
			szUrl = ITEM_DOMAIN + "/sticker.php";
			break;

		case "chocolate" :
			szUrl = ITEM_80 + "/choco/index.php?ctrl=choco_item_user_controller&func=view_item_desc";
			break;

		case "fanlove" :
			szUrl = ITEM_NONE_SCHEME + "/myitem_sticker.php";
			break;

		case "sportshout" :
			szUrl = AFWBBS1_8081 + "/app/index.php?board=sportshout";
			break;

		case "kboshout" :
			szUrl = AFREECA + "/kboshout.htm";
			break;

		case "chatcon" :
			szUrl = AFWBBS1_8081 + "/app/index.php?board=chatcon";
			break;

		case "free" :
			szUrl = AFREECA + "/fpoint.htm";
			break;
		case 'my_hopeballoon':
			szUrl = POINT + '/Hope/HopePassFrm.asp?pagetype=Hope';
			break;
	}

	try
	{
		if( parent.location == location )
		{
			location.href = szUrl;
		}
		else
		{
			parent.location.href = szUrl;
		}
	}
	catch (e)
	{
		location.href = szUrl;
	}
}

// PMS PM여부 체크
function checkPointPm()
{
	var szDate = new Date();

	var szYear = szDate.getFullYear();
	var szMonth =  ((szDate.getMonth()+1 < 10)?"0":"")+(szDate.getMonth()+1);
	var szDay = ((szDate.getDate() < 10)?"0":"")+szDate.getDate();
	var szHours = ((szDate.getHours() < 10)?"0":"")+szDate.getHours();
	var szMinutes = ((szDate.getMinutes() < 10)?"0":"")+szDate.getMinutes();

	var szNowTm = String(szYear)+String(szMonth)+String(szDay)+String(szHours)+String(szMinutes);

	// 시간 체크
	if( szNowTm >= PMSPM_START_TM && szNowTm < PMSPM_END_TM )
	{
		return false;
	}
	return true;
}

// 풀페이지 PM여부 체크
function checkFullPagePm( nowtm, target )
{
	var szNowTm = nowtm;
	if( szNowTm == undefined || szNowTm == null || szNowTm == "" )
	{
		return;
	}

	var szFullUrl = AFREECA + "/pm/afreeca_pm_notice_full.htm";
	var szPopUrl = AFREECA + "/pm/afreeca_pm_notice_pop.htm";
	var szUrl = (target == "pop") ? szPopUrl : szFullUrl;

	// 시간 체크
	if( szNowTm >= FULLPM_START_TM && szNowTm < FULLPM_END_TM )
	{
		try
		{
			top.location.href = szUrl;
		}
		catch (e)
		{
			location.href = szUrl;
		}
		return false;
	}
	return true;
}

// 아이프레임 리사이즈
function ResizeFrame(frame_name,num)
{
	try
	{
		var objFrame = document.getElementById(frame_name);
		var objBody;

		if(window.navigator.appName.indexOf("Explorer") !=-1)		// IE
		{
			objBody = window.frames[frame_name].document.body;
			objFrame.height = objBody.scrollHeight + 10;
//			objFrame.height = objBody.scrollHeight + (objBody.offsetHeight-objBody.clientHeight);
		}
		else if(window.navigator.appName.indexOf("Opera") !=-1)		// Opera
		{
			objBody = objFrame.contentDocument.documentElement;
			objFrame.height = objBody.scrollHeight + 10;
		}
		else														// FF, Chrome, Safari
		{
			objBody = objFrame.contentDocument.documentElement;
			objFrame.height = objBody.offsetHeight + 10;
		}

		objFrame.style.height = objFrame.height + "px";
	}
	catch (e)
	{
	}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//리사이즈 안하는 팝업을 연다
function Pop_Open3( szUrl,szTitle,szStyle )
{
	var obj=window.open(szUrl,szTitle,szStyle);
}

//리사이즈 안하는 팝업을 연다
function Pop_Open2( szUrl,szTitle,nLeft,nTop,nWidth,nHeight )
{
	var obj=window.open(szUrl,szTitle,'left='+nLeft+', top='+nTop+', width='+nWidth+',height='+nHeight+",marginwidth=0,marginheight=0,resizable=0,scrollbars=no'");
}

//안에서 resizeto하는 팝업을 연다
function Pop_Open( szUrl,szTitle,nLeft,nTop )
{
	Pop_Open2( szUrl,szTitle,nLeft,nTop,10,10 );
}

// 풀페이지 로그인
function Go_Pop_Up_Login()
{
	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		var szHref = location.href;

		var szExp  =/&/g
		var szHref = szHref.replace(szExp,"%26");

		//#, #top삭제 IE에서만 에러가 남!
		var szExp = /#$|#top$/g
		var szHref = szHref.replace(szExp,"");

		location.href = LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri="+szHref;
		return 0;
	}
	return 1;
}

// 풀페이지 로그아웃(개인방송국에서 사용중)
function goStationLogOut()
{
	var szHref = location.href;

	var szExp  =/&/g
	var szHref = szHref.replace(szExp,"%26");

	//#, #top삭제 IE에서만 에러가 남!
	var szExp = /#$|#top$/g
	var szHref = szHref.replace(szExp,"");

	location.href = LOGIN_8100 + "/app/LogOut.php?szFrom=full&request_uri="+szHref;
}


//범위에 해당하는 난수를 생성하여 반환하는 함수 (아프리카TV에서 생긴 일에 사용)
function Return_Rand( szNo )
{
	var arRandNo=new Array();

	for(var i=0; i<szNo; i++)
	{
		arRandNo[arRandNo.length]=i;
	}

	arRandNo.sort( function(){return Math.random()*2-1;} );
	return arRandNo;
}

//범위에 해당하는 난수를 생성하여 반환하는 함수 (시작값 있음)
function Return_Rand2( szStartNo, szNo )
{
	var arRandNo=new Array();

	for(var i=szStartNo; i<szNo; i++)
	{
		arRandNo[arRandNo.length]=i;
	}

	arRandNo.sort( function(){return Math.random()*2-1;} );
	return arRandNo;
}

function createHttpRequest()
{
	if( window.ActiveXObject)
	{
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e2)
			{
				return null;
			}
		}
	}
	else if(window.XMLHttpRequest)
	{
		return new XMLHttpRequest();
	}
	else
	{
		return null;
	}
}

// 해외이용자 체크 결과를 쿠키로 구워줌 - by 박군 ( 메인개편 이후 디자인 )
function Abroad_Chk_Result( szData )
{
	if(szData == "OK")
	{
		try
		{
			parent.document.getElementById("divMainQuickview").className = "afreeca_item_abroad";
			parent.document.getElementById("divMainQuickview").innerHTML = '<ul><li><a href="#abroad" onClick="javascript:goPoint(\'abroad\');"><img src="'+AFREECA_AUTO+'/images/main/btn_item_abroad.gif" alt="해외이용자 입장권" class="on"/></a></li><li><a href="#balloon" onClick="javascript:goPoint(\'balloon\');"><img src="'+AFREECA_AUTO+'/images/main/btn_item_ball.gif" alt="별풍선" /></a></li><li><a href="#alimi" onclick="javascript:goPoint(\'alimi\');"><img src="'+AFREECA_AUTO+'/images/main/btn_item_alimi.gif" alt="알리미" /></a></li><li><a href="#my" onClick="javascript:goPoint(\'my\');"><img src="'+AFREECA_AUTO+'/images/main/btn_item_info.gif" alt="내 아이템 정보" /></a></li></ul>';
		}
		catch (e)
		{
			//메인페이지
		}

		try
		{
			parent.document.getElementById("imgQuickViewMenuBtn").src = AFREECA_AUTO + "/item/img_btn/sub_btn_ticket.gif";
		}
		catch (e2)
		{
			//서브페이지 좌측 메뉴
		}

		try
		{
			parent.ChangeTab();
		}
		catch (e3)
		{
			//아이템관련 탭
		}
	}

	return;
}

// get 메소드 파싱해서 가져오기 - by 박군
function getParam( szFullParam, szParamName)
{
	var szOnlyParam	= szFullParam.substr(1);

	var aOnlyParam	= szOnlyParam.split("&");

	for(i = 0; i < aOnlyParam.length; i++)
	{
		var aParam	= aOnlyParam[i].split("=");
		if( aParam[0] == szParamName)
		{
			return aParam[1];
		}
	}
	return '';
}

// 퀵뷰, 해외아이템 결제 팝업 - by 박군
function openPay(nItemId)
{
    if( !checkPointPm() )
	{
		alert("[아프리카TV 정기점검]\n지금은 서비스 점검중입니다.\n\n서비스 점검시간\n" + PMSPM_TEXT );
		return;
	}

	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		location.href = LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri=" + location.href;
	}
	else if( nItemId == 0)
	{
	}
	else
	{
		var szAbroad = Read_Cookie("AbroadChk");
		var szConfirmMsg = "잠깐!\n\n"
					+ "편리한 '퀵뷰 30일 자동결제'를 이용해보세요.\n"
					+ "일반 상품보다 10% 저렴한 3,500원에 퀵뷰를 즐길 수 있습니다.\n\n"
					+ " - 확인 : 자동결제 신청하기(3,500원)\n"
					+ " - 취소 : 일반 퀵뷰 30일 이용권 구매하기(3,900원)";

		if( nItemId == "463671" || nItemId == "456190" || nItemId == "462911" || nItemId == "462912" || nItemId == "462913" || nItemId == "465007" || nItemId == "465008" || nItemId == "465009" || nItemId == "676752" || nItemId == "676753" || nItemId == "676754" || nItemId == "710392")
		{
			if ( nItemId == "465007" || nItemId == "465008" || nItemId == "465009" )
			{
				window.open("","point","toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=436,height=529,top=0,left=0");
				document.formQvs.target = "point";
				document.formQvs.action =  MEMBER_8108+"/app/ipin_pm.php?szType=qvs&itemid="+nItemId;
				document.formQvs.submit();
			}
			/**** 퀵뷰 자동결제 유도 메시지 로직 20100719 제외(requester 임) 			*/
			else if ( nItemId == "462911" && confirm(szConfirmMsg)) // 퀵뷰자동결제 재확인 얼럿
			{
				var pop = window.open( POINT+"/SetAutoPay.asp?itemcnt=1&paytype=0&itemid=520800" + getAnalysisData(),"point", "toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=436,height=529,top=0,left=0");
				pop.focus();
			}
			else
			{
				var pop = window.open( POINT+"/afreeca_license_check.asp?itemcnt=1&paytype=0&itemid="+nItemId  + getAnalysisData(),"point", "toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=436,height=529,top=0,left=0");
				pop.focus();
			}
		}
		else if(nItemId == "520800") // 퀵뷰자동결제 상품
		{
			var pop = window.open( POINT+"/SetAutoPay.asp?itemcnt=1&paytype=0&itemid=" + nItemId + getAnalysisData(),"point", "toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=436,height=529,top=0,left=0");
			pop.focus();
		}
		else // 해외이용자는 속도체크 팝업
		{
			var pop = window.open( AFREECA+"/popup/abroad_speed_test.htm?itemid="+nItemId,"","width=530,height=457");
			pop.focus();
		}
	}
}

// 퀵뷰 무료체험 결제 팝업	- by 박군
function openFree()
{
	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		location.href = LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri=" + location.href;
	}
	else
	{
		window.open( POINT+"/afreeca/afreecafreeInsform.asp?itemid=364925","point", "toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=436,height=529,top=0,left=0");
	}
}

// 유료서비스 이용약관 팝업	- by 박군
function popPolicy()
{
	window.open( AFREECA+"/popup/pop_pay_policy.htm","point", "toolbar=0 ,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=1,width=540,height=650,top=0,left=0");
}

// 해외이용자 아이템 바로가기 막는 스크립트	- by 박군
function Abroad_Alert()
{
	if(location.href == AFREECA+"/afreeca_app_main.htm")
	{
		window.open( AFREECA+"/abroad.htm",'','');
	}
	else
	{
		location.href = AFREECA+"/abroad.htm";
	}
	return;
}

function self_resize()
{
	try
	{
		var bIsSP2 = false;
		var add_sp = 0;
		bIsSP2 = (window.navigator.userAgent.indexOf("SV1") != -1);
		if (bIsSP2)
		{
			// XP SP2 브라우저임..
			add_sp = 25;
		}
		else
		{
			add_sp = 0;
		}

		var oBody   = document.body;

		window.resizeTo(oBody.scrollWidth+10,oBody.scrollHeight + (oBody.offsetHeight-oBody.clientHeight)+add_sp  );
	}
	catch(e)
	{
		//Trace("jscript/pop_index.js 에 self_resize()오류:"+e.description);
	}
}

// vod 실행
function playVod( chatting_url,vod_server,vod_filename,broad_title )
{
	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		alert("아프리카TV 방송 시청을 위해서 로그인을 해주십시오.");
		if(location.href == LIVE_8057+"/pg_gen/afreeca_web_main.htm" )
		{
			return;
		}
		else
		{
			Go_Pop_Up_Login();
		}
		return;
	}

	if( Go_Pop_Up_Login() )
	{
		var obj= document.playerform;
		obj.chatting_url.value  = chatting_url;
		obj.vod_server.value    = vod_server;
		obj.vod_filename.value  = vod_filename;
		obj.broad_title.value   = broad_title;
		obj.control.value       = "play_broad";

		obj.action = LIVE_8057+"/app/index.php";
		obj.target = "common_action_frame";
		obj.submit();
	}
}

// 화면 가로 크기
function getClientWidth()
{
	var nClientWidth;
	if(self.innerWidth)
	{
		// IE 외 모든 브라우저
		nClientWidth = self.innerWidth;
	}
	else if(document.documentElement && document.documentElement.clientWidth)
	{
		// IE 6 만
		nClientWidth = document.documentElement.clientWidth;
	}
	else if(document.body)
	{
		// IE 계열(IE 6 제외)
		nClientWidth = document.body.clientWidth;
	}

	return nClientWidth;
}

// 화면 세로 크기
function getClientHeight()
{
	var nClientHeight;
	if(self.innerHeight)
	{
		// IE 외 모든 브라우저
		nClientHeight = self.innerHeight;
	}
	else if(document.documentElement && document.documentElement.clientHeight)
	{
		// IE 6 만
		nClientHeight = document.documentElement.clientHeight;
	}
	else if(document.body)
	{
		// IE 계열(IE 6 제외)
		nClientHeight = document.body.clientHeight;
	}

	return nClientHeight;
}

// IE6 브라우저 사용자 레이어 팝업 생성(1.0만 보이기/감추기)-110906
function chkBrowser(funcName, obj)
{
	if(bLayerPopUp)
	{
		bLayerPopUp = false;
		return false;
	}

	var brVer = navigator.userAgent;
	var brVerId = brVer.indexOf('MSIE');
	var brNum = brVer.substr(brVerId, 8);

	if(brNum == "MSIE 6.0")
	{
		var szHtml = '';
		szHtml += '<div style="position:relative; z-index:109; width:630px; height:560px; background:url('+AFREECA_AUTO+'/images/popup/ie8.gif) left top no-repeat;"><a href="'+ AFREECA_AUTO +' target="_new" title="afreeca" style="width:110px; height:40px; position:absolute; left:26px; top:8px; text-indent:-3000em; ">afreeca</a><a href="#" id="ie8_popup_close" onclick=popupclose("'+funcName+'","'+obj+'"); title="닫기" style="width:42px; height:42px; position:absolute; top:8px; left:570px; text-indent:-3000em; ">닫기</a><a href="http://windows.microsoft.com/ko-KR/internet-explorer/downloads/ie-8" title="explorer8 설치하기" target="_new" style="width:560px; height:66px; position:absolute; left:35px; top:445px; text-indent:-3000em;">explorer8 설치하기</a></div>';

		var layerpopup = document.getElementById("layerpopup");
		if(layerpopup != null)
		{
			document.body.removeChild(layerpopup);
		}

		var doc = document.body;
		var el_layerpopup = document.createElement('DIV');

		el_layerpopup.setAttribute("class", "layerpopup");
		el_layerpopup.setAttribute("id", "layerpopup");
		el_layerpopup.setAttribute("align", "center");
		el_layerpopup.style.cssText = "cursor:default; Z-INDEX: 999; LEFT: 0px; POSITION: absolute; TOP: 0px; border: solid;border-color: #dedede; border-width: 2px;";	// 태그의 style 값 설정(모든 브라우저에 적용됨)
		el_layerpopup.innerHTML = szHtml;

		doc.appendChild(el_layerpopup);

		// 팝업 출력 위치 설정
		var nDivPopupWidth = document.getElementById('layerpopup').clientWidth;
		var nDivPopupHeight = document.getElementById('layerpopup').clientHeight;

		var nLeftMargin = (getClientWidth() - nDivPopupWidth) / 2;
		var nTopMargin = (getClientHeight() - nDivPopupHeight) / 2 + document.body.scrollTop;

		if (nLeftMargin < 0) nLeftMargin = 0;
		if (nTopMargin < 0) nTopMargin = 0;

		document.getElementById('layerpopup').style.marginLeft = nLeftMargin + 'px';
		document.getElementById('layerpopup').style.marginTop = nTopMargin + 'px';

		el_layerpopup.style.display = "";
		return true;
	}
	else
	{
		bLayerPopUp = true;
		return false;
	}
}

// 레이어 팝업 닫기-110906
function popupclose(funcName, obj)
{
	var layerpopup = document.getElementById("layerpopup");
	layerpopup.style.display = "none";
	bLayerPopUp = true;

	//alert(funcName+"("+obj+")");
	eval(funcName+"("+obj+")");

	return;
}

// 플레이어 실행 (1.0/2.0 공통)
function runPlayer(act,etc)
{
	// IE6 사용자 레이어 팝업 출력
	if(act == "cast" || act == "app_player")
	{
		var bResult = chkBrowser('runPlayer', "'"+act+"','"+etc+"'");
		if( bResult ) { return; }
	}

	var szUrl = "";
	var szEtc = "";

	if(etc == undefined || etc == null)
	{
		etc = '';
	}

	if( isPossblePlaying() )
	{
		if( act == "cast" )
		{
			var aData = {
					nCaption : 2, // 2 스튜디오
                    szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
					};
			loadApp(aData);
			return;
		}
		else if( act == "app_player" )
		{
			var aData = {
					nCaption : 1, // 1.0 플레이어
					//szBjId : user_id, // 임의 아이디
					//nBroadNo : broad_no, // 임의 숫자
					//nMultiView : 0,   // 멀티 뷰 값
                    szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
			};
			loadApp(aData);
			return;
		}
		else
		{
			runFlashPlayer();
			return;
		}
	}
	else
	{
		alert( "실행중입니다. 잠시만 기다려주세요. " );
		return;
	}
}

// 스튜디오 실행(af_station 용)
function runPlayer2(act)
{
	// IE6 사용자 레이어 팝업 출력
	var bResult = chkBrowser('runPlayer2', "'"+act+"'");
	if( bResult ) { return; }

	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		if( act == 'cast' )
		{
			alert("아프리카TV 스튜디오 실행을 위해서 로그인을 해주십시오.");
			Go_Pop_Up_Login();
		}
		return;
	}

	if(  isPossblePlaying() )
	{
		var aData = {
				nCaption : 2, // 2은 스튜디오라고 가정
                szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
				};
		loadApp(aData);
		return;
	}
	else
	{
		alert( "실행중입니다. 잠시만 기다려주세요" )
		return;
	}
}

// 신규 스튜디오 실행
function runNewPlayer(act)
{
	// IE6 사용자 레이어 팝업 출력
	var bResult = chkBrowser('runNewPlayer', "'"+act+"'");
	if(bResult) { return; }

	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		if(act == 'cast')
		{
			alert("아프리카TV 스튜디오 실행을 위해서 로그인을 해주십시오.");
			Go_Pop_Up_Login();
		}
		return;
	}

	if(isPossblePlaying())
	{
		var aData = {
				nCaption : 4, // 4 : 뉴스튜디오
				szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
				};
		loadApp(aData);
		return;
	}
	else
	{
		alert( "실행중입니다. 잠시만 기다려주세요" )
		return;
	}
}

// AVE 실행
function runAvaPlayer(act,nUpdate)
{
	// IE6 사용자 레이어 팝업 출력
	var bResult = chkBrowser('runAvaPlayer', "'"+act+"'");
	if( bResult ) { return; }

	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		if( act == 'cast' )
		{
			alert("아프리카TV AVA 실행을 위해서 로그인을 해주십시오.");
			Go_Pop_Up_Login();
		}
		return;
	}
	//업데이트 안돼서 다시 실행할땐 실행중인 플레이어 체크하지않도록
	if(false == isPossblePlaying() && nUpdate == undefined)
	{
		alert( "실행중입니다. 잠시만 기다려주세요" )
		return;
	}
	else
	{
		var aData = {
			nCaption : 9, // AME
			szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
		};
		loadApp(aData);
	}
}

// Basecamp 실행
function runBasecamp()
{
	// IE6 사용자 레이어 팝업 출력
	var bResult = chkBrowser('runBasecamp', '');
	if( bResult ) { return; }

	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		//alert("아프리카TV VR플레이어 실행을 위해서 로그인을 해주십시오.");
		Go_Pop_Up_Login();
		return;
	}

	if(isPossblePlaying())
	{
		var aData = {
			nCaption : 7, // BASECAMP
			szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
		};
		loadApp(aData);
	}
	else 
	{
		alert( "실행중입니다. 잠시만 기다려주세요" )
		return;
	}
}

function fixBroadCall(uid, bjid, bno, ut, logic) {
	var _url = 'http://ddukbob.'+ DOMAIN +'/api_rin.php?m=rin&t=json&v=1.0&uid=' + uid + '&w=webk&bj=' + bjid + '&bno=' + bno + '&ref=' + uid + '&ut=' + ut + '&logic=' + logic;
	$.ajax({
		url: _url
		, dataType : 'jsonp'
		, success : function(data) {
			//console.log('##### call success.');
			//alert('call success');
		}
		, error : function(data) {
			//call error
			//alert('call error');
		}
	});
}

//아프리카TV 2.0 시청하기
function runSvlPlayer(uId, bNo)
{
	playBroad(bNo, 'flash', uId);
	return;
}

//아프리카TV 3.0 시청하기(플래시 플레이어)
function runFlashPlayer( uId, bNo )
{
	var szOpenUrl = PLAY_80;

	if( uId != null && uId != undefined && uId != '' )
	{
		szOpenUrl = PLAY_80 + "/" + uId;

		if(bNo != null && bNo != undefined && bNo != '')
		{
			szOpenUrl = PLAY_80 + "/" + uId + "/" + bNo;
		}
	}

	// 사업부 요청으로 player 새창으로 띄움
    //top.location.href = szOpenUrl;
    window.open(szOpenUrl,'_blank');

	return;
}

// trim function
function common_trim( szData )
{
	if( typeof(szData) == 'undefined' )
	{
		return szData;
	}
	else
	{
		szData = szData.toString();
		return szData.replace(/^\s+|\s+$/g, "");
	}
}

//아프리카TV 시청하기
function playBroad(broad_no, act, user_id, keyword)
{
	Parse_Cookie(document);

	// IE6 사용자 레이어 팝업 출력
	var bResult = chkBrowser('playBroad', "'"+broad_no+"','"+act+"','"+user_id+"'");
	if( bResult ) { return; }

	// 양끝 공백 제거
	broad_no = common_trim(broad_no);
	act = common_trim(act);
	user_id = common_trim(user_id);

	if( act == "app_launch" )
	{
		if(user_id == null || typeof(user_id) == 'undefined' || user_id == '')
		{
			user_id = broad_no;
			broad_no = '';
		}

		var aData = {
				nCaption : 1, // 0은 플레이어라고 가정
				szBjId : user_id, // 임의 아이디
				nBroadNo : broad_no, // 임의 숫자
				nMultiView : 0,   // 멀티 뷰 값
				szCookie : 'PdboxTicket=' + Read_Cookie('PdboxTicket') + '; PdboxUser=' + encodeURIComponent(Read_Cookie('PdboxUser')) + '; PdboxBbs=' + Read_Cookie('PdboxBbs') + '; isBbs=' + Read_Cookie('isBbs') + '; _au=' + Read_Cookie('_au') + '; OAX=' + Read_Cookie('OAX') + ';'
		};
		loadApp(aData);
		return;
	}
	else	// act in ( player, svl, flash, serch_byid )
	{
		if( user_id != null && typeof(user_id) != 'undefined' && user_id != '' )
		{
			runFlashPlayer(user_id, broad_no);
		}
		else
		{
			user_id = broad_no;
			runFlashPlayer( user_id );
		}
		return;
	}
}

function loadApp(aData) {
	var szDownUrl = '';
	if (aData['nCaption'] == 1) {
		szDownUrl = AFUPD1_NONE_SCHEME+'/afreeca_installer_p.exe';
	} else if( aData['nCaption'] == 4){
		szDownUrl = AFUPD1_NONE_SCHEME+'/afreeca_installer_s2.exe';
	} else if(aData['nCaption'] == 9){
		szDownUrl = AFUPD1_NONE_SCHEME+'/afreeca_installer_a.exe';
	} else if(aData['nCaption'] == 7){
		szDownUrl = AFUPD1_NONE_SCHEME+'/afreeca_installer_b.exe';
	} else {
		szDownUrl = AFUPD1_NONE_SCHEME+'/afreeca_installer_s.exe';
	}

    // HTTPS 일 경우 HTTP 팝업쪽으로 실행되게 수정
    if (document.location.protocol == 'https:') {
        var szOption = 'location=no, directories=no,resizable=no,status=no,';
        szOption += 'toolbar=no,menubar=no, width=1,height=1,left=0, top=0, scrollbars=no';
        window.open('http:' + RES_AFREECA_NONE_SCHEME + '/player.html?nCaption=' + aData.nCaption, 'popup_player_' + aData.nCaption, szOption);
        return;
    }
    // 닉네임 변경시도할때는 szCookie라는 값이 없어 에러가 발생하여 수정함
    if (aData['szCookie']) {
    	// 일부러 pdboxticket에 cookie_allow_id 값 -1 값으로 변경해서 넣어주기 위해(로그인 유지 미지원)
	    var aCookieList = aData['szCookie'].split('; ');
	    $.each(aCookieList, function(key, value) {
	        var aCookie = value.split('=');
	        if (aCookie[0] == 'PdboxTicket') {
	            // ticket이 비어있으면 반복문 종료
	            if (!aCookie[1] || aCookie[1] == 'null') {
	                return false;
	            }

	            $.ajax({
	                type: "POST",
	                url: "https://login.afreecatv.com/app/cookieallowchg.php",
	                data: {
	                    'PdboxTicket' : aCookie[1]
	                },
	                async: false,
	                success: function(response) {
	                    aCookie[1] = response;
	                }
	            });
	        }
	        aCookieList[key] = aCookie[0] + '=' + aCookie[1];
	    });
	    aData['szCookie'] = aCookieList.join('; ');
    }

	//IE7에서 아래 로직이 먹지않아 예외 처리
	if (navigator.userAgent.indexOf("MSIE 7.0") != -1) {
		$.ajax({
			type: "GET",
			url: this.szLocalUrl + '/?_=' + new Date().getTime() + '&callback=?',
			dataType: "jsonp",
			data: aData,
			async: true,
			success: function(response) {
				//예외 처리
				if(response.code < 0) {
					var szErrMsg = '잠시 후 다시 시도해보시기 바랍니다.';
					switch(response.code) {
						case -1:
							szErrMsg = "해당 BJ가 방송중이지 않습니다.";
							break;
						case -3:
							szErrMsg  = "아프리카 운영원칙 위반으로 서비스 이용이 정지 되었습니다." + '\n' +
										"정지기간 중 주민등록번호 도용 등을 통한 허위아이디 생성으로 동일한 위반행위를" + '\n' +
										"하실경우, 제재조치와는 별도로 관련법에 의거 법적인 처벌을 받을 수 있습니다.";
							break;
					}
					alert(szErrMsg);
				}
				if(response.update == 1 && aData['nCaption'] == 9) {
					setTimeout(function() {
						runAvaPlayer('cast',1);
					}, 3000);
				}
			}, error: function(jqXHR, textStatus, errorThrown)
			{
				//설치 링크
				window.open(szDownUrl);
			}
		});
		return;
	}

	var xdr;
	var url = szLocalUrl + '/?_=' + new Date().getTime() + '&';

	for(key in aData) {
		if(key == 'szCookie') {
			aData[key] = encodeURIComponent(aData[key]);
		}
		url += key + '=' + aData[key] + '&';
	}

	//IE 상위버전 처리
	if (window.XDomainRequest) {
		xdr = new XDomainRequest();
		xdr.timeout = 10000;
		xdr.ontimeout = function() {
			window.open( szDownUrl, '_self');
		}
		xdr.onerror = function() {
			window.open( szDownUrl, '_self');
		}
		xdr.onload = function() {
			//예외 처리
			var response = $.parseJSON(xdr.responseText);
			if(response.code < 0) {
				var szErrMsg = '잠시 후 다시 시도해보시기 바랍니다.';
				switch(response.code) {
					case -1:
							szErrMsg = "해당 BJ가 방송중이지 않습니다.";
							break;
					case -3:
						szErrMsg  = "아프리카 운영원칙 위반으로 서비스 이용이 정지 되었습니다." + '\n' +
									"정지기간 중 주민등록번호 도용 등을 통한 허위아이디 생성으로 동일한 위반행위를" + '\n' +
									"하실경우, 제재조치와는 별도로 관련법에 의거 법적인 처벌을 받을 수 있습니다.";
						break;
				}
				alert(szErrMsg);
			}
			if(response.update == 1 && aData['nCaption'] == 9) {
				setTimeout(function() {
					runAvaPlayer('cast',1);
				}, 3000);
			}
		}
		xdr.onprogress = function() {
		}
		xdr.open("GET", url);
	}
	//크롬 처리
	else if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xdr = new XMLHttpRequest();
		xdr.onreadystatechange = function() {
			if (xdr.readyState == XMLHttpRequest.DONE ) {
				if(xdr.status == 200){
					//예외 처리
					var response = $.parseJSON(xdr.responseText);
					if(response.code < 0) {
						var szErrMsg = '잠시 후 다시 시도해보시기 바랍니다.';
						switch(response.code) {
							case -1:
								szErrMsg = "해당 BJ가 방송중이지 않습니다.";
								break;
							case -3:
								szErrMsg  = "아프리카 운영원칙 위반으로 서비스 이용이 정지 되었습니다." + '\n' +
											"정지기간 중 주민등록번호 도용 등을 통한 허위아이디 생성으로 동일한 위반행위를" + '\n' +
											"하실경우, 제재조치와는 별도로 관련법에 의거 법적인 처벌을 받을 수 있습니다.";
								break;
						}
						alert(szErrMsg);
					}
					if(response.update == 1 && aData['nCaption'] == 9) {
						setTimeout(function() {
							runAvaPlayer('cast',1);
						}, 3000);
					}
				}
				else {
					window.open( szDownUrl, '_self');
				}
			}
		}
		xdr.open("GET", url, true);
	}
	else {
		//console.log('not work');
		return;
	}

	try{
		xdr.send();
	} catch (e) {
		//console.log('send catch :: ' + e.message);
	}
}

//아프리카TV 1.0 성인방 시청하기
function playAdultBroad(broad_no, act, user_id)
{
	playBroad(broad_no, act, user_id);
}

// 게임TV 플러그인 설치안내
function showPluginInstall()
{
	try{
		var bIsInstalled = false;
		if( BrowserCheck() == "" )
		{
			var aPlugins = navigator.plugins;

			for(var i=0; i<aPlugins.length; i++)
			{
				if(aPlugins[i].name.indexOf('AFCStarter') > -1)
				{
					bIsInstalled = true;
					break;
				}
			}

			if(bIsInstalled)
			{
				document.getElementById("afcPluginInfoDiv").innerHTML = '';
			}
			else
			{
				printPluginInfo(AFUPD1_NONE_SCHEME + '/AFC/AFCUpdater.exe', 'Install');
			}
		}
	}catch(e)
	{
	}
}

//플러그인 설치 안내
function printPluginInfo(plink, type)
{
	var szHtml = '';
	//아프리카TV 메인에서
	if(type != "SeeAfreeca")
	{
		szHtml = '<div class="layer_plugin">';
	}
	else//개인방송국에서
	{
		szHtml = '<div class="layer_plugin mybs_position">';
	}

	szHtml = '<div class="layer_plugin">';

	szHtml += '<p class="blind">파이어폭스, 크롬, 사파리, 오페라 브라우저에서<br /> 원활한 이용을 위해 플러그인 설치가 필요합니다.</p>'
			+ '<a href="' + plink + '" class="plugin" title="플러그인 설치하기">플러그인 설치하기</a>'
			+ '<a href="javascript:closePluginInfo();" class="layer_close1" title="닫기">닫기</a>';

	szHtml += '</div>';
	try
	{
		document.getElementById('afcPluginInfoDiv').innerHTML = szHtml;
		try{
			document.getElementById('afcPluginLayer').style.display = 'block';
		}catch (e2){}
		return true;
	}
	catch(e)
	{
		//alert(e);
		return false;
	}
}

//플러그인 설치 닫기
function closePluginInfo()
{
	document.getElementById('afcPluginInfoDiv').innerHTML = '';
	try{
		document.getElementById('afcPluginLayer').style.display = 'none';
	}catch (e){}
}
// 메인 개편 이후 즐겨찾기 추가
function Add_Favorite(szId)
{
	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		alert("즐겨찾기 추가를 위해서 로그인 해주세요. ");
		return;
	}

	var szUserId = Read_Cookie("PdboxBbs");
	makeIframe( FAV_8057+"/afreeca/favorite_api.php?szWork=ADD&favorite=" + szId + "&szBjId=" + szUserId );
}
// 메인 개편 이후 즐겨찾기 추가
function Add_Favorite_station(szId)
{
	Parse_Cookie(document);
	var ticket = Read_Cookie("PdboxTicket");

	if (ticket == null || ticket == "")
	{
		Go_Pop_Up_Login();
		return;
	}

	var szUserId = Read_Cookie("PdboxBbs");
	makeIframe( FAV_8057+"/afreeca/favorite_api.php?szWork=ADD&favorite=" + szId + "&szBjId=" + szUserId );
}

// 메인개편 이후 퀵뷰 보유여부 표시
function dispItme()
{
	try
	{
		eval( objItem );

		Parse_Cookie(document);
		var szAbroad = Read_Cookie("AbroadChk");

		var nIsItem = objItem["isItem"];
		var szDetail = objItem["detail"][0];

		var szWhich = "quickview";
		var szItemName = "퀵뷰 ";
		var szAltText	= "구매";
		var szUrl = AFREECA+"/quickview.htm";
		var szItemImg = AFREECA_AUTO+"/images/main/login_a_btn03.gif";

		if( szAbroad == "OK" )		// 해외 이용자
		{
			szWhich = "abroad";
			szItemName = "해외이용자 입장권";
			szUrl = AFREECA+"/abroad.htm";

			if( nIsItem > 0 && szDetail == "ABROAD")		// 보유 아이템 있을 경우
			{
				szItemImg = AFREECA_AUTO+"/images/main/btn_on.gif";
				szAltText = "퀵뷰on";
			}
		}
		else
		{
			if( nIsItem > 0 )		// 보유 아이템 있을 경우
			{
				szWhich = "my";
				szUrl = POINT+"/report/afreecauselist.asp";
				szItemImg = AFREECA_AUTO+"/images/main/btn_on.gif";
				szAltText = "퀵뷰on";
			}
		}

		document.getElementById("spnItemName").innerHTML = '<a href="#point" class="quickv" onclick="javascript:goPoint(\'' + szWhich + '\');">' + szItemName + '</a>';
		document.getElementById("spnItemImg").innerHTML = '<a href="#point" onclick="javascript:goPoint(\'' + szWhich + '\');"><img src="' + szItemImg + '" alt="'+ szAltText +'" border="0"></a>';
	}
	catch (e)
	{
	}
}

// 링크 열기
function openLink(url, target)
{
	if( target == "_blank" || target == 1 )
	{
		Pop_Open3(url, 'openLink', 'toolbar=yes,menubar=yes,location=yes,resizable=yes,scrollbars=yes');
	}
	else
	{
		location.href = url;
	}
}

// 아이프레임 동적 생성
function makeIframe( szUrl )
{
	var iframe = document.createElement('iframe');

	iframe.style.width = '50';
	iframe.style.height = '0';
	iframe.setAttribute('src', szUrl);
	iframe.setAttribute('frameborder','0');

	document.getElementsByTagName('body').item(0).appendChild(iframe);
}

// 브라우저 버젼 체크
function checkBrowserVersion()
{
	if (new RegExp(/EDGE/).test(navigator.userAgent.toUpperCase())){
		return "EG";
	}else if(new RegExp(/Firefox/).test(navigator.userAgent)){
		return "FF";
	}else if(new RegExp(/Netscape/).test(navigator.userAgent)){
		return "NC";
	}else if(new RegExp(/MSIE/).test(navigator.userAgent)){
		return "IE";
	}
}

/**
 * @brief   GNB 영역 검색 타이틀 설정
 */
function setSearchData( nValue, oTitle, oSearchType, oSearchList )
{
	var szTitle = "";

	if(nValue == "broad")	{ szTitle = "생방송"; }
	else if(nValue == "vod") { szTitle = "동영상"; }
	else if(nValue == "bj") { szTitle = "BJ"; }

	try
	{
		oTitle.innerHTML = szTitle;
		oSearchType.value = nValue;
		szSearchType.value = nValue;
	}
	catch (e)
	{
	}

	oSearchList.style.display = 'none';
}

/**
 * @brief	GNB 영역 검색메뉴 설정
 */
function setSearchMenu( oSearchList )
{
	try
	{
		var szDisp = (oSearchList.style.display == "block") ? "none" : "block";
		oSearchList.style.display = szDisp;
	}
	catch (e)
	{
	}
}

/** 메인, 서브페이지 검색 체크
*	2012-11-07 검색개편으로 인해 수정됨. jhyun
*	안쓸듯...
*/
function checkSearch()
{
	var oForm = document.oSearchForm;
	if (oForm.szKeywordhidden != undefined)
	{
		oForm.szKeywordhidden.value = encodeURIComponent(oForm.szKeyword.value);
	}
	$('form[name=oSearchForm]').attr("action",AFREECA +"/total_search.html").submit();
	return false;
}

// 특수문자 제거
function isSpecial(szText)
{
	var szSpecial = /\+|\[|\&|\*|\(|\)|\+|\?|\#|\%/g;
	if(szSpecial.exec( szText))
	{
		return true;
	}
	return false;
}

// 특수문자 제거2
function isSpecial2(szText, szSpecial)
{
	if(szSpecial.exec( szText))
	{
		return true;
	}
	return false;
}

// 문자열을 정해진 byte수만큼 잘라냄
function getByteLength( szMsg, nMaxLen )
{
	try
	{
		var nBytes = 0;
		var str = szMsg.substring(0);

		if( str == null )
			return 0;

		for(var i=0; i<str.length; i++)
		{
			var nAsc = str.charCodeAt(i);

			if ( (nAsc > 0)  && (nAsc < 256) && (nAsc != '\r'))
				nBytes += 1;
			else
				nBytes += 2;

			if( nBytes > nMaxLen )	// 허용 수를 넘어서면
			{
				str = str.substr(0,i) + "..";
				break;
			}
		}
	}
	catch(e)
	{
	}
	return str;
}

// js 파일 동적 로딩
function include_js(file, callBackFunction, szId, callBackParam )
{
	try
	{
		var html_doc = document.getElementsByTagName('head')[0];
		//id값 추가 by mino 2009-03-24
		if(!szId || szId == 'undefined' || szId == null)
		{
			szId = 'json';
		}
		var removeTarget = document.getElementById(szId);
		if(removeTarget != 'undefined' && removeTarget!=null)
		{
			html_doc.removeChild( removeTarget );
		}
		//콜백 파라미터 추가
		if( callBackParam == 'undefined' || callBackParam == null )
		{
			callBackParam = '';
		}

		js = document.createElement('script');
		js.setAttribute('type', 'text/javascript');
		js.setAttribute('charset', 'euc-kr');
		js.setAttribute('id', szId);
		js.setAttribute('src', file);

		js.onloadDone = false;

		html_doc.appendChild(js);

		// Fires in IE, also modified the test to cover both states
		js.onreadystatechange = function () {
			if (/complete|loaded/.test(js.readyState) && !js.onloadDone ) {
				if( callBackFunction != null && callBackFunction != undefined )
				{
					js.onloadDone = true;
					callBackFunction( callBackParam );
				}
			}
		}
		// Fires in FF
		js.onload = function () {
			if( callBackFunction != null && callBackFunction != undefined && !js.onloadDone )
			{
				js.onloadDone = true;
				callBackFunction( callBackParam );
			}
		}
		return false;
	}
	catch (e)
	{
	}
}

// js 파일 동적 인클루드 완료 후 삭제
function remove_js(szId)
{
	try
	{
		var html_doc = document.getElementsByTagName('head')[0];
		if(!szId || szId == 'undefined' || szId == null)
		{
			szId = 'json';
		}
		var removeTarget = document.getElementById(szId);
		if(removeTarget != 'undefined' && removeTarget!=null)
		{
			html_doc.removeChild( removeTarget );
		}
		removeTarget = null;
	}
	catch (e)
	{
	}
}

// 속도체크
function Print_Ocx()
{
	document.write("<OBJECT id='AfSpeedCheck' style='WIDTH:0px; HEIGHT:15px' CODEBASE='"+AFREECA+"/ocx/AfSpeedCheck.cab#version=1,0,1,4' CLASSID=CLSID:0AE0F5F9-8233-49A4-A3C8-004CE190787B NAME='SpeedCheck'></OBJECT>");
}

// URL 복사
function copyCurUrl( szUrl )
{
	try
	{
		var bResult = false;

		if( window.clipboardData )		// IE
		{
			bResult = window.clipboardData.setData("Text", szUrl);
		}
		else
		{
			prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", szUrl);
			return;
		}

		if( bResult == true)
		{
			alert("게시물 주소가 복사되었습니다.\nCtrl+V 로 붙여넣기 할 수 있습니다.");
			return;
		}
	}
	catch (e)
	{
		alert( e.description );
	}
}

/**
   * @brief  StringBuffer 사용
   * @author	jwizard
   **/
var StringBuffer = function()
{
	this.buffer = new Array() ;
}

StringBuffer.prototype.append = function(str)
{
	this.buffer[this.buffer.length] = str ;
}

StringBuffer.prototype.toString = function()
{
	return this.buffer.join("") ;
}

function goFramePage( szUrl )
{
	try
	{
		top.location.href = szUrl;
	}
	catch (e)
	{
		location.href = szUrl;
	}
}

var $A = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0; i < iterable.length; i++)
      results.push(iterable[i]);
    return results;
  }
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function() {
   try{
    var __method = this, args = $A(arguments),object = args.shift();
    return function() {
      return __method.apply(object, args.concat($A(arguments)));
    }
   }catch(e){alert(e.message)}
  }
}
/**
  *	@brief 현재시간 yyyymmdd 형태로 리턴
  */
function getNowDate()
{
	var szDate = new Date();

	var szYear = szDate.getFullYear();
	var szMonth =  ((szDate.getMonth()+1 < 10)?"0":"")+(szDate.getMonth()+1);
	var szDay = ((szDate.getDate() < 10)?"0":"")+szDate.getDate();
	var szHours = ((szDate.getHours() < 10)?"0":"")+szDate.getHours();
	var szMinutes = ((szDate.getMinutes() < 10)?"0":"")+szDate.getMinutes();

	var szNowTm = String(szYear)+String(szMonth)+String(szDay)+String(szHours)+String(szMinutes);

	return szNowTm ;
}

/**
  *	@brief 날짜값 계산
  */
//addDate('20110503','year',3); //3년 후 날짜 반환
//addDate('20110503','month',5); //5개월 후 날짜 반환
//addDate('20110503','day',30);  //30일 후 날짜 반환
//addDate('20110503000000','hour',16); //16시간 후 날짜 반환
//addDate('20110503000000','minute',80); //80분 후 날짜 반환
//addDate('20110503000000','second',100); //100초 후 날짜 반환

function addDate(date, flag, cnt)
{
	date += "";
	flag = flag.toLowerCase();
	var year = date.substring(0,4);
	var month = Number(date.substring(4,6))-1;
	var day = date.substring(6,8);
	var hour = "";
	var minute = "";
	var second = "";

	if(date.length >= 10) hour = date.substring(8,10);
	if(date.length >= 12) minute = date.substring(10,12);
	if(date.length == 14) second = date.substring(12,14);

	date = date.length == 14 ? new Date(year, month, day, hour, minute, second).getTime() : new Date(year, month, day).getTime();

	if(flag == "year") date += 1000 * 60 * 60 * 24 * 365 * cnt;
	else if(flag == "month") date += 1000 * 60 * 60 * 24 * 30 * cnt;
	else if(flag == "day") date += 1000 * 60 * 60 * 24 * cnt;
	else if(flag == "hour") date += 1000 * 60 * 60 * cnt;
	else if(flag == "minute") date += 1000 * 60 * cnt;
	else if(flag == "second") date += 1000 * cnt;

	var d = new Date(date);
	year = d.getFullYear();
	month = d.getMonth()+1 < 10 ? "0" + (d.getMonth()+1) : d.getMonth()+1;
	day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
	hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
	minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
	second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

	return year + "" + month + day + hour + minute + second;
}

/**
  *	@brief 요일 구하기 날짜값 계산
  */
//getWeekday(20121217); //3년 후 날짜 반환
function getWeekday(sDate) {

	var yy = parseInt(sDate.substr(0,4), 10);
	var mm = parseInt(sDate.substr(4,2), 10);
	var dd = parseInt(sDate.substr(6,2), 10);

	var d = new Date(yy,mm - 1, dd);
	var weekday=new Array(7);
	weekday[0]="일";
	weekday[1]="월";
	weekday[2]="화";
	weekday[3]="수";
	weekday[4]="목";
	weekday[5]="금";
	weekday[6]="토";

	return weekday[d.getDay()];
}

function setPng24(obj)
{
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src='';
	return '';
}

/**
  *	@brief Form 객체 추가
  */
function createForm(name, action,target, method)
{
	var form = document.createElement("form");

	form.setAttribute("name", name);
	form.setAttribute("action", action);
	form.setAttribute("target", target);
	form.setAttribute("method", method);

	return form;
}

/**
  *	@brief element 객체 추가 (hidden)
  */
function insertInput(form, name, value)
{
	var input = document.createElement("input");

	input.setAttribute("type", "hidden");
	input.setAttribute("name", name);
	input.setAttribute("value", value);
	form.appendChild(input);

	return form;
}

function leadingZeros (n, digits)
{
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

function getTimeStamp ()
{
	var d = new Date();
	var s =
		this.leadingZeros(d.getFullYear(), 4) + '-' +
		this.leadingZeros(d.getMonth() + 1, 2) + '-' +
		this.leadingZeros(d.getDate(), 2) + ' ' +

		this.leadingZeros(d.getHours(), 2) + ':' +
		this.leadingZeros(d.getMinutes(), 2) + ':' +
		this.leadingZeros(d.getSeconds(), 2);

	return s;
}

function getReferer()
{
	var szReferer = '';

	try {
		szReferer = document.referrer != '' ? document.referrer : opener.location.href;
	} catch (e) {}

	return szReferer;
}

function getCookie(name)
{
	var srch = name + '=';
	if (document.cookie.length > 0)
	{
		offset = document.cookie.indexOf(srch);
		if (offset != -1)
		{
			offset += srch.length;
			end = document.cookie.indexOf(';', offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		} else return false;
	} else return false;
}

function callAU(szAction)
{
	var szProtocol = document.location.protocol;

	if(szProtocol == "http:" || szProtocol == "https:")
	{
		window.szLogAction = szAction;
		//window.performance = ;
		include_js('//analysis.afreecatv.com/_au.js', onLoadCallAu);
	}
}

function onLoadCallAu()
{
	window.szLogAction = '';
}

function callAnalytics()
{
	var szProtocol = document.location.protocol;
	if(szProtocol == "http:" || szProtocol == "https:")
	{
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-44889037-1', 'auto');
		ga('send', 'pageview');
	}
}

function strip_tags(input, allowed) {
	try {
	input = input.replace(/ /g, '');	//공백제거
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	}catch(err) {}
	return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}

// Regexp check data
function setRegData( szData )
{
	if( typeof(szData) == 'undefined' )
	{
		return '';
	}

	szData = szData.replace('[', '\\[');
	szData = szData.replace(']', '\\]');
	szData = szData.replace('(', '\\(');
	szData = szData.replace(')', '\\)');

	return szData;
}

function stationPmAlertMsg()
{
	alert('개인방송국 게시판 개편을 위한 서비스 점검 중입니다.\n(8/9 오후 17:30~ 8/10 오전 08:00)점검 시간 동안 본 서비스 사용이 중단됩니다.\n이용에 불편을 드려서 죄송합니다. 점검 후 더 나은 서비스로 찾아뵙겠습니다.');
	return;
}

function getFilterParam(szFullParam, szParamName)
{
    if (szFullParam.indexOf('?') >= 0) {
        var aTempFullParam = szFullParam.split('?');
        if (typeof(aTempFullParam[1]) != 'undefined') {
            szFullParam = aTempFullParam[1];
        }
    }

    var aFullParam = szFullParam.split("&");
    for (var i=0; i<aFullParam.length; i++) {
        if (aFullParam[i].indexOf('=') > 0) {
            var szQuery = aFullParam[i].split('=');
            if (szQuery[0] == szParamName) {
                return szQuery[1];
            }
        }
    }
	return '';
}

function getAnalysisData()
{
    var szReturnData = '';
    var szData = top.location.href;
    szReturnData += (getFilterParam(szData, 'sys_type') != '') ? '&sys_type=' + getFilterParam(szData, 'sys_type') : '';
    szReturnData += (getFilterParam(szData, 'location') != '') ? '&location=' + getFilterParam(szData, 'location') : '';
    szReturnData += (getFilterParam(szData, 'broad_no') != '') ? '&broad_no=' + getFilterParam(szData, 'broad_no') : '';
    szReturnData += (getFilterParam(szData, 'title_no') != '') ? '&title_no=' + getFilterParam(szData, 'title_no') : '';

    return szReturnData;
}

// disableScroll
function disableScroll() {
	$(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
		e.preventDefault();
		return;
	});
	$(document).on("keydown.disableScroll", function(e) {
		var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
		for (var i = 0; i < eventKeyArray.length; i++) {
			if (e.keyCode === eventKeyArray [i]) {
				e.preventDefault();
				return;
			}
		}
	});
}

// 통합검색 페이지 이동
function goTotalSearch(szSetKeyword, szTarget, szSetStype)
{
    if (szSetKeyword == undefined || szSetKeyword == '') {
        return false;
    }
    if (szTarget == undefined) {
        szTarget = '_blank';
    }

    // 검색시 필요한 인자값 di(직접), rc(추천), ac(자동), rt(연관), bn(배너)
    if (szSetStype == undefined || szSetStype == '') {
        szSetStype = 'di';
    }
    var szSetKeywordhidden = encodeURIComponent(szSetKeyword);
    var szFormName = 'form_search';

    var aHtml = [];

    aHtml.push('<form name="' + szFormName + '" id="' + szFormName + '">');
    aHtml.push('<input type="hidden" id="szSearchType" name="szSearchType" value="total"/>');
    aHtml.push('<input type="hidden" name="szStype" value="' + szSetStype + '"/>');
    aHtml.push('<input type="text" id="szKeyword" name="szKeyword" autocomplete="off" value="' + szSetKeyword + '"/>');
    aHtml.push('<input type="hidden" id="szKeywordhidden" name="szKeywordhidden" value="' + szSetKeywordhidden + '"/>');
    aHtml.push('</form>');

    var szSearchUrl = AFREECA + '/total_search.html';

    // jquery 사용하지 경우
    if (typeof($.find) != 'function') {
        var oSearchElement = document.getElementById(szFormName);
        if (oSearchElement != null) {
            oSearchElement.parentNode.remove(oSearchElement);
        }

        var oDiv = document.createElement('DIV');
        oDiv.setAttribute('id', 'div_' + szFormName);
        document.body.appendChild(oDiv);

        var oDivSearchElement = document.getElementById('div_' + szFormName);
        oDivSearchElement.innerHTML = aHtml.join('');

        var oFormDoc = document[szFormName];
        if (oFormDoc != undefined || oFormDoc != null) {
            oFormDoc.action = szSearchUrl;
            oFormDoc.method = 'post';
            if (szTarget != '') {
                oFormDoc.target = szTarget;
            }
            oFormDoc.submit();
        }
    } else {
        $('html body').find('#' + szFormName).remove();
        $('html body').append(aHtml.join(''));

        $('#' + szFormName).attr('action', szSearchUrl);
        $('#' + szFormName).attr('method', 'post');
        if (szTarget != '') {
            $('#' + szFormName).attr('target', szTarget);
        }
        $('#' + szFormName).submit();
    }

    return true;
}

// enableScroll
function enableScroll() {
	$(document).off(".disableScroll");
}

function checkSimple(szPageName, szObjectName){
	if(szPageName == "" || szObjectName == ""){
		if(typeof oSimplePage === 'undefined' || typeof oSimplePage["is_simple"] === 'undefined' || oSimplePage["is_simple"]==0){
			return true;
		}else{
			return false;
		}
	}else{
		if(typeof oSimplePage === 'undefined' || typeof oSimplePage["is_simple"] === 'undefined' || oSimplePage["is_simple"]==0
			|| typeof oSimplePage[szPageName] === 'undefined' || typeof oSimplePage[szPageName][szObjectName] === 'undefined'
			|| oSimplePage[szPageName][szObjectName] ==0){
			return true;
		}else{
			return false;
		}
	}
}


//onload 객체 가져와서 있으면 그걸 함수로 만들어서 같이 처리
//없으면 로그 호출만 처리해줌
var oldonload = window.onload;

if(typeof window.onload != 'function'){
	window.onload = function(){
		callAU(window.szLogAction || '');
	};
}else{
	window.onload = function(){
		oldonload();
		callAU(window.szLogAction || '');
	};
}

function getTransferImageSSL(szSetText)
{
    var szResultText = szSetText;
    var szCheckImageUrl = '';
    var szImageUrlNoneScheme = '';
    
    szResultText.replace(/((https?|ssh|ftp):\/\/|\/\/)[^\s]+/ig, function(szImageUrl) {
        if (!szImageUrl.match(/(\.jpg)|(\.jpeg)|(\.png)|(\.gif)|(\.bmp)|(videoimg.afreecatv.com)|(videoimg-test.afreecatv.com)/gi)) {
           return true;
        }
        
        // 겹/홑 따옴표로 필터된 부분은 제거
        szImageUrl = szImageUrl.replace('&quot;', '');
        szImageUrl = szImageUrl.replace('&quot', '');
        szImageUrl = szImageUrl.replace('&#039;', '');
        szImageUrl = szImageUrl.replace('&#039', '');
        szImageUrl = szImageUrl.replace('&nbsp;', '');
        szImageUrl = szImageUrl.replace('&nbsp', '');
        szImageUrl = szImageUrl.replace('"', '');
        szImageUrl = szImageUrl.replace('\'', '');
        
        /* 아래 로직 예시
        szFileExtension = '.jpg';
        aFileExtension = szImageUrl.match(/(\.jpg.*)/gi);
        if (aFileExtension != null) {
            szFileExtension = aFileExtension[0];
        }
        szImageUrl = szImageUrl.replace(/(\.jpg.*)/gi, szFileExtension);
        */
        var aFileExtension = null;
        var szFileExtension = '';
        var aCheckFileExtension = ['(\.jpg.*)', '(.jpeg.*)', '(.png.*)', '(.gif.*)', '(.bmp.*)'];
        for (var i=0; i<aCheckFileExtension.length; i++) {
            var oCheckRegexp = new RegExp(aCheckFileExtension[i], 'gi');
            aFileExtension = szImageUrl.match(oCheckRegexp);
            if (aFileExtension != null) {
                aCheckFileExtension[i] = aFileExtension[0];
            }
            szImageUrl = szImageUrl.replace(oCheckRegexp, aCheckFileExtension[i]);
        }
        
        szCheckImageUrl = szImageUrl.replace('afreeca.com', 'afreecatv.com', szCheckImageUrl);
        szCheckImageUrl = szCheckImageUrl.replace('afreeca.co.kr', 'afreecatv.com', szCheckImageUrl);
        szCheckImageUrl = szCheckImageUrl.replace('afreecatv.co.kr', 'afreecatv.com', szCheckImageUrl);
        
        // regexp 정규식에 'php?' 로 되어 있는 부분 처리
        szImageUrl = szImageUrl.replace('?', '\\?')
        if (!szImageUrl.match(/afreeca.com|afreecatv.com|afreeca.co.kr|afreecatv.co.kr/)) {
           return true;
        }
        
        // 이미지 URL 링크 맨 앞 스킴(http:/https:) 부분 제거
        szImageUrlNoneScheme = szCheckImageUrl.replace(/(^https?:)/g, '');
        
        var oRegexp = new RegExp(szImageUrl, 'ig');
        
        szSetText = szSetText.replace(oRegexp, szImageUrlNoneScheme);
    });
    
	return szSetText;
}