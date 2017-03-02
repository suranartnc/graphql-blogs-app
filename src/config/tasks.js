const pages = [
  {
    title: 'Homepage'
  }, {
    title: 'Archive'
  }, {
    title: 'Entry'
  }, {
    title: 'Gallery List'
  }, {
    title: 'Gallery Entry'
  }
]

const reactPages = [
  ...pages
]

const apis = [
  {
    title: 'Solr'
  }, {
    title: 'Discussion'
  }, {
    title: 'JOOX'
  }, {
    title: 'LITE'
  }
]

const libraries = [
  {
    title: 'Ad Management'
  }, {
    title: 'Meta Management'
  }, {
    title: 'Discussion'
  }, {
    title: 'Gallery'
  }, {
    title: 'Poll'
  }, {
    title: 'RIP',
    done: true
  }
]

export const todos = [
  {
    title: 'CI / CD'
  }, {
    title: 'UI',
    tasks: [
      {
        title: 'Firstpage'
      }, {
        title: 'Core',
        tasks: pages
      }
    ]
  }, {
    title: 'GraphQL API',
    tasks: apis
  }, {
    title: 'Core Libraries',
    tasks: libraries
  }, {
    title: 'React Components',
    tasks: [
      {
        title: 'Firstpage'
      }, {
        title: 'Core',
        tasks: reactPages
      }
    ]
  }
]

export const todosWithSubTasks = [
  ...todos
]
