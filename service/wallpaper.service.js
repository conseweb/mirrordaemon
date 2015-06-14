/**
 * Created by zoey on 2015/6/5.
 */
var tag = require('../dao/tag');
var tagmap = require('../dao/tagmap');
var wallpaper = require('../dao/wallpaper');
/**
 * save
 * @param wallpaper
 * {id,
    category, eg:General/Anime/People
    purity, SWF/Sketchy
    resolution, eg:1280x800
    size, 1.4 MiB
    uploadedby,
    create_time,
    source, eg:unknown/http://alpha.wallhaven.cc/latest
    thumb, 相对路径 eg:thumb/1.jpg
    full 相对路径 eg:full/1.jpg

    tags 标签 ,逗号分隔
    }
 */
exports.save = function(obj,cb) {
    wallpaper.save(obj,function(w,err){
        if(err){
            cb(err)
            console.log('wallpaper save:'+err.message)
        }else{
            obj.tags.split(',').forEach(function(tag_item){
                tag.save({name:tag_item}, function (t,err1) {
                    if(err1){
                        cb(err1)
                        console.log('tag save:'+err1.message)
                    }else{
                        tagmap.save({
                            tag_id: t.id,
                            wallpaper_id: w.id
                        }, function (tm,err2) {
                            if(err2){
                                cb(err2)
                                console.log('tag save:'+err2.message)
                            }
                        })
                    }
                })
            })
            cb(null,w)
        }
    })
}
exports.latest = function(obj,cb) {
    wallpaper.latest(obj,function(err,list){
        if(err){
            cb(err)
        }else{
            cb(null,list)
        }
    })
}
exports.search = function(obj,cb) {
    wallpaper.search(obj,function(err,list){
        if(err){
            cb(err)
        }else{
            cb(null,list)
        }
    })
}
/*
exports.save({
        category:'aa',// eg:General/Anime/People
        purity:'Sketchy',// SWF/Sketchy
        resolution:'1280x800',// eg:1280x800
        size:'1.4 MiB', //1.4 MiB
        source:'wallhaven.cc', //eg:unknown/http://alpha.wallhaven.cc/latest
        thumb:'thumb/1.jpg', //相对路径 eg:thumb/1.jpg
        full:'full/1.jpg', //相对路径 eg:full/1.jpg
        tags:'a,b,c'// 标签 ,逗号分隔
    },function(err,obj){
        if(err){
            console.log(err.message)
        }else{
            console.log(obj.id)
        }
})*/
