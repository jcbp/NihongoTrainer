[
	{
		title: "Elija la opción correcta",
		titleArg: "Persona",
		type: "card", // card, esp-jp, jp-esp
		cards: [
			{
				src: "img/person.png",
				text: "人",
				reading: "hito"
			}
		],
		validation: ["hito"]
	},
	{
		title: "Elija la opción correcta",
		titleArg: "Hombre",
		type: "card", // card, esp-jp, jp-esp
		cards: [
			{
				src: "img/car.png",
				text: "車",
				reading: "kuruma"
			},
			{
				src: "img/woman.png",
				text: "女の人",
				reading: "onna no hito"
			},
			{
				src: "img/man.png",
				text: "男の人",
				reading: "otoko no hito"
			}
		],
		validation: ["otoko no hito"]
	},
	{
		title: "Traduzca el siguiente texto al español",
		text: [
			{
				word: "男の人",
				reading: "otoko no hito",
				dic: "Hombre"
			}
		],
		type: "jp-esp",
		validation: ["hombre"]
	},
	{
		title: "Elija la opción correcta",
		titleArg: "Mujer",
		type: "card", // card, esp-jp, jp-esp
		cards: [
			{
				src: "img/woman.png",
				text: "女の人",
				reading: "onna no hito"
			},
			{
				src: "img/telephone.png",
				text: "電話",
				reading: "denwa"
			},
			{
				src: "img/man.png",
				text: "男の人",
				reading: "otoko no hito"
			}
		],
		validation: ["onna no hito"]
	},
	{
		title: "Traduzca el siguiente texto al español",
		text: [
			{
				word: "女の人",
				reading: "onna no hito",
				dic: "Mujer"
			}
		],
		type: "jp-esp",
		validation: ["mujer"]
	},
	{
		title: "Traduzca el siguiente texto al japonés",
		text: [
			{
				word: "Hombre",
				dic: "男の人",
				reading: "otoko no hito"
			}
		],
		type: "esp-jp",
		validation: ["otoko no hito"]
	},
	{
		title: "Traduzca el siguiente texto al japonés",
		text: [
			{
				word: "Persona",
				dic: "人",
				reading: "hito"
			}
		],
		type: "esp-jp",
		validation: ["hito"]
	},
	{
		title: "Traduzca el siguiente texto al japonés",
		text: [
			{
				word: "Mujer",
				dic: "女の人",
				reading: "onna no hito"
			}
		],
		type: "esp-jp",
		validation: ["onna no hito"]
	}
]
