import { configure } from '@kadira/storybook'

function loadStories () {
  require('../stories')
  require('../stories/PostListStory.js')
}

configure(loadStories, module)
