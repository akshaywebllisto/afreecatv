if (typeof(afreeca) == 'undefined') {
	// http://www.afreecatv.com/script/common/afreeca.js no call ready��ȣ�⿡ ���� ���
	var afreeca ={
		front : {
		}
	};
}
// �ڵ��˻� ������
if (typeof(afreeca.front.oAutoDataList) == 'undefined') {
	afreeca.front.oAutoDataList = {};
}

// �ڵ��˻� ������ ����� �� ����
if (typeof(afreeca.front.oAutoDataListCount) == 'undefined') {
	afreeca.front.oAutoDataListCount = 0;
}

// ���� �˻� ������
if (typeof(afreeca.front.szOldAutoKeyWord) == 'undefined') {
	afreeca.front.szOldAutoKeyWord = '';
}

// ���� �˻� ������ (Ű���� �̵��� �����)
if (typeof(afreeca.front.szOldAutoKeyWord2) == 'undefined') {
	afreeca.front.szOldAutoKeyWord2 = '';
}

// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ��� ���� ��ġ ��
if (typeof(afreeca.front.nAutoCurrentCount) == 'undefined') {
	afreeca.front.nAutoCurrentCount = -1;
}
// API ȣ���� �ð�(�Ź� ������Ʈ)
if (typeof(afreeca.front.nDateTime) == 'undefined') {
	afreeca.front.nDateTime = 0;
}

// �ڵ��ϼ� �˻����� �ƴ� ��� ������ ����
if (typeof(afreeca.front.isFlagAuto) == 'undefined') {
	afreeca.front.isFlagAuto = false;
}

// ����Ű �Է� ���� (key press)
if (typeof(afreeca.front.isKeyPress) == 'undefined') {
	afreeca.front.isKeyPress = false;
}

// �˻� ���̾� Ÿ��(true = �ǻ簣 �˻�or�ֱٰ˻� / false=�ڵ��˻�)
if (typeof(afreeca.front.isSearchLayerTypeFlag) == 'undefined') {
	afreeca.front.isSearchLayerTypeFlag = false;
}
//�˻�â���̾� ���̵�
if (typeof(afreeca.front.szLayerSearchId) == 'undefined') {
	afreeca.front.szLayerSearchId = "";
}

//���� ������ Ÿ��(����/�˻�������/����������)
if (typeof(afreeca.front.szCurrentPageType) == 'undefined') {
	afreeca.front.szCurrentPageType = "";
}

afreeca.front.keyword = {
	oAllData : {"RESULT":"-1"}
	,szStype : 'di'	// di(����), rc(��õ), ac(�ڵ�), rt(����)
	,oInterval : null
	,szKeyCode : null	// ���̾��������� ������ ���� Ű �ڵ尪
	,szReg : String.fromCharCode(12) //�ֱ� �˻��� ������
	,bFavorite : false
	,szDelim : String.fromCharCode(12)
	,nEvent : 0
	,szThemeHtml: ''
	,init : function () {
		this.callRecommendSearch(0);
		if (typeof(Read_Cookie) == 'function') {
			if (Read_Cookie('theme') == 'dark') {
				this.szThemeHtml = '_dk';
				$('input[name=szInputColor]').val('#1B1B1C');
			}
		}
	}

	, setDefaultImage : function ( obj ){
		if( typeof(obj) != 'undefined' )
		{
			obj.src = RES_AFREECA_NONE_SCHEME + '/images/main_new/@thum_s_104x76.gif';
		}
	}
	, getNumberFormat : function ( nNum ){
		var pattern = /(-?[0-9]+)([0-9]{3})/;
		while( pattern.test( nNum ) )
		{
			nNum = nNum.replace(pattern,"$1,$2");
		}
		return nNum;
	}
	, isLoginCheck : function (){
		if( typeof(Read_Cookie) != 'function' )
		{
			return 1;
		}
		var ticket = Read_Cookie('PdboxTicket');
		if (ticket == null || ticket == "")
		{
			var szHref = location.href;

			var szExp  =/&/g
			var szHref = szHref.replace(szExp,"%26");

			//#, #top���� IE������ ������ ��!
			var szExp = /#$|#top$/g
			var szHref = szHref.replace(szExp,"");

			top.location.href = LOGIN_8100 + "/afreeca/login.php?szFrom=full&request_uri="+szHref;
			return 0;
		}
		return 1;
	}
	,getByteLength : function ( szMsg, nMaxLen ){
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

				if( nBytes > nMaxLen )	// ��� ���� �Ѿ��
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
	,setSckCookie : function( szType ){
		/*
        ��õ�˻��� Ŭ���� : ������ "RC" �� ����
		�ڵ��ϼ� Ŭ����: ������ "AT" �� ����
		�����˻� Ŭ����: ������ "RT" �� ����
        */
		var dt = new Date() ;
		dt.setTime( dt.getTime() + (60*1*1000) ); //< 1��
		atv.setCookie('SckIn', szType, DOMAIN, expireDate);
	}
	/*
	 * �ֱٰ˻��� Ű���� ��Ű ����
	 */
	,setKeywordCookie : function(szKeyword) {
        if (typeof(atv) == 'undefined') {
            $.getScript(STATIC_AFREECA_NONE_SCHEME + '/asset/library/afreeca/atv.min-1.5.js', function( data, textStatus, jqxhr) {});
            return;
        }
		var szCKKeyword = "";
		if (szKeyword == '' || szKeyword == 'undefined' || szKeyword == null) {
			return;
		}
        szCKKeyword = atv.getCookie('_csk');
        if (szCKKeyword == null) {
            szCKKeyword = '';
        }
        szCKKeyword= unescape(szCKKeyword);

        if (szCKKeyword != '') {
            var aData = szCKKeyword.split(this.szReg);
            $.each(aData, function(szKey, oItem) {
                if (oItem == szKeyword) {
                    aData.splice(szKey, 1);
                }
            });
            var aSaveData = new Array(szKeyword).concat(aData);
            szCKKeyword = aSaveData.join(this.szReg);
        } else {
            szCKKeyword = szKeyword;
        }

        atv.setCookie('_csk', szCKKeyword, DOMAIN);
	}

	, getAutoDataCheck: function () {
		if (afreeca.front.nAutoCurrentCount == -1) {  // sType �� ������ ���� �Է��� -1 ��
			$('input[name=szStype]').val('di');
			afreeca.front.keyword.szStype = 'di'
		} else if (afreeca.front.keyword.szStype == 'lc') {
			$('input[name=szStype]').val( 'lc' );
		} else if (afreeca.front.keyword.szStype == 'rk') {
			$('input[name=szStype]').val( 'rk');
		}
		// �ڵ��ϼ� �κ� ����� Ű����� �̵��� ����
		else {
			$('input[name=szStype]').val( 'ac' );
		}
	}

	,getRecommendDataCheck : function(){
		// ��õ�˻� �κ� ����� ����
		$('input[name=szStype]').val( 'rc' );
	}
	,deleteLatelySearchData : function(szType) {
        // keyword �κ� onsubmit �����ؾ� �˻��� ��
        $('form[name=oSearchForm], form[name=form1]').removeAttr('onsubmit');

		pdboxCookie = new Array();
		Parse_Cookie(document);
		if (szType == 'total') {
			var expireDate = new Date();
			expireDate.setDate( expireDate.getDate() - 1 );

            atv.setCookie('_csk', '', DOMAIN, expireDate);
			$(".mysch").empty();
			return;
		} else {
            var szCKKeyword = atv.getCookie('_csk');
            if (szCKKeyword == null) {
                szCKKeyword = '';
            }
            szCKKeyword= unescape(szCKKeyword);
            if (szCKKeyword != '') {
                var aData = szCKKeyword.split(this.szReg);
                $.each(aData, function(szKey, oItem) {
                    if (oItem == szType) {
                        aData.splice(szKey, 1);
                    }
                });
                var aSaveData = new Array().concat(aData);
                szCKKeyword = aSaveData.join(this.szReg);
            }

            if (szCKKeyword == this.szReg) {
                //�����ڸ� ��������  Ű ����[_csk]
				this.deleteLatelySearchData('total');
				return;
			}

			atv.setCookie('_csk', szCKKeyword, DOMAIN, expireDate);
		}
	}
	/*
	 *  �ֱ� �˻� ���̾�
	 */
	,getLatelySearchData : function(){
        var that = this;
        var szCKKeyword = atv.getCookie('_csk');
        if (szCKKeyword == null) {
            szCKKeyword = '';
        }
        var szHtml = '';
        var szTagFunction = '';

        szCKKeyword = unescape(szCKKeyword);
        if (szCKKeyword == '') {
            $('.mysch').hide();
            return;
        }
        var aData = szCKKeyword.split(this.szReg);

        szHtml += '<p class="stitle">�ֱ� �˻���</p><ul>';

        $.each(aData, function(szKey, oItem) {
            if (szKey >= 10) return;

            if (oItem != '') {
                oItem = oItem.replace(/\"/g, '&quot;');
                oItem = oItem.replace(/\'/g, '&#39;');

                szHtml += '<li><a href="javascript:void(0);" page_type="' + afreeca.front.szCurrentPageType + '" data="' + oItem + '"><span class="tit">'+oItem+'</span></a>';
                szHtml += '<button class="del" data="' + unescape(oItem) + '"></button></li>';
            }
        });

        szHtml += '</ul>';
        szHtml += '<p class="alldel"><a href=""javascript:void(0);" onmousedown="afreeca.front.keyword.deleteLatelySearchData(\'total\');">��ü����</a></p>';
        if (szHtml != '') {
            afreeca.front.isSearchLayerTypeFlag = true;
            afreeca.front.szLayerSearchId = "mysch";
			$('.mysch').html(szHtml).show();
			afreeca.front.keyword.szStype = 'lc';
			$('input[name=szStype]').val('lc');
			
			$('.mysch ul li a').off('mousedown').on('mousedown', function () {
                var szTempKeyword = $(this).attr('data');
				var szCurrentPageType = $(this).attr('page_type');
				$('input[name=szStype]').val('lc');
                $('form[name=oSearchForm], form[name=form1]').removeAttr('onsubmit');

                $('#szKeyword').val(szTempKeyword);
				that.setKeywordCookie(szTempKeyword);
				if (szCurrentPageType == 'SEARCH') {
                    afreeca.front.search.goPage();
                } else if (szCurrentPageType == 'SEARCHLIST') {
                    searchList();
				} else {
                    checkSearch(oSearchForm);
                }
            });
            $('.mysch ul li button.del').off('mousedown').on('mousedown', function(evt) {
                var szTempKeyword = $(this).attr('data');
                $('form[name=oSearchForm], form[name=form1]').attr('onsubmit', 'return false;');
                that.deleteLatelySearchData(szTempKeyword);
                that.callLayerChangeSearch();

                that.setEventBubbleStop(evt);
                evt.preventDefault();
                $('body').attr('show_flag', 'true');
            });

			$('.mysch').off('mouseover').on('mouseover', function (evt) {
                $('form[name=oSearchForm], form[name=form1]').attr('onsubmit', 'return false;');
                $('body').attr('show_flag', 'true');
                afreeca.front.isFlagAuto = true;
            });
			$('.mysch').off('mouseleave').on('mouseleave', function (evt) {
				afreeca.front.nAutoCurrentCount = -1
                $('form[name=oSearchForm], form[name=form1]').removeAttr('onsubmit');
                $('body').removeAttr('show_flag');
                afreeca.front.isFlagAuto = false;
            });
        } else {
            afreeca.front.isSearchLayerTypeFlag = false;
            $('.mysch').hide();
        }

        $('body').off('click').on('click', function(evt) {
            if ($('body').attr('show_flag') == 'true') {
                $('body').removeAttr('show_flag');

                afreeca.front.isFlagAuto = false;
                afreeca.front.isKeyPress = false;
                afreeca.front.isSearchLayerTypeFlag = false;
                that.setVisibleAutoSearch(false);
            }
        });
		return;
	}
	,callRecommendSearch : function( nStartNum ) {
		// ��õ �˻� ���
		if( typeof(oRecommendSearchJson) != 'undefined' )
		{
			if( oRecommendSearchJson.RESULT == 1 )
			{
				var szHtml = '<ul>';
				var oData = oRecommendSearchJson.LISTS[0].LIST;
				var nTotalCount = oData.length;
				if( nTotalCount > 10 )
				{
					nTotalCount = 10;
				}

				$('#btnPre, #btnNext').unbind('click');
				if( nStartNum < 0 )
				{
					nStartNum = nTotalCount-2;
				}
				else if( nStartNum >= nTotalCount )
				{
					nStartNum = 0;
				}

				if( nStartNum % 2 == 1 )
				{
					nStartNum += 1;
				}

				if( nTotalCount > 2 )
				{
					$('#btnPre').click(function() {
						afreeca.front.keyword.callRecommendSearch( nStartNum - 2 );
					});

					$('#btnNext').click(function() {
						afreeca.front.keyword.callRecommendSearch( nStartNum + 2 );
					});
				}
				else
				{
					$('#btnPre, #btnNext').hide();
				}

				var nCount = 0;
				var szHtml1 = '';	// css���� ������ ����� �������� ���� (ù��° ������)
				var szHtml2 = '';	// css���� ������ ����� �������� ���� (�ι�° ������)
				for(var i=nStartNum; i<nTotalCount; i++)
				{
					var szKeyWord = afreeca.front.keyword.getByteLength( oData[i].keyword, 13 ) ;
					var szSubKeyWord = oData[i].subkeyword.replace(/\'/g, '&quot;');
					szKeyWord = oData[i].keyword;

					if( nCount == 0 )
					{
						szHtml1 += '<li>';
						szHtml1 += '<a href="javascript:void(0);" onclick="javascript:$(\'#szKeyword\').val(\'' + szSubKeyWord + '\');afreeca.front.keyword.getRecommendDataCheck(\'' + szSubKeyWord + '\');checkSearch(oSearchForm);return false;">' + szKeyWord + '</a></li>';
					}
					else
					{
						szHtml2 += '<li class="first">';
						szHtml2 += '<a href="javascript:void(0);" onclick="javascript:$(\'#szKeyword\').val(\'' + szSubKeyWord + '\');afreeca.front.keyword.getRecommendDataCheck(\'' + szSubKeyWord + '\');checkSearch(oSearchForm);return false;">' + szKeyWord + '</a></li>';
					}
					nCount++;
					if( nCount >= 2 )
					{
						break;
					}
				}
				szHtml += szHtml2 + szHtml1 + '</ul>';
				$('#divRecommendSearch').html( szHtml );
			}
			else
			{
				$('#btnPre, #btnNext').hide();
			}
		}
		else
		{
			$('#btnPre, #btnNext').hide();
		}
	}
	//�ǽð� �˻���
	,callHotKeyword : function( szPageType ) {
		var szUrl = SEARCH_SCKETC_NONE_SCHEME +'/api.php';
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
				c		: "EUC-KR"
			},
			success	: function(oData,status){
				var szHtml = '';
				var that = this;
				if( typeof(oData.HOT) != 'undefined')
				{
					oData = oData.HOT;
					if(szPageType == "BAR")	//�˻�â�� ���̾�
					{
						var szHtml = '';
						var szTagType = "-";
						var szTagFunction = "";
						if( typeof(oData) != 'undefined' && oData.length != 0 )
						{
							szHtml += '<p class="stitle">�ǽð� �α� �˻���</p>';
							szHtml += '<ul>';
							$.each( oData, function ( szKey, oItem ) {
								if(oItem.show_text == "new")
								{
									szTagType = '<span class="new">new</span>';
								}
								else if( oItem.updown == "up" )
								{
									szTagType = '<span class="up">'+oItem.show_text+'</span>';
								}
								else if( oItem.updown == "down")
								{
									szTagType = '<span class="down">'+oItem.show_text+'</span>';
								}

								szHtml += '<li><a href="javascript:void(0);" page_type="' + afreeca.front.szCurrentPageType + '" data="' + oItem.keyword + '">';
                                szHtml += '<em>'+(szKey+1)+'</em><span class="tit">'+oItem.keyword+'</span><span class="rank">'+szTagType+'</span></a></li>';
							});
							szHtml += '</ul>';
						}
						if( szHtml != '' )
						{
							afreeca.front.isSearchLayerTypeFlag = true;
							afreeca.front.szLayerSearchId = "livesch";
							$('.livesch').html(szHtml).show();
							afreeca.front.keyword.szStype = 'rk';
							$('input[name=szStype]').val('rk');

							$('.livesch ul li a').off('mousedown').on('mousedown', function () {
                                var szTempKeyword = $(this).attr('data');
                                var szCurrentPageType = $(this).attr('page_type');
								$('input[name=szStype]').val('rk');
                                $('#szKeyword').val(szTempKeyword);
                                afreeca.front.keyword.setKeywordCookie(szTempKeyword);
                                if (szCurrentPageType == 'SEARCH') {
                                    afreeca.front.search.goPage();
                                } else if (szCurrentPageType == 'SEARCHLIST') {
                                    searchList();
                                } else {
                                    checkSearch(oSearchForm);
                                }
							});
							
							$('.livesch').off('mouseleave').on('mouseleave', function (evt) {
								afreeca.front.nAutoCurrentCount = -1
							});
						}
						else
						{
							afreeca.front.isSearchLayerTypeFlag = false;
							$('.livesch').hide();
						}

						//afreeca.front.keyword.saveAutoData(szKeyWord, oData);
					}
					else if(szPageType == "RNB")	//RNB ����
					{
						var szTagType = "-";
						szHtml += '<h4 class="stit">�ǽð� �˻���</h4><ol>';
						for( var i = 0; i<oData.length; i++ )
						{
							if(oData[i].show_text == "new")
							{
								szTagType = '<span class="new">new</span>';
							}
							else if( oData[i].updown == "up" )
							{
								szTagType = '<span class="up">'+oData[i].show_text+'</span>';
							}
							else if(oData[i].updown == "down")
							{
								szTagType = '<span class="down">'+oData[i].show_text+'</span>';
							}
							szHtml += '<li><a href="javascript:void(0);" onclick="afreeca.front.statistics.setRealTimeSearchParam(\'' + (oData[i].keyword) + '\');$(\'#szKeyword\').val(\'' + (oData[i].keyword) + '\').focus();afreeca.front.search.goPage();return false;"><em>'+(i+1)+'</em><span class="tit">'+oData[i].keyword+'</span><span class="rank">'+szTagType+'</span></a></li>';
						}
						szHtml += '</ol>';
						if( szHtml != '' )
						{
							$('#hot_Keyword').html( szHtml ).show();
						}
						else
						{
							$('#hot_Keyword').hide();
						}
					}
				}
			},
			error : function(jqXHR, status, errorThrow){
				return;
			}
		});
	}
	,callRecommendSearchRNB : function(szType){	//�˻�������
		// ��õ �˻��� ���
		if( typeof(oRecommendSearchJson) != 'undefined' )
		{
			var szHtml = '';
			if( oRecommendSearchJson.RESULT == 1 )
			{
				var oData = oRecommendSearchJson.LISTS[0].LIST;
				var nTotalCount = oData.length;
				szHtml += '<h4 class="stit">��õ �˻���</h4>';
				szHtml += '<ul>';

				for( var i = 0; i<nTotalCount; i++ )
				{
					szHtml += '<li>';
					szHtml += '<a href="javascript:void(0);" onclick="javascript:afreeca.front.statistics.setRecommendSearchParam(\'' + (oData[i].subkeyword) + '\');$(\'#szKeyword\').val(\'' + (oData[i].subkeyword) + '\').focus();afreeca.front.search.goPage();return false;">' + oData[i].keyword + '</a></li>';
				}
				szHtml += '</ul>';
			}
			$('#recommend_Keyword').html( szHtml ).show();
			this.callHotKeyword( 'RNB' );	//�ǽð� �˻���
		}
	}
	,callRecommendSearchWeb : function(){	//�˻�â �غκ�
		// ��õ �˻� ���
		if( typeof(oRecommendSearchJson) != 'undefined' )
		{
			var szHtml = '';
			if( oRecommendSearchJson.RESULT == 1 )
			{
				var oData = oRecommendSearchJson.LISTS[0].LIST;
				var nTotalCount = oData.length;
				szHtml += '<h4>��õ �˻���</h4>';
				szHtml += '<ul>';

				for( var i = 0; i<nTotalCount; i++ )
				{
					szHtml += '<li>';
					szHtml += '<a href="javascript:void(0);" onclick="javascript:afreeca.front.statistics.setRecommendSearchParam(\'' + (oData[i].keyword) + '\');$(\'#szKeyword\').val(\'' + (oData[i].keyword) + '\').focus();afreeca.front.search.goPage();return false;">' + oData[i].keyword + '</a></li>';
				}
				szHtml += '</ul>';
			}
		}

		$('#divRecommendSearchWeb').html( szHtml );
	}

	,callRelateSearch : function( szKeyWord ) {
		if( jQuery.trim(szKeyWord) == '' )
		{
			$('#divSearchRelate').html( '' );
			return;
		}

		// �����˻� ���� API
		var szUrl = SEARCH_SCKETC_NONE_SCHEME + '/api.php';
		var szType = 'relatedSearch';
		var szVersion = '1.0';

		$.ajax({
			type		: 'POST',
			dataType	: 'jsonp',
			jsonp		: 'callback',
			url			: szUrl,
			cache		: false,
			data		: {
				m		: szType,
				v		: szVersion,
				t		: 'json ',
				c		: 'EUC-KR',
				d		: encodeURIComponent(szKeyWord),
				n		: 20,
				w		: 'webk'
			},
			success	: function(oData,status){
				if( oData.ret == 1 )
				{
					var szHtml = '';
					if( typeof(oData.list) != 'undefined')
					{
						szHtml += '<h4>�����˻���</h4><ul>';
						for( var i = 0; i<oData.list.length; i++ )
						{
							if( i>20 )
							{
								break;
							}
							szHtml += '<li>';
							szHtml += '<a href="javascript:void(0);" onclick="javascript:afreeca.front.statistics.setRelateSearchParam(\'' + (oData.list[i].d) + '\');$(\'#szKeyword\').val(\'' + (oData.list[i].d) + '\').focus();afreeca.front.search.goPage();return false;">' + oData.list[i].d + '</a></li>';
						}
						szHtml += '</ul>';
					}
					if( szHtml != '' )
					{
						$('#divSearchRelate').html( szHtml ).show();
					}
					else
					{
						$('#divSearchRelate').hide();
					}
				}
			},
			error : function(jqXHR, status, errorThrow){
				//alert(status);
				return;
			}
		});
	}

	,callSavedAutoSearch : function( szKeyWord, szDevice, szDoc, szScript, cssColor, callbackFunction ) {
		// ����� ������ �ִ��� Ȯ��
		if( afreeca.front.oAutoDataList[szKeyWord] )
		{
			if( typeof(callbackFunction) == 'function' )
			{
				callbackFunction(szKeyWord, szDevice, szDoc, szScript, cssColor, oData,status);
			}
			return true;
		}
		return false;
	}
	//�˻����̾� (�ֱٰ˻������� / �ǽð� �α�˻������� Ȯ�� �ؼ� �����ش�.)
	,callLayerChangeSearch : function( ) {

        var that = this;
        if (typeof(atv) == 'undefined') {
            $.getScript(STATIC_AFREECA_NONE_SCHEME + '/asset/library/afreeca/atv.min-1.5.js', function(data, textStatus, jqxhr) {
                that.callLayerChangeSearch();
            });
            return;
        }
		var szCKKeyword = atv.getCookie('_csk');
        if (szCKKeyword == null) {
            szCKKeyword = '';
		}
        szCKKeyword = unescape(szCKKeyword);
        if (szCKKeyword != '') {
			this.getLatelySearchData();
			afreeca.front.keyword.szStype = 'lc';
        } else {
			$('.mysch').hide();
            this.callHotKeyword( 'BAR' );	//�ǽð� �˻���
        }

	}
	, callAutoSearch: function (szKeyWord, szDevice, szDoc, szScript, cssColor, callbackFunction, callbackFunction2) {
		// �ڵ��˻� ���� API
		if (jQuery.trim(szKeyWord) == '')
		{
			afreeca.front.szOldAutoKeyWord = '';
			afreeca.front.szOldAutoKeyWord2 = '';
			$('#divSearchAuto').html('').hide();
			$('.mysch').html('').hide();
			$('.livesch').html('').hide();
			this.callLayerChangeSearch();
			return;
		}
		else
		{
			afreeca.front.isSearchLayerTypeFlag = false;
			//Ű�� �ι� �Է� �Ǿ��� ���
			$('.mysch').html('').hide();
			$('.livesch').html('').hide();
			afreeca.front.keyword.szStype = 'ac';
		}

		// '\' ���� ����
		if (jQuery.trim(szKeyWord).match(/\\/g) != null  )
		{
			szKeyWord = jQuery.trim(szKeyWord).replace(/\\/g, '');
		}
		// " ���� ����
		if (jQuery.trim(szKeyWord).match(/\"/g) != null )
		{
			szKeyWord = jQuery.trim(szKeyWord).replace(/\"/g, '');
		}

		if (afreeca.front.isFlagAuto)
		{
			//$('#divSearchAuto').html( '' ).hide();
			afreeca.front.isFlagAuto = false;
			return;
		}

		// setTimeout()�Լ��� ���Ͽ� ��ĥ��쿡 ���� ����ó��
		if ($(szDoc).val() != szKeyWord)
		{
			//$( szDoc ).val( szKeyWord );
			afreeca.front.szOldAutoKeyWord = szKeyWord;
			afreeca.front.szOldAutoKeyWord2 = szKeyWord;
			return;
		}

		// ����� ������ �ִ��� Ȯ��
		if (afreeca.front.oAutoDataList[szKeyWord])
		{
			if (typeof (callbackFunction2) == 'function')
			{
				callbackFunction2(szKeyWord, szDevice, szDoc, szScript, cssColor);
				return true;
			}
		}

		var szDeviceData = 'webk';	// pc �� ���
		if (szDevice == 'player')
		{
			// �÷��̾� �� ���
			szDeviceData = 'atv1 ';
		}
		var szUrl = SEARCH_SCKETC_NONE_SCHEME + '/api.php';
		var szType = 'autoJaso';
		var szVersion = '1.0';
		var szCharset = (typeof (document.charset) != 'undefined') ? document.charset.toUpperCase() : document.characterSet.toUpperCase();
		if (szCharset == null || typeof (szCharset) == 'undefined')
		{
			szCharset = 'EUC-KR';
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
				d: encodeURIComponent(szKeyWord),
				n: 10,
				w: szDeviceData
			},
			success: function (oData, status) {
				if (typeof (callbackFunction) == 'function')
				{
					callbackFunction(szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status);
				}
			},
			error: function (jqXHR, status, errorThrow) {
				//alert(status);
				return;
			}
		});
	}

	, setEventBubbleStop : function( evt ){
		if( typeof(evt.returnValue) != 'undefined' )
		{
			evt.returnValue = false;
		}
		if( typeof(evt.preventDefault) == 'function' )
		{
			evt.preventDefault();
		}
	}

	, setAutoDataColor : function( szDoc, cssColor, nNum ){
		// �ڵ��ϼ� �˻��� ���� �ʱ�ȭ
		$('#divSearchAuto li>a').css('background','');
		if( typeof(nNum) != 'undefined' )
		{
			afreeca.front.nAutoCurrentCount = nNum;
			//$( szDoc ).val( $('#divSearchAuto li>a').eq(nNum).text() );	// ���콺 ��Ŀ���� ������� �Է�â�� ����ϴ� �κ�
			$('#divSearchAuto li>a').eq(nNum).css('background', cssColor);
			afreeca.front.isFlagAuto = true;
		}
	}

	, saveAutoData : function( szKeyWord, oData ){
		if( typeof(oData.list) != 'undefined')
		{
			if( afreeca.front.oAutoDataListCount > 1000 )
			{
				return;
			}

			// ����� �����Ͱ� �ִٸ� ���� ����
			if( !afreeca.front.oAutoDataList[szKeyWord] )
			{
				afreeca.front.oAutoDataListCount++;
			}
			afreeca.front.oAutoDataList[szKeyWord] = oData.list;
			if( typeof(oData.tm) != 'undefined' )
			{
				afreeca.front.oAutoDataList[szKeyWord]['time'] = oData.tm;
				afreeca.front.nDateTime = oData.tm;
			}
		}
		else
		{
			if( afreeca.front.oAutoDataListCount > 1000 )
			{
				return;
			}

			// ����� �����Ͱ� �ִٸ� ���� ����
			if( !afreeca.front.oAutoDataList[szKeyWord] )
			{
				afreeca.front.oAutoDataListCount++;
			}
			afreeca.front.oAutoDataList[szKeyWord] = new Array();
			if( typeof(oData.tm) != 'undefined' )
			{
				afreeca.front.oAutoDataList[szKeyWord]['time'] = oData.tm;
			}
		}
		return;
	}

	, setVisibleAutoSearch: function (isFlag) {
        // �ڵ��ϼ� ���̱�/�����
		if( isFlag == true )
		{
			$('#divSearchAuto').show();
		}
		else
		{
			//if( $( '#divSearchAuto' ).css('display') == 'none' )
			if( !afreeca.front.isFlagAuto )
			{
				afreeca.front.isSearchLayerTypeFlag = false;
				$('#divSearchAuto').hide();
				$('.mysch').hide();
				$('.livesch').hide();
			}
		}
	}


	/**
		Common �κ�
	**/
	, makeAutoDataCommon : function( szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status ){
		// Main �ڵ��ϼ� �˻� ��� �κ�
		if( oData.ret == 1 )
		{
			var szHtml = '';
			var nCount = 0;
			if( typeof(oData.list) != 'undefined')
			{
				afreeca.front.szOldAutoKeyWord = szKeyWord;
				afreeca.front.szOldAutoKeyWord2 = szKeyWord;

				szHtml += '<ul>';
				for( var i = 0; i<oData.list.length; i++ )
				{
					if( typeof(oData.list[i].d) != 'undefined' )
					{
						szHtml += '<li>';
						szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
						szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\''+ (oData.list[i].d) +'\');' + szScript + '" ';
						szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\''+ (oData.list[i].d) +'\');' + szScript + '" ';
						szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + oData.list[i].d + '</a></li>';
						nCount++;
					}
				}
				szHtml += '</ul>';
			}

			if( nCount > 0 )
			{
				$('#divSearchAuto').html( szHtml ).show();
			}
			else
			{
				$('#divSearchAuto').hide();
			}

			afreeca.front.keyword.saveAutoData(szKeyWord, oData);
			afreeca.front.nAutoCurrentCount = -1;
			return true;
		}
	}
	, makeSavedAutoDataCommon : function( szKeyWord, szDevice, szDoc, szScript, cssColor ){
		// Main �ڵ��ϼ� �˻� ��� �κ� (����� ������)
		afreeca.front.szOldAutoKeyWord = szKeyWord;
		afreeca.front.szOldAutoKeyWord2 = szKeyWord;
		// ���� 5���̻�(300��)�̸� ������ ����
		if( typeof(afreeca.front.oAutoDataList[szKeyWord]['time']) != 'undefined' )
		{
			if( (afreeca.front.nDateTime - afreeca.front.oAutoDataList[szKeyWord]['time'] ) > 300 )
			{
				delete afreeca.front.oAutoDataList[szKeyWord];
				//delete afreeca.front.oAutoDataList[szKeyWord]['time'];
				afreeca.front.oAutoDataListCount--;
			}
		}

		var szHtml = '';
		var nCount = 0;
		szHtml += '<ul>';
		for ( var i in afreeca.front.oAutoDataList[szKeyWord] )
		{
			if( typeof(afreeca.front.oAutoDataList[szKeyWord][i].d) != 'undefined' )
			{
				szHtml += '<li>';
				szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
				szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';

				szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';
				szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + afreeca.front.oAutoDataList[szKeyWord][i].d + '</a></li>';
				nCount++;
			}
		}
		szHtml += '</ul>';

		if( nCount > 0 )
		{
			$('#divSearchAuto').html( szHtml ).show();
		}
		else
		{
			$('#divSearchAuto').hide();
		}
		afreeca.front.nAutoCurrentCount = -1;
		return true;
	}
	, checkKeyUpCommon: function (evt) {
		// PC-Web �κ� - Ű �Է½� ���� �κ�
		if( afreeca.front.isKeyPress )
		{
			afreeca.front.isKeyPress = false;
			return false;
		}
		if( evt.keyCode == 13 || evt.keyCode == 220 || evt.keyCode ==37 || evt.keyCode == 39 )
		{
			return false;
		}

		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = '$(\'#szStype\').val(\'ac\');checkSearch(oSearchForm);';

		var cssColor = $('input[name=szInputColor]').val();
	
		if (this.nEvent) {
			return false;
		}
		afreeca.front.keyword.callAutoSearch($(szDoc).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataCommon, afreeca.front.keyword.makeSavedAutoDataCommon);
		this.nEvent = 0;
		return true;
	}

	, checkKeyDownCommon: function (evt) {
		var that = this;
		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = '$(\'#szStype\').val(\'ac\');checkSearch(oSearchForm);';
		var cssColor = $('input[name=szInputColor]').val();
		that.szKeyCode = evt.keyCode;

		if (evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220 || evt.keyCode == 37 || evt.keyCode == 39)
		{
			if (that.oInterval != null)
			{
				clearInterval(that.oInterval);
			}
			if (typeof (evt.returnValue) != 'undefined')
			{
				evt.returnValue = false;
			}
			if (typeof (evt.preventDefault) == 'function')
			{
				evt.preventDefault();
			}

			$('#szStype').val('');	// �ʱ�ȭ
			if( afreeca.front.isSearchLayerTypeFlag) {//�ǽð��α�˻���/�ֱٰ˻���
				afreeca.front.keyword.setKeyDownLayerSearchWeb(evt, szDevice, szDoc, szScript, cssColor, afreeca.front.szLayerSearchId);
			}
			else {
				afreeca.front.keyword.setKeyDownCommon(evt, szDevice, szDoc, szScript, cssColor);
			}
			afreeca.front.isKeyPress = true;
			return false;
		} else if (evt.keyCode != 13){
			$('#szStype').val('di');
		}

		that.nEvent = 0;

		return true;
	}
	, setClickCommon: function () {
        // Ŭ���� �ڵ��ϼ� ������ ���
		if( !afreeca.front.isFlagAuto && $( '#divSearchAuto' ).css('display') == 'none' )
		{
            $('#divSearchAuto').html( '' ).hide();
			var szDevice = 'pc';
			var szDoc = '#szKeyword';
			var szScript = '$(\'#szStype\').val(\'ac\');checkSearch(oSearchForm);';
			var cssColor = $('input[name=szInputColor]').val();
			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataCommon, afreeca.front.keyword.makeSavedAutoDataCommon );
		}
	}
	, setKeyDownCommon: function (evt, szDevice, szDoc, szScript, cssColor) {
		if (evt.keyCode == 37 || evt.keyCode == 39) {
			evt.returnValue = false;
		// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
		} else if( evt.keyCode == 40 )
		{
			// ȭ��ǥ �Ʒ� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();

				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataCommon, afreeca.front.keyword.makeSavedAutoDataCommon ) == true )
				{
					afreeca.front.nAutoCurrentCount = -1;
					$('#divSearchAuto').show();
				}
			}

			afreeca.front.nAutoCurrentCount++;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				$('#szStype').val('ac');
				
				if( afreeca.front.nAutoCurrentCount > nTotalCount )
				{
					afreeca.front.nAutoCurrentCount = -1;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					this.nEvent = 1;
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}
		else if( evt.keyCode == 38 )
		{
			// ȭ��ǥ �� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();
				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataCommon, afreeca.front.keyword.makeSavedAutoDataCommon ) == true )
				{
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
					afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
				}
			}
			afreeca.front.nAutoCurrentCount--;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				$('#szStype').val('ac');

				if( afreeca.front.nAutoCurrentCount < 0 )
				{
					afreeca.front.nAutoCurrentCount = nTotalCount;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					this.nEvent = 1;
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 220 )
		{
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			return true;
		}

		afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
		return false;
	}



	/**
		Main �κ�
	**/
	, makeAutoDataMain : function( szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status ){
		// Main �ڵ��ϼ� �˻� ��� �κ�
		if( oData.ret == 1 )
		{
			var szHtml = '';
			var nCount = 0;
			if( typeof(oData.list) != 'undefined')
			{
				afreeca.front.szOldAutoKeyWord = szKeyWord;
				afreeca.front.szOldAutoKeyWord2 = szKeyWord;

				szHtml += '<ul>';
				for( var i = 0; i<oData.list.length; i++ )
				{
					if( typeof(oData.list[i].d) != 'undefined' )
					{
						szHtml += '<li>';
						szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
						szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\''+ (oData.list[i].d) +'\');' + szScript + '" ';
						szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\''+ (oData.list[i].d) +'\');' + szScript + '" ';
						szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + oData.list[i].d + '</a></li>';
						nCount++;
					}
				}
				szHtml += '</ul>';
			}

			if( nCount > 0 )
			{
				$('#divSearchAuto').html( szHtml ).show();
			}
			else
			{
				$('#divSearchAuto').hide();
			}

			afreeca.front.keyword.saveAutoData(szKeyWord, oData);
			afreeca.front.nAutoCurrentCount = -1;
			return true;
		}
	}
	, makeSavedAutoDataMain : function( szKeyWord, szDevice, szDoc, szScript, cssColor ){
		// Main �ڵ��ϼ� �˻� ��� �κ� (����� ������)
		afreeca.front.szOldAutoKeyWord = szKeyWord;
		afreeca.front.szOldAutoKeyWord2 = szKeyWord;
		// ���� 5���̻�(300��)�̸� ������ ����
		if( typeof(afreeca.front.oAutoDataList[szKeyWord]['time']) != 'undefined' )
		{
			if( (afreeca.front.nDateTime - afreeca.front.oAutoDataList[szKeyWord]['time'] ) > 300 )
			{
				delete afreeca.front.oAutoDataList[szKeyWord];
				//delete afreeca.front.oAutoDataList[szKeyWord]['time'];
				afreeca.front.oAutoDataListCount--;
			}
		}

		var szHtml = '';
		var nCount = 0;
		szHtml += '<ul>';
		for ( var i in afreeca.front.oAutoDataList[szKeyWord] )
		{
			if (typeof(afreeca.front.oAutoDataList[szKeyWord][i].d) != 'undefined') {
                var szTempKeyWord = afreeca.front.oAutoDataList[szKeyWord][i].d;
				szHtml += '<li>';
				szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
				szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + szTempKeyWord + '\').focus();afreeca.front.keyword.setKeywordCookie(\''+ szTempKeyWord +'\');' + szScript + '"';

				szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + szTempKeyWord + '\').focus();afreeca.front.keyword.setKeywordCookie(\''+ szTempKeyWord +'\');' + szScript + '"';
				szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + szTempKeyWord + '</a></li>';
				nCount++;
			}
		}
		szHtml += '</ul>';

		if( nCount > 0 )
		{
			$('#divSearchAuto').html( szHtml ).show();
		}
		else
		{
			$('#divSearchAuto').hide();
		}
		afreeca.front.nAutoCurrentCount = -1;
		return true;
	}
	, checkKeyUpMain : function( evt ){
		// PC-Web �κ� - Ű �Է½� ���� �κ�
		if( afreeca.front.isKeyPress )
		{
			afreeca.front.isKeyPress = false;
			return false;
		}
		if( evt.keyCode == 13 || evt.keyCode == 220)
		{
			return false;
		}

		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = 'afreeca.front.keyword.getAutoDataCheck();checkSearch(oSearchForm);';
		var cssColor = $('input[name=szInputColor]').val();
		if( afreeca.front.keyword.setKeyDownMain( evt, szDevice, szDoc, szScript, cssColor ) == true )
		{
			return false;
		}

		afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataMain, afreeca.front.keyword.makeSavedAutoDataMain );
		return true;
	}

	, checkKeyDownMain: function (evt) {
		var that = this;
		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = 'afreeca.front.keyword.getAutoDataCheck();checkSearch(oSearchForm);';
		var cssColor = $('input[name=szInputColor]').val();
		that.szKeyCode = evt.keyCode;

		if (evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220)
		{
			if (that.oInterval != null)
			{
				clearInterval(that.oInterval);
			}

			if (typeof (evt.returnValue) != 'undefined')
			{
				evt.returnValue = false;
			}
			if (typeof (evt.preventDefault) == 'function')
			{
				evt.preventDefault();
			}
			if( afreeca.front.isSearchLayerTypeFlag)
			{//�ǽð��α�˻���/�ֱٰ˻���
				afreeca.front.keyword.setKeyDownLayerSearchWeb(evt, szDevice, szDoc, szScript, cssColor, afreeca.front.szLayerSearchId);
			}
			else
			{//�ڵ� �ϼ� �˻��϶�
				afreeca.front.keyword.setKeyDownMain(evt, szDevice, szDoc, szScript, cssColor);
			}
			afreeca.front.isKeyPress = true;
			return false;
		}

		if (navigator.userAgent.toLowerCase().match(/firefox\/(\d)/i))
		{
			that.oInterval = setInterval(function () {
				if (afreeca.front.szOldAutoKeyWord != $(szDoc).val() && (that.szKeyCode != 40 && that.szKeyCode != 38 && that.szKeyCode != 220))
				{
					afreeca.front.keyword.callAutoSearch($(szDoc).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataMain, afreeca.front.keyword.makeSavedAutoDataMain);
				}
			}, 100);
		}
		return true;
	}
	, setClickMain : function(){
		// Ŭ���� �ڵ��ϼ� ������ ���
		if( !afreeca.front.isFlagAuto && $( '#divSearchAuto' ).css('display') == 'none' )
		{
			$('#divSearchAuto').html( '' ).hide();
			var szDevice = 'pc';
			var szDoc = '#szKeyword';
			var szScript = 'afreeca.front.keyword.getAutoDataCheck();checkSearch(oSearchForm);';
			var cssColor = $('input[name=szInputColor]').val();

			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataMain, afreeca.front.keyword.makeSavedAutoDataMain );
		}
	}
	, setKeyDownMain : function( evt, szDevice, szDoc, szScript, cssColor ){
		// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
		if( evt.keyCode == 40 )
		{
			// ȭ��ǥ �Ʒ� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();

				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataMain, afreeca.front.keyword.makeSavedAutoDataMain ) == true )
				{
					afreeca.front.nAutoCurrentCount = -1;
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
				}
			}

			afreeca.front.nAutoCurrentCount++;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount > nTotalCount )
				{
					afreeca.front.nAutoCurrentCount = -1;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}
		else if( evt.keyCode == 38 )
		{
			// ȭ��ǥ �� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();
				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataMain, afreeca.front.keyword.makeSavedAutoDataMain ) == true )
				{
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
					afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
				}
			}
			afreeca.front.nAutoCurrentCount--;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount < 0 )
				{
					afreeca.front.nAutoCurrentCount = nTotalCount;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 220 )
		{
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			return true;
		}
		afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
		return false;
	}


	/**
		Web - �˻� �κ�
	**/
	, makeAutoDataWeb : function (szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status) {
		// Web �ڵ��ϼ� �˻� ��� �κ�
		if (oData.ret == 1) {
			var szHtml = '';
			var nCount = 0;
			if (typeof(oData.list) != 'undefined') {
				afreeca.front.szOldAutoKeyWord = szKeyWord;
				afreeca.front.szOldAutoKeyWord2 = szKeyWord;

				szHtml += '<ul>';
				for (var i = 0; i<oData.list.length; i++) {
					if (typeof(oData.list[i].d) != 'undefined') {
						szHtml += '<li>';
						szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
						szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\'' + oData.list[i].d + '\');' + szScript + '" ';
						szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');afreeca.front.keyword.setKeywordCookie(\'' + oData.list[i].d + '\');' + szScript + '" ';
						szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + oData.list[i].d + '</a></li>';
						nCount++;
					}
				}
				szHtml += '</ul>';
			}

			if (nCount > 0) {
				$('#divSearchAuto').html( szHtml ).show();
			} else {
				$('#divSearchAuto').hide();
			}

			afreeca.front.keyword.saveAutoData(szKeyWord, oData);
			afreeca.front.nAutoCurrentCount = -1;
			return true;
		}
	}
	, makeSavedAutoDataWeb : function(szKeyWord, szDevice, szDoc, szScript, cssColor) {
		// Main �ڵ��ϼ� �˻� ��� �κ� (����� ������)
		afreeca.front.szOldAutoKeyWord = szKeyWord;
		afreeca.front.szOldAutoKeyWord2 = szKeyWord;
		// ���� 5���̻�(300��)�̸� ������ ����
		if (typeof(afreeca.front.oAutoDataList[szKeyWord]['time']) != 'undefined') {
			if ((afreeca.front.nDateTime - afreeca.front.oAutoDataList[szKeyWord]['time'] ) > 300) {
				delete afreeca.front.oAutoDataList[szKeyWord];
				afreeca.front.oAutoDataListCount--;
			}
		}

		var szHtml = '';
		var nCount = 0;
		szHtml += '<ul>';
		for (var i in afreeca.front.oAutoDataList[szKeyWord]) {
			if (typeof(afreeca.front.oAutoDataList[szKeyWord][i].d) != 'undefined') {
				szHtml += '<li>';
				szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
				szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';

				szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';
				szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + afreeca.front.oAutoDataList[szKeyWord][i].d + '</a></li>';
				nCount++;
			}
		}
		szHtml += '</ul>';

		if (nCount > 0) {
			$('#divSearchAuto').html( szHtml ).show();
		} else {
			$('#divSearchAuto').hide();
		}
		afreeca.front.nAutoCurrentCount = -1;
		return true;
	}
	, checkKeyUpWeb: function (evt) {
		// PC-Web �κ� - Ű �Է½� ���� �κ�
		if( afreeca.front.isKeyPress )
		{
			afreeca.front.isKeyPress = false;
			return false;
		}
		if( evt.keyCode == 13 || evt.keyCode == 220 || evt.keyCode ==37 || evt.keyCode == 39)
		{
			return false;
		}

		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = 'afreeca.front.keyword.getAutoDataCheck();afreeca.front.search.goPage();';

		var cssColor = $('input[name=szInputColor]').val();
	
		if (this.nEvent) {
			return false;
		}
		afreeca.front.keyword.callAutoSearch($(szDoc).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb);
		this.nEvent = 0;
		return true;
	}
	, checkKeyDownWeb: function (evt) {
		var that = this;
		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = '';
		var cssColor = $('input[name=szInputColor]').val();
		that.szKeyCode = evt.keyCode;

		if (evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220)
		{
			if (that.oInterval != null)
			{
				clearInterval(that.oInterval);
			}
			if (typeof (evt.returnValue) != 'undefined')
			{
				evt.returnValue = false;
			}
			if (typeof (evt.preventDefault) == 'function')
			{
				evt.preventDefault();
			}
			szScript = 'afreeca.front.keyword.getAutoDataCheck();afreeca.front.search.goPage();';
			if( afreeca.front.isSearchLayerTypeFlag)
			{//�ǽð��α�˻���/�ֱٰ˻���
				afreeca.front.keyword.setKeyDownLayerSearchWeb(evt, szDevice, szDoc, szScript, cssColor, afreeca.front.szLayerSearchId);
			}
			else
			{//�ڵ� �ϼ� �˻��϶�
				afreeca.front.keyword.setKeyDownWeb(evt, szDevice, szDoc, szScript, cssColor);
			}
			afreeca.front.isKeyPress = true;
			return false;
		} else {
			that.nEvent = 0;
		}

		if (navigator.userAgent.toLowerCase().match(/firefox\/(\d)/i))
		{
			that.oInterval = setInterval(function () {
				if (afreeca.front.szOldAutoKeyWord != $(szDoc).val() && (that.szKeyCode != 40 && that.szKeyCode != 38 && that.szKeyCode != 220))
				{
					afreeca.front.keyword.callAutoSearch($(szDoc).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb);
				}
			}, 100);
		}

		return true;
	}
	//�˻����̾� ����
	, setNonLayerSearch : function(){
		$('#divSearchAuto').html( '' ).hide();
		$('.mysch').html( '' ).hide();
		$('.livesch').html( '' ).hide();
	}
	, setClickWeb : function(){
		// Ŭ���� �ڵ��ϼ� ������ ���
		if( !afreeca.front.isFlagAuto && $( '#divSearchAuto' ).css('display') == 'none' )
		{
			this.setNonLayerSearch();
			var szDevice = 'pc';
			var szDoc = '#szKeyword';
			var szScript = 'afreeca.front.keyword.getAutoDataCheck();afreeca.front.search.goPage();';
			var cssColor = $('input[name=szInputColor]').val();
			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb );
		}
	}
	, setKeyDownWeb: function (evt, szDevice, szDoc, szScript, cssColor) {
		// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
		if( evt.keyCode == 40 )
		{
			// ȭ��ǥ �Ʒ� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();

				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb ) == true )
				{
					afreeca.front.nAutoCurrentCount = -1;
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
				}
			}

			afreeca.front.nAutoCurrentCount++;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount > nTotalCount )
				{
					afreeca.front.nAutoCurrentCount = -1;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					this.nEvent = 1;
					afreeca.front.keyword.szStype = 'ac';
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}
		else if( evt.keyCode == 38 )
		{
			// ȭ��ǥ �� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();
				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb ) == true )
				{
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
					afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
				}
			}
			afreeca.front.nAutoCurrentCount--;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount < 0 )
				{
					afreeca.front.nAutoCurrentCount = nTotalCount;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					this.nEvent = 1;
					afreeca.front.keyword.szStype = 'ac';
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		} else {
			this.nEvent = 0;
		}

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 220 )
		{
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			return true;
		}
		afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
		return false;
	}
	, setKeyDownLayerSearchWeb: function (evt, szDevice, szDoc, szScript, cssColor, szLayerId) {
		// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
		if (evt.keyCode == 37 || evt.keyCode == 39) {
			evt.returnValue = false;
		} else if( evt.keyCode == 40 )
		{
			// ȭ��ǥ �Ʒ� ����
			if( $( '.'+szLayerId ).css('display') == 'none' )
			{
				$('.'+szLayerId).html( '' ).hide();

				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb ) == true )
				{
					afreeca.front.nAutoCurrentCount = -1;
					$('.'+szLayerId).show();
				}
			}

			afreeca.front.nAutoCurrentCount++;
			$('.'+szLayerId+' li>a').css('background','');
			var nTotalCount = $('.'+szLayerId+' li>a').length;

			if( nTotalCount > 0 )
			{
				if (szLayerId == 'mysch') {
					$('#szStype').val('lc');
				} else if (szLayerId == 'livesch') {
					$('#szStype').val('rk');
				}

				if( afreeca.front.nAutoCurrentCount > nTotalCount )
				{
					afreeca.front.nAutoCurrentCount = -1;
				}

				if( $('.'+szLayerId+' li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('.'+szLayerId+' li>a>.tit').eq(afreeca.front.nAutoCurrentCount).text() );
					$('.'+szLayerId+' li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('.'+szLayerId).hide();
				}
			}
		}
		else if( evt.keyCode == 38 )
		{
			// ȭ��ǥ �� ����
			if( $( '.'+szLayerId ).css('display') == 'none' )
			{
				$('.'+szLayerId).hide();
				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWeb, afreeca.front.keyword.makeSavedAutoDataWeb ) == true )
				{
					$('#divSearchAuto').show();
					afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
				}
			}
			afreeca.front.nAutoCurrentCount--;
			$('.'+szLayerId+' li>a').css('background','');
			var nTotalCount = $('.'+szLayerId+' li>a').length;
			if( nTotalCount > 0 )
			{
				if (szLayerId == 'mysch') {
					$('#szStype').val('lc');
				} else if (szLayerId == 'livesch') {
					$('#szStype').val('rk');
				}

				if( afreeca.front.nAutoCurrentCount < 0 )
				{
					afreeca.front.nAutoCurrentCount = nTotalCount;
				}

				if( $('.'+szLayerId+' li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('.'+szLayerId+' li>a>.tit').eq(afreeca.front.nAutoCurrentCount).text() );
					$('.'+szLayerId+' li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('.'+szLayerId).hide();
				}
			}
		} else {
			afreeca.front.keyword.szStype = 'di';
		}

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220 )
		{
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			return true;
		}
		afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
		return false;
	}
	/**
		Web - List �κ�
	**/
	, makeAutoDataWebList : function( szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status ){
		// Web �ڵ��ϼ� �˻� ��� �κ�
		if( oData.ret == 1 )
		{
			var szHtml = '';
			var nCount = 0;
			if( typeof(oData.list) != 'undefined')
			{
				afreeca.front.szOldAutoKeyWord = szKeyWord;
				afreeca.front.szOldAutoKeyWord2 = szKeyWord;

				szHtml += '<ul>';
				for( var i = 0; i<oData.list.length; i++ )
				{
					if( typeof(oData.list[i].d) != 'undefined' )
					{
						szHtml += '<li>';
						szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
						szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');' + szScript + '" ';
						szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');' + szScript + '" ';
						szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + oData.list[i].d + '</a></li>';
						nCount++;
					}
				}
				szHtml += '</ul>';
			}

			if( nCount > 0 )
			{
				$('#divSearchAuto').html( szHtml ).show();
			}
			else
			{
				$('#divSearchAuto').hide();
			}

			afreeca.front.keyword.saveAutoData(szKeyWord, oData);
			afreeca.front.nAutoCurrentCount = -1;
			return true;
		}
	}
	, makeSavedAutoDataWebList : function( szKeyWord, szDevice, szDoc, szScript, cssColor ){
		// Main �ڵ��ϼ� �˻� ��� �κ� (����� ������)
		afreeca.front.szOldAutoKeyWord = szKeyWord;
		afreeca.front.szOldAutoKeyWord2 = szKeyWord;
		// ���� 5���̻�(300��)�̸� ������ ����
		if( typeof(afreeca.front.oAutoDataList[szKeyWord]['time']) != 'undefined' )
		{
			if( (afreeca.front.nDateTime - afreeca.front.oAutoDataList[szKeyWord]['time'] ) > 300 )
			{
				delete afreeca.front.oAutoDataList[szKeyWord];
				//delete afreeca.front.oAutoDataList[szKeyWord]['time'];
				afreeca.front.oAutoDataListCount--;
			}
		}

		var szHtml = '';
		var nCount = 0;
		szHtml += '<ul>';
		for ( var i in afreeca.front.oAutoDataList[szKeyWord] )
		{
			if( typeof(afreeca.front.oAutoDataList[szKeyWord][i].d) != 'undefined' )
			{
				szHtml += '<li>';
				szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
				szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';

				szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';
				szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + afreeca.front.oAutoDataList[szKeyWord][i].d + '</a></li>';
				nCount++;
			}
		}
		szHtml += '</ul>';

		if( nCount > 0 )
		{
			$('#divSearchAuto').html( szHtml ).show();
		}
		else
		{
			$('#divSearchAuto').hide();
		}
		afreeca.front.nAutoCurrentCount = -1;
		return true;
	}
	, checkKeyUpWebList: function (evt) {
		// PC-Web �κ� - Ű �Է½� ���� �κ�
		if (afreeca.front.isKeyPress)
		{
			afreeca.front.isKeyPress = false;
			return false;
		}
		if (evt.keyCode == 13 || evt.keyCode == 220)
		{
			return false;
		}

		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = 'afreeca.front.keyword.setSckCookie(\'AT\');searchList();';
		var cssColor = $('input[name=szInputColor]').val();
		if (afreeca.front.keyword.setKeyDownWebList(evt, szDevice, szDoc, szScript, cssColor) == true)
		{
			return false;
		}

		afreeca.front.keyword.callAutoSearch($(szDoc).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWebList, afreeca.front.keyword.makeSavedAutoDataWebList);
		return true;
	}
	, checkKeyDownWebList : function( evt ){
		var that = this;
		var szDevice = 'pc';
		var szDoc = '#szKeyword';
		var szScript = 'afreeca.front.keyword.setSckCookie(\'AT\');searchList();';
		var cssColor = $('input[name=szInputColor]').val();
		that.szKeyCode = evt.keyCode;

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220 )
		{
			if( that.oInterval != null )
			{
				clearInterval( that.oInterval );
			}
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			if( afreeca.front.isSearchLayerTypeFlag)
			{//�ǽð��α�˻���/�ֱٰ˻���
				afreeca.front.keyword.setKeyDownLayerSearchWeb(evt, szDevice, szDoc, szScript, cssColor, afreeca.front.szLayerSearchId);
			}
			else
			{//�ڵ� �ϼ� �˻��϶�
				afreeca.front.keyword.setKeyDownWebList( evt, szDevice, szDoc, szScript, cssColor );
			}
			afreeca.front.isKeyPress = true;
			return false;
		}

		if( navigator.userAgent.toLowerCase().match(/firefox\/(\d)/i) )
		{
			that.oInterval = setInterval( function(){
				if( afreeca.front.szOldAutoKeyWord != $( szDoc ).val() && ( that.szKeyCode != 40 && that.szKeyCode != 38 && that.szKeyCode != 220 ) )
				{
					afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWebList, afreeca.front.keyword.makeSavedAutoDataWebList );
				}}, 100);
		}
		return true;
	}
	, setClickWebList : function(){
		// Ŭ���� �ڵ��ϼ� ������ ���
		if( !afreeca.front.isFlagAuto && $( '#divSearchAuto' ).css('display') == 'none' )
		{
			$('#divSearchAuto').html( '' ).hide();
			var szDevice = 'pc';
			var szDoc = '#szKeyword';
			var szScript = 'afreeca.front.keyword.setSckCookie(\'AT\');searchList();';
			var cssColor = $('input[name=szInputColor]').val();

			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWebList, afreeca.front.keyword.makeSavedAutoDataWebList );
		}
	}
	, setKeyDownWebList : function( evt, szDevice, szDoc, szScript, cssColor ){
		// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
		if( evt.keyCode == 40 )
		{
			// ȭ��ǥ �Ʒ� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();

				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWebList, afreeca.front.keyword.makeSavedAutoDataWebList ) == true )
				{
					afreeca.front.nAutoCurrentCount = -1;
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
				}
			}

			afreeca.front.nAutoCurrentCount++;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount > nTotalCount )
				{
					afreeca.front.nAutoCurrentCount = -1;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}
		else if( evt.keyCode == 38 )
		{
			// ȭ��ǥ �� ����
			if( $( '#divSearchAuto' ).css('display') == 'none' )
			{
				$('#divSearchAuto').html( '' ).hide();
				if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataWebList, afreeca.front.keyword.makeSavedAutoDataWebList ) == true )
				{
					$('#divSearchAuto').show();
					afreeca.front.keyword.szStype = 'ac';
					afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
				}
			}
			afreeca.front.nAutoCurrentCount--;
			$('#divSearchAuto li>a').css('background','');
			var nTotalCount = $('#divSearchAuto li>a').length;
			if( nTotalCount > 0 )
			{
				if( afreeca.front.nAutoCurrentCount < 0 )
				{
					afreeca.front.nAutoCurrentCount = nTotalCount;
				}

				if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
				{
					$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
					$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
				}
				else
				{
					$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
					$('#divSearchAuto').hide();
				}
			}
		}

		if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 220 )
		{
			if( typeof(evt.returnValue) != 'undefined' )
			{
				evt.returnValue = false;
			}
			if( typeof(evt.preventDefault) == 'function' )
			{
				evt.preventDefault();
			}
			return true;
		}
		afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
		return false;
	}

	/**
		1.0 Player �κ�
	**/
	, makeAutoDataPlayer : function( szKeyWord, szDevice, szDoc, szScript, cssColor, oData, status ){
		// �÷��̾� �ڵ��ϼ� �˻� ��� �κ�
		if( oData.ret == 1 )
		{
			var szHtml = '';
			var nCount = 0;
			if( typeof(oData.list) != 'undefined')
			{
				afreeca.front.szOldAutoKeyWord = szKeyWord;
				afreeca.front.szOldAutoKeyWord2 = szKeyWord;

				szHtml += '<ul>';
				for( var i = 0; i<oData.list.length; i++ )
				{
					if( typeof(oData.list[i].d) != 'undefined' )
					{
						szHtml += '<li>';
						szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
						szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');szCommonKeyWord=\'' + oData.list[i].d + '\';' + szScript + '" ';
						szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (oData.list[i].d) + '\');szCommonKeyWord=\'' + oData.list[i].d + '\';' + szScript + '" ';
						szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1;">' + oData.list[i].d + '</a></li>';
						nCount++;
					}
				}
				szHtml += '</ul>';
			}

			if( nCount > 0 )
			{
				$('#divSearchAuto').html( szHtml ).show();
			}
			else
			{
				$('#divSearchAuto').hide();
			}

			afreeca.front.keyword.saveAutoData(szKeyWord, oData);
			afreeca.front.nAutoCurrentCount = -1;
			return true;
		}
	}
	, makeSavedAutoDataPlayer : function( szKeyWord, szDevice, szDoc, szScript, cssColor ){
		// Main �ڵ��ϼ� �˻� ��� �κ� (����� ������)
		afreeca.front.szOldAutoKeyWord = szKeyWord;
		afreeca.front.szOldAutoKeyWord2 = szKeyWord;
		// ���� 5���̻�(300��)�̸� ������ ����
		if( typeof(afreeca.front.oAutoDataList[szKeyWord]['time']) != 'undefined' )
		{
			if( (afreeca.front.nDateTime - afreeca.front.oAutoDataList[szKeyWord]['time'] ) > 300 )
			{
				delete afreeca.front.oAutoDataList[szKeyWord];
				//delete afreeca.front.oAutoDataList[szKeyWord]['time'];
				afreeca.front.oAutoDataListCount--;
			}
		}

		var szHtml = '';
		var nCount = 0;
		szHtml += '<ul>';
		for ( var i in afreeca.front.oAutoDataList[szKeyWord] )
		{
			if( typeof(afreeca.front.oAutoDataList[szKeyWord][i].d) != 'undefined' )
			{
				szHtml += '<li>';
				szHtml += '<a href="javascript:void(0);" onmouseover="javascript:afreeca.front.keyword.setAutoDataColor(\'' + szDoc + '\', \'' + cssColor + '\', ' + i + ');" ';
				szHtml += ' onclick="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';

				szHtml += ' onmousedown="javascript:$(\'' + szDoc + '\').val(\'' + (afreeca.front.oAutoDataList[szKeyWord][i].d) + '\').focus();' + szScript + '"';
				szHtml += ' onmouseout="javascript:afreeca.front.isFlagAuto=false;afreeca.front.nAutoCurrentCount = -1">' + afreeca.front.oAutoDataList[szKeyWord][i].d + '</a></li>';
				nCount++;
			}
		}
		szHtml += '</ul>';

		if( nCount > 0 )
		{
			$('#divSearchAuto').html( szHtml ).show();
		}
		else
		{
			$('#divSearchAuto').hide();
		}
		afreeca.front.nAutoCurrentCount = -1;
		return true;
	}
	, checkKeyUpPlayer : function( evt ){
		try
		{
			// �÷��̾� �κ� - Ű �Է½� ���� �κ�
			if( afreeca.front.isKeyPress )
			{
				afreeca.front.isKeyPress = false;
				return false;
			}

			if( evt.keyCode == 220 )
			{
				afreeca.front.keyword.setEventBubbleStop(evt);
				return false;
			}
			if( evt.keyCode == 13 )
			{
				return false;
			}

			var szDevice = 'player';
			var szDoc = '#search_field';
			var szScript = 'afreeca.front.szOldAutoKeyWord = $(\'#search_field\').val();afreeca.front.szOldAutoKeyWord2 = $(\'#search_field\').val();callSearch();';
			var cssColor = '#e5e5e5';

			if( afreeca.front.keyword.setKeyDownPlayer( evt, szDevice, szDoc, szScript, cssColor ) == true )
			{
				return false;
			}
			//afreeca.front.keyword.callAutoSearch( $('#search_field').val(), "player", "#search_field", "afreeca.front.szOldAutoKeyWord = $('#search_field').val();afreeca.front.szOldAutoKeyWord2 = $('#search_field').val();callSearch();", "#e5e5e5", afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer );
			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer );
			return true;
		}
		catch(e)
		{
		}
	}
	, checkKeyDownPlayer : function( evt ){
		try
		{
			if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 220 )
			{
				if( typeof(evt.returnValue) != 'undefined' )
				{
					evt.returnValue = false;
				}
				if( typeof(evt.preventDefault) == 'function' )
				{
					evt.preventDefault();
				}

				var szDevice = 'player';
				var szDoc = '#search_field';
				var szScript = 'afreeca.front.szOldAutoKeyWord = $(\'#search_field\').val();afreeca.front.szOldAutoKeyWord2 = $(\'#search_field\').val();callSearch();';
				var cssColor = '#e5e5e5';
				afreeca.front.keyword.setKeyDownPlayer( evt, szDevice, szDoc, szScript, cssColor );
				afreeca.front.isKeyPress = true;
				return true;
			}

			return false;
		}
		catch(e)
		{
		}
	}

	, setClickPlayer : function( evt ){
		// Ŭ���� �ڵ��ϼ� ������ ���
		if( !afreeca.front.isFlagAuto && $( '#divSearchAuto' ).css('display') == 'none' )
		{
            getKeyword();
			$('#divSearchAuto').html( '' ).hide();
			var szDevice = 'player';
			var szDoc = '#search_field';
			var szScript = 'afreeca.front.szOldAutoKeyWord = $(\'#search_field\').val();afreeca.front.szOldAutoKeyWord2 = $(\'#search_field\').val();callSearch();';
			var cssColor = '#e5e5e5';
			//afreeca.front.keyword.callAutoSearch( $('#search_field').val(), "player", "#search_field", "afreeca.front.szOldAutoKeyWord = $('#search_field').val();afreeca.front.szOldAutoKeyWord2 = $('#search_field').val();callSearch();", "#e5e5e5", afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer );
			afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer );
		}
	}

	, setKeyDownPlayer: function (evt, szDevice, szDoc, szScript, cssColor) {
		try
		{
			// �ڵ��ϼ� �˻��� Ű���� ��/�Ʒ�/����/������ Ű �Է½� �̵��ϴ� �κ�
			if( evt.keyCode == 40 )
			{
				// ȭ��ǥ �Ʒ� ����
				if( $( '#divSearchAuto' ).css('display') == 'none' )
				{
					$('#divSearchAuto').html( '' ).hide();

					if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer ) == true )
					{
						afreeca.front.nAutoCurrentCount = -1;
						$('#divSearchAuto').show();
					}
				}

				afreeca.front.nAutoCurrentCount++;
				$('#divSearchAuto li>a').css('background','');
				var nTotalCount = $('#divSearchAuto li>a').length;
				if( nTotalCount > 0 )
				{
					if( afreeca.front.nAutoCurrentCount > nTotalCount )
					{
						afreeca.front.nAutoCurrentCount = -1;
					}

					if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
					{
						$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
						$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					}
					else
					{
						$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
						$('#divSearchAuto').hide();
					}
				}
			}
			else if( evt.keyCode == 38 )
			{
				// ȭ��ǥ �� ����
				if( $( '#divSearchAuto' ).css('display') == 'none' )
				{
					$('#divSearchAuto').html( '' ).hide();
					if( afreeca.front.keyword.callAutoSearch( $( szDoc ).val(), szDevice, szDoc, szScript, cssColor, afreeca.front.keyword.makeAutoDataPlayer, afreeca.front.keyword.makeSavedAutoDataPlayer ) == true )
					{
						$('#divSearchAuto').show();
						afreeca.front.nAutoCurrentCount = $('#divSearchAuto li>a').length;
					}
				}
				afreeca.front.nAutoCurrentCount--;
				$('#divSearchAuto li>a').css('background','');
				var nTotalCount = $('#divSearchAuto li>a').length;
				if( nTotalCount > 0 )
				{
					if( afreeca.front.nAutoCurrentCount < 0 )
					{
						afreeca.front.nAutoCurrentCount = nTotalCount;
					}

					if( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() != '' )
					{
						$( szDoc ).val( $('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).text() );
						$('#divSearchAuto li>a').eq(afreeca.front.nAutoCurrentCount).css('background', cssColor);
					}
					else
					{
						$( szDoc ).val( afreeca.front.szOldAutoKeyWord2 );
						$('#divSearchAuto').hide();
					}
				}
			}

			// evt.keyCode : 229 (�ٸ��� Ŭ���� ���� �κ�)
			if( evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 220 || evt.keyCode == 229 )
			{

				if( typeof(evt.returnValue) != 'undefined' )
				{
					evt.returnValue = false;
				}
				if( typeof(evt.preventDefault) == 'function' )
				{
					evt.preventDefault();
				}
				return true;
			}

			afreeca.front.szOldAutoKeyWord = $( szDoc ).val();
			return false;
		}
		catch(e)
		{
		}
	}
	//��۹ٷκ��� & �����˻�BJ����Ʈ
	, callTagSearchSearch : function( szKeyWord ){
		var szUrl = SEARCH_SCH_NONE_SCHEME + '/api.php';
		var szType = 'tagSearch';
		$.ajax ({
			type		: 'POST',
			dataType	: 'jsonp',
			jsonp		: 'callback',
			url		: szUrl,
			cache	: false,
			data		: {
				m		: szType,
				v		: szVersion,
				t		: 'json',
				c		: 'EUC-KR',
				d		: encodeURIComponent(szKeyWord)
			},
			success	: function(oData,status){
				afreeca.front.keyword.setTagSearchSearch(oData);
			},
			error : function(jqXHR, status, errorThrow){
				//alert(status);
				//afreeca.front.keyword.oAllData = oTotalData;
				//afreeca.front.keyword.setProfileThemeSearch();
				/*
				$('div#broad_order_sec').hide();
				$('div#broad_list').hide();
				$('div#video_order_sec').hide();
				$('div#video_list').hide();
				$('div#bj_order_sec').hide();
				$('div#bj_list').hide();
				afreeca.front.search.isThemeProfile = true;
				afreeca.front.search.loadNoResult();
				afreeca.front.search.isThemeProfile = false;
				*/
				return;
			}
		});
	}
	, setTagSearchSearch : function(oData){
		if( typeof(oData.RESULT) != 'undefined' && oData.RESULT == '1' )
		{
			var szSearchType = $('input[name=szSearchType]').val();
			var szHtml = '';
			var oDirectBroadData = oData.DIRECT[0];
			var arrInflowPath = ['sch','direct'];

			if( typeof(oDirectBroadData) != 'undefined' && szSearchType == 'total' && oDirectBroadData.length != 0)
			{
                // �̹��� URL ��ũ �� �� ��Ŵ(http:/https:) �κ� ����
                oDirectBroadData.sn_url = getTransferImageSSL(oDirectBroadData.sn_url);
                
				var szThumb = oDirectBroadData.sn_url;

				szHtml += '<h4 class="stit">��� �ٷκ��� <img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/ico_live.gif" alt="live" /></h4>';
				szHtml += '<a href="javascript:;" class="thum" onclick="javascript:afreeca.front.statistics.setLiveQuickViewSearchParam(\''+$('#szKeyword').val()+'\' , \'sn\' , \''+oDirectBroadData.id+'\'); oAnalysisUtil.sendLiveInflowLog(\'' + oDirectBroadData.id + '\',' + oDirectBroadData.broad_no + ',' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + '); playBroad(\''+oDirectBroadData.broad_no+'\', \'flash\', \'' + oDirectBroadData.id + '\');"><img src="'+szThumb+'" alt="" title="' + oDirectBroadData.title + '"></a>';
				szHtml += '<dl class="detail">';
				szHtml += '<dt><a href="javascript:;" onclick="javascript:afreeca.front.statistics.setLiveQuickViewSearchParam(\''+$('#szKeyword').val()+'\' , \'tt\' , \''+oDirectBroadData.id+'\'); oAnalysisUtil.sendLiveInflowLog(\'' + oDirectBroadData.id + '\',' + oDirectBroadData.broad_no + ',' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + '); playBroad(\''+oDirectBroadData.broad_no+'\', \'flash\', \'' + oDirectBroadData.id + '\');" >'+oDirectBroadData.title+'</a></dt>';
				szHtml += '<dd><span class="bj_nick">'+oDirectBroadData.nick+'('+oDirectBroadData.id+')</span>';
				szHtml += afreeca.front.search.getBadgeTag(oDirectBroadData, "subs");
				szHtml += afreeca.front.search.getBadgeTag(oDirectBroadData, "fan");
                szHtml += '<span class="bar">|</span><em>��û</em>'+this.getNumberFormat(oDirectBroadData.view_cnt)+'</dd>';
				szHtml += '<dd class="url"><a href="javascript:playBroad(\''+oDirectBroadData.broad_no+'\', \'flash\', \'' + oDirectBroadData.id + '\');" onClick="javascript: oAnalysisUtil.sendLiveInflowLog(\'' + oDirectBroadData.id + '\',' + oDirectBroadData.broad_no + ',' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + ');">'+oDirectBroadData.url+'</a></dd>';
				szHtml += '</dl>';

				$('#direct_braod').html( szHtml ).show();
			}
			szHtml = '';
			oDirectBroadData = oData.RELATED;
			if( typeof(oDirectBroadData) != 'undefined' && oDirectBroadData.length != 0){
				szHtml += '<h4 class="stit">�����˻� BJ ����Ʈ</h4>';
				szHtml += '<ul >';
				for(var i = 0; i<oDirectBroadData.length; i++ )
				{
					szHtml += '<li><a href="javascript:void(0);" onclick="afreeca.front.statistics.setRelationSearchListParam(\'' + (oDirectBroadData[i].nick) + '\');$(\'#szKeyword\').val(\'' + (oDirectBroadData[i].nick) + '\').focus();afreeca.front.search.goPage();return false;" >'+oDirectBroadData[i].nick+'</a></li>';
				}
				szHtml += '</ul>';
				$('#relatebj_ul').html( szHtml ).show();
			}
		}
	}
	//BJ������ �˻�&�׸��˻�
	, callProfileThemeSearch : function( szKeyWord ){
		var szUrl = SEARCH_SCKETC_NONE_SCHEME + '/api.php';
		var szType = 'profileTheme';
		var szVersion = '1.0';

		$.ajax ({
			type		: 'POST',
			dataType	: 'jsonp',
			jsonp		: 'callback',
			url		: szUrl,
			cache		: false,
			data		: {
				m		: szType,
				v		: szVersion,
				t		: 'json',
				c		: 'EUC-KR',
				d		: encodeURIComponent(szKeyWord),
				w		: 'webk'
			},
			success	: function(oData,status){
				afreeca.front.keyword.oAllData = oData;
                if( typeof(oData.RESULT) != 'undefined' && oData.RESULT == 1 && typeof(oData.PROFILE) == 'undefined' && typeof(oData.THEME) == 'undefined' )
				{
                    szFavoriteId = oData.PROFILE[0]['user_id'];
					afreeca.front.keyword.chkFavorite(szFavoriteId);
				}
				else
				{
					afreeca.front.keyword.setProfileThemeSearch();
				}
			},
			error : function(jqXHR, status, errorThrow){
				afreeca.front.search.isThemeProfile = true;
				$('span#searchword').text( szKeyWord );
				afreeca.front.search.loadBroadList();
				return;
			}
		});
	}
	, setProfileThemeSearch : function(){
		if( typeof(afreeca.front.keyword.oAllData.RESULT) != 'undefined' && afreeca.front.keyword.oAllData.RESULT == 1 )
		{
			var szKeyWord = $('input[name=szKeyword]').val();
			// �׸��˻�
			var szHtml = '';
			var szImg = '';
			var oThemeData = afreeca.front.keyword.oAllData.THEME;
			if( typeof(oThemeData) != 'undefined' && oThemeData.length > 0 )
			{
				$('#divThemeRoot').show();
				if( oThemeData[0].type == 0 )
				{
					if ( oThemeData[0]['url'] != undefined )
					{
						if( oThemeData[0]['url'].indexOf('http://') != 0 && oThemeData[0]['url'].indexOf('https://') != 0 )
						{
							oThemeData[0]['url'] = 'http://' + oThemeData[0]['url'];
						}
					}
					szHtml += '<h4 class="stit">�ٷΰ���</h4>';
					szHtml += '<dl class="direct"><dt><a href="' + oThemeData[0]['url'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setThemeSearchParam(\'' + szKeyWord + '\',\'inf\')">' + oThemeData[0]['title'] + '</a></dt>';
					szHtml += '<dd><a href="' + oThemeData[0]['url'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setThemeSearchParam(\'' + szKeyWord + '\',\'inf\')">' + oThemeData[0]['url'] + '</a></dd></dl>';
					var oSubInfo = oThemeData[0]['sub_info'] || [];
					if (oSubInfo.length > 0)
					{
						szHtml += '<dl class="dr"><dt>���񽺾ȳ�</dt>';
					}
					szHtml += '<dd>';
					if (oSubInfo.length > 0)
					{
						for(var i = 0; i < oSubInfo.length; i++)
						{
							if( i != 0 )
							{
								szHtml += ',  ';
							}
							if ( oSubInfo[i]['url'] != undefined )
							{
								if( oSubInfo[i]['url'].indexOf('http://') != 0 && oSubInfo[i]['url'].indexOf('https://') != 0 )
								{
									oSubInfo[i]['url'] = 'http://' + oSubInfo[i]['url'];
								}
								szHtml += '<a href="' + oSubInfo[i]['url'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setThemeSearchParam(\'' + szKeyWord + '\',\'inf\')">' + oSubInfo[i]['title'] + '</a>';
							}
						}
					}
					szHtml += '</dd></dl>';
					$('#divTheme1').html( szHtml ).show();
				}
				else
				{
					szHtml += '<p class="issue_tit">' + oThemeData[0]['title'] + '</p>';
					// html ���ڵ�
					oThemeData[0]['html'] = oThemeData[0]['html'].replace(/&lt;/gi, '<');
					oThemeData[0]['html'] = oThemeData[0]['html'].replace(/&quot;/gi, '"');
					oThemeData[0]['html'] = oThemeData[0]['html'].replace(/&gt;/gi, '>');

					// �׸� ���ø� �α� �߰�
					var oReg = /(\<a .+.com\/.+\")/g;
					oThemeData[0]['html'] = oThemeData[0]['html'].replace(oReg, '$1" onclick="afreeca.front.statistics.setThemeSearchParam(\'' + szKeyWord + '\',\'tt\')"');
					szHtml += oThemeData[0]['html'];
					$('#divTheme2').html( szHtml ).show();
				}
			}
			// ������
			szHtml = '';
			var oProfileData = afreeca.front.keyword.oAllData.PROFILE;

			var nTotalCount = 0;
			if( typeof(oProfileData) != 'undefined' && oProfileData.length > 0 )
			{
				szHtml += '<h4 class="stit">BJ ������</h4>';
				szHtml += '<div class="profile_wrap">';
				szHtml += '<div class="detail">';
				szHtml += '<div class="pr">';

				if (oProfileData[0]['img_file'] != '') {
                    // �̹��� URL ��ũ �� �� ��Ŵ(http:/https:) �κ� ����
                    oProfileData[0]['img_file'] = getTransferImageSSL(oProfileData[0]['img_file']);
                        
                    var nHeight = (typeof oProfileData[0]['img_height'] === 'undefined' || oProfileData[0]['img_height'] === null) ?  150 : oProfileData[0]['img_height'];
                    var nWidth = (typeof oProfileData[0]['img_width'] === 'undefined' || oProfileData[0]['img_width'] === null) ? 200 : oProfileData[0]['img_width'];

					szHtml += '<div class="img_thum" ><img src="' + oProfileData[0]['img_file'] + '"  width="' + nWidth + '" height="' + nHeight + '"   alt="" onerror="afreeca.front.keyword.setDefaultImage(this);"/><!--�̹��� ���λ����� 120px~200px -->';
					if(afreeca.front.keyword.bFavorite)
					{
						szHtml += '<p><a href="javascript:;" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'fav\', \'' + oProfileData[0]['user_id'] + '\');atv.delFavorite(\'' + oProfileData[0]['user_id'] + '\', \'prtFavChange\', \'del\');" class="fav_'+oProfileData[0]['user_id']+'" act="add"><img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_fa_off.gif" class="btn_f" alt="���ã��"/></a></p></div>';
					}
					else
					{
						szHtml += '<p><a href="javascript:;" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'fav\', \'' + oProfileData[0]['user_id'] + '\');atv.addFavorite(\'' + oProfileData[0]['user_id'] + '\', \'prtFavChange\', \'add\');" class="fav_'+oProfileData[0]['user_id']+'" act="add"><img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_fa.gif" class="btn_f" alt="���ã��"/></a></p></div>';
					}
				}

				if( oProfileData[0]['user_name'] == '' )
				{
					oProfileData[0]['user_name'] = oProfileData[0]['user_id'];
				}
				szHtml += '<dl><dt><span><a href="' + BJ_AFREECA_NONE_SCHEME + '/' + oProfileData[0]['user_id'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'nick\', \'' + oProfileData[0]['user_id'] + '\');">' + oProfileData[0]['user_nick'] + '(' + oProfileData[0]['user_name'] + ')</a></span>';
				szHtml += afreeca.front.search.getBadgeTag(oProfileData[0], "subs");
				szHtml += afreeca.front.search.getBadgeTag(oProfileData[0], "fan");

				if( oProfileData[0]['broad_no'] > 0 )
				{
					// ���԰�� ����
					var arrInflowPath = ['sch','profile'];
					szHtml += '<a href="javascript:;" style="vertical-align:middle" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'live\', \'' + oProfileData[0]['user_id'] + '\',\'' + oProfileData[0]['broad_no'] + '\'); oAnalysisUtil.sendLiveInflowLog(\'' + oProfileData[0]['user_id'] + '\',' + oProfileData[0]['broad_no'] + ',' + JSON.stringify(arrInflowPath).replace(/"/g, "\'") + '); playBroad(\'' + oProfileData[0]['broad_no'] + '\', \'flash\',\'' + oProfileData[0]['user_id'] + '\', \'' + szKeyWord + '\');">';
					szHtml += '<img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_live.gif" alt="���̺�"/></a></dt>';
				}

				var szTempInfoHtml = '';
				// ��ü(Ű)
				if( oProfileData[0]['user_tall'] > 0 )
				{
					szTempInfoHtml += '<em>��ü</em>' + oProfileData[0]['user_tall'] + 'cm';
				}
				// ��ü(������)
				if( oProfileData[0]['user_weight'] > 0 )
				{
					if( szTempInfoHtml != '' )
					{
						szTempInfoHtml += ', ';
					}
					else
					{
						szTempInfoHtml += '<em>��ü</em>';
					}
					szTempInfoHtml += oProfileData[0]['user_weight'] + 'kg';
				}
				// ��ü(����⵵)
				if( oProfileData[0]['user_age'] > 0 )
				{
					if( szTempInfoHtml != '' )
					{
						szTempInfoHtml += '<span class="bar">|</span> ';
					}
					else
					{
						szTempInfoHtml += '<em>���</em>';
					}
					szTempInfoHtml += oProfileData[0]['born_year'] + '��� (' + oProfileData[0]['user_age'] + '��)';
				}
				// ��ü���� (���� ǥ��)
				if( szTempInfoHtml != '' )
				{
					szHtml += '<dd>';
					szHtml += szTempInfoHtml;
					szHtml += '</dd>';
					nTotalCount++;
				}
				// ���/����
				if( oProfileData[0]['career_award'].length > 0 )
				{
					szHtml += '<dd class="award"><em>���/����</em>';
					var szTempContent = '';
					if( oProfileData[0]['career_award'].length == 1 )
					{
						szTempContent = oProfileData[0]['career_award'][0]['content'];
						szHtml += szTempContent;
					}
					else
					{
                        for (var i=0; i<oProfileData[0]['career_award'].length; i++) {
							if( i == 0 )
							{
								szTempContent = oProfileData[0]['career_award'][i]['content'];
								szHtml += szTempContent;
								szHtml += '<div class="award_layer">';
								szHtml += '<img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_layer' + afreeca.front.keyword.szThemeHtml + '.gif" class="btn_layer" alt="���̾�" onclick="javascript:$(\'#divAwardList\').slideToggle(); afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'crr\',\'' + oProfileData[0]['user_id'] + '\');"/>';
								szHtml += '<div class="award_list" style="display:none" id="divAwardList">';
								szHtml += '<ul>';
							}
							szHtml += '<li>' + oProfileData[0]['career_award'][i]['content'] + '</li>';
						}
						szHtml += '</ul>';
						szHtml += '</div>';
						szHtml += '</div>';
					}
					szHtml += '</dd>';
					nTotalCount++;
				}
				// ��۽ð�
				if( oProfileData[0]['total_broad_time'] > 0 )
				{
					var nBroadTime = parseInt(oProfileData[0]['total_broad_time']);
					nBroadTime = nBroadTime/3600;
					nBroadTime = Math.floor( nBroadTime );

					szHtml += '<dd>';
					szHtml += '<em>��۽ð�</em>' + this.getNumberFormat(nBroadTime.toString()) + '�ð�';
					szHtml += '</dd>';
					nTotalCount++;
				}


				var szTempViewerHtml = '';
				// ��û��
				if( oProfileData[0]['fan_count'] > 0  )
				{
					szTempViewerHtml += '<em>��û��</em>' + this.getNumberFormat(oProfileData[0]['fan_count']) + '��';
				}
				// ������û��
				if( oProfileData[0]['view_count'] > 0 )
				{
					if( szTempViewerHtml != '' )
					{
						szTempViewerHtml += '<span class="bar">|</span>';
					}
					szTempViewerHtml += '<em>������û��</em>' + this.getNumberFormat(oProfileData[0]['view_count']) + '��';
				}

				// ��û�� + ������û�� (���� ǥ��)
				if( szTempViewerHtml != '' )
				{
					szHtml += '<dd>';
					szHtml += szTempViewerHtml;
					szHtml += '</dd>';
					nTotalCount++;
				}

				// ���ʹ����
				if( oProfileData[0]['first_broad_date'] != '' && nTotalCount < 6 )
				{
					var szFirtBroadDate = oProfileData[0]['first_broad_date'].replace(/-/gi, '.');
					szHtml += '<dd>';
					szHtml += '<em>���ʹ����</em>' + szFirtBroadDate;
					szHtml += '</dd>';
					nTotalCount++;
				}
				// Ŀ�´�Ƽ
				if( oProfileData[0]['community'].length > 0 && nTotalCount < 6 )
				{
					szHtml += '<dd>';
					szHtml += '<em>Ŀ�´�Ƽ</em>';
					szHtml += '<a href="' + BJ_AFREECA_NONE_SCHEME + '/' + oProfileData[0]['user_id'] + '" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'cmm\',\'' + oProfileData[0]['user_id'] + '\');" target="_blank">��۱�,</a>';

					for( var i=0; i<oProfileData[0]['community'].length; i++ )
					{
 						if ( typeof(oProfileData[0]['community'][i]['url']) != 'undefined' )
						{
							if( oProfileData[0]['community'][i]['url'].indexOf('http://') != 0 && oProfileData[0]['community'][i]['url'].indexOf('https://') != 0 )
							{
								oProfileData[0]['community'][i]['url'] = 'http://' + oProfileData[0]['community'][i]['url'];
							}
						}
						if( oProfileData[0]['community'].length == (parseInt(i)+1) )
						{

							szHtml += '<a href="' + oProfileData[0]['community'][i]['url'] + '" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'cmm\',\'' + oProfileData[0]['user_id'] + '\');" target="_blank">' + oProfileData[0]['community'][i]['title'] + '</a>';
						}
						else
						{
							szHtml += '<a href="' + oProfileData[0]['community'][i]['url'] + '" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'cmm\',\'' + oProfileData[0]['user_id'] + '\');" target="_blank">' + oProfileData[0]['community'][i]['title'] + ',</a>';
						}
					}
					szHtml += '</dd>';
					nTotalCount++;
				}
				// ��������
				if( oProfileData[0]['notice'] != '' && nTotalCount < 6 )
				{
                    var szNoticeUrl = LIVE_8079 + '/app/index.cgi?szBoard=read_bbs&szBjId=' + oProfileData[0]['user_id'];
                    szNoticeUrl += '&nStationNo=' + oProfileData[0]['station_no'];
                    szNoticeUrl += '&nBbsNo=' + oProfileData[0]['bbs_no'];
                    szNoticeUrl += '&nTitleNo=' + oProfileData[0]['title_no'];

                    szHtml += '<dd>';
					szHtml += '<em>��������</em><a href="' + szNoticeUrl + '" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'nt\',\'' + oProfileData[0]['user_id'] + '\');" target="_blank">' + this.getByteLength(oProfileData[0]['notice'], 44) + '</a>';
					szHtml += '</dd>';
					nTotalCount++;
				}

				szHtml += '</dl>';
				// �̹��� ���� ���
				if (oProfileData[0]['img_file'] == '') {
                    // �̹��� URL ��ũ �� �� ��Ŵ(http:/https:) �κ� ����
                    oProfileData[0]['img_file'] = getTransferImageSSL(oProfileData[0]['img_file']);
                    
					if(afreeca.front.keyword.bFavorite)
					{
						szHtml += '<p class="btn_fa"><a href="javascript:;" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'fav\', \'' + oProfileData[0]['user_id'] + '\');atv.delFavorite(\'' + oProfileData[0]['user_id'] + '\', \'prtFavChange\', \'del\');" class="fav_'+oProfileData[0]['user_id']+'" act="add"><img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_fa_off.gif" class="btn_f" alt="���ã��"/></a></p>';
					}
					else
					{
						szHtml += '<p class="btn_fa"><a href="javascript:;" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'fav\', \'' + oProfileData[0]['user_id'] + '\');atv.addFavorite(\'' + oProfileData[0]['user_id'] + '\', \'prtFavChange\', \'add\');" class="fav_'+oProfileData[0]['user_id']+'" act="add"><img src="' + RES_AFREECA_NONE_SCHEME + '/images/aftv_search/btn_fa.gif" class="btn_f" alt="���ã��"/></a></p>';
					}

				}
				szHtml += '</div>';

				if( oProfileData[0]['award_medal'].length > 0 )
				{
					szHtml += '<!--����޴�-->';
					szHtml += '<div class="medal" id="divMedal">';
					szHtml += '<dl><dt>����޴�</dt>';

					for( var i in oProfileData[0]['award_medal'] )
					{
						if( i > 4 )
						{
							break;
						}

                        var szMedalContent = oProfileData[0]['award_medal'][i]['medal_content'];
                        var szMedalImageClass = oProfileData[0]['award_medal'][i]['medal_image_key'];

                        if (szMedalContent != undefined || szMedalImageClass != undefined) {
                            szHtml += '<dd class="md_' +  szMedalImageClass + '">' + szMedalContent + '</dd>';
                        } else {
                            switch( oProfileData[0]['award_medal'][i]['type'] )
                            {
                                case '1' :
                                    szHtml += '<dd class="md_partner">��Ʈ��BJ</dd>';
                                    break;
                                case '2' :
                                    szHtml += '<dd class="md_best">����ƮBJ</dd>';
                                    break;
                                case '3' :
                                    szHtml += '<dd class="md_a2013">��۴��2013</dd>';
                                    break;
                                case '4' :
                                    szHtml += '<dd class="md_a2012">��۴��2012</dd>';
                                    break;
                                case '5' :
                                    szHtml += '<dd class="md_a2011">��۴��2011</dd>';
                                    break;
                                case '6' :
                                    szHtml += '<dd class="md_progamer">���ΰ��̸�BJ</dd>';
                                    break;
                                case '7' :
                                    szHtml += '<dd class="md_sports">������BJ</dd>';
                                    break;
                                case '8' :
                                    szHtml += '<dd class="md_mobile">�����BJ</dd>';
                                    break;
                                case '9' :
                                    szHtml += '<dd class="md_mgame">����ϰ���BJ</dd>';
                                    break;
                                case '10' :
                                    szHtml += '<dd class="md_clan10">Ŭ��TOP10</dd>';
                                    break;
                                case '11' :
                                    szHtml += '<dd class="md_game_god">���ӽ�BJ</dd>';
                                    break;
                                case '12' :
                                    szHtml += '<dd class="md_angel">����BJ</dd>';
                                    break;
                                case '13' :
                                    szHtml += '<dd class="md_a2014">��۴��2014</dd>';
                                    break;
                                case '14' :
                                    szHtml += '<dd class="md_a2015">2015 BJ���</dd>';
                                    break;
                                case '15' :
                                    szHtml += '<dd class="md_a2016">2016 BJ���</dd>';
                                    break;
                                case '16' :
                                    szHtml += '<dd class="md_tech">Tech BJ</dd>';
                                    break;
								case '17' :
									szHtml += '<dd class="md_a2017">2017 BJ���</dd>';
									break;
								case '18' :
									szHtml += '<dd class="md_a2018">2018 BJ���</dd>';
									break;
                            }
                        }
					}
					szHtml += '</dl>';

					if( oProfileData[0]['award_medal'].length > 5 )
					{
						szHtml += '<div class="medal_pg">';

						var nTempTotal = oProfileData[0]['award_medal'].length / 5;
						nTempTotal = Math.ceil( nTempTotal );
						szHtml += '<span class="pg_no"><strong>1</strong>/' + nTempTotal + '</span> <!--_n ��Ȱ��ȭ-->';
						szHtml += '<span class="btn_page">';

						szHtml += '<a href="javascript:;" class="btn prev_n">����</a>';
						if( nTempTotal > 1 )
						{
							szHtml += '<a href="javascript:;" class="btn next" onclick="javascript:afreeca.front.keyword.setMedalHtml(2); afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord  + '\', \'prz\', \'' + oProfileData[0]['user_id'] + '\');">����</a></span>';
						}
						else
						{
							szHtml += '<a href="javascript:;" class="btn next_n">����</a></span>';
						}
						szHtml += '</div>';
					}
					szHtml += '</div>';
					szHtml += '<!--//����޴�-->';
				}

				var szBjId = oProfileData[0]['user_id'];
				if( typeof(Read_Cookie) == 'function' && Read_Cookie('PdboxUser') != '' )
				{
					var aUserInfo = Read_Cookie('PdboxUser').split('&');
					var aUserId = aUserInfo[0].split('=');
					if( aUserId.length > 1 )
					{
						szBjId = aUserId[1];
					}
				}
                var szOnclick = 'javascript:if(afreeca.front.keyword.isLoginCheck()){ top.window.location.href=\'' + BJ_AFREECA + '/' + szBjId + '/setting/profile\';}';

                // var szOnclick = 'javascript:if(afreeca.front.keyword.isLoginCheck()){ top.window.location.href=\'' + LIVE_8079 + '/app/index.cgi?szBjId=' + szBjId + '&szType=profile\';' +  '}';

				szHtml += '<a href="javascript:;" class="profile_edit" onclick="' + szOnclick + '">�� ������ ����</a>';
				szHtml += '</div>';

				if( oProfileData[0]['related_bj'].length > 0 )
				{
					szHtml += '<div class="relate">';
					szHtml += '<h5>���� BJ <span>(�� ' + oProfileData[0]['related_bj'].length + '��)</span></h5>';
					szHtml += '<div class="relate_bj" id="divRelateBj">';
					szHtml += '<ul>';
					for( var i in oProfileData[0]['related_bj'] )
					{
						if( i > 3 )
						{
							break;
						}

						var szClubRelateStation = '�յ����';
						if( oProfileData[0]['related_bj'][i]['station_type'] == 1 )
						{
							szClubRelateStation = 'Ŭ��';
						}
						if( oProfileData[0]['related_bj'][i]['user_id'] != null && oProfileData[0]['related_bj'][i]['user_id'] != undefined ) {
							szImg = '';
							szImg = ST_PROXY_NONE_SCHEME + '/DATA/LOGO/' + oProfileData[0]['related_bj'][i]['user_id'].substring(0, 2) + '/';
							szImg += oProfileData[0]['related_bj'][i]['user_id'] + '/' + oProfileData[0]['related_bj'][i]['user_id'] + '.jpg';

							szHtml += '<li>';
							szHtml += '<a href="' + BJ_AFREECA_NONE_SCHEME + '/' + oProfileData[0]['related_bj'][i]['user_id'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'rbj\', \'' + oProfileData[0]['related_bj'][i]['user_id'] + '\');"><span class="thum"><img src="' + szImg + '" alt="" onerror="afreeca.front.keyword.setDefaultImage(this);"></span><span class="det"><strong>' + oProfileData[0]['related_bj'][i]['user_nick'] + '</strong>' + szClubRelateStation + '</span>';

							// ������ϰ�츸 ���
							if( oProfileData[0]['related_bj'][i]['broad_no'] > 0 )
							{
								szHtml += '<img src="' + RES_AFREECA_NONE_SCHEME + '/images/mobile/icon_live.gif" style="position:absolute;top:0;left:0" alt="���̺�"/>';
							}
							szHtml += '</a>';
							szHtml += '</li>';
						}
					}
					szHtml += '</ul>';

					var nTempTotal = oProfileData[0]['related_bj'].length / 4;
					nTempTotal = Math.ceil( nTempTotal );

					if( oProfileData[0]['related_bj'].length > 4 )
					{
						szHtml += '<span class="prev_n">����</span>';
					}
					if( nTempTotal > 1 )
					{
						szHtml += '<span class="next" onclick="javascript:afreeca.front.keyword.setRelateBjHtml(2);">����</span>';
					}
					else
					{
						if( oProfileData[0]['related_bj'].length > 4 )
						{
							szHtml += '<span class="next_n">����</span>';
						}
					}
					szHtml += '</div>';
					szHtml += '</div>';
				}

				// 10��10�� �����ϴ� �κ�
				var nQnaNumber = 0;
				if( oProfileData[0]['qna'].length > 0 )
				{
					for( var i=0; i<oProfileData[0]['qna'].length; i++ )
					{
						if( oProfileData[0]['qna'][i]['q'] != '' && oProfileData[0]['qna'][i]['a'] != '' )
						{
							nQnaNumber++;
						}
					}
				}

				if( nQnaNumber > 0 )
				{
					szHtml += '<div class="qa">';
					szHtml += '<h5>' + nQnaNumber + '�� ' + nQnaNumber + '��</h5>';

					if( oProfileData[0]['qna'].length > 0 )
					{
						var nQnaCount = 0;
						szHtml += '<div class="qa_list" id="qa_top">';
						for( var i=0; i<oProfileData[0]['qna'].length; i++ )
						{
							if( oProfileData[0]['qna'][i]['q'] == '' || oProfileData[0]['qna'][i]['a'] == '' )
							{
								continue;
							}
							if( nQnaCount == 0 )
							{
								szHtml += '<dl>';
							}
							else
							{
								szHtml += '<dl class="off">';
							}

							szHtml += '<dt>' + ( nQnaCount + 1 ) + '. ' + oProfileData[0]['qna'][i]['q'] +  '</dt>';
							szHtml += '<dd style="word-break: break-all;">' + oProfileData[0]['qna'][i]['a'] + '</dd>';
							szHtml += '</dl>';
							nQnaCount++;
						}
						szHtml += '</div>';
					}
					if( nQnaNumber > 1 )
					{
						var onClick1 = "if( $('#qa_top dl[class=off]').css('display') == 'none'){$('#qa_top dl[class=off]').slideToggle().show();$(this).attr('class','close');}else{$('#qa_top dl[class=off]').slideToggle();$(this).attr('class','more');} afreeca.front.statistics.setProfileSearchParam('" + szKeyWord + "', 'qna', '" + oProfileData[0]['user_id'] + "');";
						szHtml += '<a href="javascript:;" class="more" onclick="javascript:' + onClick1 + '"><span>������</span></a>';
					}
					szHtml += '</div>';
				}

				szHtml += '</div>';
				if( szHtml != '' )
				{
					$('#divProfileRoot').html( szHtml ).show();
				}
				else
				{
					$('#divProfileRoot').hide();
				}
			}
		}
		afreeca.front.search.isThemeProfile = true;
		$('span#searchword').text( szKeyWord );
		afreeca.front.search.loadBroadList();
	}
	, setMedalHtml : function( nPageNo ) {
		if( typeof(this.oAllData.RESULT) == 'undefined' || this.oAllData.RESULT != 1 )
		{
			return;
		}
		// ����޴� HTML ���
		if( typeof(nPageNo) != 'undefined' )
		{
			if( nPageNo <= 0 )
			{
				nPageNo = 1;
			}
			var szHtml = '';
			var szKeyWord = $('input[name=szKeyword]').val();
			var oProfileData = this.oAllData.PROFILE;
			if( typeof(oProfileData) != 'undefined' && oProfileData.length > 0 )
			{
				szHtml += '<dl><dt>����޴�</dt>';
				if( nPageNo > Math.ceil(oProfileData[0]['award_medal'].length / 5) )
				{
					nPageNo = Math.ceil(oProfileData[0]['award_medal'].length / 5);
				}

				if( oProfileData[0]['award_medal'].length > 0 )
				{
					var nStartNum = (nPageNo -1) * 5;
					if( nStartNum < 0 )
					{
						nStartNum = 0;
					}
					var nCount = 0;
					for(var i = nStartNum; i<oProfileData[0]['award_medal'].length; i++ )
					{
						if( nCount > 4 )
						{
							break;
						}
						switch( oProfileData[0]['award_medal'][i]['type'] )
						{
							case '1' :
								szHtml += '<dd class="md_partner">��Ʈ��BJ</dd>';
								break;
							case '2' :
								szHtml += '<dd class="md_best">����ƮBJ</dd>';
								break;
							case '3' :
								szHtml += '<dd class="md_a2013">��۴��2013</dd>';
								break;
							case '4' :
								szHtml += '<dd class="md_a2012">��۴��2012</dd>';
								break;
							case '5' :
								szHtml += '<dd class="md_a2011">��۴��2011</dd>';
								break;
							case '6' :
								szHtml += '<dd class="md_progamer">���ΰ��̸�BJ</dd>';
								break;
							case '7' :
								szHtml += '<dd class="md_sports">������BJ</dd>';
								break;
							case '8' :
								szHtml += '<dd class="md_mobile">�����BJ</dd>';
								break;
							case '9' :
								szHtml += '<dd class="md_mgame">����ϰ���BJ</dd>';
								break;
							case '10' :
								szHtml += '<dd class="md_clan10">Ŭ��TOP10</dd>';
								break;
							case '11' :
								szHtml += '<dd class="md_game_god">���ӽ�BJ</dd>';
								break;
							case '12' :
								szHtml += '<dd class="md_angel">����BJ</dd>';
								break;
							case '13' :
								szHtml += '<dd class="md_a2014">��۴��2014</dd>';
								break;
							case '14' :
								szHtml += '<dd class="md_a2015">2015BJ���</dd>';
								break;
							case '15' :
								szHtml += '<dd class="md_a2016">2016BJ���</dd>';
								break;
							case '16' :
								szHtml += '<dd class="md_tech">Tech BJ</dd>';
								break;
							case '17' :
								szHtml += '<dd class="md_a2017">2017 BJ���</dd>';
								break;
							case '18' :
								szHtml += '<dd class="md_a2018">2018 BJ���</dd>';
								break;
						}
						nCount++;
					}
				}
				szHtml += '</dl>';
				szHtml += '<div class="medal_pg">';

				var nTempTotal = oProfileData[0]['award_medal'].length / 5;
				nTempTotal = Math.ceil( nTempTotal );
				szHtml += '<span class="pg_no"><strong>'+ nPageNo + '</strong>/' + nTempTotal + '</span> <!--_n ��Ȱ��ȭ-->';
				szHtml += '<span class="btn_page">';

				if( nPageNo > 1 )
				{
					szHtml += '<a href="javascript:;" class="btn prev" onclick="javascript:afreeca.front.keyword.setMedalHtml(' + (nPageNo-1) + '); afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord  + '\', \'prz\', \'' + oProfileData[0]['user_id'] + '\');">����</a>';
				}
				else
				{
					szHtml += '<a href="javascript:;" class="btn prev_n">����</a>';
				}

				if( nTempTotal > 1 && nTempTotal >= (nPageNo+1) )
				{
					szHtml += '<a href="javascript:;" class="btn next" onclick="javascript:afreeca.front.keyword.setMedalHtml(' + (nPageNo+1) + '); afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord  + '\', \'prz\', \'' + oProfileData[0]['user_id'] + '\');">����</a></span>';
				}
				else
				{
					szHtml += '<a href="javascript:;" class="btn next_n">����</a></span>';
				}
				szHtml += '</div></div>';
				szHtml += '<!--//����޴�-->';

				$('#divMedal').html( szHtml );
			}
		}
	}
	, setRelateBjHtml : function( nPageNo ){
		if( typeof(this.oAllData.RESULT) == 'undefined' || this.oAllData.RESULT == -1 )
		{
			return;
		}
		// ����BJ HTML ���
		if( typeof(nPageNo) != 'undefined' )
		{
			if( nPageNo <= 0 )
			{
				nPageNo = 1;
			}
			var szHtml = '';
			var oProfileData = this.oAllData.PROFILE;
			if( typeof(oProfileData) != 'undefined' && oProfileData.length > 0 )
			{
				if( nPageNo > Math.ceil(oProfileData[0]['related_bj'].length / 4) )
				{
					nPageNo = Math.ceil(oProfileData[0]['related_bj'].length / 4);
				}
				if( oProfileData[0]['related_bj'].length > 0 )
				{
					szHtml += '<ul>';
					var nStartNum = (nPageNo -1) * 4;
					if( nStartNum < 0 )
					{
						nStartNum = 0;
					}

					var nCount = 0;
					for(var i = nStartNum; i<oProfileData[0]['related_bj'].length; i++ )
					{
						if( nCount > 3 )
						{
							break;
						}

						var szClubRelateStation = '���չ��';
						if( oProfileData[0]['related_bj'][i]['station_type'] == 1 )
						{
							szClubRelateStation = 'Ŭ��';
						}

						var szImg = ST_PROXY_NONE_SCHEME + '/DATA/LOGO/' + oProfileData[0]['related_bj'][i]['user_id'].substring(0, 2) + '/';
						szImg += oProfileData[0]['related_bj'][i]['user_id'] + '/' + oProfileData[0]['related_bj'][i]['user_id'] + '.jpg';
						szHtml += '<li>';
						var szKeyWord = $('input[name=szKeyword]').val();
						szHtml += '<a href="' + BJ_AFREECA_NONE_SCHEME + '/' + oProfileData[0]['related_bj'][i]['user_id'] + '" target="_blank" onclick="javascript:afreeca.front.statistics.setProfileSearchParam(\'' + szKeyWord + '\', \'rbj\');"><span class="thum"><img src="' + szImg + '" alt="" onerror="javascript:afreeca.front.keyword.setDefaultImage(this);"></span><span class="det"><strong>' + oProfileData[0]['related_bj'][i]['user_nick'] + '</strong>' + szClubRelateStation + '</span>';

						// ������ϰ�츸 ���
						if( oProfileData[0]['related_bj'][i]['broad_no'] > 0 )
						{
							szHtml += '<img src="' + RES_AFREECA_NONE_SCHEME + '/images/mobile/icon_live.gif" style="position:absolute;top:0;left:0" alt="���̺�"/>';
						}
						szHtml += '</a>';
						szHtml += '</li>';
						nCount++;
					}
					szHtml += '</ul>';

					var nTempTotal = oProfileData[0]['related_bj'].length / 4;
					nTempTotal = Math.ceil( nTempTotal );

					if( nPageNo > 1 )
					{
						szHtml += '<span class="prev" onclick="javascript:afreeca.front.keyword.setRelateBjHtml(' + (nPageNo-1) + ');">����</span>';
					}
					else
					{
						szHtml += '<span class="prev_n">����</span>';
					}
					if( nTempTotal > 1 && nTempTotal >= (nPageNo+1) )
					{
						szHtml += '<span class="next" onclick="javascript:afreeca.front.keyword.setRelateBjHtml(' + (nPageNo+1) + ');">����</span>';
					}
					else
					{
						szHtml += '<span class="next_n">����</span>';
					}
					szHtml += '</div>';

					$('#divRelateBj').html( szHtml );
				}
			}
		}
	}
	, chkFavorite: function(szFavoriteId) {
		if( typeof(Read_Cookie) != 'function' )
		{
			return false;
		}
		var ticket = Read_Cookie('PdboxTicket');
		var userid = '';
		var aUserInfo = Read_Cookie('PdboxUser').split('&');
		var aUserId = aUserInfo[0].split('=');
		if( aUserId.length > 1 )
		{
			userid = aUserId[1];
		}

		var szUrl = FAV_8057 + '/afreeca/favorite_api.php';
		$.ajax ({
			type		: 'GET',
			dataType	: 'jsonp',
			jsonp		: 'callback',
			url			: szUrl,
			cache		: false,
			data		: {
				szWork	: 'CHK',
				szBjId	: userid,
				favorite: szFavoriteId
			},
			success	: function(oData,status){
				if(oData.RESULT == -5)
				{
					afreeca.front.keyword.bFavorite = true;
				}
				else
				{
					afreeca.front.keyword.bFavorite = false;
				}
				afreeca.front.keyword.setProfileThemeSearch();
			},
			error : function(jqXHR, status, errorThrow){
			}
		});
	}
}

$( function () {
	// ������ �ʱ�ȭ
	if( typeof(afreeca.front.keyword) == 'undefined')
	{
		return;
	}
	afreeca.front.keyword.init();
	/*
	if( $.trim($('#szKeyword').val()) != '' )
	{
		afreeca.front.keyword.callRelateSearch( $.trim($('#szKeyword').val()) );
	}
	*/
});
