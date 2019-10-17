(function ($) {

    $.fn.lazyLoad = function (options) {
        var defaults = {
            offset: 100,
        }

        // 参数扩展
        defaults = $.extend(defaults, options);

        var _this = $(this),
            list = [],
            offset = defaults.offset;

        // 避免重复查询DOM
        _this.each(function () {
            list.push(this);
        });

        // 是否已加载
        function isDeal(el) {
            return $(el).attr('src') == $(el).attr('data-src');
        }

        // 是否进入可视区
        function inView(el) {
            var scrollTop = $(window).scrollTop(),
                winHeight = $(window).height(),
                offsetParent = el.offsetParent,
                offsetTop = offsetParent.offsetTop;

            // 遍历计算距离body顶部高度
            while(offsetParent = offsetParent.offsetParent) {
                offsetTop += offsetParent.offsetTop;
            }

            return offsetTop - winHeight - scrollTop < offset;
        }

        // 加载图片
        function pollImages() {
            for(var i=list.length; i>=0; i--) {
                var self = list[i];

                if(!isDeal(self) && inView(self)) {
                
                    // 修改正确的图片路径
                    $(self).attr({
                        src: $(self).attr('data-src')
                    });

                    // 渐现特效
                    $(self).on('load', function () {
                        $(this).hide().fadeIn();
                    });

                    // 将已经已加载完毕的元素删除
                    list.splice(i, 1);
                }
            }
        }
        // 首次请求
        pollImages();

        // 滚动监听
        $(window).on('scroll', pollImages);
    }
})(jQuery);
