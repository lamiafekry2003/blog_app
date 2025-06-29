import Router from "express"
import * as authService from './auth.service.js'
const router = Router()
// signup
router.post('/singup',authService.signup)
// login
router.post('/login',authService.login)

export default router