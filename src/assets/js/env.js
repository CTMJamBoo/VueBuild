const {NODE_ENV,VUE_APP_TYPE} = process.env
// 如果是开发环境，就取本地服务器路径，如果是线上环境，就取线上的服务器路径
const commonUrl = NODE_ENV == 'development' ? 'http://localhost:8888' : 'http://47.100.137.9:8888'
export {
    commonUrl,
    VUE_APP_TYPE
}