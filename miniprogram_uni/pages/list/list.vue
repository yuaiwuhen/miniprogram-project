<template>
<!-- miniprogram/pages/list/list.wxml -->
<scroll-view scroll-y="true" style="height:100%;" lower-threshold="50" @scrolltolower="lower">
  <view class="choiceness">
    <view v-for="(item, index) in list" :key="index" class="box" :data-id="item.id" @tap="goDetail">
      <text class="title">{{item.title}}</text>
      <text class="poet">{{item.content}}</text>
      <view class="name-like">
        <text class="name">{{item.dynasty}} {{item.author_name}}</text>
        <view class="like">
          <!--<text>{{item.opened}} 人浏览</text>>-->
        </view>
      </view>
    </view>
    <view class="box loading" v-if="loading" style="text-align:center;">
      <image class src="/static/images/loading/loading-bars.svg" style="height: 60px;"></image>
    </view>
    <view class="bottom" v-if="isOver" style="text-align:center;font-size:24rpx;padding:30rpx;">
      <text style="color:#666;">--- 我是有底线的 ---</text>
    </view>
  </view>
</scroll-view>
</template>

<script>
import { getPoems } from '@/api/poem.js';

export default {
  data() {
    return {
      parenttags: '',
      tags: '',
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
    uni.setNavigationBarTitle({
      title: options.tags //页面标题为路由参数

    });
    this.setData({
      tags: options.tags,
      parenttags: options.parenttags
    });
    this.loadList(options.tags);
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
    lower() {
      this.loadList(this.tags);
    },

    loadList(tags) {
      if (!this.isOver) {
        let {
          parenttags,
          list,
          page,
          num
        } = this;
        let that = this;
        let condition = {};
        console.log(parenttags, tags)
        this.setData({
          loading: true
        });
        getPoems({type:parenttags,id:tags}).then(res => {
          console.log(res)
          if (!res.data.data.length) {
            that.setData({
              loading: false,
              isOver: true
            });
          } else {
            let res_data = res.data.data;
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
      uni.cloud.callFunction({
        name: 'collection_update',
        data: {
          id: _id
        }
      }).then(res => {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
        });
      }).catch(console.error);
    }

  }
};
</script>
<style>
.choiceness {
  margin: 40rpx 30rpx;
}

.choiceness .title {
  font-size: 32rpx;
  text-align: center;
  display: block;
  color: #ff6666;
}

.choiceness view.box {
  padding: 30rpx 20rpx;
  margin-bottom: 24rpx;
  background: #fff;
  height: 220rpx;
  line-height: 1.6;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
}

.choiceness view.box .poet {
  text-overflow: -o-ellipsis-lastline;
  /* height: 38%; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  color: #666;
  text-align:center;
  vertical-align:middle;
  display:table-cell;
}

.choiceness view.box .name-like {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.choiceness view.box .name-like .name {
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.choiceness view.box .name-like .like {
  font-size: 24rpx;
  color: #f79b9b;
}
</style>