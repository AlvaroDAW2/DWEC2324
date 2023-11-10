const user = {
  name: 'Otto',
  role: 'arquero',
  life: 99,
  features: ['learn', 'code', 'paint']
}

const fullUser = {
  ...structuredClone(user),
  life: 50
}

console.log(fullUser.features, user.features) // learn, code ,paint && learn, code, paint
fullUser.features[0] = 'program'
console.log(fullUser.features, user.features) // program, code, paint && learn, code, paint
