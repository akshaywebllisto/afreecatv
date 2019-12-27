/** 
 *	@brief	검색 관련 
 *	@author	mint82
 *	@date	2015-05-08
 */


define('search', ['afreeca', 'view', 'doT'], function(afreeca, view, doT) {
	var $ = afreeca.$
		, oSearch = {
			szDelim : String.fromCharCode(12)
			, oDom : null
			, nIndex : null
			, szCurrentKeyword : ''
			, szSType: 'di'
			, szBeforeSzSType: ''
			, recommendSearchKey : function() {
				atv.loader.loadJs({ 
					url: AFREECA + '/data/af_recommend_search_utf8.js' 
					, charset: 'utf-8' 
					, complete: function(response) {
						if(oRecommendSearchJson != undefined)
						{
							if(oRecommendSearchJson.RESULT == 1)
							{
								var nRand = Math.floor(Math.random() * oRecommendSearchJson.LISTS.length);
								view.setDefaultSearchKey(oRecommendSearchJson.LISTS[nRand]);
							}
						}
					} 
				});
			}
			, setKeywordCookie : function(szKeyword) {
				var oSearch = this;
				var szCKKeyword = '';
				if (szKeyword == '' || szKeyword == 'undefined' || szKeyword == null) {
					return;
				}
				
				szCKKeyword = atv.getCookie('_csk');
                if (szCKKeyword == null) {
                    szCKKeyword = '';
                }
				szCKKeyword= unescape(szCKKeyword);
				if (szCKKeyword != '') {
					var aData = szCKKeyword.split(oSearch.szDelim);
					$.each(aData, function(szKey, oItem) {
						if (oItem == szKeyword) {
							aData.splice(szKey, 1);
						}
					});
					var aSaveData = new Array(szKeyword).concat(aData);
					szCKKeyword = aSaveData.join(oSearch.szDelim);
				} else {
					szCKKeyword = szKeyword;
				}
				
				atv.setCookie('_csk', szCKKeyword, DOMAIN);
			}
			, delKeywordCookie : function(szKeyword) {
				var oSearch = this;
				var szCKKeyword = atv.getCookie('_csk');
                if (szCKKeyword == null) {
                    szCKKeyword = '';
                }

				szCKKeyword = unescape(szCKKeyword);
                if (szCKKeyword != '') {
					var aData = szCKKeyword.split(oSearch.szDelim);
					$.each(aData, function(szKey, oItem) {
						if (oItem == szKeyword) {
							aData.splice(szKey, 1);
						}
					});
					var aSaveData = new Array().concat(aData);
					szCKKeyword = aSaveData.join(oSearch.szDelim);
				}

				if (szCKKeyword == oSearch.szDelim || szCKKeyword == '') {
					//구분자만 남았을때  키 삭제[_csk]
					szCKKeyword = '';
					oSearch.delAllKeywordCookie();
					return;
				}
				
				atv.setCookie('_csk', szCKKeyword, DOMAIN);

				oSearch.setNoneLayerSearch();
			}
			, delAllKeywordCookie : function() {
				var oSearch = this;
				var expireDate = new Date();

				expireDate.setDate( expireDate.getDate() - 1 );

				atv.setCookie('_csk', '', DOMAIN, expireDate);

				oSearch.setNoneLayerSearch();
			}
			, setClickPage : function(szKeyword) {
				var oSearch = this;

				oSearch.szCurrentKeyword = szKeyword;

				if (szKeyword == '') {
					if (afreeca.getCookie('_csk') == null || afreeca.getCookie('_csk') == '') {
						var szUrl = SEARCH_SCKETC_80+'/api.php';
						var szType = 'hotKeyword';

						$.ajax({
							type		: 'POST',
							dataType	: 'jsonp',
							jsonp		: 'callback',
							url		: szUrl,
							cache	: false,
							data		: {
								m		: szType,
								v		: "1.0",
								c		: "UTF-8"
							},
							success	: function(oRes) {
								var szHtml = '';
								var aHtml = [];
								var szAddClass = '';
								var szShowText = "-";
								var szTagFunction = "";
								if (typeof(oRes) != 'undefined' && oRes.length != 0) {
                                                                    
									$(oRes.HOT).each(function (szKey, oItem) {
										if (oItem.show_text == 'new') {
											szAddClass = 'new';
											szShowText = 'NEW';
										} else if (oItem.updown == 'up') {
											szAddClass = 'up';
											szShowText = '<em></em>'+ oItem.show_text;
										} else if (oItem.updown == 'down') {
											szAddClass = 'down';
											szShowText = '<em></em>'+ oItem.show_text;
										}

										var nKey = szKey +1;
										var Object = {KEYWORD : oItem.keyword, KEY_NUM : nKey , CLASS :szAddClass , SHOW_TEXT :szShowText};
										var szTemplate = $('#search_favorite_list').html();
										var szContents = doT.template(szTemplate)(Object);
																						
										aHtml.push(szContents);
									});        
								
								}
                                                                
								var szTemplate = $('#search_favorite_body').html();
								var Object = {LISTITEM:aHtml.join('')};
								var szHtml = doT.template(szTemplate)(Object);                                    
								
								// 실시간 검색어 존재 시 
								if (szHtml != '') {
									$('div.search_box').html(szHtml).show();
									oSearch.oDom = $('div.search_box');
									oSearch.szSType = 'rk';

									$('div.search_box ul li a').off('click').on('click', function () {
										var szActType = 'total';
										
										$('#szKeyword').val($(this).attr('data'));
										oSearch.getBanKeyword($('#szKeyword').val(), szActType, 'sv', oSearch.szSType);
									});
								} else {
									$('div.search_box').hide();
									oSearch.oDom = null;
								}
							},
							error : function(jqXHR, status, errorThrow){
								return;
							}
						});
					} else {
						var szCKKeyword = atv.getCookie('_csk');
                        if (szCKKeyword == null) {
                            szCKKeyword = '';
                        }
						var szHtml = '';
						var aHtml = [];
						
						szCKKeyword = unescape(szCKKeyword);
						if (szCKKeyword == '') {
							return;
						}

						var aData = szCKKeyword.split(this.szDelim);

						$.each(aData, function (szKey, oItem) {
							if(szKey >= 10) return;

							if (oItem != '') {                                                                
								var Object = {DATA : oItem};
								var szTemplate = $('#search_recent_list').html();
								var szContents = doT.template(szTemplate)(Object);			
								aHtml.push(szContents);
							}
						});

						var szTemplate = $('#search_recent_body').html();
						var Object = {LISTITEM:aHtml.join('')};
						var szHtml = doT.template(szTemplate)(Object);

						// 최근 검색어 존재 시 
						if (szHtml != '') {
							$('div.search_box').html(szHtml).show();
							oSearch.oDom = $('div.search_box');
							oSearch.szSType = 'lc';

							$('div.search_box ul li a').off('click').on('click', function() {
								var szActType = 'total';

								$('#szKeyword').val($(this).attr('data'));
								oSearch.getBanKeyword($(this).attr('data'), szActType, 'sv', oSearch.szSType);
							});

							$('div.search_box ul li button.btn_delete').off('click').on('click', function() {
								oSearch.delKeywordCookie($(this).attr('data'));
                                oSearch.setClickPage($('input#szKeyword').val());
                                
                                $('body').attr('show_flag', 'true');
                                return false;
							});

							$('div.search_box button.btn_all_delete').off('click').on('click', function() {
								oSearch.delAllKeywordCookie();
							});
						} else {
							$('div.search_box').hide();
							oSearch.oDom = null;
						}
					}
				}
				else
				{
					// 자동완성 호출
					var szUrl = SEARCH_SCKETC_80+'/api.php';
					var szType = 'autoJaso';
					var szVersion = '1.0';
					var szCharset = (typeof (document.charset) != 'undefined') ? document.charset.toUpperCase() : document.characterSet.toUpperCase();
					if (szCharset == null || typeof (szCharset) == 'undefined')
					{
						szCharset = 'UTF-8';
					}

					$.ajax({
						type: 'POST',
						dataType: 'jsonp',
						jsonp: 'callback',
						url: szUrl,
						cache: false,
						data: {
							m: szType,
							v: szVersion,
							t: 'json ',
							c: szCharset,
							d: encodeURIComponent(szKeyword),
							n: 10,
							w: 'flash1'
						},
						success: function (response) {
							if(response.ret == 1)
							{
								var szHtml = '';
								var aHtml = [];
								var nCount = 0;
								if( typeof(response.list) != 'undefined')
								{
									aHtml.push('<div class="inner_area">');
									aHtml.push('	<h3 class="blind">검색어 자동완성</h3>');
									aHtml.push('	<ul class="list">');
									for( var i = 0; i<response.list.length; i++ )
									{
										if( typeof(response.list[i].d) != 'undefined' )
										{
											aHtml.push('<li><a href="javascript:;" data="' + response.list[i].d + '">' + response.list[i].d + '</a></li>');
											nCount++;
										}
									}
									aHtml.push('	</ul>');
									aHtml.push('</div>');
								}
								szHtml = aHtml.join('');

								if( nCount > 0 )
								{
									$('div.search_box').html( szHtml ).show();
									oSearch.oDom = $('div.search_box');
									oSearch.szSType = 'ac';

									$('div.search_box ul li a').off('click').on('click', function() {
										var szActType = 'total';
																				
										$('#szKeyword').val($(this).attr('data'));
										oSearch.getBanKeyword($('#szKeyword').val(), szActType, 'sv', oSearch.szSType);
									});							
								}
								else
								{
									$('div.search_box').hide();
									oSearch.oDom = null;
								}

								//return true;
							}
						},
						error: function (jqXHR, status, errorThrow) {
							//alert(status);
							return;
						}
					});
				}
                
                $('body').off('click').on('click', function(evt) {
                    if ($('body').attr('show_flag') == 'true') {
                        $('body').removeAttr('show_flag');
                    }
                });
			}
			, changeKeyword : function(keyCode) {
				var oSearch = this;

				if(oSearch.oDom == null)
				{
					return;
				}

				if(oSearch.nIndex == null || oSearch.oDom.find('ul li').length == oSearch.nIndex)
				{
					oSearch.oDom.show();

					if(keyCode == 38)
					{
						oSearch.nIndex = oSearch.oDom.find('ul li').length - 1;
					}
					else if(keyCode == 40)
					{
						oSearch.nIndex = 0;
					}
				}
				else
				{
					// Up
					if(keyCode == 38)
					{
						if(oSearch.nIndex == 0)
						{
							$('#szKeyword').val(oSearch.szCurrentKeyword);
							oSearch.oDom.hide();
							oSearch.nIndex = null;
							return;
						}
						else
						{
							oSearch.nIndex--;
						}
					}
					// Down
					else if( keyCode == 40)
					{
						if((oSearch.oDom.find('ul li').length - 1) == oSearch.nIndex)
						{
							$('#szKeyword').val(oSearch.szCurrentKeyword);
							oSearch.oDom.hide();
							oSearch.nIndex++;
							return;
						}
						else
						{
							oSearch.nIndex++;
						}
					}
				}

				oSearch.oDom.find('ul li').removeClass('hv');
				oSearch.oDom.find('ul li:eq(' + oSearch.nIndex + ')').addClass('hv');
				$('#szKeyword').val(oSearch.oDom.find('ul li:eq(' + oSearch.nIndex + ') a').attr('data'));
				//$('#szKeyword').focus();
			}
			, getBanKeyword : function(szKeyword, szActType, szUseType, szStype, callback) {
				// 금칙어 통합 API
				var szUrl = SEARCH_SCKETC_80+'/api.php';
				var szType = 'stopWord';
				var szLocation = 'main';

				/*
					<< location >>
					main : 메인페이지 
					<< acttype >>
					total: 통합검색,   live: 생방송,   vod: 동영상,   BJ: BJ검색

					<< uid >

					<< ut >>
					sv : 검색어 금칙여부로 활용,   tv : 방송 제목 금칙어 검증
					nv : 닉네임 금칙어 검증,   cv : 일반적인 금칙여부로 활용

					<< stype >> : 필수
					di : 직접입력
					rc : 추천 검색어
					ac : 자동완성
					rt : 연관 검색어
					lc : 최근 검색어
					rk : 실시간 검색어
				*/

				$.ajax({
					type		: 'GET',
					dataType	: 'jsonp',
					jsonp		: 'callback',
					url		: szUrl,
					cache		: false,
					data: {
						location: szLocation,
						m		: szType,
						v		: '1.0',
						d		: encodeURIComponent(szKeyword),
						t		: 'json',
						c		: 'UTF-8' ,
						w		: 'webk',
						uid		: afreeca.getLoginId(),
						acttype	: szActType,
						ut		: szUseType,
						stype	: szStype
					},
					success	: function(oData,status) {
						if( oData.isstop == 0 )
						{
							oSearch.submitKeyword(szStype, szKeyword);
						}
						else
						{
							var Object ={KEYWORD : szKeyword};
							var szMessage = doT.template($("#message_search_bannded_word").html())(Object);
							alert(szMessage);
						}
						oSearch.setNoneLayerSearch();
					},
					error : function(jqXHR, status, errorThrow){
						//console.log(jqXHR);
						//console.log(status);
						//console.log(errorThrow);
						//oSearch.setNoneLayerSearch();
					}
				});
			}
			, setNoneLayerSearch : function() {
				var oSearch = this;
				oSearch.oDom = null;
				oSearch.nIndex = null;
				oSearch.szSType = 'di';

				$('div.search_box').html('').hide();
			}
			, submitKeyword : function(stype, keyword) {
				/*
				<< stype >> : 필수
					di : 직접입력
					rc : 추천 검색어
					ac : 자동완성
					rt : 연관검색어
					lc : 최근 검색어
					rk : 실시간 검색어
				*/
				this.setKeywordCookie(keyword);

				var oForm = document.oSearchForm;
                if (document.location.protocol == 'https:') {
					document.oSearchForm.action = AFREECA + '/total_search.html';
					/*oForm.acceptCharset = 'utf-8';
        			if (document.all) {
        				document.charset = 'utf-8';
        			}
        			oForm.szKeywordhidden.value = encodeURIComponent(oForm.szKeyword.value);
        			oForm.szStype.value = stype;
					oForm.submit();
					return;*/
        		}
				
				//oForm.acceptCharset = 'euc-kr';
                oForm.acceptCharset = 'utf-8';
				oForm.szKeywordhidden.value = encodeURIComponent(oForm.szKeyword.value);
				//if(document.all)document.charset = 'euc-kr';
				
				oForm.szStype.value = stype;
				oForm.submit();
				return;

				oForm.acceptCharset = 'utf-8';
        		if(document.all)document.charset = 'utf-8';
			}
		};

	return oSearch;
});