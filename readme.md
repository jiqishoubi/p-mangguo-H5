uni.uploadFile ios eggjs传视频的问题

1、ios的视频格式与安卓不同，需要在eggjs配置格式whitelist

2、formdata中添加 _csrf: 'safe'参数

3、增加一个fileType: 'video'参数，文档上平台差异（支付宝）

4、文档上说 "Content-type": "multipart/form-data"，但是不能写到header里

5、最后有可能是hbuilderx编译器的问题