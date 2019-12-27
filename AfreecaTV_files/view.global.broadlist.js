/**
 * 방송리스트형 메인 view
 *
 * @author      $Author: jjang1406 $
 * @version     $Revision: 57774 $
 * @link
 * @copyright Copyright(c)2017 by AfreecaTV. Co., Ltd. Seoul, Korea. All rights reserved.
 */

var _nPage = 1;
var _orderType = "view_cnt";
var arrCategory = null;
var oIntervalFn;
var oGameRankingInterval;


var a2depthMenu = ['bora','sports'];
var aPosterdepthMenu = ['game'];

define('view', ['afreeca', 'favorite', 'hashtag', 'doT', 'banner', 'mousewheel','mCustomScrollbar'], function(atv, favorite, hashtag, doT ,banner) {
    requirejs(['service/plugins/player', 'service/plugins/member'], function(player, member) { });

     // 배너리스트
    var oBannerList = {
        "game" : {RESULT : oMainData.GAME_BANNER_RESULT, DATA : oMainData.GAME_BANNER_DATA}
        , "sports" : {RESULT : oMainData.SPORT_BANNER_RESULT, DATA : oMainData.SPORT_BANNER_DATA}
        , "stock" : {RESULT : oMainData.STOCK_BANNER_RESULT, DATA : oMainData.STOCK_BANNER_DATA}
        , "pet" : {RESULT : oMainData.PET_BANNER_RESULT, DATA : oMainData.PET_BANNER_DATA}
        , "rookie" : {RESULT : oMainData.NEW_BJ_BANNER_RESULT, DATA : oMainData.NEW_BJ_BANNER_DATA}
    }

    var $ = atv.$
    , oView = {
        oSlider : null
        , oLiveSlider : null
        , oVodSlider : null
        , HotTab : 0
        , nChinaChk : "0"
        , nAbroadChk : "0"
        , szLocale : 'ko_KR'
        , bControl : false
        , oSettingGlobal : {
            slideWidth: 228,
            auto: true,
            autoHover: true,
            pause: 3000,
            speed: 400,
            pager: false,
            controls: false,
            moveSlides: 1,
            slideMargin: 16,
            onSlideAfter: function(oElement, nOldIndex, nNewIndex) {
                if(oView.HotTab == 0)
                {
                    if(oView.oLiveSlider.getSlideCount() == 0 && !oView.bControl)
                    {
                        oView.HotTab = 1;
                        $("#hotTab li").removeClass("on");
                        $('#vod_slider_btn').addClass("on");
                        $("#hotArea > .listarea").hide();
                        $("#hotArea > .listarea:last").fadeIn(1500);
                        $("#toggleList").attr("class", "stopButton") // 메뉴변경시 자동롤링 재실행
                        $("#toggleList").html('stop');
                        if(oView.oVodSlider == null)
                        {
                            oView.oVodSlider = $("#vodSlider").bxSlider(oView.oSetting);
                            oView.oVodSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oVodSlider.reloadSlider(oView.oSetting); // 메뉴 클릭시 리로딩
                        }
                    }
                }
                else if(oView.HotTab == 1)
                {
                    if(oView.oVodSlider.getSlideCount() == 0 && !oView.bControl)
                    {
                        $("#hotTab li").removeClass("on");
                        $('#live_slider_btn').addClass("on");
                        $("#hotArea > .listarea").hide();
                        $("#hotArea > .listarea:first").fadeIn(1500);
                        $("#toggleList").attr("class", "stopButton") // 메뉴변경시 자동롤링 재실행
                        $("#toggleList").html('stop');
                        if(oView.oLiveSlider == null)
                        {
                            oView.oLiveSlider = $("#liveSlider").bxSlider(oView.oSetting);
                            oView.oLiveSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oLiveSlider.reloadSlider(oView.oSetting); // 메뉴 클릭시 리로딩
                        }
                    }
                }
            }
        }
        , oSettingStaffPicks : {
            slideWidth: 228,
            auto: false,
            autoHover: true,
            pause: 3000,
            speed: 400,
            pager: false,
            controls: true,
            moveSlides: 6,
            slideMargin: 16
        }        
        , oSettingOne : {
            minSlides: 4,
            maxSlides: 4
        }
        , oSettingTwo : {
            minSlides: 5,
            maxSlides: 5
        }
        , oSettingThree : {
            minSlides: 6,
            maxSlides: 6
        }
        , oSettingPosterOne : {
            minSlides: 6,
            maxSlides: 6
        }
        , oSettingPosterTwo : {
            minSlides: 7,
            maxSlides: 7
        }
        , oSettingPosterThree : {
            minSlides: 8,
            maxSlides: 8
        }
        , oSettingPosterFour : {
            minSlides: 9,
            maxSlides: 9
        }
        , oSettingGame : {
            slideWidth: 148, 
            auto: false, 
            autoHover: true, 
            pause: 3000, 
            speed: 500, 
            pager: false, 
            controls: true, 
            slideMargin: 14, 
            hideControlOnEnd: true, 
            infiniteLoop: false, 
            onSliderLoad: function(){ 
                $("#gameToggle").prop("disabled",false);     //버튼 비활성화 제거
            }
        }
        , oSetting : {}
        , oSettingPoster : {}
        , oStaffPicksSetting :{}
        , aStaffSlider : []
        , aGamePosterData : []
        , aGameRankingData : []
        , init : function() {
            // 이미지 cdn 설정 체크 - override constant.js 
            if(typeof(oMainData.IMAGE_CDN_CONFIG) !== 'undefined') {
                if(oMainData.IMAGE_CDN_CONFIG.LIVE == 1) {
                    LIVEIMG_9090 = '//liveimg-cf.afreecatv.com';
                    LIVEIMG_NONE_SCHEME = '//liveimg-cf.afreecatv.com';
                }
                if(oMainData.IMAGE_CDN_CONFIG.ADMIN == 1) {
                    ADMIN_IMG = '//admin-cf.img.afreecatv.com';
                    ADMIN_IMG_NONE_SCHEME = '//admin-cf.img.afreecatv.com';
                }
            }
            
            //해외 유저에 대해서만 cf돌림
            //nAbroadChk = 0 국내 / 1: 해외 유저
            if(oView.nAbroadChk == "1"){
                // override - constant.js
                ADMIN_IMG = "//admin-cf.img.afreecatv.com";
                ADMIN_IMG_NONE_SCHEME = '//admin-cf.img.afreecatv.com';
            }
            // 즐겨찾기 콜렉터호출시 넘겨줄 sys_type 변수 해외일경우 webk -> webg
            if(oView.szLocale != 'ko_KR'){favorite.szFrom = 'webg';}

            // 데이터 호출
            _szCurHash = _szCurHash ? _szCurHash : 'all';
            switch(_szCurHash)
            {
                case "favorite":
                case "fav":
                    location.href = MY_NONE_SCHEME + "/favorite";
                    break;

                case "recent":
                    location.href = MY_NONE_SCHEME + "/recent";
                    break;

                case "foru":
                    location.href = AFREECA_NONE_SCHEME + "/foru.htm";
                    break;
                    
                case "subsBJ":
                    location.href = MY_NONE_SCHEME + "/subscribe";
                    break;

                case "fanBJ":
                    location.href = MY_NONE_SCHEME + "/fanclub";
                    break;

                case "all":
                    if(checkSimple("main","hot_issue")){
                        this.getHotissueData();    
                    }                    
                    this.getStaffPicksList();
                    this.getLiveSection();
                    //this.initResizeSlider();
                    this.getSubsGiftInfo();
                    this.showChinaLayer();

                    $(window).on('resize ready',function() {

                        var nWindowWidth = $(window).width();
                        if (nWindowWidth <= 1493) {
                            $("#wideArea").attr("class", "content_area");
                            oView.oSetting = $.extend({}, oView.oSettingOne, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingOne, oView.oSettingStaffPicks);
                        } else {
                            $("#wideArea").attr("class", "content_area listfive");
                            oView.oSetting = $.extend({}, oView.oSettingTwo, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingTwo, oView.oSettingStaffPicks);
                        }
                        if (nWindowWidth > 1737) {
                            $("#wideArea").attr("class", "content_area listsix");
                            oView.oSetting = $.extend({}, oView.oSettingThree, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingThree, oView.oSettingStaffPicks);
                        }

                        if(oView.oLiveSlider == null)
                        {
                            oView.oLiveSlider = $("#liveSlider").bxSlider(oView.oSetting);
                            oView.oLiveSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oLiveSlider.reloadSlider(oView.oSetting);
                        }

                        if(oView.oVodSlider == null)
                        {
                            oView.oVodSlider = $("#vodSlider").bxSlider(oView.oSetting);
                            oView.oVodSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oVodSlider.reloadSlider(oView.oSetting);
                        }

                       //슬라이더 멈춤 스태프 픽스 다시 적용

                        for(var i=0; i<oMainData.STAFF_PICKS_CNT; i++)
                        {

                            if( oMainData.STAFF_PICKS_DATA[i].option_flag == "B") {
                                if(oView.aStaffSlider[i].length == 0)
                                {
                                    oView.aStaffSlider[i] = $(".global_slider_"+i).bxSlider(oView.oStaffPicksSetting);
                                }else
                                {

                                    oView.aStaffSlider[i].reloadSlider(oView.oStaffPicksSetting);
                                }

                                /*
                                if( oView.aStaffSlider[i].length == 1) {
                                    //console.log(oView.aStaffSlider[i]);
                                    //console.log(oView.aStaffSlider[i].getSlideCount() );
                                    if( oView.aStaffSlider[i].getSlideCount() < 4 )
                                    {
                                        //console.log(oView.aStaffSlider[i].selector );
                                        $(oView.aStaffSlider[i].selector).parent().parent().children('.bx-has-controls-direction').hide();
                                    }
                               }
                                 */
                            }
                        }
                    });

                    if(oMainData.STAFF_PICKS_CNT > 0)
                    {
                        var nWindowWidth = $(window).width();
                        if (nWindowWidth <= 1493) {
                            $("#wideArea").attr("class", "content_area");
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingOne, oView.oSettingStaffPicks);
                        } else {
                            $("#wideArea").attr("class", "content_area listfive");
                            oView.oSetting = $.extend({}, oView.oSettingTwo, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingTwo, oView.oSettingStaffPicks);
                        }
                        if (nWindowWidth > 1737) {
                            $("#wideArea").attr("class", "content_area listsix");
                            oView.oSetting = $.extend({}, oView.oSettingThree, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingThree, oView.oSettingStaffPicks);
                        }


                        //슬라이더 멈춤 스태프 픽스 다시 적용

                        for(var i=0; i<oMainData.STAFF_PICKS_CNT; i++)
                        {
                            //console.log( oMainData.STAFF_PICKS_DATA[i].option_flag );
                            //alert(oMainData.STAFF_PICKS_DATA[i].option_flag);
                            if( oMainData.STAFF_PICKS_DATA[i].option_flag == "B") {
                                if(oView.aStaffSlider[i] == null)
                                {
                                    //console.log(oView.aStaffSlider[i].getSlideCount);
                                    //console.log(i);
                                    oView.aStaffSlider[i] = $(".global_slider_"+i).bxSlider(oView.oStaffPicksSetting);
                                }else
                                {
                                    oView.aStaffSlider[i].reloadSlider(oView.oStaffPicksSetting);
                                }

                                /*
                                if( oView.aStaffSlider[i].length == 1) {
                                    //console.log(oView.aStaffSlider[i]);

                                    //console.log(oView.aStaffSlider[i].getSlideCount() );
                                    if( oView.aStaffSlider[i].getSlideCount() < 4 )
                                    {
                                        //console.log(oView.aStaffSlider[i].selector );
                                        $(oView.aStaffSlider[i].selector).parent().parent().children('.bx-has-controls-direction').hide();
                                    }
                               }
                               */
                            } else {
                                $('#staffPicksList').find( ".global_slider_"+i ).parent().parent().attr("class","");
                            }
                        }
                    }

                    $("#toggleList").click(function() {
                        var classname = $(this).attr("class");
                        if (classname == "stopButton") {
                            $(this).attr("class", "startButton");
                            $(this).html('play');
                            if($('#live_slider_btn').attr('class') == 'on')
                            {
                                oView.oLiveSlider.stopAuto();
                            }
                            else if($('#vod_slider_btn').attr('class') == 'on')
                            {
                                oView.oVodSlider.stopAuto();
                            }
                        }
                        if (classname == "startButton") {
                            $(this).attr("class", "stopButton");
                            $(this).html('stop');

                            if($('#live_slider_btn').attr('class') == 'on')
                            {
                                oView.oLiveSlider.startAuto();
                            }
                            else if($('#vod_slider_btn').attr('class') == 'on')
                            {
                                oView.oVodSlider.startAuto();
                            }
                        }
                        return false;
                    });

                    $("#toggleList").hover(function() {
                        if($('#live_slider_btn').attr('class') == 'on')
                        {
                            oView.oLiveSlider.stopAuto();
                        }
                        else if($('#vod_slider_btn').attr('class') == 'on')
                        {
                            oView.oVodSlider.stopAuto();
                        }
                    }, function() {
                        if($("#toggleList").attr('class') != 'startButton')
                        {
                            if($('#live_slider_btn').attr('class') == 'on')
                            {
                                oView.oLiveSlider.startAuto();
                            }
                            else if($('#vod_slider_btn').attr('class') == 'on')
                            {
                                oView.oVodSlider.startAuto();
                            }
                        }
                        oView.bControl = false;
                    });

                    $(".control > .prev").hover(function() {
                        if($('#live_slider_btn').attr('class') == 'on')
                        {
                            oView.oLiveSlider.stopAuto();
                        }
                        else if($('#vod_slider_btn').attr('class') == 'on')
                        {
                            oView.oVodSlider.stopAuto();
                        }
                    }, function() {
                        if($("#toggleList").attr('class') != 'startButton')
                        {
                            if($('#live_slider_btn').attr('class') == 'on')
                            {
                                oView.oLiveSlider.startAuto();
                            }
                            else if($('#vod_slider_btn').attr('class') == 'on')
                            {
                                oView.oVodSlider.startAuto();
                            }
                        }
                        oView.bControl = false;
                    });

                    $(".control > .next").hover(function() {
                        if($('#live_slider_btn').attr('class') == 'on')
                        {
                            oView.oLiveSlider.stopAuto();
                        }
                        else if($('#vod_slider_btn').attr('class') == 'on')
                        {
                            oView.oVodSlider.stopAuto();
                        }
                    }, function() {
                        if($("#toggleList").attr('class') != 'startButton')
                        {
                            if($('#live_slider_btn').attr('class') == 'on')
                            {
                                oView.oLiveSlider.startAuto();
                            }
                            else if($('#vod_slider_btn').attr('class') == 'on')
                            {
                                oView.oVodSlider.startAuto();
                            }
                        }
                        oView.bControl = false;
                    });

                    $(".control > .prev").click(function() {
                        oView.bControl = true;
                        if($('#live_slider_btn').attr('class') == 'on')
                        {
                            oView.oLiveSlider.goToPrevSlide();
                        }
                        else if($('#vod_slider_btn').attr('class') == 'on')
                        {
                            oView.oVodSlider.goToPrevSlide();
                        }
                        return false;
                    });
                    $(".control > .next").click(function() {

                        oView.bControl = true;
                        if($('#live_slider_btn').attr('class') == 'on')
                        {
                            oView.oLiveSlider.goToNextSlide();
                        }
                        else if($('#vod_slider_btn').attr('class') == 'on')
                        {
                            oView.oVodSlider.goToNextSlide();
                        }
                        return false;
                    });

                    $('#liveSlider > li').hover(function() {
                        oView.bControl = true;
                    }, function() {
                        oView.bControl = false;
                    });

                    $('#vodSlider > li').hover(function() {
                        oView.bControl = true;
                    }, function() {
                        oView.bControl = false;
                    });

                    $('#hotArea').on('click', '#live_slider_btn', function() {
                        oView.HotTab = 0;
                        $("#hotTab li").removeClass("on");
                        $(this).addClass("on");
                        $("#hotArea > .listarea").hide();
                        $("#hotArea > .listarea:first").show();
                        $("#toggleList").attr("class", "stopButton") // 메뉴변경시 자동롤링 재실행
                        $("#toggleList").html('stop');

                        var nWindowWidth = $(window).width();
                        // 핫이슈 슬라이드
                        if (nWindowWidth <= 1493) {
                            $("#wideArea").attr("class", "content_area");
                            oView.oSetting = $.extend({}, oView.oSettingOne, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingOne, oView.oSettingStaffPicks);
                        } else {
                            $("#wideArea").attr("class", "content_area listfive");
                            oView.oSetting = $.extend({}, oView.oSettingTwo, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingTwo, oView.oSettingStaffPicks);

                        }
                        if (nWindowWidth > 1737) {
                            $("#wideArea").attr("class", "content_area listsix");
                            oView.oSetting = $.extend({}, oView.oSettingThree, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingThree, oView.oSettingStaffPicks);
                        }

                        if(oView.oLiveSlider == null)
                        {
                            oView.oLiveSlider = $("#liveSlider").bxSlider(oView.oSetting);
                            oView.oLiveSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oLiveSlider.reloadSlider(oView.oSetting); // 메뉴 클릭시 리로딩
                        }
                        return false;
                    });

                    $('#hotArea').on('click', '#vod_slider_btn', function() {
                        oView.HotTab = 1;
                        $("#hotTab li").removeClass("on");
                        $(this).addClass("on");
                        $("#hotArea > .listarea").hide();
                        $("#hotArea > .listarea:last").show();
                        $("#toggleList").attr("class", "stopButton") // 메뉴변경시 자동롤링 재실행
                        $("#toggleList").html('stop');

                        var nWindowWidth = $(window).width();
                        // 핫이슈 슬라이드
                        if (nWindowWidth <= 1493) {
                            $("#wideArea").attr("class", "content_area");
                            oView.oSetting = $.extend({}, oView.oSettingOne, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingOne, oView.oSettingStaffPicks);
                        } else {
                            $("#wideArea").attr("class", "content_area listfive");
                            oView.oSetting = $.extend({}, oView.oSettingTwo, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingTwo, oView.oSettingStaffPicks);

                        }
                        if (nWindowWidth > 1737) {
                            $("#wideArea").attr("class", "content_area listsix");
                            oView.oSetting = $.extend({}, oView.oSettingThree, oView.oSettingGlobal);
                            oView.oStaffPicksSetting = $.extend({}, oView.oSettingThree, oView.oSettingStaffPicks);
                        }

                        if(oView.oVodSlider == null)
                        {
                            oView.oVodSlider = $("#vodSlider").bxSlider(oView.oSetting);
                            oView.oVodSlider.on('mouseleave', function() {
                                oView.bControl = false;
                            });
                        }
                        else
                        {
                            oView.oVodSlider.reloadSlider(oView.oSetting); // 메뉴 클릭시 리로딩
                        }
                        return false;
                    });

                    //둘다 없으면 영역 전체 hide하고
                    if(oMainData.REALTIME_HOTISSUE_RESULT != 1 && oMainData.HOTISSUE_VOD_RESULT != 1)
                    {
                        $('#hotArea').hide();
                    } else {
                        var showLive = false; //기본 vod
                        //노출기준이 live이고 데이터가 있으면 Live 노출
                        if(oMainData.MAIN_EXPOSE_DATA[0].type == 'LIVE' && oMainData.REALTIME_HOTISSUE_CNT > 0 && oMainData.REALTIME_HOTISSUE_RESULT == 1)
                        {
                            showLive = true;
                        } else {
                            //type vod 인데 vod가 없다면 Live 노출
                            if(oMainData.HOTISSUE_VOD_RESULT != 1) {
                                showLive = true;
                            }
                        }

                        if(showLive) {
                            $('#live_slider_btn').click();
                            $("#hotArea > .listarea:first").show();
                        } else {
                            $('#vod_slider_btn').click();
                            $("#hotArea > .listarea:last").show();
                        }
                    }

                    if( oView.szLocale != "ko_KR" || checkSimple("main","top_banner") ){
                        this.getListTopBnrData(0);
                    }
                    this.getMainData();

                    break;
                case 'hashtag' :
                    this.getMainData();
                    break;
                case 'livesection':
                    oView.callLiveSectionDetail(1, 'all');
                    break;
                default:
                    if(_szCurHash.indexOf('staffpicks_') != -1) // 글로벌용 스태프 픽스 상세 페이지
                    {
                        this.getStaffPicksData(_szCurHash);
                        break;
                    }
                    szLogoutUrl = '';
                    this.getMainData();
                    break;
            }

            /* 방송하기 레이어 열기 */
            $("#studioPlay").on('click', function() {
                if(navigator.userAgent.replace(/ /g,'').indexOf('MacOSX') != -1) {
                    alert('현재 MAC OS에서는 웹 플레이어만 지원됩니다.');
                    return;
                }

                oAnalysisUtil.setClickLog('main_00000004', '', '');

                // 신규 통계 추가
                callAU('NEW_STUDIO_SELECT');

                //일본 한국 제외 하고는 대쉬 보드로 바로 이동
                if( oView.szLocale == 'en_US' || oView.szLocale == 'zh_TW' || oView.szLocale == 'zh_CN' || oView.szLocale == 'th_TH') {
                     window.open('http://dashboard.afreecatv.com/', '_blank');
                    return false;
                }

                $("#studioSelect").attr('class','studio_selectbox');

                if(oView.szLocale == 'ja_JP'){
                    $("#avaPlay").hide();
                    //다른 작업이랑 꼬여서 여기서 그냥 클래스를 설정해버림
                    $("#studioSelect").attr('class','studio_selectbox lang');
                }

                $('#overlay').fadeIn('fast');
                $('#studioSelect').slideDown();
                disableScroll();
                return false;
            });

            $("#studioPlayKor").on('click', function() {
                if(navigator.userAgent.replace(/ /g,'').indexOf('MacOSX') != -1) {
                    alert('현재 MAC OS에서는 웹 플레이어만 지원됩니다.');
                    return;
                }

                oAnalysisUtil.setClickLog('main_00000004', '', '');

                // 신규 통계 추가
                callAU('NEW_STUDIO_SELECT');

                //일본 한국 제외 하고는 대쉬 보드로 바로 이동
                if( oView.szLocale == 'en_US' || oView.szLocale == 'zh_TW' || oView.szLocale == 'zh_CN' || oView.szLocale == 'th_TH') {
                     window.open('http://dashboard.afreecatv.com/', '_blank');
                    return false;
                }

                $("#studioSelect").attr('class','studio_selectbox');

                if(oView.szLocale == 'ja_JP'){
                    $("#avaPlay").hide();
                    //다른 작업이랑 꼬여서 여기서 그냥 클래스를 설정해버림
                    $("#studioSelect").attr('class','studio_selectbox lang');
                }

                $('#overlay').fadeIn('fast');
                $('#studioSelect').slideDown();
                disableScroll();
                return false;
            });

            /* 방송하기 레이어 닫기 */
            $("#studioSelect .close, #overlay").on('click', function() {
                $('#overlay').fadeOut('fast');
                $('#studioSelect').slideUp();
                enableScroll();
                return false;
            });


            // 시청하기, 방송하기
            $('#oldStudioPlay, #newStudioPlay, #avaPlay').click(startPlayer);

            // 프릭샷 링크
            $('#newStudioLink').click(function() {
                callAU('NEW_STUDIO_LINK');
            });

            $('div.join_area a.login').click(function() {
                atv.goLogin();
            });

            var szKeyword = '';             // 키워드명
            var nEvent = 0;                 // 한글 입력 다음 방향키 입력 시 중복 이벤트 발생 방지 
            // 실시간 인기 검색어 / 최근검색어
            $('input#szKeyword').on('click', function(event) {
                _search.setClickPage($('input#szKeyword').val());
                _search.szBeforeSzSType = _search.szSType;      // 최근/실시간 검색어 재검색시 szSType 저장
                _search.nIndex = -1;                            // 인덱스 초기화
                return false;
            }).on('keydown', function (event) {
                if (event.keyCode == 37 || event.keyCode == 39) {
                    // 아무 이벤트 없음
                } else if (event.keyCode == 38 || event.keyCode == 40) {
                    _search.changeKeyword(event.keyCode);
                    nEvent = 1;
                } else if (event.keyCode == 13) {
                    if (_search.nIndex == -1) {
                        _search.szSType = 'di';
                    }
                    $('button.btn_search').click();
                } else {
                    _search.nIndex = -1;    // 리스트 인덱스 초기화
                    _search.szBeforeSzSType = '';
                    nEvent = 0;
                }
            }).on('keyup', function (event) {
                if (event.keyCode != 38 && event.keyCode != 40 && !nEvent) {
                    _search.setClickPage($('input#szKeyword').val());
                    return false;
                }
            });

            $('button.btn_search').on('click', function() {
                if ($('input#szKeyword').val() == '')
                {
                    //번역된 문구 메시지 가져옴
                    var Object ={};
                    var szMessage = doT.template($("#message_none_search_keyword").html())(Object);
                    alert(szMessage);
                    return;
                }
                // 타입 나눔
                var szStype = '';
                if (_search.szBeforeSzSType != '') {
                    szStype = _search.szBeforeSzSType;
                } else if (_search.nIndex == null || _search.nIndex == -1 || _search.szSType == 'di') {
                    szStype = 'di';
                } else if (_search.szSType == 'rk') {
                    szStype = 'rk';
                } else if (_search.szSType == 'lc') {
                    szStype = 'lc';
                } else {
                    szStype = 'ac';
                }
              
                _search.getBanKeyword($('input#szKeyword').val(), 'total', 'sv', szStype);
            });

            //닉네임 click
            $('#wideArea').on('click', 'div.listarea div.cast_box a.nick, div.statistic_area div.cast_box a.nick', function() {
                if($(this).parent().find('#contextMenu').length == 0)
                {
                    $('#contextMenu').remove();
                    favorite.checkFavoriteList(oView.showIctMenu, this, $(this).attr('user_id'));
                }
                else
                {
                    $('#contextMenu').remove();
                }
            });

            $('body').on('click', '#wrap', function (e) {
                if ( !($(e.target).is('div.listarea div.cast_box a.nick') || $(e.target).is('div.statistic_area div.cast_box a.nick')) ) {
                   $('#contextMenu').remove();
                }
                //ForU selectbox
                /*if($(e.target).parents('div.select').length == 0) {
                    $('div.select').each(function(){
                        if($(this).hasClass('on')) {
                            $(this).trigger('outclick');
                        }
                    });
                }*/
                //장기구독자 선물 안내 레이어 닫기
                if ($(e.target).parents('#galarm_layer').length == 0) {
                    $('#galarm_layer').fadeOut();
                }
            });

            // 즐겨찾기 삭제
            $('#wideArea').on('click', 'div.listarea div.cast_box a#favorite_delete, div.statistic_area div.cast_box a#favorite_delete', function() {

                var szBjid = $(this).parent().find('a.nick').attr('user_id');
                var szBjNick = $(this).parent().find('a.nick').text();

                var Object ={USER_NICK : szBjNick};
                var szMessage = doT.template($("#message_confirm_favorite_delete").html())(Object);

                if(confirm(szMessage))
                {
                    favorite.delFavoriteList(szBjid, true);
                }
            });            

            // top button
            var topBtn = $('#btn_pagetop');
            $(window).scroll(function () {
                if ($(this).scrollTop() > 50) {
                    topBtn.fadeIn();
                } else {
                    topBtn.fadeOut();
                }
            });
            topBtn.click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 100);
                return false;
            });

            $('h2.title').on('click', 'a#titleToggle', function(){
                var classname = $(this).attr('class');
                if(classname == 'on') {
                    $(this).attr('class', 'off');
                }
                if(classname == 'off') {
                    $(this).attr('class', 'on');
                }
                $('#subCategory').toggle();
                return false;
            });

            $(document).on('click', function(){
                $('div.search_box').hide();
            });

            //나중에 보기 버튼
            $(document).on('click', 'a#laterview_push', function(){
                var type = $(this).closest('a#laterview_push').attr("data-vod-type");
                if(type == "LIVE") {
                    var broadno = $(this).closest('a#laterview_push').attr("data-broad-no");
                }else if(type == "VOD"){
                    var titleno = $(this).closest('a#laterview_push').attr("data-title-no");
                }

                if(!atv.isLogin()) {
                    var Object ={};
                    var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                    if(confirm(szMessage)){
                        var ticket = self.getCookie('_au');
                        if(type == "LIVE") {
                            atv.setInit('Later', 'Later:'+ticket+':'+type+':'+broadno, DOMAIN, 1);
                        }else if(type == "VOD"){
                            atv.setInit('Later', 'Later:'+ticket+':'+type+':'+titleno, DOMAIN, 1);
                        }
                        atv.goLogin();
                    }
                    return;
                }
                if(type == "LIVE") {
                    oView.LaterViewPush(type,broadno,'list','web');
                }else if(type == "VOD"){
                    oView.LaterViewPush(type,titleno,'list','web');
                }
            });

            //나중에 보기 안내 레이어 닫기
            $('#View_after button.close, #View_after button.layer_close, #overlay').click(function() {
                if($('#View_after #close_layer').is(':checked')){
                    atv.setCookie('LaterviewInfoLayer', 'off', DOMAIN, 5*365);
                }
                $('#View_after').hide();
                $('#overlay').fadeOut('fast');
            });

            //나중에 보기 안내 레이어 링크
            $('#View_after a').click(function() {
                window.open(VOD_DOMAIN + '/LATER');
            });

            //장기구독자 선물 안내 레이어 닫기
            $("#galarm_layer #todayclose").change(function(){
                if($("#galarm_layer #todayclose").is(":checked")){
                    atv.setCookie('SubsGiftLayer', 'off', DOMAIN, 30);
                }
                $('#galarm_layer').fadeOut();
            });
            $('#galarm_layer a.pop-close, #galarm_layer a.btn').click(function() {
                $('#galarm_layer').fadeOut();
            });
            $('#studioPlay, #studioPlayKor, #logArea .nickname').click(function(){
                if($('#galarm_layer').length > 0) $('#galarm_layer').fadeOut();
            });

            //중국 VPN시청안내 레어어 닫기
            $('#backlayer, .pop-btn a').click(function() {
                if($('#chinatodayclose').is(':checked')){
                    // 하루간 보지 않기
                    atv.setCookie('availableChinaLayer', 'off', DOMAIN, 1);
                }
                $('#layer_zh_info').hide();
            });
    
            function startPlayer(event) {
                //점검이면 리턴
                if (oMainData.PM_APP_PLAYER_RESULT == 1) {
                    alert(oMainData.PM_APP_PLAYER_DATA.msg);
                    return;
                }

                var player = atv.player;
                var exePlayer = null;
                var log = null;

                switch (event.currentTarget.id) {
                    case 'oldStudioPlay' : //구스튜디오
                        exePlayer = oView.szLocale == 'ja_JP' ? player.runJpStudio.bind(player) : player.runStudio.bind(player);
                        log = 'TRY_STUDIO';
                       break;
                    case 'newStudioPlay' : //프릭샷
                        exePlayer = player.runNewStudio.bind(player);
                        log = 'TRY_NEW_STUDIO';
                        break;
                    case 'avaPlay' : //AVA
                        exePlayer =  player.runAvaPlayer.bind(player);
                        break;
                }

                exePlayer ? exePlayer('cast') : null;
                log ? callAU(log) : null;
            }
        }
        , getChromeVersion : function() {
            var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

            return raw ? parseInt(raw[2], 10) : false;
        }
        , getMainData : function() {
            switch(_szCurHash)
            {
                case "hashtag":
                    $('#broad_sv_area').hide();
                    $('#LNB-ScrollBox li').removeClass('on');
                    $('#wideArea h2.title').html('#'+_szHashTag);
                    $('#subCategory').html('');
                    $('#hashtagTab').show();

                    $('#hashtagTab li').on('click', function () {
                        $('div.loading').show();
                        $('#hashtagTab li').removeClass('on');
                        $(this).addClass('on');

                        var szSearchType = $(this).data('type');
                        if (szSearchType == "hashtag_live") {
                            $('#hashtagLive_order li').off('click').on('click', function () {
                                $('#hashtagLive_order li').removeClass('on');
                                $(this).addClass('on');
                                hashtag.getHashTagLive(1, $(this).data('order'), _szHashTag, oView.showHashTagList);
                            });

                            $('button.btn_reload').off('click').on('click', function(e){
                                e.preventDefault();
                                hashtag.getHashTagLive(1, $('#hashtagLive_order li.on').data('order'), _szHashTag, oView.showHashTagList);
                            });
                            $('#more_list').off('click').on('click', function () {
                                hashtag.getHashTagLive($(this).data('page'), $('#hashtagLive_order li.on').data('order'), _szHashTag, oView.showHashTagList);
                            });

                            hashtag.getHashTagLive(1, null, _szHashTag, oView.showHashTagList);
                        }
                        else if (szSearchType == "hashtag_vod") {
                            $('#hashtagVod_order li').off('click').on('click', function () {
                                $('#hashtagVod_order li').removeClass('on');
                                $(this).addClass('on');
                                hashtag.getHashTagVod(1, $(this).data('order'), $('#hashtagVod_range li.on').data('range'), _szHashTag, oView.showHashTagList);
                            });
                            $('#hashtagVod_range li').off('click').on('click', function () {
                                $('#hashtagVod_range li').removeClass('on');
                                $(this).addClass('on');
                                hashtag.getHashTagVod(1, $('#hashtagVod_order li.on').data('order'), $(this).data('range'), _szHashTag, oView.showHashTagList);
                            });
                            $('#more_list').off('click').on('click', function () {
                                hashtag.getHashTagVod($(this).data('page'), $('#hashtagVod_order li.on').data('order'), $('#hashtagVod_range li.on').data('range'), _szHashTag, oView.showHashTagList);
                            });

                            hashtag.getHashTagVod(1, null, null, _szHashTag, oView.showHashTagList);
                        }
                        else {
                            // 전체
                            hashtag.getHashTagAll(1, null, null, _szHashTag, oView.showHashTagList);
                        }
                    });

                    $('#hashtagLive_more').off('click').on('click', function () {
                        $('#hashtagTab li #hashtag_live').click();
                    });
                    $('#hashtagVod_more').off('click').on('click', function () {
                        $('#hashtagTab li #hashtag_vod').click();
                    });

                    hashtag.init(1, null, null, _szHashTag, oView.showHashTagList);
                    break;

                default:
                    if ($('#'+ _szCurHash).size() == 1)
                    {
                        var szCateTitle = $('#'+ _szCurHash).attr('name');
                        if ($.inArray(_szCurHash, a2depthMenu) > -1 )
                        {
                            $('#wideArea h2.title').html('<a href="javascript:;" id="titleToggle" class="on">'+ szCateTitle +'<em></em></a>');
                        }
                        else if($.inArray(_szCurHash, aPosterdepthMenu) > -1 ){
                            //if( oView.aGamePosterData !=  null ) {
                             // 한국만 적용
                            if( oView.szLocale == 'ko_KR'){
                                $('.tit_area').attr('class', 'tit_area_g');     // div 클래스명 변경
                                $('#wideArea h2.title').html(szCateTitle);
                                var optionHtml = $('#poster_text_option').html();
                                $('#wideArea h2.title').after(optionHtml);
                                $(".tit_area_g .view_option li:first").addClass("on").show();
                            }else{
                                $('#wideArea h2.title').html('<a href="javascript:;" id="titleToggle" class="on">'+ szCateTitle +'<em></em></a>');
                            }
                        }
                        else
                        {
                            $('#wideArea h2.title').html(szCateTitle);
                        }
                        $('#subCategory').html('');

                        this.getBroadContents($('#'+ _szCurHash));
                        if(_szCurHash == 'all' && oView.szLocale == 'ko_KR' && checkSimple("main", "notice")){
                            this.getMainNoticeSpeechBubble();
                        }
                    }
                    else
                    {
                        var szCateTitle = $('#all').attr('name');
                        $('#wideArea h2.title').html(szCateTitle);
                        $('#subCategory').html('');

                        if(oView.szLocale == "ko_KR" || oView.szLocale == "zh_TW" || oView.szLocale == "zh_CN" || oView.szLocale == "ja_JP") {
                            oView.getBroadList('action', 'all', 1);
                        }
                        else{
                            $('div.loading').hide();
                        }
                    }
                    break;
            }
        }
        , getTvCate : function(e) {
            if (oMainData.TV_CHANNEL_RESULT == 1)
            {
                var aTvChannel = [];
                var szTvCateNo = $(e).attr('cate_no');
                var nCateNo = '';

                aTvChannel.push('<div class="menu_tv" style="">');
                aTvChannel.push('   <h2 class="blind">하위 카테고리</h2>');
                aTvChannel.push('   <ul>');
                if(szLang=="")
                    aTvChannel.push('       <li cate_no="'+ szTvCateNo +'" class="on sub_cate_list"><a href="javascript:;"><img src="'+ RES_AFREECA_NONE_SCHEME +'/images/togethertv/channel_all.png" alt="전체채널"></a></li>');
                else
                    aTvChannel.push('       <li cate_no="'+ szTvCateNo +'" class="on sub_cate_list"><a href="javascript:;"><img src="'+ RES_AFREECA_NONE_SCHEME +'/images/togethertv/channel_all_'+szLang+'.png" alt="전체채널"></a></li>');

                $.each(oMainData.TV_CHANNEL_DATA, function(i, oChannel) {
                    nCateNo = 390000 + parseInt(oChannel.cp_idx, 10);
                    nCateNo = "00" + nCateNo;
                    aTvChannel.push('   <li cate_no="'+ nCateNo +'" class="sub_cate_list"><a href="javascript:;"><img src="'+ ADMIN_IMG +'/'+ oChannel.cp_url +'" alt="'+ oChannel.cp_desc +'"></a></li>');
                });
                aTvChannel.push('   </ul>');
                aTvChannel.push('</div>');

                $('#subCategory .menu_two').after(aTvChannel.join(''));
                oView.getBroadList('cate', szTvCateNo, 1);
            }
        }
        
        // 방송리스트 상단에 카테고리 생성
        , getTopCategory : function(szMenuIdx, szTarget) {
            var aChannel = [];
            var szCateNo = '';
            aSubCategory = oMainCategory.category_list;
            if(aSubCategory){
                aChannel.push('<ul class="category_ul">');
                nItemCount = 0;
                var bIsFirst = true;
                $.each(aSubCategory, function(i, oCate) {
                    if (oCate.parent_menu == szMenuIdx)
                    {
                        nItemCount++;
                        if(oCate.menu_type == 127){
                            aChannel.push('</ul><ul class="category_ul space_t">');
                            return;
                        }
                        var szLiClass = 'cate_list';
                        var szUlClass = '';
                        if(bIsFirst){
                            bIsFirst = false;
                            szLiClass += ' on';
                            szCateNo = oCate.action_content;
                        }
                        var Object = {CATE_NO: oCate.action_content
                                        , MENU_IDX : oCate.menu_idx
                                        , PARENT_IDX : oCate.parent_menu
                                        , MENU_ID : oCate.menu_id
                                        , MENU_TYPE : oCate.menu_type
                                        , ACTION_TYPE : oCate.action_type
                                        , LI_CLASS : szLiClass
                                        , CATE_NAME :oCate.menu_name };

                        if(oCate.action_type == 1 ){
                            szTemplate = $('#category_list_action').html();
                        }else{
                            szTemplate = $('#category_list').html();
                        }
                        var szContents = doT.template(szTemplate)(Object);
                        aChannel.push(szContents);
                    }
                });
                aChannel.push('</ul>');

                if(nItemCount > 0){
                    //전체 바디 만들어줌
                    var szTemplate = $('#category_list_body').html();
                    var Object = {LISTITEM: aChannel.join('')};
                    var szCateContents = doT.template(szTemplate)(Object);
                    $(szTarget).html(szCateContents);

                    return szCateNo;

                }
            }
            return false;

        }
        , getTopPosterCategory : function(szMenuIdx,szTextCateNo) {
            var aChannel = [];
            var szCateNo = '';

            if(oView.aGamePosterData.length > 0){
                aChannel.push('<ul id="gameSlider">');
                nItemCount = 0;
                var bIsFirst = true;


                $.each(oView.aGamePosterData, function(i, oCate) {
                    var szLiClass = 'cate_list';
                    var szUlClass = '';
                    var nActionType = 2;
                    var szThumbError = RES_AFREECA_NONE_SCHEME + '/images/afmain/img_game_poster.jpg';
                    if(oCate.cate_pc_img == "" ) szCategoryImg = szThumbError;
                    else szCategoryImg = ADMIN_IMG_NONE_SCHEME + "/" +  oCate.cate_pc_img;
                    var szCateName = '';
                    
                    switch(oView.szLocale){
                        case "en_US" : szCateName = oCate.cate_name_en_us;break;
                        case "ja_JP" : szCateName = oCate.cate_name_ja_jp;break;
                        case "zh_CN" : szCateName = oCate.cate_name_zh_cn;break;
                        case "zh_TW" : szCateName = oCate.cate_name_zh_tw; break;
                        case "th_TH" : szCateName = oCate.cate_name_th_th; break;
                        case "ko_KR" : 
                        default :
                            szCateName = oCate.cate_name;
                        break;
                    }   

                    // 연령제한
                    if( oCate.broad_cate_no == "adult" ) {
                        if( oCate.viewer == null ) return ; 
                        nActionType = 3;
                        szCategoryImg = RES_AFREECA_NONE_SCHEME +  '/images/afmain/img_gamecategory_adult.jpg';
                        oCate.broad_cate_no = szTextCateNo;
                        szCateName = $(".cate_list[action_type=3] a").first().text();  
                    }

                    var nViewer = oCate.viewer;
                    nViewer = nViewer.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

                    var Object = {CATE_NO: oCate.broad_cate_no
                                    , CATE_VIEWER : nViewer
                                        , CATE_PC_IMG : szCategoryImg
                                        , CATE_NAME : szCateName
                                        , CATE_IDX : nItemCount 
                                        , ACTION_TYPE : nActionType
                                        , THUMB_ERROR : szThumbError};
                    nItemCount++;   

                    szTemplate = $('#category_list_post').html();
                    var szContents = doT.template(szTemplate)(Object);
                     aChannel.push(szContents);
                });
                aChannel.push('</ul>');
                if(nItemCount > 0){
                    //전체 바디 만들어줌
                    var szTemplate = $('#category_list_post_body').html();
                    var Object = {LISTITEM: aChannel.join('')};
                    var szCateContents = doT.template(szTemplate)(Object);
                    $("#subCategory").before(szCateContents);
                    $("#gameScrollArea").mCustomScrollbar({
                        axis:"y",
                        theme:"minimal-dark",
                        scrollInertia:100,
                        scrollbarPosition:"inside",
                        callbacks:{
                             onUpdate: function(){
                                if( $("#gameToggle").attr("class") == "close"  && $("#gameSlider .active").closest('li').length > 0  ){
                                    setTimeout(function(){
                                        $("#gameScrollArea").mCustomScrollbar("scrollTo", $("#gameSlider .active").closest('li').position().top);
                                    },500);
                                }
                             }

                        }
                    });
                }
            }

            $("#gamePost").show();          //포스터 형식 노출
            oView.setPosterSlideOption();

            oView.oGameSlider = $("#gameSlider").bxSlider(oView.oSettingPoster);
            $(".bx-prev").attr("class","bx-prev disabled");
            
            $(window).on('resize',function() {
                var classname = $("#gamePost").attr("class");
                if(classname == "game_post_area") {
                    
                    var nDivWidth = $("#gamePost").width();
                    var prevMaxSlide = oView.oSettingPoster.maxSlides;
                    oView.setPosterSlideOption();
                    if( prevMaxSlide != oView.oSettingPoster.maxSlides) 
                            oView.oGameSlider.reloadSlider( oView.oSettingPoster );
                    oView.moveToPosterSlide();
                }
                return false;
            });

            

            //setTimeout(function() {             // 데이터 로딩 되는 시간 여유 두기 위함.
              $('#gameToggle').on('click', function() {
                    var classname = $(this).attr("class");
                        if(classname == "open") {
                            $(this).attr("class","close");
                            $("#gamePost").addClass("open_poster");             
                            oView.oGameSlider.destroySlider();
                            if( $("#gameSlider .active").closest('li').length > 0 ){
                                $("#gameScrollArea").mCustomScrollbar("scrollTo", $("#gameSlider .active").closest('li').position().top);
                            }
                        }
                        if (classname == "close") {
                            $(this).attr("class","open");
                            $("#gamePost").removeClass("open_poster");
                            oView.setPosterSlideOption();

                            oView.oGameSlider.reloadSlider(oView.oSettingPoster);  
                            oView.moveToPosterSlide();
                        }
                        return false;
                });
            //}, 500);

                
            
            $(document).on('click', '#gameSlider > li > a', function(){
                $("#gameSlider li a").removeClass("active");
                $(this).addClass("active");
                // 접기
                if( $("#gameToggle").hasClass("open") == false ){
                    $("#gameToggle").attr("class","open");
                    $("#gamePost").removeClass("open_poster");
                    oView.setPosterSlideOption();
                    oView.oGameSlider.reloadSlider(oView.oSettingPoster);
                    oView.moveToPosterSlide();
                }
            });
            
            $(document).on('click', '.tit_area_g .view_option li:first', function(){
                $(".view_option li").removeClass("on");
                $(this).addClass("on");
                $("#subCategory").hide();
                $("#gamePost").show();

                if($("#gamePost").attr("class") == "game_post_area") 
                {    
                    oView.setPosterSlideOption();
                    oView.oGameSlider.reloadSlider(oView.oSettingPoster);
                }

                if( $("#gameSlider a").hasClass("active") == false ){
                    oView.getBroadList('cate', szTextCateNo , 1,$("#gameSlider .active").attr("action_type"));
                }else {
                    if($("#gamePost").attr("class") == "game_post_area") oView.moveToPosterSlide();
                    oView.getBroadList('cate', $("#gameSlider .active").attr("cate_no") , 1, $("#gameSlider .active").attr("action_type"));
                }

                return false;
            });

            $(document).on('click', '.tit_area_g .view_option li:last', function(){
                $(".view_option li").removeClass("on");
                $(this).addClass("on");        
                $("#gamePost").hide();
                $("#subCategory").show();
                oView.getBroadList('cate', $(".cate_list.on").attr("cate_no") , 1, $(".cate_list.on").attr("action_type"));
                return false;
            });
            return false;
        }
        , setPosterSlideOption : function() {
            var nDivWidth = $("#gamePost").width();
            
            if(nDivWidth <= ((oView.oSettingGame.slideWidth + oView.oSettingGame.slideMargin) * oView.oSettingPosterOne.minSlides)) {
                oView.oSettingPoster = $.extend({}, oView.oSettingPosterOne, oView.oSettingGame);
            } else if(nDivWidth >= ((oView.oSettingGame.slideWidth + oView.oSettingGame.slideMargin) * oView.oSettingPosterFour.maxSlides - oView.oSettingGame.slideMargin)) {
                oView.oSettingPoster = $.extend({}, oView.oSettingPosterFour, oView.oSettingGame);
            } else {
                var SlideCnt = Math.floor(nDivWidth / (oView.oSettingGame.slideWidth + oView.oSettingGame.slideMargin));
                oView.oSettingPoster = $.extend({}, {minSlides: SlideCnt , maxSlides: SlideCnt}, oView.oSettingGame);                        
            }
        } 
        , moveToPosterSlide : function (obj) {
            if( $("#gameSlider .active").length > 0 ) {
                var currentIndex = $("#gameSlider .active").closest('li').index() + 1;
                var Slide = Math.ceil(currentIndex/oView.oSettingPoster.maxSlides)-1;
                oView.oGameSlider.goToSlide(Slide);
            }
        }
        , getGameCategoryRanking : function() {
            if (oView.aGameRankingData.length > 0) {
                var szHtml = '';
                
                szHtml += '<div class="rank_area">';
                szHtml += '    <div class="rolling_area">';
                szHtml += '        <ul data-idx="0">';
                szHtml += '        <li class="top">';
                szHtml += '        </li>';
                szHtml += '        </ul>';
                szHtml += '    </div>';
                szHtml += '    <div class="rank_box" style="display:none">';
                szHtml += '        <h3>종합 게임 랭킹</h3>';
                szHtml += '        <div class="tit_area">';
                szHtml += '            <span class="t1">순위</span>';
                szHtml += '            <span class="t2">게임 카테고리</span>';
                szHtml += '            <span class="t3">점유율</span>';
                szHtml += '        </div>';
                szHtml += '        <ul>';

                $.each(oView.aGameRankingData, function(i, oData) {
                    if (i == 0) {
                        szHtml += '<li class="top active">';
                    } else if (i > 0 && i < 3) {
                        szHtml += '<li class="top">';
                    } else {
                        szHtml += '<li>';
                    }

                    szHtml += '<a href="javascript:;" style="text-decoration: none; cursor:default">';
                    szHtml += '<em class="num">' + (i + 1) + '</em>';

                    if (oData.diff > 0) {
                        szHtml += '<span class="rup">' + Math.abs(oData.diff);
                    } else if (oData.diff < 0) {
                        szHtml += '<span class="rdown">' + Math.abs(oData.diff);
                    } else {
                        szHtml += '<span class="same">';
                    }

                    szHtml += '</span>' + oData.cate_name + '<span class="share">' + oData.total_score + '%</span></a></li>';
                });

                szHtml += '        </ul>						';
                szHtml += '        <div class="more_v"><a href="//gameranking.afreecatv.com">더보기</a></div>';
                szHtml += '    </div>';
                szHtml += '</div>';
                
                $('.tit_area_g').append(szHtml);

                $('.rank_area .rolling_area ul li').html($('.rank_box ul li').eq(0).html());
                // 롤링 로직 및 마우스 커서 이벤트
                $(document).ready(function() {
                    // 노출 항목 2개 이상인 경우에 적용
                    if ($('.rank_box ul li').length > 1) {
                        oView.setGameRankingInterval();
                    }
                });
    
                $('.rank_area').hover(function() {
                    $(this).find('.rank_box').stop(true, true).show();
                    clearInterval(oGameRankingInterval);
                }, function() {
                    $(this).find('.rank_box').stop(true, true).hide();
                    oView.setGameRankingInterval();
                });

                oView.getBroadList('cate', $(this).attr('cate_no'), 1, $(this).attr('action_type'));
            }

        }
        // 공지사항 롤링 인터벌 동작
        , setGameRankingInterval : function() {
            var nTime = 2500; // 3.5초 주기
            
            oGameRankingInterval = setInterval(function() {
                var nRankIdx = $('.rank_area .rolling_area ul').data('idx');
                var nRankSize = $('.rank_box ul li').length;

                if (nRankIdx == nRankSize) {
                    nRankIdx = 0;
                }

                $('.rank_area .rolling_area ul li').html($('.rank_box ul li').eq(nRankIdx).html());
                $('.rank_box ul li').removeClass('active');
                $('.rank_box ul li').eq(nRankIdx).addClass('active');

                if (nRankIdx >= 0 && nRankIdx < 3) {
                    $('.rank_area .rolling_area ul li').addClass('top');
                } else {
                    $('.rank_area .rolling_area ul li').removeClass('top');
                }

                $('.rank_area .rolling_area ul').data('idx', nRankIdx + 1);
            }, nTime);
        }
        ,makeSubCategoryTemplate : function(aSubCategory, szMenuIdx, oBodyTemplate, oTarget){
            aChannel = [];
            var bIsFirst = true;
            $.each(aSubCategory, function(i, oCateItem) {
                szLiClass = 'sub_cate_list';
                if(oCateItem.parent_menu == szMenuIdx ){
                    if(bIsFirst){
                        bIsFirst = false;
                        szLiClass += ' on';
                        szSubCateNo = oCateItem.action_content;
                    }
                    var Object = {CATE_NO: oCateItem.action_content
                                    , MENU_IDX : oCateItem.menu_idx
                                    , MENU_ID : oCateItem.menu_id
                                    , MENU_TYPE : oCateItem.menu_type
                                    , ACTION_TYPE : oCateItem.action_type
                                    , LI_CLASS : szLiClass
                                    , CATE_NAME :oCateItem.menu_name };
                    var oTemplate = $('#category_list').html();
                    var szContents = doT.template(oTemplate)(Object);
                    aChannel.push(szContents);
                }
            });
            var Object = {LISTITEM: aChannel.join('') };
            var szContents = doT.template(oBodyTemplate)(Object);
            $('#subCategory div.menu_thr').remove();
            oTarget.after(szContents);

            return szSubCateNo;
        }
        // 하위의 세부 카테고리 설정
        ,getSubCategory : function(e){

            var szMenuIdx = $(e).attr('menu_idx');
            var szMenuId = $(e).attr('menu_id');
            var szActionType = $(e).attr('action_type');
            var aSubChannel = [];
            var szSubCateNo = '';
            var aSubCategory = oMainCategory.category_list;

            // 지상파 케이블
            if(szMenuId ==  'tv' ){
                oView.getTvCate(e);
                return;
            }

            switch($(e).attr('menu_type')){
                // 세부 카테고리가 일반형인경우
                case '1':
                case '3':
                    var oBodyTemplate = $('#sub_category_list_body').html();
                    var oTarget = $('#subCategory .category_ul');
                    szSubCateNo = oView.makeSubCategoryTemplate(aSubCategory, szMenuIdx, oBodyTemplate, oTarget);
                    break;

                // 세부 카테고리가 탭형인경우(ex 스포츠)
                case '4':
                case '8':
                    var oBodyTemplate = $('#tab_category_list_body').html();
                    var oTarget = $('#subCategory div.menu_two');
                    szSubCateNo = oView.makeSubCategoryTemplate(aSubCategory, szMenuIdx, oBodyTemplate, oTarget);
                    break;
                default:
                    szSubCateNo = $(e).attr('cate_no');
                    // 하위카테고리가 없는경우
                    break;
                }
            oView.getBroadList('cate' , szSubCateNo, 1 , szActionType);
        }
        , getGameCategoryData : function() {
            $.ajaxSettings.traditional = true;
                        $.ajax({
                            type : "GET"
                            , url : AFREECA_NONE_SCHEME  + '/main/main_gamecategory_viewer.js'
                            , async : false
                            , dataType : 'json'
                            , jsonp : 'callback'
                            , beforeSend : function(request) {
                                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                            }
                            , success : function(response) {
                                if(response.RESULT == 1) {    
                                   oView.aGamePosterData = response.DATA;
                                   if(oView.aGamePosterData.length <= 0 ) {
                                        oView.aGamePosterData = [];
                                   }
                                }
                                else {
                                    // 썸네일을 없애버려..
                                    oView.aGamePosterData = [];
                                }
                            }
                            , error : function(xhr, ajaxOptions, thrownError) {
                                oView.aGamePosterData = [];
                                //oView.getMainData();
                            }
                    });
        }
        , getGameRankingData : function() {
            $.ajaxSettings.traditional = true;
                        $.ajax({
                            type : "GET"
                            , url : AFREECA_NONE_SCHEME  + '/main/main_gameranking.js'
                            , async : false
                            , dataType : 'json'
                            , jsonp : 'callback'
                            , beforeSend : function(request) {
                                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                            }
                            , success : function(response) {
                                if(response.RESULT == 1) {    
                                   oView.aGameRankingData = response.DATA;
                                   if(oView.aGameRankingData.length <= 0 ) {
                                        oView.aGameRankingData = [];
                                   }
                                }
                                else {
                                    // 썸네일을 없애버려..
                                    oView.aGameRankingData = [];
                                }
                            }
                            , error : function(xhr, ajaxOptions, thrownError) {
                                oView.aGameRankingData = [];
                                //oView.getMainData();
                            }
                    });
        }
        , getBroadContents : function(oObj) {

            var szToggleHtml = $('#titleToggle').text() + '<em></em>';
            // 배너 호출
            oView.getCateBanner(oObj.attr('id'));
            $('#titleToggle').html(szToggleHtml);
            var szMenuType = $('#'+ oObj.attr('id')).attr('menu_type');
            var szMenuIdx = $('#'+ oObj.attr('id')).attr('menu_idx');
            var szActionType = $('#'+ oObj.attr('id')).attr('action_type');

            aSubCategory = oMainCategory.category_list;
            // 메뉴 타입이 그룹/포스터 형식(5,7) && 게임카테고리 && 한국일 경우 
            if((szMenuType == '5' || szMenuType == '7') && _szCurHash == "game" && oView.szLocale == 'ko_KR'){
                oView.getGameCategoryData();        // 포스터 형식의 데이터 가져오기
                oView.getGameRankingData();        // 일일 게임 랭킹 데이터 가져오기
            }

            //하위 카테고리가 있음
            if(szMenuType == '8' || ((szMenuType == '5' || szMenuType == '7') && oView.aGamePosterData.length <= 0 )){
                if(_szCurHash == "game" && oView.szLocale == 'ko_KR'  && oView.aGamePosterData.length <= 0 ){
                    $(".tit_area_g").attr("class", "tit_area");
                    $(".tit_area .view_option").remove();
                    var szCateTitle = $('#'+ _szCurHash).attr('name');
                    $('#wideArea h2.title').html('<a href="javascript:;" id="titleToggle" class="on">'+ szCateTitle +'<em></em></a>');
                }

                szCateNo = oView.getTopCategory(szMenuIdx ,'#subCategory');
                var menu_id = $('.category_ul .cate_list.on').attr('menu_id');
                //배너 호출
                if(menu_id != ''){ oView.getCateBanner(menu_id); }

                oView.getBroadList('cate', szCateNo, 1);

                // 하위 카테고리 클릭이벤트 설정
                $('#subCategory').off('click').on('click', 'div li', function() {
                    var szSubCateNo;
                    // 성인인증 카테고리
                    if ($(this).attr('action_type') == '3') {
                        oView.checkIsAdultUser();
                    }
                    if( $(this).hasClass('sub_cate_list') ){
                        $('#subCategory div li.sub_cate_list').removeClass('on');
                        $(this).addClass('on');
                    }else{
                        $('#subCategory div.menu_two li').removeClass('on');
                        $(this).addClass('on');
                        $('#subCategory .sub_cate').remove();
                        $('#subCategory .menu_thr').remove();
                        $('#subCategory .menu_tv').remove();

                        // 카테고리/섹션 배너 노출
                        if( $(this).attr('menu_id') == ''){
                            oView.getCateBanner(oObj.attr('id'));
                        }else{
                            oView.getCateBanner($(this).attr('menu_id'));
                        }
                        oView.getSubCategory(this);
                        return;

                    }
                    oView.getBroadList('cate', $(this).attr('cate_no'), 1);
                // 카테고리 클릭이벤트 종료
                });
            }
            else if(szMenuType == '5' || szMenuType == '7'){      // 포스터&그룹일 경우
                
                // 데이터가 있을 경우
                if(oView.aGamePosterData.length > 0 )  {
                    // 포스터형일 경우
                    $(".view_option").show();
                    $("#subCategory").hide();       //텍스트 형식 숨김
                    szTextCateNo = oView.getTopCategory(szMenuIdx ,'#subCategory'); // 텍스트 형식 출력
                    oView.getTopPosterCategory(szMenuIdx,szTextCateNo);     // 포스터 형식 출력
                    var menu_id = $('.category_ul .cate_list.on').attr('menu_id');     
                    //배너 호출
                    if(menu_id != ''){ oView.getCateBanner(menu_id); }

                    // 게임 랭킹
                    oView.getGameCategoryRanking();
                    
                    // 텍스트 형식 경우 하위 카테고리 클릭이벤트 설정
                    $('#subCategory').off('click').on('click', 'div li', function() {
                        var szSubCateNo;
                            // 성인인증 카테고리
                        if ($(this).attr('action_type') == '3') {
                            oView.checkIsAdultUser();
                        }
                        if( $(this).hasClass('sub_cate_list') ){
                            $('#subCategory div li.sub_cate_list').removeClass('on');
                            $(this).addClass('on');
                        }else{
                            $('#subCategory div.menu_two li').removeClass('on');
                            $(this).addClass('on');
                            $('#subCategory .sub_cate').remove();
                            $('#subCategory .menu_thr').remove();
                            $('#subCategory .menu_tv').remove();

                            // 카테고리/섹션 배너 노출
                            if( $(this).attr('menu_id') == ''){
                                oView.getCateBanner(oObj.attr('id'));
                            }else{
                                oView.getCateBanner($(this).attr('menu_id'));
                            }
                            oView.getSubCategory(this);
                            return;

                        }
                        oView.getBroadList('cate', $(this).attr('cate_no'), 1);
                        // 카테고리 클릭이벤트 종료
                    });

                    // 포스터 형식 하위 카테고리 클릭이벤트 설정
                    $('#gamePost').off('click').on('click', 'div li a', function() {
                        if ($(this).attr('action_type') == '3') {
                            oView.checkIsAdultUser();
                        }

                        oView.getBroadList('cate', $(this).attr('cate_no'), 1, $(this).attr('action_type'));
                        
                        // 카테고리 클릭이벤트 종료
                    });
                    // 포스터 슬라이드 
                    oView.getBroadList('cate', szTextCateNo, 1); // 첫 포스터 형식 카테고리 방송 리스트 가져오기
                }
            }
            //하위 카테고리가 없는경우
            else{
                oView.getBroadList('action', _szCurHash, 1);
            }
        }
        , checkIsAdultUser : function (){
            szLogoutUrl = AFREECA_NONE_SCHEME;
            requirejs(['service/plugins/player', 'service/plugins/member'], function(player, member) {
                if (atv.isLogin())
                {
                    atv.member.getRealName(function(oRes) {
                        var oData = oRes.CHANNEL[0];
                        if (oData.RESULT != '200' ) {
                            var Object ={};
                            var szMessage = doT.template($("#message_alert_age_chk_fail").html())(Object);
                            alert(szMessage);
                            location.href = AFREECA_NONE_SCHEME;
                            return false;
                        }
                        else {
                            if(oData.ADULTCHK != 1) {
                                if(oData.NATIONALITY == '410') {
                                    if(oData.NAMECHK == '1') {
                                        if(atv.getCookie('AfreecaAdultCheckedPass') != "ok") {
                                            var pop = window.open(MEMBER_8111 + '/app/pop_verify_adult.php', "adult_check", "width=540,height=470,scrollbars=no,resizable=no,status=no,menubar=no,toolbar=no");
                                            pop.focus();
                                            location.href = AFREECA_NONE_SCHEME;
                                        }
                                    }
                                    else {
                                        var pop = window.open(MEMBER_8111 + '/app/uname_check.php', "name_check", "width=532,height=509,top=0,left=0,scrollbars=no,resizable=no,status=no,menubar=no,toolbar=no");
                                        pop.focus();
                                        location.href = AFREECA_NONE_SCHEME;
                                        return false;
                                    }
                                }
                                else {
                                    //해외계정 미성년 안내 메세지
                                    alert($('#message_alert_age_limit').html());
                                    location.href = AFREECA_NONE_SCHEME;
                                    return false;
                                }
                            }
                            else {
                                return true;
                            }
                        }
                    });
                }
                else {
                    atv.goLogin(AFREECA_NONE_SCHEME + '/?hash='+_szCurHash,'adult');
                }
            });
        }
        , getBroadList : function(selectType, selectValue, nPage, szActionType) {
            if (selectType == 'action' && selectValue == 'all' && _orderType == 'view_cnt' && nPage == '1' && typeof(aBroadList) != 'undefined' && typeof(bBroadListSwitch) == "undefined") {
                // PC 방송 리스트 조회 시 static.file 내 데이터가 있고 전체 1페이지 일 경우 이미 가져온 데이터로 처리
                $('div.loading').hide();
                bBroadListSwitch = true;
                oView.showBroadList(selectType, selectValue, nPage, aBroadList , szActionType);
            } else {
                $.ajaxSettings.traditional = true;
                $.ajax({
                    type : "GET"
                    , url : LIVE_NONE_SCHEME + '/api/main_broad_list_api.php'
                    , data : {
                        selectType : selectType
                        , selectValue : selectValue
                        , orderType : _orderType
                        , pageNo : nPage
                        , lang : szLang
                        , szActionType : szActionType
                    }
                    , async : false
                    , dataType : 'jsonp'
                    , jsonp : 'callback'
                    , beforeSend : function(request) {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    }
                    , success : function(response) {
                        $('div.loading').hide();
                        oView.showBroadList(selectType, selectValue, nPage, response , szActionType);
                    }
                    , error : function(xhr, ajaxOptions, thrownError) {
                        $('div.loading').hide();
                        $('div.reloading').show();

                        $('div.reloading button.icon').click(function() {
                            $('div.reloading').hide();
                            $('div.loading').show();
                            oView.getBroadList(selectType, selectValue, nPage);
                        });
                    }
                });
            }
        }
        , showBroadList : function(selectType, selectValue, nPage, oRes , szActionType) {
            var aBroadHtml = [];

            var nTotalCnt = oRes.total_cnt;
            var nTotalPage = Math.ceil(oRes.total_cnt / 60);
            
            var mainCate = $('#subCategory').find('li.cate_list.on').attr('menu_idx');
            var subCate = $('#subCategory').find('li.sub_cate_list.on').attr('menu_idx') ? $('#subCategory').find('li.sub_cate_list.on').attr('menu_idx') : $('#subCategory').find('li.sub_cate_list.on').attr('cate_no');

            if (nTotalCnt > 0)
            {
                $.each(oRes, function(i, oBroadList) {
                    $(oBroadList).each(function(j, oBroad) {
                        if (oBroad.broad_no != undefined)
                        {
                            var szEtcData = 'watch_type=live&bj_id=' + oBroad.user_id + '&broad_no=' + oBroad.broad_no +
                                            'category_no=' + oBroad.broad_cate_no + '&bps='+ oBroad.broad_bps + '&resolution=' + oBroad.broad_resolution;
                            //var szClick = 'oAnalysisUtil.setClickLog(\'main_00000003\',\'' + szEtcData + '\'); ';     //잘못된 code_type 이 전송되고 있어서 임시 제거
                            var arrInflowPath = [];
                            if(selectType == 'action' && selectValue == 'all') {
                                arrInflowPath = ['main', 'list', 'total'];    
                            } else {                                
                                arrInflowPath = ['page_hash', _szCurHash];
                                if(typeof(mainCate) != 'undefined' && mainCate != '') arrInflowPath.push(mainCate);
                                if(typeof(subCate) != 'undefined' && subCate != '') arrInflowPath.push(subCate);
                            }                            
                            var szClick = ' oAnalysisUtil.sendLiveInflowLog(\'' + oBroad.user_id + '\',' + oBroad.broad_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';

                            var szViewUrl = PLAY_80 + '/' + oBroad.user_id + '/' + oBroad.broad_no;
                            var szThumb = oBroad.broad_thumb;
                            var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                            var szBroadBps = oBroad.broad_bps;
                            var szBroadNo = oBroad.broad_no;
                            var szBroadStart = oBroad.broad_start;
                            var szBroadTitle = oBroad.broad_title;
                            var szViewTotal = atv.toMoneyFormat(oBroad.total_view_cnt);
                            var szViewPc = atv.toMoneyFormat(oBroad.pc_view_cnt);
                            var szViewMobile = atv.toMoneyFormat(oBroad.mobile_view_cnt);
                            var szUserId = oBroad.user_id;
                            var szUserNick = oBroad.user_nick;
                            var nResolution = undefined;
                            var nVisitBroadType = oBroad.visit_broad_type;
                            var nBroadType = oBroad.broad_type;

                            try {
                                nResolution = oBroad.broad_resolution.split('x')[1];
                            } catch(e) {
                                nResolution = undefined;
                            }

                            var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClick, BROAD_NO: szBroadNo, THUMB: szThumb, THUMB_ERROR: szThumbError, GRADE: szBroadBps, TIME: szBroadStart, SUBJECT: szBroadTitle,
                                TOTAL_VIEW: szViewTotal, PC_VIEW: szViewPc, MOBILE_VIEW: szViewMobile, CLICK_FNC: szClick, USER_ID: szUserId, USER_NICK: szUserNick, RESOLUTION: nResolution, VISIT_BROAD: nVisitBroadType, BROAD_TYPE: nBroadType};

                            var szTemplate = $('#tpl_live_list').html();
                            var szContents = doT.template(szTemplate)(Object);

                            aBroadHtml.push(szContents);
                        }
                    });
                });

                $('div.more_list').hide();

                if(nPage < nTotalPage)
                {
                    $('div.more_list').show();
                }

                $('div.nt_area').hide();

                if(_szCurHash == 'all')
                {
                    $('#broad_sv_area').hide();
                    $('#all_btn_reload').show();
                }
                else
                {
                    $('#broad_sv_area').show();
                }

                if (nPage == 1)
                {
                    $('#broadlist_area div.listarea ul').html(aBroadHtml.join(''));
                }
                else
                {
                    $('#broadlist_area div.listarea ul').append(aBroadHtml.join(''));
                }

                $('#broadlist_area').off('click').on('click', 'div.more_list a', function() {
                    _nPage = nPage + 1;
                    oView.getBroadList(selectType, selectValue, _nPage, szActionType);
                });

                $('#broad_sv_area ul.tab_list li').off('click').on('click', function() {
                    $('#broad_sv_area ul.tab_list li').removeClass('on');
                    $(this).addClass('on');

                    switch($(this).attr('role'))
                    {
                        case "view_cnt":
                            _orderType = "view_cnt";
                            break;

                        case "broad_start":
                            _orderType = "broad_start";
                            break;

                        case "rank":
                            _orderType = "rank";
                            break;

                        default:
                            break;
                    }

                    _nPage = 1;
                    oView.getBroadList(selectType, selectValue, _nPage, szActionType);
                });

                $('button.btn_reload').off('click').on('click', function(e){
                    e.preventDefault();
                    oView.getBroadList(selectType, selectValue, 1, szActionType);
                    //document.location.reload();
                });
            }
            else
            {
                var szTemplate = $('#message_broad_cast_none').html();
                $('div.nt_area').html(szTemplate);

                $('#broadlist_area div.listarea ul').html('');
                $('#fav_offair_area').html('');
                $('#broad_sv_area').hide();
                $('div.loading').hide();
                $('div.more_list').hide();
                $('div.nt_area').show();
            }
            //중국어 번역
            //translation.init();
        }
        , getMainNoticeSpeechBubble : function() {
            var nTotal = afreeca_notice_item_sort.length;
            var szContents = '';
            var szNoticeUrl = AFWBBS1_NONE_SCHEME + '/app/index.php?board=notice';
            var Object;

            // 메인노출 Y가 없는 경우 소통센터 > 알려드립니다 최근 5개 게시물 제목, 번호로 노출
            // 롤링 적용을 위해 템플릿을 나누어서 처리 (공지 리스트 템플릿 처리 부분)
            if (afreeca_notice_item_speech_bubble_yn.indexOf("Y") == -1) {
                $.ajaxSettings.traditional = true;
                $.ajax({
                    type: 'GET'
                    , url: AFWBBS1_NONE_SCHEME + '/app/api/get_notice_list.php'
                    , dataType: 'jsonp'
                    , jsonp : 'callback'
                    , data: {
                        'count': 5
                    }
                    , async: false
                    , success: function(oResult) {
                        if (oResult.RESULT != 1) {
                            return;
                        }

                        var aList = oResult.LIST;

                        if (aList.length > 0) {
                            $.each(aList, function(idx, item){
                                Object = {
                                    NOTICE_URL :  szNoticeUrl
                                    , SUBJECT :  getByteLength(item.item_title, 100)
                                    , LINK_URL:  AFWBBS1_NONE_SCHEME + "/app/index.php?board=notice&b_no=" + item.item_no + "&control=view"
                                };
                                var szTemplate = $('#tpl_notice_speech_bubble_list').html();
                                szContents += doT.template(szTemplate)(Object);
                            });
                        }
                        
                        // ajax jsonp 로 호출시 함수 호출하는 부분으로 하면 에러 남
                        if (szContents) {
                            // 롤링 적용을 위해 템플릿을 나누어서 처리 (공지 div 클래스 부분 템플릿)
                            Object = {BUBBLE_LIST: szContents}; // 공지 리스트 템플릿 출력 값
                            var szTemplate = $('#tpl_notice_speech_bubble').html();
                            var szBubble = doT.template(szTemplate)(Object);
                            $('.bjissue_banner').after(szBubble);

                            // 롤링 로직 및 마우스 커서 이벤트
                            $(document).ready(function() {
                                // 노출 항목 2개 이상인 경우에 적용
                                if ($('.notice_area dl').length > 1) {
                                    $('.notice_area dl:eq(0)').addClass('on');

                                    oView.setMainNoticeSpeechBubbleInterval();

                                    $('.notice_area dl').on('mouseover', function() {
                                        clearInterval(oIntervalFn);
                                    });

                                    $('.notice_area dl').on('mouseleave', function() {
                                        oView.setMainNoticeSpeechBubbleInterval();
                                    });
                                }
                            });
                        }
                    }
                    , error: function(error) {
                        return;
                    }
                });
            } else {
                for (var i = 0; i < nTotal; i++)
                {
                    if (afreeca_notice_item_sort[i] == undefined) {
                        return;
                    }

                    if (afreeca_notice_item_speech_bubble_yn[afreeca_notice_item_sort[i]] == "Y" )
                    {
                        var szNoticeList = afreeca_notice_item_description[afreeca_notice_item_sort[i]];
                        Object = {
                            NOTICE_URL :  szNoticeUrl
                            , SUBJECT :  getByteLength(szNoticeList, 100)
                            , LINK_URL:  afreeca_notice_item_link_url[afreeca_notice_item_sort[i]]
                        };
                        var szTemplate = $('#tpl_notice_speech_bubble_list').html();
                        szContents += doT.template(szTemplate)(Object);
                    }
                }
                
                if (szContents) {
                    // 롤링 적용을 위해 템플릿을 나누어서 처리 (공지 div 클래스 부분 템플릿)
                    Object = {BUBBLE_LIST: szContents}; // 공지 리스트 템플릿 출력 값
                    var szTemplate = $('#tpl_notice_speech_bubble').html();
                    var szBubble = doT.template(szTemplate)(Object);
                    $('.bjissue_banner').after(szBubble);

                    // 롤링 로직 및 마우스 커서 이벤트
                    $(document).ready(function() {
                        // 노출 항목 2개 이상인 경우에 적용
                        if ($('.notice_area dl').length > 1) {
                            $('.notice_area dl:eq(0)').addClass('on');

                            oView.setMainNoticeSpeechBubbleInterval();

                            $('.notice_area dl').on('mouseover', function() {
                                clearInterval(oIntervalFn);
                            });

                            $('.notice_area dl').on('mouseleave', function() {
                                oView.setMainNoticeSpeechBubbleInterval();
                            });
                        }
                    });
                }
            }
        }
        // 공지사항 롤링 인터벌 동작
        , setMainNoticeSpeechBubbleInterval : function() {
            var nTime = 3500; // 3.5초 주기

            oIntervalFn = setInterval(function() {
                var nNoticeIdx = $('.notice_area').find('.on').index() + 1;
                var nNoticeSize = $('.notice_area dl').size();

                $('.notice_area dl').removeClass('on');

                if (nNoticeIdx == nNoticeSize) {
                    nNoticeIdx = 0;
                }

                $('.notice_area dl').eq(nNoticeIdx).addClass('on');

                $('.notice_area dl.on').show();
                $('.notice_area dl').not('.on').hide();
            }, nTime);
        }
        // 해시태그 리스트
        , showHashTagList : function(szType, szHashTag, nCurrentPage, oRes, isAppend) {
            $('div.loading').hide();
            $('div.nt_area').hide();
            $('#hashtagLive_nt_area').hide();
            $('#hashtagVod_nt_area').hide();
            $('#hashtagVod_sv_area').hide();
            $('#hashtagLive_sv_area').hide();
            $('#hashtaglist_area').hide();
            $('#hashtagAll_list_area').hide();
            $('#more_list').parent().show();

            switch (szType) {
                case 'LIVE':
                    var nTotalCnt = Number(oRes.LIVE.length);
                    if (nTotalCnt <= 0) {
                        var szTemplate = $('#message_broad_cast_none').html();
                        $('div.nt_area').html(szTemplate);
                        $('#hashtaglist_area div.listarea ul').html('');
                        $('#more_list').parent().hide();
                        $('div.nt_area').show();
                    }
                    else {
                        var aLiveHtml = [];
                        aLiveHtml = oView.showHashTagLiveList(oRes.LIVE, szHashTag, nCurrentPage, 'hash_live');

                        if ( oRes.LIVE.length > 0 ) {
                            $('#more_list').data('page', nCurrentPage + 1);

                            if ( oRes.LIVE.length < 60 ) {
                                $('#more_list').parent().hide();
                            }
                        }
                        else {
                            $('#more_list').parent().hide();
                        }

                        if (isAppend) {
                            $('#hashtaglist_area div.listarea ul').append(aLiveHtml.join(''));
                        }
                        else {
                            $('#hashtaglist_area div.listarea ul').html(aLiveHtml.join(''));
                        }

                        $('#hashtagLive_sv_area').show();
                        $('#hashtaglist_area').show();
                    }
                break;
                case 'VOD':
                    var nTotalCnt = Number(oRes.VOD.length);
                    if (nTotalCnt <= 0) {
                        var szTemplate = $('#message_hashtag_vod_none').html();
                        $('div.nt_area').html(szTemplate);

                        $('#hashtaglist_area div.listarea ul').html('');
                        $('#more_list').parent().hide();
                        $('div.nt_area').show();
                    }
                    else {
                        var aVodHtml = [];
                        aVodHtml = oView.showHashTagVodList(oRes.VOD, szHashTag, nCurrentPage, 'hash_vod');

                        if ( oRes.VOD.length > 0 ) {
                            $('#more_list').data('page', nCurrentPage + 1);
                            // $('#more_list').show();

                            if ( oRes.VOD.length < 60 ) {
                                $('#more_list').parent().hide();
                            }
                        }
                        else {
                            $('#more_list').parent().hide();
                        }

                        if (isAppend) {
                            $('#hashtaglist_area div.listarea ul').append(aVodHtml.join(''));
                        }
                        else {
                            $('#hashtaglist_area div.listarea ul').html(aVodHtml.join(''));
                        }

                        $('#hashtagVod_sv_area').show();
                        $('#hashtaglist_area').show();
                    }
                break;
                // 전체
                default:
                    var nLiveTotalCnt = Number(oRes.LIVE.length);
                    var nVodTotalCnt = Number(oRes.VOD.length);

                    if (nLiveTotalCnt <= 0) {
                        var szTemplate = $('#message_broad_cast_none').html();
                        $('#hashtagLive_nt_area').html(szTemplate);

                        $('#hashtagAll_list_area div.hashtagAll_live ul').html('');
                        $('#more_list').parent().hide();
                        $('#hashtagLive_more').hide();
                        $('#hashtagLive_nt_area').show();
                    }
                    else {
                        var aLiveHtml = [];
                        aLiveHtml = oView.showHashTagLiveList(oRes.LIVE, szHashTag, nCurrentPage, 'hash_all');
                        $('#hashtagAll_list_area div#hashtagAll_live ul').html(aLiveHtml.join(''));
                    }
                    if (nVodTotalCnt <= 0) {
                        var szTemplate = $('#message_hashtag_vod_none').html();
                        $('#hashtagVod_nt_area').html(szTemplate);

                        $('#hashtagAll_list_area div#hashtagAll_vod ul').html('');
                        $('#more_list').parent().hide();
                        $('#hashtagVod_more').hide();
                        $('#hashtagVod_nt_area').show();
                    }
                    else {
                        var aVodHtml = [];
                        aVodHtml = oView.showHashTagVodList(oRes.VOD, szHashTag, nCurrentPage, 'hash_all');
                        $('#hashtagAll_list_area div#hashtagAll_vod ul').html(aVodHtml.join(''));
                    }

                    $('#hashtagAll_list_area').show();
               break;
            }
            //중국어 번역
            //translation.init();
        }
        // 라이브 해시태그 리스트
        , showHashTagLiveList : function(oData, szHashTag, nCurrentPage, szClickType) {
            var aBroadHtml = [];
            $.each(oData, function(i, oLiveData) {
                if (oLiveData.broad_no != undefined) {
                    var szCallStatistics = "afreeca.front.statistics.setHashtagParam('"+szHashTag+"','"+szClickType+"','all','"+oLiveData.user_id+"','"+oLiveData.broad_no+"','"+null+"','"+nCurrentPage+"');";
                    var arrInflowPath = ['main', 'hashtag', (szClickType=='hash_all' ? 'total' : 'live'), encodeURIComponent(szHashTag)];    
                    szCallStatistics += ' oAnalysisUtil.sendLiveInflowLog(\'' + oLiveData.user_id + '\',' + oLiveData.broad_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ', null, -1);';

                    var szViewUrl = PLAY_80 + '/' + oLiveData.user_id + '/' + oLiveData.broad_no;
                    var szThumb = LIVEIMG_9090 + '/'+ oLiveData.broad_no +'_240x135.gif?'+ Math.floor((Math.random() * 10) + 1);
                    var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                    var szBroadBps = oLiveData.broad_bps;
                    var szBroadNo = oLiveData.broad_no;
                    var szBroadStart = oLiveData.broad_start;
                    var szBroadTitle = oLiveData.broad_title;
                    var szViewTotal = atv.toMoneyFormat(oLiveData.total_view_cnt);
                    var szViewPc = atv.toMoneyFormat(oLiveData.pc_view_cnt);
                    var szViewMobile = atv.toMoneyFormat(oLiveData.mobile_view_cnt);
                    var szUserId = oLiveData.user_id;
                    var szUserNick = oLiveData.user_nick;
                    var nResolution = undefined;
                    var nVisitBroadType = undefined; // oLiveData.visit_broad_type; //검색 개편시 추가 예정
                    var nBroadType = oLiveData.broad_type;

                    try {
                        nResolution = oLiveData.broad_resolution.split('x')[1];
                    } catch(e) {
                        nResolution = undefined;
                    }

                    var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szCallStatistics, BROAD_NO: szBroadNo, THUMB: szThumb, THUMB_ERROR: szThumbError, GRADE: szBroadBps, TIME: szBroadStart, SUBJECT: szBroadTitle,
                        TOTAL_VIEW: szViewTotal, PC_VIEW: szViewPc, MOBILE_VIEW: szViewMobile, USER_ID: szUserId, USER_NICK: szUserNick, RESOLUTION: nResolution, VISIT_BROAD: nVisitBroadType, BROAD_TYPE: nBroadType};

                    var szTemplate = $('#tpl_live_list').html();
                    var szContents = doT.template(szTemplate)(Object);

                    aBroadHtml.push(szContents);
                }
            });
            return aBroadHtml;
        }
        // VOD 해시태그 리스트
        , showHashTagVodList : function(oData, szHashTag, nCurrentPage, szClickType) {
            var aBroadHtml = [];
            $.each(oData, function(i, oVodData) {
                var szCallStatistics = "afreeca.front.statistics.setHashtagParam('"+szHashTag+"','"+szClickType+"','all','"+oVodData.user_id+"','"+null+"','"+oVodData.title_no+"','"+nCurrentPage+"');";
                var arrInflowPath = ['main', 'hashtag', (szClickType=='hash_all' ? 'total' : 'vod'), encodeURIComponent(szHashTag)];
                szCallStatistics += ' oAnalysisUtil.sendVodInflowLog(\'' + oVodData.user_id + '\', ' + oVodData.title_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';

                var vod_type = "STATION";
                if ( /sportstv.afreecatv.com/.test(oVodData.url) ) {
                    vod_type = "SPORTS";
                }
                else if ( /sports.afreecatv.com/.test(oVodData.url) ) {
                    vod_type = "NEW_SPORTS";
                }
                var szViewUrl = VOD_DOMAIN + '/PLAYER/' + vod_type + '/' + oVodData.title_no + '#CATEGORY/' + $('#hashtagVod_order li.on').data('order').toUpperCase() + '&' + $('#hashtagVod_range li.on').data('range').toUpperCase() + '/' + nCurrentPage;

                var szThumb = oVodData.thumbnail_path;
                var szThumbError = RES_AFREECA_NONE_SCHEME + '/images/afmain/img_thumb_defalut.gif';
                if ( oVodData.grade == '19' && (oVodData.category == '00030000' || oVodData.file_type == 'HIGHLIGHT') )  {
                    szThumb = RES_AFREECA_NONE_SCHEME + '/images/afmain/img_thumb_adult.gif';
                }

                var szBroadTitle = oVodData.title;
                var szViewCnt = atv.toMoneyFormat(oVodData.view_cnt);
                var szMemoCnt = atv.toMoneyFormat(oVodData.memo_cnt);
                var szRecommCnt = atv.toMoneyFormat(oVodData.recomm_cnt);
                var szUserId = oVodData.user_id;
                var szUserNick = oVodData.user_nick;
                var szTitleNo = oVodData.title_no;
                var szTime = oVodData.duration

                var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szCallStatistics, THUMB: szThumb,
                            THUMB_ERROR: szThumbError, VTIME: szTime, SUBJECT: szBroadTitle,
                            TOTAL_VIEW: szViewCnt, UP: szRecommCnt, REPLY: szMemoCnt, USER_ID: szUserId, USER_NICK: szUserNick, TITLE_NO: szTitleNo, VOD_TYPE: vod_type};

                var szTemplate = $('#tpl_vod_hashtag').html();
                var szContents = doT.template(szTemplate)(Object);

                aBroadHtml.push(szContents);
            });
            return aBroadHtml;
        }
        , showIctMenu : function(oObj, bFavorite) {
            var szBjId   = $(oObj).attr('user_id');
            var szBjNick = $(oObj).text();
            var aHtml    = [];

            if(szBjId == '스포츠')
            {
                return false;
            }

            var nIctTop = 193;
            var nIctLeft = 13;
            var oTarGet = $(oObj);
            if ($(oObj).parent().attr('class') != "cast_box")
            {
                oTarGet = $(oObj).parents(".cast_box");
            }

            if(!bFavorite) {
                var szFavAddView = "block";
                var szFavDelView = "none";
            } else {
                var szFavAddView = "none";
                var szFavDelView = "block";
            }

            var szStationUrl = AFREECA + '/' + szBjId;

            var Object = {STATION_URL: szStationUrl, ICT_TOP : nIctTop, ICT_LEFT :nIctLeft , USER_ID : szBjId , FAVADD_VIEW :szFavAddView ,FAVDEL_VIEW: szFavDelView};

            var szTemplate = $('#ict_menu').html();
            var szContents = doT.template(szTemplate)(Object);

            oTarGet.after(szContents);

            if(!bFavorite) {
                $('#contextMenu dl dd a').off('click').on('click', function() {
                    if(!atv.isLogin()) 
                    {
                        var Object ={};
                        var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                        if(confirm(szMessage))
                        {
                            var ticket = self.getCookie('_au');
                            atv.setInit('addFav', 'addFav:'+ticket+':'+szBjId, DOMAIN, 1);
                            atv.goLogin();
                        }
                    }
                    else
                    {
                        favorite.addFavoriteList(szBjId, false);
                        $('#contextMenu').remove();
                    }
                });
            }
            else
            {
                // 2019-03-28 솜방 : icon에 on class 추가
                $('#contextMenu dl dd em').addClass('on');
                $('#contextMenu dl dd a').off('click').on('click', function() {
                    var Object ={USER_NICK : szBjNick};
                    var szMessage = doT.template($("#message_confirm_favorite_delete").html())(Object);
                    if(confirm(szMessage))
                    {
                        favorite.delFavoriteList(szBjId, false);
                    }

                    $('#contextMenu').remove();
                });

            }
        }
        , getListTopBnrData : function(nStartNo) {
            if(oMainData.MAIN_LIST_TOP_BNR_RESULT == 1)
            {
                var aHtml = [];
                var aGroupData = [];
                var szTarget = '';
                var szTotalSearchTarget = '';
                var nAllCount = oMainData.MAIN_LIST_TOP_BNR_DATA.length;

                for (var i = 0; i < nAllCount; i++) {
                    if ('undefined' == typeof aGroupData[oMainData.MAIN_LIST_TOP_BNR_DATA[i].order_no]) {
                        aGroupData[oMainData.MAIN_LIST_TOP_BNR_DATA[i].order_no] = [];
                    }

                    if ('object' == typeof aGroupData[oMainData.MAIN_LIST_TOP_BNR_DATA[i].order_no]) {
                        aGroupData[oMainData.MAIN_LIST_TOP_BNR_DATA[i].order_no].push(oMainData.MAIN_LIST_TOP_BNR_DATA[i]);
                    }
                }

                for (var j in aGroupData) {
                    if ('object' == typeof aGroupData[j])
                    {
                        var nLen = aGroupData[j].length;
                        for (var k = nLen; k > 0; k--) {
                            aGroupData[j][nLen - 1] = aGroupData[j].splice(Math.floor(Math.random() * k), 1)[0];
                        }
                    }
                }

                $.each(aGroupData, function (nKey, aItem) {
                    if ('undefined' == typeof aItem) {
                        return;
                    }
                    $.each(aItem, function (nKey, oBnr) {
                        szTarget = '';
                        szTotalSearchTarget = '';
                        if(oBnr.target == 'Y')
                        {
                            szTarget = 'target="_blank"';
                            szTotalSearchTarget = '_blank';
                        }
                        aHtml.push('<li>');
                        
                        var szClickFunc = "callAU(\'MAIN_LIST_BANNER_DATA\');";
                        if(oBnr.link.indexOf('play.afreecatv.com') != -1) {
                            var arrInflowPath = ['main', 'banner', oBnr.idx];
                            var aUri  = oBnr.link.replace(/^((https?:)?\/\/)/gi, '').split('/');    
                            szClickFunc += "oAnalysisUtil.sendLiveInflowLog(\'" + aUri[1] + "\', \'" + (typeof(aUri[2]) == 'undefined' ? 0 : aUri[2]) + "\', " + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ", null, -1);";
                        }
                        
                        if (oBnr.link.indexOf('http') >= 0) {
                            aHtml.push('<a href="'+ oBnr.link +'" class="bnr_conts" onclick="javascript:' + szClickFunc + '" '+ szTarget +'>');
                        } else {
                            szClickFunc += "goTotalSearch(\'' + oBnr.link + '\', \'' + szTotalSearchTarget + '\', \'bn\');";
                            aHtml.push('<a href="javascript:;" class="bnr_conts" onclick="javascript:' + szClickFunc + '">');
                        }
                        aHtml.push('<span class="bnr_img">')
                        aHtml.push('<img src="'+ ADMIN_IMG +'/'+ oBnr.img_path +'" alt="'+ oBnr.memo +'"/>');
                        aHtml.push('</span>');
                        aHtml.push('<div class="bnr_text">');
                        aHtml.push('<span class="date">' + oBnr.banner_period + '</span>');
                        aHtml.push('<strong>' + oBnr.banner_title + '</strong>');
                        if(oBnr.banner_content != null){
                            aHtml.push('<p>' + oBnr.banner_content.replace(/\r?\n/g, '<br>')+ '</p>');
                        }
                        aHtml.push('</div>');
                        aHtml.push('</a>');
                        
                        // 배너 링크가 라이브 방송인 경우 라이브 아이콘 노출
                        if(oBnr.link.indexOf('play.afreecatv.com') != -1) {
                            aHtml.push('<a href="' + oBnr.link + '" onclick="javascript:' + szClickFunc + '" class="live">LIVE</a>');
                        } else if(oBnr.alarm_idx != 0) { // 알림푸쉬여부
                            aHtml.push('<a href="javascript:;" data="'+oBnr.alarm_idx+'" class="alarm">알림</a>');
                        }
                        aHtml.push('</li>');
                    });
                });

                //글로벌용 배너 UI가 달라서 배너 구분을 위한 로케일값
                if(oView.szLocale  == 'ko_KR')
                {
                    $('#topBnrArea ul#topBnrSlide').html(aHtml.join(''));
                    $('#topBnrArea').show();
                    $('#btnPrev, #btnNext').show();

                    if(oView.oSlider != null)
                    {
                        oView.oSlider.destroySlider();
                        oView.oSlider = null;
                    }

                    oView.oSlider = $('#topBnrArea ul#topBnrSlide').bxSlider({
                        mode: 'horizontal'
                        , slideWidth: 5000
                        , pause: 3000
                        , speed: 400
                        , controls: false
                        , startSlide : 0
                        , minSlides:3
                        , maxSlides:3
                        , moveSlides:1
                        , slideMargin:0
                    });

                    // 3개 초과일 경우 slide 좌우 생성
                    if (nAllCount > 3) {
                        $("#topBnrArea #btnPrev").on('click', function() {
                            oView.oSlider.goToPrevSlide();
                            return false;
                        });

                        $("#topBnrArea #btnNext").on('click', function() {
                            oView.oSlider.goToNextSlide();
                            return false;
                        });
                    } else {
                        $('#topBnrArea ul#topBnrSlide *').on('mousewheel DOMMouseScroll', function (event) {
                            return false;
                        });
                        $("#topBnrArea #btnPrev").hide();
                        $("#topBnrArea #btnNext").hide();
                    }

                    // 방송 알림설정 //
                    $('.alarmBox .question').on('click', function() {
                        $('#overlay').fadeIn('fast');
                        $('#alarm_broadcast').slideDown('fast');
                        return false;
                    });
                    $('#alarm_broadcast button').on('click', function() {
                        $('#overlay').fadeOut('fast');
                        $('#alarm_broadcast').slideUp('fast');
                        return false;
                    });
                    $(document).on('click','.alarm',function(){
                        var oElem = $(this);
                        var nIdx = oElem.attr('data');

                        if(!atv.isLogin()) {
                            var Object ={};
                            var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                            if(confirm(szMessage))
                            {
                                atv.goLogin();
                            }
                            return;
                        }

                        oView.checkAlarmPush(nIdx, oElem);
                    });
                    $('#alarmBoxLayer').on('click', function() {
                        $('#overlay').fadeOut('fast');
                        $('#alarm_broadcast').slideUp('fast');
                        return false;
                    });
                    //알림등록
                    $('#alarm_push_reg_btn').on('click', function() {
                        var nIdx = $('#alarm_push_idx').val();
                        oView.setAlarmPush(nIdx, $(this));
                        return false;
                    });
                    //알림취소
                    $('.alarmBox #alarm_push_cancle_btn').on('click', function() {
                        var nIdx = $('#alarm_push_idx').val();
                        oView.deleteAlarmPush(nIdx, $(this));
                        return false;
                    });
                    $(window).on('resize ready',function(){$('.alarmBox').fadeOut('fast'); });
                    $('.alarmBox .close').on('click',function(){$('.alarmBox').fadeOut('fast'); });
                    $('#alarm_push_layer_close_btn').on('click',function(){$('.alarmBox').fadeOut('fast'); });
                    $('#btnPrev , #btnNext').on('click',function(){$('.alarmBox').fadeOut('fast'); });
                    // 방송 알림설정 //

                    oView.oSlider.on("mousewheel", function(event, delta, deltaX, deltaY) {
                        if (delta > 0) {
                            oView.oSlider.goToPrevSlide();
                        }
                        if (deltaY < 0){
                            oView.oSlider.goToNextSlide();
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    });
                }
                else{
                    //글로벌용 배너
                    $('#GlobalBnrArea ul#globalBnrSlide').html(aHtml.join(''));
                    $('#GlobalBnrArea').show();
                    $('#btnPrevGlobal, #btnNextGlobal').show();

                    if(oView.oSlider != null)
                    {
                        oView.oSlider.destroySlider();
                        oView.oSlider = null;
                    }

                    oView.oSlider = $('#GlobalBnrArea ul#globalBnrSlide').bxSlider({
                        mode: 'horizontal'
                        , slideWidth: 5000
                        , pause: 3000
                        , speed: 400
                        , controls: false
                        , startSlide : 0
                        , minSlides:3
                        , maxSlides:3
                        , moveSlides:1
                        , slideMargin:0
                    });

                    $("#GlobalBnrArea #btnPrevGlobal").on('click', function() {
                        oView.oSlider.goToPrevSlide();
                        return false;
                    });

                    $("#GlobalBnrArea #btnNextGlobal").on('click', function() {
                        oView.oSlider.goToNextSlide();
                        return false;
                    });
                }
            }
        }
         // 카테고리/섹션 별 배너 생성
        ,getCateBanner : function( szType ) {
            //각 카테고리 고정 배너
            if(oView.szLocale == 'ko_KR' && checkSimple("","")){
                banner.showCateBanner(szType);
            }
            //어드민 섹션 배너(게임 주식 스포츠 펫방, 신인BJ)
            if ( szType in oBannerList )    {
                var oData = oBannerList[szType];
                if (oData.RESULT == 1) {
                    var szTarget = '';
                    if (oData.DATA.target == 'Y') {
                        szTarget = ' target=\"_blank\" ';
                    }
                    if(szType == 'rookie' || szType =='sports'){
                        if(oData.DATA.length == 1){//1개노출일때
                            if (oData.DATA[0].target == 'Y') {
                                szTarget = ' target=\"_blank\" ';
                            }                            
                            var szHtml = '<a href="' + oData.DATA[0].link + '" ' + szTarget + '><img src="' + oData.DATA[0].image_path + '"></a>';
                            $('#div_game_banner').css({'background':oData.DATA[0].bg_color}).html(szHtml).show();
                        }else{//2개노출일때
                            if (oData.DATA[0].target == 'Y') {
                                szTarget = ' target=\"_blank\" ';
                            }
                            var szHtml = '<em></em><ul><li style="background:'+oData.DATA[0].bg_color+ ' url(\'' + oData.DATA[0].image_path + '\') no-repeat 49% 0;">';
                            szHtml += '<a href="' + oData.DATA[0].link + '" ' + szTarget + '></a></li>';
                            szTarget='';
                            if (oData.DATA[1].target == 'Y') {
                                szTarget = ' target=\"_blank\" ';
                            }
                            szHtml += '<li style="background:'+oData.DATA[1].bg_color+ ' url(\'' + oData.DATA[1].image_path + '\') no-repeat 49% 0;">';
                            szHtml += '<a href="' + oData.DATA[1].link + '" ' + szTarget + '></a></li></ul>';
                            $('#div_cate_banner').html(szHtml).show();
                        }
                    } else {
                        var szHtml = '<a href="' + oData.DATA.link + '" ' + szTarget + '><img src="' + oData.DATA.image_path + '"></a>';
                        $('#div_game_banner').css({'background':oData.DATA.bg_color}).html(szHtml).show();
                    }
                }else{
                    $('#div_game_banner').html('').hide();
                }
            } else {
                $('#div_game_banner').html('').hide();
            }
        }
        , showAlarmLayer : function(szType)
        {
            //알림예약안내
            if(szType === 'guide')
            {
                $('#alarmBoxLayer').show();
                $('#alarmBoxSuccessLayer').hide();
                $('#alarmBoxPrevLayer').hide();
                $('#alarmBoxCancleLayer').hide();
            }
            //예약 완료
            else if(szType === 'complete')
            {
                $('#alarmBoxLayer').hide();
                $('#alarmBoxSuccessLayer').show();
                $('#alarmBoxPrevLayer').hide();
                $('#alarmBoxCancleLayer').hide();
            }
            //이미알림받은경우
            else if(szType === 'already')
            {
                $('#alarmBoxLayer').hide();
                $('#alarmBoxSuccessLayer').hide();
                $('#alarmBoxPrevLayer').show();
                $('#alarmBoxCancleLayer').hide();
            }
            //취소
            else if(szType === 'cancle')
            {
                $('#alarmBoxLayer').hide();
                $('#alarmBoxSuccessLayer').hide();
                $('#alarmBoxPrevLayer').hide();
                $('#alarmBoxCancleLayer').show();
            }
        }
        , showMobileLoginLayer : function(szType)
        {
            if( szType === 'open' )
            {
                $('#alarm_mobile').show();
            }
            else if( szType === 'close' )
            {
                $('#alarm_mobile').hide();
            }
        }
        , getHotissueData : function()
        {
            if(oView.szLocale == 'ko_KR')
            {
                $("#hotArea > .listarea").hide();

                if(oMainData.REALTIME_HOTISSUE_CNT > 0 && oMainData.REALTIME_HOTISSUE_RESULT == 1)
                {
                    oView.setHotissueLive();
                    $('#hotArea').show();

                    $("#live_slider_btn").show();
                }
                else
                {
                    $('#live_slider_btn').hide();
                }
                if(oMainData.HOTISSUE_VOD_RESULT == 1)
                {
                    oView.setHotissueVod();
                    $('#hotArea').show();

                    $("#vod_slider_btn").show();
                }
                else
                {
                    $('#vod_slider_btn').hide();
                }
            }
        }
        , setHotissueLive : function()
        {
            var aHtml = [];

            $.each(oMainData.REALTIME_HOTISSUE_DATA, function(i, oRealtime) {
                var szEtcData = 'bj_id=' + oRealtime.user_id + '&broad_no=' + oRealtime.broad_no;
                var szClick = 'oAnalysisUtil.setClickLog(\'main_00000002\',\'' + szEtcData + '\'); ';
                var szClickFnc = szClick + ' callAU(\'MAIN_HOTISSUE_LIVE\');';
                var arrInflowPath = ['main', 'hotissue'];    
                szClickFnc += ' oAnalysisUtil.sendLiveInflowLog(\'' + oRealtime.user_id + '\',' + oRealtime.broad_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';
                    
                var szViewUrl = PLAY_80 + "/" + oRealtime.user_id + "/" + oRealtime.broad_no;
                var szThumb = LIVEIMG_9090 + '/'+ oRealtime.broad_no +'_480x270.gif?'+ Math.floor((Math.random() * 10) + 1);
                var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                var szBroadBps = oRealtime.broad_bps;
                var szBroadStart = oRealtime.broad_start;
                var szBroadTitle = oRealtime.broad_title;
                var szViewTotal = atv.toMoneyFormat(oRealtime.total_view_cnt);
                var szViewPc = atv.toMoneyFormat(Number(oRealtime.current_view_cnt) + Number(oRealtime.relay_total_current_view_cnt));
                var szViewMobile = atv.toMoneyFormat(Number(oRealtime.m_current_view_cnt) + Number(oRealtime.relay_m_total_current_view_cnt));
                var szUserId = oRealtime.user_id;
                var szUserNick = oRealtime.user_nick;
                var szBroadNo = oRealtime.broad_no;
                var nBroadType = oRealtime.broad_type;
                var nVisitBroadType = oRealtime.visit_broad_type;

                 var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClickFnc, THUMB: szThumb,
                    THUMB_ERROR: szThumbError, GRADE: szBroadBps, TIME: szBroadStart, SUBJECT: szBroadTitle,
                    TOTAL_VIEW: szViewTotal, PC_VIEW: szViewPc, MOBILE_VIEW: szViewMobile, USER_ID: szUserId, USER_NICK: szUserNick, BROAD_NO: szBroadNo, BROAD_TYPE: nBroadType, VISIT_BROAD : nVisitBroadType};

                var szTemplate = $('#tpl_live').html();
                var szContents = doT.template(szTemplate)(Object);

                aHtml.push(szContents);
            });

            $('#liveSlider').html(aHtml.join(''));
            $('#liveSlider').show();
        }
        , setHotissueVod : function()
        {
            var aHtml = [];
            $.each(oMainData.HOTISSUE_VOD_DATA, function(i, oVod) {
                var nHour = parseInt((oVod.vod_duration / 1000) / 3600);
                var nMinute = parseInt((oVod.vod_duration/(1000*60))%60);
                var nSeconds = parseInt((oVod.vod_duration/1000)%60);
                nHour    = (nHour < 10) ? "0" + nHour : nHour;
                nMinute  = (nMinute < 10) ? "0" + nMinute : nMinute;
                nSeconds = (nSeconds < 10) ? "0" + nSeconds : nSeconds;

                var szTime = (nHour == "00" ? "" : nHour + ":");
                szTime += nMinute + ":";
                szTime += nSeconds;

                // click event
                var szClick = '';
                var aParamData = [];

                try {
                    aParamData = oVod.pc_url.split('?')[1].split('&');
                } catch(e) {
                    aParamData = [];
                }

                var szEtcData = '';
                $.each(aParamData, function (index, oData) {
                    var aTempData = [''];

                    try {
                        aTempData = oData.split('=');
                    } catch(e) {
                        aTempData = [''];
                    }

                    aTempData[0] = aTempData[0].replace('szType', 'sztype');
                    aTempData[0] = aTempData[0].replace('szBjId', 'bj_id');
                    aTempData[0] = aTempData[0].replace('nBbsNo', 'bbs_no');
                    aTempData[0] = aTempData[0].replace('nTitleNo', 'title_no');

                    szEtcData += aTempData.join('=') + '&';
                });

                var szClick = 'oAnalysisUtil.setClickLog(\'main_00000001\',\'' + szEtcData + '\');';
                var szClickFnc = szClick + ' callAU(\'MAIN_HOTISSUE_VOD\'); ';
                var arrInflowPath = ['main', 'hotissue'];    
                szClickFnc += ' oAnalysisUtil.sendVodInflowLog(\'' + oVod.user_id + '\', ' + oVod.title_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';
                
                var szViewUrl = VOD_DOMAIN + '/PLAYER/' + oVod.vod_type + '/' + oVod.title_no;
                var szThumb = oVod.thumb;
                var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';

                var szBroadTitle = oVod.broad_title;
                var szViewTotal = oVod.view_cnt;

                var szUserId = oVod.user_id;
                var szUserNick = oVod.user_nick;

                var szTitleNo = oVod.title_no;
                var szVodType = oVod.vod_type;

                var nUccType = oVod.ucc_type;

                var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClickFnc, THUMB: szThumb,
                            THUMB_ERROR: szThumbError, VTIME: szTime, SUBJECT: szBroadTitle,
                            TOTAL_VIEW: szViewTotal, USER_ID: szUserId, USER_NICK: szUserNick, TITLE_NO:szTitleNo, VOD_TYPE:szVodType, UCC_TYPE:nUccType};

                var szTemplate = $('#tpl_vod').html();
                var szContents = doT.template(szTemplate)(Object);

                aHtml.push(szContents);
            });

            $('#vodSlider').html(aHtml.join(''));
            $('#vodSlider').show();
        }
        ,getStaffPicksList : function()
        {
            //alert();
            var aHtml = [];
            var staffSlide = false;

            if(oMainData.STAFF_PICKS_CNT > 0)
            {
                $.each(oMainData.STAFF_PICKS_DATA, function(nIdx, oStaffPicks) {
                    if(oStaffPicks.option_flag == "A") {
                        staffSlide = true;
                    }
                    if(oStaffPicks.target == szLang)
                    {
                        var oLiveItem;
                        var oVodItem;
                        if(oStaffPicks.caster_cnt > 0)
                            oLiveItem = oView.makeStaffPicksLive(oStaffPicks.LIVE_DATA);
                        if(oStaffPicks.video_cnt > 0)
                            oVodItem = oView.makeStaffPicksVod(oStaffPicks.VOD_DATA);

                        if('undefined' !== typeof oLiveItem || 'undefined' !== typeof oVodItem)
                        {
                            var szLiveItem = ('undefined' !== typeof oLiveItem)? oLiveItem : '';
                            var szVodItem = ('undefined' !== typeof oVodItem)? oVodItem : '';
                            var szImg = (oStaffPicks.img_url !== "") ? oStaffPicks.img_url : RES_AFREECA_NONE_SCHEME + "/images/afmain/img_thumb_staff.jpg";
                            var szTitle = oStaffPicks.title;
                            var szPageUrl =  AFREECA_NONE_SCHEME + "/?hash=staffpicks_" + oStaffPicks.idx;
                            var szSubTitle = oStaffPicks.sub_title;

                            var Object = {IDX: nIdx, IMG: szImg, PAGE_URL:szPageUrl, TITLE: szTitle,
                                SUBTITLE: szSubTitle, LIVEITEM: szLiveItem, VODITEM: szVodItem};

                            var szTemplate = $('#tpl_staffpicks_list').html();
                            var szContents = doT.template(szTemplate)(Object);

                            $('#staffPicksList').append(szContents);
                        }
                    }
                });
                //인덱스를 적용 할수가 없어서 여기서 클래스 제거함
                if(staffSlide==false) {
                    //$("#staffPicksList  > .staffFix" ).attr( 'class',"" );
                }
                //$("#staffPicksList  > .staffFix" ).attr( 'class',"" );스태프픽스 다시 적용
                $('#staffPicksList').show();

            }
        }
        ,getLiveSection : function()
        {
            var aHtml = [];

            if (oMainData.hasOwnProperty("LIVE_RESULT") && oMainData.LIVE_RESULT == 1)
            {
                var oLiveItem = oView.makeLiveSection(oMainData.LIVE_DATA);

                if ('undefined' !== typeof oLiveItem) {
                    var szLiveItem = ('undefined' !== typeof oLiveItem)? oLiveItem : '';
                    var szImg = RES_AFREECA_NONE_SCHEME + "/images/afmain/img_thumb_staff.jpg";
                    var szTitle = "";
                    var szPageUrl =  AFREECA_NONE_SCHEME + "/?hash=livesection";
                    var szSubTitle = "";
                    if (oMainData.hasOwnProperty("LIVE_RESULT") && oMainData.LIVE_RESULT == 1) {
                        szImg = oMainData.LIVE_INFO.img_url;
                        szTitle = oMainData.LIVE_INFO.title;
                        szSubTitle = oMainData.LIVE_INFO.sub_title;
                    }
                    var Object = {IMG: szImg, PAGE_URL:szPageUrl, TITLE: szTitle,
                        SUBTITLE: szSubTitle, LIVEITEM: szLiveItem};
                    var szTemplate = $('#tpl_livesection_list').html();
                    var szContents = doT.template(szTemplate)(Object);

                    $('#liveSectionList').append(szContents);
                }
                $('#liveSectionList').show();
            }
        }
        ,makeLiveSection : function(aGroupData)
        {
            var aHtml = [];

            if ('object' == typeof aGroupData) {
                var nCnt = 0;
                $.each(aGroupData, function (nKey, oLiveSectionData) {
                    if ('undefined' == typeof oLiveSectionData || nCnt > 60) {
                        return false;
                    }

                    var arrInflowPath = ['main', 'curation'];    
                    var szClickFnc = ' oAnalysisUtil.sendLiveInflowLog(\'' + oLiveSectionData.user_id + '\',' + oLiveSectionData.broad_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';                
                    var szViewUrl = PLAY_80 + "/" + oLiveSectionData.user_id + "/" + oLiveSectionData.broad_no;
                    var szThumb = oLiveSectionData.broad_thumb;
                    var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                    var szBroadBps = oLiveSectionData.broad_bps;
                    var szBroadStart = oLiveSectionData.broad_start;
                    var szBroadTitle = oLiveSectionData.broad_title;
                    var szViewTotal = atv.toMoneyFormat(oLiveSectionData.total_view_cnt);
                    var szViewPc = atv.toMoneyFormat(oLiveSectionData.pc_view_cnt);
                    var szViewMobile = atv.toMoneyFormat(oLiveSectionData.mobile_view_cnt);
                    var szUserId = oLiveSectionData.user_id;
                    var szUserNick = oLiveSectionData.user_nick;
                    var szBroadNo = oLiveSectionData.broad_no;

                    var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClickFnc, THUMB: szThumb, THUMB_ERROR: szThumbError, GRADE: szBroadBps, TIME: szBroadStart, SUBJECT: szBroadTitle,
                        TOTAL_VIEW: szViewTotal, PC_VIEW: szViewPc, MOBILE_VIEW: szViewMobile, USER_ID: szUserId, USER_NICK: szUserNick, BROAD_NO: szBroadNo};

                    var szTemplate = $('#tpl_live_section').html();
                    var szContents = doT.template(szTemplate)(Object);
                    
                    aHtml.push(szContents);
                    nCnt++;
                });
                return aHtml.join('');
            }
        }
        ,makeStaffPicksLive : function(aGroupData)
        {
            var aHtml = [];

            if ('object' == typeof aGroupData) {
                if(aGroupData.length > 0)
                {
                    $.each(aGroupData, function (nKey, oStaffPicksLive) {
                        if ('undefined' == typeof oStaffPicksLive) {
                            return;
                        }
                        
                        var arrInflowPath = ['main', 'curation'];    
                        var szClickFnc = ' oAnalysisUtil.sendLiveInflowLog(\'' + oStaffPicksLive.user_id + '\',' + oStaffPicksLive.broad_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';
                        var szViewUrl = PLAY_80 + "/" + oStaffPicksLive.user_id + "/" + oStaffPicksLive.broad_no;
                        var szThumb = oStaffPicksLive.broad_thumb;
                        var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                        var szBroadBps = oStaffPicksLive.broad_bps;
                        var szBroadStart = oStaffPicksLive.broad_start;
                        var szBroadTitle = oStaffPicksLive.broad_title;
                        var szViewTotal = atv.toMoneyFormat(oStaffPicksLive.total_view_cnt);
                        var szViewPc = atv.toMoneyFormat(oStaffPicksLive.pc_view_cnt);
                        var szViewMobile = atv.toMoneyFormat(oStaffPicksLive.mobile_view_cnt);
                        var szUserId = oStaffPicksLive.user_id;
                        var szUserNick = oStaffPicksLive.user_nick;
                        var szBroadNo = oStaffPicksLive.broad_no;

                        var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClickFnc, THUMB: szThumb, THUMB_ERROR: szThumbError, GRADE: szBroadBps, TIME: szBroadStart, SUBJECT: szBroadTitle,
                            TOTAL_VIEW: szViewTotal, PC_VIEW: szViewPc, MOBILE_VIEW: szViewMobile, USER_ID: szUserId, USER_NICK: szUserNick, BROAD_NO: szBroadNo};

                        var szTemplate = $('#tpl_staffpicks_live').html();
                        var szContents = doT.template(szTemplate)(Object);

                        aHtml.push(szContents);
                    });
                }
                return aHtml.join('');
            }
        }
        ,makeStaffPicksVod : function(aGroupData)
        {
            var aHtml = [];

            if ('object' == typeof aGroupData) {
                if(aGroupData.length > 0)
                {
                    $.each(aGroupData, function (nKey, oStaffPicksVod) {
                        if ('undefined' == typeof oStaffPicksVod) {
                            return;
                        }
                        
                        var arrInflowPath = ['main', 'curation'];    
                        var szClickFnc = ' oAnalysisUtil.sendVodInflowLog(\'' + oStaffPicksVod.user_id + '\', ' + oStaffPicksVod.title_no + ', ' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');';
                        var szViewUrl = VOD_DOMAIN + '/PLAYER/STATION/' + oStaffPicksVod.title_no;
                        var szThumb = oStaffPicksVod.thumb;
                        var szThumbError = RES_AFREECA_NONE_SCHEME +'/images/afmain/img_thumb_v.gif';
                        var nHour = parseInt((oStaffPicksVod.vod_duration / 1000) / 3600);
                        var nMinute = parseInt((oStaffPicksVod.vod_duration/(1000*60))%60);
                        var nSeconds = parseInt((oStaffPicksVod.vod_duration/1000)%60);
                        nHour    = (nHour < 10) ? "0" + nHour : nHour;
                        nMinute  = (nMinute < 10) ? "0" + nMinute : nMinute;
                        nSeconds = (nSeconds < 10) ? "0" + nSeconds : nSeconds;

                        var szTime = (nHour == "00" ? "" : nHour + ":");
                        szTime += nMinute + ":";
                        szTime += nSeconds;

                        var szBroadTitle = oStaffPicksVod.broad_title;
                        var szViewTotal = oStaffPicksVod.view_cnt;
                        var szUserId = oStaffPicksVod.user_id;
                        var szUserNick = oStaffPicksVod.user_nick;
                        var szTitleNo = oStaffPicksVod.title_no;

                        var Object = {VIEW_URL: szViewUrl, CLICK_FNC: szClickFnc, THUMB: szThumb, THUMB_ERROR: szThumbError,
                                VTIME: szTime, SUBJECT: szBroadTitle, TOTAL_VIEW: szViewTotal,
                                 USER_ID: szUserId, USER_NICK: szUserNick, TITLE_NO:szTitleNo};

                        var szTemplate = $('#tpl_staffpicks_vod').html();
                        var szContents = doT.template(szTemplate)(Object);

                        aHtml.push(szContents);
                    });
                    return aHtml.join('');
                }
            }
        }
        , getStaffPicksData : function( szStaffPicksDetail )
        {
            var aStr = [];

            try {
                aStr = szStaffPicksDetail.split('_');
            } catch(e) {
                aStr = [];
            }

            if(oMainData.STAFF_PICKS_CNT > 0)
            {
                $.each(oMainData.STAFF_PICKS_DATA, function(nIdx, oStaffPicks) {
                    if(oStaffPicks.idx == aStr[1])
                    {
                        oView.callStaffPicksDetail(oStaffPicks.idx, 1, 'all');
                        var szTitleTag = oStaffPicks.title + '<strong>' + oStaffPicks.sub_title + '</strong>'

                        $('#staffPicksDetail h2.title').html(szTitleTag);
                        return false;
                    }
                });
                $('#broad_sv_area').hide();
                $('div.more_list').hide();
                $('div.nt_area').show();

                $('#staffPicksDetail').show();
            }
            else {
                $('div.nt_area').show();
                $('#ic_nocast').show();
                $('div.loading').hide();
            }
        }
        , callStaffPicksDetail : function( nIdx, nPage, szOrderType )
        {
            $.ajaxSettings.traditional = true;
            $.ajax({
                type : "GET"
                , url : LIVE_NONE_SCHEME + '/api/get_staffpicks_api.php'
                , data : {
                    lang : szLang
                    , idx : nIdx
                    , page_no : nPage
                    , type : szOrderType
                }
                , async : false
                , dataType : 'jsonp'
                , jsonp : 'callback'
                , beforeSend : function(request) {
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                }
                , success : function(response) {
                    $('div.loading').hide();
                    oView.showStaffPicksDetail(nIdx, nPage, response, szOrderType);
                }
                , error : function(xhr, ajaxOptions, thrownError) {
                    $('div.loading').hide();
                    $('div.reloading').show();

                    $('div.reloading button.icon').click(function() {
                        $('div.reloading').hide();
                        $('div.loading').show();
                        oView.callStaffPicksDetail(nIdx, nPage);
                    });
                }
            });
        }
        , showStaffPicksDetail : function( nIdx, nPage, oData, orderType )
        {
            var oLiveItem = '';
            var oVodItem = '';
            var oAllItem = '';

            var nTotalCnt = oData.total_cnt;
            var nTotalPage = Math.ceil(oData.total_cnt / 60);

            if(nTotalCnt > 0)
            {
                switch(orderType)
                {

                    case "live":
                        if(oData.broad.length > 0 )
                            oAllItem = oView.makeStaffPicksLive(oData.broad);
                        break;
                    case "vod" :
                        if(oData.broad.length > 0 )
                            oAllItem = oView.makeStaffPicksVod(oData.broad);
                        break;
                    case "all":
                    default:
                        if(oData.broad.live.length > 0 )
                            oLiveItem = oView.makeStaffPicksLive(oData.broad.live);
                        if(oData.broad.vod.length > 0 )
                            oVodItem = oView.makeStaffPicksVod(oData.broad.vod);
                        oAllItem = oLiveItem + oVodItem;
                        break;
                }

                $('div.more_list').hide();

                if(nPage < nTotalPage)
                {
                    $('div.more_list').show();
                }

                $('div.nt_area').hide();
                $('#staffPicksDetail').show();

                if (nPage == 1)
                {
                    $('#staffPicksBroad').html(oAllItem);
                }
                else
                {
                    $('#staffPicksBroad').append(oAllItem);
                }


                $('#broadlist_area').off('click').on('click', 'div.more_list a', function() {
                    _nPage = nPage + 1;
                    oView.callStaffPicksDetail(nIdx, _nPage, orderType );
                });

                $('#staffPicksDetail .sv_area .tab_list li').off('click').on('click', function() {
                    $('#staffPicksDetail .sv_area .tab_list li').removeClass('on');
                    $(this).addClass('on');

                    switch($(this).attr('role'))
                    {
                        case "live":
                            orderType = "live";
                            break;
                        case "vod":
                            orderType = "vod";
                            break;
                        case "all":
                        default:
                            orderType = "all";
                            break;
                    }

                    _nPage = 1;
                    oView.callStaffPicksDetail(nIdx, _nPage, orderType );
                });

                $('button.btn_reload').off('click').on('click', function(e){
                    e.preventDefault();
                    oView.showStaffPicksDetail(nIdx, 1, orderType );
                });
            }
            else
            {
                var szTemplate = $('#message_broad_cast_none').html();
                $('div.nt_area').html(szTemplate);

                $('#broadlist_area div.listarea ul').html('');
                $('#staffPicksBroad').html('');
                $('#broad_sv_area').hide();
                $('div.loading').hide();
                $('div.more_list').hide();
                $('div.nt_area').show();
            }
        }
        , callLiveSectionDetail : function( nPage, szOrderType )
        {
            $.ajaxSettings.traditional = true;
            $.ajax({
                type : "GET"
                , url : LIVE_NONE_SCHEME + '/api/get_livesection.php'
                , data : {
                    lang : szLang
                    , page_no : nPage
                    , order_type : szOrderType
                }
                , async : false
                , dataType : 'jsonp'
                , jsonp : 'callback'
                , beforeSend : function(request) {
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                }
                , success : function(response) {
                    $('div.loading').hide();
                    oView.showLiveSectionDetail(nPage, response, szOrderType);
                }
                , error : function(xhr, ajaxOptions, thrownError) {
                    $('div.loading').hide();
                    $('div.reloading').show();

                    $('div.reloading button.icon').click(function() {
                        $('div.reloading').hide();
                        $('div.loading').show();
                        oView.callLiveSectionDetail(nPage, szOrderType);
                    });
                }
            });
        }
        , showLiveSectionDetail : function( nPage, oData, orderType )
        {
            var szTitleTag = "LIVE SECTION";
            if (oData.hasOwnProperty("LIVE_INFO") && oData.LIVE_INFO.title != null) {
                szTitleTag = oData.LIVE_INFO.title + '<strong>' + oData.LIVE_INFO.sub_title + '</strong>'
            }
            $('#liveSectionDetail h2.title').html(szTitleTag);
            $('#liveSectionDetail').show();

            if (oData.LIVE_RESULT == 1) {
                var oLiveItem = '';

                var nTotalCnt = oData.LIVE_TOTAL_CNT;
                var nTotalPage = Math.ceil(nTotalCnt / 60);
                if(nTotalCnt > 0) {
                    oLiveItem = oView.makeLiveSection(oData.LIVE_DATA);

                    $('div.more_list').hide();

                    if(nPage < nTotalPage) {
                        $('div.more_list').show();
                    }

                    $('div.nt_area').hide();

                    if (nPage == 1) {
                        $('#liveSectionBroad').html(oLiveItem);
                    }
                    else {
                        $('#liveSectionBroad').append(oLiveItem);
                    }
                }
                else {
                    var szTemplate = $('#message_broad_cast_none').html();
                    $('div.nt_area').html(szTemplate);

                    $('#broadlist_area div.listarea ul').html('');
                    $('#liveSectionBroad').html('');
                    $('#broad_sv_area').hide();
                    $('div.loading').hide();
                    $('div.more_list').hide();
                    $('div.nt_area').show();
                }
            }
            else {
                var szTemplate = $('#message_broad_cast_none').html();
                $('div.nt_area').html(szTemplate);

                $('#broadlist_area div.listarea ul').html('');
                $('#liveSectionBroad').html('');
                $('#broad_sv_area').hide();
                $('div.loading').hide();
                $('div.more_list').hide();
                $('div.nt_area').show();
            }

            $('#broadlist_area').off('click').on('click', 'div.more_list a', function() {
                _nPage = nPage + 1;
                oView.callLiveSectionDetail(_nPage, orderType);
            });

            $('#liveSectionDetail .sv_area .tab_list li').off('click').on('click', function() {
                $('#liveSectionDetail .sv_area .tab_list li').removeClass('on');
                $(this).addClass('on');

                switch($(this).attr('role')) {
                    case "recent":
                        orderType = "recent";
                        break;
                    default:
                        orderType = "viewer";
                        break;
                }

                _nPage = 1;
                oView.callLiveSectionDetail(_nPage, orderType);
            });

            $('button.btn_reload').off('click').on('click', function(e){
                e.preventDefault();
                oView.showLiveSectionDetail(1, orderType);
            });
        }
        , deleteAlarmPush : function(nIdx, oElem)
        {
            $.ajax({
                dataType : 'jsonp'
                , url  :  '//api.m.'+DOMAIN +'/push/alarm/a/unregister'
                , jsonp : "callback"
                , data : {
                    alarm_idx : nIdx
                }
                , success : function(oData) {
                    var nResult = oData.result;
                    var oDATA = oData.data;

                    if(nResult > 0)
                    {
                        oView.showAlarmLayer('cancle');
                        return;
                    }
                    else
                    {
                        switch (oDATA.code) {
                            case -1000:
                                var Object ={};
                                var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                                if(confirm(szMessage))
                                {
                                    atv.goLogin();
                                }
                                return;
                        }
                    }
                    return;
                }
            });
        }
        , setAlarmPush : function(nIdx, oElem)
        {
            $.ajax({
                type : 'post'
                , dataType : 'jsonp'
                , url  :  '//api.m.'+DOMAIN +'/push/alarm/a/register'
                , jsonp : "callback"
                , data : {
                    alarm_idx : nIdx
                    , platform : 'PC'
                }
                , success : function(oData) {
                    var nResult = oData.result;
                    var oDATA = oData.data;
                    if(nResult > 0)
                    {
                        oView.showAlarmLayer('complete');
                        return;
                    }
                    else
                    {
                        switch (oDATA.code) {
                            case -1000:
                                var Object ={};
                                var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                                if(confirm(szMessage))
                                {
                                    atv.goLogin();
                                }
                                return;
                            case -8503:
                                alert(oDATA.message);
                                return;
                            case -8502:
                                $('.alarmBox').hide();
                                $('#overlay').fadeIn('fast');
                                oView.showMobileLoginLayer('open');
                                $('#alarm_mobile button').on('click',function(){ oView.showMobileLoginLayer('close');$('#overlay').fadeOut('fast'); });
                                return;
                            case -8501:
                                oView.showAlarmLayer('already');
                                return;
                        }
                    }
                    return;
                }
            });
        }
        , checkAlarmPush : function(nIdx, oElem)
        {
            $.ajax({
                type : 'post'
                , dataType : 'jsonp'
                , url  :  '//api.m.'+DOMAIN +'/push/alarm/a/status'
                , jsonp : "callback"
                , data : {
                    alarm_idx : nIdx
                }
                , success : function(oData) {
                    var nResult = oData.result;
                    var oDATA = oData.data;
                    if(nResult > 0)
                    {
                        $('#alarm_push_idx').val(nIdx);

                        $('.alarmBox:first').css({
                            top: oElem.offset().top + 29 ,
                            left: oElem.offset().left - 28
                        }).fadeIn('fast');

                        if( oData.is_exist ) {
                            oView.showAlarmLayer('already');
                        }
                        else {
                            oView.showAlarmLayer('guide');
                        }
                    }
                    else
                    {
                        switch (oDATA.code) {
                            case -1000:
                                var Object ={};
                                var szMessage = doT.template($("#message_confirm_need_login").html())(Object);
                                if(confirm(szMessage))
                                {
                                    atv.goLogin();
                                }
                                return;
                            case -8001:
                                oView.showAlarmLayer('already');
                                return;
                        }
                    }
                    return;
                }
            });
        },LaterViewPush : function(type,broadno,location,sys_type)
        {
            $.ajax({
                type : 'post'
                , dataType : 'jsonp'
                , url  :  VOD_NONE_SCHEME + '/api/later_view_api.php'
                , jsonp : "callback"
                , data : {
                    szWork : 'ADD',
                    szVodType : type,
                    nTitleNo : broadno,
                    szLocation : location,
                    szSysType : sys_type
                }
                , success : function(oData) {
                    var nResult = oData.RESULT;
                    var szMsg = oData.MSG;

                    if(nResult == 1){
                        if(!self.getCookie('LaterviewInfoLayer')){
                            $('#View_after').show();
                            $('#del_later').hide();
                            $('#reg_later').show();
                            if(type == 'VOD'){
                                $('#vod_later').show();
                                $('#live_later').hide();
                            }else if(type == 'LIVE'){
                                $('#live_later').show();
                                $('#vod_later').hide();
                            }
                            $('#overlay').fadeIn('fast');
                        }else {
                            var Object ={};
                            var szMessage = doT.template($("#message_later_add_success").html())(Object);
                            if(confirm(szMessage.replace("<br>","\n"))){
                                document.location.href = VOD_DOMAIN + "/LATER";
                            }
                        }
                        return;
                    }
                    //이미 등록된 경우
                    else if(nResult == -2){
                        var Object ={};
                           var szMessage = doT.template($("#message_later_add_fail").html())(Object);
                           alert(szMessage);
                           return;
                    }
                    //LIVE 방송 ADD 시 게시물이 존재하지 않는 경우
                    else if(nResult == -4){
                        var Object ={};
                           var szMessage = doT.template($("#message_later_add_fail2").html())(Object);
                           alert(szMessage);
                           return;
                    }
                    //나중에 보기 최대 등록 갯수를 초과한 경우
                    else if(nResult == -5){
                        var Object ={};
                           var szMessage = doT.template($("#message_later_add_fail3").html())(Object);
                           alert(szMessage);
                           return;
                    }
                    //나중에 보기 지원 안하는 영상인 경우 (PPV)
                    else if(nResult == -7){
                       alert(szMsg);
                       return;
                    }
                    //DB 에러
                    else {
                        var Object ={};
                           var szMessage = doT.template($("#message_api_call_fail").html())(Object);
                           alert(szMessage);
                           return;
                    }
                    return;
                }, error : function(xhr, ajaxOptions, thrownError) {
                    alert("실패");
                }
            });
        }        
        //장기구독자 선물 안내 레이어 출력
        , getSubsGiftInfo : function() {
            if(oView.szLocale != 'ko_KR') return;
            if(_szUserId != "") {
                if(!atv.getCookie('SubsGiftLayer')){
                    $.ajaxSettings.traditional = true;
                    $.ajax({
                        type : "GET"
                        , url : SUBS_NONE_SCHEME + "/api/gift_api.php"
                        , data : {
                            cmd : 'USABLE_COUPON',
                            userId : _szUserId
                        }
                        , xhrFields : {
                            withCredentials : true
                        }
                        , async : false
                        , dataType : 'jsonp'
                        , beforeSend : function(request) {
                            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        }
                        , success : function(response) {
                            if(response.channel.result == 1) {
                                if(response.channel.data != null && response.channel.data.length > 0) {
                                    $('#galarm_layer .pop-body a').attr('href', SUBS_NONE_SCHEME + '/?type=gift#' + response.channel.data[0].pay_count);
                                    $('#galarm_layer').show();
                                }
                            }
                        }
                        , error : function(xhr, ajaxOptions, thrownError) {
                        }
                    });
                }
            }
        }
        , showChinaLayer : function() {
            //중국이 아니면 리턴
            if(oView.nChinaChk != "1"){
                return;
            }
            if(!atv.getCookie('availableChinaLayer')){
                $('#layer_zh_info').show();
                    
            }
        }
    }
    return oView;
});
