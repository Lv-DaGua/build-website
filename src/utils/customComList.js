const coms = [
  {
    id: 'c_1',
    name: 'carousel',
    title: '跑马灯',
    desc: '可循环播放内容',
    img: require('@/assets/com-c-1.png'),
    defaultOps: {
      cid: null,
      type: 'carousel',
      ops: {
        content: [
          'http://localhost:3000/images/default_carousel01.png',
          'http://localhost:3000/images/default_carousel02.png'
        ],
        style: {
          width: "500px",
          height: "300px",
          left: "24px",
          top: "24px",
          zIndex: null,
        }
      }
    }
  }
]

export default coms