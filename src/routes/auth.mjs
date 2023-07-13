import express from 'express'

import { login, requestCode } from '../controllers/auth.mjs'

const router = express.Router()

router.post('/request-code', requestCode)
router.post('/login', login)

router.get('*', route404)

export default router
