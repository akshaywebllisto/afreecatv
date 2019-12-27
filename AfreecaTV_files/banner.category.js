/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define('banner', ['afreeca'], function(atv) {
	var $ = atv.$
		, oBanner = {
			list :{ 
				"hash" : {
					"all" : "<a href='http://afevent2.afreecatv.com:8120/app/af_episode/index.php' target='_blank'>아프리카TV에서 생긴일</a>"
					, "game" : "<em></em><ul><li><a href='http://sbs.afreecatv.com/' target='_blank' class='link_esports'>E스포츠 모든 정보를 한눈에 e스포츠 바로가기</a></li>\n\
								<li><a href='http://gametv.afreecatv.com/' target='_blank' class='link_game'>인기 게임방송 함께보기! 게임 바로가기</a></li></ul>"
					, "bora_all" : "<a href='http://star.afreecatv.com/' target='_blank' class='link_bora'>오늘의 스타, 보라피플 보이는라디오 홈 바로가기</a>" 
					, "best" : "<a href='http://afevent2.afreecatv.com:8120/app/starbj/index.php' target='_blank' class='link_starbj'>운영자가 인증한 스타BJ 스타BJ 홈 바로가기</a>"
					, "ani" : "<a href='http://ani.afreecatv.com/' target='_blank' class='link_ani'>애니메이션 모아보기! 애니메이션 바로가기</a>"  
					, "tv" : "<a href='http://tv.afreecatv.com/live_content.php/' target='_blank' class='link_cable'>지상파/케이블 방송하려면? 지상파/케이블 바로가기</a>"
				}
			},
			// 카테고리별 배너 생성
			// selectType : hash/category_no/
			// selectValue : hash - "all,game,bora,etc" category_no - '000390000'
			showCateBanner : function( szHash , oTarget) {
				// 배너리스트
				if(szHash == 'all'){
					oTarget = $('.bjissue_banner');
				}
				if(!oTarget){
					oTarget = $('#div_cate_banner');
				}
				if(oTarget.attr('data-hash') == szHash){
					oTarget.show();
					return;
				}
				var szHtml =  "";
				if (szHash in this.list.hash )    {
					szHtml = this.list.hash[szHash];
					oTarget.attr('data-hash',szHash);
					oTarget.html(szHtml).show();
				}else{
					oTarget.attr('data-hash','');
					oTarget.html('');
				}
			}
		};
	return oBanner;
});