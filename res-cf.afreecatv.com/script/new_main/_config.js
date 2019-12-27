// 도메인 관련 상수 선언
if( /([a-z0-9]+)*\.[a-z]{2,6}$/.test(location.hostname) )
{
	if(RegExp.lastMatch == "afreecatv.com")
	{
		var DOMAIN = RegExp.lastMatch;
	}
	else
		var DOMAIN = "afreeca.com";
}

// 정기점검 설정 관련
var PMSPM_START_TM = "";	//201503250500
var PMSPM_END_TM = "";		//201503250700
var PMSPM_TEXT = "";		//2015년 10월 28일(수) 05:00 ~ 07:00
var FULLPM_START_TM = "";
var FULLPM_END_TM = "";
var FULLPM_TEXT = "";
// 디버깅 모드
var IS_DEBUG = false;

// URL 경로
var AFREECA = "http://www.afreecatv.com";                // 메인 & 이미지
var AFREECA_SSL = "https://www.afreecatv.com";           // 메인 & 이미지(SSL)
var AFREECA_NONE_SCHEME = "//www.afreecatv.com";           // 메인 & 이미지(SSL)

var AFREECA_AUTO = (document.location.protocol == "https:") ? AFREECA_SSL : AFREECA;	// http<->https 호환

var AFREE_CA = "http://afree.ca/"; // SNS 공유 도메인
var AFREECA_ISAPI = "http://afreecatv.com/";             // 개인방송국
var AFREE_CA_NONE_SCHEME = "http://afree.ca";

var OPENTV_ISAPI = "http://opentv.afreecatv.com/";       // 기업방송국

var POINT = "http://point.afreecatv.com";                // 포인트,구매
var POINT_SSL = "https://point.afreecatv.com";      // 포인트,구매(SSL)
var POINT_NONE_SCHEME = "//point.afreecatv.com";      // 포인트,구매

var POINT_API = "https://pointapi.afreecatv.com";
var POINT_NONE_SCHEME = "//pointapi.afreecatv.com";

var HELPAFREECA = "http://help.afreecatv.com";           // 고객센터
var HELPAFREECA_SSL = "https://help.afreecatv.com";           // 고객센터(SSL)
var HELPAFREECA_NONE_SCHEME = "//help.afreecatv.com";           // 고객센터
var GLOBAL_HELPAFREECA_NONE_SCHEME = "//ghelp.afreecatv.com";           // 글로벌 고객센터

var NEWHELPAFREECA = "http://afreecatv.com/new_help/atvhelp";           // 고객센터_new
var NEWHELPAFREECA_NONE_SCHEME = "//afreecatv.com/new_help/atvhelp";           // 고객센터_new

var LIVE_8057 = "//live.afreecatv.com";        // 플레이어,스튜디오
var LIVE_80 = "http://live.afreecatv.com";        // 플레이어,스튜디오
var LIVE_SSL = "https://live.afreecatv.com";        // 플레이어,스튜디오
var LIVE_8079 = "http://live.afreecatv.com:8079";        // 개인방송국
var LIVE_NONE_SCHEME = "//live.afreecatv.com";        // 플레이어,스튜디오

var ST_80 = "http://st.afreecatv.com";        // 개인방송국
var ST_SSL = "https://st.afreecatv.com";        // 개인방송국
var ST_NONE_SCHEME = "//st.afreecatv.com";        // 개인방송국

var LIVE_8080 = "http://live.afreecatv.com:8080";        // 게시판
var AFBBS_8080 = "http://afbbs.afreecatv.com:8080";      // 영상클립
var AFBBS_NONE_SCHEME = "//afbbs.afreecatv.com";      // 영상클립

var STBBS_80 =  "http://stbbs.afreecatv.com";            // 개인방송국 통합 게시판
var STBBS_SSL = "https://stbbs.afreecatv.com";             // 개인방송국 통합 게시판
var STBBS_NONE_SCHEME = "https://stbbs.afreecatv.com";             // 개인방송국 통합 게시판

var AFFIND_8057 = "http://affind.afreecatv.com:8057";    // 검색
var AFFIND_NONE_SCHEME = "//affind.afreecatv.com";    // 검색

var FAV_8057 = "//live.afreecatv.com";          // 즐겨찾기
var FAV_NONE_SCHEME = "//live.afreecatv.com";          // 즐겨찾기

var MY_NONE_SCHEME = "//my.afreecatv.com";             // MY

var AFWBBS1_8081 = "http://afwbbs1.afreecatv.com:8081";  // 웹 게시판
var AFWBBS1_NONE_SCHEME = "//afwbbs1.afreecatv.com";  // 웹 게시판

var AFEVENT_8089 = "http://afevent.afreecatv.com:8089";  // 이벤트
var AFEVENT_SSL = "https://afevent.afreecatv.com";       // 이벤트(SSL)
var AFEVENT_NONE_SCHEME = "//afevent.afreecatv.com";       // 이벤트

var AFEVENT2_8120 = "http://afevent2.afreecatv.com:8120";// 이벤트2
var AFEVENT2_SSL = "https://afevent2.afreecatv.com";     // 이벤트2(SSL)
var AFEVENT2_NONE_SCHEME = "//afevent2.afreecatv.com";     // 이벤트2

var AFFTP1_8084 = "http://afftp1.afreecatv.com:8084";    // ftp
var AFPROXYFTP1_8084 = "http://afproxyftp1.afreecatv.com:8084";    // ftp proxy

var ALIMIAD1_8084 = "http://alimiad1.afreecatv.com:8084";// 알리미 ftp

var LOGIN_8100 = "https://login.afreecatv.com";      // 로그인
var LOGIN_NONE_SCHEME = "//login.afreecatv.com";      // 로그인

var LIVEIMG_9090 = "//liveimg.afreecatv.com";  // 섬네일
var LIVEIMG_NONE_SCHEME = "//liveimg.afreecatv.com";  // 섬네일

var AFUPD1_9091 = "//afupd1.afreecatv.com";    // 솔루션 업데이트
var AFUPD1_NONE_SCHEME = "//afupd1.afreecatv.com";    // 솔루션 업데이트
var AFUPD1_JAPAN_NONE_SCHEME = "//afupdjp.afreecatv.com";    // 솔루션 업데이트

var AFOCX_9091 = "http://afocx.afreecatv.com:9091";      // 솔루션 ocx
var ADMIN_8112 = "http://admin.afreecatv.com:8112";
var AFSMS_8104 = "http://smsadmin.afreecatv.com:8104";   // 오픈TV 영업관리어드민

var MEMBER_8108 = "https://member.afreecatv.com";    // 멤버쉽
var MEMBER_8111 = "https://member.afreecatv.com";   // 멤버쉽(SSL)
var MEMBER_NONE_SCHEME = "//member.afreecatv.com";   // 멤버쉽

var NOTE_8133 = "http://note.afreecatv.com:8133";        // 쪽지
var NOTE_SSL = "https://note.afreecatv.com";        // 쪽지
var NOTE_NONE_SCHEME = "//note.afreecatv.com";      // 쪽지

var PLAYER_80 = "http://player.afreecatv.com";           // 뉴아프리카

var UPDATE_8134 = "http://update.afreecatv.com:8134";    // 뉴아프리카 업데이트
var UPDATE_NONE_SCHEME = "//update.afreecatv.com";       // 뉴아프리카 업데이트

var PLAY_80 = "http://play.afreecatv.com";               // 플래시 플레이어
var PLAY_NONE_SCHEME = "//play.afreecatv.com";           // 플래시 플레이어

var GAMECENTER_DOMAIN = "http://gamecenterpc.afreecatv.com";	//게임센터
var GAMECENTER_NONE_SCHEME = "//gamecenterpc.afreecatv.com";	//게임센터
var GAMECENTER_IMG = "http://img.gamecenter.afreecatv.com/admin/";	//게임센터 이미지
var GAMECENTER_IMG_NONE_SCHEME = "//img.gamecenter.afreecatv.com/admin/";	//게임센터 이미지

var STATIC_FILE = "//static.file.afreecatv.com";		// STATIC 파일(MogileFS)
var STATIC_FILE_NONE_SCHEME = "//static.file.afreecatv.com";		// STATIC 파일(MogileFS)

var RES_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://res.afreecatv.com";
var RES_AFREECA_NONE_SCHEME = "//res.afreecatv.com";
var RES_AFREECATV = ((document.location.protocol == 'https:') ? 'https:' : 'http:') + '//res.afreecatv.com';

var DASHBOARD = "http://dashboard.afreecatv.com";		//대쉬보드
var DASHBOARD_NONE_SCHEME = "//dashboard.afreecatv.com";		//대쉬보드

var SUBS_DOMAIN = "http://subs.afreecatv.com";			//구독 선물 페이지
var SUBS_SSL_DOMAIN = "https://subs.afreecatv.com";		//구독 선물 페이지 SSL
var SUBS_NONE_SCHEME = "//subs.afreecatv.com";			//구독 선물 페이지

var NEWBJ_DOMAIN = "http://newbj.afreecatv.com";     // 신입 BJ지원센터
var NEWBJ_NONE_SCHEME = "//newbj.afreecatv.com";     //  신입 BJ지원센터

var STATIC_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://static.afreecatv.com";
var STATIC_AFREECA_80 = "http://static.afreecatv.com";
var STATIC_AFREECA_NONE_SCHEME = "//static.afreecatv.com";

var ST_PROXY_80 = "http://stproxy.afreecatv.com";		   // 프록시
var ST_PROXY_NONE_SCHEME = "//stproxy.afreecatv.com";		   // 프록시

var AFFLV1_8099 = "http://afflv1.afreecatv.com:8099";
var AFJOBENC1 = "http://afjobenc1.afreecatv.com";
var AFENC1 = "http://afenc1.afreecatv.com";
var AFENC2 = "http://afenc2.afreecatv.com";
var AFENC5 = "http://afenc5.afreecatv.com";

//var AFMSGFTP1_8084 = "http://afmsgftp1.afreecatv.com:8084";  // 팬레터 FTP
//var MSGFTP1_8084 = "http://msgftp1.afreecatv.com:8084";      // 팬레터 FTP
//var SHOUTFTP1_8084 = "http://afshoutftp1.afreecatv.com";     //응원함성 피켓이미지 (CDN)

//var AFCDNFTP1_8084 = "http://afcdnftp1.afreecatv.com:8084";  // 신규 FTP
//var CDNFTP1_80 = "http://cdnftp1.afreecatv.com";             // 신규 FTP (CDN)

//스포츠 리뉴얼
var SPORTS_KBO = "http://kbo.sports.afreecatv.com";	//프로야구
//스포츠 TV
var SPORTS_EPL = "http://epl.afreecatv.com";
var SPBBS_8117 = "http://spbbs.afreecatv.com:8117";
var SPORTS_TV = "http://sportstv.afreecatv.com";
var SPORTS_TV2 = "http://sportstv.afreecatv.com";

var ESPORTS_DOMAIN = "http://esports.sports.afreecatv.com/";
var ESPORTS_NONE_SCHEME = "//esports.sports.afreecatv.com/";

var API_SPORTS = "http://api.sports.afreecatv.com/";
var API_SPORTS_NONE_SCHEME = "//api.sports.afreecatv.com/";

// 당구 페이지 추가
var BILLIARD_DOMAIN = "http://billiard.sports.afreecatv.com";			//당구 페이지
var BILLIARD_SSL_DOMAIN = "https://billiard.sports.afreecatv.com";		//당구 페이지 SSL
var BILLIARD_NONE_SCHEME = "//billiard.sports.afreecatv.com";		//당구 페이지 SSL

var ANI_DOMAIN = "http://ani.afreecatv.com";
var ANI_NONE_SCHEME = "//ani.afreecatv.com";

var VR_DOMAIN = "http://vr.afreecatv.com";		// VR영상관
var VR_NONE_SCHEME = "//vr.afreecatv.com";		// VR영상관

var TV_DOMAIN = "http://tv.afreecatv.com";		// 지상파/케이블
var TV_NONE_SCHEME = "//tv.afreecatv.com";		// 지상파/케이블

var STAR_DOMAIN ="http://star.afreecatv.com";            //보이는 라디오
var STAR_NONE_SCHEME ="//star.afreecatv.com";            //보이는 라디오

var MOBILE_DOMAIN ="http://mobile.afreecatv.com";        //모바일 방송
var MOBILE_NONE_SCHEME ="//mobile.afreecatv.com";        //모바일 방송

var MOBILE_STATIC ="http://static.m.afreecatv.com";	//모바일 STATIC
var MOBILE_STATIC_NONE_SCHEME ="//static.m.afreecatv.com";	//모바일 STATIC

var CONTENTLAB_DOMAIN = "http://contentlab.afreecatv.com"; //콘텐츠 발전소
var CONTENTLAB_NONE_SCHEME = "//contentlab.afreecatv.com"; //콘텐츠 발전소

var FFOM_DOMAIN = "http://ffom.afreecatv.com"; // 뽐 도메인
var FFOM_NONE_SCHEME = "//ffom.afreecatv.com"; // 뽐 도메인

var SHOP_DOMAIN = "http://shop.afreecatv.com"; // 샵프리카
var SHOP_NONE_SCHEME = "//shop.afreecatv.com"; // 샵프리카

var ADTIME_DOMAIN = "http://adtime.afreecatv.com"; // AD타임
var ADTIME_SSL_DOMAIN = "https://adtime.afreecatv.com"; // AD타임 SSL
var ADTIME_NONE_SCHEME = "//adtime.afreecatv.com"; // AD타임

var ADCON_DOMAIN = "http://adballoon.afreecatv.com"; // ADCON
var ADCON_SSL_DOMAIN = "https://adballoon.afreecatv.com"; // ADCON SSL
var ADBALLOON_NONE_SCHEME = "//adballoon.afreecatv.com"; // ADBALLOON SSL

var FUNDING_AFREECA = "http://funding.afreecatv.com";
var FUNDING_AFREECA_NONE_SCHEME = "//funding.afreecatv.com";

var UP_DOMAIN = "http://up.afreecatv.com";	// UP beta
var UP_NONE_SCHEME = "//up.afreecatv.com";	// UP beta

var ITEM_DOMAIN = "http://item.afreecatv.com";	// 아이템
var ITEM_NONE_SCHEME = "//item.afreecatv.com";	// 아이템
var ITEM_SSL_DOMAIN = "https://item.afreecatv.com";

var TOKEN_DOMAIN = "http://token.afreecatv.com"; // 토큰
var TOKEN_DOMAIN_AUTO = ((document.location.protocol == "https:") ? "https" : "http")+"://token.afreecatv.com"; //토큰 SSL
var TOKEN_NONE_SCHEME = "//token.afreecatv.com"; // 토큰

var ITEM_80 = "http://items.afreecatv.com";     // 초콜렛 아이템
var ITEMS_NONE_SCHEME = "//items.afreecatv.com";     // 초콜렛 아이템

var INFODESK_DOMAIN = "http://infodesk.afreecatv.com";  // 방송지원센터
var INFODESK_NONE_SCHEME = "//infodesk.afreecatv.com";  // 방송지원센터

var BJGUIDE_DOMAIN = "http://bjguide.afreecatv.com";  // BJ 가이드
var BJGUIDE_NONE_SCHEME = "//bjguide.afreecatv.com";  // BJ 가이드

var ADREVENUE_DOMAIN = "http://adrevenue.afreecatv.com"; // ADREVENUE 광고환전
var ADREVENUE_SSL_DOMAIN = "https://adrevenue.afreecatv.com"; // ADREVENUE 광고환전 SSL
var ADREVENUE_NONE_SCHEME = "//adrevenue.afreecatv.com"; // ADREVENUE 광고환전

var DASHBOARD_DOMAIN = "http://dashboard.afreecatv.com"; // 글로벌 원빌드 (대시보드)
var DASHBOARD_NONE_SCHEME = "//dashboard.afreecatv.com"; // 글로벌 원빌드 (대시보드)

var API_SABANA = "https://apisabana.afreecatv.com";	//사바나 API
var API_SABANA_NONE_SCHEME = "//apisabana.afreecatv.com";	//사바나 API

var ETC_80 = "http://etc.afreecatv.com";                 //우편번호, 외국인 본인 확인 등 기타 용도
var ETC_SSL = "https://etc.afreecatv.com";               //우편번호, 외국인 본인 확인 등 기타 용도 (SSL)
var ETC_NONE_SCHEME = "//etc.afreecatv.com";               //우편번호, 외국인 본인 확인 등 기타 용도 (SSL)

var BIZAFREECA = "http://www.bizafreeca.com";          //비즈아프리카

var M_AFREECA = "http://m.afreecatv.com";                //모바일 아프리카
var M_AFREECA_NONE_SCHEME = "//m.afreecatv.com";                //모바일 아프리카

var M_AFREECATV = "http://m.afreeca.tv";               //모바일 아프리카 바로가기
var M_AFREECATV_NONE_SCHEME = "//m.afreeca.tv";               //모바일 아프리카 바로가기

// 정리 필요
var FPOINT_8130 = "http://fpoint.afreecatv.com:8130";    //무료충전소, 상품권
var FPOINT_SSL = "https://fpoint.afreecatv.com";    //무료충전소, 상품권

var ANALYSIS_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://analysis.afreecatv.com"; 	// LOG API
var ANALYSIS_NONE_SCHEME = "//analysis.afreecatv.com";

// GAME TV 관련
var GMTV = "http://gametv.afreecatv.com";
var GMTV_NONE_SCHEME = "//gametv.afreecatv.com";
//var GMFTP1_8084 = "http://gmftp1.afreecatv.com:8084";
//var GMPROXYFTP1_8084 = "http://gmproxyftp1.afreecatv.com:8084";

var BESTBJ_80 = "http://bestbj.afreecatv.com";           //베스트BJ 전용
var BESTBJ_NONE_SCHEME = "//bestbj.afreecatv.com";           //베스트BJ 전용

var ISSUE_80 = "http://issue.afreecatv.com";             //이슈방송스케쥴
var ISSUE_SSL = "https://issue.afreecatv.com";           //이슈방송스케쥴
var ISSUE_NONE_SCHEME = "//issue.afreecatv.com";           //이슈방송스케쥴

var AFREECA_AD = "http://ad.afreecatv.com";            //아프리카TV 광고
var AFREECA_AD_NONE_SCHEME = "//ad.afreecatv.com";            //아프리카TV 광고

var AD_NONE_SCHEME = "//pa.afreecatv.com";      // 아프리카TV 광고

var VOD_DOMAIN = "http://vod.afreecatv.com";		// 동영상 섹션
var VOD_NONE_SCHEME = "//vod.afreecatv.com";		// 동영상 섹션

var VIDEO_FILE = "http://video.afreecatv.com";           //아카이브 파일
var VIDEO_FILE_NONE_SCHEME = "//video.afreecatv.com";           //아카이브 파일

var VIDEO_THUMBNAIL = "http://videoimg.afreecatv.com";   //아카이브 썸네일
var VIDEO_THUMBNAIL_NONE_SCHEME = "//videoimg.afreecatv.com";   //아카이브 썸네일

// 모바일 아프리카TV
var IAPP_AFREECA = "http://iapp.m.afreecatv.com";   //모바일 아프리카
var IAPP_AFREECA_NONE_SCHEME = "//iapp.m.afreecatv.com";   //모바일 아프리카

var AFREECA_STORAGE_ADMIN_LOCATION = "/ADMIN/";	//MogileFS-ADMIN

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

//검색 API URL 정보
var SEARCH_SCH_80 = "http://sch.afreecatv.com";
var SEARCH_SCH_NONE_SCHEME = "//sch.afreecatv.com";

var SEARCH_SCKETC_80 = "//scketc.afreecatv.com";
var SEARCH_SCKETC_NONE_SCHEME = "//scketc.afreecatv.com";

//프리캡
var STS = 'http://freecap.afreecatv.com';
var STS_DOMAIN = 'www.freecap.afreecatv.com';
var STS_NONE_SCHEME = '//freecap.afreecatv.com';

var STS_STATIC = 'http://static.freecap.afreecatv.com';
var STS_STATIC_NONE_SCHEME = '//static.freecap.afreecatv.com';

var STS_BBS = 'http://bbs.freecap.afreecatv.com';

// 트랜스코더 장비
var TRANSCODER = 'http://transcoder.afreecatv.com';
var TRANSCODER_NONE_SCHEME = '//transcoder.afreecatv.com';

// 아쿠아
var AQUA_DOMAIN = 'http://aqua.afreecatv.com';
var AQUA_NONE_SCHEME = '//aqua.afreecatv.com';

var EVENTAPI_NONE_SCHEME = '//eventapi.afreecatv.com';

var API_UP_NONE_SCHEME = '//api.up.afreecatv.com';

//신규 방송국
var BJ_AFREECA = ((document.location.protocol == "https:") ? "https" : "http")+"://bj.afreecatv.com";
var BJ_AFREECA_NONE_SCHEME = "//bj.afreecatv.com";
var BJ_AFREECA_SSL = "https://bj.afreecatv.com";

//방송 통계
var BROAD_STATISTIC = "http://broadstatistic.afreecatv.com";
var BROAD_STATISTIC_NONE_SCHEME = "//broadstatistic.afreecatv.com";

var STUDIO_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'studio.afreecatv.com';
var SOTONG_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'sotong.afreecatv.com';
var NEWAPPLY_AFREECA_NONE_SCHEME = ((document.location.protocol == 'https:') ? 'https://' : 'http://') + 'newapply.afreecatv.com';

// 포인트
var MYPOINT_DOMAIN = "http://mypoint.afreecatv.com";
var MYPOINT_NONE_SCHEME = "//mypoint.afreecatv.com";
