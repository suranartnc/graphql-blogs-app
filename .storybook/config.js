import { configure } from '@kadira/storybook'

import 'styles/global/app.scss'
import 'styles/storybook/base.scss'

function loadStories () {
  require('../stories')
  require('../stories/PostItemStory.js')
}

configure(loadStories, module)
