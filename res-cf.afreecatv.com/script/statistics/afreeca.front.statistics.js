if( typeof(afreeca) == 'undefined')
{
	// http://www.afreeca.com/script/common/afreeca.js no call ready��ȣ�⿡ ���� ���
	var afreeca ={
		front : {
		}
	};
}

afreeca.front.statistics = {
	// ��� API ȣ�� ����
	isLog : false
	, setCommonSearchParam: function () {
		// ���� ������ - �ʼ� ������ ���� �����ϴ� �κ�
		var szActType = $('input[name=szActType]').val();

		switch ($('input[name=szSearchType]').val())
		{
			case 'broad':
				szActType = 'live';	// ����� ��
				break;
			case 'video':
				szActType = 'vod';	// ������ ��
				break;
			case 'bj':
				szActType = 'bj';	// BJ ��
				break;
			case 'post':
				szActType = 'post'; // �Խñ� ��
				break;
			case 'total':
				//szActType = '';	// ���հ˻� �� �� ��Ÿ
				break;
		}
		$('input[name=szActType]').val(szActType);

		// szSortType : szActType �� ���� �ٸ�
		var szSortType = $('input[name=szSortType]').val();
		if (szActType == 'live')
		{
			switch ($('input[name=szBroadOrder]').val())
			{
				case 'rank':
					szSortType = 'bjrank';		// BJ��ŷ��
					break;
				case 'pc_total_view_cnt':
					szSortType = 'view_count';	// ��û�ο��� or ������û�ڼ�
					break;
				case 'broad_start':
					szSortType = 'latest';		// �ֽż�
					break;
				case 'broad_bps':
					szSortType = 'broad_bps';	// ��ȭ����
					break;
				case 'broad_resolution':
					szSortType = 'broad_resolution';	// ���ػ󵵼�
					break;
				case '':
					szSortType = 'score';	// ��Ȯ����
					break;
			}
		}
		else if (szActType == 'vod')
		{
			switch ($('input[name=szVideoOrder]').val())
			{
				case 'view_cnt':
					szSortType = 'view_count';	// ��û�ο��� or ������û�ڼ�
					break;
				case 'reg_date':
					szSortType = 'latest';		// �ֽż�
					break;
				default:
					szSortType = 'score';		// ��Ȯ����
				break;
			}
		}
		
		else if (szActType == 'post')
		{
			switch ($('input[name=szPostOrder]').val())
			{
				case 'reg_date':
					szSortType = 'latest';		// �ֽż�
					break;
				case 'view_cnt':
					szSortType = 'view_count';	// ��û�ο��� or ������û�ڼ�
					break;
				case 'memo_cnt':
					szSortType = 'memo_cnt';	// ��۽ð���
					break;
				case '':
					szSortType = 'latest';		// �ֽż�
					break;
			}
		}
		else if (szActType == 'bj')
		{
			switch ($('input[name=szBjOrder]').val())
			{
				case 'ranking':
					szSortType = 'bjrank';		// BJ��ŷ��
					break;
				case 'total_view_cnt':
					szSortType = 'view_count';	// ��û�ο��� or ������û�ڼ�
					break;
				case 'total_broad_time':
					szSortType = 'broad_time';	// ��۽ð���
					break;
				case 'favorite_cnt':
					szSortType = 'favorite';	// ��û�ڼ�
					break;
				case 'fanclub_cnt':
					szSortType = 'fan_club';	// ��Ŭ����
					break;
				case '':
					szSortType = 'score';	// ��Ȯ����
					break;
			}
		}
		else if (szActType == 'hash_all')
		{
			szSortType = 'view_count';
			$('input[name=szTerm]').val('1month');
		}
		else if (szActType == 'hash_live')
		{
			szSortType = $('#hashtagLive_order li.on').data('order').toLowerCase();
			switch (szSortType) {
				case 'broad_start':
					szSortType = "latest";
					break;
				default:
					szSortType = "view_count";
					break;
			}
		}
		else if (szActType == 'hash_vod')
		{
			szSortType = $('#hashtagVod_order li.on').data('order').toLowerCase();
			switch (szSortType) {	// �ؽ��±� ������ UP��=recomm_cnt, ��ۼ�=memo_cnt�� ����
				case 'reg_date':
					szSortType = "latest";
					break;
				case 'view_cnt':
					szSortType = "view_count";
					break;
			}
			$('input[name=szTerm]').val($('#hashtagVod_range li.on').data('range').toLowerCase());
		}
		$('input[name=szSortType]').val(szSortType);
	
		var szFilterType = '';
		if (szActType == 'hash') {
			$('input[name=szTerm]').val($('#range li.on').data('range').toLowerCase());
		}
		switch ($('input[name=szTerm]').val())
		{
			case 'all':
				szFilterType = 'all';	// ��ü�Ⱓ ���͸�
				break;
			case '1day':
				szFilterType = '1d';	// �ֱ� 1�� ���͸�
				break;
			case '1week':
				szFilterType = '1w';	// �ֱ�1�� ���͸�
				break;
			case '1month':
				szFilterType = '1m';	// �ֱ� 1�� ���͸�
				break;
			case '1year':
				szFilterType = '1y';	// �ֱ� 1�� ���͸�
				break;
			case 'input':
				szFilterType = 'di';	// �����Է� ���͸�
				break;
		}
		$('input[name=szFilterType]').val(szFilterType);

		// szActCode	: ������ ����
		// szBjId		: ������ ����
		// szBno		: ������ ����
		// szVno		: ������ ����
		// szStype 		: ������ ����
	}
	, setRealTimeSearchParam: function (szKeyWord) {
		//�ǽð� �˻��� Ŭ�� �� ���
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// ���� ������ ����

		$('input[name=szStype]').val('rk');							// actionLog �� sType ����
		$('input[name=szLocation]').val('total_search');			// actionLog �� location ����
	}
	, setRelationSearchListParam: function (szKeyWord) {
		//���� �˻� bj����Ʈ Ŭ�� �� ���
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// ���� ������ ����

		$('input[name=szStype]').val('rb');							// actionLog �� sType ����
		$('input[name=szLocation]').val('total_search');
	}
	, setRecommendSearchParam: function (szKeyWord) {
		// ��õ �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// ���� ������ ����

		$('input[name=szStype]').val('rc');							// actionLog �� sType ����
		$('input[name=szLocation]').val('total_search');
	}
	, setRelateSearchParam: function (szKeyWord) {
		// ���� �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szStype]').val('rt');
		$('input[name=szLocation]').val('total_search');
		return true;
	}
	, setLiveQuickViewSearchParam: function (szKeyWord, szActCode, szBjId) {
		//��� �ٷκ���
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActType]').val('direct');
		$('input[name=szActCode]').val(szActCode);

		if (typeof (szBjId) != 'undefined' && szBjId != null)
		{
			$('input[name=szBjId]').val(szBjId);
		}

		//$('input[name=szStype]').val( 'rt' );

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// ��� API ȣ��
		return true;
	}
	, setProfileSearchParam: function (szKeyWord, szActCode, szBjId, szBno) {
		// BJ ������ �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActType]').val('bjp');
		$('input[name=szActCode]').val(szActCode);

		if (typeof (szBjId) != 'undefined' && szBjId != null)
		{
			$('input[name=szBjId]').val(szBjId);
		}

		if (typeof (szBno) != 'undefined' && szBno != null)
		{
			$('input[name=szBno]').val(szBno);
		}

		//$('input[name=szStype]').val( 'rt' );

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// ��� API ȣ��
		return true;
	}
	,setThemeSearchParam : function( szKeyWord, szActCode ){
		// �׸� �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActType]').val( 'tsk' );
		$('input[name=szActCode]').val( szActCode );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	, setLiveSearchParam: function (szKeyWord, szActCode, szBjId, szBno) {
		// ����� �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		$('input[name=szActType]').val('live');
		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActCode]').val(szActCode);

		if (typeof (szBjId) != 'undefined' && szBjId != null)
		{
			$('input[name=szBjId]').val(szBjId);
		}

		if (typeof (szBno) != 'undefined' && szBno != null)
		{
			$('input[name=szBno]').val(szBno);
		}

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// ��� API ȣ��
		return true;
	}
	,setVodSearchParam : function( szKeyWord, szActCode, szBjId, szVno, szPageNo ){

		// ������ �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val('vod');
		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActCode]').val( szActCode );

		if( typeof(szBjId) != 'undefined' && szBjId != null )
		{
			$('input[name=szBjId]').val( szBjId );
		}

		if( typeof(szVno) != 'undefined' && szVno != null )
		{
			$('input[name=szVno]').val( szVno );
		}

		if( typeof(szPageNo) != 'undefined' && szPageNo != null )
		{
			$('input[name=nPageNo]').val( szPageNo );
		}

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	,setHashtagParam : function( szKeyWord, szActType, szActCode, szBjId, szBno, szVno, szPageNo ){

		// ������ �˻��� �κ�
		// afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		// $('input[name=szSearchType]').val('video');

		$('input[name=szActType]').val( szActType );

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActCode]').val( szActCode );
		$('input[name=szStype]').val('di');

		if( typeof(szBjId) != 'undefined' && szBjId != null )
		{
			$('input[name=szBjId]').val( szBjId );
		}

		if( typeof(szBno) != 'undefined' && szBno != null )
		{
			$('input[name=szBno]').val( szBno );
		}

		if( typeof(szVno) != 'undefined' && szVno != null )
		{
			$('input[name=szVno]').val( szVno );
		}

		if( typeof(szPageNo) != 'undefined' && szPageNo != null )
		{
			$('input[name=nPageNo]').val(szPageNo);
		}

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	, setPostSearchParam: function (szKeyWord, szActCode, szBjId, nTitleNo, nPageNo) {
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����W
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val( 'post' );
		
		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActCode]').val(szActCode);

		if( typeof(szBjId) != 'undefined' && szBjId != null )
		{
			$('input[name=szBjId]').val( szBjId );
		}

		if( typeof(nTitleNo) != 'undefined' && nTitleNo != null )
		{
			$('input[name=nTitleNo]').val( nTitleNo );
		}

		if( typeof(nPageNo) != 'undefined' && nPageNo != null )
		{
			$('input[name=nPageNo]').val( nPageNo );
		}

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	,setBjSearchParam : function( szKeyWord, szActCode, szBjId ){
		// BJ �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val( 'bj' );
		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szActCode]').val( szActCode );

		if( typeof(szBjId) != 'undefined' && szBjId != null )
		{
			$('input[name=szBjId]').val( szBjId );
		}

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	,setAutoSearchParam : function( szKeyWord ){
		// �ڵ��ϼ� �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szStype]').val( 'ac' );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	,setNotAutoSearchParam : function( szKeyWord ){
		// �ڵ��ϼ��� �ƴ� ����� �˻��� ����� �˻��� �κ�
		afreeca.front.statistics.setStatisticsSeachParam(); // �ʱ�ȭ

		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// ���� ������ ����

		$('input[name=szStype]').val( 'di' );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// ��� API ȣ��
		return true;
	}
	,setStatisticsSeachParam : function( szActType, szActCode, szBjId, szBno, szVno, szSortType, szFilterType, szStype ){
		// �˻������� ������ ������ ����
		$('input[name=szActType]').val( szActType );
		$('input[name=szActCode]').val( szActCode );
		$('input[name=szBjId]').val( szBjId );
		$('input[name=szBno]').val( szBno );
		$('input[name=szVno]').val( szVno );
		//$('input[name=szSortType]').val( szSortType );
		//$('input[name=szFilterType]').val( szFilterType );
		//$('input[name=szStype]').val( szStype );
	}
	,callSearchStatistics : function( szKeyWord ) {
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}
		
		var szActType = $('input[name=szActType]').val();
		var szActCode = $('input[name=szActCode]').val();
		var szBjId = $('input[name=szBjId]').val();
		var szBno = $('input[name=szBno]').val();
		var szVno = $('input[name=szVno]').val();
		var szSortType = $('input[name=szSortType]').val();
		var szFilterType = $('input[name=szFilterType]').val();
		var szStype = $('input[name=szStype]').val();
		var nPageNo = $('input[name=nPageNo]').val();
		var nTitleNo = $('input[name=nTitleNo]').val();

		// ��� API
		var szUrl = SEARCH_SCKETC_80+'/api.php';
		var szType = 'actionLog';
		var szVersion = '1.0';
		var szLocation = 'total_search';
		/*
			<< szActType : acttype >>
			bjp : BJ�����ʰ˻�,  tsk: �׸��˻�,   live: �����,   vod: ������,   bj: BJ�˻�
		*/
		/*
			<< szActCode : actcode >>
			[BJ ������]
			fav : ���ã��,  nick : �г���,  live : LIVE,  crr : ���,  cmm : Ŀ�´�Ƽ,
			nt : ��������,  prz : ����޴�,  rbj : ����BJ,  qna : 10��10��

			[�׸��˻�]
			tt:Ÿ��Ʋ, inf : �ΰ�����

			[�����]
			sn : �����,  tt : Ÿ��Ʋ, bjn : BJ��

			[������]
			sm : �����,  tt : Ÿ��Ʋ, bjn : BJ��

			[BJ]
			sti : ��۱���ǥ�̹���,  st : ��۱�,  stn : ��۱���

			[�����Է�]   : di
			[��õ�˻���] : rc
			[�ڵ��ϼ�]   : ac
			[�����˻���] : rt
			[���� �˻� BJ ����Ʈ] : rb
			[�ǽð� �˻���] : rk
		*/
		/*
			<< szBjId : bid >> : �����ʼ�
			1. acttype : bjp, actcode : live
			2. acttype : bjp, actcode : rbj
			3. acttype : vod, actcode : sm / tt / bjn
			4. acttype : bj (��ü), actcode : sti / st / stn

			<< szBno : bno >> : �����ʼ�
			1. acttype : bjp, actcode : live
			2. acttype : live (��ü), actcode : sn / tt / bjn

			<< szVno : vno >> : �����ʼ�
			1. acttype : vod (��ü), actcode : sn / tt / bj
		*/
		/*
			<< szSortType : st >> : �ʼ�
			bjrank  : BJ��ŷ��,   view_count : ��û�ο��� or ������û�ڼ�,   latest : �ֽż�
			broad_bps : ��ȭ����,   broad_resolution : ���ػ󵵼�,   score : ��Ȯ����,  broad_time : ��۽ð���
		*/
		/*
			<< szFilterType : ft >> : �ʼ�
			all : ��ü�Ⱓ ���͸�
			1d : �ֱ� 1�� ���͸�
			1w : �ֱ�1�� ���͸�
			1m : �ֱ� 1�� ���͸�
			di : �����Է� ���͸�
		*/
		/*
			<< szStype : stype >> : �ʼ�
			di : �����Է�
			rc : ��õ �˻���
			ac : �ڵ��ϼ�
			rt : �����˻���
		*/
		try
		{
			$.ajax({
				type		: 'GET',
				dataType	: 'jsonp',
				//jsonp		: 'callback',
				url			: szUrl,
				cache		: false,
				//async		: false,
				data		: {
					m		: szType,
					v		: szVersion,
					d		: encodeURIComponent(szKeyWord),
					t		: 'json',
					c		: 'EUC-KR',
					w		: 'webk',
					location: szLocation,
					acttype : szActType,
					actcode : szActCode,
					bjid	: szBjId,
					bno 	: szBno,
					vno		: szVno,
					st		: szSortType,
					ft		: szFilterType,
					stype	: szStype,
					pageNo	: nPageNo,
					tno 	: nTitleNo
				},
				success	: function(oData,status){
				},
				error : function(jqXHR, status, errorThrow){
				}
			});
		}
		catch(e)
		{
		}
	}
	,setPlayerSearchParam : function( szKeyWord, szActType, szActCode, szBjId, szBno, szVno, szSortType, szFilterType, szStype ){
		// Ű���尡 ������ ��� API ȣ�� ����
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		var szUserId = '';
		if( typeof(Read_Cookie) == 'function' && Read_Cookie('PdboxUser') != '' )
		{
			var aUserInfo = Read_Cookie('PdboxUser').split('&');
			var aUserId = aUserInfo[0].split('=');
			if( aUserId.length > 1 )
			{
				szUserId = aUserId[1];
			}
		}

		if( typeof(szActType) == 'undefined' )
		{
			szActType = '';	// ���԰˻� : ��, ����� : live,   ������ : vod
		}
		if( typeof(szActCode) == 'undefined' )
		{
			szActCode = '';
		}
		if( typeof(szBjId) == 'undefined' )
		{
			szBjId = '';
		}
		if( typeof(szBno) == 'undefined' )
		{
			szBno = '';
		}
		if( typeof(szVno) == 'undefined' )
		{
			szVno = '';
		}
		if( typeof(szSortType) == 'undefined' )
		{
			szSortType = '';
		}

		switch( szActType )
		{
			case 'live' :
				// szOrderCol
				if( szSortType == 'orderByRankAsc' )
				{
					szSortType = 'bjrank';				// BJ��ŷ��
				}
				else if( szSortType == 'orderByCurrentViewCntDesc' )
				{
					szSortType = 'view_count';			// ��û�ο���
				}
				else if( szSortType == 'orderByBroadNoDesc' )
				{
					szSortType = 'latest';				// �ֽż�
				}
				else if( szSortType == 'orderByBpsDesc' )
				{
					szSortType = 'broad_bps';			// ��ȭ����
				}
				else if( szSortType == 'orderByResolutionDesc' )
				{
					szSortType = 'broad_resolution';	// ���ػ󵵼�
				}
				else if( szSortType == 'orderByAccur' )
				{
					szSortType = 'score';	// ��Ȯ����
				}
				else
				{
					szSortType = 'score';				// default : ��Ȯ���� ����
				}

				// szBroadKind
				if( szFilterType == 'real' )
				{
					szFilterType = 'base';		// �����
				}
				else if( szFilterType == 'scrap' )
				{
					szFilterType = 'relay';	// �߰���
				}
				else
				{
					szFilterType = 'all';			// default : all  ���(��ü)���� ����
				}
				break;
			case 'vod' :
				// szOrderUcc
				if( szSortType == 'orderByRegDesc' )
				{
					szSortType = 'latest';			// �ֽż�
				}
				else if( szSortType == 'accur' )
				{
					szSortType = 'score';			// ��Ȯ����
				}
				else if( szSortType == 'orderByViewDesc' )
				{
					szSortType = 'view_count';		// ��û�ο���
				}
				else
				{
					szSortType = 'latest';			// default : �ֽż����� ����
				}
				// szUccFileType
				if( szFilterType == 'REVIEW' )
				{
					szFilterType = 'review';		// ��۴ٽú���
				}
				else if( szFilterType == 'HIGHLIGHT' )
				{
					szFilterType = 'highlight';	// ���̶���Ʈ
				}
				else if( szFilterType == 'NORMAL' )
				{
					szFilterType = 'normal';		// �Ϲݵ�����
				}
				else if( szFilterType == 'CLIP' )
				{
					szFilterType = 'clip';		// �Ϲݵ�����
				}
				else
				{
					szFilterType = 'all';	// default :  ���(��ü)���� ����
				}
				break;
		}
		if( typeof(szStype) == 'undefined' )
		{
			szStype = 'di';
		}

		// ��� API
		var szUrl = SEARCH_SCKETC_80+'/api.php';
		var szType = 'actionLog';
		var szVersion = '1.0';
		var szLocation = 'total_search';

		$.ajax({
			type		: 'GET',
			dataType	: 'jsonp',
			//jsonp		: 'callback',
			url			: szUrl,
			cache		: false,
			//async		: false,
			data		: {
				m		: szType,
				v		: szVersion,
				d		: encodeURIComponent(szKeyWord),
				t		: 'json',
				c		: 'EUC-KR',
				w		: 'atv1',
				uid		: szUserId,
				location: szLocation,
				acttype : szActType,	// live vod
				actcode : szActCode,
				bjid	: szBjId,
				bno 	: szBno,
				vno		: szVno,
				st		: szSortType,
				ft		: szFilterType,
				stype	: szStype
			},
			success	: function(oData,status){
			},
			error : function(jqXHR, status, errorThrow){
			}
		});
	}
}
