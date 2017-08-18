var path="";
var filmid="";
var show={};
var showid="";
var cinemaid="";
var sectionid="";
var showdate="";
var showls=[];
var activity=0;
var sex="";
var currentShowIndex=0;
var sessionid="";
var uid="";
var clientid="";
var clienttype="";
function updateSelectedSeat(target,a){
	var ls=$("#selectedLs");
	$(".seat",ls).removeClass("selected").removeClass("unselected");
	$(".seat .txt",ls).text("待选座位");
	$(".activitySeatBox").html("");
	for(var i=0;i<a.length;i++){
		var li=$("li:eq("+i+")",ls);
		var seat=$(".seat",li);
		var activitySeatBox=$(".activitySeatBox",li);
		seat.addClass("selected");
		if(a[i].activityseat){
			var astag=$('<img src="" class="activitySeatTag"/>');
			astag.attr("src",path+"/images/aodi-selected.png");
			astag.appendTo(activitySeatBox);
		}else{
			activitySeatBox.html("");
		}
		$(".txt",seat).text(a[i].seat.rowname+"排"+a[i].seat.colname+"座");
	}
}
function updateShow(){
	if(show && show.filmname){
		showid=show.sid;
		$("#filmname").text(show.filmname);
		$("#dimen").html("&nbsp;"+show.dimen);
		$("#hallname").text(show.hall.appshortname);
		$("#filmtime").text(new Date(show.starttime*1000).format("yyyy.MM.dd hh:mm"));
	}
}	
$(function(){
	filmid=getParam("filmid");
	showid=getParam("showid");
	cinemaid=getParam("cinemaid");
	sectionid=getParam("sectionid");
	showdate=getParam("showdate");
	activity=getParam("activity");
	sex=getParam("sex");
	clientid=getParam("clientid");
	clienttype=getParam("clienttype");
	if(empty(uid)){
		sessionid=getParam("sessionid");
		uid=getParam("uid");
	}
	if(uid == '0' || uid === 0){
		uid = '';
	}
	show.sid=showid;
	$.fn.seat.defaults.onSeatSelected=function(target,data){
		var seats=$(target).seat("getSelected");
		updateSelectedSeat(target,seats);
	};
	$.fn.seat.defaults.onSeatUnselected=function(target,data){
		var seats=$(target).seat("getSelected");
		updateSelectedSeat(target,seats);
	};
	$.fn.seat.defaults.onLoadDataComplet=function(target,data){
		if(data && data.show){
			$("#filmshowbar").show();
			$("#seatlegendbar").show();
			$("#seatyinmubar").show();
			$("#selectedSeats").show();
			$("#tobuybar").show();
			show=data.show;
			updateShow();
			if(data.activitydata && data.activitydata.length>0){
				//显示活动元素
				$(".aodiseat").css("display","inline-block");
			}
			
			var seats=$(target).seat("getSelected");
			//判断选中座位
			updateSelectedSeat(target,seats);
		}else{
			$("#filmshowbar").hide();
			$("#seatlegendbar").hide();
			$("#seatyinmubar").hide();
			$("#selectedSeats").hide();
			$("#tobuybar").hide();
		}
	};
	function nextShow(){
		if(currentShowIndex<showls.length-1){
			//show=showls[currentShowIndex+1].show;	
			currentShowIndex=currentShowIndex+1;
			reloadSeats(showls[currentShowIndex].show);
			//updateShowBar();
		}
	}
	function prevShow(){
		if(currentShowIndex>0){
			//show=showls[currentShowIndex-1].show;
			currentShowIndex=currentShowIndex-1;
			reloadSeats(showls[currentShowIndex].show);
			updateShowBar();
		}
	}
	function updateShowBar(){
		if(showls.length>1){
			if(currentShowIndex===0){
				//第一个
				$("#prevShow").hide();
				$("#nextShow").show();
			}else if(currentShowIndex<showls.length-1){
				//有上一场和下一场
				$("#prevShow").show();
				$("#nextShow").show();
			}else{
				//最后一场
				$("#prevShow").show();
				$("#nextShow").hide();
			}
		}else{
			//有一场
			$("#prevShow").hide();
			$("#nextShow").hide();
		}
		updateShow();
	}
	function updateShowList(){
		var ls=[];
		//去除不可买票场次
		for(var i=0;i<showls.length;i++){
			if(showls[i].show.availablechannel==1){
				ls.push(showls[i]);
			}
		}
		showls=ls;
		for(var i=0;i<showls.length;i++){
			if(showls[i].show.sid==showid){
				show=showls[i].show;
				currentShowIndex=i;
			}
		}
		updateShowBar();
	}
	function loadFilmShow(param){
		$.ajax({
//		    	        url:path+"/info/filmshow.do",
			url: 'showId.json',
	        data:param,
	        dataType:'json',
	        success:function(result) {
	        	if(result && result.status===0){
	        		showls=result.data;
	        		updateShowList();
	        	}else{
	        		if(result){
						$.Confirm({"html":result.msg,"buttons":{"确定":function(){}}});
					}else{
						$.Confirm({"html":"抱歉，系统故障!","buttons":{"确定":function(){}}});
					}
	        	}
	        },
	        error:function(){
	        	$.Confirm({"html":"抱歉，系统故障或无网络!","buttons":{"确定":function(){}}});
	        }
	    });
	}
	function reloadSeats(show){
		$("#seat").seat("reload",{"showid":show.sid,"sectionid":sectionid});
	}
	var seatparams={"showid":showid,"sectionid":sectionid};
	if(activity>0){
		seatparams.activity=activity;
		seatparams.cinemaid=cinemaid;
		seatparams.uid=uid;
		seatparams.sessionid=sessionid;
		if(sex!="" && sex!=null && sex != undefined){
			seatparams.sex=sex;
		}
	}
	
//				$("#seat").seat({url:path+"/filmseat/synseat.do"},seatparams);
	$("#seat").seat({url:"data1.json"},seatparams);
	
	$("#selectedLs .seat").click(function(){
		if($(this).is(".selected")){
			var seats=$("#seat").seat("getSelected");
			var currnetli=$(this).closest("li");
			var index=currnetli.index();
			$("#seat").seat("unselectSeat",seats[index]);
		}
	});
	//加载放映场次列表
	var showParam={
		"filmid":filmid,
		"cinemaid":cinemaid,
		"showdate":showdate,
		"start":0,
		"num":20
	};
	if(activity!=1){
		loadFilmShow(showParam);
	}
	$("#tobuy").click(function(){
		var seats=$("#seat").seat("getSelected");
		var param={};
		if(seats.length>0){
			param.showid=showid;
			param.cinemaid=cinemaid;
			param.sectionid="01";
			param.show=JSON.stringify(show);
			var array=[];
			for(var i=0;i<seats.length;i++){
				array.push(seats[i].seat);
			}
			param.seat=JSON.stringify(array);
			var url=path+"/cinema/product.do?sectionid=01&showid="+showid+"&cinemaid="+cinemaid+"&show="+JSON.stringify(show)+"&seat="+JSON.stringify(array);
			if(clientid != "" && clienttype != ""){
				url = url + "&clientid=" + clientid + "&clienttype=" + clienttype;
			}
			window.location.href=url;
		}else{
			$.Confirm({"html":"您还没选择座位！","buttons":{"确定":function(){}}});
		}
	});
	$("#nextShow").bind("click",function(){
		nextShow();
	});
	$("#prevShow").bind("click",function(){
		prevShow();
	});
});