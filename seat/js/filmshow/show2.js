template.config('openTag','<#');
template.config('closeTag', '#>');
$(function(){
	historyRec.replaceView({'viewId':'showWraper'},"","");
	//查询指定影片场次处理
	var filmId = getParam("filmid");
	if(filmId){
		queryShowData.filmId = filmId;
	}
	if(scopeCinemaId&&scopeCinemaName&&scopeCityName&&scopeCityId){
		queryShowData.cinemaId  = scopeCinemaId;
		queryShowData.cinemaName = scopeCinemaName;
		showCinemaOpts.cityId = scopeCityId;
		showCinemaOpts.cityName = scopeCityName;
	}else{
		var lastCinemaId  = window.localStorage.lastCinemaId;		//上次访问影院id
		var lastCinemaName  = window.localStorage.lastCinemaName; 	//上次访问影院名称
		var lastCityId  = window.localStorage.lastCityId;			//上次访问城市id
		var lastCityName  = window.localStorage.lastCityName;		//上次访问城市名称
		if(lastCinemaId && lastCinemaId!='null'){
			queryShowData.cinemaId  = lastCinemaId;
		}
		if(lastCinemaName && lastCinemaName!='null'){
			queryShowData.cinemaName = lastCinemaName;
		}
		if(lastCityId && lastCityId!='null'){
			showCinemaOpts.cityId = lastCityId;
		}
		if(lastCityName && lastCityName!='null'){
			showCinemaOpts.cityName = lastCityName;
		}
	}
	fastView.initFilmShowHeader();
});
/*window.onload = function(){
	historyRec.replaceView({'viewId':'showWraper'},"","");
	//查询指定影片场次处理
	var filmId = getParam("filmid");
	if(filmId){
		queryShowData.filmId = filmId;
	}
	var lastCinemaId  = window.localStorage.lastCinemaId;		//上次访问影院id
	var lastCinemaName  = window.localStorage.lastCinemaName; 	//上次访问影院名称
	var lastCityId  = window.localStorage.lastCityId;			//上次访问城市id
	var lastCityName  = window.localStorage.lastCityName;		//上次访问城市名称
	if(lastCinemaId && lastCinemaId!='null'){
		queryShowData.cinemaId  = lastCinemaId;
	}
	if(lastCinemaName && lastCinemaName!='null'){
		queryShowData.cinemaName = lastCinemaName;
	}
	if(lastCityId && lastCityId!='null'){
		showCinemaOpts.cityId = lastCityId;
	}
	if(lastCityName && lastCityName!='null'){
		showCinemaOpts.cityName = lastCityName;
	}
	fastView.initFilmShowHeader();
};*/
var fastView = (function(exports){
  	//日期按钮事件绑定
    function bindShowDateEvent(){
    	$("#showDateBtnBox").bind("click",function(e){
    		var tt=e.target;
    		if($(tt).is("a")){
    			getFilmShowByDate($(tt));
    		}
    	});
    }
    //影片放映头部处理
    function initFilmShowHeader(){
//  	$("#heaCinemaName").text(queryShowData.cinemaName);
    	updateFilmsession();
    	getLocationInSl();
    }
    function updateFilmsession(){
    	var showDateBtnBox=$("#showDateBtnBox");
    	showDateBtnBox.html("");
    	var params={};
    	params.cinemaid=queryShowData.cinemaId;
    	params.filmid=queryShowData.filmId;
    	$.ajax({
//	        url:path+"/info/filmsession.do",
			url: "showlist.json",
//	        data:params,
	        dataType:'json',
	        success:function(result) {
				if(result && result.status==0&&result.data.length>0){
					//获取日期成功,且长度大于0
					for(var i=0;i<result.data.length;i++){
						var databtn=$('<a data-date="" data-index="" class="btn t4 prl2 fzs"></a>');
		    			var showdate=result.data[i].showdate;
		    			var date=new Date(showdate*1000);
		    			databtn.attr("data-date",showdate);
		    			databtn.attr("data-index",i);
		    			databtn.text(result.data[i].name + date.format("M月d日"));
		    			if(i===0){
		    				databtn.addClass("current");
		    			}
		    			if(i==result.data.length-1){
		    				databtn.addClass("last");
		    			}
		    			databtn.appendTo(showDateBtnBox);
					}
				}else{
					//默认今天
					var dateToday = new Date(); //今天
		    		var showdate=getDateYYYYMMDD(dateToday);
		    		queryShowData.showDate=showdate;
		        	var databtn=$('<a data-date="" data-index="0" class="btn t4 prl2 fzs"></a>');
		        	databtn.attr("data-date",showdate);
					databtn.attr("data-index","0");
					databtn.text("今日" + dateToday.format("M月d日"));
		        	databtn.addClass("last");
		        	databtn.appendTo(showDateBtnBox);
				}
				bindShowDateEvent();
				//显示排期
				if(queryShowData.cinemaId!=null&&queryShowData.cinemaId!=""){
		    		getFilmShowByDate($('#showDateBtnBox a').first());
		    	}
	        },
	        error:function(){
	        	//默认今天
	        	var dateToday = new Date(); //今天
	    		var showdate=getDateYYYYMMDD(dateToday);
	    		queryShowData.showDate=showdate;
	        	var databtn=$('<a data-date="" data-index="0" class="btn t4 prl2 fzs"></a>');
	        	databtn.attr("data-date",showdate);
				databtn.attr("data-index","0");
				databtn.text("今日" + dateToday.format("M月d日"));
	        	databtn.addClass("last");
	        	databtn.appendTo(showDateBtnBox);
	        	bindShowDateEvent();
	        	//显示排期
	        	getFilmShowByDate($('#showDateBtnBox a').first());
	        	/*if(queryShowData.cinemaId!=null&&queryShowData.cinemaId!=""){
		    		getFilmShowByDate($('#showDateBtnBox a').first());
		    	}*/
	        }
	    }); 
    }
    //根据影院获取影片排期
    function getFilmShowByCinema(cinemaId,cinemaName,cinemaAdd,cityId,cityName,locCityId,locCityName){
    	window.history.back(-1);
    	console.log(cinemaAdd);
    	if(locCityId && locCityId!=queryShowData.locCityId){
        	showCinemaOpts.locCityId = locCityId;
        	showCinemaOpts.locCityName = locCityName;
    	}
    	if(cinemaId && cinemaId!=queryShowData.cinemaId){
        	$(".cinema_name").text(cinemaName);
        	$(".cinema_address").text(cinemaAdd);
        	queryShowData.cinemaId = cinemaId;
        	queryShowData.cinemaName = cinemaName;
        	showCinemaOpts.cityId = cityId;
        	showCinemaOpts.cityName = cityName;
        	updateFilmsession();
        	//getFilmShow(queryShowData);
        }else{
        	accordion(queryShowData.showDateBox);
        }
    	//bindShowDateEvent();
    }
    //根据日期获取影片排期
    function getFilmShowByDate(target){
    	$('#showDateBtnBox a').removeClass("current");
    	$(target).addClass("current");
     	var index = $(target).attr("data-index");         
		queryShowData.index=index;
		queryShowData.showDate = $(target).attr("data-date");
    	$(".show_list_box").hide();
    	if(index==0){ 
    		queryShowData.showDateBox="todayFilmShowBox";
    		$("#todayFilmShowBox").show();
    	}else{
    		queryShowData.showDateBox="tomorrowFilmShowBox";
    		$("#tomorrowFilmShowBox").show();
    	}
    	
//  	getFilmShow(queryShowData);
	}
  	//获取影片排期
    function getFilmShow(queryShowData){
    	if(queryShowData.index===0){
    		document.getElementById('todayFilmShowBox').innerHTML="";
    	}else{
    		document.getElementById('tomorrowFilmShowBox').innerHTML = "";
    	}
    	var url = path+"/filmfast/showlist.do?filmid="+queryShowData.filmId+
    									"&cinemaid="+queryShowData.cinemaId+
    									"&showdate="+queryShowData.showDate+
    									"&start="+queryShowData.start+
    									"&num="+queryShowData.num;
//		var url = "showlistdo.json";
    	$('#'+queryShowData.showDateBox).html("");
    	$('#'+queryShowData.showDateBox).load(url,null,
    			function(response){
//					accordion(queryShowData.showDateBox);
				}
    	);

    	window.localStorage.lastCinemaId=queryShowData.cinemaId;
    	window.localStorage.lastCinemaName=queryShowData.cinemaName;
    	window.localStorage.lastCityId=showCinemaOpts.cityId;
    	window.localStorage.lastCityName=showCinemaOpts.cityName;
     	
    }
    //点击影院名称查询影院列表方法
    function showCinemaListBySl(){
    	cinemaListView.init(showCinemaOpts,path);
    }
    function chooseShow(showId,filmId,availablechannel,availableseatcnt,starttime){
    	var timeStart = new Date(starttime*1000);//影片开始时间
    	var timeNow = new Date();//当前时间
// 	        	if(timeStart<timeNow){
// 	        		alert("抱歉，该场次已放映！");
// 	        		return false;
// 	        	}
    	if(availablechannel==0){
    		alert("抱歉，该场次不支持网购！");
    		return false;
    	}
    	if(availableseatcnt==0){
    		alert("抱歉，该场次影票已售罄！");
    		return false;
    	}
    	//点击所选的场次跳转到选座页面
    	window.location = path+"/seat/选座.html?cinemaid="+queryShowData.cinemaId+"&showid="+showId+"&filmid="+filmId+"&showdate="+queryShowData.showDate+"&sectionid=01";
    }
    
  	//获取定位
    function getLocationInSl(){
    	//updateLocation();
       	if (navigator.geolocation) {
       	    navigator.geolocation.getCurrentPosition(updateLocation, locationError,{
       	        // 指示浏览器获取高精度的位置，默认为false
       	        enableHighAcuracy: true,
       	        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
       	        timeout: 5000
       	    });
       	}	
    }
    //定位成功后回调方法
    function updateLocation(position){
    	 $.ajax({
    	        url:path+"/util/nearestcinema.do",
    	        data:{
       	        	lon:position.coords.longitude,
       	        	lat:position.coords.latitude
//         	        	lon:"116.46881103515625",
//         	        	lat:"39.91684625681369"
    	        },
    	        dataType:'json',
    	        success:function(result) {
					if(result && result.status==0){
						var locId = result.cinema.city.cid;
						var locName = result.cinema.city.name;
						showCinemaOpts.locCityId = locId;
        	        	showCinemaOpts.locCityName = locName;
        	        	if(locId!=showCinemaOpts.cityId){
							if(confirm("当前定位城市为"+locName+"，是否切换")){
								$("#heaCinemaName").text(result.cinema.appshortname);
					        	queryShowData.cinemaId = result.cinema.cid;
					        	queryShowData.cinemaName = result.cinema.appshortname;
					        	showCinemaOpts.cityId = locId;
					        	showCinemaOpts.cityName = locName;
//					        	getFilmShow(queryShowData);
							}else{
								return false;;
							}
						}
					}else{
						alert("抱歉，定位处理失败！");
					}
    	        },
    	        error:function(){

    	        }
    	    }); 
    }
    function locationError(){
    	
    }
    exports.initFilmShowHeader = initFilmShowHeader; 
    exports.getFilmShowByCinema = getFilmShowByCinema;
    exports.getFilmShowByDate = getFilmShowByDate;
//  exports.getFilmShow = getFilmShow;
    //exports.initFilmShowList = initFilmShowList;
    //exports.getFilmShowListHtml = getFilmShowListHtml;
    exports.showCinemaListBySl = showCinemaListBySl;
    exports.chooseShow = chooseShow;
    exports.getLocationInSl = getLocationInSl;
    return exports;
})(fastView||{});

//手风琴样式处理
function accordion(elId){
	var accHeader = document.getElementById(elId).querySelectorAll(".accordion_header"); //手风琴头部元素
	var accSign = document.getElementById(elId).querySelectorAll(".acc_sign"); 
    for(var i=0;i<accHeader.length;i++){
		accHeader[i].addEventListener("click",toggleAcc,false);
	}
	//第一个手风琴内容元素展开
	if(accHeader.length>0){
		document.getElementById(elId).querySelectorAll(".accordion_content")[0].style.display="block";
    	$(accSign[0]).removeClass("i006");
		$(accSign[0]).addClass("i007");
	}
    function toggleAcc(){
		var currIndex = 0;
		for(var i=0;i<accHeader.length;i++){
			if(accHeader[i].nextElementSibling!=this.nextElementSibling){
				accHeader[i].nextElementSibling.style.display="none";
				$(accSign[i]).removeClass("i007");
    			$(accSign[i]).addClass("i006");
			}else{
				currIndex = i;
			}
    	}
		var accContentNode = this.nextElementSibling;
		
		if(accContentNode.style.display!="block"){
			accContentNode.style.display="block";
			$(accSign[currIndex]).removeClass("i006");
			$(accSign[currIndex]).addClass("i007");
		}else{
			accContentNode.style.display="none";
			$(accSign[currIndex]).removeClass("i007");
			$(accSign[currIndex]).addClass("i006");
		}
	}
}