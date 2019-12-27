if( /([a-z0-9]+)*\.[a-z]{2,6}$/.test(location.hostname) )
{
	if(RegExp.lastMatch == "afreecatv.com")
	{
		var DOMAIN = RegExp.lastMatch;
	}
	else
		var DOMAIN = "afreeca.com";
}

var PMSPM_START_TM = "";
var PMSPM_END_TM = "";
var PMSPM_TEXT = "2015년 01월 14일(수) 02:00 ~ 08:00 ";
var FULLPM_START_TM = "";
var FULLPM_END_TM = "";
var FULLPM_TEXT = "";

var IS_DEBUG = false;

var AFREECA = "http://www.afreecatv.com";
var AFREECA_SSL = "https://www.afreecatv.com";
var AFREECA_NONE_SCHEME = "//www.afreecatv.com";           // 메인 & 이미지(SSL)

var AFREECA_AUTO = (document.location.protocol == "https:") ? AFREECA_SSL : AFREECA;

var AFREE_CA = "http://afree.ca/";
var AFREECA_ISAPI = "http://afreecatv.com/";
//var OPENTV_ISAPI = "http://opentv.afreecatv.com/";
var POINT = "http://point.afreecatv.com";
var POINT_SSL = "https://point.afreecatv.com";
var POINT_NONE_SCHEME = "//point.afreecatv.com";

var POINT_API = "https://pointapi.afreecatv.com";
var POINT_NONE_SCHEME = "//pointapi.afreecatv.com";

var HELPAFREECA = "http://help.afreecatv.com";
var HELPAFREECA_SSL = "https://help.afreecatv.com";           // 고객센터(SSL)
var HELPAFREECA_NONE_SCHEME = "//help.afreecatv.com";           // 고객센터
var GLOBAL_HELPAFREECA_NONE_SCHEME = "//ghelp.afreecatv.com";           // 글로벌 고객센터

var NEWHELPAFREECA = "http://afreecatv.com/new_help/atvhelp";
var NEWHELPAFREECA_NONE_SCHEME = "//afreecatv.com/new_help/atvhelp";           // 고객센터_new

var LIVE_8057 = "http://live.afreecatv.com:8057";
var LIVE_80 = "http://live.afreecatv.com";
var LIVE_SSL = "https://live.afreecatv.com";
var LIVE_NONE_SCHEME = "//live.afreecatv.com";

var LIVE_8079 = "http://live.afreecatv.com:8079";
var ST_80 = "http://st.afreecatv.com";
var ST_SSL = "https://st.afreecatv.com";
var ST_NONE_SCHEME = "//st.afreecatv.com";

var LIVE_8080 = "http://live.afreecatv.com:8080";
var AFBBS_8080 = "http://afbbs.afreecatv.com:8080";
var AFBBS_NONE_SCHEME = "//afbbs.afreecatv.com";
var STBBS_80 =  "http://stbbs.afreecatv.com";
var STBBS_SSL = "https://stbbs.afreecatv.com";
var STBBS_NONE_SCHEME = "//stbbs.afreecatv.com";

var AFFIND_8057 = "http://affind.afreecatv.com:8057";
var AFFIND_NONE_SCHEME = "//affind.afreecatv.com";    // 검색

var FAV_8057 = "//live.afreecatv.com";
var FAV_NONE_SCHEME = "//live.afreecatv.com";          // 즐겨찾기

var MY_NONE_SCHEME = "//my.afreecatv.com";             // MY

var AFWBBS1_8081 = "http://afwbbs1.afreecatv.com:8081";
var AFWBBS1_NONE_SCHEME = "//afwbbs1.afreecatv.com";  // 웹 게시판

var AFEVENT_8089 = "http://afevent.afreecatv.com:8089";
var AFEVENT_SSL = "https://afevent.afreecatv.com";
var AFEVENT_NONE_SCHEME = "//afevent.afreecatv.com";       // 이벤트

var AFEVENT2_8120 = "http://afevent2.afreecatv.com:8120";
var AFEVENT2_SSL = "https://afevent2.afreecatv.com";
var AFEVENT2_NONE_SCHEME = "//afevent2.afreecatv.com";     // 이벤트2

var AFFTP1_8084 = "http://afftp1.afreecatv.com:8084";
var AFPROXYFTP1_8084 = "http://afproxyftp1.afreecatv.com:8084";

var ALIMIAD1_8084 = "http://alimiad1.afreecatv.com:8084";

var LOGIN_8100 = "https://login.afreecatv.com";
var LOGIN_NONE_SCHEME = "//login.afreecatv.com";      // 로그인

var LIVEIMG_9090 = "//liveimg.afreecatv.com";
var LIVEIMG_NONE_SCHEME = "//liveimg.afreecatv.com";

var AFUPD1_9091 = "//afupd1.afreecatv.com";
var AFUPD1_NONE_SCHEME = "//afupd1.afreecatv.com";    // 솔루션 업데이트
var AFUPD1_JAPAN_NONE_SCHEME = "//afupdjp.afreecatv.com";    // 솔루션 업데이트

var AFOCX_9091 = "http://afocx.afreecatv.com:9091";
var AFSMS_8104 = "http://smsadmin.afreecatv.com:8104";

var MEMBER_8108 = "https://member.afreecatv.com";
var MEMBER_8111 = "https://member.afreecatv.com";
var MEMBER_NONE_SCHEME = "//member.afreecatv.com";   // 멤버쉽

var NOTE_8133 = "http://note.afreecatv.com:8133";
var NOTE_SSL = "https://note.afreecatv.com";
var NOTE_NONE_SCHEME = "//note.afreecatv.com";      // 쪽지

var PLAYER_80 = "http://player.afreecatv.com";

var UPDATE_8134 = "http://update.afreecatv.com:8134";
var UPDATE_NONE_SCHEME = "//update.afreecatv.com";

var PLAY_80 = "http://play.afreecatv.com";
var PLAY_NONE_SCHEME = "//play.afreecatv.com";           // 플래시 플레이어

var GAMECENTER_DOMAIN = "http://gamecenterpc.afreecatv.com";
var GAMECENTER_DOMAIN_NONE_SCHEME = "//gamecenterpc.afreecatv.com";	//게임센터
var GAMECENTER_IMG = "http://img.gamecenter.afreecatv.com/admin/";
var GAMECENTER_IMG_NONE_SCHEME = "//img.gamecenter.afreecatv.com/admin/";	//게임센터 이미지

var RES_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://res.afreecatv.com";
var RES_AFREECA_NONE_SCHEME = "//res.afreecatv.com";

var DASHBOARD = "http://dashboard.afreecatv.com";		//대쉬보드
var DASHBOARD_NONE_SCHEME = "//dashboard.afreecatv.com";		//대쉬보드

var STATIC_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://static.afreecatv.com";
var STATIC_AFREECA_80 = "http://static.afreecatv.com";
var STATIC_AFREECA_NONE_SCHEME = "//static.afreecatv.com";

var ANALYSIS_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://analysis.afreecatv.com";
var ANALYSIS_NONE_SCHEME = "//analysis.afreecatv.com";

var ST_PROXY_80 = "http://stproxy.afreecatv.com";
var ST_PROXY_NONE_SCHEME = "//stproxy.afreecatv.com";		   // 프록시

var AFFLV1_8099 = "http://afflv1.afreecatv.com:8099";
var AFJOBENC1 = "http://afjobenc1.afreecatv.com";
var AFENC1 = "http://afenc1.afreecatv.com";
var AFENC2 = "http://afenc2.afreecatv.com";
var AFENC5 = "http://afenc5.afreecatv.com";

var SPORTS_KBO = "http://kbo.sports.afreecatv.com/";
var SPORTS_TV = "http://sportstv.afreecatv.com";
var SPORTS_TV2 = "http://sportstv.afreecatv.com";

var ESPORTS_DOMAIN = "http://esports.sports.afreecatv.com/";
var ESPORTS_DOMAIN_NONE_SCHEME = "//esports.sports.afreecatv.com/";

var API_SPORTS = "http://api.sports.afreecatv.com/";
var API_SPORTS_NONE_SCHEME = "//api.sports.afreecatv.com/";

var ANI_DOMAIN = "http://ani.afreecatv.com";
var ANI_DOMAIN_NONE_SCHEME = "//ani.afreecatv.com";

var VR_DOMAIN = "http://vr.afreecatv.com";
var VR_DOMAIN_NONE_SCHEME = "//vr.afreecatv.com";		// VR영상관

var TV_DOMAIN = "http://tv.afreecatv.com";
var TV_DOMAIN_NONE_SCHEME = "//tv.afreecatv.com";		// 지상파/케이블

var STAR_DOMAIN ="http://star.afreecatv.com";
var STAR_DOMAIN_NONE_SCHEME ="//star.afreecatv.com";            //보이는 라디오

var MOBILE_DOMAIN ="http://mobile.afreecatv.com";
var MOBILE_DOMAIN_NONE_SCHEME ="//mobile.afreecatv.com";        //모바일 방송

var MOBILE_STATIC = "http://static.m.afreecatv.com";
var MOBILE_STATIC_NONE_SCHEME ="//static.m.afreecatv.com";	//모바일 STATIC

var CONTENTLAB_DOMAIN = "http://contentlab.afreecatv.com";
var CONTENTLAB_DOMAIN_NONE_SCHEME = "//contentlab.afreecatv.com"; //콘텐츠 발전소

var FFOM_DOMAIN = "http://ffom.afreecatv.com";
var FFOM_DOMAIN_NONE_SCHEME = "//ffom.afreecatv.com"; // 뽐 도메인

var SHOP_DOMAIN = "http://shop.afreecatv.com";
var SHOP_DOMAIN_NONE_SCHEME = "//shop.afreecatv.com"; // 샵프리카

var ADTIME_DOMAIN = "http://adtime.afreecatv.com"; // AD타임
var ADTIME_SSL_DOMAIN = "https://adtime.afreecatv.com"; // AD타임 SSL
var ADTIME_DOMAIN_NONE_SCHEME = "//adtime.afreecatv.com"; // AD타임

var ADCON_DOMAIN = "http://adballoon.afreecatv.com"; // ADCON
var ADCON_SSL_DOMAIN = "https://adballoon.afreecatv.com"; // ADCON SSL
var ADBALLOON_NONE_SCHEME = "//adballoon.afreecatv.com"; // ADBALLOON SSL

var UP_DOMAIN = "http://up.afreecatv.com"; // UP beta
var UP_DOMAIN_NONE_SCHEME = "//up.afreecatv.com";	// UP beta

var ITEM_DOMAIN = "http://item.afreecatv.com";	// 아이템
var ITEM_NONE_SCHEME = "//item.afreecatv.com";	// 아이템

var TOKEN_DOMAIN = "http://token.afreecatv.com"; // 토큰
var TOKEN_DOMAIN_AUTO = ((document.location.protocol == "https:") ? "https" : "http")+"://token.afreecatv.com"; //토큰 SSL
var TOKEN_DOMAIN_NONE_SCHEME = "//token.afreecatv.com"; // 토큰

var INFODESK_DOMAIN = "http://infodesk.afreecatv.com";  // 방송지원센터
var INFODESK_DOMAIN_NONE_SCHEME = "//infodesk.afreecatv.com";  // 방송지원센터

var BJ_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://bj.afreecatv.com";
var BJ_AFREECA_NONE_SCHEME = "//bj.afreecatv.com";

var BJGUIDE_DOMAIN = "http://bjguide.afreecatv.com";  // BJ 가이드
var BJGUIDE_DOMAIN_NONE_SCHEME = "//bjguide.afreecatv.com";  // BJ 가이드

var ADREVENUE_DOMAIN = "http://adrevenue.afreecatv.com"; // ADREVENUE (광고환전페이지)
var ADREVENUE_SSL_DOMAIN = "https://adrevenue.afreecatv.com"; // ADREVENUE (광고환전페이지) SSL
var ADREVENUE_DOMAIN_NONE_SCHEME = "//adrevenue.afreecatv.com"; // ADREVENUE 광고환전

var SUBS_DOMAIN = "http://subs.afreecatv.com"; // 구독 선물 페이지
var SUBS_NONE_SCHEME = "//subs.afreecatv.com";			//구독 선물 페이지

var BIZAFREECA = "http://www.bizafreeca.com";

var M_AFREECA = "http://m.afreecatv.com";
var M_AFREECA_NONE_SCHEME = "//m.afreecatv.com";                //모바일 아프리카

var M_AFREECATV = "http://m.afreeca.tv";
var M_AFREECATV_NONE_SCHEME = "//m.afreeca.tv";               //모바일 아프리카 바로가기

var FPOINT_8130 = "http://fpoint.afreecatv.com:8130";
var FPOINT_SSL = "https://fpoint.afreecatv.com";

var GMTV = "http://gametv.afreecatv.com";
var GMTV_NONE_SCHEME = "//gametv.afreecatv.com";
//var GMFTP1_8084 = "http://gmftp1.afreecatv.com:8084";
//var GMPROXYFTP1_8084 = "http://gmproxyftp1.afreecatv.com:8084";

var BESTBJ_80 = "http://bestbj.afreecatv.com";
var BESTBJ_NONE_SCHEME = "//bestbj.afreecatv.com";           //베스트BJ 전용

var ISSUE_80 = "http://issue.afreecatv.com";
var ISSUE_SSL = "https://issue.afreecatv.com";
var ISSUE_NONE_SCHEME = "//issue.afreecatv.com";           //이슈방송스케쥴

var AFREE_CA = "http://afree.ca";
var AFREE_CA_NONE_SCHEME = "http://afree.ca";

//var LOG_8139 = "http://log.afreecatv.com:8139";

var AFREECA_AD = "http://ad.afreecatv.com";
var AFREECA_AD_NONE_SCHEME = "//ad.afreecatv.com";            //아프리카TV 광고

var AD_NONE_SCHEME = "//pa.afreecatv.com";      // 아프리카TV 광고

var VOD_DOMAIN = "http://vod.afreecatv.com";
var VOD_NONE_SCHEME = "//vod.afreecatv.com";

var VIDEO_FILE = "http://video.afreecatv.com";
var VIDEO_FILE_NONE_SCHEME = "//video.afreecatv.com";           //아카이브 파일

var VIDEO_THUMBNAIL = "http://videoimg.afreecatv.com";
var VIDEO_THUMBNAIL_NONE_SCHEME = "//videoimg.afreecatv.com";   //아카이브 썸네일

var IAPP_AFREECA = "http://iapp.m.afreecatv.com";
var IAPP_AFREECA_NONE_SCHEME = "//iapp.m.afreecatv.com";   //모바일 아프리카

var AFREECA_STORAGE_ADMIN_LOCATION = "/ADMIN/";

var ADMIN_IMG = "//admin.img.afreecatv.com";
var ADMIN_IMG_NONE_SCHEME = "//admin.img.afreecatv.com";

var EVENT_IMG = "//event.img.afreecatv.com";
var EVENT_IMG_NONE_SCHEME = "//event.img.afreecatv.com";

var SPORTS_IMG = "//sports.img.afreecatv.com";
var SPORTS_IMG_NONE_SCHEME = "//sports.img.afreecatv.com";

var STATION_IMG = "//stimg.afreecatv.com";
var STATION_IMG_NONE_SCHEME = "//stimg.afreecatv.com";

var BBS_IMG = "//bbs.img.afreecatv.com";
var BBS_IMG_NONE_SCHEME = "//bbs.img.afreecatv.com";

var FFOM_IMG = "//ffom.img.afreecatv.com";
var FFOM_IMG_NONE_SCHEME = "//ffom.img.afreecatv.com";

var STATIC_FILE = "//static.file.afreecatv.com";
var STATIC_FILE_NONE_SCHEME = "//static.file.afreecatv.com";		// STATIC 파일(MogileFS)

var SEARCH_SCH_80 = "http://sch.afreecatv.com";
var SEARCH_SCH_NONE_SCHEME = "//sch.afreecatv.com";

var SEARCH_SCKETC_80 = "//scketc.afreecatv.com";
var SEARCH_SCKETC_NONE_SCHEME = "//scketc.afreecatv.com";

var ITEM_80 = 'http://items.afreecatv.com';
var ITEMS_NONE_SCHEME = "//items.afreecatv.com";     // 초콜렛 아이템

var API_SABANA = 'https://apisabana.afreecatv.com';
var API_SABANA_NONE_SCHEME = "//apisabana.afreecatv.com";	//사바나 API

// 트랜스코더 장비
var TRANSCODER = 'http://transcoder.afreecatv.com';
var TRANSCODER_NONE_SCHEME = '//transcoder.afreecatv.com';

// 아쿠아
var AQUA_DOMAIN = 'http://aqua.afreecatv.com';
var AQUA_NONE_SCHEME = '//aqua.afreecatv.com';

var EVENTAPI_NONE_SCHEME = '//eventapi.afreecatv.com';

var API_UP_NONE_SCHEME = '//api.up.afreecatv.com';

var BROAD_STATISTIC = "http://broadstatistic.afreecatv.com";
var BROAD_STATISTIC_NONE_SCHEME = "//broadstatistic.afreecatv.com";

var STUDIO_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'studio.afreecatv.com';
var SOTONG_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'sotong.afreecatv.com';
var NEWAPPLY_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'newapply.afreecatv.com';

// 포인트
var MYPOINT_DOMAIN = "http://mypoint.afreecatv.com";
var MYPOINT_NONE_SCHEME = "//mypoint.afreecatv.com";

/**
 * 신규 도메인 정리하는 부분(아래부분부터)
 */
var RES_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//res.afreecatv.com';
var STATIC_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//static.afreecatv.com';
var LIVEIMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//liveimg.afreecatv.com';  // LIVE 섬네일
var ADMIN_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//admin.img.afreecatv.com';  // 아프리카 메인 페이지
var STATIC_FILE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//static.file.afreecatv.com';  // 모자일 정적 파일
var STIMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//stimg.afreecatv.com';  // 개인방송국 모자일 이미지
var EVENT_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//event.img.afreecatv.com';  // 이벤트 모자일 이미지
var SPORTS_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sports.img.afreecatv.com';  // 스포츠 모자일 이미지
var BBS_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//bbs.img.afreecatv.com';  // 게시판 모자일 이미지
var FFOM_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ffom.img.afreecatv.com';  // FFOM 모자일 이미지
var VR_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//vr.img.afreecatv.com';  // VR 모자일 이미지
var PROFILE_IMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//profile.img.afreecatv.com';  // 개인방송국 모자일 이미지

var STATIC_M_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//static.m.afreecatv.com';  // 모바일 STATIC
var AUTH_M_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//auth.m.afreecatv.com';  // 모바일 아프리카 auth

var WWW_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//www.afreecatv.com';  // 아프리카 메인 페이지
var SPORTSTV_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sportstv.afreecatv.com';  // 스포츠 TV (예전 스포츠 도메인)
var LIVE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//live.afreecatv.com';  // LIVE 정보 및 API 등등
var AFWBBS1_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afwbbs1.afreecatv.com';  // 구 게시판
var BJ_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//bj.afreecatv.com';  // 신규 방송국
var OPENTV_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//opentv.afreecatv.com';  // 기업방송국
var POINT_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//point.afreecatv.com';  // 포인트,구매
var POINTAPI_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//pointapi.afreecatv.com';  // PMS REST API 도메인
var HELP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//help.afreecatv.com';  // 고객센터
var GHELP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ghelp.afreecatv.com';  // 고객센터 (글로벌)
var APIHELP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//apihelp.afreecatv.com';  // 고객센터 API
var ST_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//st.afreecatv.com';  // 개인방송국
var STBBS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//stbbs.afreecatv.com';  // 개인방송국 통합 게시판
var AFEVENT_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afevent.afreecatv.com';  // 이벤트
var AFEVENT2_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afevent2.afreecatv.com';  // 이벤트2
var LOGIN_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//login.afreecatv.com';  // 로그인
var AFUPD1_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afupd1.afreecatv.com';  // 솔루션 업데이트
var AFUPDJP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afupdjp.afreecatv.com';  // 솔루션 업데이트 (일본)
var MEMBER_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//member.afreecatv.com';  // 멤버쉽
var NOTE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//note.afreecatv.com';  // 쪽지
var UPDATE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//update.afreecatv.com';  // 뉴아프리카 업데이트
var PLAY_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//play.afreecatv.com';  // 플래시 플레이어
var ADREVENUE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//adrevenue.afreecatv.com';  // ADREVENUE 광고환전 페이지
var APISABANA_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//apisabana.afreecatv.com';  // 사바나 API
var AFJOBENC1_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afjobenc1.afreecatv.com';
var SPORTS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sports.afreecatv.com';  // 스포츠
var SBS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sbs.afreecatv.com';  // SBS 스포츠
var API_SPORTS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//api.sports.afreecatv.com';  // SBS 스포츠 API
var VR_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//vr.afreecatv.com';  // VR영상관
var ANI_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ani.afreecatv.com';  // 애니메이션
var TV_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//tv.afreecatv.com';  // 지상파/케이블 TV
var STAR_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//star.afreecatv.com';  // 보이는 라디오
var ANALYSIS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//analysis.afreecatv.com';  // LOG API
var FFOM_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ffom.afreecatv.com';  // 뽐도메인
var SHOP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//shop.afreecatv.com';  // 샵프리카
var ADTIME_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//adtime.afreecatv.com';  // AD타임
var ADBALLOON_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//adballoon.afreecatv.com';  // 애드벌룬
var UP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//up.afreecatv.com';  // UP beta
var ITEM_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//item.afreecatv.com';  // 아이템
var TOKEN_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//token.afreecatv.com';  // 토큰
var ITEMS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//items.afreecatv.com';  // 아이템
var INFODESK_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//infodesk.afreecatv.com';  // 방송지원센터
var BJGUIDE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//bjguide.afreecatv.com';  // BJ 가이드
var DASHBOARD_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//dashboard.afreecatv.com';  // 대쉬보드
var SUBS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//subs.afreecatv.com';  // 구독 선물 페이지
var NEWBJ_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//newbj.afreecatv.com';  // 신입 BJ지원센터
var FREECAP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//freecap.afreecatv.com';  // 프리캡
var STATIC_FREECAP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//static.freecap.afreecatv.com';  // 프리캡 STATIC
var BBS_FREECAP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//bbs.freecap.afreecatv.com';  // 프리캡 BBS
var GAMECENTERPC_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//gamecenterpc.afreecatv.com';  // 게임센터
var CONTENTLAB_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//contentlab.afreecatv.com';  // 콘텐츠발전소
var WWW_BIZAFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//www.bizafreeca.com';
var GAMETV_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//gametv.afreecatv.com';  // GAME TV 관련
var BESTBJ_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//bestbj.afreecatv.com';  // 베스트BJ 전용
var ISSUE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//issue.afreecatv.com';  // 이슈방송스케쥴
var AD_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ad.afreecatv.com';  // 아프리카TV 광고
var PA_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//pa.afreecatv.com';  // 아프리카TV 광고
var VOD_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//vod.afreecatv.com';  // 동영상 섹션
var VIDEO_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//video.afreecatv.com';  // 아카이브 파일
var HLS_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//hls.afreecatv.com';  // 아카이브 hls
var HLS_TEST_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//hls-test.afreecatv.com';  // 아카이브 hls test
var HLS_STAGE_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//hls-stage.afreecatv.com';  // 아카이브 hls stage
var VIDEOIMG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//videoimg.afreecatv.com';  // 아카이브 썸네일
var VIDEOIMG_TEST_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//videoimg-test.afreecatv.com';  // 아카이브 썸네일 test
var TS_PC_STREAM_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//ts-pc.stream.afreecatv.com';  // 타임시프트 pc
var AFREECATV_ASYNC_WISEN_GSCDN = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afreecatv.async.wisen.gscdn.com';  // CDN 퍼지 URL
var AFFLV_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//afflv14.afreecatv.com';  // 영상클립 afflv14 도메인
var AQUA_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//aqua.afreecatv.com';  // 아쿠아(AQUA) 전자여성
var BROADSTATISTIC_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//broadstatistic.afreecatv.com';  // 방송통계
var SCH_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sch.afreecatv.com';  // 검색 API URL 정보
var SCKETC_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//scketc.afreecatv.com';  // 검색
var V_AFREE_CA = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//v.afree.ca';  // SHOORT VOD URL
var TRANSCODER_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//transcoder.afreecatv.com';  // 트랜스코더 장비
var VACSDRDB_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//vacsdrdb.afreecatv.com';
var EVENTAPI_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//eventapi.afreecatv.com';
var API_UP_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//api.up.afreecatv.com';
var STUDIO_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//studio.afreecatv.com';  // 스튜디오
var SOTONG_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//sotong.afreecatv.com';  // 소통 게시판
var NEWAPPLY_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//newapply.afreecatv.com';  // newapply
var MYPOINT_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//mypoint.afreecatv.com';  // 포인트
