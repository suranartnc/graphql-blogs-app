export const todos = [
  {
    title: 'CI/CD',
    done: true
  }, {
    title: 'UI',
    done: true
  }, {
    title: 'Page'
  }
]

export const todosWithSubTasks = [
  ...todos,
  {
    title: 'API',
    done: true,
    tasks: [
      {
        title: 'Solr'
      }, {
        title: 'Discussion',
        tasks: [
          {
            title: 'Get'
          }, {
            title: 'Set'
          }
        ]
      }
    ]
  }
]
