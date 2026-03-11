<template>
  <view class="container">
    <!-- 导航栏背景渐变蒙层 -->
    <view
      class="nav-bg-overlay"
      :style="{ opacity: navBgOpacity, height: navBarHeight ? navBarHeight + 'px' : '' }"
    ></view>
    <ik-custom-header
      theme="light"
      system-text-color
      extra-holder
      :transparent="true"
      title="活动规则"
      @navBarHeight="onNavBarHeight"
    />
    <scroll-view class="rule-page-scroll" scroll-y @scroll="onScroll">
      <view class="rule-body">
        <text class="rule-text">{{ ruleContent || '' }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navBgOpacity: 0,
      navBarHeight: 0,
      shareInfo: {
        path: '/pages-activity/315-scan/views/rule',
        title: '医美人有自己的小卡'
      },
      ruleContent: `欢迎来到「医美人有自己的小卡」活动，快来一起收集小卡和星星，兑换好物，安心医美吧！活动开始之前，请一定仔细阅读以下规则及说明哦！

一、活动时间
2026年x月xx日 12:00:00 -2026年x月xx日 12:00:00
二、玩法说明
本次活动包含集小卡与集星星两大玩法。“小卡”为品牌限定资产，用于收藏品牌专属图鉴；“星星”为活动礼品兑换积分。两者将在用户进行产品溯源且触发指定获取方式时同步发放，分别具有收藏价值与兑换权益。活动具体规则如下：
（一）集小卡玩法
a.获取方式：活动期间，用户首次扫描不同产品包装盒上的【产品溯源】二维码，即可点亮该产品的品牌专属“小卡”。
b.小卡种类：本次共设10款不同产品的品牌专属小卡（包含：嗨体小卡、嗨体熊猫小卡、冭活泡泡小卡、濡白天使小卡、如生天使小卡、熠光天使小卡、惟她天使小卡、宝尼达小卡、嗗科拉小卡、爱芙莱小卡）。
c.卡片管理：用户可进入活动首页查看已收集的卡片。
（二）集星星玩法
a.获取规则：首次成功扫描一盒爱美客旗下指定产品的【产品溯源】二维码溯源结果显示：【当前为第1次查询！您所查询的产品相关信息正确，感谢您的使用！】，即可获得1颗星星。
· 未获得星星的原因如下：
1.产品识别结果异常：【此产品已被多次查询！】、【产品序列号不存在！】、【产品序列号有误！】，视为溯源失败，无奖励。
2.产品识别结果不符合获取规则：【查询产品不在活动产品列表内（详见“三、活动产品列表”】、【查询次数为第2-5次（非首次）】，无奖励。
b.溯源渠道：用户可以通过【IMEIK爱+】小程序⾸⻚【产品溯源】或在本次活动页内点击【去扫码】进行产品溯源。
    c.星星用途：支持转赠好友或兑换礼品
  · 转赠好友：用户可通过【星星转赠】将指定数量的星星转赠给好友，转赠链接分享给好友并领取成功后实时扣除星星，此转赠链接24小时有效；若此转赠链接下的星星未在有效期内被领取，则星星将原路返还至该用户账户。
  ·【礼品兑换处】兑换礼品：
暂时无法在飞书文档外展示此内容
  *礼品内容具体以礼品兑换处实际展示内容为准。
三、活动产品列表
以下产品品牌均参与本次活动，扫描包装上的【产品溯源】二维码参与活动。
暂时无法在飞书文档外展示此内容
四、奖励说明
a. 奖励数量有限，先兑先得。
b. 符合兑换条件的用户可在【礼品兑换处】内进行兑换，完成地址填写并提交后，系统将扣除相应的星星数量。
c. 所有用户须在2026年x月xx日12:00:00前兑换完成，并准确、完整填写兑奖信息，一经提交，不支持修改；逾期未填写兑奖信息视为自动放弃。
d. 周边类奖励将在活动结束后（即2026年x月x日后），45个工作日内寄出，具体到货时间以物流公司信息为准；实物奖励不影响产品正常使用的情况下，主办方不进行奖品礼品退换；如有产品质量问题，请第一时间录制完整、清晰的开箱视频，在奖励签收后7天内前主动联系主办方，逾期将不进行奖品退换。
e. 所有实物奖励均以实物为准。
五、注意事项
1. 活动时间以主办方网络服务器时间为准。
2. 参与者在本活动中的基本信息(包括游戏排名、头像、昵称、语音、图片等)默认允许主办方或主办方指定的第三方在微信、小红书、抖音等自媒体平台进行展示和分享。
3. 参与者确认知悉，本活动的分享功能将展示本人及其他参与者在本活动中展示的基本信息(包括游戏排名、头像、昵称等)参与者默认允许主办方及其他参与者在使用分享功能时，展示以上基本信息。
4. 奖品不设退换、修改地址等服务，不兑现金。
5. 所有奖品均由主办方通过正规渠道进行采购，如对该奖品有任何疑问，请联系第三方供应商协商解决。
6. 如遇意外无法提供指定奖品，主办方有权以同等价值商品或服务替代。
7. 活动规则、奖励机制详见上述内容，兑奖方式以主会场指引为准。除主办方明确说明由主办方负担的费用，其他因参与活动所产生的费用由中奖者自行承担。
8. 活动期间，如中奖者逾期未提供、不提供兑奖信息，或兑奖信息有误，视同中奖者自动放弃获奖资格，主办方将不做任何赔偿也不承担其他责任。中奖者所提供的兑奖信息仅用在奖品发放用途。
9. 如发现参与者使用任何不正当手段(包括但不限于恶意注册、恶意套取资金、机器作弊、虚假交易、利用程序漏洞等违反诚实信用原则行为)参与活动，主办方有权在不事先通知的情况下取消其参与资格，并有权撤销相关违规交易和奖励，必要时追究法律责任。
10. 如因第三方问题或其他不可抗力的情况导致活动延期、中止、终止，主办方概不负责。
11. 因网络传输原因导致奖励讯息有误或延迟主办方不承担任何责任。
12. 在法律允许的情况下，活动解释权归主办方所有。
13. 本活动仅在IMEIK爱+小程序中进行，请勿相信任何非官方信息，警惕通过微信、QQ等方式主动联系的情况。`
    }
  },

  methods: {
    onScroll(e) {
      this.navBgOpacity = Math.min(e.detail.scrollTop / 48, 1)
    },

    onNavBarHeight(h) {
      this.navBarHeight = h || 0
    },

    $shareCallBack(type) {
      if (type === 'timeline') {
        this.report('315验真-活动分享-分享到朋友圈')
      } else {
        this.report('315验真-活动分享-分享到朋友')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/assets/315-scan/common.scss';

.nav-bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 997;
  background-color: #ffffff;
  pointer-events: none;
}

.container {
  font-family: 'SourceHanSans-Regular', sans-serif;
  min-height: 100vh;
  background: #fff;

  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

.rule-page-scroll {
  height: calc(100vh - 88rpx);
  padding: 0 32rpx;
}

.rule-body {
  padding: 32rpx 0 calc(60rpx + env(safe-area-inset-bottom));
}

.rule-text {
  display: block;
  color: #555;
  font-size: 28rpx;
  line-height: 1.9;
  white-space: pre-wrap;
}
</style>

