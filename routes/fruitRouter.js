import express from 'express'
import {getFruits, getFruit, insertFruit, deleteFruit, updateFruit} from '../controller/fruitController.js'
import {verifyAToken} from '../middleware/authenticate.js'

const router = express.Router()
router.
    route('/')
        .get(verifyAToken, getFruits) //verifyAToken should be first
        .post(insertFruit)
router.
    route('/:id')
        .get(getFruit)
        .delete(deleteFruit)
        .patch(updateFruit)
export default router









