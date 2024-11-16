import {Router} from 'express'
import {getDoctor} from '../controllers/doctorController'


const router =  Router()

router.get('/doctor/:idUser',getDoctor)

export default router