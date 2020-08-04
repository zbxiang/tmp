var _app = _app || {};

_app.checkBrowser = function() {
    (function(w){if(!("WebSocket"in w&&2===w.WebSocket.CLOSING)){var d=document.createElement("div");d.className="browsehappy";d.innerHTML='<div style="width:100%;height:100px;font-size:20px;line-height:100px;text-align:center;background-color:#E90D24;color:#fff;margin-bottom:40px;">\u4f60\u7684\u6d4f\u89c8\u5668\u5b9e\u5728<strong>\u592a\u592a\u65e7\u4e86</strong>\uff0c\u592a\u592a\u65e7\u4e86 <a target="_blank" href="http://browsehappy.osfipin.com/" style="background-color:#31b0d5;border-color: #269abc;text-decoration: none;padding: 6px 12px;background-image: none;border: 1px solid transparent;border-radius: 4px;color:#FFEB3B;">\u7acb\u5373\u5347\u7ea7</a></div>';var f=function(){var s=document.getElementsByTagName("body")[0];if("undefined"==typeof(s)){setTimeout(f,10)}else{s.insertBefore(d,s.firstChild)}};f()}}(window));
}

_app.plugins = function() {
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 200,
        failure_limit: 10,
        skip_invisible: true,
        appear: null,
        load: null
    });

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    wow.init();
}

_app.share = function() {
    var SimpleShare = function (options) {

        // get share content
        options = options || {};
        var url = options.url || window.location.href;
        var title = options.title || document.title;
        var content = options.content || '';
        var pic = options.pic || '';

        // fix content format
        url = encodeURIComponent(url);
        title = encodeURIComponent(title);
        content = encodeURIComponent(content);
        pic = encodeURIComponent(pic);

        // share target url
        var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}';
        var weibo = 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false';
        var tqq = 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96';
        var renren = 'http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}';
        var douban = 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}';
        var facebook = 'https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}';
        var twitter = 'https://twitter.com/intent/tweet?text={title}&url={url}';
        var linkedin = 'https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true';
        var weixin = 'http://qr.liantu.com/api.php?text={url}';
        var qq = 'http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}';
        var tumblr = 'https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl={url}&title={title}&content={content}';
        var pinterest = 'https://www.pinterest.com/pin/create/button/?url={url}&media=" + encodeURIComponent(a))';

        // replace content functions
        function replaceAPI (api) {
            api = api.replace('{url}', url);
            api = api.replace('{title}', title);
            api = api.replace('{content}', content);
            api = api.replace('{pic}', pic);

            return api;
        }

        // share target
        this.qzone = function() {
            window.open(replaceAPI(qzone));
        };
        this.weibo = function() {
            window.open(replaceAPI(weibo));
        };
        this.tqq = function() {
            window.open(replaceAPI(tqq));
        };
        this.renren = function() {
            window.open(replaceAPI(renren));
        };
        this.douban = function() {
            window.open(replaceAPI(douban));
        };
        this.facebook = function() {
            window.open(replaceAPI(facebook));
        };
        this.twitter = function() {
            window.open(replaceAPI(twitter));
        };
        this.linkedin = function() {
            window.open(replaceAPI(linkedin));
        };
        this.qq = function() {
            window.open(replaceAPI(qq));
        };
        this.tumblr = function() {
            window.open(replaceAPI(tumblr));
        };
        this.pinterest = function() {
            window.open(replaceAPI(pinterest));
        };
        this.weixin = function(callback) {
            if (!callback) {
                // window.open(replaceAPI(weixin));
                var wxHtml = '<div class="wx-share"><i class="wx-share-close js-wxClose icon-close"></i><img src="'+replaceAPI(weixin)+'" alt=""><p>分享到微信朋友圈</p></div>';
                $('body').append(wxHtml);
            }else{
                callback(replaceAPI(weixin));
            }
        };
    };
    var share = new SimpleShare({
        url: '',
        title: '',
        content: '',
        pic: ''
    });
    $('.social a').on('click', function () {
        var type = $(this).attr('data-share');
        switch (type){
            case 'twitter':
                share.twitter();
                break;
            case 'facebook':
                share.facebook();
                break;
            case 'linkedin':
                share.linkedin();
                break;
            case "weixin":
                share.weixin();
                break;
            case "weibo":
                share.weibo();
                break;
            case 'tumblr':
                share.tumblr();
                break;
            case 'pinterest':
                share.pinterest();
                break;
            default:
                break;
        }
    });
    $(document).on('click', '.js-wxClose', function(){
        $('.wx-share').remove();
    });
};

_app.header = function() {
    $(window).bind('scroll',function() {
        if ($(window).scrollTop() > 0) {
            $('body').addClass('body-page')
        }else {
            $('body').removeClass('body-page');
        }
    }).trigger('scroll');

    $('.js-menu--open').on('click', function() {
        $('body').toggleClass('open-page');
        $('.js-sub--menu').slideToggle();
        $(this).find('i').toggleClass('icon-icon-close icon-icon-menu');
        if ($('body').hasClass('open-page')){
            $('body').css({'overflow': 'hidden'});
        }else{
            $('body').removeAttr('style');
        }
    });
}

_app.footer = function() {
    $('.js-back--top').on('click', function() {
        $('html,body').animate({scrollTop: 0}, 800);
    });
}

_app.index = function() {
    
}

_app.form = function () {
    $('.js-validate--form .control').focus(function(){
        $(this).parent().addClass('on');
    }).blur(function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('on');
        }
    });
}

_app.init = function() {
    _app.checkBrowser();
    _app.plugins();
    _app.share();
    _app.header();
    _app.footer();
    _app.index();
    _app.form();
}

_app.init();