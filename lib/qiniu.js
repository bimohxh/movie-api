var qiniu = require("qiniu")

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key'
qiniu.conf.SECRET_KEY = 'Secret_Key'

//要上传的空间
bucket = 'movie';





//key = `${Date.now()}-${filename}`

// 


// //生成上传 Token

var qiniu = {
    //构建上传策略函数
     uptoken: (bucket, filename)=> {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+filename)
        return putPolicy.token();
    },
    
    upload: (localFile) => {
        // //上传到七牛后保存的文件名
        let filename = `${Date.now()}.png`
        let token = qiniu.uptoken(bucket, filename);
        var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(token, filename, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);       
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
}




module.exports = qiniu;