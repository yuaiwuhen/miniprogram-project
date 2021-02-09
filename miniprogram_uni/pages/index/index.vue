<template>
<!-- index.wxml -->
<scroll-view scroll-y="true" style="height:100%;" lower-threshold="50" @scrolltolower="lower">
  <view class="command">
    <navigator url="/pages/idiom/idiom" open-type="navigate">
      <image class src="/static/images/home/chengyu4.png" mode="aspectFit"></image>
    </navigator>
    <navigator url="/pages/menu/menu" open-type="switchTab">
      <image class src="/static/images/home/shici4.png"></image>
    </navigator>
    <navigator url="/pages/baijiaxing/baijiaxing" open-type="navigate">
      <image class src="/static/images/home/baijiaxing4.png"></image>
    </navigator>
    <navigator url="/pages/xiehouyu/xiehouyu" open-type="navigate">
      <image class src="/static/images/home/xiehouyu4.png"></image>
    </navigator>
    <navigator url="/pages/miyu/miyu" open-type="navigate">
      <image class src="/static/images/home/miyu4.png"></image>
    </navigator>
  </view>
  <view class="sentence">
    <text class="title">每日一句</text>
    <view v-if="sentence._id" :data-id="sentence._id" @tap="goDetail">
      <text class="poet">{{sentence.cont}}</text>
      <text class="name">{{sentence.name}} - {{sentence.dynasty}} {{sentence.poet}}</text>
    </view>
    <view v-if="!sentence._id" style="text-align:center;">
      <image class src="/static/images/loading/loading-bars.svg" style="height: 60px;"></image>
    </view>
  </view>
  <view class="choiceness">
    <text class="title">诗词精选</text>
    <view v-for="(item, index) in list" :key="index" class="box" :data-id="item._id" @tap="goDetail">
      <text class="poet">{{item.content[0]}}{{item.content[1]}}</text>
      <view class="name-like">
        <text class="name">{{item.name}} - {{item.dynasty}} {{item.poet}}</text>
        <view class="like">
          <text>{{item.opened}} 人浏览</text>
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
//index.js
const app = getApp();
const regeneratorRuntime = require("../../lib/regenerator-runtime/runtime.js");

export default {
  data() {
    return {
      isClose: true,
      //判断当前页面是打开还是返回页
      avatarUrl: "/static/pages/index/user-unlogin.png",
      userInfo: {},
      logged: false,
      list: [],
      sentence: {},
      page: 2,
      num: 5,
      loading: false,
      isOver: false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.getSentence();
    this.getList();
  },

  onShareAppMessage(res) {
    return {
      title: '一起欣赏诗词之美',
      path: `pages/index/index`
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },
  methods: {
    async getSentence() {
      let sentencePage = await this.asyncGetSentencePage();
      let res = await this.asyncGetSentence(sentencePage);
      let {
        _id,
        content,
        dynasty,
        name,
        poet
      } = res.data[0];
      let cont = '';

      if (content.length == 2) {
        cont = content[0] + content[1];
      } else {
        cont = content.slice(-2, -1)[0];
      }

      this.setData({
        sentence: {
          _id,
          cont,
          dynasty,
          name,
          poet
        }
      });
    },

    asyncGetSentence(page) {
      const db = uni.cloud.database();
      const _ = db.command;
      return new Promise((resolve, reject) => {
        db.collection('gushici').where({
          type: _.in(['诗', '词'])
        }).skip(page).limit(1).get({
          success(res) {
            uni.hideLoading();
            resolve(res);
          },

          fail(err) {
            reject(err);
          }

        });
      });
    },

    asyncGetSentencePage() {
      return new Promise((resolve, reject) => {
        uni.cloud.callFunction({
          name: 'collection_get',
          data: {
            database: 'gushici_data',
            page: 1,
            num: 1,
            condition: {
              type: 'setencePage'
            }
          }
        }).then(res => {
          let pageNum = res.result.data[0].pageNum;
          resolve(pageNum);
        }).catch(err => {
          reject(err);
        });
      });
    },

    lower(e) {
      if (!this.loading) {
        this.getList();
      }
    },

    getList() {
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
        // uni.cloud.callFunction({
        //   name: 'collection_get',
        //   data: {
        //     database: 'gushici',
        //     page,
        //     num,
        //     condition: {
        //       tags: '唐诗三百首'
        //     }
        //   }
        // }).then(res => {
        //   if (!res.result.data.length) {
        //     that.setData({
        //       loading: false,
        //       isOver: true
        //     });
        //   } else {
        //     let res_data = res.result.data;
        //     list.push(...res_data);
        //     that.setData({
        //       list,
        //       page: page + 1,
        //       loading: false
        //     });
        //   }
        // }).catch(console.error);
      }
    },

    goDetail(e) {
      let _id = e.currentTarget.dataset.id;
      // uni.cloud.callFunction({
      //   name: 'collection_update',
      //   data: {
      //     id: _id
      //   }
      // }).then(res => {
      //   this.setData({
      //     isClose: false
      //   });
      //   uni.navigateTo({
      //     url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
      //   });
      // }).catch(console.error);
    }

  }
};
</script>
<style>

.command {
  height: 320rpx;
  padding: 30rpx 30rpx 10rpx 30rpx;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.command navigator {
  background: linear-gradient(#FF6262, #e83524);
  /* border: 1px solid #fff; */
  box-shadow: 1px 1px 5px #720202;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180rpx;
  width: 15%;
  font-size: 30rpx;
}
.command navigator image {
  height: 80%;
}

.sentence {
  margin: 40rpx 30rpx;
}
.sentence .title {
  font-size: 36rpx;
  text-align: center;
  display: block;
  color: #ff6666;
}
.sentence view {
  padding: 30rpx 20rpx;
  margin-top: 24rpx;
  background: #fff;
  height: 140rpx;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
}
.sentence view .poet {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  color: #555;
}
.sentence view .name {
  text-align: right;
}

.choiceness {
  margin: 40rpx 30rpx;
}
.choiceness .title {
  font-size: 36rpx;
  text-align: center;
  display: block;
  color: #ff6666;
}
.choiceness view.box {
  padding: 30rpx 20rpx;
  margin-top: 24rpx;
  background: #fff;
  height: 180rpx;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
}
.choiceness view.box .poet {
  text-overflow: -o-ellipsis-lastline;
  height:46%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  color: #666;
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
  color: #f77373;
}
.choiceness view.box .name-like .like i {
  color: #ff6666;
}


</style>