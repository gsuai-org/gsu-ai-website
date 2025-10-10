import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Import schemas
import homeSchema from './schemas/home'
import missionSchema from './schemas/mission'
import eventSchema from './schemas/event'
import boardMemberSchema from './schemas/boardMember'
import contactSchema from './schemas/contact'

export default defineConfig({
  name: 'gsu-ai-club-studio',
  title: 'GSU AI Club Studio',

  projectId: '2syy7lko', 
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      homeSchema,
      missionSchema,
      eventSchema,
      boardMemberSchema,
      contactSchema,
    ],
  },
})
