export enum BuddyRegion {
  US = 'us',
  EU = 'eu',
  AS = 'as',
}

export interface IInputs {
  token?: string
  region?: string
  api_url?: string
}
