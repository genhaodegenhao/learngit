

<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
<meta content="yes" name="apple-mobile-web-app-capable"/>
<meta content="black" name="apple-mobile-web-app-status-bar-style"/>
<meta content="telephone=no,address=no" name="format-detection"/>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<title>座位图</title>
<link rel="stylesheet" type="text/css" href="/css/global.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css">
<link rel="stylesheet" type="text/css" href="/css/ui.css" />
<script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/iscroll-zoom-seat.js"></script>
<script type="text/javascript" src="/js/fn.js"></script>
<script type="text/javascript" src="/js/json2.js"></script>
<script type="text/javascript" src="/js/jquery.ui.base.js"></script>
<script type="text/javascript" src="/js/jquery.ui.mask.js"></script>
<script type="text/javascript" src="/js/jquery.ui.confirm.js"></script>
<script type="text/javascript" src="/js/jquery.ui.floatingHint.js"></script>
<script type="text/javascript" src="/js/jquery.ui.seat.js?v=1"></script>
<style type="text/css">
	.legend span.aodi-ad,.aodi-ad,.legend span.aodiseat{
		display:none;
	}
	.activitySeatBox{
		display:block;
		height:12px;
		position:relative;
	}
	.activitySeatTag{
		display:block;
		position: absolute;
		left:0;bottom:0;width:100%;
	}
</style>
</head>
<body>
<div class="header pprl3 ptb8" align="center">
	<a href="javascript:history.back(-1);" class="fl icon24 i400"></a>
	<span class="title ml30">购票</span>
</div>
<div>
	<div class="tbar center" id="filmshowbar">
		<table class="grid">
			<tr>
				<td width="20">
					<a href="javascript:void(0);" id="prevShow" class="none"><span class="icon24 i013"></span></a>
				</td>
				<td>
					<div class="center"><span class="ml6 fzxxl" id="filmname">&nbsp;</span><span id="dimen"></span></div>
					<div class="center"><span class="fzs" id="filmtime"></span><span class="fzs">&nbsp;/&nbsp;</span><span class="fzs" id="hallname">&nbsp;</span></div>
				</td>
				<td width="20">
					<a href="javascript:void(0);" id="nextShow" class="none"><span class="icon24 i012"></span></a>
				</td>
			</tr>
		</table> 
	</div>
	<div class="center legend pt6" id="seatlegendbar">
		<span class="icon24 i111"></span><span class="">可选</span>
		<span class="icon24 i311 ml4"></span><span class="">已选</span>
		<span class="icon24 i011 ml4"></span><span class="">已售</span>
		<span class="icon24 aodiseat ml4"></span><span class="aodi-ad">奥迪幸运坐席</span>
	</div>
	<div class="pprl10 pt6" id="seatyinmubar"><div class="center yinmu"><span class="caption prl10">银幕方向</span></div></div>
	<div class="pprl4 ptb6 aodi-ad">
		<img src="/images/yiqidazhong-seat-logo.png" style="display:inline-block;width:30%;" class="fl"/>
		<img src="/images/aodi-seat-logo.png" style="display:inline-block;width:30%;"  class="fr"/>
		<div class="clear"></div>
	</div>
	<div id="seat"></div>
	<div class="selectedSeats pprl3 mt10" id="selectedSeats">
		<ul id="selectedLs">
			<li><div class="pr8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
			<li><div class="prl8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
			<li><div class="pl8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
			<li><div class="pr8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
			<li><div class="prl8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
			<li><div class="pl8 pt2"><div class="activitySeatBox"></div><span class="btn seat block"><span class="txt">待选座位</span><span class="close fr"><span class="icon16 i217"></span></span></span></div></li>
		</ul>
		<div class="clear"></div>
	</div>
	<div class="pprl3 ptb10 mt8" id="tobuybar">
		<span class="btn buy block corner-5 fzxl" id="tobuy">即刻购买</span>
	</div>
</div>
<script type="text/javascript">
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
					$(".aodi-ad").show();
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
				updateShowBar();
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
    	        url:path+"/info/filmshow.do",
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
		$("#seat").seat({url:path+"/filmseat/synseat.do"},seatparams);
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
</script>
</body>
</html>
