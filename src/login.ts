import { info } from '@actions/core'
import { exec } from '@actions/exec'
import { getInputs } from '@/utils/action/getInputs'

export async function dockerLogin(): Promise<void> {
  const inputs = getInputs()
  const args: string[] = ['pkg', 'docker', 'login']

  if (inputs.token) {
    args.push('--token', inputs.token)
  }

  if (inputs.region) {
    args.push('--region', inputs.region)
  }

  if (inputs.api_url) {
    args.push('--api', inputs.api_url)
  }

  info('Logging in to Buddy Docker registry...')
  await exec('bdy', args)
  info('Successfully logged in to Buddy Docker registry')
}
