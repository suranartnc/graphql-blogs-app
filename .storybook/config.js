import { configure } from '@kadira/storybook';

const req = require.context('../src/app/components', true, /.stories.js$/)

function sanitize(filename) {
  filename = filename.replace('.stories.js', '').split('/').pop()
  return filename
}

function sortByStoriesOf (components = []) {
  let reorderComponents = []

  components.forEach((component, index) => {
    reorderComponents[index] = sanitize(component)
  })

  reorderComponents.sort()

  reorderComponents.forEach((name, index) => {
    components.forEach((component) => {
      if (component.indexOf(name) != -1) {
        reorderComponents[index] = component
      }
    })
  })

  return reorderComponents
}

function loadStories() {

  const components = req.keys()
  const reorderComponents = sortByStoriesOf(components)

  reorderComponents.forEach((filename) => {
    return req(filename)
  })
}

configure(loadStories, module);
