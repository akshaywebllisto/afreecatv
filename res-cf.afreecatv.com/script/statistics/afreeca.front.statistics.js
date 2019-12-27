if( typeof(afreeca) == 'undefined')
{
	// http://www.afreeca.com/script/common/afreeca.js no call ready미호출에 대한 대비
	var afreeca ={
		front : {
		}
	};
}

afreeca.front.statistics = {
	// 통계 API 호출 유무
	isLog : false
	, setCommonSearchParam: function () {
		// 공용 데이터 - 필수 데이터 변수 설정하는 부분
		var szActType = $('input[name=szActType]').val();

		switch ($('input[name=szSearchType]').val())
		{
			case 'broad':
				szActType = 'live';	// 생방송 탭
				break;
			case 'video':
				szActType = 'vod';	// 동영상 탭
				break;
			case 'bj':
				szActType = 'bj';	// BJ 탭
				break;
			case 'post':
				szActType = 'post'; // 게시글 탭
				break;
			case 'total':
				//szActType = '';	// 통합검색 탭 및 기타
				break;
		}
		$('input[name=szActType]').val(szActType);

		// szSortType : szActType 에 따라 다름
		var szSortType = $('input[name=szSortType]').val();
		if (szActType == 'live')
		{
			switch ($('input[name=szBroadOrder]').val())
			{
				case 'rank':
					szSortType = 'bjrank';		// BJ랭킹순
					break;
				case 'pc_total_view_cnt':
					szSortType = 'view_count';	// 시청인원순 or 누적시청자순
					break;
				case 'broad_start':
					szSortType = 'latest';		// 최신순
					break;
				case 'broad_bps':
					szSortType = 'broad_bps';	// 고화질순
					break;
				case 'broad_resolution':
					szSortType = 'broad_resolution';	// 고해상도순
					break;
				case '':
					szSortType = 'score';	// 정확도순
					break;
			}
		}
		else if (szActType == 'vod')
		{
			switch ($('input[name=szVideoOrder]').val())
			{
				case 'view_cnt':
					szSortType = 'view_count';	// 시청인원순 or 누적시청자순
					break;
				case 'reg_date':
					szSortType = 'latest';		// 최신순
					break;
				default:
					szSortType = 'score';		// 정확도순
				break;
			}
		}
		
		else if (szActType == 'post')
		{
			switch ($('input[name=szPostOrder]').val())
			{
				case 'reg_date':
					szSortType = 'latest';		// 최신순
					break;
				case 'view_cnt':
					szSortType = 'view_count';	// 시청인원순 or 누적시청자순
					break;
				case 'memo_cnt':
					szSortType = 'memo_cnt';	// 방송시간순
					break;
				case '':
					szSortType = 'latest';		// 최신순
					break;
			}
		}
		else if (szActType == 'bj')
		{
			switch ($('input[name=szBjOrder]').val())
			{
				case 'ranking':
					szSortType = 'bjrank';		// BJ랭킹순
					break;
				case 'total_view_cnt':
					szSortType = 'view_count';	// 시청인원순 or 누적시청자순
					break;
				case 'total_broad_time':
					szSortType = 'broad_time';	// 방송시간순
					break;
				case 'favorite_cnt':
					szSortType = 'favorite';	// 애청자순
					break;
				case 'fanclub_cnt':
					szSortType = 'fan_club';	// 팬클럽순
					break;
				case '':
					szSortType = 'score';	// 정확도순
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
			switch (szSortType) {	// 해시태그 동영상 UP순=recomm_cnt, 댓글순=memo_cnt로 보냄
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
				szFilterType = 'all';	// 전체기간 필터링
				break;
			case '1day':
				szFilterType = '1d';	// 최근 1일 필터링
				break;
			case '1week':
				szFilterType = '1w';	// 최근1주 필터링
				break;
			case '1month':
				szFilterType = '1m';	// 최근 1달 필터링
				break;
			case '1year':
				szFilterType = '1y';	// 최근 1년 필터링
				break;
			case 'input':
				szFilterType = 'di';	// 직접입력 필터링
				break;
		}
		$('input[name=szFilterType]').val(szFilterType);

		// szActCode	: 개별로 설정
		// szBjId		: 개별로 설정
		// szBno		: 개별로 설정
		// szVno		: 개별로 설정
		// szStype 		: 개별로 설정
	}
	, setRealTimeSearchParam: function (szKeyWord) {
		//실시간 검색어 클릭 할 경우
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// 공용 데이터 설정

		$('input[name=szStype]').val('rk');							// actionLog 후 sType 세팅
		$('input[name=szLocation]').val('total_search');			// actionLog 후 location 세팅
	}
	, setRelationSearchListParam: function (szKeyWord) {
		//연관 검색 bj리스트 클릭 할 경우
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// 공용 데이터 설정

		$('input[name=szStype]').val('rb');							// actionLog 후 sType 세팅
		$('input[name=szLocation]').val('total_search');
	}
	, setRecommendSearchParam: function (szKeyWord) {
		// 추천 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();			// 공용 데이터 설정

		$('input[name=szStype]').val('rc');							// actionLog 후 sType 세팅
		$('input[name=szLocation]').val('total_search');
	}
	, setRelateSearchParam: function (szKeyWord) {
		// 연관 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szStype]').val('rt');
		$('input[name=szLocation]').val('total_search');
		return true;
	}
	, setLiveQuickViewSearchParam: function (szKeyWord, szActCode, szBjId) {
		//방송 바로보기
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szActType]').val('direct');
		$('input[name=szActCode]').val(szActCode);

		if (typeof (szBjId) != 'undefined' && szBjId != null)
		{
			$('input[name=szBjId]').val(szBjId);
		}

		//$('input[name=szStype]').val( 'rt' );

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// 통계 API 호출
		return true;
	}
	, setProfileSearchParam: function (szKeyWord, szActCode, szBjId, szBno) {
		// BJ 프로필 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

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

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// 통계 API 호출
		return true;
	}
	,setThemeSearchParam : function( szKeyWord, szActCode ){
		// 테마 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szActType]').val( 'tsk' );
		$('input[name=szActCode]').val( szActCode );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	, setLiveSearchParam: function (szKeyWord, szActCode, szBjId, szBno) {
		// 생방송 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if (jQuery.trim(szKeyWord) == '')
		{
			return;
		}

		$('input[name=szActType]').val('live');
		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szActCode]').val(szActCode);

		if (typeof (szBjId) != 'undefined' && szBjId != null)
		{
			$('input[name=szBjId]').val(szBjId);
		}

		if (typeof (szBno) != 'undefined' && szBno != null)
		{
			$('input[name=szBno]').val(szBno);
		}

		afreeca.front.statistics.callSearchStatistics(szKeyWord);	// 통계 API 호출
		return true;
	}
	,setVodSearchParam : function( szKeyWord, szActCode, szBjId, szVno, szPageNo ){

		// 동영상 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val('vod');
		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

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

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	,setHashtagParam : function( szKeyWord, szActType, szActCode, szBjId, szBno, szVno, szPageNo ){

		// 동영상 검색어 부분
		// afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		// $('input[name=szSearchType]').val('video');

		$('input[name=szActType]').val( szActType );

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

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

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	, setPostSearchParam: function (szKeyWord, szActCode, szBjId, nTitleNo, nPageNo) {
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함W
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val( 'post' );
		
		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

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

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	,setBjSearchParam : function( szKeyWord, szActCode, szBjId ){
		// BJ 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		$('input[name=szActType]').val( 'bj' );
		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szActCode]').val( szActCode );

		if( typeof(szBjId) != 'undefined' && szBjId != null )
		{
			$('input[name=szBjId]').val( szBjId );
		}

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	,setAutoSearchParam : function( szKeyWord ){
		// 자동완성 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szStype]').val( 'ac' );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	,setNotAutoSearchParam : function( szKeyWord ){
		// 자동완성이 아닌 사용자 검색일 경우의 검색어 부분
		afreeca.front.statistics.setStatisticsSeachParam(); // 초기화

		// 키워드가 없으면 통계 API 호출 안함
		if( jQuery.trim(szKeyWord) == '' )
		{
			return;
		}

		afreeca.front.statistics.setCommonSearchParam();	// 공용 데이터 설정

		$('input[name=szStype]').val( 'di' );

		afreeca.front.statistics.callSearchStatistics( szKeyWord );	// 통계 API 호출
		return true;
	}
	,setStatisticsSeachParam : function( szActType, szActCode, szBjId, szBno, szVno, szSortType, szFilterType, szStype ){
		// 검색페이지 통계관련 데이터 설정
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

		// 통계 API
		var szUrl = SEARCH_SCKETC_80+'/api.php';
		var szType = 'actionLog';
		var szVersion = '1.0';
		var szLocation = 'total_search';
		/*
			<< szActType : acttype >>
			bjp : BJ프로필검색,  tsk: 테마검색,   live: 생방송,   vod: 동영상,   bj: BJ검색
		*/
		/*
			<< szActCode : actcode >>
			[BJ 프로필]
			fav : 즐겨찾기,  nick : 닉네임,  live : LIVE,  crr : 경력,  cmm : 커뮤니티,
			nt : 공지사항,  prz : 수상메달,  rbj : 연관BJ,  qna : 10문10답

			[테마검색]
			tt:타이틀, inf : 부가정보

			[생방송]
			sn : 썸네일,  tt : 타이틀, bjn : BJ명

			[동영상]
			sm : 썸네일,  tt : 타이틀, bjn : BJ명

			[BJ]
			sti : 방송국대표이미지,  st : 방송국,  stn : 방송국명

			[직접입력]   : di
			[추천검색어] : rc
			[자동완성]   : ac
			[연관검색어] : rt
			[연관 검색 BJ 리스트] : rb
			[실시간 검색어] : rk
		*/
		/*
			<< szBjId : bid >> : 조건필수
			1. acttype : bjp, actcode : live
			2. acttype : bjp, actcode : rbj
			3. acttype : vod, actcode : sm / tt / bjn
			4. acttype : bj (전체), actcode : sti / st / stn

			<< szBno : bno >> : 조건필수
			1. acttype : bjp, actcode : live
			2. acttype : live (전체), actcode : sn / tt / bjn

			<< szVno : vno >> : 조건필수
			1. acttype : vod (전체), actcode : sn / tt / bj
		*/
		/*
			<< szSortType : st >> : 필수
			bjrank  : BJ랭킹순,   view_count : 시청인원순 or 누적시청자순,   latest : 최신순
			broad_bps : 고화질순,   broad_resolution : 고해상도순,   score : 정확도순,  broad_time : 방송시간순
		*/
		/*
			<< szFilterType : ft >> : 필수
			all : 전체기간 필터링
			1d : 최근 1일 필터링
			1w : 최근1주 필터링
			1m : 최근 1달 필터링
			di : 직접입력 필터링
		*/
		/*
			<< szStype : stype >> : 필수
			di : 직접입력
			rc : 추천 검색어
			ac : 자동완성
			rt : 연관검색어
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
		// 키워드가 없으면 통계 API 호출 안함
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
			szActType = '';	// 통함검색 : 빈값, 생방송 : live,   동영상 : vod
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
					szSortType = 'bjrank';				// BJ랭킹순
				}
				else if( szSortType == 'orderByCurrentViewCntDesc' )
				{
					szSortType = 'view_count';			// 시청인원순
				}
				else if( szSortType == 'orderByBroadNoDesc' )
				{
					szSortType = 'latest';				// 최신순
				}
				else if( szSortType == 'orderByBpsDesc' )
				{
					szSortType = 'broad_bps';			// 고화질순
				}
				else if( szSortType == 'orderByResolutionDesc' )
				{
					szSortType = 'broad_resolution';	// 고해상도순
				}
				else if( szSortType == 'orderByAccur' )
				{
					szSortType = 'score';	// 정확도순
				}
				else
				{
					szSortType = 'score';				// default : 정확도순 설정
				}

				// szBroadKind
				if( szFilterType == 'real' )
				{
					szFilterType = 'base';		// 본방송
				}
				else if( szFilterType == 'scrap' )
				{
					szFilterType = 'relay';	// 중계방송
				}
				else
				{
					szFilterType = 'all';			// default : all  모두(전체)으로 설정
				}
				break;
			case 'vod' :
				// szOrderUcc
				if( szSortType == 'orderByRegDesc' )
				{
					szSortType = 'latest';			// 최신순
				}
				else if( szSortType == 'accur' )
				{
					szSortType = 'score';			// 정확도순
				}
				else if( szSortType == 'orderByViewDesc' )
				{
					szSortType = 'view_count';		// 시청인원순
				}
				else
				{
					szSortType = 'latest';			// default : 최신순으로 설정
				}
				// szUccFileType
				if( szFilterType == 'REVIEW' )
				{
					szFilterType = 'review';		// 방송다시보기
				}
				else if( szFilterType == 'HIGHLIGHT' )
				{
					szFilterType = 'highlight';	// 하이라이트
				}
				else if( szFilterType == 'NORMAL' )
				{
					szFilterType = 'normal';		// 일반동영상
				}
				else if( szFilterType == 'CLIP' )
				{
					szFilterType = 'clip';		// 일반동영상
				}
				else
				{
					szFilterType = 'all';	// default :  모두(전체)으로 설정
				}
				break;
		}
		if( typeof(szStype) == 'undefined' )
		{
			szStype = 'di';
		}

		// 통계 API
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
