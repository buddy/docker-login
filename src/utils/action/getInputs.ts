import { getInput } from '@actions/core'
import { BuddyRegion, type IInputs } from '@/types/inputs'

export function getInputs(): IInputs {
  const token = getInput('token') || undefined
  const region = getInput('region') || undefined
  const api_url = getInput('api_url') || undefined

  if (region) {
    const validRegions = Object.values(BuddyRegion)
    if (!validRegions.includes(region as BuddyRegion)) {
      throw new Error(`Invalid region: ${region}. Must be one of: ${validRegions.join(', ')}`)
    }
  }

  return {
    token,
    region,
    api_url,
  }
}
