
window.onload=function(){
	//页面搜索
	search();
	//banner图
	banner();
	//时钟
	downTime();





};
//页面搜索
var search = function(){
	/*1.默认页面透明度为0
	  2.当页面滚动时 透明度增加
	*/
	var searchBox = document.querySelector('.jd_search_box');
	var banner = document.querySelector('.jd_banner');
	var height = banner.offsetHeight;
	//监听页面滚动事件，
	window.onscroll = function () {
		//获取页面滚动高度
		var scrollTop = document.documentElement.scrollTop;
		var opacity = 0;
		if ( height > scrollTop ) {
			opacity = (scrollTop / height) *0.85;
		}else {
			opacity = 0.85;
		}
		searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
	}
	

};
//banner图
var banner = function(){
	/*自动轮播图且无缝  定时器 过渡
	点要随着轮播改变 根据索引切换
	滑动效果  根据touch事件完成
	滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡
    滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡
	*/
	//轮播图
	var banner = document.querySelector('.jd_banner');
	//屏幕宽度
	var width = banner.offsetWidth;
	//图片容器
	var imageBox = banner.querySelector('ul:first-child');
	//点盒子
	var pointBox = banner.querySelector('ul:last-child');
	//所有的点
	var points = pointBox.querySelectorAll('li');
	//过渡事件
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
	//程序的核心
	var index = 1;
	var timer = setInterval(function(){
		index++;
		//添加过渡
		addTransition();
		setTranslateX( -index*width );

	},3000);

	//无缝滚动
	imageBox.addEventListener('transitionend', function (){
		if( index >= 9 ){
			index = 1;
			//清除过渡
			removeTransition();
			//做位移
			setTranslateX( -index*width );

		}else if( index <= 0 ){
			index = 8;
			//清除过渡
			removeTransition();
			//做位移
			setTranslateX( -index*width );	
		}
		//根据索引设置点
		setPoint();
	});
	//设置点
	var setPoint = function(){
		//清除样式
		for ( var i=0; i < points.length; i++ ) {
			var obj = points[i];
			obj.classList.remove('now');
		}
		//给对应的加上样式
		points[index-1].classList.add('now');
	}
	//触摸事件
	var startX = 0;
	var distanceX = 0;
	var isMove = false;
	imageBox.addEventListener('touchstart',function(e){
		//清除定时器
		clearInterval(timer);
		//记录触摸时的x位置的值
		startX = e.touches[0].clientX;
		
	});
	imageBox.addEventListener('touchmove',function(e){
		//记录移动的距离
		var moveX = e.touches[0].clientX;
		//计算位移  
		distanceX = moveX - startX;
		var translateX = -index*width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslateX(translateX);
        isMove = true;

	});
	imageBox.addEventListener('touchend',function(){
		//图片上一张  下一张移动
		if( isMove ){
			if( Math.abs( distanceX ) < width /3 ){
				//吸附
                addTransition();
                setTranslateX(-index * width);
			}else{
				if(distanceX > 0){
					index--;
				}else{
					index++;
				}
	            /*根据index去动画的移动*/
                addTransition();
                setTranslateX(-index * width);
			}
		}
		//做好最后一次参数的重置
		startX = 0;
		distanceX = 0;
		//加上定时器
		clearInterval(timer);
		timer = setInterval(function(){
			index++;
			addTransition();
			setTranslateX(-index*width);
		},3000)

	})

};
//时钟
var downTime = function(){
	//设置改变时间
	var time = 4*60*60;
	//拿到时间盒子
	var spans = document.querySelectorAll('.time span');
	//时间定时器
	var timer = setInterval(function(){
		time--;
			//拿到具体的时间
		var h = Math.floor(time/3600);
		var m = Math.floor(time%3600/60);
		var s = Math.floor(time%60);

	    spans[0].innerHTML = Math.floor(h/10);
	    spans[1].innerHTML = h%10;
	    spans[3].innerHTML = Math.floor(m/10);
	    spans[4].innerHTML = m%10;
	    spans[6].innerHTML = Math.floor(s/10);
	    spans[7].innerHTML = s%10;

	    if(time<=0){
	    	clearInterval(time);
	    }

	},1000)


};

