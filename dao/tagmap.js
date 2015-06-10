/**
 * Created by zoey on 2015/6/4.
 */
var avos = require('./template/avos');
/**
 * save
 * @param obj  {tag_id,wallpaper_id}
 * @param cb
 */
exports.save = function(data,cb){
    var obj = avos.new('tagmap');
    obj.save(data, {
        success: function(o) {
            cb(o)
        },error: function(o, error) {
            cb(o, error)
        }
    });
}