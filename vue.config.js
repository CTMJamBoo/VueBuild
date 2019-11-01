module.exports = {
    publicPath: process.env.NODE_ENV == 'development' ? '/' : '',
    devServer: {
        proxy: {
            //当你的请求路径是/lijiang/api/goods.list
            //实际的请求路径是target+'/lijiang/api/goods.list'
            //然后使用pathRewrite将/lijiang/api转换为空
            // 所以最用的请求路径就是target+'goods/list/
            '/lijiang/api': {
                target: 'https://www.muji.com.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/lijiang/api': ''
                }
            },
            // 其他代理接口
            '/native/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/native/api': ''
                }
            }
        }
    }
}