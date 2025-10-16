import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2syy7lko',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true
  },
})

