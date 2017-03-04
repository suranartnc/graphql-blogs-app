import faker from 'faker'

function generateArticles (limit = 10) {
  let articles = []

  for (let i = 0; i < limit; ++i) {
    articles.push({
      _id: `${i + 1}`,
      title: faker.lorem.sentence(),
      excerpt: faker.lorem.paragraphs(2),
      body: faker.lorem.paragraphs()
    })
  }

  return articles
}

export default generateArticles
