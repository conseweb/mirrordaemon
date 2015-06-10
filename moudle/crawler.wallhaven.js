/**
 * Created by zoey on 2015/6/4.
 */
/**
 * 列表页http://alpha.wallhaven.cc/latest?page=1
 * 详情页http://alpha.wallhaven.cc/wallpaper/100000
 */
var cheerio = require("cheerio");
var util = require("../common/util");
var wallpaper = require('../service/wallpaper.service');
var avos = require('../dao/template/avos');
var host='alpha.wallhaven.cc';
exports.crawler_leaf=function(start,length){
    for(var i = start; i < (start+length); i++) {
        (function (index) {
            var baseOptions = {
                host: host,
                path: '/latest?page='+index
            };
            util.get(baseOptions,function(data){
                if(data.trim()!=''){
                    analyze_leaf(data,function(unitUrls){
//                        console.log(unitUrls)
                    })
                }
            })
        })(i);
    }
}
var analyze_leaf=function(data,cb){
    var $ = cheerio.load(data);
    var list=$('figure');
    var unitUrls=[];
    list.each(function(index,ele){
        var img=$('img',this);
        var thumb=$(img).attr('data-src');
        var unit=$('.preview',this).attr('href');
//        console.log('**************');
//        console.log(unit);
//        console.log(thumb);
        crawler_unit(unit,thumb);
    })
}
exports.crawler_leaf(1,1)
var crawler_unit=function(url,thumb){
    var baseOptions = {
        host: host,
        path: url
    };

    util.get(baseOptions,function(data){
        if(data.trim()!=''){
            analyze_unit(data,url,thumb)
        }
    })
}
//crawler_unit('/wallpaper/76501','http://alpha.wallhaven.cc/wallpapers/thumb/small/th-218123.jpg')
var analyze_unit=function(data,url,thumb){
    var $ = cheerio.load(data);
    var  title=$('title').text();
    var  purity=$('#wallpaper-purity-form').text();
    var tagname_list=[];
    var list_tag=$('#tags li');
    list_tag.each(function (index,el) {
        var tmp=$(this).text();
        tagname_list.push(tmp);
    })
    var list_dd=$('dl dd');
    var dd_list=[];
    list_dd.each(function (index,el) {
        var tmp=$(this).text();
        dd_list.push(tmp);
    })
    var resolution=dd_list[0];
    var size=dd_list[1];
    var category=dd_list[2];
    var img_src=$('#wallpaper')["0"]["attribs"]["src"];
    wallpaper.save({
        category:category,// eg:General/Anime/People
        purity:purity,// SWF/Sketchy
        resolution:resolution,// eg:1280x800
        size:size, //1.4 MiB
        source:'wallhaven.cc', //eg:unknown/http://alpha.wallhaven.cc/latest
        tags:tagname_list.join(",")// 标签 ,逗号分隔
    },function(err,obj){
        if(err){
            console.log(err.message)
        }else{
            console.log(thumb)
            console.log(img_src)
            avos.file.withURL('thumb-'+obj.id+'.jpg', thumb).save();
            avos.file.withURL('full-'+obj.id+'.jpg', img_src).save();
        }
    })
}