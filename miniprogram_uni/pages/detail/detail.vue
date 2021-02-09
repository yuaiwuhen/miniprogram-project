<template>
<view>
<!-- miniprogram/pages/detail/detail.wxml -->
<view class="detail" v-if="isExist && isDown">
  <view class="title">{{detail.name}}</view>
  <view class="poet">
    <view>{{detail.dynasty}}</view>
    <view class="name" :data-poet="detail.poet" @tap="goPoet">{{detail.poet}}</view>
  </view>
  <view class="poem">
    <text v-for="(item, index) in detail.content" :key="index">{{item}}</text>
  </view>
  <view class="tags">
    <text v-for="(item, index) in detail.tags" :key="index" data-parenttags="标签" :data-tags="item" @tap="goList">{{item}}</text>
  </view>
  <view class="more">
    <view class="topTabSwiper">
      <view :class="'tab  ' + (currentData == 0 ? 'tabBorer' : '')" data-current="0" @tap="checkCurrent">
        译文
      </view>
      <view :class="'tab  ' + (currentData == 1 ? 'tabBorer' : '')" data-current="1" @tap="checkCurrent">
        注释
      </view>
      <view :class="'tab  ' + (currentData == 2 ? 'tabBorer' : '')" data-current="2" @tap="checkCurrent">
        赏析
      </view>
    </view>
    <view class="swiper">
      <view :class="'itembox ' + (currentData == 0 ? 'showItem' : '')">
        <view v-for="(item, index) in detail.yiwen" :key="index">{{item}}</view>
        <view v-if="!detail.yiwen.length">暂无译文</view>
      </view>
      <view :class="'itembox ' + (currentData == 1 ? 'showItem' : '')">
        <view v-for="(item, index) in detail.zhushi" :key="index">{{item}}</view>
        <view v-if="!detail.zhushi.length">暂无注释</view>
      </view>
      <view :class="'itembox ' + (currentData == 2 ? 'showItem' : '')">
        <view v-for="(item, index) in detail.shangxi" :key="index">{{item}}</view>
        <view v-if="!detail.shangxi.length">暂无赏析</view>
      </view>
    </view>
  </view>
</view>

<!-- 首页 -->
<view class="backhome" @tap="onBackhome">
  <image src="/static/images/nav/index-active.png"></image>
  <text>回首页</text>
</view>

<!-- 分享 -->
<view class="share">
  <image src="/static/images/share.png"></image>
  <text>分享</text>
  <button open-type="share"></button>
</view>


<view class="no-list" v-if="!isExist" style="text-align:center;font-size:24rpx;padding:30rpx;">
  <text style="color:#666;">--- 未找到 ---</text>
</view>
</view>
</template>

<script>
// miniprogram/pages/detail/detail.js
const app = getApp();

export default {
  data() {
    return {
      id: '',
      currentData: 0,
      detail: {},
      thisIndex: -1,
      page: 1,
      num: 1,
      logged: false,
      openid: '',
      isCollect: false,
      isDown: false,
      loading: false,
      isExist: true
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    let isLogin = app.globalData.isLogin;
    console.log('用户是否授权：', app.globalData.isLogin);
    console.log('是否已有用户openId：', app.globalData.openid);
    this.setData({
      id: options.id
    });
    this.setData({
      logged: isLogin ? true : false
    });

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      });
    }

    if (options.id) {
      uni.setStorageSync('shareId', options.id);
      this.loadDetail(options.id);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  methods: {
    loadDetail(id) {
      let {
        detail,
        page,
        num
      } = this;
      let that = this;
      uni.showLoading({
        title: '详情加载中...'
      });
      uni.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'gushici',
          page,
          num,
          condition: {
            _id: id
          }
        }
      }).then(res => {
        if (!res.result.data.length) {
          uni.showToast({
            icon: 'warn',
            title: '加载失败'
          });
        } else {
          this.setData({
            detail: res.result.data[0]
          });
          uni.hideLoading();
        }

        that.setData({
          isDown: true
        });
      }).catch(err => {
        console.log('失败');
        that.setData({
          isExist: false
        });
      });
    },

    goList(e) {
      uni.navigateTo({
        url: `/pages/list/list?parenttags=${e.currentTarget.dataset.parenttags}&tags=${e.currentTarget.dataset.tags}`
      });
    },

    goPoet(e) {
      let poet = e.currentTarget.dataset.poet;

      if (poet == '佚名') {
        return false;
      } else {
        uni.navigateTo({
          url: `/pages/poet/poet?poet=${e.currentTarget.dataset.poet}`
        });
      }
    },

    //点击切换 Tab
    checkCurrent(e) {
      if (this.currentData === e.target.dataset.current) {
        return false;
      } else {
        this.setData({
          currentData: e.target.dataset.current
        });
      }
    },

    onBackhome() {
      uni.switchTab({
        url: `/pages/index/index`
      });
    }

  }
};
</script>
<style>
/* miniprogram/pages/detail/detail.wxss */
.detail {
  font-size: 32rpx;
  padding: 30rpx;
}
.title {
  font-size: 36rpx;
  text-align: center;
  margin-bottom: 20rpx;
}
.poet {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
}
.poet>view {
  padding: 10rpx 20rpx;
}
.poet>view.name {
  color: #2673db;
}
.poet view text {
  color: #666;
}
.poem {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
}
.poem text {
  line-height: 1.6;
  font-size: 32rpx;
}
.tags {
  text-align: center;
}
.tags text {
  display: inline-block;
  border: 1px solid #ddd;
  color: #777;
  margin: 10rpx;
  padding: 4rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.more {
  margin-top: 50rpx;
}

.tab {
  float: left;
  width: 33.3333%;
  text-align: center;
  padding: 10rpx 0;
}

.topTabSwiper {
  border-bottom: 1px solid #ccc;
  zoom: 1;
}

.topTabSwiper:after {
  content: "";
  clear: both;
  display: block;
}

.tabBorer {
  border-bottom: 1px solid #f00;
  color: #f00;
}

.swiper {
  width: 100%;
}

.itembox {
  width: 100%;
  padding: 40rpx 0;
}
.itembox view {
  margin-bottom: 20rpx;
}
.itembox {
  display: none
}
.showItem {
  display: block;
}


.collect {
  height: 120rpx;
  width: 120rpx;
  position: fixed;
  bottom: 30rpx;
  right: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  background: rgba(0, 0, 0, .6);
  border-radius: 50%;
  z-index: 10;
}

.collect image {
  height: 50rpx;
  width: 50rpx;
}
.collect text {
  color: #fff;
}

.collect button {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.1;
}


.share {
  height: 120rpx;
  width: 120rpx;
  position: fixed;
  bottom: 170rpx;
  right: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  background: rgba(0, 0, 0, .6);
  border-radius: 50%;
  z-index: 10;
}
.share image {
  height: 70rpx;
  width: 70rpx;
}
.share text {
  color: #fff;
}

.share button {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  z-index: 99;
}

.backhome {
  height: 110rpx;
  width: 110rpx;
  position: fixed;
  top: 10rpx;
  right: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  background: rgba(255, 255, 255, .4);
  border-radius: 50%;
  box-shadow: 1px 1px 2px #bbb;
  z-index: 10;
}
.backhome image {
  height: 50rpx;
  width: 50rpx;
}
.backhome text {
  color: #666;
  font-size: 20rpx;
}


</style>