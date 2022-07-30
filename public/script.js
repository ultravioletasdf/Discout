if (window.location.href.includes('#')) {
	window.location.href = window.location.href.replace("#", '?');
}

// Get Template
const template = document.querySelector('[data-card-template]');
const list = document.querySelector('[data-card-list]');
const input = document.querySelector('[data-search]');
const notfound = document.querySelector('[data-not-found]');
const dropdown = document.querySelector('[data-dropdown-menu]');

const bots = [
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
	{
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
	{
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
  {
    title: "Project Arcus",
    desc: "An advanced, general purpose bot, aiming high",
    img: "https://cdn.discordapp.com/attachments/943233423412187187/977546874477215755/BETA_1.png",
    invite: "https://arcus.quest/discord"
  },
];
let elements = [];

// Create Icons List
elements = bots.map(bot => {
  // Create Document Fragment
  const card = template.content.cloneNode(true).children[0];
  const title = card.querySelector('[data-title]');
  const desc = card.querySelector('[data-desc]');
  const link = card.querySelector('[data-link]');
  // Set html
  title.textContent = bot.title;
  card.style = `background-image:url('${bot.img}');`
  link.href = bot.invite;
  list.append(card);
  // Return the values
  return {title: bot.title, desc: bot.desc, element: card}
});

// Search bar
input.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  let visible = elements.map(element => {
    const isVisible = element.title.toLowerCase().includes(val);
    element.element.classList.toggle('hide', !isVisible);
    return isVisible;
  });
  if (!visible.includes(true)) {
    notfound.innerHTML = `<div data-not-found="">
  <img src="notfound.svg">
  <h1>We couldn’t find what you were looking for...</h1>
</div>`
  }
  else {
    notfound.innerHTML = ``;
  }
});

function vote () {
  alert("Voted!")
}

dropdown.addEventListener('click', (e) => {
  console.log(e)
  dropdown.classList.toggle('dropdown-shown');
});

var openedWindow;
const params = new URLSearchParams(window.location.search);

let token = params.get("access_token");
if (token) {
	console.log("get info")
	let user;
	(async function() {
		user = await axios(
		{
			url: "https://dev--discout.infraredstudio.autocode.gg/discout-login/",
			method: 'GET',
			params: {
				auth: "bh53Ltu3&5$&9Tg9Mund",
				token:token
			}
	});
	})
	console.log(user)
	document.cookie = JSON.stringify(user);
}