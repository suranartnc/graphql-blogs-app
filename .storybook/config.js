import { configure } from '@kadira/storybook'

import 'styles/global/app.scss'
import 'styles/storybook/base.scss'

function loadStories () {
  require('../stories')
  require('../stories/PostItemStory.js')
  require('../stories/HomePage.js')
  require('../stories/ToDoApp.js')
}

configure(loadStories, module)
