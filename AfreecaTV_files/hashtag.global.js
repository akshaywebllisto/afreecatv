/**
 * 해시태그 관련 검색 API
 *
 * @author      $Author: syk2137 $
 * @version     $Revision: 52068 $
 * @link
 * @copyright Copyright(c)2017 by AfreecaTV. Co., Ltd. Seoul, Korea. All rights reserved.
 */

define('hashtag', ['afreeca', 'view', 'doT'], function(afreeca, view, doT) {
    var $ = afreeca.$
        , oHashtag = {
            init : function(nPage, szOrder, szRange, szHashtag, callback) {
                this.getHashTagAll(nPage, szOrder, szRange, szHashtag, callback);
            }
            // 해시태그 '전체' 탭
            , getHashTagAll : function(nPage, szOrder, szRange, szHashtag, callback) {
                if(szOrder == null) {
                    szOrder = 'view_cnt';
                }

                if(szRange == null) {
                    szRange = '1month';
                }

                // $.ajaxSettings.traditional = true;
                $.ajax({
                    type : "GET"
                    , url : SEARCH_SCH_80+'/api.php'
                    , data : {
                        m : 'hashSearch'
                        , szServicType : 'ALL'
                        , szKeyword : encodeURIComponent(szHashtag)
                        , nLivePageNo : nPage
                        , nLiveListCnt : '12'
                        , szLiveOrder : szOrder  // view_cnt(default), broad_start: 최신순, rank: BJ랭킹순
                        , nVodPageNo : nPage
                        , nVodListCnt : '12'
                        , szVodOrder : szOrder  // reg_date: 등록순, view_cnt: 조회수순(default), memo_cnt: 댓글순, recomm_cnt: 추천순
                        , szTerm : szRange     // 1day : 하루, 1week : 일주일, 1month : 한달(default) , 1year : 일년
                        , szPlatform : 'pc'
                        // , szFileType : 'NORMAL,REVIEW,HIGHLIGHT,SPORTS'  // 없을 경우 전체(default)
                        // , szVideoType : ''   // 없을 경우 전체(default)
                    }
                    , async : false
                    , dataType : 'jsonp'
                    , beforeSend : function(request) {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    }
                    , success : function(response) {
                        if(response.RESULT == 1)
                        {
                            var isAppend = (nPage == 1 ? false : true);
                            // szType, szHashTag, nPage, oRes
                            callback('ALL', szHashtag, nPage, response.DATA, isAppend);
                        }
                    }
                    , error : function(xhr, ajaxOptions, thrownError) {
                        $('div.loading').hide();
                        $('div.reloading').show();

                        $('div.reloading button.icon').click(function() {
                            $('div.reloading').hide();
                            $('div.loading').show();

                            oHashtag.getHashTagAll(nPage, szOrder, szRange, szHashtag, callback);
                        });
                        return;
                    }
                });
            }
            // 해시태그 '생방송' 탭
            , getHashTagLive : function(nPage, szOrder, szHashtag, callback) {
                if(szOrder == null) {
                    szOrder = 'view_cnt';
                }
                // $.ajaxSettings.traditional = true;
                $.ajax({
                    type : "GET"
                    , url : SEARCH_SCH_80+'/api.php'
                    , data : {
                        m : 'hashSearch'
                        , szServicType : 'LIVE'
                        , szKeyword : encodeURIComponent(szHashtag)
                        , nLivePageNo : nPage
                        , nLiveListCnt : '60'
                        , szLiveOrder : szOrder  // view_cnt(default), broad_start: 최신순, rank: BJ랭킹순
                        , szPlatform : 'pc'
                    }
                    , async : false
                    , dataType : 'jsonp'
                    , beforeSend : function(request) {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    }
                    , success : function(response) {
                        if(response.RESULT == 1)
                        {
                            var isAppend = (nPage == 1 ? false : true);
                            // szType, szHashTag, nPage, oRes
                            callback('LIVE', szHashtag, nPage, response.DATA, isAppend);
                        }
                    }
                    , error : function(xhr, ajaxOptions, thrownError) {
                        $('div.loading').hide();
                        $('div.reloading').show();

                        $('div.reloading button.icon').click(function() {
                            $('div.reloading').hide();
                            $('div.loading').show();

                            oHashtag.getHashTagLive(nPage, szOrder, szHashtag, callback);
                        });
                        return;
                    }
                });
            }
            // 해시태그 '동영상' 탭
            , getHashTagVod : function(nPage, szOrder, szRange, szHashtag, callback) {
                if(szOrder == null) {
                    szOrder = 'view_cnt';
                }
                // $.ajaxSettings.traditional = true;
                $.ajax({
                    type : "GET"
                    , url : SEARCH_SCH_80+'/api.php'
                    , data : {
                        m : 'hashSearch'
                        , szServicType : 'VOD'
                        , szKeyword : encodeURIComponent(szHashtag)
                        , nVodPageNo : nPage
                        , nVodListCnt : '60'
                        , szVodOrder : szOrder  // reg_date : 등록순, view_cnt : 조회수순(default), memo_cnt : 댓글순, recomm_cnt : 추천순
                        , szTerm : szRange  // 1day : 하루, 1week : 일주일, 1month : 한달(default) , 1year : 일년
                        // , szFileType : 'NORMAL,REVIEW,HIGHLIGHT,SPORTS'  // 없을 경우 전체(default)
                        // , szVideoType : ''   // 없을 경우 전체(default)
                        , szPlatform : 'pc'
                    }
                    , async : false
                    , dataType : 'jsonp'
                    , beforeSend : function(request) {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    }
                    , success : function(response) {
                        if(response.RESULT == 1)
                        {
                            var isAppend = (nPage == 1 ? false : true);
                            // szType, szHashTag, nPage, oRes
                            callback('VOD', szHashtag, nPage, response.DATA, isAppend);
                        }
                    }
                    , error : function(xhr, ajaxOptions, thrownError) {
                        $('div.loading').hide();
                        $('div.reloading').show();

                        $('div.reloading button.icon').click(function() {
                            $('div.reloading').hide();
                            $('div.loading').show();

                            oHashtag.getHashTagVod(nPage, szOrder, szRange, szHashtag, callback);
                        });
                        return;
                    }
                });
            }
        };

    return oHashtag;
});