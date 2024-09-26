import { Router } from 'express'
import { create, edit, getAll } from '../controllers/ingresoController'

const router = Router()

router.get('/', getAll)
router.post('/', create)
router.put('/:id', edit)

export default router
