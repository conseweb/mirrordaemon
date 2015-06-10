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