/*
	�ʿ� script
	http://www.afreeca.com/script/new_main/
			new_main/_config.js
			jquery/jquery-*.min.js

	���ã�� ���̾� �߰��� �� : `<div class="shortcut_layer" style="display:none" id="fav_layer"></div>`
*/

var gszUserId = "";
// ���ã�� ȣ��
function getFavorite(szUserId)
{
	GoScript2(FAV_8057 + "/afreeca/favorite_api.php?szWork=SELECTBOX&szScriptVar=oFavoriteList&szBjId=" + szUserId + "&hash=" + Math.random());
	gszUserId = szUserId;
}

// ��ũ��Ʈ �����
function GoScript2( szUrl )
{
    try
    {
        var headElem =  document.getElementsByTagName('head').item(0);
        var script   = document.createElement('script');
        if (!szUrl) szUrl += '&rand='+Math.random();

        script.src = szUrl;
        script.type = 'text/javascript';
        script.charset = 'euc-kr';
        script.defer = 'true';

        if(window.navigator.userAgent.indexOf('MSIE') > 0)
        {
			//���ι�۱� ���� ���ӽ� ���ã�� �޴��� �������� �ʴ� ������ �ذ� by MoonHS
			script.onreadystatechange = function()  { if(script.readyState == 'loaded' || script.readyState == 'complete')  {onLoadFavorite();}   }       // IE
        }
        else
        {
			script.onload  = function ()    {onLoadFavorite();  }       // FF
        }
        headElem.appendChild(script);
    }
    catch (e) {}
}


// ���ã�� �����
function onLoadFavorite()
{
	var oShortCutLayer = document.getElementById("fav_area");
	var aFavListHtml		= ['<div class="fav_list">'];
	var szBroadTypeName = "";	///< ������ Ÿ���̸�

    try
    {
        eval( oClubBjData );
    }
    catch(e){}

	var szBelongClubBjId = oClubBjData.ClubId;

    try
    {
        eval( oFavoriteList );
        var aFavList = oFavoriteList["CHANNEL"]["FAVORITE"][0]["favorite"];

		if ( 1 > aFavList.length ) {
			aFavListHtml.push('<p class="nolist">��ϵ� ���ã�Ⱑ �����ϴ�.</p>');

			// �Ҽ� Ŭ����۱��� �������
			if ( '' != szBelongClubBjId ) {
				aFavListHtml.push('<p class="club_cast"><a href="' + AFREECA_ISAPI + szBelongClubBjId + '" target="_blank">�Ҽ� Ŭ�� �ٷΰ���</a></p>');
			}
		} else {
			// �Ҽ� Ŭ����۱��� �������
			if ( '' != szBelongClubBjId ) {
				aFavListHtml.push('<p class="club_cast"><a href="' + AFREECA_ISAPI + szBelongClubBjId + '" target="_blank">�Ҽ� Ŭ�� �ٷΰ���</a></p>');
			}

			aFavListHtml.push('<ul>');

//console.log(aFavList);
			for(i=0;i<aFavList.length;i++)
			{
				switch (aFavList[i].b_type)
				{
					case '1' :	///< ������
						szBroadTypeName = 'apple';
						break;
					case '2' :	///< �ȵ���̵�
						szBroadTypeName = 'android';
						break;
					case '6' :	///< ķ�ڴ�
						szBroadTypeName = 'cam';
						break;
					case '12' :	///< �ȵ���̵� ���̺� ķ
						szBroadTypeName = 'android_live';
						break;
					default :	///< PC
						szBroadTypeName ='';
						break;
				}

				var szIsOnair = 'on';
				var szAction = 'openPlayer(\'' + aFavList[i].b_no + '\', \'' + aFavList[i].user_id + '\');';

				if (aFavList[i].is_broading == 'N')	{
					szIsOnair = 'off';
					szAction = 'goFavorite(\'' + aFavList[i].user_id + '\');';
				}

				aFavListHtml.push('<li class="' + szIsOnair + '"><em class="blind"></em><span class="' + szBroadTypeName + '"></span><span class="cast_name">');
				aFavListHtml.push('<a href="javascript:' + szAction + '">' + getByteLength(aFavList[i].station_name, 10) + '</a>');
				aFavListHtml.push('</span><span class="home"><a href="javascript:goFavorite(\'' + aFavList[i].user_id + '\');" ></a></span></li>');
			}

			aFavListHtml.push('</ul>');
		}
    }
    catch(e){}

	aFavListHtml.push('</div>');
	aFavListHtml.push('<div class="fav_btn"><a href="javascript:goEditFavorite();">���ã�� ����</a></div>');

	oShortCutLayer.innerHTML = aFavListHtml.join('');
}

function toggleFavorite()
{
    //if ($(".shortcut_layer").html() != "") $(".shortcut_layer").toggle();

	if ($("#fav_area").html() != "") 	$("#fav_area").toggle();
	//if (document.getElementById("fav_layer").html() != "") document.getElementById("fav_layer").toggle();
}

// ���ã�� ����
function goFavorite(bj_id)
{
    location.href = AFREECA_ISAPI + bj_id;
}

function goEditFavorite()
{
	location.href = LIVE_8079 + "/app/index.cgi?szBjId="+gszUserId+"&szType=favorite";
}

function openPlayer(bNo, uId )
{
	if (bNo == '')
	{
		alert ('���� ������� �ƴմϴ�.');
	}
	else if (bNo == 'full')
	{
		alert ('��û���� ������ �ʰ��Ǿ����ϴ�.');
	}
	else
	{
		var szOpenUrl = PLAY_80;
		if(uId != null && uId != undefined && uId != '')
		{
			szOpenUrl += "/" + uId;

			if(bNo != null && bNo != undefined && bNo != '')
			{
				szOpenUrl += "/" + bNo;
			}
		}
		var nPop = window.open( szOpenUrl, 'newPlayer');
		return;
	}
}
