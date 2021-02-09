<template>
<view class="about">
  <view class="item">
    <image src="/static/images/logo.png"></image>
    <view>诗词古语</view>
  </view>

  <view class="bottom">
    Copyright © 2019-2020 Cedric. All Rights Reserved
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
.about {
  height: 100%;
  padding: 0 30rpx;
  position: relative;
  font-size: 24rpx;
}
.item {
  text-align: center;
  font-size: 32rpx;
  padding-top: 50%;
}
image {
  height: 160rpx;
  width: 160rpx;
  border-radius: 50%;
}
.item view {
  padding-top: 30rpx;
}
.bottom {
  position: absolute;
  bottom: 20rpx;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>