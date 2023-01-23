/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api': { // 遇见/api/前缀的请求，就会触发该代理配置
      // 要代理的地址
      target: 'http://localhost:8080', // 前端正向代理，请求http://localhost:8000/api就能到达http://localhost:8080
      // 正向代理：替客户端向服务器发送请求
      // 反向代理：替服务器接收请求

      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true, // 控制服务器受到的请求头中Host的值，为true就是从代理的地址服务器发出的8080
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      // 重写请求路径，将^(正则匹配)后面的路径替换成空字符串才能从真正的路径请求信息
      // 请求的是localhost:8000/api/，但是真正的请求是localhost:8080/api/，这样不能请求到东西，要把/api替换掉
      // 变成localhost:8080/
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
