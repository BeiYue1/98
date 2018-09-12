module.exports = {
    devServer: {
        proxy: {
            '/dev': {
                target: 'http://console.98gongyi.com',
                changeOrigin: true,
                ws: true, 
                pathRewrite: {
                    '^/dev': ''
                }
            }
        }
    },
    assetsDir: 'static'
};