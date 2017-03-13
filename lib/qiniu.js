var qiniu = require('qiniu')

// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = process.env.qiniu_access_key
qiniu.conf.SECRET_KEY = process.env.qiniu_secret_key

// 要上传的空间
let bucket = 'movie'

let qiniuAPI = {

  // 构建上传策略函数
  uptoken: (filename) => {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + filename)
    return putPolicy.token()
  },

  upload: (localFile) => {
    return new Promise(resolve => {
        let filename = `${Date.now()}.png`
        let token = qiniu.uptoken(bucket, filename);
        var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(token, filename, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);    
                resolve(true)   
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
                resolve(false)
            }
        });
    })
  }
}




module.exports = qiniuAPI