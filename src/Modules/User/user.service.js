import connection from '../../DB/connection.js'

export const getAllUsers = (req,res)=>{
    // return res.status(200).json({message:'hello from blog app'})
    // connection.query(`SELECT * FROM users`,(error,result)=>{
    //     if(error)
    //         return res.status(500).json({message:'Error Fetching Users',error:error.message})
    //     return res.status(200).json({message:'Users Fetced Successfully',data:result})
    // })
      connection.execute(`SELECT * FROM users`,(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        return res.status(200).json({message:'Users Fetced Successfully',data:result})
    })
    
}
export const searchUserByName = (req,res)=>{
    const {first_name} = req.query
    const query=`SELECT * FROM users WHERE first_name LIKE ?`
    connection.execute(query,[`%${first_name}%`],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        if(result.length === 0)
            return res.status(404).json({message:'User Not Found!!'})
        return res.status(200).json({message:'User Found Successfully',data:result})
    })
}
export const getUserById = (req,res)=>{
    const {id} = req.params;
    const query=`SELECT first_name,last_name,email,gender,YEAR(CURDATE())-YEAR(DOB) AS age FROM USERS WHERE ID=?`
    connection.execute(query,[id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        if(result.length === 0)
            return res.status(404).json({message:'User Not Found!!'})
        return res.status(200).json({message:'User Found Successfully',data:result})
    })
}
export const updateUser = (req,res)=>{
    const {id} = req.params;
    const {first_name,middle_name,last_name,DOB}=req.body;
    const query=`UPDATE users SET first_name =?,middle_name =?,last_name =?,DOB =? WHERE id=?`;
    connection.execute(query,[first_name,middle_name,last_name,DOB,id],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Updating User',error:error.message})
        if(result.affectedRows === 0)
            return res.status(404).json({message:'User Not Found!!'})
        return res.status(200).json({message:'user updated successfully',data:result});
    })
}