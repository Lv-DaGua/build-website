const coms = [
  {
    id: 1,
    name: 'container',
    title: '普通容器',
    desc: '可自由定制容器块的宽度，高度，背景颜色等等..',
    img: require('@/assets/logo.png'),
    defaultOps: {
      cid: null,
      type: 'container',
      ops: {
        text: '我是一个普通容器',
        style: {
          background: '#fff',
          border: '1px solid #DCDFE6',
          width: "200px",
          height: "100px",
          padding: '8px',
          left: "45vw",
          top: "45vh",
          zIndex: null,
        }
      }
    }
  },
]

export default coms