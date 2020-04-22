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
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#DCDFE6',
          borderRadius: '0px',
          width: "200px",
          height: "100px",
          padding: '8px',
          left: "45%",
          top: "45%",
          textAlign: 'left',
          color: '#2c3e50',
          fontSize: '16px',
          fontWeight: 'normal',
          zIndex: null,
        }
      }
    }
  },
  {
    id: 2,
    name: 'textContainer',
    title: '文本框',
    desc: '可在页面上随意添加文本信息',
    img: require('@/assets/logo.png'),
    defaultOps: {
      cid: null,
      type: 'textContainer',
      ops: {
        text: '文本内容..',
        style: {
          display: 'inline-block',
          background: 'transparent',
          left: "45%",
          top: "45%",
          textAlign: 'left',
          color: '#2c3e50',
          fontSize: '16px',
          fontWeight: 'normal',
          zIndex: null,
        }
      }
    }
  },
  {
    id: 3,
    name: 'imgContainer',
    title: '图片框',
    desc: '可在页面上展示图片',
    img: require('@/assets/logo.png'),
    defaultOps: {
      cid: null,
      type: 'imgContainer',
      ops: {
        text: '',
        url: 'http://localhost:3000/images/defaultImg.png',
        style: {
          width: '200px',
          height: '200px',
          display: 'block',
          background: 'transparent',
          left: "45%",
          top: "45%",
          borderRadius: '0px',
          opacity: 1,
          zIndex: null,
        }
      }
    }
  },
]

export default coms