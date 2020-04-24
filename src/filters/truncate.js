export default (value, truncNumber) => {
  let ending = ''
  const wordsArray = value.split(' ')

  if (wordsArray.length > truncNumber) {
    ending = '…'
  }
  return wordsArray.splice(0, truncNumber).join(' ') + ending
}
