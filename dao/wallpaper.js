/**
 * Created by zoey on 2015/6/4.
 */
var avos = require('./template/avos');
/**
 * save
 * @param obj
    {id,
    category, eg:General/Anime/People
    purity, SWF/Sketchy
    resolution, eg:1280x800
    size, 1.4 MiB
    uploadedby,
    create_time,
    source, eg:unknown/http://alpha.wallhaven.cc/latest
//    thumb, 相对路径 eg:thumb/1.jpg
//    full 相对路径 eg:full/1.jpg
    }
 * @param cb
 */

exports.save = function(data,cb){
    var obj = avos.new('wallpaper');
    obj.save(data, {
        success: function(o) {
            cb(o)
        },error: function(o, error) {
            cb(o, error)
        }
    });
}
exports.latest = function(data,cb){
    var obj = avos.query('select * from wallpaper limit 0,20 order by createdAt asc',{
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            cb(null,results)
        },
        error: function(error){
            //查询失败，查看 error
            console.dir(error)
            cb(error)
        }
    });
}
exports.search = function(data,cb){
    var like="";
    for(var i=0;i<data.tag.split(" ").length;i++){
        if(i>0){
            like+=" or ";
        }
        like+=" name like '%"+data.tag.split(" ")[i]+"%'";
    }
    var sql1="select objectId from tag where "+like;
    var obj = avos.query(sql1,{
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            var tag_ids="";
            for(var i=0;i<results.length;i++){
                if(i>0){
                    tag_ids+=" or ";
                }
                tag_ids+=" tag_id='"+results[i].id+"' ";
            }
//            var sql2="select * from wallpaper where objectId in(select wallpaper_id from tagmap where tag_id='5577b6f9e4b00ff508c17781'  or  tag_id='5577b6f9e4b00ff508c17782'";
            var sql2="select * from tagmap where "+tag_ids;
            console.log(sql2);
            var obj1 = avos.query(sql2, {
                success: function (result1) {
                    //results 是查询返回的结果，AV.Object 列表
                    var results1 = result1.results;
                    var wp_ids="";
                    for(var i=0;i<results1.length;i++){
                        if(i>0){
                            wp_ids+=" or ";
                        }
                        wp_ids+=" objectId='"+results1[i].attributes.wallpaper_id+"' ";
                    }
                    var sql3="select * from wallpaper where "+wp_ids;
                    var obj2 = avos.query(sql3, {
                        success: function (result2) {
                            var results2 = result2.results;
                            cb(null, results2)
                        },
                        error: function (error) {
                            //查询失败，查看 error
                            console.dir(error)
                            cb(error)
                        }
                    });
                },
                error: function(error){
                    //查询失败，查看 error
                    console.dir(error)
                    cb(error)
                }
            });
        },
        error: function(error){
            //查询失败，查看 error
            console.dir(error)
            cb(error)
        }
    });
}

exports.tag = function(tag,cb){
    var sql1="select objectId from tag where name='"+tag+"'";
    var obj = avos.query(sql1,{
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            if(results.length==0){
                return cb(null, {});
            }
            var tag_ids="";
            for(var i=0;i<results.length;i++){
                if(i>0){
                    tag_ids+=" or ";
                }
                tag_ids+=" tag_id='"+results[i].id+"' ";
            }
//            var sql2="select * from wallpaper where objectId in(select wallpaper_id from tagmap where tag_id='5577b6f9e4b00ff508c17781'  or  tag_id='5577b6f9e4b00ff508c17782'";
            var sql2="select * from tagmap where "+tag_ids;
            console.log(sql2);
            var obj1 = avos.query(sql2, {
                success: function (result1) {
                    //results 是查询返回的结果，AV.Object 列表
                    var results1 = result1.results;
                    if(results1.length==0){
                        return cb(null, {});
                    }
                    var wp_ids="";
                    for(var i=0;i<results1.length;i++){
                        if(i>0){
                            wp_ids+=" or ";
                        }
                        wp_ids+=" objectId='"+results1[i].attributes.wallpaper_id+"' ";
                    }
                    var sql3="select * from wallpaper where "+wp_ids;
                    var obj2 = avos.query(sql3, {
                        success: function (result2) {
                            var results2 = result2.results;
                            cb(null, results2)
                        },
                        error: function (error) {
                            //查询失败，查看 error
                            console.dir(error)
                            cb(error)
                        }
                    });
                },
                error: function(error){
                    //查询失败，查看 error
                    console.dir(error)
                    cb(error)
                }
            });
        },
        error: function(error){
            //查询失败，查看 error
            console.dir(error)
            cb(error)
        }
    });
}
exports.total = function(cb){
    var obj = avos.query('select count(*) from wallpaper',{
        success: function(result) {
            cb(null,result.count)
        },
        error: function(error) {
            console.log(error)
            cb(error)
        }
    });
}
exports.skip = function(skip,cb){
    var obj = avos.query('select * from wallpaper limit '+skip+',1',{
        success: function(result) {
            cb(null,result.results)
        },
        error: function(error) {
            cb(error)
        }
    });
}