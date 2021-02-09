<template>
<!--pages/find/find.wxml-->
<view class="find">
  <view class="item">
    <text class="title">成语接龙</text>
    <!-- 如果用户已登录 -->
    <view class="option" v-if="logged">
      <button type="default" @tap="goJielong"> 开始挑战 </button>
      <button type="default" data-type="成语接龙" @tap="goRecord"> 我的战绩 </button>
      <button type="default" data-type="成语接龙" @tap="goRanking"> 排行榜 </button>
    </view>
    <!-- 用户未登录 -->
    <view class="option" v-else>
      <button type="default" open-type="getUserInfo" @getuserinfo="goJielong">开始挑战</button>
      <button type="default" open-type="getUserInfo" @getuserinfo="goRecord">我的战绩</button>
      <button type="default" data-type="成语接龙" open-type="getUserInfo" @getuserinfo="goRanking">排行榜</button>
    </view>
  </view>
  <view class="item">
    <text class="title">飞花令</text>
    <view class="option">
      <button type="default" @tap="goFeihuaSelect"> 开始挑战 </button>
      <!-- <button type="default" bindtap=''> 我的战绩 </button>
      <button type="default" > 排行榜 </button> -->
    </view>
  </view>
  <view class="item">
    <text class="title">姓名源于哪首古诗词</text>
    <view class="option">
      <button type="default" @tap="gocangtoushi"> 查一查 </button>
      <!-- <button type="default" > 排行榜 </button> -->
    </view>
  </view>
  <view class="item">
    <text class="title">诗词接龙</text>
    <view class="option comming">
      <button type="default" @tap> 即将开放 </button>
      <button type="default"> 排行榜 </button>
    </view>
  </view>
</view>
</template>

<script>
// pages/find/find.js
const app = getApp();

export default {
  data() {
    return {
      logged: false,
      avatarUrl: '',
      username: ''
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    let isLogin = app.globalData.isLogin;
    this.setData({
      logged: isLogin ? true : false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('是否已有用户openId：', app.globalData.globalData);
    let isLogin = app.globalData.isLogin;
    this.setData({
      logged: isLogin ? true : false
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    goJielong(e) {
      if (this.logged) {
        uni.navigateTo({
          url: `/pages/idiom-jielong/idiom-jielong`
        });
      } else {
        this.onGetUserInfo(e);
        uni.navigateTo({
          url: `/pages/idiom-jielong/idiom-jielong`
        });
      }
    },

    goRecord(e) {
      if (this.logged) {
        let type = e.currentTarget.dataset.type;
        uni.navigateTo({
          url: `/pages/myRecord/myrecord?type=${type}`
        });
      } else {
        this.onGetUserInfo(e);
      }
    },

    goRanking(e) {
      let type = e.currentTarget.dataset.type;

      if (this.logged) {
        uni.navigateTo({
          url: `/pages/ranking/ranking?type=${type}`
        });
      } else {
        this.onGetUserInfo(e);
        uni.navigateTo({
          url: `/pages/ranking/ranking?type=${type}`
        });
      }
    },

    goFeihuaSelect(e) {
      uni.navigateTo({
        url: `/pages/feihua-select/feihua-select`
      });
    },

    onGetUserInfo(e) {
      uni.getUserInfo({
        success: res => {
          this.setData({
            logged: true,
            avatarUrl: e.detail.userInfo.avatarUrl,
            username: e.detail.userInfo.nickName
          });
          uni.setStorageSync('isLogin', 'isLogin');
          uni.setStorageSync('avatarUrl', this.avatarUrl);
          uni.setStorageSync('username', this.username);
          app.globalData.isLogin = uni.getStorageSync('isLogin');
          app.globalData.avatarUrl = uni.getStorageSync('avatarUrl');
          app.globalData.username = uni.getStorageSync('username');
        },
        fail: res => {
          console.log(res);
        }
      });
    },

    gocangtoushi() {
      uni.navigateTo({
        url: `/pages/cangtoushi/cangtoushi`
      });
    }

  }
};
</script>
<style>
.find {
  height: 100%;
  padding: 0 30rpx;
}
.find .item {
  background: #fff;
  height: 240rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 30rpx;
}
.title {
  font-size: 40rpx;
  color: #FF6262;
}

.option button {
  display: inline-block;
  margin: 0 10rpx;
  font-size: 30rpx;
  /* border: 1px solid #ccc; */
  /* background: #FF6262; */
  /* color: #fff; */
  outline: none;
  border: 0;
}

.comming button {
  color: #999;
  background: #eee;
  border: 0;
  outline: none;
  /* border: 1px solid #ccc; */
}










</style>