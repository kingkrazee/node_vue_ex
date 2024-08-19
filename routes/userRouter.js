import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser} from '../controller/userController.js'
import { checkUser} from '../middleware/authenticate.js'

const router = express.Router()
router.
    route('/')
        .get(getUsers)
        .post(insertUser)
router.post('/login',checkUser,loginUser)
router.
    route('/:id')
        .get(getUser)
        .delete(deleteUser)
        .patch(updateUser)
export default router







