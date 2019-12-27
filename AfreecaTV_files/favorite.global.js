/**
 * 즐겨찾기 관련
 *
 * @author      $Author: onlykde $
 * @version     $Revision: 57766 $
 * @link
 * @copyright Copyright(c)2017 by AfreecaTV. Co., Ltd. Seoul, Korea. All rights reserved.
 */

var _view;

define('favorite', ['afreeca','doT'], function(atv,doT) {
	requirejs(['view'], function(view) { 
		_view = view;
	});

	var $ = atv.$
		, oFavorite = {
			szUserId : null
			, oFavoriteList : null
			, nFavoritePageNo : 1
			, nFavVodCount : 0
			, nRowNum : 60
			, szListType : 'favorite_no'
			, szOrder : 'desc'
			, szBroadListType : 'total_view_cnt'
			, szBroadOrder : 'desc'
			, szFrom : 'webk'
			, nStartNo : 0
			, nEndNo : 0
			, nLiveStartNo : 0
			, nLiveEndNo: 0
			, nLivePageNo: 1
			, init : function(szUserId) {
				if(atv.isLogin())
				{
					this.szUserId = szUserId;
					this.getFavoriteList();
					if(checkSimple("fav","fav_bbs")){
						this.getFavoriteBbsList();
					}
					if(checkSimple("fav","fav_vod")){
                    	this.getFavoriteVodList();
                	}
					this.initListOffSet();
					this.initLiveListOffSet();
				}
				else
				{
					atv.goLogin();
				}
			}
			,initListOffSet : function(nStartNo){
				if(nStartNo !== undefined){
					this.nStartNo = nStartNo;
				}else{
					this.nStartNo = (this.nFavoritePageNo-1) * this.nRowNum;
				}
				this.nEndNo = this.nFavoritePageNo * this.nRowNum;
			}
			,initLiveListOffSet : function(nLiveStartNo){
				if(nLiveStartNo !== undefined){
					this.nLiveStartNo = nLiveStartNo;
				}else{
					this.nLiveStartNo = (this.nLivePageNo-1) * this.nRowNum;
				}
				this.nLiveEndNo = this.nLivePageNo * this.nRowNum;
			}
			
			, checkFavoriteList : function(callback, oObject, szBjId) {
				if(!atv.isLogin())
				{
					callback(oObject);
					return;
				}
				else
				{		
					if(this.szUserId == null)
					{						
						this.szUserId = atv.getLoginId();
					}
				}

				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : FAV_NONE_SCHEME + '/afreeca/favorite_list_api.php'
					, data : {
						szPlatformType : 'main'
						, szWork : 'CHECKFAVORITE'
						, szBjId : szBjId
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.CHANNEL.RESULT == -5)	
						{
							callback(oObject, true);
						}
						else
						{
							callback(oObject, false);
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
			, getFavoriteList : function() {
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : FAV_NONE_SCHEME + '/afreeca/favorite_list_api.php'
					, data : {
						szPlatformType : 'main'
						, nFixBroadCnt : 6
						, szFrom : oFavorite.szFrom
						, szClub : 'y'
						, lang : szLang
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.CHANNEL.RESULT == 1)
						{
							_view.setFavoriteList(response.CHANNEL);
						}
						else
						{
							_view.setFavoriteList(null);
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
						$('div.loading').hide();
						$('div.reloading').show();

						$('.reloading button.icon').click(function() {
							$('div.reloading').hide();
							$('div.loading').show();
							oFavorite.getFavoriteList();
						});
					}
				});
			}
			, addFavoriteList : function(szBjId, bFlag) {
				if(!atv.isLogin())
				{
					return -10;
				}
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : LIVE_NONE_SCHEME + '/afreeca/favorite_list_api.php'
					, data : {
						szWork : 'ADDFAVORITE'
						, szPlatformType : 'main'
						, szBjId : szBjId
						, nFixBroadCnt : 6
						, szFrom : oFavorite.szFrom
						, szClub : 'y'
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
                        var szMessage = response.CHANNEL.MESSAGE;
                        if (szMessage){
                            alert(szMessage);
						}

						if(response.CHANNEL.RESULT == 1)
						{
							if (bFlag == true)
							{
								oFavorite.nLivePageNo = 1;
								oFavorite.initListOffSet(0);
								oFavorite.initLiveListOffSet(0);
								oFavorite.getFavoriteList();
							}
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});

				return 0;
			}
			, delFavoriteList : function(szBjId, bFlag) {
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : LIVE_NONE_SCHEME + '/afreeca/favorite_list_api.php'
					, data : {
						szWork : 'DELFAVORITE'
						, szPlatformType : 'main'
						, szBjId : szBjId
						, nFixBroadCnt : 6
						, szFrom : oFavorite.szFrom
						, szClub : 'y'
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.CHANNEL.RESULT == 1)
						{
							var Object ={};
							var szMessage = doT.template($("#message_favorite_del_success").html())(Object);
							alert(szMessage);
                                                        
							if (bFlag == true)
							{
								oFavorite.nLivePageNo = 1;
								oFavorite.initListOffSet(0);
								oFavorite.initLiveListOffSet(0);
								oFavorite.getFavoriteList();
							}
						}
						else
						{
							var Object ={};
							var szMessage = doT.template($("#message_api_call_fail").html())(Object);
							alert(szMessage);
                                                        
							return;						
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
			, addFavoriteTopFix : function(callback, szFavoriteNo, oObject, oAllFavoriteList) {
				if(!atv.isLogin())
				{
					return -10;
				}
				szWork = 'ADD_TOPFIX'; 
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : LIVE_NONE_SCHEME + '/afreeca/favorite_topfix_api.php'
					, data : {
						szWork : szWork
						, szFavoriteNo : szFavoriteNo
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.CHANNEL.RESULT == 1)
						{
                            callback(oObject, oAllFavoriteList, szWork);
                            var szMessage = doT.template($("#message_favorite_topfix_add").html())(Object);
                            alert(szMessage);
						}
						else 
						{
							var Object ={};
                            var szMessage = doT.template($("#message_api_call_fail").html())(Object);
                            alert(szMessage);
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});

				return 0;
			}
			, delFavoriteTopFix : function(callback, szFavoriteNo, oObject, oAllFavoriteList) {
				if(!atv.isLogin())
				{
					return -10;
				}
				szWork = 'DEL_TOPFIX';
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : LIVE_NONE_SCHEME + '/afreeca/favorite_topfix_api.php'
					, data : {
						szWork : szWork
						, szFavoriteNo : szFavoriteNo
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.CHANNEL.RESULT == 1)
						{
                            callback(oObject, oAllFavoriteList, szWork);                      
                            var szMessage = doT.template($("#message_favorite_topfix_del").html())(Object);
                            alert(szMessage);
						}
						else
						{
							var Object ={};
                            var szMessage = doT.template($("#message_api_call_fail").html())(Object);
                            alert(szMessage);
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
			, getFavoriteBbsList : function() {
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "GET"
					, url : API_UP_NONE_SCHEME + '/feed/favorite/list/'
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						testArray = 'content' in response.data;
						//alert(testArray);
						if(response.result == 1 && testArray && response.data.content.length > 3)
						{

							_view.setFavoriteBbsList(response.data.content);
						}
						//else
						//{
							//alert(123132);
						//	_view.setFavoriteBbsList(null);
						//}
						
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
            , getFavoriteVodList : function() {
				$.ajaxSettings.traditional = true;
				$.ajax({
					type : "POST"
					, url : LIVE_NONE_SCHEME + '/api/get_favorite_vod_api.php'
					, data : {
						szWork : 'getList'
					}
					, async : false
					, dataType : 'jsonp'
					, jsonp : 'callback'
					, beforeSend : function(request) {
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
					}
					, success : function(response) {
						if(response.RESULT == 1 || response.RESULT == -4 )
						{
							_view.setFavoriteVodList(response.DATA);
						}
					}
					, error : function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
		};

	return oFavorite;
});