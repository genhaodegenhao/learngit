/**
*	Confirm 提示消息插件
*	@author 李见伟
*	@parameters 
*		width:number; 消息类型
*		corner:true|false default:true;
*		border:{style:"solid",width:1,color:"#CCC"},
*		position:left|top|right|bottom default:null 消息提示出现的位置		
*/
;(function($){
	$.extend({
		Confirm:function(options,callback){
			options = $.extend({
				width:"80%",
				height:"",
				modle:true,
				id:"CONFIRM",
				class:"confirm",
				buttons:{" ok ":function(){},"cancel":function(){}},
				corner:5,
				title:"",
				html:"",
				textAlign:"center",
				opacity:1
			},options);
			var me=this;
			function Initialization(){
				if(!options.id){
					return;
				}
				me.cf=$("#"+options.id);
				//$cf=$("#"+options.id);
				if(me.cf.length<1){
					me.cf=$('<div class="confirm"><div class="body"></div></div>');
					me.cf.attr("id",options.id);
					me.cf.appendTo($("body"));
				}
				me.bg=$("div.background",me.cf);
				//$cfbg=$("div.background",me.cf);
				if(me.bg.length<1){
					me.bg=$('<div class="background"></div>');
					me.bg.appendTo(me.cf);
				}
				me.body=$(".body",me.cf);
				//$cfBody=$(".body",me.cf);
				if(me.body.length<1){
					me.body=$('<div class="body"></div>');
					me.body.appendTo(me.cf);
				}
				me.msgCnt=$(".msgCnt",me.body);
				//var $msgContent=$(".msgCnt",me.body);
				if(me.msgCnt.length<1){
					me.msgCnt=$('<div class="msgCnt"></div>');
					me.msgCnt.appendTo(me.body);
				}
				if(options.textAlign){
					me.msgCnt.attr("align",options.textAlign);
				}
				if(options.title){
					me.title=$("h2.title",me.msgCnt);
					if(me.title.length<1){
						me.title=$('<h2 class="title"></h2>');
						me.title.appendTo(me.msgCnt);
					}
					me.title.text(options.title);
				}
				if(options.html){
					me.text=$("div.text",me.msgCnt);
					if(me.text.length<1){
						me.text=$('<div class="text"></div>');
						me.text.appendTo(me.msgCnt);
					}
					me.text.html(options.html);
				}
				me.fBar=$("div.fBar",me.body);
				if(me.fBar.length<1){
					me.fBar=$('<div class="fBar"></div>');
					me.fBar.appendTo(me.body);
				}
				$buttonGroup=$("ul.buttonGroup",me.fBar);
				if($buttonGroup.length<1){
					$buttonGroup=$('<ul class="buttonGroup"></ul>');
					$buttonGroup.appendTo(me.fBar);
				}
				if(options.corner){
					me.bg.addClass("corner-"+options.corner);
					me.body.addClass("corner-"+options.corner);
					me.text.addClass("corner-"+options.corner);
				}
				if(options.width){
					me.cf.css("width",options.width);
				}
				if(options.opacity){
					me.bg.fadeTo(0,0.25);
					me.body.fadeTo(100,options.opacity);
				}else{
					me.bg.fadeTo(0,0.25);
				}
				if(options.buttons){
					var i=0;
					var btn=[];
					var fun=[];
					$buttonGroup.html("");
					for(var key in options.buttons){
						fun[i]=options.buttons[key];
						btn[i]=$('<li><span></span></li>').appendTo($buttonGroup);
						$("span",btn[i]).text(key);
						btn[i].click(function(){
							var j=$(this).index();
							var thiskey=$("span",this).first().html();
							if(options.buttonsBeforeClick&&options.buttonsBeforeClick[thiskey]){
								var beforeMsg=options.buttonsBeforeClick[thiskey].call();
								if(beforeMsg){
									hide();
								}
							}else{
								hide();
							}
							
							window.setTimeout(function(){
								if(fun[j]){
									fun[j].call();
								}
							}, 100);
						});
						i++;
					}
				}				
				$(window).resize(function(){
					InitializationPosition();
				});
			}
			function InitializationPosition(){
				me.cf=$("#"+options.id);
				var width=me.cf.width();
				var height=me.cf.height();
				var browserWidth=$(window).width();
				var browserHeight=$(window).height();
				if(browserWidth>width){
					me.cf.css("left",browserWidth/2-width/2);
				}
				if(browserHeight>height){
					me.cf.css("top",(browserHeight/2-height/2)*2/3);
				}
			}
			function show(){
				me.cf=$("#"+options.id);
				InitializationPosition();
				if(options.modle){
					$.Mask.show();
				}
				me.cf.stop(true,true).fadeIn(100);
			}
			function hide(){
				me.cf=$("#"+options.id);
				if(options.modle){
					$.Mask.close();
				}
				me.cf.stop(true,true).fadeOut(30,function(){$(this).remove();});
			}
			Initialization();
			show();
			return me;
		}
	});
})(jQuery);