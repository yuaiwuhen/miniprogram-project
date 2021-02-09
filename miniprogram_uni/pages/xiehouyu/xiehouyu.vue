<template>
<view>
<scroll-view scroll-y="true" style="height:100%;" lower-threshold="50" @scrolltolower="lower">
  <view class="idiom">
    <view class="top">
      <text></text>
      <view class="search" data-type="歇后语" @tap="goSearch">
        <image src="/static/images/search.png"></image>
        <input placeholder="搜索一下" disabled></input>
      </view>
    </view>
    <view class="box">
      <view v-for="(item, index) in list" :key="index" class="item">
        <view class="item-inner">
          <view>{{item.riddle}}</view>
          <text>{{item.answer}}</text>
        </view>
      </view>
      <view class="item loading" v-if="loading" style="text-align:center;">
        <image class src="/static/images/loading/loading-bars.svg" style="height: 60px;"></image>
      </view>
      <view class="bottom" v-if="isOver" style="text-align:center;font-size:24rpx;padding:30rpx;">
        <text style="color:#666;">--- 我是有底线的 ---</text>
      </view>
    </view>
  </view>
</scroll-view>
</view>
</template>

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sentence: {},
    sentencePage: 50,  页码
    page: 1,
    num: 10,
    loading: false,
    isOver: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },


  lower(e) {
    if (!this.data.loading) {
      this.getList()
    }
  },

  getList() {
    if (!this.data.isOver) {
      let { list, page, num } = this.data
      let that = this
      this.setData({
        loading: true
      })
      wx.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'xiehouyu',
          page,
          num,
          condition: {}
        },
      }).then(res => {
        if (!res.result.data.length) {
          that.setData({
            loading: false,
            isOver: true
          })
        } else {
          let res_data = res.result.data
          list.push(...res_data)
          that.setData({
            list,
            page: page + 1,
            loading: false
          })
        }
      })
        .catch(console.error)
    }
  },

  goSearch (e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/search/search?type=${type}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})<style>

.top {
  background: #FF6262;
  position: relative;
  padding: 30rpx 20rpx;
}

.top .search {
  border: 1px solid #fff;
  box-sizing: border-box;
  border-radius: 30rpx;
  height: 60rpx;
  padding: 0 20rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 28rpx;

}

.top .search image {
  height: 36rpx;
  width: 36rpx;
  margin-right: 20rpx;
}

.top input {
  border: none;
  flex: 1;
}

.box {
  padding: 30rpx 20rpx;
}

.box .item {
  position: relative;
  background: #fff;
  height: 140rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}

.box .item-inner {
  height: 120rpx;
  font-size: 28rpx;
  color: #555;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.box .item-inner view {
  background: #fff;
  font-size: 32rpx;
  color: #333;
  padding-left: 30rpx;
  line-height: 1.7;
}

.box .item-inner text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 30rpx;
  display: block;
  text-align: right;
}
</style>