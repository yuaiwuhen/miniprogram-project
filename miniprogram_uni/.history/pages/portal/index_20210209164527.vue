<template>
<!-- index.wxml -->
<view class="container">
<view class="sentence_one center">
    <view v-if="sentence._id" :data-id="sentence._id" @tap="goDetail">
      <text class="poet_one">{{sentence.cont}}</text>
      <text class="poem_author">{{sentence.name}} - {{sentence.dynasty}} {{sentence.poet}}</text>
      </view>
  </view>
</view>
</template>

<script>
//index.js
const app = getApp();
const regeneratorRuntime = require("../../lib/regenerator-runtime/runtime.js");

export default {
  data() {
    return {
      y:0,
      isClose: true,
      //判断当前页面是打开还是返回页
      avatarUrl: "/static/pages/index/user-unlogin.png",
      userInfo: {},
      logged: false,
      list: [],
      sentence: {_id:1,cont:'欲话毗陵君反袂，欲言夏口我沾衣。\n谁知临老相逢日，悲叹声多语笑稀。',name:'礼拜',dynasty:'唐', poet:'范德萨范德萨发'},
      page: 2,
      num: 5,
      loading: false,
      isOver: false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    // this.getSentence();
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
    onChange: function(e) {
      console.log(e)
            this.x = e.detail.x
            this.y = e.detail.y
        },
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
.poem_author{
  text-align:right;
  margin: 0 auto;  
  float:left;
  writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/  
  writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
}
.center {
    position: fixed;
    top: 10%;
    left: 8%;
    width: 80%;
    height: 80%;
    -webkit-transform: translateX(-50%) translateY(-50%);
}
.container{
  height:100%;
  width:100%;
  background: url('https://jkfan.cn/uploads/image/2021/February/8/88dRjBqn.jpg');
  background-size:cover;
}
.poet_one{
  margin: 0 auto;  
  float:left;
  writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/  
  writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
  text-align-last: justify;
  line-height: 100rpx;
}
.sentence_one {
    padding: 30rpx 20rpx;
    background: rgba(255,255,255,0.8);
    height: 80%;
    width: 80%;
    text-align: center;
    font-size: 40rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    overflow: hidden;
    color: #333;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;;
}
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