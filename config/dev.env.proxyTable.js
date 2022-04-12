const proxyTableList = [
  { prefix: '/testa', target: 'https://fuwu-testa.qjdchina.com' },
  { prefix: '/pres', target: 'https://fuwu-pre.qjdchina.com' },
  { prefix: '/online', target: 'https://fuwu.qjdchina.com' },
  { prefix: '/test-project', target: 'https://saas-test-project.qjdidc.com' },
  { prefix: '/yanshi', target: 'https://fuwu-yanshi.qjdchina.com' },
  { prefix: '/beta', target: 'https://fuwu-beta.qjdchina.com' },
  // { prefix: '/local', target: 'http://10.1.59.62:8089' },
]
const proxyTable = {}
proxyTableList.forEach(item => {
  proxyTable[`^${item.prefix}`] = {
    target: item.target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      [`^${item.prefix}`]: ''
    }
  }
})

module.exports = proxyTable
