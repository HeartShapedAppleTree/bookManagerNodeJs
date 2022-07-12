
const db=require('../db/index')

exports.getUserInfo=function(req,res){
    db.query('select * from ev_users where id = ?',req.body.id,(err,results)=>{
        if(err){
          return  res.cc(err)
        }
        if(results.length!==1)return res.cc('用户信息查询失败')
        res.send({status:0,message:'查询成功',data:results[0]})
    })
}

exports.updateUserInfo=function(req,res){

    db.query('update ev_users set ? where id=?',[req.body,req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows!=1) return res.cc('修改用户信息失败')
        res.cc('更新成功',0)
    })
}