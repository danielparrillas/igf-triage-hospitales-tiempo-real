import { Router } from 'express'
import { create, edit, getAll, getById } from '../controllers/ingresoController'

const router = Router()

router.get('/', getAll)
router.post('/', create)
router.put('/:id', edit)
router.get('/:id', getById)

export default router
