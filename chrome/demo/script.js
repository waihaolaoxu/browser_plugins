/*
 * @ anthor:前端老徐
 * @ date:2016-11-29
*/

// chrome.tabs.getCurrent(function(tab) {
// 	console.log(tab);
// })

//刷新
function r(u,callback){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post", "http://admin.jiajuol.com/admin/website/ajax_flush.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(u,JSON.parse(xmlhttp.responseText));
		}
	}
	xmlhttp.send("url="+u+"&flash=yes");
}


//刷新当前页面 
chrome.tabs.getSelected(null, function(tab) {
	var obj=document.getElementById('r_cur');
	if(!obj)return;
	// 匹配url地址是否为本站
	if(tab.url.indexOf('jiajuol')<0){
		obj.disabled=true;
	}
	obj.onclick = function() {
		var self=this;
		self.disabled=true;
		self.innerHTML='刷新中...';
		r(tab.url,function(u,data){
			self.disabled=false;
			self.innerHTML='刷新当前页面';
			console.log(u);
			console.log(data);
			var tip=new Notification("我的消息",{
	            body : data.des,
	            icon : 'icon48.png'
	        });
	        setTimeout(function(){
	        	tip.close();
	        },1500)
		});
	}
});

//批量刷新所有分站
(function(){
	if(!document.getElementById('txt1')||!document.getElementById('txt1'))return;
	var obj=document.getElementById('r_all'),
		step=0,
		urls=document.getElementById('txt1').value.split('\n'),
		result=document.getElementById('txt2');
	function fn(){
		obj.disabled=true;
		obj.innerHTML='刷新中...';
		var str='';
		r(urls[step],function(u,data){
			if(data.code==200){
				str='<p class="ok">'+data.des+'</p>'
			}else{
				str='<p class="err">'+data.des+'</p>'
			}
			result.innerHTML=result.innerHTML+str;
			step++;
			if(step<urls.length-1){
				fn();
			}else{
				alert("刷新完毕!");
				obj.disabled=false;
				obj.innerHTML='批量刷新 &gt;';
			}
		});
	}
	obj.onclick=fn;
}())

