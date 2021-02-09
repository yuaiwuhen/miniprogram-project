<template>
<!-- miniprogram/pages/user/user.wxml -->
<view class="user">
  <view class="name">
    <image :src="avatarUrl"></image>
    <button class="userinfo-nickname" v-if="!logged" open-type="getUserInfo" @getuserinfo="onGetUserInfo">
      点此登录
    </button>
    <text>{{username}}</text>
  </view>
  <view class="box">
    <view class="item" :data-openid="openid" @tap="goAbout">
      <view class="item-inner">
        <view>关于</view>
      </view>
      <i class="wx-icon-custom-gengduo"></i>
    </view>
    <view class="addApp" v-if="showImg" @tap="hideImg">
      <image src="/static/images/add3.png"></image>
    </view>
  </view>
</view>
</template>

<script>
// miniprogram/pages/user/user.js
const app = getApp();

export default {
  data() {
    return {
      userInfo: {},
      avatarUrl: "/static/pages/user/user-unlogin.png",
      openid: "",
      logged: false,
      username: "",
      place: "",
      showImg: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入用户页检查是否登录:", app.globalData.isLogin);
    console.log("是否已授权：", uni.getStorageSync("isLogin"));
    console.log("是否已有用户openId：", app.globalData.openid);
    uni.showLoading({
      title: "正在加载...",
      mask: true
    });

    if (app.globalData.isLogin) {
      this.setData({
        logged: true,
        avatarUrl: app.globalData.avatarUrl,
        username: app.globalData.username
      });
    }

    uni.hideLoading();
    用户的openId;

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isLogin) {
      this.setData({
        logged: true,
        avatarUrl: app.globalData.avatarUrl,
        username: app.globalData.username
      });
    }

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  methods: {
    onGetUserInfo: function (e) {
      if (!this.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo,
          username: e.detail.userInfo.nickName
        });
        uni.setStorageSync("isLogin", "isLogin");
        uni.setStorageSync("avatarUrl", this.avatarUrl);
        uni.setStorageSync("username", this.username);
        app.globalData.isLogin = uni.getStorageSync("isLogin");
        app.globalData.avatarUrl = uni.getStorageSync("avatarUrl");
        app.globalData.username = uni.getStorageSync("username");
      }
    }
  }
};
</script>
<style>
/* miniprogram/pages/user/user.wxss */

.user {
  font-size: 28rpx;
  height: 100%;
}

.user .name {
  /* background: linear-gradient(#f79642, #f5798d); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30rpx;
}

.name image {
  height: 140rpx;
  width: 140rpx;
  border-radius: 50%;
  animation: avator linear 16s infinite normal;
}

.name button {
  margin-top: 40rpx;
  font-size: 28rpx;
  background: #f38787;
  color: #fff;
  border: 0;
  outline: none;
  padding: 1rpx 40rpx;
}
.user .name text {
  padding-top: 20rpx;
  color: #333;
}

.box {
  padding: 8rpx 20rpx;
}
.box .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: #fff;
  height: 120rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.box .item-inner {
  width: 80%;
  font-size: 24rpx;
  color: #555;
  display: flex;
}

.box .item-inner view {
  background: #fff;
  font-size: 30rpx;
  color: #333;
  padding-left: 20rpx;
  line-height: 1.7;
}
.addApp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.8)
}
.addApp image {
  width: 80%;
}
.addApp text {
  font-size: 44rpx;
  color: #fff;
  border: 1px dashed #fff;
  border-radius: 30rpx;
  display: inline-block;
  padding: 20rpx 80rpx;
  text-align: center;
  line-height: 50rpx;
}

.contact-me button {
  margin: 0;
  background: #fff;
  font-size: 30rpx;
  color: #333;
  padding-left: 20rpx;
  /* line-height: 1.7; */
  border: none;
  position: absolute;
  top: 0;
  left: 0rpx;
  right: 50rpx;
  bottom: 0;
  display: flex;
  align-items: center;

}
.contact-me button::after {
  border: none;
}

</style>