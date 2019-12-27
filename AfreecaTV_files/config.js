/**
 * Created with JetBrains PhpStorm.
 * User: aswoo
 * Date: 13. 10. 2
 * requirejs configuration
 */

var baseUrl = '//static.afreecatv.com/asset';
try {
    if(szLocalCode == undefined) {
        baseUrl = '//static.afreecatv.com/asset';
    } else {
        if(szLocalCode != 'KR') {
            baseUrl = '//static-cf.afreecatv.com/asset';
        }
    }
} catch(e) {
    baseUrl = '//static.afreecatv.com/asset';
}

require.config({
     baseUrl: baseUrl
    ,paths: {
        jquery: [
            'library/jquery/1.10.2/jquery.min'
			,'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min'
        ]
        ,jqueryui: [
			'plugins/jquery/jqueryui/1.10.3/jquery-ui.min'
            ,'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min'
        ]
		,'jquery.base64': 'plugins/jquery/base64/jquery.base64.min'
        ,bootstrap: 'library/bootstrap/3.2.0/js/bootstrap.min'
		,underscore: 'library/underscore/1.5.2/underscore-min'
		,'jquery-validate': 'plugins/jquery/validate/1.11.1/jquery.validate.min'
		,bundle: 'plugins/requirejs/bundle'
		,doT : 'app/main/doT.min'
        ,text : 'plugins/requirejs/bundle/text'
        ,css : 'module/css'
        ,requirejs : 'plugins/requirejs'
        // afreeca public
		,constant: 'service/config/constant'
		,atv : [
			//'library/afreeca/atv'
			'library/afreeca/atv.min-1.6'
		]
		,afreeca:[
			//'service/afreeca'
			'service/afreeca.min-0.6'
		]
    }
    ,shim: {
		'underscore': { exports: '_' }
		,'jquery': { exports: 'jQuery' }
        ,'jqueryui': {
            deps: ['jquery']
			,exports: 'jQuery'
        }
		,'jquery.base64': {
			exports: 'jQuery'
			,deps: ['jquery']
		}
        ,bootstrap: {
            deps: ['jquery']
        }
		,atv : {
			exports: 'atv'
		}
		,'atv.min': {
			exports: 'atv'
		}
		,zepto: {
			exports: 'Zepto'
		}
    }
    ,waitSeconds: 0 // wait seconds
	,deps: ['constant']
	,callback: function() {
		document.domain = DOMAIN;
	}
});

