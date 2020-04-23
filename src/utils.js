export function uuid () {
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin (store) {
  store.subscribe(
    (mutation, state) => {
      localStorage.setItem(
        'board',
        JSON.stringify(state.board)
      )
    }
  )
}

export function truncateStringWords (str, truncNumber) {
  let ending = ''
  const wordsArray = str.split(' ')

  if (wordsArray.length > truncNumber) {
    ending = '…'
  }
  return wordsArray.splice(0, truncNumber).join(' ') + ending
}
