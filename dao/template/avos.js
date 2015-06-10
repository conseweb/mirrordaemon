/**
 * Created by zoey on 2015/6/4.
 */
var config=require('../../config').config;
var AV;
var getAV=function(){
    if(!AV){
        AV = require('avoscloud-sdk').AV;
        AV.initialize(config.avos.app_id, config.avos.app_key);//wallpaper app
    }
    return AV;
}
exports.new=function(className){
    return getAV().Object.new(className);
}
exports.get=function(obj){
    return new getAV().Query(obj);
}
exports.query=function(sql,listen){
    getAV().Query.doCloudQuery(sql,listen);
}
exports.file={
    withURL:function(fileName,url){
        return new getAV().File.withURL(fileName, url);
    },
    createWithoutData:function(objectId){
        return getAV().File.createWithoutData(objectId);
    }
}