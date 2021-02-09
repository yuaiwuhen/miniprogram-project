<template>
<view>
<scroll-view scroll-y="true" style="height:100%;" lower-threshold="50" @scrolltolower="lower">
  <view class="idiom">
    <view class="top">
      <text></text>
      <view class="search" data-type="成语" @tap="goSearch">
        <image src="/static/images/search.png"></image>
        <input placeholder="搜索一下" disabled></input>
      </view>
    </view>
    <view class="box">
      <view class="alphabeta">
        <text v-for="(item, index) in alphabeta" :key="index" :data-letter="item" @tap="getLetterList">{{item}}</text>
      </view>
      <view class="goJielong">
        <button type @tap="goJielong">挑战成语接龙</button>
      </view>
      <view v-for="(item, index) in list" :key="index" class="item" :data-id="item._id" @tap="goDetail">
        <view class="item-inner">
          <view>{{item.word}}</view>
          <text>{{item.explanation}}</text>
        </view>
        <i class="wx-icon-custom-gengduo"></i>
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

<script>

export default {
  data() {
    return {
      alphabeta: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      thisLetter: '',
      list: [],
      sentence: {},
      sentencePage: 50,
      page: 1,
      num: 10,
      loading: false,
      isOver: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList('');
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    lower(e) {
      if (!this.loading) {
        this.getList(this.thisLetter);
      }
    },

    getLetterList(e) {
      let letter = e.currentTarget.dataset.letter;
      this.setData({
        isOver: false,
        list: [],
        page: 1,
        thisLetter: letter
      });
      this.getList(letter);
    },

    getList(letter) {
      if (!this.isOver) {
        let {
          list,
          page,
          num
        } = this;
        let that = this;
        this.setData({
          loading: true
        });
        uni.cloud.callFunction({
          name: 'collection_get',
          data: {
            database: 'idiom2',
            page,
            num,
            condition: {
              abbreviation: {
                $regex: '^' + letter,
                $options: 'i'
              }
            }
          }
        }).then(res => {
          if (!res.result.data.length) {
            that.setData({
              loading: false,
              isOver: true
            });
          } else {
            let res_data = res.result.data;
            list.push(...res_data);
            that.setData({
              list,
              page: page + 1,
              loading: false
            });
          }
        }).catch(console.error);
      }
    },

    goDetail(e) {
      let _id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: `/pages/idiom-detail/idiom-detail?id=${_id}`
      });
    },

    goSearch(e) {
      let type = e.currentTarget.dataset.type;
      uni.navigateTo({
        url: `/pages/search/search?type=${type}`
      });
    },

    goJielong(e) {
      uni.switchTab({
        url: `/pages/find/find`
      });
    }

  }
};
</script>
<style>

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
.alphabeta {
  background: #fff;
  padding: 10rpx;
  margin-bottom: 10rpx;
  text-align: center;
}
.alphabeta text {
  display: inline-block;
  line-height: 60rpx;
  width: 60rpx;
  text-align: center;
  border: 1px solid #FF6262;
  border-radius: 50%;
  margin: 10rpx;
  color: #555;
  font-size: 28rpx;
}
.goJielong button {
  font-size: 30rpx;
  color: #FF6262;
  border: 1px solid #FF6262;
}
.box {
  padding: 30rpx 20rpx;
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
  flex-direction: column;
  justify-content: space-around;
}

.box .item-inner view {
  background: #fff;
  font-size: 30rpx;
  color: #333;
  padding-left: 20rpx;
  line-height: 1.7;
}
.box .item-inner text {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 20rpx;
}

</style>