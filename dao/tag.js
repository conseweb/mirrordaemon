/**
 * Created by zoey on 2015/6/4.
 */
var avos = require('./template/avos');
/**
 * save
 * @param obj {name}
 * @param cb
 */
exports.save = function(data,cb){
    var obj = avos.new('tag');
    obj.save(data, {
        success: function(o) {
            cb(o)
        },error: function(o, error) {
            cb(o, error)
        }
    });
}
/*
exports.save({name:'aaa'},function(obj,err){
        if(err){
            console.log(err.message)
        }else{
            console.log(obj.id)
        }
    })
 */
