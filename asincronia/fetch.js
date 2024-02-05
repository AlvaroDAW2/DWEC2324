// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(req => req.json())
//   .then(res =>
//     res.forEach(post =>
//       document.write(`${post.id} (User: ${post.userId}): ${post.title} <br />`)
//     )
//   )

// API Github
// fetch('https://api.github.com/users/AlvaroUrena')
//   .then(req => req.json())
//   .then(res => console.log(res))
//   .catch(error => console.error(error))

// Aync await
async function randomUserAwait() {
  try {
    const req = await fetch('https://randomuser.me/api/?results=10')
    const res = await req.json()

    res.results.forEach(user => createUserCard(user))
  } catch (error) {
    console.log(error.message)
  }
}

function createUserCard(user) {
  const userCard = document.createElement('article')
  userCard.classList.add('userCard')

  const userPicture = document.createElement('figure')
  const userImg = document.createElement('img')
  userImg.src = user.picture.large

  const { title, first, last } = user.name
  const userName = document.createElement('figcaption')
  userName.textContent = `${title} ${first} ${last}`

  userPicture.append(userImg)
  userPicture.append(userName)

  const userTLF = document.createElement('a')
  userTLF.href = `tlf:${user.phone}`
  userTLF.textContent = `Llama al: ${user.phone}`

  userCard.append(userPicture)
  userCard.append(userTLF)

  document.body.append(userCard)
}

randomUserAwait()
