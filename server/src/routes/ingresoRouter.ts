import { Router } from 'express'
import { getAll, save } from '../controllers/ingresoController'

const router = Router()

router.get('/', getAll)
router.post('/', save)

export default router
