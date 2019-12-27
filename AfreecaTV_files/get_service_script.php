var oCommonGnb = {
    "menu" : {
        0: [
            {
                "name": "Videos"
                , "url": VOD_NONE_SCHEME
            }
            ,{
                "name": "Radio"
                , "url": STAR_DOMAIN
            }
                        ,{
                "name": "eSports"
                , "url": "//sbs."+DOMAIN
            }
            ,{
                "name": "Games"
                , "url": GMTV_NONE_SCHEME
            }
        ]
        , 1 : [] //list_m 순서 클래스 맞춰야해서 이렇게 둠
        , 2 : [
            {
                "name": "Items"
                , "url": ITEM_NONE_SCHEME + "/quickview.php"
            }
            ,{
                "name": "Star Balloons"
                , "url": ITEM_NONE_SCHEME + "/starballoon.php"
            }
        ]
        , 3 : [
            {
                "name": "Notice"
                , "url": GLOBAL_HELPAFREECA_NONE_SCHEME + "/"
            }
            ,{
                "name": "Ask 1:1"
                , "url": GLOBAL_HELPAFREECA_NONE_SCHEME + "/index.php?pt=question"
            }
        ]
    }
    ,"family" : {
         "list" : [
            {
                "name": "뽐(ffom)<em></em>"
                , "url": FFOM_DOMAIN
                , "menu_target" : "_blank"
                , "statistic_tag": "CLICK_SUB_FFOM"
            }
            ,{
                "name": "FreeCap<em></em>"
                , "url": "//freecap.afreecatv.com"
                , "menu_target" : "_blank"
                , "statistic_tag": "CLICK_SUB_STOCK"
            }
            ,{
                "name": "슬러거<em></em>"
                , "url": "http://slugger.afreecatv.com/index.nwz"
                , "menu_target" : "_blank"
                , "statistic_tag": "CLICK_SUB_SLUGGER"
            }
            ,{
                "name": "아프리카TV 샵<em></em>"
                , "url": SHOP_DOMAIN
                , "menu_target" : "_blank"
                , "statistic_tag": "CLICK_SUB_SHOP"
            }
        ]
    }
};
var szLogoutUrl = '';
var szLocale = 'en_US'
var locale_gnb = false;
var use_darkmode = false;
var oIntervalFn;
var dark_exception = false; //방송통계페이지가 setVodMainGnb 함수를 불러서 임시 변수
var oGnb = {
    setMainGnb: function(szType) {
        use_darkmode = true;
        var aGlobalGnb = [];

        aGlobalGnb.push('<div class="unit_area">');
        if (szLocale != 'ko_KR') {
            aGlobalGnb.push('<div class="notice">' + oGnb.getSpeechBubble() + '</div>');
        }
        if (szLocale == 'ko_KR') {
            aGlobalGnb.push('<button class="btn_studio" id="studioPlayKor" tip="방송하기"><span>프릭샷</span></button>');
        }
        aGlobalGnb.push('   <div id="logArea" class="log_area">');

        if (ticket) {
            aGlobalGnb.push('   <!-- 로그인 후-->');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('   <a href="' + GLOBAL_HELPAFREECA_NONE_SCHEME + '" class="ghelp" style="">Help Center<em></em></a>');
            }
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('   <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('<!-- 서비스메뉴 -->');
            aGlobalGnb.push('   <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('   <!-- 로그인 전 -->');
            aGlobalGnb.push('<span class="join_area"');
            var szPointUrl = '/Report/AfreecaBalloonList.asp';


            aGlobalGnb.push('   <span class="join_area">');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('   <a href="' + GLOBAL_HELPAFREECA_NONE_SCHEME + '" class="ghelp" style="">Help Center<em></em></a>');
            }else{
                aGlobalGnb.push('<button type="button" class="btn_more" id="btnMore" tip="설정">설정</button>');
                aGlobalGnb.push('<div class="mode_set_area" id="modeSetArea" style="display:none;">');
                aGlobalGnb.push('<div class="mode_set">');
                aGlobalGnb.push('<strong class="my_mode">어두운모드</strong>');
                aGlobalGnb.push('<input type="checkbox" id="modecheck">');
                aGlobalGnb.push('<label class="modecheck" for="modecheck"></label>');
                aGlobalGnb.push('<p>이 브라우저에만 적용됩니다</p>');
                aGlobalGnb.push('</div>');
                aGlobalGnb.push('<ul>');
                aGlobalGnb.push('<li><a href="' + ITEM_NONE_SCHEME + '/quickview.php" class="my_item" target="_blank">아이템</a></li>');
                aGlobalGnb.push('<li><a href="' + ITEM_NONE_SCHEME + '/starballoon.php" class="my_balloon" target="_blank">별풍선</a></li>');
                aGlobalGnb.push('<li><a href="//sotong.' + DOMAIN + '" class="my_sotong" target="_blank">소통센터</a></li>');
                aGlobalGnb.push('<li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php" class="my_custom" target="_blank">고객센터</a></li>');
                aGlobalGnb.push('<li><a href="' + AFREECA_NONE_SCHEME + '/afreeca_intro.htm" class="my_service" target="_blank">서비스 소개</a></li>');
                aGlobalGnb.push('</ul></div>');
            }
            aGlobalGnb.push('<a href="javascript:oGnb.goLogin();" class="login"><span>Log In</span></a>');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('       <a href="' + MEMBER_8108 + '/app/join.php" class="join"><span>Sign Up</span></a>');
            }
            aGlobalGnb.push('   </span>');
            aGlobalGnb.push('   <!-- //로그인 전 -->');
        }

        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        if (szLocale != 'ko_KR') {
            aGlobalGnb.push('<!-- 서비스메뉴 -->');
            aGlobalGnb.push('<div id="menuArea">');
            aGlobalGnb.push('   <h2 class="btn_menu"><a href="javascript:;" id="serviceMenu" title="Menu "><span>Service Menu</span></a></h2>');
            aGlobalGnb.push('   <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu(szType) + '</div>');
            aGlobalGnb.push('</div>');
            aGlobalGnb.push('<!-- //서비스메뉴 -->');
        }

        var szMainGnb = aGlobalGnb.join('');
        document.write(szMainGnb);

        this.setGlobalEvent();
    },
    setSubGnb: function(nMenu, bText, setClass) {
        var szClass = '';
        if (setClass != undefined && setClass != '' && setClass != null) {
            szClass = ' class="' + setClass + '" ';
        }

        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szLocation = window.location.toString().replace(/#(.*)/g, "");
        if (szLocation == ISSUE_80 + "/" || szLocation == ISSUE_80 + "/application.php") {
            var szSubGnb = '<div id="af_gnb_sub" ' + szClass + ' >' + aGlobalGnb.join('') + '</div>';
        } else {
            var szSearchHtml = oGnb.getSearchArea();
            var szPrivateHtml = '';

            if (typeof(oSubGnb.list) != 'undefined' && typeof(oSubGnb.title) != 'undefined') {
                szPrivateHtml = '<h3><a href="' + oSubGnb.title.url + '" target="_top""><img src="' + RES_AFREECA_NONE_SCHEME + '/images/gnb_new/' + oSubGnb.title.img + '.gif" alt="' + oSubGnb.title.name + '" /></a></h3>';

                if ((oSubGnb.title.img == undefined || oSubGnb.title.img == '') && bText) {
                    if (locale_gnb) {
                        var locale_name = "name_" + szLocale;
                        szPrivateHtml = '<h3 class="af_title"><a href="' + oSubGnb.title.url + '">' + oSubGnb.title[locale_name] + '</a></h3>';
                    } else {
                        szPrivateHtml = '<h3 class="af_title"><a href="' + oSubGnb.title.url + '">' + oSubGnb.title.name + '</a></h3>';
                    }
                }
                szPrivateHtml += oGnb.getPrivateGnb(nMenu, bText);
            } else if (typeof(oSubGnb.title) != 'undefined') {
                szPrivateHtml = '<h3><a href="' + oSubGnb.title[nMenu].url + '" target="_top"><img src="' + RES_AFREECA_NONE_SCHEME + '/images/gnb_new/' + oSubGnb.title[nMenu].img + '.gif" alt="' + oSubGnb.title[nMenu].name + '" /></a></h3>';

                if ((oSubGnb.title.img == undefined || oSubGnb.title.img == '') && bText) {
                    szPrivateHtml = '<h3 class="af_title"><a href="' + oSubGnb.title[nMenu].url + '">' + oSubGnb.title[nMenu].name + '</a></h3>';
                }
                szPrivateHtml += '<div class="cb"></div>';
            }
            var szSubGnb = '<div id="af_gnb_sub" ' + szClass + ' >' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div>';
        }

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    initMainCate: function() {
        var aCateHtml = [];
        var aSideCateHtml = [];
        var szCate = '';
        if(oMainCategory.result == 1)
        {
            aCateHtml.push('<ul class="service-list">');
            $.each(oMainCategory.main, function(i, oCategory) {
                if(oCategory.menu_type == "127") return;
                if(oCategory.menu_type == "6") { // 대메뉴
                    var szTempHtml = '<li class="" data-service="'+oCategory.menu_id+'">';
                    szTempHtml += '<h3><a href="'+oCategory.action_content+'" class="title-'+oCategory.menu_id.toUpperCase()+'">'+oCategory.menu_name+'</a><button type="button" class="btn-toggle">서브메뉴 토글</button></h3>';
                    szTempHtml += '<ul>';
                    $.each(oMainCategory.sub, function(idx, oSubList) {
                        if(idx == oCategory.menu_idx) {
                            $.each(oSubList, function(j, oSubCategory) {
                                if(oSubCategory.menu_type == "127") return;
                                szTarget = oSubCategory.action_type == "4" ? ' target="_blank"' : '';
                                // 그다움 구분자가 있는 경우
                                szLiClass = '';
                                if(typeof(oSubList[j+1]) != "undefined" && oSubList[j+1].menu_type == "127"){
                                    szLiClass = 'line-bottom';
                                }
                                // 메뉴 활성화 시키는 부분
                                szUrl = location.href.replace(/^http(?:s)?:/, '');
                                szUrl = szUrl.replace(/\/\/afreecatv.com/, '//www.afreecatv.com'); // 메인 예외처리
                                // VOD 예외처리
                                if(szUrl.match(/\/\/vod.afreecatv.com/) != null &&
                                    location.pathname.match('(GAME|MOBILEGAME|SPORTS|CAMTALK|EAT|PET|MUSIC|EDUCATION|LIFE|RADIO|STOCK|STREAMING|VR|ADULT|ETC)') != null){
                                    szUrl = VOD_NONE_SCHEME + '/ALL';
                                }
                                oSubCategory.action_content = oSubCategory.action_content.replace(/\/\/afreecatv.com/, '//www.afreecatv.com');
                                if(szUrl == oSubCategory.action_content) {
                                    szLiClass += ' on';
                                    szSubMenu = oSubCategory.menu_id;
                                }
                                szTempHtml += '<li class="'+szLiClass+'" id="'+oSubCategory.menu_id+'" name="'+ oSubCategory.menu_name +'" menu_idx="'+ oSubCategory.menu_idx +'" menu_type="'+oSubCategory.menu_type+'" action_type="'+ oSubCategory.action_type +'" action_content="'+ oSubCategory.action_content +'"><a href="'+oSubCategory.action_content+'"'+szTarget+'>'+oSubCategory.menu_name+'</a></li>';
                            });
                        }
                    });

                    szTempHtml += '</ul>';
                    szTempHtml += '</li>';
                    aCateHtml.push(szTempHtml);
                }
                if(oCategory.menu_type == "1") { // 메뉴
                    szTarget = oCategory.action_type == "4" ? ' target="_blank"' : '';
                    szTempHtml = '<li id="'+oCategory.menu_id+'"><a href="'+oCategory.action_content+'"'+szTarget+'>'+oCategory.menu_name+'</a></li>';
                    aSideCateHtml.push(szTempHtml);
                }
            });

            if(aSideCateHtml.length > 0) { // 메뉴
                aCateHtml.push('<li class="side-menu"><ul>');
                aCateHtml.push(aSideCateHtml.join(''));
                aCateHtml.push('</ul></li>');
            }

            aCateHtml.push('</ul>');

            if(szLang == "ko_KR" ) {
                aCateHtml.push('<div class="download-player">');
                aCateHtml.push('<a href="javascript:;" class="player_install" id="playerSetupKor">설치형 플레이어</a>');
                aCateHtml.push('</div>');
            }

            szCate = aCateHtml.join('');
            $('div#LNB-ScrollBox').html(szCate);       // scroll 충돌로 아래에서 생성
            /*.mCustomScrollbar({
                axis:"yx",
                theme:"minimal-dark",
                scrollInertia:100,
                scrollbarPosition:"inside"
            });*/
            //$('#sideArea').mousewheelStopPropagation();
        }

        if(typeof(szSubMenu) != "undefined") {
            $('#'+szSubMenu).closest('[data-service]').addClass('on');
        }

        var miniBar = new MiniBar($("#LNB-ScrollBox").get(0), {});

        var _wrap = document.getElementById("LNB-ScrollBox");
        var _target = _wrap.querySelectorAll(".btn-toggle");
        Array.prototype.forEach.call(_target, function(ele){
            ele.addEventListener("click", function(){
                if (this.parentNode.parentNode.classList.contains('on')){
                    this.parentNode.parentNode.classList.toggle("on");
                }else{
                    if(_wrap.querySelectorAll(".service-list > .on").length > 0){
                        _wrap.querySelector(".service-list > .on").classList.remove("on");
                    }
                    this.parentNode.parentNode.classList.add("on");
                }
                setTimeout(function() {
                    miniBar.update();
                }, 500);
            });
        });

        //VR(basecamp) 팝업창
        $(".player_vr, #vrPlayer_global").on('click', function() {
            $('#overlay').fadeIn('fast');
            $('#layer_vr').slideDown();
        });
        $("#layer_vr .btn_close, #overlay").on('click', function() {
            $('#overlay').fadeOut('fast');
            $('#layer_vr').slideUp();
        });
        $("#layer_vr .go_vrbs").on('click', function() {
            window.open('http://bj.afreecatv.com/afreecavr', '_blank');
        });
        // VR, 설치형 플레이어 실행
        $("#basecampPlay, #playerSetupKor").on('click', function() {
            var szId = this.id;
            requirejs(['service/plugins/player'], function(player) {
                var player = atv.player;
                var exePlayer = null;
                var log = null;

                switch(szId) {
                    case 'basecampPlay' : // VR
                        exePlayer = player.runBasecamp.bind(player);
                        break;
                    case 'playerSetupKor' : // 설치형 플레이어
                        exePlayer = player.runSetupPlayer.bind(player);
                        log = 'TRY_PLAYER1';
                        break;
                }
                exePlayer ? exePlayer('cast') : null;
                log ? callAU(log) : null;
            });
        });
    },
    setTotalSearchGnb: function(szKeywordTag) {
        //통합 검색 페이지용
        var aGlobalGnb = [];
        use_darkmode = true;
        
        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szLocation = window.location.toString().replace(/#(.*)/g, "");

        var szTotalSearchHtml = oGnb.getTotalSearchArea(szKeywordTag);
        var szMenuHtml = '<div id="menu">';
        szMenuHtml += ' <ul class="menu text">'
        szMenuHtml += '     <li class="" id="li_total"><a href="javascript:;" target="_top" onclick="afreeca.front.search.goPage(\'total\', \'\', \'ALL\', \'main\');">통합검색</a></li>';
        szMenuHtml += '     <li class="" id="li_broad"><a href="javascript:;" target="_top" onclick="afreeca.front.search.goPage(\'broad\', \'\', \'ALL\', \'main\');">생방송</a></li>';
        szMenuHtml += '     <li class="" id="li_video"><a href="javascript:;" target="_top" onclick="afreeca.front.search.goPage(\'video\', \'\', \'ALL\', \'main\');">VOD</a></li>';
        szMenuHtml += '     <li class="" id="li_bj"><a href="javascript:;" target="_top" onclick="afreeca.front.search.goPage(\'bj\', \'\', \'ALL\' , \'main\');">BJ</a></li>';
        szMenuHtml += ' </ul>';
        szMenuHtml += '</div>';
        szMenuHtml += '<div class="cb"></div>';

        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szTotalSearchHtml + szMenuHtml + '</div></div>';
        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setDashBoardGnb: function(nMenu, nAbroadType) {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szSearchHtml = oGnb.getSearchArea();
        var szPrivateHtml = '<h3 class="af_title"><a href="' + DASHBOARD + '">Dashboard</a></h3>';

        if (szLocale != 'ko_KR' && nAbroadType != '1') {
            szPrivateHtml += '<div id="menu">';
            szPrivateHtml += '  <ul class="menu text">';
            szPrivateHtml += '    <li class="' + ([2, 3].indexOf(nMenu) === -1 ? 'on' : '') + '">';
            szPrivateHtml += '    <a href="' + DASHBOARD + '">Dashboard</a></li>';
            szPrivateHtml += '    <li class="' + (nMenu == 2 ? 'on' : '') + '">';
            szPrivateHtml += '    <a href="' + DASHBOARD + '/manager.php">Manager</a></li>';
            szPrivateHtml += '    <li class="' + (nMenu == 3 ? 'on' : '') + '">';
            szPrivateHtml += '    <a href="' + DASHBOARD + '/blacklist.php">Black List</a></li>';
            szPrivateHtml += '  </ul>';
            szPrivateHtml += '</div>';
        }
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setAquaGnb: function(nMenu, nAbroadType) {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szSearchHtml = oGnb.getSearchArea();
        var szPrivateHtml = '<h3 class="af_title"><a href="' + AQUA_DOMAIN + '">전자여성</a></h3>';

        szPrivateHtml += '<div id="menu">';
        szPrivateHtml += '  <ul class="menu text">';
        szPrivateHtml += '    <li class="' + ([2, 3, 4, 5].indexOf(nMenu) === -1 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + AQUA_DOMAIN + '">전자여성이란?</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 2 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + AQUA_DOMAIN + '/?szWork=chat">채팅</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 3 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + AQUA_DOMAIN + '/?szWork=notice">Notice</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 4 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + AQUA_DOMAIN + '/?szWork=goal">목표 그래프</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 5 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + AQUA_DOMAIN + '/?szWork=banner">배너</a></li>';
        szPrivateHtml += '  </ul>';
        szPrivateHtml += '</div>';
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setBalloonGnb: function(nMenu, nSubMenu) {
        nSubMenu = nSubMenu || '1';

        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szOnClass1 = '';
        var szOnClass2 = '';
        var szOnClass3 = '';
        if (nMenu == 1) {
            szOnClass1 = 'on';
        } else if (nMenu == 2) {
            szOnClass2 = 'on';
        } else {
            szOnClass3 = 'on';
        }

        var szDepClass = '';
        var szOnSubClass1 = '';
        var szOnSubClass2 = '';
        if (szOnClass2 == 'on' || szOnClass3 == 'on') {
            szDepClass = 'dep2';
        }
        if (nSubMenu == 1) {
            szOnSubClass1 = 'on';
        } else if (nSubMenu == 2) {
            szOnSubClass2 = 'on';
        }

        var szSearchHtml = oGnb.getSearchArea();
        var szPointUrl = '/Report/AfreecaBalloonList.asp';
        var szPrivateHtml = '<h3 class="af_title"><a href="' + ITEM_NONE_SCHEME + '/starballoon.php">Gift·Donation</a></h3>';
        szPrivateHtml += '<div id="menu">';
        szPrivateHtml += '  <ul class="menu text ' + szDepClass + '">';
        szPrivateHtml += '    <li class="' + szOnClass1 + '">';
        szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/starballoon.php">Star Balloons</a></li>';
        if (szLocale == 'ko_KR') {
            szPrivateHtml += '    <li class="' + szOnClass3 + '">';
            szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/subscription.php">구독</a>';
            if (szOnClass3 == 'on') {
                szPrivateHtml += '      <ul class="sub">';
                szPrivateHtml += '        <li class="' + szOnSubClass1 + '"><a href="' + ITEM_NONE_SCHEME + '/subscription.php">구독하기</a></li>';
                szPrivateHtml += '        <li class="' + szOnSubClass2 + '"><a href="' + ITEM_NONE_SCHEME + '/signature_emoticon.php">시그니처 이모티콘</a></li>';
                szPrivateHtml += '      </ul>';
            }
            szPrivateHtml += '    </li>';
        }
        szPrivateHtml += '    <li class="' + szOnClass2 + '">';
        szPrivateHtml += '    <a href="' + POINT_SSL + szPointUrl + '">My Gift·Donation Info</a>';
        if (szOnClass2 == 'on') {
            szPrivateHtml += '      <ul class="sub">';
            szPrivateHtml += '        <li class="' + szOnSubClass1 + '"><a href="' + POINT_SSL + szPointUrl + '">Star Balloon Info</a></li>';
            if (szLocale == 'ko_KR') {
                szPrivateHtml += '        <li class="' + szOnSubClass2 + '"><a href="' + POINT_SSL + '/Subscription/SubscriptionList.asp">구독 정보</a></li>';
            }
            szPrivateHtml += '      </ul>';
        }
        szPrivateHtml += '    </li>';
        szPrivateHtml += '  </ul>';
        szPrivateHtml += '</div>';
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setItemGnb: function(nMenu) {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szSearchHtml = oGnb.getSearchArea();
        var szPrivateHtml = '<h3 class="af_title"><a href="' + ITEM_NONE_SCHEME + '/quickview.php">Items</a></h3>';
        szPrivateHtml += '<div id="menu">';
        szPrivateHtml += '  <ul class="menu text">';
        szPrivateHtml += '    <li class="' + ([2, 3, 4, 6].indexOf(nMenu) === -1 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/quickview.php">QuickView</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 2 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/gold.php">Gold</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 3 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/sticker.php">Sticker</a></li>';
        if (szLocale == 'ko_KR') {
            szPrivateHtml += '    <li class="' + (nMenu == 4 ? 'on' : '') + '">';
            szPrivateHtml += '    <a href="' + ITEM_NONE_SCHEME + '/choco.php">초콜릿</a></li>';
        }
        szPrivateHtml += '    <li class="' + (nMenu == 6 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + POINT_SSL + '/report/AfreecaUseList.asp">My Items</a></li>';
        szPrivateHtml += '  </ul>';
        szPrivateHtml += '</div>';
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setTokenGnb: function(nMenu) {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szSearchHtml = oGnb.getSearchArea();
        var szPrivateHtml = '<h3 class="af_title"><a href="' + TOKEN_DOMAIN + '">토큰</a></h3>';
        szPrivateHtml += '<div id="menu">';
        szPrivateHtml += '  <ul class="menu text">';
        szPrivateHtml += '    <li class="' + ([2].indexOf(nMenu) === -1 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + TOKEN_DOMAIN + '">상품교환</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 2 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + TOKEN_DOMAIN + '/index.php?page=my_list">내 상품정보</a></li>';
        szPrivateHtml += '  </ul>';
        szPrivateHtml += '</div>';
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },
    setVodMainGnb: function() {
        var aGlobalGnb = [];
        use_darkmode = true;

        aGlobalGnb.push('<div class="unit_area">');
        if (szLocale == 'ko_KR') {
            aGlobalGnb.push('<a href="' + STBBS_NONE_SCHEME + '/vodupload/index.php" class="btn_upload" tip="VOD 업로드"><span>VOD 업로드</span></a>');
        }
        else{
            aGlobalGnb.push('<div class="notice">' + oGnb.getSpeechBubble() + '</div>');
        }
        aGlobalGnb.push('   <div id="logArea" class="log_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('   <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('   <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('   <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('   <!-- 로그인 전 -->');
            aGlobalGnb.push('   <span class="join_area">');
            if (szLocale == 'ko_KR') {
                aGlobalGnb.push('   <button type="button" class="btn_more" tip="설정" id="btnMore">설정</button>');
                aGlobalGnb.push('   <div class="mode_set_area" id="modeSetArea" style="display:none;">');
                aGlobalGnb.push('       <div class="mode_set">');
                aGlobalGnb.push('           <strong class="my_mode">어두운모드</strong>');
                aGlobalGnb.push('           <input type="checkbox" id="modecheck">');
                aGlobalGnb.push('           <label class="modecheck" for="modecheck"></label>');
                aGlobalGnb.push('           <p>이 브라우저에만 적용됩니다</p>');
                aGlobalGnb.push('       </div>');
                aGlobalGnb.push('    <ul>');
                aGlobalGnb.push('        <li><a href="' + ITEM_NONE_SCHEME + '/quickview.php" class="my_item" target="_blank">아이템</a></li>');
                aGlobalGnb.push('        <li><a href="' + ITEM_NONE_SCHEME + '/starballoon.php" class="my_balloon" target="_blank">별풍선</a></li>');
                aGlobalGnb.push('        <li><a href="//sotong.' + DOMAIN + '" class="my_sotong" target="_blank">소통센터</a></li>');
                aGlobalGnb.push('        <li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php" class="my_custom" target="_blank">고객센터</a></li>');
                aGlobalGnb.push('        <li><a href="' + AFREECA_NONE_SCHEME + '/afreeca_intro.htm" class="my_service" target="_blank">서비스 소개</a></li>');
                aGlobalGnb.push('    </ul>');
                aGlobalGnb.push('   </div>');
            }
            aGlobalGnb.push('       <a href="javascript:oGnb.goLogin();" class="login" ><span  >Log In</span></a>');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('       <a href="' + MEMBER_8108 + '/app/join.php" class="join"><span  >Sign Up</span></a>');
            }
            aGlobalGnb.push('   </span>');
            aGlobalGnb.push('   <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        aGlobalGnb.push('<div class="menu_bar">');
        aGlobalGnb.push('   <h2>Go to Menu</h2>');
        aGlobalGnb.push('   <ul class="list_a">');
        aGlobalGnb.push('   <li><a href="' + AFEVENT2_NONE_SCHEME + '/app/af_episode/index.php">Trending</a></li>');
        aGlobalGnb.push('   </ul>');
        aGlobalGnb.push('   <ul class="list_b">');
        aGlobalGnb.push('   <li><a href="' + ITEM_NONE_SCHEME + '/quickview.php">Items</a></li>');
        aGlobalGnb.push('   <li><a href="' + ITEM_NONE_SCHEME + '/starballoon.php">Star Balloons</a></li>');
        aGlobalGnb.push('   <li><a href="' + AFWBBS1_NONE_SCHEME + '/app/index.php?board=notice" >Notice</a></li>');
        aGlobalGnb.push('   <li><a href="//sotong.' + DOMAIN + '">소통센터</a></li>');
        aGlobalGnb.push('   <li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php"  >Help</a></li>');
        aGlobalGnb.push('   </ul>');
        aGlobalGnb.push('</div>');
        aGlobalGnb.push('<!-- //바로가기 메뉴 -->');

        aGlobalGnb.push('<!-- 서비스메뉴 -->');
        aGlobalGnb.push('<div id="menuArea">');
        aGlobalGnb.push('   <h2 class="btn_menu"><a href="javascript:;" id="serviceMenu" tip="Menu "><span>Service Menu</span></a></h2>');

        aGlobalGnb.push('   <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('') + '</div>');
        aGlobalGnb.push('</div>');
        aGlobalGnb.push('<!-- //서비스메뉴 -->');

        var szMainGnb = aGlobalGnb.join('');
        document.write(szMainGnb);

        this.setGlobalEvent();
    },
    setRankGnb: function() {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div class="unit_area">');
        aGlobalGnb.push('<div class="notice">' + oGnb.getSpeechBubble() + '</div>');
        aGlobalGnb.push('   <div id="logArea" class="log_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('   <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('   <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('   <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('   <!-- 로그인 전 -->');
            aGlobalGnb.push('   <span class="join_area">');
            aGlobalGnb.push('       <a href="javascript:oGnb.goLogin();" class="login" ><span  >Log In</span></a>');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('       <a href="' + MEMBER_8108 + '/app/join.php" class="join"><span  >Sign Up</span></a>');
            }
            aGlobalGnb.push('   </span>');
            aGlobalGnb.push('   <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        aGlobalGnb.push('<!-- 서비스메뉴 -->');
        aGlobalGnb.push('<div id="menuArea">');
        aGlobalGnb.push('   <h2 class="btn_menu"><a href="javascript:;" id="serviceMenu" title="Menu "><span>Service Menu</span></a></h2>');
        aGlobalGnb.push('   <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('') + '</div>');
        aGlobalGnb.push('</div>');
        aGlobalGnb.push('<!-- //서비스메뉴 -->');

        var szMainGnb = aGlobalGnb.join('');
        document.write(szMainGnb);

        this.setGlobalEvent();
    },
    setSportsMainGnb: function() {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div class="unit_area">');
        aGlobalGnb.push('<div class="notice">' + oGnb.getSpeechBubble() + '</div>');
        aGlobalGnb.push('   <div id="logArea" class="log_area">');

        var szSearchHtml = oGnb.getSearchArea();

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('   <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('   <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('   <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('   <!-- 로그인 전 -->');
            aGlobalGnb.push('   <span class="join_area">');
            aGlobalGnb.push('       <a href="javascript:oGnb.goLogin();" class="login" ><span  >Log In</span></a>');
            if ('en_US' != 'ko_KR') {
                aGlobalGnb.push('       <a href="' + MEMBER_8108 + '/app/join.php" class="join"><span  >Sign Up</span></a>');
            }
            aGlobalGnb.push('   </span>');
            aGlobalGnb.push('   <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        aGlobalGnb.push('<div class="menu_bar">');
        aGlobalGnb.push('   <h2>Go to Menu</h2>');
        aGlobalGnb.push('   <ul class="list_a">');
        aGlobalGnb.push('   <li><a href="' + AFREECA_NONE_SCHEME + '/?hash=sports" target="top">스포츠LIVE</a></li>');
        aGlobalGnb.push('   <li><a href="' + AFEVENT2_NONE_SCHEME + '/app/rank/index.php?szWhich=sports_broadcast" target="top">스포츠중계 랭킹</a></li>');
        aGlobalGnb.push('   <li><a href="' + AFEVENT2_NONE_SCHEME + '/app/rank/index.php?szWhich=sports_general" target="top">스포츠일반 랭킹</a></li>');
        aGlobalGnb.push('   </ul>');
        aGlobalGnb.push('   <ul class="list_b">');
        aGlobalGnb.push('   <li><a href="' + ITEM_NONE_SCHEME + '/quickview.php">Items</a></li>');
        aGlobalGnb.push('   <li><a href="' + ITEM_NONE_SCHEME + '/starballoon.php">Star Balloons</a></li>');
        aGlobalGnb.push('   <li><a href="' + AFWBBS1_NONE_SCHEME + '/app/index.php?board=notice" >Notice</a></li>');
        aGlobalGnb.push('   <li><a href="//sotong.' + DOMAIN + '">소통센터</a></li>');
        aGlobalGnb.push('   <li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php"  >Help</a></li>');
        aGlobalGnb.push('   </ul>');
        aGlobalGnb.push('</div>');
        aGlobalGnb.push('<!-- //바로가기 메뉴 -->');

        aGlobalGnb.push('<!-- 서비스메뉴 -->');
        aGlobalGnb.push('<div id="menuArea">');
        aGlobalGnb.push('   <h2 class="btn_menu"><a href="javascript:;" id="serviceMenu" title="Menu "><span>Service Menu</span></a></h2>');
        aGlobalGnb.push('   <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('') + '</div>');
        aGlobalGnb.push('</div>');
        aGlobalGnb.push('<!-- //서비스메뉴 -->');

        var szSearchHtml = oGnb.getSportsSearchArea();
        var szSportsGnb = szSearchHtml + aGlobalGnb.join('');
        //var szSportsGnb = aGlobalGnb.join('');
        document.write(szSportsGnb);

        this.setGlobalEvent();
    },
    setMyPointGnb: function(nMenu) {
        var aGlobalGnb = [];

        aGlobalGnb.push('<div id="gArea">');
        aGlobalGnb.push('   <h1><a href="' + AFREECA_NONE_SCHEME + '" target="_top">afreecaTV</a></h1>');
        aGlobalGnb.push('   <div class="unit_area">');
        aGlobalGnb.push('       <div id="logArea" class="login_area">');

        if (ticket) {
            // 알림 리스트
            this.getNotificationList(aGlobalGnb);
            aGlobalGnb.push('           <!-- 로그인 후-->');
            var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
            aGlobalGnb.push('   <a href="javascript:;" class="nickname">' + szNoteNew + this.getNicknameEntity(oPrivate.CHANNEL.LOGIN_NICK) + '<em></em></a>');
            aGlobalGnb.push('           <div id="userArea" class="user_area" style="display:none;">' + oGnb.getMyLayer() + '</div>');
            aGlobalGnb.push('       <!-- //로그인 후 -->');
        } else {
            aGlobalGnb.push('           <!-- 로그인 전 -->');
            aGlobalGnb.push('           <span class="join_area">');
            aGlobalGnb.push('               <a href="javascript:oGnb.goLogin();" class="login">Log In</a>');
            aGlobalGnb.push('           </span>');
            aGlobalGnb.push('           <!-- //로그인 전 -->');
        }
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- 서비스메뉴 -->');
        aGlobalGnb.push('       <div id="menuArea">');
        aGlobalGnb.push('           <p class="btn_menu"><a href="javascript:;" id="serviceMenu"  title="Menu "><span>Service Menu</span></a></p>');
        aGlobalGnb.push('           <div id="subMenu" class="menu_area" style="display:none;">' + oGnb.getLayerMenu('sub') + '</div>');
        aGlobalGnb.push('       </div>');
        aGlobalGnb.push('       <!-- //서비스메뉴 -->');
        aGlobalGnb.push('   </div>');
        aGlobalGnb.push('</div>');

        var szSearchHtml = oGnb.getSearchArea();
        var szPrivateHtml = '<h3 class="af_title"><a href="' + MYPOINT_DOMAIN + '">포인트</a></h3>';
        szPrivateHtml += '<div id="menu">';
        szPrivateHtml += '  <ul class="menu text">';
        szPrivateHtml += '    <li class="' + ([2].indexOf(nMenu) === -1 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + MYPOINT_DOMAIN + '">포인트 안내</a></li>';
        szPrivateHtml += '    <li class="' + (nMenu == 2 ? 'on' : '') + '">';
        szPrivateHtml += '    <a href="' + MYPOINT_DOMAIN + '/index.php?szWork=status">내 포인트 현황</a></li>';
        szPrivateHtml += '  </ul>';
        szPrivateHtml += '</div>';
        szPrivateHtml += '<div class="cb"></div>';
        var szSubGnb = '<div id="af_gnb_sub">' + aGlobalGnb.join('') + '<div class="gnb_wrap">' + szSearchHtml + szPrivateHtml + '</div></div>';

        document.write(szSubGnb);

        this.setGlobalEvent();
    },    
    setGlobalEvent: function() {
        $('div#userArea a.logout').click(function() {
            oGnb.goLogout(szLogoutUrl);
        });

        $('#userArea, #subMenu').click(function(e) {
            e.stopPropagation();
        });

        $('#logArea .nickname').click(function(event) {
            $("#subMenu").fadeOut(100);
            $("#userArea").fadeToggle(100);
            if (typeof($oFeed) != "undefined") {
                $oFeed.event.root.FeedHide(event);
            }
            return false;
        });

        $('#menuArea .btn_menu').click(function(event) {
            $("#userArea").fadeOut(100);
            $("#subMenu").fadeToggle(100);
            if (typeof($oFeed) != "undefined") {
                $oFeed.event.root.FeedHide(event);
            }
            return false;
        });

        $(document).click(function(event) {
            $('#userArea, #subMenu').fadeOut(100);

            if (typeof($oFeed) != "undefined") {
                $oFeed.event.root.FeedHide(event);
            }
            if(!$('#modeSetArea').has(event.target).length){
                $('#modeSetArea').fadeOut(100);
            }

        });

        $('body').on('change', '#modecheck', function() {
            if($('#modecheck').is(":checked")){
                oGnb.checkDarkModeSet('dark');
            }else{
                oGnb.checkDarkModeSet('');
            }
            oGnb.checkDarkModeApply();
        });

        if($('#modecheck').length == 1) {
            oGnb.checkDarkModeApply();
        }

        $("#btnMore").click(function(){
            $("#modeSetArea").stop().fadeToggle(100);
            return false;
        });
    },
    getSearchArea: function() {
        var aSearchGnb = [];
        var szKeywordTag = "$('input[name=szKeyword]').val()";

        aSearchGnb.push('<!-- search -->');
        aSearchGnb.push('   <fieldset class="af_search_field">');
        aSearchGnb.push('   <legend>검색 입력 폼</legend>');
        aSearchGnb.push('   <div class="af_search">');
        aSearchGnb.push('   <form name="oSearchForm" method="post" target="_top" accept-charset="utf-8">');
        aSearchGnb.push('   <input type="hidden" id="szSearchType" name="szSearchType" value="total">');
        aSearchGnb.push('   <input type="hidden" id="szStype" name="szStype" value="">');
        aSearchGnb.push('   <input type="hidden" id="szLoaction" name="szLocation" value="etc">');
        aSearchGnb.push('       <div class="searchBox">');
        aSearchGnb.push('           <input type="text" class="search" id="szKeyword" name="szKeyword" onKeyPress="if (event.keyCode==34 || event.keyCode==39 || event.keyCode==46 || event.keyCode==41 || event.keyCode==40 ) event.returnValue = false;if(event.keyCode == 13){afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');}" onkeyup="afreeca.front.keyword.checkKeyUpCommon(event);" autocomplete="off" onblur="afreeca.front.keyword.setVisibleAutoSearch(false);" onkeydown="if(!afreeca.front.keyword.checkKeyDownCommon(event)){return false;}" onclick="afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');afreeca.front.keyword.setClickCommon(event);" title="검색어 입력"/><button onclick="checkSearch(oSearchForm);afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');">Search</button>');
        aSearchGnb.push('           <input type="hidden" id="szKeywordhidden" name="szKeywordhidden" />');
        aSearchGnb.push('           <div class="afsub_sch">');
        aSearchGnb.push('               <!-- 자동검색어 --><div class="sear_auto" id="divSearchAuto" style="display:none;"></div>');
        aSearchGnb.push('               <!-- 최근 검색어 --><div class="mysch" style="display:none;"></div>');
        aSearchGnb.push('               <!-- 실시간 인기 검색어 --><div class="livesch" style="display:none;"></div>');
        aSearchGnb.push('           </div>');
        aSearchGnb.push('       </div>');
        aSearchGnb.push('   </form>');
        aSearchGnb.push('   </div>');
        aSearchGnb.push('   </fieldset>');
        aSearchGnb.push('<!-- //search -->');

        return aSearchGnb.join('');
    },
    getSportsSearchArea: function(szKeywordTag) {
        var aSearchGnb = [];
        var szKeywordTag = "$('input[name=szKeyword]').val()";

        aSearchGnb.push('<!-- search -->');
        aSearchGnb.push('<div class="search_area_t">');
        aSearchGnb.push('   <fieldset>');
        aSearchGnb.push('       <legend>검색</legend>');
        aSearchGnb.push('       <form name="oSearchForm" method="post" target="_top" accept-charset="utf-8" action="' + AFREECA_NONE_SCHEME + '/total_search.html">');
        aSearchGnb.push('           <input type="hidden" id="szSearchType" name="szSearchType" value="total">');
        aSearchGnb.push('           <input type="hidden" id="szStype" name="szStype" value="">');
        aSearchGnb.push('           <input type="hidden" id="szLoaction" name="szLocation" value="etc">');
        aSearchGnb.push('           <!-- 검색창 -->');
        aSearchGnb.push('           <div class="search_bar">');
        aSearchGnb.push('               <input type="text" class="search" id="szKeyword" name="szKeyword" onKeyPress="if (event.keyCode==34 || event.keyCode==39 || event.keyCode==46 || event.keyCode==41 || event.keyCode==40 ) event.returnValue = false;if(event.keyCode == 13){afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');}" onkeyup="afreeca.front.keyword.checkKeyUpCommon(event);" autocomplete="off" onblur="afreeca.front.keyword.setVisibleAutoSearch(false);" onkeydown="if(!afreeca.front.keyword.checkKeyDownCommon(event)){return false;}" onclick="afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');afreeca.front.keyword.setClickCommon(event);" title="검색어 입력"/>');
        aSearchGnb.push('               <input type="hidden" id="szKeywordhidden" name="szKeywordhidden" />');
        aSearchGnb.push('               <button type="button" class="btn_search" onclick="checkSearch(oSearchForm);afreeca.front.keyword.setKeywordCookie(' + szKeywordTag + ');">');
        aSearchGnb.push('                   <span class="ir">Search</span>');
        aSearchGnb.push('               </button>');
        aSearchGnb.push('               <div class="search_box">');
        aSearchGnb.push('                   <!-- 자동검색어 --><div class="sear_auto" id="divSearchAuto" style="display:none;"></div>');
        aSearchGnb.push('                   <!-- 최근 검색어 --><div class="mysch" style="display:none;"></div>');
        aSearchGnb.push('                   <!-- 실시간 인기 검색어 --><div class="livesch" style="display:none;"></div>');
        aSearchGnb.push('               </div>');
        aSearchGnb.push('            </div>');
        aSearchGnb.push('       </form>');
        aSearchGnb.push('   </fieldset>');
        aSearchGnb.push('</div>');
        aSearchGnb.push('<!-- //search -->');

        return aSearchGnb.join('');
    },
    getTotalSearchArea: function(szKeywordTag) {
        var aSearchGnb = [];

        aSearchGnb.push('<!-- 검색창 -->');
        aSearchGnb.push('<div class="search_area">');
        aSearchGnb.push('   <h3><a href="/total_search.html">검색</a></h3>');
        aSearchGnb.push('   <fieldset>');
        aSearchGnb.push('       <legend>검색 폼</legend>');
        aSearchGnb.push('       <input type="text" name="szKeyword" id="szKeyword" title="검색어 입력" class="search_bar" onKeyPress="if (event.keyCode==13){afreeca.front.keyword.setNonLayerSearch();afreeca.front.keyword.setKeywordCookie($(\'input[name=szKeyword]\').val());afreeca.front.keyword.getAutoDataCheck();afreeca.front.search.goPage();event.returnValue=false;} if (event.keyCode==34 || event.keyCode==39 || event.keyCode==46 || event.keyCode==41 || event.keyCode==40) event.returnValue = false;" value="' + szKeywordTag + '" maxlength="100" onkeyup="afreeca.front.keyword.checkKeyUpWeb(event);" onkeydown="if(!afreeca.front.keyword.checkKeyDownWeb(event)){return false;}" autocomplete="off" onblur="afreeca.front.keyword.setVisibleAutoSearch(false);" onclick="afreeca.front.keyword.setClickWeb(event);"/>');
        aSearchGnb.push('       <a href="javascript:;" onclick="afreeca.front.keyword.setKeywordCookie($(\'input[name=szKeyword]\').val());afreeca.front.keyword.getAutoDataCheck();afreeca.front.search.goPage();" title="검색" class="btn_search">검색</a>');
        aSearchGnb.push('       <!-- 140307 자동검색어 --><div class="sear_auto" id="divSearchAuto" style="display:none;"></div>');
        aSearchGnb.push('       <!-- //최근 검색어 --><div class="mysch" style="display:none;"></div>');
        aSearchGnb.push('       <!-- //실시간 검색어 --><div class="livesch" style="display:none;"></div>');
        aSearchGnb.push('   </fieldset>');
        aSearchGnb.push('</div>');
        aSearchGnb.push('<!-- //검색창 -->');

        return aSearchGnb.join('');
    },
    getPrivateGnb: function(nMenu, bText) {
        var aPrivateGnb = [];

        aPrivateGnb.push('<div id="menu">');

        if (bText) {
            if (nMenu >= 0 && typeof oSubGnb.list[nMenu] != 'undefined' && typeof oSubGnb.list[nMenu].sub_menu != 'undefined') {
                aPrivateGnb.push('  <ul class="menu text dep2">');
            } else {
                aPrivateGnb.push('  <ul class="menu text">');
            }
        } else {
            aPrivateGnb.push('  <ul class="menu">');
        }


        var szLocation = window.location.toString().replace(/#(.*)/g, "");
        $.each(oSubGnb.list, function(i, oMenu) {
            if (typeof(oMenu.active) != 'undefined') {
                if (oMenu.active === false) return true; //서비스 중지된 것들 노출 제외
            }
            var szSubPrivateGnb = '';
            var szOnClass = '';

            var bCurrent = false;

            if (szLocation == oMenu.url) {
                bCurrent = true;
            }

            if (bCurrent || i == nMenu) {
                oMenu.img = oMenu.img + '_on';

                if (typeof(oMenu.sub_menu) != 'undefined') {
                    szOnClass = 'on ';
                    szSubPrivateGnb = oGnb.getSubPrivateGnb(nMenu, bText);
                }

                if (!szOnClass && bText) {
                    szOnClass = "on";
                }
            }

            if (typeof(oMenu.menu_class) != 'undefined') {
                aPrivateGnb.push('<li class="' + szOnClass + oMenu.menu_class + '">');
            } else {
                aPrivateGnb.push('<li class="' + szOnClass + '">');
            }

            var szTarget = '_top';
            if (typeof(oMenu.menu_target) != 'undefined') {
                szTarget = oMenu.menu_target;
            }

            var szIcon = '';
            if (typeof(oMenu.icon) != 'undefined') {
                szIcon = oMenu.icon;
            }

            if (bText) {
                if (locale_gnb) {
                    var locale_name = "name_" + szLocale;
                    aPrivateGnb.push('<a href="' + oMenu.url + '" target="' + szTarget + '">' + oMenu[locale_name] + '</a>' + szIcon + szSubPrivateGnb + '</li>');
                } else {
                    aPrivateGnb.push('<a href="' + oMenu.url + '" target="' + szTarget + '">' + oMenu.name + '</a>' + szIcon + szSubPrivateGnb + '</li>');
                }
            } else {
                aPrivateGnb.push('<a href="' + oMenu.url + '" target="' + szTarget + '"><img alt="' + oMenu.name + '" src="' + RES_AFREECA + '/images/gnb_new/' + oMenu.img + '.gif"></a>' + szIcon + szSubPrivateGnb + '</li>');
            }
        });

        aPrivateGnb.push('  </ul>');
        aPrivateGnb.push('</div>');
        aPrivateGnb.push('<div class="cb"></div>');

        return aPrivateGnb.join('');
    },
    getSubPrivateGnb: function(nMenu, bText) {
        var aSubPrivateGnb = [];
        aSubPrivateGnb.push('<ul class="sub">');

        var maxMenuSize = 0;
        var selectSubMenu = 0;
        var szLocation = window.location.toString().replace(/#(.*)/g, "");
        if (szLocation.indexOf('.sports.' + DOMAIN) > 1) {
            szLocation = location.href.split('?')[0];

            if (document.URL.toString().match('control')) {
                szLocation = document.URL;
            }

            if (szLocation.indexOf('view') > 1) {
                szLocation = szLocation.replace(/view/ig, 'highlight');
            }
        }

        if (szLocation.indexOf('ani.' + DOMAIN) > 1) {
            szLocation = szLocation.replace(/view/ig, 'lists');
        }

        $(oSubGnb.list[nMenu].sub_menu).each(function(i, oSubMenu) {
            if (szLocation.indexOf(oSubMenu.url) > -1 && maxMenuSize < oSubMenu.url.length) {
                maxMenuSize = oSubMenu.url.length;
                selectSubMenu = i;
            }
        });

        $(oSubGnb.list[nMenu].sub_menu).each(function(i, oSubMenu) {
            if (typeof(oSubMenu.active) != 'undefined') {
                if (oSubMenu.active === false) return true; //서비스 중지된 것들 노출 제외
            }

            var szClass = '';
            if (i == selectSubMenu) {
                oSubMenu.img = oSubMenu.img + '_on';
                szClass = 'on';
            }

            var szTarget = '_top';
            if (typeof(oSubMenu.menu_target) != 'undefined') {
                szTarget = oSubMenu.menu_target;
            }

            aSubPrivateGnb.push('<li class="' + szClass + '">');
            if (bText) {
                if (locale_gnb) {
                    var locale_name = "name_" + szLocale;
                    aSubPrivateGnb.push('   <a href="' + oSubMenu.url + '" target="' + szTarget + '">' + oSubMenu[locale_name] + '</a>');
                } else {
                    aSubPrivateGnb.push('   <a href="' + oSubMenu.url + '" target="' + szTarget + '">' + oSubMenu.name + '</a>');
                }
            } else {
                aSubPrivateGnb.push('   <a href="' + oSubMenu.url + '" target="' + szTarget + '"><img src="' + RES_AFREECA + '/images/gnb_new/' + oSubMenu.img + '.gif" alt="' + oSubMenu.name + '"></a>');
            }
            aSubPrivateGnb.push('</li>');
        });

        aSubPrivateGnb.push('</ul>');

        return aSubPrivateGnb.join('');
    },
    setMainEmailConfirm: function() {
        //해외 계정에서 로그인 되어 있고, 인증이 안된 유저에 대해서 노출 하는 레이어
        if (ticket) {
            //성공 했거나, 아니면 닫기 버튼을 누르면 쿠키에 하루동안 노출 되지 않음
            if (this.isEmailConfirm() == 1) return;
            var aEmailConfirm = [];

            //해외 계정이고 미인증 유저
            if (oPrivate.CHANNEL.LOGIN_CHK == 2) {
                aEmailConfirm.push('<div id="email_confirm_layer" class="email_confirm on">');
                aEmailConfirm.push(' <span></span>');
                aEmailConfirm.push(' <div>');
                aEmailConfirm.push('     <button id="email_confirm_close" type="button">close</button>');
                aEmailConfirm.push('     <p>Please verify your email address to access all of AfreecaTV\'s features. Check <em>' + oPrivate.CHANNEL.LOGIN_EMAIL + '</em></p>');
                aEmailConfirm.push('     <button id="sendEmail" type="button">Send verification email</button>');
                aEmailConfirm.push(' </div>');
                aEmailConfirm.push('</div>');
                var szMainEmailConfirm = aEmailConfirm.join('');
                document.write(szMainEmailConfirm);

                $(function() {
                    $(function() {
                            $('#email_confirm_close').on('click', function() {
                                $('#email_confirm_layer').toggleClass('on');
                                setCookie('isEmailConfirm', 1, DOMAIN, 1);
                            })
                        }),
                        $("#sendEmail").click(function(e) {
                            $.ajax({
                                url: "https://member.afreecatv.com/app/entry.php",
                                type: "POST",
                                xhrFields: { withCredentials: true },
                                data: {
                                    cmd: 'EMAIL_AUTH_CONFIRM',
                                    uid: oPrivate.CHANNEL.LOGIN_ID,
                                    email: oPrivate.CHANNEL.LOGIN_EMAIL
                                },
                                dataType: "json",
                                success: function(data, textStatus, jqXHR) {
                                    if (data.RESULT == 1) {
                                        $('#email_confirm_layer').toggleClass('on');
                                        setCookie('isEmailConfirm', 1, DOMAIN, 1);
                                    } else {
                                        alert(data.MSG);
                                        return;
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    //alert("Error btnOk - " + textStatus);
                                }
                            });
                        })
                });
            }
        }
    },
    getMyLayer: function() {
        var aMyLayer = [];
        var szPointUrl = '/Report/AfreecaBalloonList.asp';

        aMyLayer.push('<span class="arrw"></span>');
        aMyLayer.push('<div class="btn_set1">');
        if (Number(oPrivate.CHANNEL.SET_HOME)) {
            aMyLayer.push(' <a href="' + BJ_AFREECA + '/' + oPrivate.CHANNEL.LOGIN_ID + '" target="_blank" class="mybs"><em>Blog</em></a>');
        } else {
            aMyLayer.push(' <a href="' + BJ_AFREECA + '/' + oPrivate.CHANNEL.LOGIN_ID + '" target="_blank" class="mybs"><em>HOME</em></a>');
        }

        aMyLayer.push(' <a href="' + MY_NONE_SCHEME + '/favorite" target="_top" onclick="callAU(\'TRY_MENU_FAV\');" class="favorite"><span  >Favorites</span></a>');
        aMyLayer.push('</div>');
        aMyLayer.push('<ul class="my_tlist">');
        aMyLayer.push(' <li><a class="my_item" href="' + POINT_SSL + '/report/AfreecaUseList.asp" target="_top"><span  >Items</span></a></li>');
        aMyLayer.push(' <li><a class="my_balloon" href="' + POINT_SSL + szPointUrl + '" target="_top"><span >Star Balloons</span></a></li>');
        if ('en_US' == 'ko_KR') {
            aMyLayer.push(' <li><a class="my_gd" href="' + POINT_SSL + '/Subscription/SubscriptionList.asp" ><span>내 구독</span></a></li>');
            aMyLayer.push(' <li><a class="my_spon" href="' + ADCON_SSL_DOMAIN + '/statistic.php" target="_top"><span >내 애드벌룬</span></a></li>');
            aMyLayer.push(' <li><a class="my_bene" href="' + ADREVENUE_SSL_DOMAIN + ' " target="_top"><span  >내 광고</span></a></li>');
            aMyLayer.push(' <li><a class="my_point" href="' + MYPOINT_NONE_SCHEME + '/index.php?szWork=status" target="_top"><span  >내 포인트</span></a></li>');                        
            aMyLayer.push(' <li><a class="my_tk" href="' + TOKEN_DOMAIN_AUTO + '/index.php?page=my_list" ><span>내 토큰</span></a></li>');
            aMyLayer.push(' <li><a class="my_stat" href="' + BROAD_STATISTIC_NONE_SCHEME + '/" ><span>내 통계</span></a></li>');
        }
        var szNoteNew = (oPrivate.CHANNEL.NOTE_NEW > 0) ? '<span class="new">New</span>' : '';
        var nNoteCnt = (oPrivate.CHANNEL.NOTE_NEW > 0) ? oPrivate.CHANNEL.NOTE_NEW : 0;
        aMyLayer.push(' <li><a class="my_message" href="' + NOTE_NONE_SCHEME + '/app/index.php" target="_top"><span  >Messages</span> <span class="memo">' + nNoteCnt + '</span><span > </span>' + szNoteNew + '</a></li>');
        if ('en_US' == 'en_US') {
            aMyLayer.push('<li ><a class="Account_info" href="' + MEMBER_8111 + '/app/user_info.php" target="_top" class="myinfo"><span  >Account Info</span></a></li>');
        }
        aMyLayer.push(' </ul>');
        if ('en_US' == 'ko_KR') {
            aMyLayer.push('<ul class="my_tlist borderT">');
            aMyLayer.push(' <li><a class="my_shopping" href="' + SHOP_DOMAIN + '/mypage" target="_top"><span  >Shopping</span></a></li>');
            aMyLayer.push(' <li><a class="my_ffom" href="' + FFOM_DOMAIN + '/MyFFom/getMain?nFFomUserId=' + oPrivate.CHANNEL.LOGIN_ID + '" target="_top"><span  >Fan Content</span></a></li>');
        }
        aMyLayer.push('</ul>');
        if(use_darkmode && !dark_exception && 'en_US' == 'ko_KR') {
            aMyLayer.push('<div class="mode_set">');
            aMyLayer.push('<strong class="my_mode">어두운모드</strong>');
            aMyLayer.push('<input type="checkbox" id="modecheck">');
            aMyLayer.push('<label class="modecheck" for="modecheck"></label>');
            aMyLayer.push('<p>이 브라우저에만 적용됩니다</p>');
            aMyLayer.push('</div>');    
        }                
        
        aMyLayer.push(' <div class="btn_set2">');
        if ('en_US' != 'en_US') {
            aMyLayer.push('     <a href="' + MEMBER_8111 + '/app/user_info.php" target="_top" class="myinfo"><span  >Account Info</span></a>');
        } else {
            aMyLayer.push('     <a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy2_en.html" target="_top" class="myinfo"><span>Privacy</span></a>');
        }
        if ('en_US' == 'ko_KR') {
            aMyLayer.push('     <a href="' + MEMBER_8111 + '/app/user_security.php" target="_top" class="safe"><span  >Privacy Settings</span></a>');
        }

        aMyLayer.push('     <a href="javascript:;" class="logout"><span  >Log Out</span></a>');
        aMyLayer.push('</div>');

        return aMyLayer.join('');
    },
    getLayerMenu: function(szType) {
        var aLayerMenu = [];
        var szTag = '';
        var szTarget = '';
        var szStatistic = '';
        var szTranslateTag = "";
        var szTranslateTag = "";
        var szListStyleName = "";

        aLayerMenu.push('<span class="arrw"></span>');
        aLayerMenu.push('<div class="inner_area">');

        for (var nLayer = 0; nLayer < 4; nLayer++) {
            //해외 list_m2 건너뜀
            if ('en_US' != 'ko_KR' && nLayer == 1) {
                continue;
            }
            szListStyleName = "list_m" + (nLayer + 1);
            aLayerMenu.push('<ul class="list_m ' + szListStyleName + '">');
            //console.log(oCommonGnb);

            $.each(oCommonGnb.menu[nLayer], function(i, oMenu) {
                aLayerMenu.push('<li>');

                szTarget = '_top';
                if (typeof(oMenu.menu_target) != 'undefined') {
                    szTarget = oMenu.menu_target;
                }

                szTag = '';
                if (typeof(oMenu.tag) != 'undefined') {
                    szTag = '<span class="' + oMenu.tag + '">' + oMenu.tag + '</span>';
                }

                szStatistic = '';
                if (typeof(oMenu.statistic_tag) != 'undefined') {
                    szStatistic = 'onclick="callAU(\'' + oMenu.statistic_tag + '\');"';
                }

                szTranslateTag = '';
                szTranslateTag = strip_tags(oMenu.name, '<i>');
                aLayerMenu.push('<a href="' + oMenu.url + '" target="' + szTarget + '" ' + szStatistic + '><span data-translate="' + szTranslateTag + '">' + oMenu.name + '</span>' + szTag + '</a></li>');
            });
            aLayerMenu.push('</ul>');
        }

        aLayerMenu.push('</div>');
        if ('en_US' == 'ko_KR') {
            aLayerMenu.push('<ul class="family_site">');
            $.each(oCommonGnb.family.list, function(i, oFamily) {
                if (typeof(oFamily.menu_class) != 'undefined') {
                    aLayerMenu.push('<li class="' + oFamily.menu_class + '">');
                } else {
                    aLayerMenu.push('<li>');
                }

                szTarget = '_top';
                if (typeof(oFamily.menu_target) != 'undefined') {
                    szTarget = oFamily.menu_target;
                }

                szTag = '';
                if (typeof(oFamily.tag) != 'undefined') {
                    szTag = '<span class="' + oFamily.tag + '">' + oFamily.tag + '</span>';
                }

                szStatistic = '';
                if (typeof(oFamily.statistic_tag) != 'undefined') {
                    szStatistic = 'onclick="callAU(\'' + oFamily.statistic_tag + '\');"';
                }

                szTranslateTag = '';
                szTranslateTag = strip_tags(oFamily.name, '<i>');
                aLayerMenu.push('<a href="' + oFamily.url + '" ' + szStatistic + ' target="' + szTarget + '"><span data-translate="' + szTranslateTag + '">' + oFamily.name + '</span>' + szTag + '</a></li>');
            });
        }
        aLayerMenu.push('</ul>');

        return aLayerMenu.join('');
    },
    goLogin: function(szHref) {
        try {
            var szCurrentHref = szHref || top.location.href;
        } catch (e) {
            var szCurrentHref = szHref || location.href;
        }

        // remove hash tag
        if (/(#)+(.*)$/.test(szCurrentHref)) {
            szCurrentHref = szCurrentHref.replace(RegExp.lastMatch, '');
        }
        top.location.href = LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri=" + encodeURIComponent(szCurrentHref);
        //      this.goPage(LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri="+ encodeURIComponent(szCurrentHref));
    },
    goLogout: function(szHref) {
        try {
            var szCurrentHref = szHref || top.location.href;
        } catch (e) {
            var szCurrentHref = szHref || location.href;
        }

        // remove hash tag
        if (/(#)+(.*)$/.test(szCurrentHref)) {
            szCurrentHref = szCurrentHref.replace(RegExp.lastMatch, '');
        }
        top.location.href = LOGIN_8100 + "/app/LogOut.php?request_uri=" + encodeURIComponent(szCurrentHref);
        //      this.goPage(LOGIN_8100 + "/app/LogOut.php?request_uri="+ encodeURIComponent(szCurrentHref));
    },
    goPage: function(szUrl) {
        try {
            top.location.href = szUrl;
        } catch (e) {
            location.href = szUrl;
        }
    },
    isAbroad: function(nSub) {
        Parse_Cookie(document);
        var szAbroad = Read_Cookie("AbroadChk");

        return isAbroad;
    },
    isEmailConfirm: function() {
        Parse_Cookie(document);
        var szEmailConfirm = Read_Cookie("isEmailConfirm");

        return szEmailConfirm;
    },
    Parse_Cookie: function(doc) {
        pdboxCookie = [];
        var cookieList = doc.cookie.split("; ");

        for (var i = 0; i < cookieList.length; i++) {
            var name = cookieList[i].split("=");
            pdboxCookie[unescape(name[0])] = unescape(name[1]);
        }

        return cookieList.length;
    },
    Read_Cookie: function(name) {
        for (cookie in pdboxCookie) {
            if (cookie == name) {
                if (pdboxCookie[cookie] != "undefined")
                    return pdboxCookie[cookie];
            }
        }

        return "";
    },
    getSpeechBubble: function() {
        var szNoticeHtml = '';

        // 해당 로직 오류 발생시 서브 메뉴, 유저 메뉴가 출력이 안되는 사이드 이펙트가 있음
        // 오류 발생시 패스하도록 try catch 처리
        try {
            if (szLocale == "ko_KR") {
                var nTotal = afreeca_notice_item_sort.length;
                var szTarget = '';
                var nShowCnt = 0;

                // 서브 노출 Y가 없으면 스킵
                if (afreeca_notice_item_speech_sub_bubble_yn.indexOf("Y") !== -1) {
                    for (var i = 0; i < nTotal; i++) {
                        if (afreeca_notice_item_sort[i] == undefined)
                            break;

                        var szNotice = afreeca_notice_item_description[afreeca_notice_item_sort[i]];
                        if (afreeca_notice_item_speech_sub_bubble_yn[afreeca_notice_item_sort[i]] == "Y") {
                            szNotice = getByteLength(szNotice, 50);

                            if (afreeca_notice_item_link_target[afreeca_notice_item_sort[i]] == 1) {
                                szTarget = "_blank";
                            }

                            szNoticeHtml += '<a href="' + afreeca_notice_item_link_url[afreeca_notice_item_sort[i]] + '" target="' + szTarget + '" ';

                            // 공지 리스트 첫 항목 제외한 나머지 항목 숨김처리
                            if (nShowCnt !== 0) {
                                szNoticeHtml += 'style="display: none"';
                            }

                            szNoticeHtml += '><em class="icon"></em><strong>[Notice]</strong>' + szNotice + '</a>';
                            nShowCnt += 1;
                        }
                    }

                    // 롤링 로직 및 마우스 이벤트
                    $(document).ready(function() {
                        // 노출 항목 2개 이상인 경우 적용
                        if ($('.notice a').length > 1) {
                            $('.notice a:eq(0)').addClass('on');

                            oGnb.setSpeechBubbleInterval();

                            $('.notice a').on('mouseover', function() {
                                clearInterval(oIntervalFn);
                            });

                            $('.notice a').on('mouseleave', function() {
                                oGnb.setSpeechBubbleInterval();
                            });
                        }
                    });
                }
            } else {
                if (typeof(szNoticeInfo) != 'undefined' && szNoticeInfo.length != 0) {
                    szNoticeHtml = '<a href="http://ghelp.afreecatv.com/index.php?pt=notice_detail&no=' + szNoticeInfo[0].no + '" target="_blank"><em class="icon"></em><strong>[Notice]</strong>' + szNoticeInfo[0].title + '</a>';
                }
            }
        } catch (e) {}

        return szNoticeHtml;
    },
    setSpeechBubbleInterval: function() {
        // 공지사항 롤링 인터벌 동작
        var nTime = 3500; // 3.5초 주기

        oIntervalFn = setInterval(function() {
            var nNoticeIdx = $('.notice').find('.on').index() + 1;
            var nNoticeSize = $('.notice a').size();

            $('.notice a').removeClass('on');

            if (nNoticeIdx == nNoticeSize) {
                nNoticeIdx = 0;
            }

            $('.notice a').eq(nNoticeIdx).addClass('on');

            $('.notice a.on').show();
            $('.notice a').not('.on').hide();
        }, nTime);
    },
    getNotificationList: function(aGlobalGnb) {
        aGlobalGnb.push('<div id="FeedRoot" class="feed_area"></div>');

        $(document).ready(function() {
            if (typeof($oFeed) != "undefined") {
                $oFeed.render({ 'target_id': 'FeedRoot' });
            }
        });
    },
    getNicknameEntity: function(szUserNick) {
        if (typeof(szUserNick) == "undefined" || typeof(szUserNick) != "string") {
            return szUserNick || "";
        }

        szUserNick = szUserNick.replace(/</g, "&lt;");
        szUserNick = szUserNick.replace(/>/g, "&gt;");
        return szUserNick;
    },
    checkDarkModeApply: function (){
        //@TODO. 다크모드가 적용된 페이지에 한해서만 동작되게끔 처리
        if($('#modecheck').length == 0) return;

        oGnb.Parse_Cookie(document);
        if(oGnb.Read_Cookie('theme') == 'dark'){
            $('#modecheck').prop("checked",true);
            if(!$('body').hasClass('thema_dark')){
                $('body').addClass('thema_dark');
            }
        }else{
            if($('body').hasClass('thema_dark')){
                $('body').removeClass('thema_dark');
            }
        }
    },
    checkDarkModeSet: function (mode){
        if( mode == 'dark'){
            setCookie('theme', 'dark', DOMAIN, 365);
            if (oAnalysisUtil) {
                        oAnalysisUtil.setClickLog('conf_00000001', 'theme_color=dark', '');
            }
        }else{
            setCookie('theme', '', DOMAIN, -1);
            if (oAnalysisUtil) {
                        oAnalysisUtil.setClickLog('conf_00000001', 'theme_color=light', '');
            }
        }
    }
    
};

var pdboxCookie = [];
oGnb.Parse_Cookie(document);
var ticket = oGnb.Read_Cookie("PdboxTicket");
if (ticket) {
    var SSL_AUTO = (document.location.protocol == "https:") ? AFEVENT2_SSL : AFEVENT2_8120; // http<->https 호환
    document.writeln('<script type="text/javascript" charset="euc-kr" src="' + SSL_AUTO + '/api/get_private_info.php?szScriptVar=oPrivate&charset=euc-kr"></script>');
}
document.writeln('<script type="text/javascript" charset="euc-kr" src="' + RES_AFREECA_NONE_SCHEME + '/script/keyword/afreeca.front.keyword.js"></script>');
document.writeln('<script type="text/javascript" charset="euc-kr" src="' + RES_AFREECA_NONE_SCHEME + '/script/new_main/login_favorite.js"></script>');
document.writeln('<script type="text/javascript" charset="utf-8" src="' + STATIC_AFREECA_NONE_SCHEME + '/asset/app/notification/' + szLocale + '/noti.min.js"></script>');
var oFooter = {
	getMainFooter : function() {
				var aTmp = [];
                if('en_US' == 'ko_KR'){
                    aTmp.push('<h2 class="blind">하단메뉴</h2>');
                    aTmp.push('<div class="footer_inner">');
                    aTmp.push('	<ul class="f_list">');
                    aTmp.push('		<li><a href="//corp.afreecatv.com/" target="_blank" >Company</a></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/afreeca_intro.htm" target="_top" >About Us</a></li>');
                    aTmp.push('		<li><a href="//adv.afreecatv.com/" target="_blank" >Advertise</a></li>');
                    aTmp.push('		<li><a href="//corp.afreecatv.com/recruit/recruit.html" target="_blank" >Join Us</a></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy1.html" target="_blank" >Terms of Use</a></li>');
                    aTmp.push('		<li><strong><a href="' + AFREECA_NONE_SCHEME + '/policy/policy2.html" target="_blank" >Privacy Policy</a></strong></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy3.html" target="_blank" >Youth Policy</a></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy6.html" target="_blank" >Policy Management</a></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy4_1.html" target="_blank" >Copyright Policy</a></li>');
                    aTmp.push('		<li><a href="//studio.' + DOMAIN + '" target="_blank" >오픈스튜디오</a></li>');
                    aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/sitemap.htm" target="_top" >Site Map</a></li>');
                    aTmp.push('		<li class="familysite off">');
                    aTmp.push('			<a href="#" class="" id="familylBtn">패밀리 사이트<em></em></a>');
                    aTmp.push('			<div class="flayer" id="familyLayer">');
                    aTmp.push('				<ul>');
                    aTmp.push('					<li><a target="_blank" href="http://freecap.' +  DOMAIN+ '">프리캡</a></li>');
                    aTmp.push('					<li><a target="_blank" href="http://sts.freecap.' + DOMAIN + '/index.php">프리캡 소셜트레이딩</a></li>');
                    aTmp.push('				</ul>');
                    aTmp.push('			</div>');
                    aTmp.push('		</li>');
                    aTmp.push('		<li class="global_lang off">');
                    aTmp.push('	<a href="javascript:;" class="" id="globalBtn">English<em></em></a>');
                    aTmp.push('	<div class="glayer" id="globalLayer">');
                    aTmp.push('		<ul>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ko_KR\')">한국어</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'en_US\')">English</a></li>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_CN\')">中文(简体)</a></li>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_TW\')">中文(繁體)</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ja_JP\')">日本語</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'th_TH\')">ภาษาไทย</a></li>');
                    aTmp.push('		</ul>');
                    aTmp.push('	</div>');
                    aTmp.push('</li>');
                    //aTmp.push('		<li class="player"><a href="javascript:;" onclick="runPlayer(\'app_player\');">설치형 플레이어 실행하기<em></em></a></li>');
					aTmp.push('	</ul>');
					// 심사가간 동안 사업자 정보 표기
                    aTmp.push('	<div class="adr">㈜아프리카TV<span>대표이사 : 정찬용</span><span>사업자번호 : 220-81-10886</span><span>통신판매번호 제2010-경기성남-0834</span><span><a href="//ftc.go.kr/bizCommPop.do?wrkr_no=2208110886&amp;apv_perm_no=" target="_blank">사업자 정보 확인</a></span><span>호스팅 제공자 : ㈜아프리카TV</span><br>	<address>주소 : 경기도 성남시 분당구 판교로228번길 15 판교세븐밴처밸리 1단지 2동 ㈜아프리카TV(삼평동)</address><span>FAX : 031-622-8008</span><span><a href="mailto:afreecaTV@afreecatv.com" class="mail" title="메일">afreecaTV@afreecatv.com</a> (1688-7022)</span></div>');
                    aTmp.push('	<p class="copyright">ⓒ AfreecaTV Corp.</p>');
                    aTmp.push('</div>');
				} else {
					aTmp.push('<ul> ') ;
					aTmp.push('		<li><a href="//ghelp.afreecatv.com/index.php?pt=question" target="_blank" >Ask 1:1</a></li>');
					aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy1_en.html" target="_blank" >Terms of Use</a></li>');
					aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy2_en.html" target="_blank" >Privacy Policy</a></li>');
					aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy3_en.html" target="_blank" >Youth Policy</a></li>');
					aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy4_en.html" target="_blank" >Copyright Policy</a></li>');
					aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy6_en.html" target="_blank" >Terms of Purchase</a></li>');
					if('en_US' == 'ja_JP'){
						aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy5_jp.html" target="_blank" >特定商取引法に基づく表記</a></li>');
					}
					aTmp.push('		<li><a href="//ghelp.afreecatv.com/index.php?pt=faq_list&cate=5" target="_blank" >Help</a></li>');
					aTmp.push('		<li class="global_lang off">');
					aTmp.push('	<a href="javascript:;" class="" id="globalBtn">English<em></em></a>');
					aTmp.push('	<div class="glayer" id="globalLayer">');
					aTmp.push('		<ul>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ko_KR\')">한국어</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'en_US\')">English</a></li>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_CN\')">中文(简体)</a></li>');
                    aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_TW\')">中文(繁體)</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ja_JP\')">日本語</a></li>');
					aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'th_TH\')">ภาษาไทย</a></li>');
					aTmp.push('		</ul>');
					aTmp.push('</ul>') ;
					aTmp.push('<div class="copyright">ⓒ AfreecaTV Corp.</div>');
				}
                try{
					document.getElementById('footer').innerHTML = aTmp.join('');
				}catch(e){
					document.write(aTmp.join(''));
				}

				//해외에서 메인타입 접근시에만 언어선택 노출
				if("OK" === "OK") {
					$('.global_lang').show();
				}

				$('div#footer').on('click', '#globalBtn', function(){
					//console.log(1)
					var classname = $(this).parents('.global_lang').hasClass("on");
					if( classname ) {
						$(".global_lang").removeClass("on").addClass("off");
					} else  {
						$(".global_lang").removeClass("off").addClass("on");
					}
					return false;
				});

				$('div#footer').on('click', '#familylBtn', function(){
					//console.log(1)
					var classname = $(this).parents('.familysite').hasClass("on");
					if( classname ) {
						$(".familysite").removeClass("on").addClass("off");
					} else  {
						$(".familysite").removeClass("off").addClass("on");
					}
					return false;
				});
	},
	setSiteOption : function(locale){
            setCookie("_lang", locale, DOMAIN , 365);
            location.reload();
            this.goPageTop();
	},
	goPageTop : function(){
		$("html, body").scrollTop(0);
	},
	getSubFooter : function() {
		var aTmp = [];
		aTmp.push('<ul> ') ;
		aTmp.push('<li class="first-child"><a href="//corp.afreecatv.com/" target="_blank" >Company</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/afreeca_intro.htm" target="_top" >About Us</a></li>');
		aTmp.push('<li><a href="//corp.afreecatv.com/recruit/recruit.html" target="_blank" >Join Us</a></li>');
		aTmp.push('<li><a href="//adv.afreecatv.com/" target="_blank" >Advertise</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy1.html" target="_blank" >Terms of Use</a></li>') ;
		aTmp.push('<li><strong><a href="' + AFREECA_NONE_SCHEME + '/policy/policy2.html" target="_blank" >Privacy Policy</a></strong></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy3.html" target="_blank" >Youth Policy</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy6.html" target="_blank" >Policy Management</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy4_1.html" target="_blank" >Copyright Policy</a></li>');
		aTmp.push('<li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php" target="_top">Help</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/sitemap.htm" target="_top">Site Map</a></li>');
		aTmp.push('		<li class="global_lang off">');
		aTmp.push('	<a href="javascript:;" class="" id="globalBtn">English<em></em></a>');
		aTmp.push('	<div class="glayer" id="globalLayer">');
		aTmp.push('		<ul>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ko_KR\')">한국어</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'en_US\')">English</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_CN\')">中文(简体)</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_TW\')">中文(繁體)</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ja_JP\')">日本語</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'th_TH\')">ภาษาไทย</a></li>');
		aTmp.push('		</ul>');
		aTmp.push('</ul>') ;
		aTmp.push('<div class="copyright">ⓒ AfreecaTV Corp.</div>');

		try{
			document.getElementById('footer').innerHTML = aTmp.join('');
		}catch(e){
			document.write(aTmp.join(''));
		}

		$('div#footer').on('click', '#globalBtn', function(){
			//console.log(1)
			var classname = $(this).parents('.global_lang').hasClass("on");
			if( classname ) {
				$(".global_lang").removeClass("on").addClass("off");
			} else  {
				$(".global_lang").removeClass("off").addClass("on");
			}
			return false;
		});

	},
	getSubGlobalFooter : function() {
		var aTmp = [];

		aTmp.push('<ul> ') ;
		aTmp.push('		<li><a href="//ghelp.afreecatv.com/index.php?pt=question" target="_blank" >Ask 1:1</a></li>');
		aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy1_en.html" target="_blank" >Terms of Use</a></li>');
		aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy2_en.html" target="_blank" >Privacy Policy</a></li>');
		aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy3_en.html" target="_blank" >Youth Policy</a></li>');
		aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy4_en.html" target="_blank" >Copyright Policy</a></li>');
		aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy6_en.html" target="_blank" >Terms of Purchase</a></li>');
		if('en_US' == 'ja_JP'){
			aTmp.push('		<li><a href="' + AFREECA_NONE_SCHEME + '/policy/lang/policy5_jp.html" target="_blank" >特定商取引法に基づく表記</a></li>');
		}
		aTmp.push('		<li><a href="//ghelp.afreecatv.com/index.php?pt=faq_list&cate=5" target="_blank" >Help</a></li>');
		aTmp.push('		<li class="global_lang off">');
		aTmp.push('	<a href="javascript:;" class="" id="globalBtn">English<em></em></a>');
		aTmp.push('	<div class="glayer" id="globalLayer">');
		aTmp.push('		<ul>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ko_KR\')">한국어</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'en_US\')">English</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_CN\')">中文(简体)</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'zh_TW\')">中文(繁體)</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'ja_JP\')">日本語</a></li>');
		aTmp.push('			<li><a href="javascript:oFooter.setSiteOption(\'th_TH\')">ภาษาไทย</a></li>');
		aTmp.push('		</ul>');
		aTmp.push('</ul>') ;
		aTmp.push('<div class="copyright">ⓒ AfreecaTV Corp.</div>');

		try{
			document.getElementById('footer').innerHTML = aTmp.join('');
		}catch(e)
		{
			document.write(aTmp.join(''));
		}

		$('div#footer').on('click', '#globalBtn', function(){
			//console.log(1)
			var classname = $(this).parents('.global_lang').hasClass("on");
			if( classname ) {
				$(".global_lang").removeClass("on").addClass("off");
			} else  {
				$(".global_lang").removeClass("off").addClass("on");
			}
			return false;
		});
	}
	, getSubItemFooter : function() {
		var aTmp = [];

		aTmp.push('<div id="footer">') ;
		aTmp.push('<ul>') ;
		aTmp.push('<li class="first-child"><a href="//corp.afreecatv.com/" target="_blank">회사소개</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/afreeca_intro.htm" target="_top">서비스소개</a></li>');
		aTmp.push('<li><a href="//corp.afreecatv.com/recruit/recruit.html" target="_blank">인재채용</a></li>');
		aTmp.push('<li><a href="//adv.afreecatv.com/" target="_blank">광고안내</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy1.html" target="_blank">이용약관</a></li>') ;
		aTmp.push('<li><strong><a href="' + AFREECA_NONE_SCHEME + '/policy/policy2.html" target="_blank">개인정보처리방침</a></strong></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy3.html" target="_blank">청소년보호정책</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy6.html" target="_blank">운영정책</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/policy/policy4_1.html" target="_blank">권리침해신고센터</a></li>');
		aTmp.push('<li><a href="' + HELPAFREECA_NONE_SCHEME + '/atv.php" target="_top">고객센터</a></li>');
		aTmp.push('<li><a href="' + AFREECA_NONE_SCHEME + '/sitemap.htm" target="_top">사이트맵</a></li>');
		aTmp.push('</ul>') ;
		aTmp.push('<div class="adr">');
		aTmp.push('㈜아프리카TV<span>대표이사 : 정찬용</span><span>사업자번호 : 220-81-10886</span><span>통신판매번호 제2010-경기성남-0834</span>');
		aTmp.push('<span><a href="http://ftc.go.kr/bizCommPop.do?wrkr_no=2208110886&apv_perm_no=" target="_blank">사업자 정보 확인</a></span>');
		aTmp.push('<span>호스팅 제공자 : ㈜아프리카TV</span><br />');
		aTmp.push('	<address>주소 : 경기도 성남시 분당구 판교로228번길 15 판교세븐밴처밸리 1단지 2동 ㈜아프리카TV(삼평동)</address><span>FAX : 031-622-8008</span><span><a href="mailto:afreecaTV@afreecatv.com" class="mail" title="메일">afreecaTV@afreecatv.com</a> (1688-7022)</span>');
		aTmp.push('</div>');
		aTmp.push('<div class="copyright">ⓒ AfreecaTV Corp.</div>');
		aTmp.push('</div>');

		try{
			document.getElementById('footer').innerHTML = aTmp.join('');
		}catch(e)
		{
			document.write(aTmp.join(''));
		}
	}
}