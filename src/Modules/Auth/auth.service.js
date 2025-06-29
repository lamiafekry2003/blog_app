 import connection from '../../DB/connection.js'
 export const signup = (req,res)=>{
    const {first_name,middle_name,last_name,email,password,DOB,gender,confirmpassword}=req.body
    if(password !== confirmpassword)
        return res.status(400).json({message:'Password NotMatched!!'})

    const query='SELECT * FROM users WHERE email=?'
    connection.execute(query,[email],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        if(result.length>0)
            return res.status(409).json({message:'user email aleardy exist!!'})
        // create user or added in database
        const inserQueries=`INSERT INTO users(
         first_name,
         middle_name,
         last_name,
         email,
         password,
         DOB,
         gender
        ) VALUES (?,?,?,?,?,?,?)`;

      connection.execute(inserQueries,[first_name,middle_name,last_name,email,password,DOB,gender],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        return res.status(201).json({message:'User Added Successfully',data:result})
      })
})}
export const login = (req,res)=>{
    const {email,password}=req.body;
    const query=`SELECT * FROM users WHERE email=? AND password=?`
    connection.execute(query,[email,password],(error,result)=>{
        if(error)
            return res.status(500).json({message:'Error Fetching Users',error:error.message})
        if(result.length === 0)
          return res.status(409).json({message:'Invaild email or password!!'})
        return res.status(200).json({message:'User Login Successfully',data:result})

    })
}