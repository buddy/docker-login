import { setFailed } from '@actions/core'
import { dockerLogin } from '@/login'
import { normalizeError } from '@/utils/error/normalizeError'

dockerLogin()
  .then(() => {
    process.exit(0)
  })
  .catch((error: unknown) => {
    setFailed(normalizeError(error))
    process.exit(1)
  })
