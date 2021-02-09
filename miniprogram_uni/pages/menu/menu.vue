<template>
<!--miniprogram/pages/menu/menu.wxml-->
<view class="menu">
  <view class="top">
    <view class="search" data-type="古诗词" @tap="goSearch">
      <input placeholder="搜索古诗词" disabled></input>
      <image src="/static/images/search.png"></image>
    </view>
    <view class="search" data-type="作者" @tap="goSearch">
      <input placeholder="搜索作者" disabled></input>
      <image src="/static/images/search.png"></image>
    </view>
  </view>
  <view v-for="(parentItem, parentIdx) in list" :key="parentIdx" class="item">
    <view class="title">
      <text>{{parentItem.name}}</text>
    </view>
    <view class="classic">
      <text v-for="(item, index) in parentItem.list" :key="index" :data-parenttags="parentItem.name" :data-tags="item" @tap="goList" v-if="index < 10 || showMore == parentIdx">{{item}}</text>
      <block v-if="parentItem.list.length >= 10">
        <view v-if="showMore == parentIdx" class="btn" :data-parentIdx="parentIdx" @tap="foldToggle">
          收起 <i class="wx-icon-custom-shouqi"></i>
        </view>
        <view v-else class="btn" :data-parentIdx="parentIdx" @tap="unfoldToggle">
          查看更多 <i class="wx-icon-custom-spread-line"></i>
        </view>
      </block>
    </view>
  </view>
</view>
</template>

<script>
// miniprogram/pages/menu/menu.js
const tagsList = require("../../lib/tags");

export default {
  data() {
    return {
      list: [],
      showMore: -1
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

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
    loadList() {
      let {
        list
      } = this;
      uni.showLoading({
        title: '正在加载...',
        mask: true
      });
      list = tagsList.tagsList;
      this.setData({
        list
      });
      setTimeout(() => {
        uni.hideLoading();
      }, 200);
    },

    foldToggle(e) {
      this.setData({
        showMore: -1
      });
    },

    unfoldToggle(e) {
      this.setData({
        showMore: e.currentTarget.dataset.parentidx
      });
    },

    goList(e) {
      uni.navigateTo({
        url: `/pages/list/list?parenttags=${e.currentTarget.dataset.parenttags}&tags=${e.currentTarget.dataset.tags}`
      });
    },

    goSearch(e) {
      let type = e.currentTarget.dataset.type;
      uni.navigateTo({
        url: `/pages/search/search?type=${type}`
      });
    }

  }
};
</script>
<style>
/* miniprogram/pages/menu/menu.wxss */
.menu {
  padding: 20rpx;
  font-size: 28rpx;
}
.menu image {
  height: 40rpx;
  width: 40rpx;
  margin-right: 10rpx;
}
.top {
  position: relative;
  padding: 30rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top .search {
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 40rpx;
  height: 68rpx;
  width: 44%;
  padding: 0 20rpx;
  margin: 0 10rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 28rpx;
}

.top .search image {
  height: 30rpx;
  width: 30rpx;
  margin-right: 20rpx;
}

.top input {
  border: none;
  flex: 1;
  padding-left: 20rpx;
}

.menu .item {
  margin-bottom: 16rpx;
}
.menu .title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  color: #555;
}
.menu .item .classic {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 0;
  justify-content: center;
  align-items: center;
}
.menu .item .classic text {
  border: 1px solid #f79696;
  padding: 6rpx 20rpx;
  margin: 20rpx;
  color: #777;
  font-size: 24rpx;
  border-radius: 28rpx;
}
.menu .item .classic .btn {
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 28rpx;
  color: #777;
}

</style>