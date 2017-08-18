var CINEMA_IMAGE_SERVER_NAME = "http://images.wandafilm.com/uploadServer/";
var IMAGESERVERPATH="http://images.wandafilm.com/uploadServer/";
var SERVERPATH="http://wdapi.wandafilm.com/filmserver";
CINEMA_IMAGE_SERVER_NAME = "http://10.199.202.23:20010/uploadServer/";
IMAGESERVERPATH="http://10.199.202.23:20010/uploadServer/";
//SERVERPATH="http://10.199.202.23:8080/filmserver";
SERVERPATH="http://wdapi.wandafilm.com/filmserver";
var browser={
	versions:function(){
		var u = navigator.userAgent.toLowerCase(),app = navigator.appVersion;
		return {         //移动终端浏览器版本信息
			trident: u.indexOf('trident') > -1, //IE内核
			presto: u.indexOf('tresto') > -1, //opera内核
			webKit: u.indexOf('applewebkit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') == -1, //火狐内核
			mobile: !!u.match(/.*mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
			android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iphone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('ipad') > -1, //是否iPad
			webApp: u.indexOf('safari') == -1, //是否web应该程序，没有头部与底部
			microMessenger: u.match(/micromessenger/i)=="micromessenger"
		};
	 }(),
	 language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
function getBodyWidth(){
	if(browser.versions.gecko){
		return window.screen.width;
	}else{
		return document.documentElement.clientWidth;
	}
}
/*获取URL参数列表*/
function getRequestParams(){
	var url = String(window.location);
	if (url.indexOf('?')>0) {
		return url.substring(url.indexOf("?")-0+1);
	}
	return "";
}
/*获取Url参数值，*/
function getRequestParam(key){
	var params=getParams();
	if(params && params!=null){
		var args=params.split("&");
		for(var i=0;i< args.length;i++){
			var param=args[i].split("=");
			if(param[0] == key){
				return param[1];
			}
		}
		return "";
	}
}
function getParams() {
	var url =String(window.location);
	if (url.indexOf('?')>0) {
		return url.substring(url.indexOf("?")-0+1);
	}
	return "";
}
function getParam(key){
	var params=getParams();
	if(params && params!=null){
		var args=params.split("&");
		for(var i=0;i< args.length;i++){
			var param=args[i].split("=");
			if(param[0] == key){
				return param[1];
			}
		}
		return "";
	}
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
    	var temp=unescape(arr[2]);
    	if(temp=='""'){
    		temp=null;
    	}
		return temp;
	}
	return null;
}
/**
 * 设置Cookie
 * name value,
 * expires 过期毫秒数，0不过期
 * */
function addCookie(name,value,expires){
	var cookieString=name+"="+escape(value);
	if(expires>0){
		var date=new Date();
		date.setTime(date.getTime+expires);
		cookieString=cookieString+"; expires="+date.toGMTString();
	}
	document.cookie=cookieString;
}
/*	格式化时间格式，用于评论时间，以分钟为单位的时间
 * 	param format
 * 		yyyy-MM-dd hh:mm:ss
 * 		YYYY年MM月dd日hh小时mm分ss秒
 * 		yyyy年MM月dd日
 * 		MM/dd/yyyy
 * 		yyyyMMdd
 * 		yyyy-MM-dd hh:mm:ss
 * 		yyyy.MM.dd hh:mm
 * 
 * */
Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
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
//获取用户真实IP 
function get_client_ip() { 
	var $ip="";
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")){
    	$ip = getenv("HTTP_CLIENT_IP"); 
    }else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"),"unknown")){
    	$ip = getenv("HTTP_X_FORWARDED_FOR"); 
    }else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")){
    	$ip = getenv("REMOTE_ADDR");
    }else if (isset ($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) {
    	$ip = $_SERVER['REMOTE_ADDR']; 
    }else{
    	$ip = "undefined";
    } 
    return ($ip); 
} 
//获取浏览器地理定位
//enableHighAcuracy: true,指示浏览器获取高精度的位置，默认为false
//timeout: 5000指定获取地理位置的超时时间，默认不限时，单位为毫秒
function getLocation(success,error,options){
	if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(success,error,options);
	}
}
function UrlEncode(str){
	var ret="";
	var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
	var tt= "";
	for(var i=0;i<str.length;i++){
		var chr = str.charAt(i);
		var c=str2asc(chr);
		tt += chr+":"+c+"n";
	if(parseInt("0x"+c) > 0x7f){
		ret+="%"+c.slice(0,2)+"%"+c.slice(-2);
	}else{
		if(chr==" ")
			ret+="+";
		else if(strSpecial.indexOf(chr)!=-1)
			ret+="%"+c.toString(16);
		else
			ret+=chr;
		}
	}
	return ret;
}
function UrlDecode(str){
  var ret="";
  for(var i=0;i<str.length;i++){
   var chr = str.charAt(i);
    if(chr == "+"){
      ret+=" ";
    }else if(chr=="%"){
     var asc = str.substring(i+1,i+3);
     if(parseInt("0x"+asc)>0x7f){
      ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
      i+=5;
     }else{
      ret+=asc2str(parseInt("0x"+asc));
      i+=2;
     }
    }else{
      ret+= chr;
    }
  }
  return ret;
}
//去购票跳转
function buyTicket(id,name){
	if(clienttype==1||clienttype==2){
		if(id==undefined||id==""||id==null){
			window.location.href = 'wandaappcinema://HomeFilmViewController?title=万达电影';
		}else{
			window.location.href = 'wandaappcinema://FilmDetailsViewController?filmid='+ id +'&filmname='+ name;
		}
	}else{
		if(id==undefined||id==""||id==null){
			window.location.href = path+"/filmfast/fast.do";
		}else{
			if(cinemaid!=""&&cinemaid!=undefined&&cinemaid!=null){
				window.location.href = path+"/filminfo/filmshow.do?filmid="+id+"&cinemaid="+cinemaid;
			}else{
				window.location.href = path+"/filminfo/filmshow.do?filmid="+id;
			}
		}
	}
}
//跳转购票首页
function toFilmHome(jumptype){
	if(clienttype==1||clienttype==2){
		if(jumptype=="soonfilm"){
			//跳转到即将上映
			window.location.href = 'wandaappcinema://HomeFilmViewController?title=万达电影&jumptab=soonfilm';
		}else if(jumptype=="hotfilm"){
			window.location.href = 'wandaappcinema://HomeFilmViewController?title=万达电影&jumptab=hotfilm';
		}else{
			window.location.href = 'wandaappcinema://HomeFilmViewController?title=万达电影';
		}
	}else{
		window.location.href = path+"/filmfast/fast.do";
	}
}
function checkMobile(s){
	/*验证手机号 以1开始的十一位数字 */
	return (/^1[3|4|5|7|8][0-9]\d{8}$/).test(s);
}
function checkNumber(s){
	/*验证数字 以1开始的十一位数字 */
	return (/^[1-9][0-9]*$/).test(s);
}
function countLength(s){
	return s.replace(/[^\x00-\xff]/g, 'xx').length;
}
function required(s){
	if(s){
		return true;
	}
	return false;
}
function checkFrom(){
	if(clienttype && clientversion!=""){
		if(clienttype==1){
			return "IOS";
		}else if(clienttype==2){
			return "ANDROID";
		}else if(clienttype==3){
			return "WAP";
		}else{
			return "OTHER";
		}
	}else{
		return "OTHER";
	}
}

//检测是否高于3.7版本
function checkClientVersion_3_7(){
	var type=getParam("clienttype");
	var version=getParam("clientversion");
	if(type && version>0){
		//3200含以上
		if(type==1){
			//ios
			if(version>=30700){
				return true;
			}
		}else if(type==2){
			if(version>=3700){
				return true;
			}
		}
	}
	return false;
}
//检测是否高于3.5版本
function checkClientVersion_3_5(){
	var type=getParam("clienttype");
	var version=getParam("clientversion");
	if(type && version>0){
		//3200含以上
		if(type==1){
			//ios
			if(version>=30500){
				return true;
			}
		}else if(type==2){
			if(version>=3500){
				return true;
			}
		}
	}
	return false;
}
//检测是否高于3.4版本
function checkClientVersion_3_4(){
	var type=getParam("clienttype");
	var version=getParam("clientversion");
	if(type && version>0){
		//3200含以上
		if(type==1){
			//ios
			if(version>=30400){
				return true;
			}
		}else if(type==2){
			if(version>=3400){
				return true;
			}
		}
	}
	return false;
}
//检测是否高于3.3版本
function checkClientVersion_3_3(){
	var type=getParam("clienttype");
	var version=getParam("clientversion");
	if(type && version>0){
		//3200含以上
		if(type==1){
			//ios
			if(version>=30300){
				return true;
			}
		}else if(type==2){
			if(version>=3300){
				return true;
			}
		}
	}
	return false;
}
//检测是否高于3.2版本
function checkClientVersion_3_2(){
	var type=getParam("clienttype");
	var version=getParam("clientversion");
	if(type && version>0){
		//3200含以上
		if(type==1){
			//ios
			if(version>=30200){
				return true;
			}
		}else if(type==2){
			if(version>=3200){
				return true;
			}
		}
	}
	return false;
}
//检测是否高于3.1版本
function checkClientVersion_3_1(){
	var support=getParam("issupport");
	if(checkClientVersion_3_2()){
		return true;
	}else if(support && support>0){
		return true;
	}
	return false;
}
function checkSupport(){
	var support=getParam("issupport");
	if(support>=1){
		return true;
	}
	return false;
}
//检查版本是否支持
function checkVersionSupport(type,targetVersion,clientversion){
//	var support=getParam("issupport");
//	var type=getParam("clienttype");
//	var version=getParam("clientversion");	
	if(type && clientversion>0){
		//3200含以上
		if(type==1){
			//ios
			if(clientversion>=targetVersion){
				return true;
			}
		}else if(type==2){
			if(clientversion>=targetVersion){
				return true;
			}
		}
	}
//	if(checkSupport()){
//		return true;
//	}
	return false;
}

/*function getLocation(onSuccess,onError,options){
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
    		function(position){
				onSuccess(position);
				alert("success latitude:"+position.coords.latitude+" longitude:"+position.coords.longitude);
				return "北京";
			},function(err){
				
				alert("error");
				return "南京";
			},
    		{enableHighAcuracy: true,timeout: 5000}
		);
	}
}*/

function checkRealName(name){
	return name.length<20 && name.length>3;
}
function checkLetteryInfoFields(){
	var msg="";
	msg=msg+checkMobile($("#mobile").val());
	return msg;
}
function showWin(target,mask){
	if(mask){
		$("#mask").fadeIn(200);
	}
	var stop=$(window).scrollTop();
	var top=60;
	var browserHeight=$(window).height()-0;
	var height=$(target).height()-0;
	if(browserHeight > height){
		top=(browserHeight-height)/2 +stop;
	}else{
		top=stop;
	}
	$(target).css("top",top).fadeIn(300);
}
function closeWin(target,mask){
	if(mask){
		$("#mask").fadeOut(300);
	}
	$(target).fadeOut(300);
}
function sortCity(data){
	for(var i=0;i<data.length;i++){
		var tempCity = null;	
		for(var j=i+1;j<data.length;j++){
			if(data[i].city.firstletter>data[j].city.firstletter){
				tempCity = data[i];
				data[i] = data[j];
				data[j] = tempCity;
				tempCity = null;
			}
		}
	}
	return data;
}
function sortSeatByCol(data){
	for(var i=0;i<data.length;i++){
		var temp = null;
		for(var j=i+1;j<data.length;j++){
			if(data[i].seat.colindex>data[j].seat.colindex){
				temp = data[i];
				data[i] = data[j];
				data[j] = temp;
				temp = null;
			}
		}
	}
	return data;
}
function sortSeat(data){
	for(var i=0;i<data.length;i++){
		var temp = null;	
		for(var j=i+1;j<data.length;j++){
			if(data[i].seat.rowindex>data[j].seat.rowindex){
				temp = data[i];
				data[i] = data[j];
				data[j] = temp;
				temp = null;
			}
		}
	}
	return data;
}

function seatTo2D(data){
	var temp2d=[];
	var index=0;
	for(var i=0;i<data.length;i++){
		index=data[i].seat.rowindex-1;
		if(temp2d.length<index+1){
			for(var j=temp2d.length;j<index+1;j++){
				temp2d.push([]);
			}
		}
		temp2d[index].push(data[i]);
	}
	for(var i=0;i<temp2d.length;i++){
		temp2d[i]=sortSeatByCol(temp2d[i]);
	}
	return temp2d;
}
/*function sortCity(data){
	var cityList = cityObj.data;
	for(var i=0;i<cityList.length;i++){
		var tempCity = null;	
		for(var j=i+1;j<cityList.length;j++){
			if(cityList[i].city.firstletter>cityList[j].city.firstletter){
				tempCity = cityList[i];
				cityList[i] = cityList[j];
				cityList[j] = tempCity;
				tempCity = null;
			}
		}
	}
	cityObj.data = cityList;
	showCity()
}*/
function formatTime(t){
	var today=new Date();
	var d=new Date(t);
	var m=today.getTime()-d.getTime();
	if(m<=0){
		m=1000;
	}
	if(m<60*1000){
		return Math.floor(m/1000)+"秒前";
	}else if(m<60*60*1000){
		return Math.floor(m/(1000*60))+"分前";
	}else if(m<60*60*1000*24){
		return Math.floor(m/(1000*60*60))+"小时前";
	}else if(m<60*60*1000*24*7){
		return Math.floor(m/(1000*60*60*24))+"天前";
	}else if(m<60*60*1000*24*7*56){
		return Math.floor(m/(1000*60*60*24*7))+"周前";
	}else{
		return Math.floor(m/(1000*60*60*24*7*52))+"年前";
	}
}


//检查用户是否登录
function checkUserLogin(){
	if(userid!=null&&userid!=""&&sessionid!=null&&sessionid!=""){
		return "yes";
	}else{
		return "no";
	}
}

//去左空格;
function ltrim(s){
   return s.replace( /^\s*/, "");
}
//去右空格;
function rtrim(s){
   return s.replace( /\s*$/, "");
}
function trim(s){
   return rtrim(ltrim(s));
}

/**
 * 判断是否为空
 * @param v
 * @returns {Boolean}
 */
function empty(v){
	switch (typeof v){
	case 'undefined' : return true;
	case 'string' : if(trim(v).length == 0 || v == 'null') return true; break;
	case 'boolean' : if(!v) return true; break;
	case 'number' : if(0 === v) return true; break;
	case 'object' :
	if(null === v) return true;
	if(undefined !== v.length && v.length==0) return true;
	for(var k in v){return false;} return true;
	break;
	}
	return false;
}

/**
 * 截取子字符串
 * @param str:要截取的原字符串
 * @param len:截取长度
 * @returns
 */
function subString(str,len){
	var strlen = 0;
	//长度为空
	if(!str || str == ""){
		return str;
	}
	//长度小于截取长度
	if(str.length <= len){
		return str;
	}
	//
	var newstr="";
	for(var i = 0;i < str.length; i++){
		 //如果是汉字，则字符串长度加2
		if(str.charCodeAt(i) > 255) {
			strlen += 2;
		}
		//数字
		else{
			strlen++;
		}
		newstr += str.charAt(i);
		if(strlen >= len *2){
			break;
		}
	}
	
	return newstr;
	
}
/**
 * 获取用户ID
 * @param uid
 */
function getUid(uid){
	if(empty(uid)){
		uid = getParam("uid");
	}
	if(empty(uid)){
		uid = getParam("userid");
	}
	if(empty(uid)){
		uid = getParam("userId");
	}
	if(empty(uid)){
		uid = getCookie("UID");
	}
	return uid;
}
/**
 * 获取SessionId
 * @param uid
 */
function getSessionId(sessionid){
	if(empty(sessionid)){
		sessionid = getParam("sessionid");
	}
	if(empty(sessionid)){
		sessionid = getParam("sessionId");
	}
	if(empty(sessionid)){
		sessionid = getCookie("SESSIONID");
	}
	return sessionid;
}
function activityVisited(aid){
	visitedName=getCookie("visited_"+aid);
	//console.info("activityVisited:"+aid+" visitedName:"+visitedName);
	if(aid==""||aid==undefined){
		return;
	}
	if(visitedName==null || visitedName==""){
		//添加点击次数
		var params={
			activeid:aid
		};
		$.ajax({
			url:path+"/ajaxactivitiy/addactivitycnt.do",
			type:"GET",
			data:params,
			cache:false,
			dataType:"json",
			timeout:30000,
			beforeSend:function(){},
			complete:function(x, status){},
			error:function(XMLHttpRequest, textStatus, errorThrown) {},
			success:function(result) {
				if(result.status===0){
					addCookie("visited_"+aid,true,0);
				}
			}
		});
	}
}
/**
* 比较客户端版本
**/
function compareVersion(actual,expected){
	if(typeof actual == 'undefined'){
		return -1;
	}
	if(typeof expected == 'undefined'){
		return 1;
	}
	if(typeof actual == 'number' && typeof expected == 'number' ){
		if(actual - expected > 0){
			return 1;
		}else if(actual - expected < 0){
			return -1;
		}else{
			return 0;
		}
	}
	if(typeof actual == 'string' && typeof expected == 'string' ){
		return actual.localeCompare(expected );
	}
	return 0;
}
/*添加百度统计*/
//var _hmt = _hmt || [];
//(function() {
//var hm = document.createElement("script");
//hm.src = "//hm.baidu.com/hm.js?f3f78234457942547c335fb1775f267c";
//var s = document.getElementsByTagName("script")[0]; 
//s.parentNode.insertBefore(hm, s);
//})();
function addAppleSM(){
	var appleDiv=$('<div class="apple-sm" style="padding:10px;border:2px #505050 dotted;background-color: #eee;color: #333;font-size: 10pt;">奖项和活动均与设备生产商Apple Inc.无关</div>');
	var target=$("div.main");
	if(target.length<=0){
		target=$("body");
	}
	appleDiv.appendTo(target);
}
$(function(){
	//apple 免责声明
	if(browser.versions.ios||browser.versions.iPad||browser.versions.iPhone){
		addAppleSM();
	}
	//活动UV计数
	var ctype= getParam("clienttype");
	if(ctype!=1&&ctype!=2){
		activityVisited(getParam("activeid"));
	}
	//同步APP登录
	var appuid=getCookie("UID")||getParam("uid");
	var appsessionid = getCookie("SESSIONID")||getParam("sessionid");
	if(ctype==1||ctype==2){
		var params={
			"uid":appuid,
			"sessionid":appsessionid
		};
		$.ajax({
			type:'POST',
			url:path+"/ajax/app/synchroapplogin.do",
			data:params,
			dataType:"json",
			timeout:30000,
			beforeSend:function(){
				//$.Loading({width:120,text:"努力加载中...",loadingimg:path+"/images/cinema_icon_loading.png"});
			},
			complete:function(x, status){
				//$.Loading("close");
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function (result) {
				
			}
	   	});
	}
	//同步APP登录结束
	
});