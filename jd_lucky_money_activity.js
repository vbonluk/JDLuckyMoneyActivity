// ==UserScript==
// @namespace         https://github.com/vbonluk/

// @name              京东双十一红包插件2019

// @description       2019双十一自动做任务：逛商品，逛店铺，好玩互动，视频直播，精彩会场，一劳永逸。使用插件前请提前登录京东：http://www.jd.com，登录完了之后打开红包活动地址：https://happy.m.jd.com/babelDiy/GZWVJFLMXBQVEBDQZWMY/XJf8bH6oXDWSgS91daDJzXh9bU7/index.html，脚本自动执行。做完任务后关闭页面就可以了。本插件源于互联网分享，与本人无关，本人并不为脚步所产生的结果负责，仅供参考学习，请勿转载使用分发，请您自行辨别本脚步可能导致的风险。本脚步开源至：https://github.com/vbonluk/jd_lucky_money_activity，欢迎star。

// @homepageURL       https://github.com/vbonluk/jd_lucky_money_activity
// @supportURL        https://github.com/vbonluk/jd_lucky_money_activity/issues/
// @updateURL         https://github.com/vbonluk/jd_lucky_money_activity/jd_lucky_money_activity.js

// @author            vbonluk
// @version           0.0.4
// @license           MIT

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.3 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *happy.m.jd.com/babelDiy/GZWVJFLMXBQVEBDQZWMY/XJf8bH6oXDWSgS91daDJzXh9bU7/index.html
// @grant             none
// @run-at            document-start
// ==/UserScript==
(function() {
    'use strict';

    function Toast(msg, duration) {
  duration = isNaN(duration) ? 1000 : duration;
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
  document.body.appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() {
      document.body.removeChild(m)
    }, d * 1000);
  }, duration);
}

    let productList = [], shopList = [], url = "https://api.m.jd.com/client.action";
function autoPost(id,type){
        fetch(`${url}?timestamp=${new Date().getTime()}`,{method: "POST",mode: "cors",credentials: "include",headers:{"Content-Type": "application/x-www-form-urlencoded"},body:`functionId=raisepacket_collectScore&body={"type":${type},"ext":"${id}","appsign":1,"msgsign":2}&client=wh5`})
                .then(function(response){return response.json()})
                .then(function(res){
                        Toast(res.data.biz_msg);
                });
}
 
function start(){
        fetch(`${url}?${new Date().getTime()}`,{method: "POST",mode: "cors",credentials: "include",headers:{"Content-Type": "application/x-www-form-urlencoded"},body:'functionId=raisepacket_getShopAndProductList&body=&client=wh5'})
                .then(function(response){return response.json()})
                .then(function(res){
                        productList = res.data.result.productList;
                        shopList  = res.data.result.shopList;
                        Toast(`获取到任务,商品：${productList.length} 商品：${shopList.length}`);
                        autoProductTask();
                });
}
//逛商品
function autoProductTask(){
        for(let i = 0,leng = productList.length;i<leng;i++){
                (function(index){
                        setTimeout(()=>{
                                let item = productList[index];
                                autoPost(item['id'],4);
                                Toast(`商品总任务数：${leng} 当前任务数：${index + 1}`);
                                if( leng-1 == index){
                                        autoShopTask();
                                }
                        },index*1500)
                })(i)        
        }
}
//逛店铺
function autoShopTask(){
        for(let i = 0,leng = shopList.length;i<leng;i++){
                (function(index){
                        setTimeout(()=>{
                                let item = shopList[index];
                                autoPost(item['id'],2);
                                Toast(`商铺总任务数：${leng} 当前任务数：${index + 1}`);
                                if( leng-1 == index){
                                        autoPlay();
                                }
                        },index*1500)
                })(i)        
        }
}
//好玩互动
function autoPlay(){
        for(let i = 0,leng = 4;i<leng;i++){
                (function(index){
                        setTimeout(()=>{
                                autoPost(0,5);
                                Toast(`好玩互动：${leng} 当前任务数：${index + 1}`);
                                if( leng-1 == index){
                                        autoInteract();
                                }
                        },index*1000)
                })(i)        
        }
}
//视频直播
function autoInteract(){
        for(let i = 0,leng = 4;i<leng;i++){
                (function(index){
                        setTimeout(()=>{
                                autoPost(0,10);
                                Toast(`视频直播：${leng} 当前任务数：${index + 1}`);
                                if( leng-1 == index){
                                        autoShopping();
                                }
                        },index*1000)
                })(i)        
        }
}
//精彩会场
function autoShopping(){
        for(let i = 0,leng = 3;i<leng;i++){
                (function(index){
                        setTimeout(()=>{
                                autoPost(0,3);
                                Toast(`精彩会场：${leng} 当前任务数：${index + 1}`);
                                },
                        index*1000)
                })(i)        
        }
}
start();
})();
