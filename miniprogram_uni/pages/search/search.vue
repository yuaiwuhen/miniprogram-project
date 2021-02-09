<template>
<view class="search-wrapper">
  <view class="search">
    <image src="/static/images/search.png"></image>
    <input :placeholder="'输入您要搜索的' + searchType" focus @input="bindKeyInput" @confirm="getList"></input>
    <text @tap="getList">搜索</text>
  </view>
  <view class="box">
      <view v-for="(item, index) in list" :key="index" class="item" :data-id="item._id" @tap="goDetail">
        <view class="item-inner" v-if="searchType == '成语'">
          <view>{{item.word}}</view>
          <text>{{item.explanation}}</text>
        </view>
        <view class="item-inner" v-else-if="searchType == '姓氏'">
          <view>{{item.name}}</view>
          <text>{{item.from}}</text>
        </view>
        <view class="item-inner" v-else-if="searchType == '古诗词' || searchType == '作者'">
          <view>{{item.name}}</view>
          <text>{{item.poet}}</text>
        </view>
        <view class="item-inner" v-else>
          <view>{{item.riddle}}</view>
          <text>{{item.answer}}</text>
        </view>

        <i class="wx-icon-custom-gengduo" v-if="searchType == '成语' || searchType == '姓氏' || searchType == '古诗词'"></i>
      </view>
      <view class="item loading" v-if="loading" style="text-align:center;">
        <image class src="/static/images/loading/loading-bars.svg" style="height: 60px;"></image>
      </view>
      <view class="bottom" v-if="isOver" style="text-align:center;font-size:24rpx;padding:30rpx;">
        <text style="color:#666;">--- 搜索结果为空 ---</text>
      </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      searchType: '',
      inputValue: '',
      list: [],
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
    let type = options.type;
    uni.setNavigationBarTitle({
      title: '搜索' + options.type
    });
    this.setData({
      searchType: options.type
    });
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
    bindKeyInput(e) {
      this.setData({
        inputValue: e.detail.value,
        isOver: false,
        list: []
      });
    },

    getList() {
      let {
        inputValue,
        searchType
      } = this;

      if (!inputValue) {
        return;
      }

      let database = '';
      let condition = {};

      switch (searchType) {
        case '成语':
          database = 'idiom2';
          condition = {
            word: {
              $regex: '.*' + inputValue,
              $options: 'i'
            }
          };
          break;

        case '姓氏':
          database = 'baijiaxing';
          condition = {
            name: {
              $regex: '.*' + inputValue,
              $options: 'i'
            }
          };
          break;

        case '古诗词':
          database = 'gushici';
          condition = {
            name: {
              $regex: '.*' + inputValue,
              $options: 'i'
            }
          };
          break;

        case '作者':
          database = 'gushici';
          condition = {
            poet: {
              $regex: '.*' + inputValue,
              $options: 'i'
            }
          };
          break;

        default:
          database = 'xiehouyu';
          condition = {
            riddle: {
              $regex: '.*' + inputValue,
              $options: 'i'
            }
          };
          break;
      }

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
            database,
            page,
            num,
            condition
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
              loading: false
            });
          }
        }).catch(console.error);
      }
    },

    goDetail(e) {
      let _id = e.currentTarget.dataset.id;
      let {
        searchType
      } = this;
      let database = '';

      switch (searchType) {
        case '成语':
          database = 'idiom-detail';
          break;

        case '姓氏':
          database = 'baijiaxing-detail';
          break;

        case '古诗词':
          database = 'detail';
          break;

        case '作者':
          database = 'detail';
          break;

        default:
          return false;
      }

      uni.navigateTo({
        url: `/pages/${database}/${database}?id=${_id}`
      });
    }

  }
};
</script>
<style>
/* miniprogram/pages/search/search.wxss */
.search-wrapper {
  padding: 30rpx;
  height: 100%;
}

.search {
  box-sizing: border-box;
  border-radius: 50rpx;
  height: 80rpx;
  padding: 0 0 0 20rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 28rpx;
  border: 1px solid rgba(255, 98, 98, .7);
}

.search image {
  height: 36rpx;
  width: 36rpx;
  margin-right: 20rpx;
}

input {
  border: none;
  flex: 1;
}

.search text {
  padding: 20rpx 40rpx 20rpx 30rpx;
  background: #ff6262;
  color: #fff;
  border-top-right-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
}

.history {
  margin-top: 30rpx;
  font-size: 28rpx;
  padding: 30rpx;
  color: #555;
  position: relative;
}

.history view {
  margin-top: 40rpx;
  display: flex;
  flex-wrap: wrap;
}

.history .title {
  color: #ff6262;
}

.history view text {
  border: 1px solid #ddd;
  padding: 8rpx 50rpx;
  border-radius: 40rpx;
  margin: 20rpx 30rpx 20rpx 0;
}

.clear {
  color: #888;
  position: absolute;
  right: 30rpx;
  top: 30rpx;
}

.box {
  padding: 30rpx 0;
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