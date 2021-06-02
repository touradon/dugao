//数字递加插件
$.fn.countTo = function(options) {
	options = options || {};
	return $(this).each(function() {
		var settings = $.extend({}, $.fn.countTo.defaults, {
			from: $(this).data('from'),
			to: $(this).data('to'),
			speed: $(this).data('speed'),
			refreshInterval: $(this).data('refresh-interval'),
			decimals: $(this).data('decimals')
		}, options);
		var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;
		var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};
		$self.data('countTo', data);
		if (data.interval) {
			clearInterval(data.interval)
		}
		data.interval = setInterval(updateTimer, settings.refreshInterval);
		render(value);

		function updateTimer() {
			value += increment;
			loopCount++;
			render(value);
			if (typeof(settings.onUpdate) == 'function') {
				settings.onUpdate.call(self, value)
			}
			if (loopCount >= loops) {
				$self.removeData('countTo');
				clearInterval(data.interval);
				value = settings.to;
				if (typeof(settings.onComplete) == 'function') {
					settings.onComplete.call(self, value)
				}
			}
		}
		function render(value) {
			var formattedValue = settings.formatter.call(self, value, settings);
			$self.html(formattedValue)
		}
	})
};

$.fn.countTo.defaults = {
	from: 0,
	to: 0,
	speed: 1000,
	refreshInterval: 100,
	decimals: 0,
	formatter: formatter,
	onUpdate: null,
	onComplete: null
};

function formatter(value, settings) {
	return value.toFixed(settings.decimals)
};

function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options)
};

$(function(){
    // 浏览器版本提示
    pageTipsFun();
    function pageTipsFun() {
        if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE","")) <=9){
            document.getElementById('browser-modal').style.display='block';
            console.log("您的浏览器版本过低，请使用IE10以上版本");
        }
    }
    function tipsHide() {
        document.getElementById('pageTips').style.visibility = "hidden"
    }

    // HTML 字体大小设置
    fontSize();
    $(window).resize(function () {
        fontSize();
    });

    function fontSize() {
        var size;
        var winW = window.innerWidth; // 获取窗口宽度
        if (winW <= 1600 && winW > 800) { // 窗口宽度区间在 800px ~ 1600px
            size = Math.round(winW / 16);
        } else if (winW <= 800) { // 窗口宽度小于 800px
            size = Math.round(winW / 7.5);
            if (size > 65) {
                size = 65;
            }
        } else {
            size = 100; // 窗口宽度大于 1600px 
        }
        $('html').css({
            'font-size': size + 'px'
        })
    }

    // 返回顶部
    // function scroll2top(){
    // 	let btn = $("#scroll2Top"); // 获取元素
    // 	btn.click(function(){  // 按钮添加点击事件
    // 		$("body, html").stop(true, true).animate({
    // 	        scrollTop: 0
    // 		}, 300)
    // 	 });

    // 	$(window).scroll(function(){ // 窗口滚动时，滚动到一定位置 btn 按钮显示/隐藏
    // 		if( (window).scrollTop() > $(window).height() ){
    // 			btn.addClass('show');
    // 		} else {
    // 			btn.removeClass('show');
    // 		}
    // 	});
    // }
    // // 初始化
    // scroll2top();

    // 导航鼠标经过效果
    var sto_nav;
    $("#nav .nav-item").hover(
        function(){
            clearTimeout(sto_nav);
            $(".nav-item .submenu").removeClass("show");
            $("#nav .nav-item").removeClass("hover");

            $(this).addClass("hover");
            $(this).find(".submenu").addClass("show");
        },
        function(){
            sto_nav=setTimeout(function(){
                $(".nav-item .submenu").removeClass("show");
                $("#nav .nav-item").removeClass("hover");
            },100);
        }
    );
    $(".nav-item .submenu").hover(
        function(){
            clearTimeout(sto_nav);
        },
        function(){
            $(".nav-item .submenu").removeClass("show");
            $("#nav .nav-item").removeClass("hover");
        }
    );

    var bannerSlide = new Swiper('.banner',{
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });

    var caseSlide = new Swiper('.tab-content-item', {
        slidesPerView: 4,
        slidesPerColumn: 2
    });

    var dgSlide = new Swiper('.dgslide-container',{
        slidesPerView: 'auto',
        loop: true,
        navigation: {
            nextEl: '.dgslide-btn-next',
            prevEl: '.dgslide-btn-prev',
        },
        on: {
           init: function(swiper){
                let slidesLen = this.slides.length / 3;
                $('.dgslide-container .page-num').each(function(index){
                    $(this).html( 1 + " of " +  slidesLen);
                });
           }
        }
    });

    /* 全景展示头部轮播 */
    var vrSlide = new Swiper('.vr',{
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /* 下拉框 */
    var sto_select;
    $(".select").hover(
        function(){
            clearTimeout(sto_select);
            $(".select .select-list").removeClass("show");
            $(".select").removeClass("hover");

            $(this).addClass("hover");
            $(this).find(".select-list").addClass("show");
        },
        function(){
            sto_select=setTimeout(function(){
                $(".select .select-list").removeClass("show");
                $(".select").removeClass("hover");
            },100);
        }
    );
    $(".select .select-list").hover(
        function(){
            clearTimeout(sto_select);
        },
        function(){
            $(".select .select-list").removeClass("show");
            $(".select").removeClass("hover");
        }
    );

    /* 荣誉资质轮播 */
    (function(){
        var honorSlide = new Swiper('.honor .swiper-container', {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
          });
    })();


    
})