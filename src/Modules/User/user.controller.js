import Router from "express"
import * as userServices from './user.service.js'
const router = Router()

router.get('/',userServices.getAllUsers)
// search user by name
router.get('/search',userServices.searchUserByName)

// router.get('/:id',(req,res)=>{
//     const {id} = req.params
//     // return res.status(200).json({message:'hello from blog app'})
//     // connection.query(`SELECT * FROM users WHERE id = ${id}`,(error,result)=>{
//     //     if(error)
//     //         return res.status(500).json({message:'Error Fetching Users',error:error.message})
//     //     return res.status(200).json({message:'Users Fetced Successfully',data:result})
//     // })
//      connection.query(`SELECT * FROM users WHERE id =?`,[id],(error,result)=>{
//         if(error)
//             return res.status(500).json({message:'Error Fetching Users',error:error.message})
//         return res.status(200).json({message:'Users Fetced Successfully',data:result})
//     })
    
// })

// get users
router.get('/:id',userServices.getUserById)

// update user
router.patch('/:id',userServices.updateUser)

export default router;