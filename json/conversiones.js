const json = `
[
  {
    "nombre": "Juan López",
    "profesion": "Programador",
    "edad": 25,
    "lenguajes": ["PHP", "Javascript", "Dart"],
    "disponibilidadParaViajar": true,
    "rangoProfesional": {
      "aniosDeExperiencia": 6,
      "nivel": "Senior"
    }
  },

  {
    "nombre": "Ana Martín",
    "profesion": "Programadora",
    "edad": 23,
    "lenguajes": ["Java", "Javascript", "C*++"],
    "disponibilidadParaViajar": false,
    "rangoProfesional": {
      "aniosDeExperiencia": 4,
      "nivel": "Junior"
    }
  },

  {
    "nombre": "Luis Oberto",
    "profesion": "Analista",
    "edad": 42,
    "lenguajes": ["Python", "Javascript", "Cobol"],
    "disponibilidadParaViajar": true,
    "rangoProfesional": {
      "aniosDeExperiencia": 6,
      "nivel": "Senior"
    }
  },

  {
    "nombre": "Ana Martínez",
    "profesion": "Programadora",
    "edad": 22,
    "lenguajes": ["Python", "Javascript", "Java"],
    "disponibilidadParaViajar": true,
    "rangoProfesional": {
      "aniosDeExperiencia": 2,
      "nivel": "Junior"
    }
  },
  {
    "nombre": "Oscar García",
    "profesion": "Programador",
    "edad": 24,
    "lenguajes": ["C#", "Javascript", "Java"],
    "disponibilidadParaViajar": true,
    "rangoProfesional": {
      "aniosDeExperiencia": 4,
      "nivel": "Junior"
    }
  }
]
`

const programadores = JSON.parse(json)
console.log(programadores)
