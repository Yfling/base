;(function ($) {
  var Tab = function (tab) {
    var that = this;
    // 保存单个tab组件
    this.tab = tab;
    this.config = {
      // 用来定义鼠标的触发类型，是click还是mouseover
      "triggerType": "mouseover",
      // 用来定义内容切换效果，是直接切换还是淡入淡出
      "effect": "default",
      // 默认展示第几个tab
      "invoke": 1,
      // 用来定义tab是否自动切换,当指定了时间间隔,就表示自动切换，并且挨饿换时间为指定时间间隔
      "auto": false
    };
    // 如果配置参数存在，就扩展默认的配置参数
    if (this.getConfig()) {
      $.extend(this.config, this.getConfig());
    };

    // 保存tab标签列表.对应的内容列表
    this.tabItems = this.tab.find('ul.tab-nav li');
    this.contentItems = this.tab.find('div.content-wrap div.content-item');


    // 保存配置参数
    var config = this.config;

    if (config.triggerType === "click") {
      this.tabItems.bind(config.triggerType, function () {
        that.invoke($(this));
      });
    }
    else if (config.triggerType === "mouseover" || config.triggerType !== "click") {
      this.tabItems.mouseover(function () {
        that.invoke($(this))
      })
    }

  };

  Tab.prototype = {
    // 事件驱动函数
    invoke: function (currentTab) {
       var that = this;
       /**
        *要执行Tab的选中状态，当前选中的加上actived（标记为白底）
        *切换对应的tab内容，要根据配置参数的effect是default还是false
        **/
        var index = currentTab.index();
        // tab选中状态
        currentTab.addClass("actived").siblings().removeClass("actived");
        // 切换对应的内容区域
        var effect = this.config.effect;
        var conItems = this.contentItems;

        if (effect === "default" || effect !== "fade") {
          console.log('haha')
          conItems.eq(index).addClass("current").siblings().removeClass("current");
        }
        else if (effect === "fade") {
          console.log('fade')
          conItems.eq(index).fadeIn().siblings().fadeOut();
        }
    },
    // 获取配置参数
    getConfig: function () {
      // 拿一下tab elem节点上的data-config
      var config = this.tab.attr("data-config");
      // 确保有配置参数
      if (config && config !== "") {
        return $.parseJSON(config);
      }
      else {
        return null;
      }
    }
  };

  window.Tab = Tab;
})(jQuery);
