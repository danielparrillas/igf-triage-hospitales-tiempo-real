import { Router } from 'express'
import {
  create,
  edit,
  getAll,
  getById,
  getIngresoByIdDoctorAsignado,
  getIngresosAsignados
} from '../controllers/ingresoController'

const router = Router()

router.get('/', getAll)
router.post('/', create)
router.put('/:id', edit)
router.get('/:id', getById)
router.get('/asignaciones/ingresosAsignados', getIngresosAsignados)


export default router
