//(function dragFilm(){
//	var box = document.getElementById("film-list-wrapper");
//		ul = box.getElementsByTagName("ul")[0],
//		ulWidth = ul.getElementsByTagName("li").length*0.63 + 0.1 +'rem';
//		ul.style.width = ulWidth;
//		drag(box,ul.offsetWidth);
//})();
function drag(box,maxW,boxClass){
	var mBox = new Hammer(box);
	var left = 0,num = 0,maxOld = 0;;
	mBox.startX = 0;
	mBox.maxW = maxW;
	mBox.maxW = maxW - document.documentElement.clientWidth;
	var args = arguments.length;
	function transform(num,left){
		var num = left + num
		box.style.webkitTransform = "translate3d("+num+"px,0,0)";
	}
	mBox.on("panstart", function(e) {
		if(args===3){
			box.className = boxClass;
		}
		else{
			box.className = '';
		}
	});	
	mBox.on("panmove", function(e) {
	    if(mBox.maxW>0){
	    	num = e.deltaX;
	    	transform(num,left);	    	
	    }     
	});
	mBox.on("panend", function(e) {
		if(args===3){
			box.className = boxClass + " transition";
		}
		else if(args===2){
			box.className = "transition";
		}
	    left += e.deltaX;
	    if(left>0){
	    	transform(0,0);
	    	left = 0;
	    }
	    else if(left<-mBox.maxW && mBox.maxW > 0){
	    	transform(0,-mBox.maxW);
	    	left = -mBox.maxW;
	    }	    
	});
	window.addEventListener("resize",function(){	
		mBox.maxW = maxW - document.documentElement.clientWidth;
		if(left <= -mBox.maxW && mBox.maxW>0){
			transform(0,-mBox.maxW);
			left = -mBox.maxW;
		}
		else if(mBox.maxW<0){
			transform(0,0);
			left= 0;
		}		
	});
};

//请求本地日期json数据
(function showDate(){
	$.ajax({
		type:"get",
		url:"showlist.json",
		async:true,
		success: function(result){
			var filmWrapper = $(".film-date-wrapper");
			for(i=0;i<result.data.length;i++){
				var res = result.data[i].showdate;
				var date = new Date(res*1000).format("M月d日");
				var span = $('<span>'+date+'</span>');
				if(i === 0){
					span.addClass("dateChosen");
				}
				filmWrapper.append(span);
			}
			dateChoose();
			
//			var date = new Date(showdate*1000).format("M月d日"); //format方法中的参数可以根据自己想要的方式输入，可以是format("M月d日")或者format("yyyy-MM-dd HH:mm:ss")，其中格式中的字母要与format方法中的字母对应
		}
	});	
})();

//格式化日期时间
Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"H+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	};
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	}
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		}
	}
	return format;
};
(function filmChoose(){
	$('.film-list li').tap(function(){
		$('.film-list li').removeClass('filmChosen');
		$(this).addClass('filmChosen');
	})
})();
function dateChoose(){
	var dateWidth = $('.film-date-wrapper span').length + 'rem';
	$('.film-date-wrapper')[0].style.width = dateWidth;
	drag($('.film-date-wrapper')[0],$('.film-date-wrapper')[0].offsetWidth,"film-date-wrapper");
	$('.film-date-wrapper span').tap(function(){
		$('.film-date-wrapper span').removeClass('dateChosen');
		$(this).addClass('dateChosen');
		$(".sun-show").eq($(this).index()).addClass("active").siblings().removeClass('active');
	})
};

//影院信息列表与切换
