const generateUniqueKey = keys => {
  const chars = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]

  const generateKeyHelper = key => {
    const letter = Math.floor(Number(Math.random()) * 25)
    const newKey = `${key}${chars[letter]}`

    if (newKey.length >= 10 && !keys.includes(newKey)) {
      return newKey
    } else if (keys.includes(newKey)) {
      return generateKeyHelper('')
    }

    return generateKeyHelper(newKey)
  }

  return generateKeyHelper('')
}

module.exports.generateUniqueKey = generateUniqueKey
