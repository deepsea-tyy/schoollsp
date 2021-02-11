import config from './config.js'

export function errorType (err) {
	
	let codeType = [40001, 402, 502]
	
	if (err.errorCode == 50001) {
		uni.navigateTo({ url: '/pages/login/wxlogin'})
		return
	}
	
	if (!codeType.includes(err.errorCode)) {
		uni.showToast({ title: err.message, icon: 'none' })
	}
	
	/**
	 *  @params { Tips } 
	 *  1.结束加载状态
	 *  2.结束下拉状态
	 *  3.结束Promise
	 */
	
	uni.hideLoading()
	uni.stopPullDownRefresh()
	return new Promise(() => {})
}


export function isLogin() {
	let token = uni.getStorageSync('access-token') || ''
	
	return token ? true : false
}
export function getDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	//获取当前系统时间  
	var currentDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (day >= 0 && day <= 9) {
		day = '0' + day;
	}
	if (hours >= 0 && hours <= 9) {
		hours = '0' + hours;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = '0' + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = '0' + seconds;
	}
	var currentFormatDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	return currentFormatDate;
}
// error 错误提示

export function getmessage(data){
    for (var key in data)
        return data[key];
}

export function parseParam(param,key,encode){
   
      if(param==null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
          paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        } else {
          for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += parseParam(param[i], k, encode);
          }
        }
        return paramStr;
}

// 时间转换  年-月-日  时：分：秒

export function formatDate(timestamp,num=0) {
    timestamp = timestamp+'';
    timestamp = timestamp.length==10?timestamp*1000:timestamp;
    var date = new Date(timestamp);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    if(num==0){
        return y + '-' + m + '-' + d;  
    }else if(num==1){
        return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
    }else if(num==2){
        return y + '年' + m + '月' + d +'日 '+ h +':'+ minute;  
    }else if(num==3){
		return h
	}else if(num == 4){
		return d +'天'+ h +'小时'+ minute + '分';
	}else if(num == 5){
		return h +':'+ minute + ':' + second;
	}
}
// 当前时间格式化
export function dateType(num) {
	var myDate = new Date(); //实例一个时间对象；
	myDate.getFullYear();   //获取系统的年；
	var month = myDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
	myDate.getDate(); // 获取系统日，
	myDate.getHours(); //获取系统时，
	myDate.getMinutes(); //分
	myDate.getSeconds(); //秒
	if(num == 1) {
		return myDate.getHours()
	}else if(num == 2) {
		return myDate.getHours() + ':' + myDate.getMinutes();
	}else if(num == 3) {
		return myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
	}else if(num == 4){
		return myDate.getFullYear() + '年' + month  + '月'
	}
}
// 页面可滚动高度(顶部导航+底部Bar)
export function getScrollHeight() {
	let height;
	uni.getSystemInfo({
	    success(res) {
			height = res.windowHeight - uni.upx2px(170)
	    }
	});
	return height
}

// 页面可滚动高度(顶部导航+选项栏)
export function getScrollHeightSele() {
	let height;
	uni.getSystemInfo({
	    success(res) {
			height = res.windowHeight - uni.upx2px(276)
	    }
	});
	return height
}

// 页面可滚动高度(顶部导航+选项栏+底部Bar)
export function getScrollTwotopBar() {
	let height;
	uni.getSystemInfo({
	    success(res) {
			height = res.windowHeight - uni.upx2px(150)
	    }
	});
	return height
}
// 页面可滚动高度(顶部导航+公告头部)
export function getScrollVoiceDetail() {
	let height;
	uni.getSystemInfo({
	    success(res) {
			height = res.windowHeight - uni.upx2px(270) 
	    }
	});
	return height
}

// 页面可滚动高度(顶部导航+公告头部)
export function fileUrl(path) {
	return config.baseUrl + path
}


