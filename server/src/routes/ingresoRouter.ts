import { Router } from 'express'
import { getAll } from '../controllers/ingresoController'

const router = Router()

router.get('/', getAll)

export default router
