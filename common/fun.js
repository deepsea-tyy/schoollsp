import config from './config.js'

export function errorType (err) {
	
	let codeType = [40001, 402, 502]
	
	if (err.errorCode == 50001) {
		uni.navigateTo({ url: config.loginPath})
		return
	}
	if (err.errorCode == 400001) {
		uni.navigateTo({ url: '/pages/runClient/auth/realname'})
		return
	}
	
	if (!codeType.includes(err.errorCode)) {
		let msg = '';
		if(typeof(err.message) == 'object'){
			for (let key in err.message) {
				msg = err.message[key][0]
				break
			}
		}
		uni.showToast({ title: msg ? msg : err.message, icon: 'none' })
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
        return y + '-' + m + '-' + d +' '+ h +':'+ minute;  
    }else if(num==2){
        return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
    }else if(num == 3){
		return y + '年' + m + '月' + d +'日 ';
	}else if(num==4){
        return y + '年' + m + '月' + d +'日 '+ h +':'+ minute;  
    }else if(num==5){
        return y + '年' + m + '月' + d +'日 '+ h +':'+ minute +':' + second;
    }else if(num==6){
		return h +':'+ minute ;
	}else if(num==7){
		return h +':'+ minute + ':' + second;
	}
}

/* stringTime为:年-月-日 时:分:秒 */
export function friendlyFormatTime(stringTime) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let time1 = new Date().getTime(); //当前的时间戳
    let time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
    let time = time1 - time2;

    let result = null;
    if (time < 0) {
        result = '--';
    } else if (time / month >= 1) {
        result = parseInt(time / month) + '月前';
    } else if (time / week >= 1) {
        result = parseInt(time / week) + '周前';
    } else if (time / day >= 1) {
        result = parseInt(time / day) + '天前';
    } else if (time / hour >= 1) {
        result = parseInt(time / hour) + '小时前';
    } else if (time / minute >= 1) {
        result = parseInt(time / minute) + '分钟前';
    } else {
        result = '刚刚';
    }
    return result;
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


