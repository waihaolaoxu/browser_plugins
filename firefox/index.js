/*
 * @ anthor:前端老徐
 * @ date:2016-11-30
*/

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;

var button = buttons.ActionButton({
	id: "mozilla-link",
	label: "家居在线-缓存刷新",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: handleClick
});

//刷新
function handleClick(state) {
	if(tabs.activeTab.url.indexOf('jiajuol')<0){
		console.log('错误：非家居网站！');
		return;
	}
	Request({
		url: "http://admin.jiajuol.com/admin/website/ajax_flush.php",
		content:{
			url:tabs.activeTab.url,
			flash:"yes"
		},
		onComplete: function(response) {
			var data=JSON.parse(response.text);
			if(data.code==200){
				console.log('刷新成功！');
				console.log(response.text);
				tabs.activeTab.reload();
			}else{
				console.log('刷新失败！');
				console.log(response.text);
			}
		}
	}).post();
}