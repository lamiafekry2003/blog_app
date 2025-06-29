import connection from '../../DB/connection.js'

export const createBlog = (req,res,next)=>{
    const {title,content,user_id} = req.body;
    const query = `SELECT * FROM users WHERE id=?;`
    connection.execute(query,[user_id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        if(result.length === 0){
            return res.status(404).json({message:'User Not Found!!'})
        }
        const inserQueries = `INSERT INTO blogs(title,content,user_id) VALUES(?,?,?);`
        connection.execute(inserQueries,[title,content,user_id],(error,result)=>{
            if(error)
                return res.status(500).json({message:'Error Creating blogs',error:error.message})
            return res.status(201).json({message:'Blog Created Successfully',data:result })
        })
    })
}
export const updateBlog = (req,res,next)=>{
    const {id} = req.params
    const {title,content,user_id} = req.body;
    // check user exist or not
    const userQuery=`SELECT * FROM users WHERE id=?;`
    connection.execute(userQuery,[user_id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fatching users',error:error.message})
        if(result.length === 0){
            return res.status(404).json({message:'User Not Found!!'})
        }
        // check blog exists or not
        const blogQuery=`SELECT * FROM blogs WHERE id=?;`
        connection.execute(blogQuery,[id],(error,result)=>{
            if(error)
                return res.status(500).json({message:'Error Fetching Blogs',error:error.message})
            if(result.length === 0){
                return res.status(404).json({message:'Blog Not Found!!'})
            }
            // check user is outher of blog or not
            if(user_id === result[0].user_id){
                const updateQuery=`UPDATE blogs SET title=?,content=? WHERE id=? AND user_id=?;`
                connection.execute(updateQuery,[title,content,id,user_id],(error,result)=>{
                    if(error)
                        return res.status(500).json({message:'Error Updating Blog',error:error.message})
                    return res.status(200).json({message:'Blog Updated Successfully',data:result})
                })
            }else{
                return res.status(403).json({message:'You are not authorized to update this blog'})
            }
        })
    })
}
export const deleteBlog = (req,res,next)=>{
    const {id} = req.params;
    const {user_id} = req.body;
    // check user exist or not
    const userQuery=`SELECT * FROM users WHERE id=?;`
    connection.execute(userQuery,[user_id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Facthing user',error:error.message})
        if(result.length === 0){
            return res.status(404).json({message:'User Not Found!!'})
        }
        // check blog exists or not
        const blogQuery=`SELECT * FROM blogs WHERE id=?;`
        connection.execute(blogQuery,[id],(error,result)=>{
            if(error)
                return res.status(500).json({message:'Error Fetching Blogs',error:error.message})
            if(result.length === 0){
                return res.status(404).json({message:'Blog Not Found!!'})
            }
            // check user is outher of blog or not
            if(user_id === result[0].user_id){
                const deleteQuery=`DELETE FROM blogs WHERE id=? AND user_id=?;`
                connection.execute(deleteQuery,[id,user_id],(error,result)=>{
                    if(error)
                        return res.status(500).json({message:'Error Deleting Blog',error:error.message})
                    return res.status(200).json({message:'Blog Deleted Successfully',data:result})
                })
            }else{
                return res.status(403).json({message:'You are not authorized to delete this blog'})
            }
        })
    })
}
export const getAllBlogs = (req,res,next)=>{
    const query = `SELECT * FROM blogs;`
    connection.execute(query,(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Blogs',error:error.message})
        if(result.length === 0)
            return res.status(404).json({message:'Blogs Not Found!!'})
        return res.status(200).json({message:'Blogs Found Successfully',data:result})
    })
}
export const getBlogById = (req,res,next)=>{
    const {id} = req.params;
    const query = `SELECT * FROM blogs WHERE id=?;`
    connection.execute(query,[id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Blogs',error:error.message})
        if(result.length === 0)
            return res.status(404).json({message:'Blog Not Found!!'})
        return res.status(200).json({message:'Blog Found Successfully',data:result})
    })
}