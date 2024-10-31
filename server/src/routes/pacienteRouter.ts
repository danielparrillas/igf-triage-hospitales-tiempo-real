import { Router } from 'express'
import { getAll } from '../controllers/pacienteController'

const router = Router()

router.get('/', getAll)

export default router
