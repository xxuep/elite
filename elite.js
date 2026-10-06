if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
      await navigator.serviceWorker.register("/uv/sw.js").catch(err => console.error("SW Registration failed:", err));
  });
}

let connection = null;
try {
  connection = new BareMux.BareMuxConnection("/baremux/worker.js");
} catch (err) {
  console.warn("BareMux not available:", err);
}

const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const DEFAULT_FAVICON = "https://raw.githubusercontent.com/xxuep/xxuep-icons/main/eliteicon.png";



// Apply saved theme
const savedTheme = localStorage.getItem('elite_theme') || 'custom';
document.body.setAttribute('data-theme', savedTheme);

// Selectors
const themeSelect = document.getElementById('themeSelect');
const customColorPicker = document.getElementById('customColorPicker');

if (themeSelect) {
  themeSelect.value = savedTheme;
  
  if (savedTheme === 'custom') customColorPicker.style.display = 'block';
  const savedColor = localStorage.getItem('elite_custom_color') || '#005a9e';
  document.documentElement.style.setProperty('--custom-main', savedColor);
  customColorPicker.value = savedColor;
  
  themeSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    document.body.setAttribute('data-theme', val);
    localStorage.setItem('elite_theme', val);
    
    if (val === 'custom') customColorPicker.style.display = 'block';
    else customColorPicker.style.display = 'none';
  });

  customColorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--custom-main', e.target.value);
    localStorage.setItem('elite_custom_color', e.target.value);
  });
}

// --- EASY SETUP FOR IMAGE GRIDS ---
const grid1Data = [
  { title: "10 Minutes till Dawn", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/10-minutes-till-dawn_1x1.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/10-minutes-till-dawn.html" },
  { title: "12 Mini Battles", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/12minibattles.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/12-mini-battles.html" },
  { title: "1 On 1 Soccer", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/1-on-1-soccer.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/1-on-1soccer.html" },
  { title: "1 On 1 Tennis", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/1on1tennis.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/1-on-1tennis.html" },
  { title: "1v1.lol", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/1v1 loo.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/1v1.lol.html" },
  { title: "2048", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/2048logo.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/2048.html" },
  { title: "2048 Cupcakes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/2048logocupcakes.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/2048-cupcakes.html" },
  { title: "3D Flight Simulator", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/3dflight.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/3D-flight-simulator.html" },
  { title: "8ball Classic", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/8ballclassiclogo.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/8-ball-classic.html" },
  { title: "9007199254740992", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/90071gamee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/9007199254740992.html" },
  { title: "Age of War", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ageofwar.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/age-of-war.html" },
  { title: "Age of War 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ageofwar2.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/age-of-war-2.html" },
  { title: "Ages of Conflict", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/agesofclonflictlogo.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/ages-of-conflict.html" },
  { title: "Among Us", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/amongus.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/among-us.html" },
  { title: "Angry Birds", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/angry%20birds.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/angry-birds.html" },
  { title: "Angry Birds Showdown", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/angrybirdsshowdown.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/angry-birds-showdown.html" },
  { title: "Angry Birds Space", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/angrybirdsspace.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/angry-birds-space.html" },
  { title: "Angry Neighbor", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/angryneighborr.jpe", htmlUrl: "https://raw.githubusercontent.com/xxuep/angryneighborsinglefile/main/angryneighborsingle.html" },
  { title: "Awesome Tanks", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/awesome-tanks-game-icon.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/awesome-tanks.html" },
  { title: "Awesome Tanks 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/awesome-tanks-2-icon.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/awesome-tanks-2.html" },
  { title: "Axiom Verge", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/axiomvergee.png", htmlUrl: "https://raw.githubusercontent.com/xxuep/axiom-verge-single-file/main/axiomvergesingle.html" },
  { title: "Backrooms", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/backroomsgame.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/backrooms.html" },
  { title: "Bacon May Die", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/baconmaydieeee.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bacon-may-die.html" },
  { title: "Bad Ice Cream", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/badicecream1.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bad-ice-cream.html" },
  { title: "Bad Ice Cream 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/badicecream2.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bad-ice-cream-2.html" },
  { title: "Bad Ice Cream 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/badicecream3.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bad-ice-cream-3.html" },
  { title: "Bad Parenting", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/badparentingg.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bad-parenting.html" },
  { title: "Bad Piggies", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/badpiggiess.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bad-piggies.html" },
  { title: "Baldi's Basics", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/baldisbasicss.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/baldisbasics.html" },
  { title: "Baseball Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/baseballbross.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/baseball-bros.html" },
  { title: "Basketball Legends", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/basketball-legends-2020.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/basketball-legends.html" },
  { title: "Basketball Stars", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/basketballstarss.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/basketball-stars.html" },
  { title: "Basket Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/basketbross.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/basket-bros.html" },
  { title: "Basket Random", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/basketrandomm.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/basket-random.html" },
  { title: "Bitlife", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bitlifee.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bitlife.html" },
  { title: "Bit Planes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bitplaness.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bit-planes.htm" },
  { title: "Blocky Snakes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/blockysnakess.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/blocky-snakes.html" },
  { title: "Bloons TD", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloonstd1.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloons-TD.html" },
  { title: "Bloons TD 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloonstd2.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloons-TD-2.html" },
  { title: "Bloons TD 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloonstd3.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloons-TD-3.html" },
  { title: "Bloons TD 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloonstd4.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloons-TD-4.html" },
  { title: "Bloons TD 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloondtd5.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloons-TD-5.html" },
  { title: "Bloxorz", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bloxorzz.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bloxorz.html" },
  { title: "Blumgi Racers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/blumgiracerss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/blumgi-racers.html" },
  { title: "Blumgi Rocket", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/blumgirockett.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/blumgi-rocket.html" },
  { title: "Bob the Robber", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bobtherobber1.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bob-the-robber.html" },
  { title: "Bob the Robber 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bobtherobber2.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bob-the-robber-2.html" },
  { title: "Bob the Robber 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bobtherobber3.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bob-the-robber-3.html" },
  { title: "Bouncy Motors", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bouncymotorss.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bouncy-motors.html" },
  { title: "Bow Masters", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bowmasterssss.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bow-masters.html" },
  { title: "Boxing Random", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/boxingrandomm.jpeg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/boxing-random.htm" },
  { title: "Breaking the Bank", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/breakingthebankk.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/breaking-the-bank.html" },
  { title: "Bubble Shooter", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/bubbleshooterr.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/bubble-shooter.html" },
  { title: "Candy Crush", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/candycrushh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/candy-crush.html" },
  { title: "Capybara Clicker", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/capybaraclickerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/capybara-clicker.html" },
  { title: "Car Drawing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/cardrawingg.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/car-drawing.html" },
  { title: "Car King Arena", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/carkingarenaa.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/car-king-arena.html" },
  { title: "Chess", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/chesss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/chess.html" },
  { title: "Choppy Orc", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/choppyorcc.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/choppy-orc.html" },
  { title: "Circlo O", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/circleoo.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/circloO.html" },
  { title: "Circlo O 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/circleoo2.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/circloO-2.html" },
  { title: "Clash of Vikings", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/clashofvikingss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/clash-of-vikings.html" },
  { title: "Cleanup.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/cleanupioo.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/cleanup-io.html" },
  { title: "Cluster Rush", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/clusterrushh.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/cluster-rush.html" },
  { title: "Cookie Clicker", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/cookieclickerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/cookie-clicker.htm" },
  { title: "Crazy Cars", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/crazycarss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/crazy-cars.html" },
  { title: "Crazy Cattle 3d", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/crazycattle3dd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/crazy-cattle-3D.html" },
  { title: "Crazy Crash Landing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/crazycrashlandingg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/crazy-crash-landing.html" },
  { title: "Crazy Motorcycle", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/crazymotorcyclee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/crazy-motercycle.html" },
  { title: "Crossy Road", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/crossyroadd.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-HTML-Games-Pack/master/offline/crossy-road.htm" },
  { title: "Cut the Rope", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/cuttheropee.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/cut-the-rope.html" },
  { title: "Dadish", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/dadishh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/dadish.html" },
  { title: "Dadish 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/dadishh2.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/dadish-2.html" },
  { title: "Dadish 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/dadishh3.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/dadish-3.html" },
  { title: "Deadly Descent", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/deadlydescentt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/deadly-descent.html" },
  { title: "Death Chase", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/deathchasee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/death-chase.html" },
  { title: "Death Run 3D", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/deathrun3dd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/death-run-3D.html" },
  { title: "Demolition Derby Crash Racing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/demolitionderbyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/demolition-derby-crash-racing.html" },
  { title: "Doodle Jump", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/doodlejumpp.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/doodle-jump.html" },
  { title: "Draw Climber", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/drawclimberr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/draw-climber.html" },
  { title: "Dreadhead Parkour", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/dreadheadparkourr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/dreadhead-parkour.htm" },
  { title: "Drift Boss", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/driftbosss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/drift-boss.htm" },
  { title: "Drift Hunters Pro", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/drifthuntersproo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/drift-hunters-pro.html" },
  { title: "Drive Mad", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/drivemadd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/drive-mad.htm" },
  { title: "Duck Life", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklifee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/duck-life.html" },
  { title: "Duck Life 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklife22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/duck-life-2.html" },
  { title: "Duck Life 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklife33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/duck-life-3.html" },
  { title: "Duck Life 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklife44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/duck-life-4.html" },
  { title: "Duck Life 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklife55.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/duck-life-5.html" },
  { title: "Ducklings.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ducklingsioo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ducklings-io.html" },
  { title: "Eagle Ride", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eagleridee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/eagle-ride.html" },
  { title: "EaglerCraft 1.12", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/1.12.html" },
  { title: "EaglerCraft 1.5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/1.5.html" },
  { title: "EaglerCraft 1.8", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/1.8.html" },
  { title: "EaglerCraft Alpha 1.2.6", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/Alpha_1.2.6.html" },
  { title: "EaglerCraft Beta 1.3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/Beta_1.3.html" },
  { title: "EaglerCraft Indev", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eaglercraftt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/Indev.html" },
  { title: "Earn to Die", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/earntodiee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/earn-to-die.html" },
  { title: "Earn to Die 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/earntodie22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/earn-to-die-2.html" },
  { title: "Eggy Car", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eggycarr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/eggy-car.html" },
  { title: "Elastic Face", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/elasticskinn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/elastic-face.htm" },
  { title: "Escape Road", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/escaperoadd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/escaperoad.html" },
  { title: "Escape Road 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/escaperoad22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/escaperoad-2.html" },
  { title: "Escape Road 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/escaperoad33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/escaperoad-3.html" },
  { title: "Escaping the Prison", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/escapingtheprisonn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/escaping-the-prison.html" },
  { title: "Eugenes Life", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/eugeneslifee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/eugenes-life.html" },
  { title: "Evil Glitch", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/evilglitchh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/evil-glitch.html" },
  { title: "The Fancy Pants Adventures", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fancypantss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fancy-pants-adventure.html" },
  { title: "The Fancy Pants Adventures 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fancypants22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fancy-pants-adventure-2.html" },
  { title: "Fire Blob", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fireblobb.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fireblob.html" },
  { title: "Fire Boy and Water Girl", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/firewaterr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fireboy-and-watergirl.html" },
  { title: "Fire Boy and Water Girl 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/firewater22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fireboy-and-watergirl-2.html" },
  { title: "Fire Boy and Water Girl 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/firewater33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fireboy-and-watergirl-3.html" },
  { title: "Fire Boy and Water Girl 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/firewater44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fireboy-and-watergirl-4.html" },
  { title: "Flappy Bird", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/flappybirdd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/flappy-bird.html" },
  { title: "Fleeing The Complex", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fleeingthecomplexx.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fleeing-the-complex.html" },
  { title: "Flood Runner 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/floodrunner22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/flood-runner-2.html" },
  { title: "Flood Runner 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/floodrunner33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/flood-runner-3.html" },
  { title: "Flood Runner 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/floodrunner44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/flood-runner-4.html" },
  { title: "Five Nights at Freddys", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fnaf11.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fnaf.html" },
  { title: "Five Nights at Freddys 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fnaf22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fnaf-2.html" },
  { title: "Five Nights at Freddys 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fnaf33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fnaf-3.html" },
  { title: "Five Nights at Freddys 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fnaf44.jpg", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fnaf-4.html" },
  { title: "Five Nights at Freddys SL", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fnafsll.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fnaf-sister-location.html" },
  { title: "Football Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/footballbross.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/football-bros.html" },
  { title: "Football Legends", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/footballlegendss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/football-legends.html" },
  { title: "Free Rider 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/freerider33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/free-rider-3.html" },
  { title: "Friday Night Funkin", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fridaynightfunkinn.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/friday-night-funkin.html" },
  { title: "Fruit Ninja", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/fruitninjaa.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/fruit-ninja.html" },
  { title: "Funny Battle", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/funnybattlee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/funny-battle.html" },
  { title: "Funny Battle 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/funnybattle22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/funny-battle-2.html" },
  { title: "Funny Mad Racing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/funnymadracingg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/funny-mad-racing.html" },
  { title: "Funny Shooter 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/funnyshooter22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/funny-shooter-2.html" },
  { title: "Gang Beasts", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/gangbeastss.jpg", htmlUrl: "https://raw.githubusercontent.com/xxuep/webport-list-for-wasm.rip-but-sf/main/gangbeasts/gangbeastssf.html" },
  { title: "Geometry Dash WASM", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/geometrydashwasmm.jpe", htmlUrl: "https://raw.githubusercontent.com/xxuep/geodash-wasm-single/main/geosingle.html" },
  { title: "Geometry Vibes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/geometrydashvibess.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/geometry-vibes.html" },
  { title: "Get On Top", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/getontopp.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/get-on-top.html" },
  { title: "Getaway Shootout", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/getawayshootoutt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/getaway-shootout.htm" },
  { title: "Gladihoppers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/gladihopperss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/gladi-hoppers.html" },
  { title: "Google Baseball", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/googlebaseballl.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/google-baseball.html" },
  { title: "Google Dino", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/googledinoo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/google-dino.html" },
  { title: "Gorilla Tag Winter Feb 2023", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/winterfeb20233.png", htmlUrl: "https://raw.githubusercontent.com/xxuep/webport-list-for-wasm.rip-but-sf/main/gtagwinterfeb2023/winterfeb2023sf.html" },
  { title: "Grand Theft Auto III", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/gtaiii.jpe", htmlUrl: "https://raw.githubusercontent.com/woahhcrackers/GTA3Web/main/index.html" },
  { title: "Granny", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/grannyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/granny.html" },
  { title: "Granny 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/granny22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/granny-2.html" },
  { title: "Guess Their Answer", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/guesstheiranswerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/guess-their-answer.html" },
  { title: "Hanger 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/hanger22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/hanger-2.html" },
  { title: "Happy Wheels", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/happywheelss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/happy-wheels.html" },
  { title: "Helix Jump", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/helixjumpp.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/helix-jump.html" },
  { title: "Highway Traffic", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/highwaytrafficc.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/highway-traffic.html" },
  { title: "Hill Climb Racing Lite", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/hillclimblitee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/hill-climb-racing-lite.html" },
  { title: "Hole.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/holeioo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/hole-io.html" },
  { title: "House of Hazards", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/houseofhazardss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/house-of-hazards.html" },
  { title: "Hover Racer Drive", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/hoverracerdrivee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/hover-racer-drive.html" },
  { title: "Ice Dodo", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/icedodoo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ice-dodo.html" },
  { title: "Idle Breakout", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/idlebreakoutt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/idlebreakout.html" },
  { title: "Idle Dice", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/idledicee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/idle-dice.html" },
  { title: "Infiltrating The Airship", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/infiltratingtheairshipp.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/infiltrating-the-airship.html" },
  { title: "Iron Snout", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ironsnoutt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/iron-snout.html" },
  { title: "Jacksmith", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/jacksmithh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/jacksmith.html" },
  { title: "Jetpack Joyride", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/jetpackk.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/jetpack-joyride.html" },
  { title: "Johnny Trigger", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/johnnytriggerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/johnny-trigger.html" },
  { title: "Jumping Shell", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/jumpingshelll.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/jumping-shell.html" },
  { title: "Karate Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/karatebross.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/karate-bros.html" },
  { title: "Kart Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/kartbross.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/kart-bros.html" },
  { title: "Keep Talking and Nobody Explodes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ktanee.jpe", htmlUrl: "https://raw.githubusercontent.com/squidward5/ktane-webport/main/singlefile.html" },
  { title: "Kittytoy", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/kittytoyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/kittytoy.html" },
  { title: "Learn To Fly", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/learntoflyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/learn-to-fly.html" },
  { title: "Learn To Fly 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/learntofly22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/learn-to-fly-2.html" },
  { title: "Learn To Fly 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/learntofly33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/learn-to-fly-3.html" },
  { title: "Learn To Fly Idle", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/learntoflyidle.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/learn-to-fly-idle.html" },
  { title: "Level Devil", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/leveldevill.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/level-devil.html" },
  { title: "Little Alchemy 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/littlealchemy22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/littlealchemy-2.html" },
  { title: "Madalin Stunt Cars 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/madalinstuntcars22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/madalin-stunt-cars-2.html" },
  { title: "Madness Project Nexus", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/madnessprojectnexuss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/madness-project-nexus.html" },
  { title: "Melon Playground", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/melonplaygroundd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/melon-playground.html" },
  { title: "Merge Round Racers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/mergeroundracerss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/merge-round-racers.html" },
  { title: "Minesweeper", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/minesweeperr.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/minesweeper.html" },
  { title: "Monkey Mart", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/monkeymartt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/monkey-mart.html" },
  { title: "Monster Tracks", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/monstertrackss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/monster-tracks.html" },
  { title: "Motherload", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motherloadd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/motherload.html" },
  { title: "MotoX3m", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3mm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m.htm" },
  { title: "MotoX3m 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3m22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m-2.html" },
  { title: "MotoX3m 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3m33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m-3.html" },
  { title: "MotoX3m Pool Party", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3mpoolpartyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m-pool-party.html" },
  { title: "MotoX3m Spooky Land", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3mspookylandd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m-spooky-land.html" },
  { title: "MotoX3m Winter", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/motox3mwinterr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/moto-x3m-winter.html" },
  { title: "Murder", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/murderr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/murder.html" },
  { title: "Noob Miner", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/noobminerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/noob-miner.html" },
  { title: "Open TTD", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/openttdd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/openTTD.html" },
  { title: "Opposite Day", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/oppositedayy.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/opposite-day.html" },
  { title: "OVO", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ovoo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ovo.html" },
  { title: "OVO 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ovo22.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ovo-2.html" },
  { title: "OVO 3 Dimensions", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ovo33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ovo-3-dimensions.html" },
  { title: "PacMan", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/pacmann.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/pac-man.html" },
  { title: "Papas Bakeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasbb.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-bakeria.html" },
  { title: "Papas Burgeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasbr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-burgeria.html" },
  { title: "Papas Cheeseria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasch.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-cheeseria.html" },
  { title: "Papas Cupcakeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papascc.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-cupcakeria.html" },
  { title: "Papas Donuteria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasdn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-donuteria.html" },
  { title: "Papas Freezeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasfz.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-freezeria.html" },
  { title: "Papas Hot Doggeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papashd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-hot-doggeria.html" },
  { title: "Papas Pancakeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papaspc.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-pancakeria.html" },
  { title: "Papas Pastaria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papaspt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-pastaria.html" },
  { title: "Papas Pizzeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papaspz.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-pizzeria.html" },
  { title: "Papas Scooperia", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papassc.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-scooperia.html" },
  { title: "Papas Sushiria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papasss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-sushiria.html" },
  { title: "Papas Taco Mia", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papastm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-taco-mia.html" },
  { title: "Papas Wingeria", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/papaswg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/papas-wingeria.html" },
  { title: "Paper.io 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/paperio22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/paper-io-2.htm" },
  { title: "Parking Fury", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/parkingfuryy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/parking-fury.html" },
  { title: "Parking Fury 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/parkingfury22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/parking-fury-2.html" },
  { title: "Parking Fury 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/parkingfury33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/parking-fury-3.html" },
  { title: "PEAK", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/peakk.jpe", htmlUrl: "https://raw.githubusercontent.com/xxuep/webport-list-for-wasm.rip-but-sf/main/peak" },
  { title: "Picos School", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/picosschooll.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/picos-school.html" },
  { title: "Ping Pong Chaos", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/pingpongchaoss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ping-pong-chaos.html" },
  { title: "Pixel Speedrun", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/pixelspeedrunn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/pixel-speedrun.html" },
  { title: "Plants Vs Zombies", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/pvzz.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/plants-vs-zombies.html" },
  { title: "Plonky", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/plonkyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/plonky.html" },
  { title: "Poly Track", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/polytrackk.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/polytrack.html" },
  { title: "Poor Bunny", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/poorbunnyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/poor-bunny.html" },
  { title: "Pou", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/pouu.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/pou.html" },
  { title: "Ragdoll Archers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ragdollarcherss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ragdoll-archers.htm" },
  { title: "Ragdoll Hit", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ragdollhitt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ragdoll-hit.html" },
  { title: "Ragdoll Soccer", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ragdollsoccerss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/ragdoll-soccer.html" },
  { title: "Red Ball 4 Vol.1", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/redballvol11.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/red-ball-4-vol-1.html" },
  { title: "Red Ball 4 Vol.2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/redballvol22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/red-ball-4-vol-2.html" },
  { title: "Red Ball 4 Vol.3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/redballvol33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/red-ball-4-vol-3.html" },
  { title: "Retro Bowl College", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/retrobowlcollegee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/retro-bowl-college.html" },
  { title: "Retro Bowl", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/retrobowll.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/retro-bowl.html" },
  { title: "Retro Highway", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/retrohighwayy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/retro-highway.html" },
  { title: "Riddle School", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddleschooll.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-school.html" },
  { title: "Riddle School 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddleschool22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-school-2.html" },
  { title: "Riddle School 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddleschool33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-school-3.html" },
  { title: "Riddle School 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddleschool44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-school-4.html" },
  { title: "Riddle School 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddleschool55.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-school-5.html" },
  { title: "Riddle Transfer", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddletransferr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-transfer.html" },
  { title: "Riddle Transfer 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/riddletransfer22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/riddle-transfer-2.html" },
  { title: "Rocket Soccer Derby", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/rocketsoccerderbyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/rocket-soccer-derby.html" },
  { title: "Rooftop Run", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/rooftoprunn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/rooftop-run.html" },
  { title: "Rooftop Snipers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/rooftopsniperss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/rooftop-snipers.htm" },
  { title: "Rooftop Snipers 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/rooftopsnipers22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/rooftop-snipers-2.html" },
  { title: "Run", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/runn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/run.html" },
  { title: "Run 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/run22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/run-2.html" },
  { title: "Run 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/run33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/run-3.html" },
  { title: "Sand Game", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sandgamee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/sand-game.html" },
  { title: "Sandbox City", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sandboxcityy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/sandbox-city.html" },
  { title: "Short Life", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/shortlifee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/short-life.html" },
  { title: "Six Cats Under", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sixcatsunderr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/six-cats-under.html" },
  { title: "Slope", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/slopee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/slope.html" },
  { title: "Slope 2 Player", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/slope22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/slope-2-player.html" },
  { title: "Slope 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/slope33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/slope-3.html" },
  { title: "Slow Roads", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/slowroadss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/slow-roads.html" },
  { title: "Super Mario 63", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/supermario633.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/sm-63.html" },
  { title: "Super Mario 64", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/supermario644.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/sm-64.html" },
  { title: "Snail Bob", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbobb.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob.html" },
  { title: "Snail Bob 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-2.html" },
  { title: "Snail Bob 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-3.html" },
  { title: "Snail Bob 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-4.html" },
  { title: "Snail Bob 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob55.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-5.html" },
  { title: "Snail Bob 6", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob66.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-6.html" },
  { title: "Snail Bob 7", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob77.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-7.html" },
  { title: "Snail Bob 8", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snailbob88.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snail-bob-8.html" },
  { title: "Snow Rider", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snowriderr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snow-rider.htm" },
  { title: "Snow Road", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snowroadd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snow-road.htm" },
  { title: "Snowball.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/snowballioo.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/snowball-io.html" },
  { title: "Soccer Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/soccerbross.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/soccer-bros.html" },
  { title: "Soccer Random", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/soccerrandomm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/soccer-random.htm" },
  { title: "Space Is Key", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/spaceiskeyy.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/space-is-key.html" },
  { title: "Space Is Key 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/spaceiskey22.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/space-is-key-2.html" },
  { title: "Space Waves", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/spacewavess.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/space-waves.html" },
  { title: "Spacebar Clicker", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/spacebarclickerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/spacebar-clicker.html" },
  { title: "Speed Stars", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/speedstarss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/speed-stars.html" },
  { title: "Sprunki", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sprunkii.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/sprunki.html" },
  { title: "Stack", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stackk.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stack.html" },
  { title: "Stacktris", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stacktris.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stacktris.html" },
  { title: "State.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stateioo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/state-io.html" },
  { title: "Stealing the Diamond", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stealingthediamondd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stealing-the-diamond.html" },
  { title: "Stick Archers Battle", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stickarchersbattlee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stick-archers-battle.html" },
  { title: "Stick Fighter", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stickfighterr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stick-fighter.html" },
  { title: "Stick Merge", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stickmergee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stick-merge.html" },
  { title: "Stickman Hook", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/stickmanhookk.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/stickman-hook.html" },
  { title: "Subway Surfers Beijing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ssbeijingg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/subway-surfers-beijing.html" },
  { title: "Subway Surfers Havana", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sshavanaa.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/subway-surfers-havana.html" },
  { title: "Subway Surfers San Francisco", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/sssanfranciscoo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/subway-surfers-san-francisco.html" },
  { title: "Super Bike the Champion", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/superbikethechampionn.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/super-bike-the-champion.html" },
  { title: "Super Liquid Soccer", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/superliquidsoccerr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/super-liquid-soccer.html" },
  { title: "Super Star Car", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/supercarstarr.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/super-star-car.html" },
  { title: "SuperHot", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/superhott.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/superhot.html" },
  { title: "Table Tennis World Tour", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/ttwtt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/table-tennis-world-tour.html" },
  { title: "Tag", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/taggamee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tag.html" },
  { title: "Tanuki Sunset", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tanukisunsett.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tanuki-sunset.html" },
  { title: "Tap Road", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/taproadd.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tap-road.html" },
  { title: "Temple of Boom", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/templeofboomm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/temple-of-boom.html" },
  { title: "Temple Run 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/templerun22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/temple-run-2.htm" },
  { title: "Territorial.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/territorialioo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/territorial-io.html" },
  { title: "Tetrominoes", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tetrominn.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tetrominoes.html" },
  { title: "The Impossible Quiz", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/impossiblequizz.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/the-impossible-quiz.html" },
  { title: "The Impossible Quiz 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/impossiblequiz22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/the-impossible-quiz-2.html" },
  { title: "There Is No Game", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/thereisnogamee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/there-is-no-g.html" },
  { title: "They Are Coming", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/theyarecomingg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/they-are-coming.html" },
  { title: "This Is the Only Level", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/thisistheonlylevell.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/this-is-the-only-level.html" },
  { title: "This Is the Only Level Too", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/thisistheonlylevel22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/this-is-the-only-level-too.html" },
  { title: "Time Shooter 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/timeshooter22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/time-shooter-2.html" },
  { title: "Time Shooter 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/timeshooter33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/time-shooter-3.htm" },
  { title: "Tiny Fishing", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tinyfishingg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tiny-fishing.html" },
  { title: "Tomb of the Mask", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tombofthemaskk.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tomb-of-the-mask.htm" },
  { title: "Trap the Cat", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/trapthecatt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/trap-the-cat.html" },
  { title: "Trees Hate You", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/treeshateyouu.jpe", htmlUrl: "https://raw.githubusercontent.com/xxuep/webport-list-for-wasm.rip-but-sf/main/treeshateyou/treeshateyousf.html" },
  { title: "Trivia Crack", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/triviacrackk.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/trivia-crack.html" },
  { title: "Tube Jumpers", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tubejumperss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tube-jumpers.html" },
  { title: "Tunnel Rush", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/tunnelrushh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/tunnel-rush.html" },
  { title: "Unicycle Hero", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/unicycleheroo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/unicycle-hero.html" },
  { title: "Vex x3m", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vexx3mm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-x3m.html" },
  { title: "Vex x3m 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vexx3m22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-x3m-2.html" },
  { title: "Vex 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vex44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-4.html" },
  { title: "Vex 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vex55.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-5.html" },
  { title: "Vex 6", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vex66.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-6.html" },
  { title: "Vex 7", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vex77.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-7.htm" },
  { title: "Vex 8", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/vex88.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/vex-8.htm" },
  { title: "Volley Random", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/volleyrandomm.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/volley-random.html" },
  { title: "War the Knights", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wartheknightss.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/war-the-knights.html" },
  { title: "We Become What We Behold", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wbwwbb.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/we-become-what-we-behold.html" },
  { title: "Wheelie Bike", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheeliebikee.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheelie-bike.html" },
  { title: "Wheely", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheelyy.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely.html" },
  { title: "Wheely 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-2.html" },
  { title: "Wheely 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-3.html" },
  { title: "Wheely 4", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely44.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-4.html" },
  { title: "Wheely 5", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely55.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-5.html" },
  { title: "Wheely 6", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely66.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheel-6.html" },
  { title: "Wheely 7", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely77.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-7.html" },
  { title: "Wheely 8", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wheely88.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wheely-8.html" },
  { title: "Wordle Unlimited", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wordleunlimitedd.png", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wordle-unlimited.html" },
  { title: "Worlds Hardest Game", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/whgg.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/worlds-hardest-game.html" },
  { title: "Worlds Hardest Game 2", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/whg22.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/worlds-hardest-game-2.html" },
  { title: "Worlds Hardest Game 3", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/whg33.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/worlds-hardest-game-3.html" },
  { title: "Wrestle Bros", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/wrestlebross.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/wrestle-bros.html" },
  { title: "Yohoho.io", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/yohohoioo.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/yohoho-io.html" },
  { title: "Zombie Rush", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/zombierushh.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/zombie-rush.html" },
  { title: "Zrist", img: "https://raw.githubusercontent.com/xxuep/offline-game-thumbnails/main/zristt.jpe", htmlUrl: "https://raw.githubusercontent.com/CoolDude2349/Offline-Single-File-Games/master/offline/zrist.html" },
]





const movieGridData = [
  {
    title: "Backrooms (2026)",
    thumb: "https://raw.githubusercontent.com/xxuep/movie-thumbnails/main/backroomsmoviecool.jpe",
    embedUrl: "https://drive.google.com/file/d/1-K2eTaok437rd6bDzPotVfWKfS1o-kAw/preview"
  }
];

// ======= elements =======
const tabsBar = document.getElementById('tabsBar');
const tabsNewBtn = document.getElementById('tabsNewBtn');
const chromeBar = document.getElementById('chromeBar');
const address = document.getElementById('address');
const searchInput = document.getElementById('search');
const newtab = document.getElementById('newtab');
const iframe = document.getElementById('viewer');
const iframeLoadingBg = document.getElementById('iframe-loading-bg');
const newTabBtn = document.getElementById('newTabBtn');
const closeBtn = document.getElementById('closeBtn');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const searchEngineSelect = document.getElementById('searchEngineSelect');

// Extensions logic
const extensionsBtn = document.getElementById('extensionsBtn');
const extensionsPanel = document.getElementById('extensions-panel');
const extClose = document.getElementById('ext-close');
const extReset = document.getElementById('ext-reset');
const throwablesLayer = document.getElementById('throwables-layer');

if (extensionsBtn) extensionsBtn.addEventListener('click', () => extensionsPanel.classList.toggle('hidden'));
if (extClose) extClose.addEventListener('click', () => extensionsPanel.classList.add('hidden'));

let currentThrowable = null;
let onekoActive = false;

const extTomato = document.getElementById('ext-tomato');
const extAxe = document.getElementById('ext-axe');
const extBottle = document.getElementById('ext-bottle');
const extOneko = document.getElementById('ext-oneko');

if (extTomato) extTomato.addEventListener('click', () => selectThrowable('tomato'));
if (extAxe) extAxe.addEventListener('click', () => selectThrowable('axe'));
if (extBottle) extBottle.addEventListener('click', () => selectThrowable('bottle'));

if (extOneko) extOneko.addEventListener('click', (e) => {
  onekoActive = !onekoActive;
  e.currentTarget.classList.toggle('active', onekoActive);
  if(onekoActive) initOneko();
  else removeOneko();
});

if (extReset) extReset.addEventListener('click', () => {
  if (throwablesLayer) throwablesLayer.innerHTML = '';
});

function selectThrowable(type) {
  currentThrowable = type;
  document.querySelectorAll('.ext-item').forEach(el => el.classList.remove('active'));
  const activeExt = document.getElementById('ext-' + type);
  if (activeExt) activeExt.classList.add('active');
}

// Intercept clicks on iframe wrapper to throw objects
document.addEventListener('click', (e) => {
  if(!currentThrowable || !throwablesLayer) return;
  if (e.clientY < 93) return;

  const rect = throwablesLayer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  throwObject(currentThrowable, x, y);
});

if (iframe) {
  iframe.addEventListener('load', () => {
    try {
      const iDoc = iframe.contentDocument;
      if(iDoc) {
        iDoc.addEventListener('click', (e) => {
          if(currentThrowable) {
            const x = e.clientX;
            const y = e.clientY;
            throwObject(currentThrowable, x, y);
          }
        });

        // Pass mousemove for Oneko
        iDoc.addEventListener('mousemove', (e) => {
          if(onekoActive) {
            window.lastIframeMouseX = e.clientX;
            window.lastIframeMouseY = e.clientY;
          }
        });
      }
    } catch(e) {}
  });
}

function throwObject(type, x, y) {
  if (!throwablesLayer) return;
  const anim = document.createElement('div');
  anim.className = 'throw-anim';
  anim.style.left = '50%';
  anim.style.top = '100%';
  
  let emoji = '🍅';
  if(type === 'axe') emoji = '🪓';
  if(type === 'bottle') emoji = '🍾';
  anim.innerText = emoji;
  
  anim.style.animation = 'throwSpin 0.5s linear forwards';
  anim.style.transition = 'all 0.5s ease-out';
  throwablesLayer.appendChild(anim);

  setTimeout(() => {
    anim.style.left = x + 'px';
    anim.style.top = y + 'px';
  }, 10);

  setTimeout(() => {
    anim.remove();
    createSplat(type, x, y);
  }, 500);
}

function createSplat(type, x, y) {
  if (!throwablesLayer) return;
  const splat = document.createElement('div');
  splat.style.left = x + 'px';
  splat.style.top = y + 'px';
  
  if (type === 'tomato') {
    splat.className = 'splatter';
    splat.innerText = '💥'; 
  } else if (type === 'axe') {
    splat.className = 'axe-stuck';
    splat.innerText = '🪓';
  } else if (type === 'bottle') {
    splat.className = 'bottle-shatter';
    splat.innerText = '💦'; 
    
    for (let i = 0; i < 6; i++) {
        const piece = document.createElement('div');
        piece.className = 'bottle-piece';
        piece.innerText = '🧊';
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        throwablesLayer.appendChild(piece);
        setTimeout(() => piece.remove(), 1000);
    }
  }
  throwablesLayer.appendChild(splat);
}

// --- Oneko Cursor Tracker Implementation ---
let onekoEl, onekoInterval;
let mousePosX = 0, mousePosY = 0;
function initOneko() {
  if (document.getElementById('oneko-cat')) return;
  onekoEl = document.createElement('div');
  onekoEl.id = 'oneko-cat';
  onekoEl.style.width = '32px';
  onekoEl.style.height = '32px';
  onekoEl.style.position = 'fixed';
  onekoEl.style.pointerEvents = 'none';
  onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
  onekoEl.style.imageRendering = 'pixelated';
  onekoEl.style.left = '16px';
  onekoEl.style.top = '16px';
  onekoEl.style.zIndex = '10007';
  document.body.appendChild(onekoEl);

  document.addEventListener('mousemove', (e) => {
    mousePosX = e.clientX;
    mousePosY = e.clientY;
  });

  let catX = 32, catY = 32;
  let frame = 0;

  onekoInterval = setInterval(() => {
    if (document.activeElement === iframe && window.lastIframeMouseX !== undefined) {
      mousePosX = window.lastIframeMouseX + 64; 
      mousePosY = window.lastIframeMouseY + 93; 
    }

    const diffX = mousePosX - catX;
    const diffY = mousePosY - catY;
    const distance = Math.sqrt(diffX**2 + diffY**2);
    
    if (distance > 10) {
      catX += diffX * 0.1;
      catY += diffY * 0.1;
      
      let direction = '';
      if(diffY < -10) direction = 'N';
      else if(diffY > 10) direction = 'S';
      if(diffX < -10) direction += 'W';
      else if(diffX > 10) direction += 'E';

      let bgPosX = -32, bgPosY = 0; 
      if(direction.includes('W')) bgPosX = -64;
      if(direction.includes('E')) bgPosX = 0;
      
      frame = (frame === 0) ? 1 : 0;
      bgPosY = frame * -32;

      onekoEl.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    } else {
      onekoEl.style.backgroundPosition = `-32px 0px`;
    }

    onekoEl.style.left = (catX - 16) + 'px';
    onekoEl.style.top = (catY - 16) + 'px';
  }, 50);
}

function removeOneko() {
  if (onekoEl) onekoEl.remove();
  clearInterval(onekoInterval);
}

// Sidebar & Page Elements
const pageContainers = {
  home: { btns: [document.getElementById('nav-home')], hide: [] }, 
  page2: { btn: document.getElementById('nav-page2'), el: document.getElementById('page2') },
  page3: { btn: document.getElementById('nav-page3'), el: document.getElementById('page3') },
  settings: { btn: document.getElementById('nav-settings'), el: document.getElementById('settings-page') },
  credits: { btn: document.getElementById('nav-credits'), el: document.getElementById('credits-page') }
};

// ======= tab model =======
let tabs = [];
let currentTabId = null;
let nextTabId = 1;

// ======= customizable shortcuts =======
const savedShortcuts = [
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'YouTube', url: 'https://youtube.com' },
  { name: 'Discord', url: 'https://discord.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Spotify', url: 'https://open.spotify.com' }
];

function updateTopOffsets() {
  if (!tabsBar || !chromeBar || !iframe) return;
  const tabsH = tabsBar.offsetHeight;
  const chromeH = chromeBar.offsetHeight;
  const warningEl = document.getElementById('compat-warning');
  const warningH = (warningEl && warningEl.style.display !== 'none') ? warningEl.offsetHeight : 0;
  const totalHeaderH = tabsH + chromeH + warningH;

  chromeBar.style.top = tabsH + 'px';
  if (warningEl) warningEl.style.top = (tabsH + chromeH) + 'px';
  
  iframe.style.top = totalHeaderH + 'px';
  iframe.style.height = (window.innerHeight - totalHeaderH) + 'px';
  
  if (iframeLoadingBg) {
    iframeLoadingBg.style.top = totalHeaderH + 'px';
    iframeLoadingBg.style.height = (window.innerHeight - totalHeaderH) + 'px';
  }
  if (newtab) {
    newtab.style.top = totalHeaderH + 'px';
    newtab.style.height = (window.innerHeight - totalHeaderH) + 'px';
  }
}

async function checkCompatibility() {
  const warningEl = document.getElementById('compat-warning');
  if (!warningEl) return;

  let isIncompatible = false;

  if (location.protocol === 'file:' || location.protocol === 'data:') isIncompatible = true;
  if (!('serviceWorker' in navigator)) isIncompatible = true;
  if (window.origin === 'null' || location.href === 'about:blank') isIncompatible = true;

  if (!isIncompatible) {
    try {
      const res = await fetch('/uv/sw.js', { method: 'HEAD' });
      if (!res.ok) isIncompatible = true;
    } catch (err) {
      isIncompatible = true;
    }
  }

  if (isIncompatible) {
    warningEl.style.display = 'block';
    updateTopOffsets();
  }
}

checkCompatibility();

function switchView(viewName) {
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  if (pageContainers.page2.el) pageContainers.page2.el.style.display = 'none';
  if (pageContainers.page3.el) pageContainers.page3.el.style.display = 'none';
  if (pageContainers.settings.el) pageContainers.settings.el.style.display = 'none';
  if (pageContainers.credits.el) pageContainers.credits.el.style.display = 'none';

  if (viewName === 'home') {
    if (pageContainers.home.btns[0]) pageContainers.home.btns[0].classList.add('active');
    if (tabsBar) tabsBar.style.display = 'flex';
    if (chromeBar) chromeBar.style.display = 'flex';
    if (currentTabId != null) switchToTab(currentTabId); 
  } else {
    if (tabsBar) tabsBar.style.display = 'none';
    if (chromeBar) chromeBar.style.display = 'none';
    if (newtab) newtab.style.display = 'none';
    if (iframe) {
      iframe.style.display = 'none';
      iframe.src = 'about:blank';
    }
    if (iframeLoadingBg) iframeLoadingBg.style.display = 'none';
    
    if (pageContainers[viewName].btn) pageContainers[viewName].btn.classList.add('active');
    if (pageContainers[viewName].el) pageContainers[viewName].el.style.display = 'block';
  }
}

if (pageContainers.home.btns[0]) pageContainers.home.btns[0].addEventListener('click', () => switchView('home'));
if (pageContainers.page2.btn) pageContainers.page2.btn.addEventListener('click', () => switchView('page2'));
if (pageContainers.page3.btn) pageContainers.page3.btn.addEventListener('click', () => switchView('page3'));
if (pageContainers.settings.btn) pageContainers.settings.btn.addEventListener('click', () => switchView('settings'));
if (pageContainers.credits.btn) pageContainers.credits.btn.addEventListener('click', () => switchView('credits'));

function getSearchEnginePrefix() {
  const engine = localStorage.getItem('xxuep_engine') || 'duckduckgo';
  const engines = {
    'google': 'https://www.google.com/search?q=',
    'duckduckgo': 'https://duckduckgo.com/?q=',
    'brave': 'https://search.brave.com/search?q=',
    'yahoo': 'https://search.yahoo.com/search?p=',
    'bing': 'https://www.bing.com/search?q='
  };
  return engines[engine] || engines['duckduckgo'];
}

function getSearchEngineName() {
  const engine = localStorage.getItem('xxuep_engine') || 'duckduckgo';
  const names = {
    'google': 'Google',
    'duckduckgo': 'DuckDuckGo',
    'brave': 'Brave',
    'yahoo': 'Yahoo',
    'bing': 'Bing'
  };
  return names[engine] || 'DuckDuckGo';
}

function normalizeUrl(url) {
  let searchUrl = getSearchEnginePrefix();
  if (!url.includes(".") || url.includes(" ")) return searchUrl + encodeURIComponent(url);
  if (!url.startsWith("http://") && !url.startsWith("https://")) return "https://" + url;
  return url;
}

function getDomainFromInput(input) {
  try {
    let maybe = input.trim();
    if (!/^([a-zA-Z][a-zA-Z\d+\-.]*:)?\/\//.test(maybe)) {
      if (!maybe.includes('.')) return null; 
      maybe = 'https://' + maybe;
    }
    const u = new URL(maybe);
    return u.hostname;
  } catch (e) {
    return null;
  }
}

function faviconForInput(input) {
  const domain = getDomainFromInput(input);
  if (!domain) return DEFAULT_FAVICON;
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

function createTabElement(tab) {
  const el = document.createElement('div');
  el.className = 'tab';
  el.dataset.tabId = tab.id;

  const fav = document.createElement('img');
  fav.className = 'favicon';
  fav.src = tab.favicon || DEFAULT_FAVICON;

  const t = document.createElement('div');
  t.className = 'title';
  t.textContent = tab.title || 'new tab';

  const close = document.createElement('div');
  close.className = 'close';
  close.innerHTML = '✕'; 

  el.appendChild(fav); el.appendChild(t); el.appendChild(close);

  el.addEventListener('click', (e) => {
    if (e.target === close) return;
    switchToTab(tab.id);
  });
  close.addEventListener('click', (e) => { e.stopPropagation(); closeTab(tab.id); });
  return el;
}

function renderTabs() {
  if (!tabsBar) return;
  Array.from(tabsBar.querySelectorAll('.tab')).forEach(n => n.remove());
  for (const tab of tabs) {
    const tabEl = createTabElement(tab);
    if (tab.id === currentTabId) tabEl.classList.add('active');
    tabsBar.insertBefore(tabEl, tabsNewBtn);
  }
  updateTopOffsets();
}

function createTab(initialInput = '') {
  const id = nextTabId++;
  const title = initialInput ? initialInput : 'new tab';
  const favicon = faviconForInput(initialInput || '');
  const tab = {
    id,
    title,
    input: initialInput,
    iframeUrl: '',
    history: [],
    index: -1,
    favicon,
    newtabValue: '' 
  };
  tabs.push(tab);
  currentTabId = id;
  renderTabs();
  switchToTab(id);
  setTimeout(() => {
    if (!tab.iframeUrl && searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }, 0);
  return tab;
}

// -------------------------------------------------------------
// THIS IS THE FIXED AND COMPLETED `navigateTab` FUNCTION 
// -------------------------------------------------------------
async function navigateTab(tabId, input) {
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return;

  tab.input = input;
  
  const isSearch = !input.includes(".") || input.includes(" ");
  if (isSearch) {
    tab.title = `${input} - ${getSearchEngineName()}`;
  } else {
    tab.title = input;
  }
  
  tab.favicon = faviconForInput(input);
  tab.newtabValue = ''; 

  if (connection) {
    try {
      if (!await connection.getTransport()) {
        await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
      }
    } catch (err) {
      console.warn("Transport setup error: ", err);
    }
  }

  const normalizedUrl = normalizeUrl(input);
  
  // Checking for standard UV config and building URL
  let final = normalizedUrl;
  if (typeof __uv$config !== 'undefined') {
      final = __uv$config.prefix + __uv$config.encodeUrl(normalizedUrl);
  } else {
      console.error("Ultraviolet configuration (__uv$config) is not defined. Iframe route may break.");
  }

  tab.history = tab.history.slice(0, tab.index + 1);
  tab.history.push(final); 
  tab.index = tab.history.length - 1; 
  tab.iframeUrl = final;

  if (address) address.textContent = normalizedUrl;
  if (iframe) {
    iframe.style.display = 'block'; 
    iframe.src = final;
  }
  if (newtab) newtab.style.display = 'none'; 
  renderTabs();
}

function switchToTab(tabId) {
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return; currentTabId = tabId;

  if (tab.iframeUrl) {
    if (iframe) {
        iframe.style.display = 'block'; 
        iframe.src = tab.history[tab.index] || tab.iframeUrl;
    }
    if (newtab) newtab.style.display = 'none';
  } else {
    if (iframe) {
        iframe.style.display = 'none'; 
        iframe.src = 'about:blank';
    }
    if (newtab) newtab.style.display = 'flex'; 
    if (searchInput) searchInput.value = tab.newtabValue || '';
  }
  renderTabs();
}

function closeTab(tabId) {
  const idx = tabs.findIndex(t => t.id === tabId);
  if (idx === -1) return;
  const wasCurrent = (tabs[idx].id === currentTabId);
  tabs.splice(idx, 1);
  if (tabs.length === 0) { createTab(); return; }
  if (wasCurrent) switchToTab(tabs[Math.min(idx, tabs.length - 1)].id);
  else renderTabs();
}

function goBack() {
  const tab = tabs.find(t => t.id === currentTabId);
  if (!tab || tab.index <= 0) return;
  tab.index--; 
  if (iframe) iframe.src = tab.history[tab.index];
}

function goForward() {
  const tab = tabs.find(t => t.id === currentTabId);
  if (!tab || tab.index >= tab.history.length - 1) return;
  tab.index++; 
  if (iframe) iframe.src = tab.history[tab.index];
}

if (tabsNewBtn) tabsNewBtn.addEventListener('click', () => createTab());
if (newTabBtn) newTabBtn.addEventListener('click', () => createTab());
if (closeBtn) closeBtn.addEventListener('click', () => { if (currentTabId != null) closeTab(currentTabId); });
if (backBtn) backBtn.addEventListener('click', goBack);
if (forwardBtn) forwardBtn.addEventListener('click', goForward);

if (searchInput) {
  searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const val = searchInput.value.trim();
      if (!val) return;
      if (currentTabId == null) { 
        const t = createTab(val); 
        navigateTab(t.id, val); 
      } else {
        navigateTab(currentTabId, val);
      }
    }
  });
}

if (searchEngineSelect) {
  searchEngineSelect.value = localStorage.getItem('xxuep_engine') || 'duckduckgo';
  searchEngineSelect.addEventListener('change', (e) => {
    localStorage.setItem('xxuep_engine', e.target.value);
  });
}

function renderShortcuts() {
  const container = document.getElementById('shortcuts');
  if (!container) return;
  container.innerHTML = '';
  savedShortcuts.forEach(sc => {
    const el = document.createElement('div');
    el.className = 'shortcut';
    
    const img = document.createElement('img');
    img.src = faviconForInput(sc.url);
    
    const span = document.createElement('span');
    span.textContent = sc.name;
    
    el.appendChild(img);
    el.appendChild(span);
    
    el.addEventListener('click', () => {
       if (currentTabId == null) {
         const t = createTab(sc.url);
         navigateTab(t.id, sc.url);
       } else {
         navigateTab(currentTabId, sc.url);
       }
    });
    container.appendChild(el);
  });
}

function openVideoPlayer(item) {
  const win = window.open("about:blank");
  if (!win) {
    alert("Please allow popups for video playback.");
    return;
  }
  const title = String(item.title || "Video")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  const src = String(item.embedUrl || "");

  win.document.open();
  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
#frame { position: fixed; inset: 0; width: 100vw; height: 100vh; border: none; display: block; background: #000; }
.overlay { position: fixed; inset: 0; pointer-events: none; }
.badge { position: absolute; left: 16px; bottom: 16px; padding: 8px 12px; border-radius: 999px; background: rgba(0,0,0,0.35); color: #a0a0a0; font: 12px Inter, sans-serif; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
</style>
</head>
<body>
<iframe id="frame" src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<div class="overlay"><div class="badge">Elite</div></div>
</body>
</html>`);
  win.document.close();
}

function buildVideoGrid(containerId, dataArray) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  dataArray.forEach(item => {
    const el = document.createElement("div");
    el.className = "grid-item";
    el.innerHTML = `
      <img src="${item.thumb}" alt="${item.title}" />
      <div class="info">${item.title}</div>
    `;
    el.addEventListener("click", () => openVideoPlayer(item));
    container.appendChild(el);
  });
}

async function openCloakedTab(htmlUrl) {
    const win = window.open("about:blank");
    if (!win) {
        alert("Please allow popups for about:blank deployment to work.");
        return;
    }
    try {
        const response = await fetch(htmlUrl);
        const html = await response.text();
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        win.document.write("Failed to load: " + err);
    }
}

function buildGrid(containerId, dataArray) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  dataArray.forEach(item => {
    const el = document.createElement('div');
    el.className = 'grid-item';
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" />
      <div class="info">${item.title}</div>
    `;
    el.addEventListener('click', () => openCloakedTab(item.htmlUrl));
    container.appendChild(el);
  });
}

// Initialize UI Elements
buildGrid('grid1-container', grid1Data);
buildVideoGrid("grid2-container", movieGridData);
renderShortcuts();
createTab(); 
switchView('home'); 
window.addEventListener('resize', updateTopOffsets);