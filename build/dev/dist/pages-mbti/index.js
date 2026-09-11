// pages/score/score.js
var that;
const innerAudioContext = wx.createInnerAudioContext();
const answerUrl="https://wx.amo9.com/h5/2026/sep/imeik/answer/v1/";
var loadImgI=0;
var loadCompleteNum=0;
var imgID="";
var canvas;
var wWidth=0;
var wHeight=0;
var imgScale=0;
var ctx2d;
var resourceI=0;
var resourceL=0;
var resource=[];
var texture=[];
const imgData={
   "efdo":{color:'#ffdfee',type:"0"}
  ,"efdx":{color:'#ffdfee',type:"0"}
  ,"efuo":{color:'#ffe0b8',type:"1"}
  ,"efux":{color:'#ffdfee',type:"0"}
  ,"esdo":{color:'#ffdfee',type:"0"}
  ,"esdx":{color:'#ffdfee',type:"0"}
  ,"esuo":{color:'#ffe0b8',type:"1"}
  ,"esux":{color:'#ffe0b8',type:"1"}
  ,"lfdo":{color:'#ffdfee',type:"0"}
  ,"lfdx":{color:'#ffdfee',type:"0"}
  ,"lfuo":{color:'#ffdfee',type:"0"}
  ,"lfux":{color:'#ffdfee',type:"0"}
  ,"lsdo":{color:'#ffdfee',type:"0"}
  ,"lsdx":{color:'#ffdfee',type:"0"}
  ,"lsuo":{color:'#ffdfee',type:"0"}
  ,"lsux":{color:'#ffdfee',type:"0"}
}
// ===== 登录授权相关配置 =====
// 本项目登录态/用户信息由 uni-app 端写入 storage，key 带 test 环境前缀（ls() 会拼 `${env}_key`）
var TOKEN_KEY = 'test_iclubUserToken3';        // 登录 token，有值即已登录
var USER_INFO_KEY = 'test_userInfo';           // 后端下发的用户信息（headUrl/nickName/phone 等）
var RETURN_URL_KEY = 'test_returnUrl';         // 登录页登录成功后跳回的地址
var MBTI_PENDING_KEY = 'test_mbtiPendingStart';// 标记：点了"开始测试"但未登录，授权回来后自动开局
var LOGIN_PAGE_URL = '/pages-sub/login/index'; // 项目统一登录页（手机号一键授权）
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipsClass:"hidden",
    bgClass:"bg-hidden",
    ruleShow:false,
    returnY:0,
    returnSize:0,
    audioPlay:true,
    answerShow:false,
    answerID:-1,
    answer:[],
    userInfo:null,
    mainShow:true,
    imgShow:false,
    bgColor:'#ffdfee',
    imgUrl:"",
    imgType:"0",
    canvas: null, // 实例
    width:750,
    height:1334,
    canvasX:-4000,
    tempFilePath:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that=this;
    innerAudioContext.src = "https://wx.amo9.com/h5/2026/sep/imeik/bg.mp3";
    innerAudioContext.loop=true;
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const windowInfo = wx.getWindowInfo();
    let  xyPercentage=750/windowInfo.windowWidth;
    console.log(menuButtonInfo);
     const value = wx.getStorageSync('bgSound');
     console.log(value);
     if(value!=null&&value.length>3){
      this.data.audioPlay=value=="true";
     }
     if(this.data.audioPlay){
      innerAudioContext.autoplay = true;
      innerAudioContext.play();
      }
     this.setData({
      mainShow:true,
      imgShow:false,
      answer:[],
      answerShow:false,
      answerID:-1,
      tempFilePath:"",
      bgColor:'#ffdfee',
      returnY:menuButtonInfo.top,
      returnSize:menuButtonInfo.height,
      audioPlay: this.data.audioPlay
     })
     //画布初始化
     wWidth=windowInfo.windowWidth;
     wHeight=windowInfo.windowHeight;
     imgScale=wWidth/750;
      that.setData({
        width: wWidth,
        height:1334*imgScale,
      });
      that.ctx = wx.createCameraContext();
      const query = wx.createSelectorQuery()
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
         console.log("222");
          canvas = res[0].node
          that.setData({
            canvas:canvas
          })
          ctx2d = canvas.getContext('2d');
          const dpr = windowInfo.pixelRatio;
          let _w=res[0].width;
          console.log(res[0].width,res[0].height,dpr);
          canvas.width = res[0].width * dpr;
          canvas.height = 1334*(_w/750)* dpr;
          ctx2d.scale(dpr, dpr);
        });
  },
  startOpen(){
    // 1. 判断用户是否已登录并授权过用户信息
    const token = wx.getStorageSync(TOKEN_KEY);
    const userInfo = wx.getStorageSync(USER_INFO_KEY);
    if(token && userInfo){
      // 已授权：直接把用户信息保存到 this.data.userInfo，然后开始答题
      this.setData({ userInfo: userInfo });
      console.log('已授权，用户信息：', userInfo);
      this.beginAnswer();
      return;
    }
    // 2. 未授权：记录登录后的返回地址和"待开始"标记，跳转登录页弹出授权窗口
    wx.setStorageSync(RETURN_URL_KEY, '/pages-mbti/index');
    wx.setStorageSync(MBTI_PENDING_KEY, true);
    wx.navigateTo({
      url: LOGIN_PAGE_URL,
      fail: () => {
        wx.showToast({ title: '无法打开登录页，请重试', icon: 'none' });
      }
    });
  },
  /**
   * 登录页授权完成返回后，读取后端下发的用户信息并自动开始答题
   * 登录页拿到 token 后异步请求用户信息接口，这里轮询等待 storage 写入
   */
  waitUserInfoAndStart(){
    var times = 0;
    var maxTimes = 10; // 最多等待 10*500ms = 5s
    var that = this;
    var timer = setInterval(function(){
      times++;
      const userInfo = wx.getStorageSync(USER_INFO_KEY);
      if(userInfo){
        clearInterval(timer);
        wx.removeStorageSync(MBTI_PENDING_KEY);
        that.setData({ userInfo: userInfo });
        console.log('授权成功，用户信息：', userInfo);
        that.beginAnswer();
      }else if(times >= maxTimes){
        clearInterval(timer);
        wx.removeStorageSync(MBTI_PENDING_KEY);
        wx.showToast({ title: '获取用户信息失败，请重试', icon: 'none' });
      }
    }, 500);
  },
  /**
   * 开始答题：初始化 8 道题数据并加载题目图片
   */
  beginAnswer(){
    this.data.answer=[
        {id:0,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:1,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:2,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:3,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:4,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:5,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:6,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
       ,{id:7,x:750,title:"",a:"",b:"",c:"",page:"",select:-1}
    ]
    loadImgI=0;
    this.loadAnswerImg();
    this.setData({
      mainShow:false,
      answerShow:true,
      answerID:0,
      answer:this.data.answer
    });
    setTimeout(function () {
      this.data.answer[this.data.answerID].x=0;
      this.setData({
        answer:this.data.answer
      });
    }.bind(this), 100);
  },
  nextQuestion(){
    if(this.data.answerID==7){
      //
      imgID="";
      let sList=[1,2,3];
      let s= sList[this.data.answer[0].select]+sList[this.data.answer[1].select];
      console.log("第1个字母分数："+s);
      if(s>3){
        imgID="l";
      }else imgID="e";
      s= sList[this.data.answer[2].select]+sList[this.data.answer[3].select];
      console.log("第2个字母分数："+s);
      if(s>3){
        imgID+="f";
      }else imgID+="s";
      s= sList[this.data.answer[4].select]+sList[this.data.answer[5].select];
      console.log("第3个字母分数："+s);
      if(s>3){
        imgID+="d";
      }else imgID+="u";
      s= sList[this.data.answer[6].select]+sList[this.data.answer[7].select];
      console.log("第4个字母分数："+s);
      if(s>3){
        imgID+="x";
      }else imgID+="o";
      console.log("imgID："+imgID);
      console.log(imgData[imgID]);
      //
      this.data.answer[this.data.answerID].x=-750;
      console.log(this.data.userInfo);
         this.setData({
           answerShow:false
          ,canvasX:-4000
          ,tempFilePath:""
          ,answer:this.data.answer
          ,imgShow:true
          ,imgUrl:"https://wx.amo9.com/h5/2026/sep/imeik/img/"+imgID+".png"
          ,bgClass:imgData[imgID].color
          ,imgType:imgData[imgID].type
         });
         //加载资源生成海报
         resource=[{name:"bg",url:"https://wx.amo9.com/h5/2026/sep/imeik/img/_"+imgID+".png"}];
         resource.push({name:"head",url:this.data.userInfo.headUrl});
         resourceI=-1;
        resourceL=resource.length;
        that.resourceLoad();
    }else{
    if(this.data.answer[this.data.answerID].select>-1){
    this.data.answer[this.data.answerID].x=-750;
    this.data.answerID++;
    this.data.answer[this.data.answerID].x=0;
    this.setData({
       answerID:this.data.answerID
      ,answer:this.data.answer
    });
   }
   }
   this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
  },
  resourceLoad:function(){
    console.log("resourceLoad")
   resourceI++;
   console.log("resourceI:"+resourceI+" resourceL:"+resourceL);
   if(resourceL>resourceI){
          
    let img = canvas.createImage();
    img.onload = e => {
      console.log('onload');
      console.log(img.width);
      texture[resource[resourceI].name]={obj:img,width:img.width,height:img.height};
      that.resourceLoad();
    }
    img.onerror= e => {
     console.log("onerror:"+e)
    }
    img.src =resource[resourceI].url;
     }else if(resourceL==resourceI){
          that.gamePlay();
      }
  },
  gamePlay:function(){
   console.log("gamePlay");
   ctx2d.clearRect(0, 0, wWidth, wHeight);
   ctx2d.drawImage(texture["head"].obj, 0, 0, texture["head"].width, texture["head"].height,41*imgScale,81*imgScale,66*imgScale,66*imgScale);
   ctx2d.drawImage(texture["bg"].obj, 0, 0, texture["bg"].width, texture["bg"].height,0,0,750*imgScale,1334*imgScale);
   ctx2d.font = (32*imgScale)+"px Arial"; 
   ctx2d.fillStyle = "#f22d61"; 
   ctx2d.textAlign = 'left';
   ctx2d.fillText("@美客+"+this.data.userInfo.nickName,121*imgScale,(97+32)*imgScale);
   setTimeout(function () {
    that.canvasToTempFilePath();
    }.bind(that), 1000);
  },
  canvasToTempFilePath(){
    wx.canvasToTempFilePath({
      canvas: this.data.canvas, // 使用2D 需要传递的参数
      success(res) {
        console.log(res.tempFilePath);
        that.setData({
          tempFilePath:res.tempFilePath,
        })
      }
    })
  },
  loadAnswerImg:function(){
    console.log("加载"+(loadImgI+1)+"题");
    loadCompleteNum=0;
    this.data.answer[loadImgI].page=answerUrl+"page"+this.data.answer[loadImgI].id+".png";
    this.data.answer[loadImgI].title=answerUrl+this.data.answer[loadImgI].id+"_title.png";
    this.data.answer[loadImgI].a=answerUrl+this.data.answer[loadImgI].id+"_a.png";
    this.data.answer[loadImgI].b=answerUrl+this.data.answer[loadImgI].id+"_b.png";
    this.data.answer[loadImgI].c=answerUrl+this.data.answer[loadImgI].id+"_c.png";
    this.setData({
      answer:this.data.answer
    });
  },
  selectA:function(e){
       let idx=Number(e.currentTarget.id);
       this.data.answer[this.data.answerID].select=0;
        this.setData({
          answer:this.data.answer
        });
        this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
  },
  selectB:function(e){
    let idx=Number(e.currentTarget.id);
       this.data.answer[this.data.answerID].select=1;
        this.setData({
          answer:this.data.answer
        });
        this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
},
selectC:function(e){
      let idx=Number(e.currentTarget.id);
       this.data.answer[this.data.answerID].select=2;
        this.setData({
          answer:this.data.answer
        });
        this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
},
previousQuestion:function(){
  if(this.data.answerID>0){
  this.data.answer[this.data.answerID].x=750;
  this.data.answerID--;
  this.data.answer[this.data.answerID].x=0;
  this.setData({
     answerID:this.data.answerID
    ,answer:this.data.answer
  });
  this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
 }
},
  loadComplete:function(){
      loadCompleteNum++;
      if(loadCompleteNum==5){
        console.log("加载完成");
        loadImgI++;
        if(8>loadImgI) this.loadAnswerImg();
      }
  },
  exit:function(){
    wx.navigateBack();
  },
  ruleOpen:function(){
    this.setData({
      ruleShow:true
    });
    setTimeout(function () {
      this.setData({
        tipsClass:"show"
       ,bgClass:"bg-show"
      }) 
    }.bind(this), 200);
    this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
  },
  ruleClose(){
    this.setData({
      tipsClass:"hidden"
     ,bgClass:"bg-hidden"
    });
    setTimeout(function () {
      this.setData({
        ruleShow:false
      });
    }.bind(this), 500);
    this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
  },
  bgSoundClick(){
    if(this.data.audioPlay){
      innerAudioContext.pause();
    }else{
      innerAudioContext.play();
    }
     this.setData({
         audioPlay:this.data.audioPlay==false
     });
     wx.setStorageSync('bgSound', String(this.data.audioPlay))
  },
  saveImg(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
      success(res) { 
        wx.showToast({
          title: '已保存到相册',
        })
     //   that.share(2);
      },
      fail: function (err) {
        console.log(err);
        　if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
          console.log("用户一开始拒绝了，我们想再次发起授权")
         let title='系统提示';
         let content='请允许我们保存图片到相册';
         wx.showModal({
          title: title,
          content: content,
          showCancel: false,
          success: function success(res) {
              if (res.confirm) {
                  wx.openSetting({
                      success: function success(res) {
                          if (res.authSetting['scope.writePhotosAlbum']) {
                              // 使用 call 调用将 this 指向指回 EvaluateCard 类上的原因是，这里直接调用 that.methods 会导致 this 指向 methods
                              // 使其函数重新执行时，上面的this指向全部变为了methods
                             
                          } else {
                            
                          }
                          if (res.confirm) {
                              console.log('用户点击确定')
                          } else if (res.cancel) {
                              console.log('用户点击取消')
                          }
                      },
                      fail: function fail() {
                         
                      }
                  });
              }
          }
      });
        }
      }
    })
  },
  setAudioPlay(str){
   // console.log(str,audioPlay);
    if(this.data.audioPlay){
    let audio= wx.createInnerAudioContext();
    audio.autoplay = true;
    audio.src = str;
    audio.onEnded((res) => {
     audio.offEnded();
     audio.destroy();
      console.log("销毁");
     })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   * 从登录页授权完成后会 redirectTo 回到本页（页面重建，onLoad/onShow 都会触发）；
   * 用户取消登录 navigateBack 回来时也会触发 onShow
   */
  onShow() {
    const token = wx.getStorageSync(TOKEN_KEY);
    const pending = wx.getStorageSync(MBTI_PENDING_KEY);
    if(token && pending){
      // 已登录且存在"待开始"标记：等待用户信息写入后自动开始答题
      this.waitUserInfoAndStart();
    }else if(!token){
      // 未登录返回（用户取消授权等）：清除待开始标记，不自动开局
      wx.removeStorageSync(MBTI_PENDING_KEY);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if(this.data.audioPlay){
    innerAudioContext.pause();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title:"测测你的肌肤MBTI 好肌肤随时登场",
      path:"pages/index/index",
      imageUrl:"https://wx.amo9.com/h5/2026/sep/imeik/icon.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})