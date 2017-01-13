export function fetchData1 () {
  return {
    type: 'FETCH_DATA_1',
    request: {
      path: 'https://api.github.com/users/suranartnc'
    }
  }
}

export function fetchData2 () {
  return {
    type: 'FETCH_DATA_2',
    request: {
      path: 'https://api.github.com/users/suranartnc'
    }
  }
}
