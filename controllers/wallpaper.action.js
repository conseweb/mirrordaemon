/**
 * Created by zoey on 2015/6/5.
 */
var wallpaper = require('../service/wallpaper.service');
var response = require('../common/response');
exports.save = function(req, res) {
    wallpaper.save(req.query,function(err){
        if(err){
            return res.json(response.buildError(err.message));
        }
        return res.json(response.buildOK());
    })
}
exports.latest = function(req, res) {
    wallpaper.latest(req.query,function(err,list){
        if(err){
            return res.json(response.buildError(err.message));
        }
        return res.json(response.buildOK(list));
    })
}
exports.search = function(req, res) {
    wallpaper.search(req.query,function(err,list){
        if(err){
            return res.json(response.buildError(err.message));
        }
        return res.json(response.buildOK(list));
    })
}
exports.tag = function(req, res) {
    wallpaper.tag(req.params.tag,function(err,list){
        if(err){
            return res.json(response.buildError(err.message));
        }
        return res.json(response.buildOK(list));
    })
}
exports.random = function(req, res) {
    wallpaper.random(function(err,list){
        if(err){
            return res.json(response.buildError(err.message));
        }
        return res.json(response.buildOK(list));
    })
}
