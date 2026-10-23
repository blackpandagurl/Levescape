const board = document.getElementById("game-board");
const roomItems = document.getElementById("room-items");
const catLayer = document.getElementById("cat-layer");
const player = document.getElementById("player");
const roomName = document.getElementById("room-name");
const keyCounter = document.getElementById("key-counter");
const message = document.getElementById("message");

const gameOverOverlay = document.getElementById("game-over-overlay");
const gameOverText = document.getElementById("game-over-text");
const tryAgainButton = document.getElementById("try-again");

const introModal = document.getElementById("intro-modal");
const startButton = document.getElementById("start-game");

const challengeModal = document.getElementById("challenge-modal");
const challengeTitle = document.getElementById("challenge-title");
const challengeDescription = document.getElementById("challenge-description");
const challengeContent = document.getElementById("challenge-content");
const challengeFeedback = document.getElementById("challenge-feedback");
const closeChallengeButton = document.getElementById("close-challenge");


const gameMusic = document.getElementById("game-music");
const escapeEnding = document.getElementById("escape-ending");
const escapeEndingMessage = document.getElementById("escape-ending-message");
const escapeFreeButton = document.getElementById("escape-free");
const escapeStayButton = document.getElementById("escape-stay");

const TOTAL_KEYS = 6;
const SPEED = 1.55;

const STANDING = "🧍🏽‍♀️";
const RUNNING = "🏃🏽‍♀️";

const rooms = {
  wellness: {
    name: "Wellness Room",
    className: "wellness",
    message: "Your safe space! Find the key and take a deep breath.",
    key: { x: 48, y: 82 },
    pool: { x: 50, y: 53 },
    objects: [
      { emoji: "🪴", label: "Plant", type: "furniture", x: 15, y: 25 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 82, y: 25 },
      { emoji: "🧺", label: "Towels", type: "furniture", x: 83, y: 78 }
    ],
    doors: [
      { label: "Main Hall", to: "hall", edge: "top", x: 50, y: 0 }
    ]
  },

  hall: {
    name: "Main Hallway",
    className: "hall",
    message: "Six keys stand between you and freedom!",
    objects: [
      { emoji: "🖼️", label: "Hall mirror", type: "wall-item", x: 22, y: 20 },
      { emoji: "🪴", label: "Plant", type: "furniture", x: 48, y: 73 }
    ],
    doors: [
      { label: "Narrow Hall", to: "narrowHall", edge: "top", x: 50, y: 0 },
      { label: "Bathroom", to: "bathroom", edge: "left", x: 0, y: 28 },
      { label: "Red Room", to: "redRoom", edge: "left", x: 0, y: 73 },
      { label: "Living Room", to: "livingRoom", edge: "right", x: 100, y: 28 },
      { label: "Wellness", to: "wellness", edge: "right", x: 100, y: 73 },
      { label: "Bedroom", to: "bedroom", edge: "bottom", x: 50, y: 100 }
    ]
  },

  narrowHall: {
    name: "Narrow Hallway",
    className: "narrow-hall",
    message: "There it is, the front door!",
    narrow: true,
    objects: [
      { emoji: "🖼️", label: "Picture", type: "wall-item", x: 36, y: 35 },
      { emoji: "🖼️", label: "Picture", type: "wall-item", x: 64, y: 65 }
    ],
    doors: [
      { label: "Main Hall", to: "hall", edge: "bottom", x: 50, y: 100 },
      { label: "Front Door", to: "frontDoor", edge: "top", x: 50, y: 0 }
    ]
  },

  bathroom: {
    name: "Bathroom",
    className: "bathroom",
    message: "Ew, that smell! You gotta clean the litter box to earn the key!",
    challenge: "poo",
    objects: [
      { emoji: "🛁", label: "Bathtub", type: "furniture", x: 22, y: 25 },
      { emoji: "🚽", label: "Toilet", type: "furniture", x: 78, y: 25 },
      { emoji: "🪞", label: "Mirror", type: "wall-item", x: 50, y: 12 },
      { emoji: "🚰", label: "Sink", type: "furniture", x: 78, y: 72 },
      { emoji: "🧺", label: "Laundry", type: "furniture", x: 22, y: 77 }
    ],
    doors: [
      { label: "Main Hall", to: "hall", edge: "bottom", x: 50, y: 100 }
    ]
  },

  redRoom: {
    name: "Red Room",
    className: "red-room",
    message: "Grab the key and get out. Levi is extra quick in here!",
    key: { x: 88, y: 84 },
    objects: [
      {
        emoji: "📚",
        label: "Books about fully clothed people",
        type: "shelf",
        x: 22,
        y: 22
      },
      {
        emoji: "🎬",
        label: "Movies about how to save the town",
        type: "shelf",
        x: 78,
        y: 22
      },
      { emoji: "🛋️", label: "Sofa", type: "furniture", x: 27, y: 62 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 74, y: 57 },
      { emoji: "🍿", label: "Spicy snacks", type: "furniture", x: 50, y: 30 },
      {
        emoji: "📖",
        label: "Book: Why Am I Sweaty?",
        type: "furniture",
        x: 50,
        y: 76
      }
    ],
    cat: { x: 50, y: 48, pattern: "chase", speed: 1.05 },
    doors: [
      { label: "Main Hall", to: "hall", edge: "bottom", x: 50, y: 100 }
    ]
  },

  bedroom: {
    name: "Bedroom",
    className: "bedroom",
    message: "Clean every last bit of cat hair from the clothes to earn the key!",
    challenge: "clean",
    objects: [
      { emoji: "🛏️", label: "Bed", type: "furniture", x: 25, y: 28 },
      { emoji: "🗄️", label: "Nightstand", type: "furniture", x: 68, y: 24 },
      { emoji: "🪞", label: "Mirror", type: "wall-item", x: 80, y: 12 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 75, y: 70 },
      { emoji: "🧸", label: "Teddy bear", type: "furniture", x: 23, y: 77 }
    ],
    cat: { x: 52, y: 55, pattern: "lshape", speed: 0.85 },
    doors: [
      { label: "Main Hall", to: "hall", edge: "bottom", x: 50, y: 100 }
    ]
  },

  livingRoom: {
    name: "Living Room",
    className: "living-room",
    message: "Maybe you should check the Letters Puzzle Board.",
    carpet: { x: 50, y: 52 },
    challenge: "sliding",
    objects: [
      { emoji: "🛋️", label: "Sofa", type: "furniture", x: 25, y: 25 },
      { emoji: "📺", label: "TV stand", type: "furniture", x: 75, y: 20 },
      { emoji: "🪴", label: "Plant", type: "furniture", x: 17, y: 75 },
      { emoji: "🪑", label: "Armchair", type: "furniture", x: 83, y: 75 },
      { emoji: "🪵", label: "Side table", type: "furniture", x: 50, y: 18 }
    ],
    cat: { x: 50, y: 50, pattern: "horizontal", speed: 0.8 },
    doors: [
      { label: "Main Hall", to: "hall", edge: "left", x: 0, y: 50 },
      { label: "Kitchen", to: "kitchen", edge: "top", x: 50, y: 0 },
      { label: "Balcony", to: "balcony", edge: "right", x: 100, y: 50 }
    ]
  },

  kitchen: {
    name: "Kitchen",
    className: "kitchen",
    message: "The outside world is waiting. Can you set a healthy boundary?",
    challenge: "boundary",
    objects: [
      { emoji: "🧊", label: "Fridge", type: "furniture", x: 18, y: 23 },
      { emoji: "🍳", label: "Stove", type: "furniture", x: 50, y: 32 },
      { emoji: "🧼", label: "Sink", type: "furniture", x: 82, y: 23 },
      { emoji: "🍽️", label: "Kitchen table", type: "furniture", x: 50, y: 68 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 27, y: 76 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 73, y: 76 }
    ],
    cat: { x: 50, y: 45, pattern: "horizontal", speed: 0.75 },
    doors: [
      { label: "Living Room", to: "livingRoom", edge: "bottom", x: 50, y: 100 }
    ]
  },

  balcony: {
    name: "Balcony",
    className: "balcony",
    message: "Escape through the balcony! You don’t need any keys to try this way…",
    objects: [
      { emoji: "🪴", label: "Plant", type: "furniture", x: 18, y: 25 },
      { emoji: "🪑", label: "Chair", type: "furniture", x: 70, y: 25 },
      { emoji: "🪴", label: "Plant", type: "furniture", x: 20, y: 75 }
    ],
    doors: [
      { label: "Living Room", to: "livingRoom", edge: "left", x: 0, y: 50 },
      { label: "Escape This Way!", action: "trap", x: 77, y: 88 }
    ]
  },

  frontDoor: {
    name: "Front Door",
    className: "narrow-hall",
    message: "The final exit. You’ll need all six keys!",
    narrow: true,
    objects: [
      { emoji: "🪞", label: "Hall mirror", type: "wall-item", x: 34, y: 30 },
      { emoji: "🪴", label: "Plant", type: "furniture", x: 67, y: 70 }
    ],
    doors: [
      { label: "Open Front Door", action: "exit", edge: "top", x: 50, y: 0 },
      { label: "Narrow Hall", to: "narrowHall", edge: "bottom", x: 50, y: 100 }
    ]
  },

  outside: {
    name: "You Escaped!",
    className: "outside",
    message: "Yayy!",
    objects: [
      { emoji: "🌳", label: "Tree", type: "furniture", x: 80, y: 76 },
      { emoji: "🌷", label: "Flowers", type: "furniture", x: 20, y: 75 },
    ],
    doors: []
  }
};

let keys = 0;
let collectedKeys = new Set();
let completedChallenges = new Set();

let currentRoom = "wellness";
let gameOver = false;
let gameStarted = false;
let activeChallenge = null;

let catTimer = null;
let poopTimer = null;
let catElement = null;
let catPosition = { x: 50, y: 50 };
let catDirection = 1;
let catStep = 0;

let playerPosition = { x: 50, y: 55 };
let isMoving = false;
let lastRoomChange = 0;

let heldDirection = null;
let heldKey = null;
let keyboardTimer = null;
let keyboardLocked = false;

let mouseMoveTimer = null;
let challengeTimer = null;
let challengeDeadline = 0;
let cleaningCanvas = null;
let cleaningCtx = null;

function makeObject(object) {
  const el = document.createElement("div");
  el.className = `room-object ${object.type || ""}`;
  el.style.left = object.x + "%";
  el.style.top = object.y + "%";

  const emoji = document.createElement("span");
  emoji.className = "object-emoji";
  emoji.textContent = object.emoji;

  const label = document.createElement("span");
  label.textContent = object.label;

  el.append(emoji, label);
  return el;
}

function stopCatMovement() {
  if (catTimer) {
    clearInterval(catTimer);
    catTimer = null;
  }
}

function stopMouseMovement() {
  if (mouseMoveTimer) {
    clearInterval(mouseMoveTimer);
    mouseMoveTimer = null;
  }

  setMoving(false);
}

function stopKeyboardMovement(lock = false) {
  if (keyboardTimer) {
    clearInterval(keyboardTimer);
    keyboardTimer = null;
  }

  heldDirection = null;

  if (lock) {
    keyboardLocked = true;
  }

  setMoving(false);
}

function setFacing(direction) {
  player.classList.remove("facing-left", "facing-right", "facing-up", "facing-down");
  player.classList.add("facing-" + direction);
}

function setMoving(moving) {
  isMoving = moving;
  player.textContent = moving ? RUNNING : STANDING;
}

function updateStats() {
  keyCounter.textContent = `Keys: ${keys} / ${TOTAL_KEYS}`;
}

function renderRoom() {
  stopCatMovement();
  stopMouseMovement();

  const room = rooms[currentRoom];

  roomName.textContent = room.name;
  updateStats();

  board.className = "room " + room.className;
  roomItems.replaceChildren();
  catLayer.replaceChildren();
  catElement = null;

  if (room.narrow) {
    const leftWall = document.createElement("div");
    leftWall.className = "corridor-wall left";

    const rightWall = document.createElement("div");
    rightWall.className = "corridor-wall right";

    roomItems.append(leftWall, rightWall);
  }

  if (room.pool) {
    roomItems.append(
      makeObject({
        emoji: "💧",
        label: "Swimming Pool",
        type: "pool",
        x: room.pool.x,
        y: room.pool.y
      })
    );
  }

  if (room.carpet) {
    roomItems.append(
      makeObject({
        emoji: "🟣",
        label: "Carpet",
        type: "carpet",
        x: room.carpet.x,
        y: room.carpet.y
      })
    );
  }

  room.objects.forEach(object => {
    roomItems.append(makeObject(object));
  });

  if (room.key && !collectedKeys.has(currentRoom)) {
    const key = document.createElement("div");
    key.className = "hidden-key";
    key.textContent = "🔑";
    key.style.left = room.key.x + "%";
    key.style.top = room.key.y + "%";
    roomItems.append(key);
  }

  if (room.challenge && !completedChallenges.has(currentRoom)) {
    const challengeData = {
      bathroom: {
        emoji: "🧻",
        label: "Clean-Up Challenge",
        x: 50,
        y: 84
      },
      livingRoom: {
        emoji: "🧩",
        label: "Letters Puzzle Board",
        x: 50,
        y: 80
      },
      kitchen: {
        emoji: "📦",
        label: "Outside-World Test",
        x: 50,
        y: 87
      },
      bedroom: {
        emoji: "🧺",
        label: "Clean Clothes Chest",
        x: 50,
        y: 65
      }
    }[currentRoom];

    const button = document.createElement("button");
    button.type = "button";
    button.className = "room-object puzzle-object";
    button.style.left = challengeData.x + "%";
    button.style.top = challengeData.y + "%";

    const emoji = document.createElement("span");
    emoji.className = "object-emoji";
    emoji.textContent = challengeData.emoji;

    const label = document.createElement("span");
    label.textContent = challengeData.label;

    button.append(emoji, label);

    button.addEventListener("click", event => {
      event.stopPropagation();
      openChallenge(room.challenge);
    });

    roomItems.append(button);
  }

  room.doors.forEach(door => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "room-object door";
    button.textContent = door.label;
    button.style.left = door.x + "%";
    button.style.top = door.y + "%";

    if (door.edge) {
      button.classList.add("edge-" + door.edge);
    }

    if (door.action === "trap") {
      button.classList.add("trap");
    }

    button.addEventListener("click", event => {
      event.stopPropagation();
      useDoor(door);
    });

    roomItems.append(button);
  });

  player.textContent = STANDING;

  if (
    !player.classList.contains("facing-left") &&
    !player.classList.contains("facing-right") &&
    !player.classList.contains("facing-up") &&
    !player.classList.contains("facing-down")
  ) {
    setFacing("left");
  }

  player.style.left = playerPosition.x + "%";
  player.style.top = playerPosition.y + "%";

  message.textContent = room.message;

  if (room.cat && currentRoom !== "wellness") {
    startCatMovement(room.cat);
  }
}

function useDoor(door) {
  if (gameOver || !gameStarted || challengeModal.hidden === false) {
    return;
  }

  stopMouseMovement();
  stopKeyboardMovement(true);

  if (door.action === "trap") {
    endGame(
      "Levi: “I knew you would try that! You can't run away from me this quickly!”"
    );
    return;
  }

  if (door.action === "exit") {
    if (keys < TOTAL_KEYS) {
      message.textContent =
        `The front door is locked! You need ${TOTAL_KEYS - keys} more key(s).`;
      return;
    }

    changeRoom("outside", { x: 50, y: 60 });
    showEscapeEnding();
    return;
  }

  if (door.to) {
    let position = { x: 50, y: 55 };

    if (door.edge === "top") {
      position = { x: 50, y: 13 };
    }

    if (door.edge === "bottom") {
      position = { x: 50, y: 87 };
    }

    if (door.edge === "left") {
      position = { x: 13, y: 50 };
    }

    if (door.edge === "right") {
      position = { x: 87, y: 50 };
    }

    changeRoom(door.to, position);
  }
}

function changeRoom(room, position) {
  stopMouseMovement();
  stopCatMovement();
  stopKeyboardMovement(true);

  currentRoom = room;
  playerPosition = position;
  lastRoomChange = Date.now();

  renderRoom();
  setMoving(false);
}

function getBoardSize() {
  const rect = board.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height
  };
}

function getPlayerRect(x, y) {
  const size = getBoardSize();
  const px = (x / 100) * size.width;
  const py = (y / 100) * size.height;

  return {
    left: px - 10,
    right: px + 10,
    top: py - 10,
    bottom: py + 10
  };
}

function overlaps(a, b) {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}

function collidesWithFurniture(x, y) {
  const playerRect = getPlayerRect(x, y);
  const boardRect = board.getBoundingClientRect();

  const obstacles = roomItems.querySelectorAll(
    ".room-object.furniture, .room-object.shelf, .room-object.wall-item, .room-object.pool"
  );

  for (const obstacle of obstacles) {
    if (obstacle.classList.contains("pool")) {
      continue;
    }

    const rect = obstacle.getBoundingClientRect();

    const obstacleRect = {
      left: rect.left - boardRect.left,
      right: rect.right - boardRect.left,
      top: rect.top - boardRect.top,
      bottom: rect.bottom - boardRect.top
    };

    if (overlaps(playerRect, obstacleRect)) {
      return true;
    }
  }

  return false;
}

function canMoveTo(x, y) {
  if (rooms[currentRoom].narrow && (x < 33 || x > 67)) {
    return false;
  }

  if (x < 3 || x > 97 || y < 4 || y > 96) {
    return false;
  }

  return !collidesWithFurniture(x, y);
}

function checkDoorContact() {
  const playerRect = getPlayerRect(playerPosition.x, playerPosition.y);
  const boardRect = board.getBoundingClientRect();
  const buttons = roomItems.querySelectorAll(".room-object.door");

  for (const button of buttons) {
    const rect = button.getBoundingClientRect();

    const doorRect = {
      left: rect.left - boardRect.left - 5,
      right: rect.right - boardRect.left + 5,
      top: rect.top - boardRect.top - 5,
      bottom: rect.bottom - boardRect.top + 5
    };

    if (overlaps(playerRect, doorRect)) {
      const index = Array.from(buttons).indexOf(button);
      const door = rooms[currentRoom].doors[index];

      if (door) {
        useDoor(door);
        return true;
      }
    }
  }

  return false;
}

function checkChallengeContact() {
  const room = rooms[currentRoom];

  if (
    !room.challenge ||
    completedChallenges.has(currentRoom) ||
    challengeModal.hidden === false
  ) {
    return false;
  }

  const challengeButton = roomItems.querySelector(".puzzle-object");
  if (!challengeButton) return false;

  const playerRect = getPlayerRect(playerPosition.x, playerPosition.y);
  const boardRect = board.getBoundingClientRect();
  const rect = challengeButton.getBoundingClientRect();

  const challengeRect = {
    left: rect.left - boardRect.left - 3,
    right: rect.right - boardRect.left + 3,
    top: rect.top - boardRect.top - 3,
    bottom: rect.bottom - boardRect.top + 3
  };

  if (overlaps(playerRect, challengeRect)) {
    openChallenge(room.challenge);
    return true;
  }

  return false;
}

function checkForKey() {
  const room = rooms[currentRoom];

  if (!room.key || collectedKeys.has(currentRoom)) {
    return;
  }

  const dx = playerPosition.x - room.key.x;
  const dy = playerPosition.y - room.key.y;

  if (Math.hypot(dx, dy) < 5.5) {
    collectedKeys.add(currentRoom);
    keys++;

    updateStats();

    message.textContent =
      `You found a key! 🔑 ${keys} of ${TOTAL_KEYS} collected.`;

    roomItems.querySelector(".hidden-key")?.remove();
  }
}

function move(direction) {
  if (
    !gameStarted ||
    gameOver ||
    currentRoom === "outside" ||
    challengeModal.hidden === false
  ) {
    return;
  }

  if (Date.now() - lastRoomChange < 180) {
    return;
  }

  let dx = 0;
  let dy = 0;

  if (direction === "left") dx = -SPEED;
  if (direction === "right") dx = SPEED;
  if (direction === "up") dy = -SPEED;
  if (direction === "down") dy = SPEED;

  setFacing(direction);
  setMoving(true);

  const nextX = playerPosition.x + dx;
  const nextY = playerPosition.y + dy;

  if (canMoveTo(nextX, playerPosition.y)) {
    playerPosition.x = nextX;
  }

  if (canMoveTo(playerPosition.x, nextY)) {
    playerPosition.y = nextY;
  }

  player.style.left = playerPosition.x + "%";
  player.style.top = playerPosition.y + "%";

  checkForKey();

  if (checkDoorContact()) {
    return;
  }

  if (checkChallengeContact()) {
    return;
  }

  checkCatCollision();
}

function startCatMovement(settings) {
  stopCatMovement();

  catPosition = { x: settings.x, y: settings.y };
  catDirection = 1;
  catStep = 0;

  catElement = document.createElement("div");
  catElement.className = "cat-character";
  catElement.textContent = "🐈‍⬛";
  catLayer.append(catElement);

  updateCatPosition();

  catTimer = setInterval(() => {
    if (gameOver || currentRoom === "wellness") {
      return;
    }

    const speed = settings.speed || 0.8;
    const pattern = settings.pattern;

    if (pattern === "chase") {
      const dx = playerPosition.x - catPosition.x;
      const dy = playerPosition.y - catPosition.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 55 && distance > 0) {
        catPosition.x += (dx / distance) * speed;
        catPosition.y += (dy / distance) * speed;
      } else {
        catStep++;

        if (catStep < 45) {
          catPosition.x += speed * catDirection;
        } else if (catStep < 90) {
          catPosition.y += speed;
        } else if (catStep < 135) {
          catPosition.x -= speed * catDirection;
        } else {
          catPosition.y -= speed;
        }

        if (catStep >= 180) {
          catStep = 0;
        }
      }
    } else if (pattern === "vertical") {
      catPosition.y += speed * catDirection;

      if (catPosition.y > 76 || catPosition.y < 28) {
        catDirection *= -1;
      }
    } else if (pattern === "lshape") {
      catStep++;

      if (catStep < 55) {
        catPosition.x += speed * catDirection;
      } else if (catStep < 110) {
        catPosition.y += speed * catDirection;
      } else {
        catDirection *= -1;
        catStep = 0;
      }
    } else {
      catPosition.x += speed * catDirection;

      if (catPosition.x > 78 || catPosition.x < 22) {
        catDirection *= -1;
      }
    }

    catPosition.x = Math.max(8, Math.min(92, catPosition.x));
    catPosition.y = Math.max(12, Math.min(88, catPosition.y));

    updateCatPosition();
    checkCatCollision();
  }, 100);
}

function updateCatPosition() {
    if (!catElement) {
        return;
    }

    const previousX = Number(
        catElement.dataset.lastX ?? catPosition.x
    );

    // Face right when moving right, and left when moving left.
    if (catPosition.x > previousX + 0.01) {
        catElement.dataset.facing = "right";
    } else if (catPosition.x < previousX - 0.01) {
        catElement.dataset.facing = "left";
    }

    // Mirror the cat emoji without changing its position.
    catElement.style.transform =
        catElement.dataset.facing === "right"
            ? "translate(-50%, -50%) scaleX(-1)"
            : "translate(-50%, -50%) scaleX(1)";

    catElement.style.left = catPosition.x + "%";
    catElement.style.top = catPosition.y + "%";

    catElement.dataset.lastX = String(catPosition.x);
}

function checkCatCollision() {
  if (gameOver || currentRoom === "wellness" || !catElement) {
    return;
  }

  const dx = playerPosition.x - catPosition.x;
  const dy = playerPosition.y - catPosition.y;

  if (Math.hypot(dx, dy) < 5.5) {
    endGame("Levi caught you! The cat has claimed another victim. 💩");
  }
}

function endGame(text) {
  if (gameOver) {
    return;
  }

  gameOver = true;

  stopCatMovement();
  stopMouseMovement();
  stopKeyboardMovement(true);
  closeChallenge(true);

  gameOverText.textContent = text;
  gameOverOverlay.hidden = false;

  let count = 0;

  poopTimer = setInterval(() => {
    if (count >= 110) {
      clearInterval(poopTimer);
      poopTimer = null;
      return;
    }

    const poop = document.createElement("span");
    poop.className = "poop";
    poop.textContent = "💩";
    poop.style.left = (Math.random() * 94 + 3) + "%";
    poop.style.top = (Math.random() * 90 + 5) + "%";

    gameOverOverlay.append(poop);
    count++;
  }, 45);
}

function resetGame() {
  stopCatMovement();
  stopMouseMovement();
  stopKeyboardMovement(false);

  if (poopTimer) {
    clearInterval(poopTimer);
    poopTimer = null;
  }

  keys = 0;
  collectedKeys = new Set();
  completedChallenges = new Set();

  currentRoom = "wellness";
  gameOver = false;
  playerPosition = { x: 50, y: 55 };

  gameOverOverlay.querySelectorAll(".poop").forEach(poop => {
    poop.remove();
  });

  gameOverOverlay.hidden = true;
  challengeModal.hidden = true;

  renderRoom();
  board.focus();
}

function startMouseMovement(targetX, targetY) {
  if (
    !gameStarted ||
    gameOver ||
    currentRoom === "outside" ||
    challengeModal.hidden === false
  ) {
    return;
  }

  stopMouseMovement();

  const startRoom = currentRoom;

  const target = {
    x: Math.max(3, Math.min(97, targetX)),
    y: Math.max(4, Math.min(96, targetY))
  };

  setMoving(true);

  mouseMoveTimer = setInterval(() => {
    if (gameOver || currentRoom !== startRoom) {
      stopMouseMovement();
      return;
    }

    const dx = target.x - playerPosition.x;
    const dy = target.y - playerPosition.y;
    const distance = Math.hypot(dx, dy);

    if (distance < SPEED) {
      stopMouseMovement();
      return;
    }

    const stepX = (dx / distance) * SPEED;
    const stepY = (dy / distance) * SPEED;

    if (Math.abs(dx) >= Math.abs(dy)) {
      setFacing(dx < 0 ? "left" : "right");
    } else {
      setFacing(dy < 0 ? "up" : "down");
    }

    const nextX = playerPosition.x + stepX;
    const nextY = playerPosition.y + stepY;

    if (canMoveTo(nextX, playerPosition.y)) {
      playerPosition.x = nextX;
    }

    if (canMoveTo(playerPosition.x, nextY)) {
      playerPosition.y = nextY;
    }

    player.style.left = playerPosition.x + "%";
    player.style.top = playerPosition.y + "%";

    checkForKey();

    if (checkDoorContact()) {
      stopMouseMovement();
      return;
    }

    if (checkChallengeContact()) {
      stopMouseMovement();
      return;
    }

    checkCatCollision();
  }, 35);
}

function openChallenge(type) {
  if (!gameStarted || gameOver || completedChallenges.has(currentRoom)) {
    return;
  }

  stopMouseMovement();
  stopKeyboardMovement(true);
  stopCatMovement();

  activeChallenge = type;

  challengeContent.replaceChildren();
  challengeFeedback.textContent = "";
  challengeModal.hidden = false;

  const settings = {
    poo: {
      title: "The Great Clean-Up!",
      description:
        "Clean the litter box before the timer runs out! Click all 10 messes to clear the room and earn the key.",
      seconds: 15
    },

    sliding: {
      title: "Letters Puzzle Board",
      description:
        "Put the letters A–H in alphabetical order so you’ll be able to read signs and labels in the world beyond this house. Click a letter next to the empty square to slide it. You have 2 minutes!",
      seconds: 120
    },

    boundary: {
      title: "Can You Survive the Outside World?",
      description: "Choose the healthiest response.",
      seconds: 0
    },

    clean: {
      title: "No Cat Hair, No Traces!",
      description:
        "Before taking the key, clean all the cat hair off your clothes so you don’t leave any traces behind. Wipe over the hair with your mouse or finger. You have 30 seconds!",
      seconds: 30
    }
  }[type];

  challengeTitle.textContent = settings.title;
  challengeDescription.textContent = settings.description;

  if (type === "poo") {
    buildPooChallenge();
  }

  if (type === "sliding") {
    buildSlidingChallenge();
  }

  if (type === "boundary") {
    buildBoundaryChallenge();
  }

  if (type === "clean") {
    buildCleaningChallenge();
  }

  if (settings.seconds) {
    startChallengeTimer(settings.seconds, () => challengeFailed(type));
  }
}

function closeChallenge(force = false) {
  if (challengeTimer) {
    clearInterval(challengeTimer);
    challengeTimer = null;
  }

  if (challengeModal) {
    challengeModal.hidden = true;
  }

  if (
    !force &&
    activeChallenge &&
    gameStarted &&
    !gameOver &&
    rooms[currentRoom].cat
  ) {
    startCatMovement(rooms[currentRoom].cat);
  }

  activeChallenge = null;
  cleaningCanvas = null;
  cleaningCtx = null;
}

function startChallengeTimer(seconds, onTimeout) {
  if (challengeTimer) {
    clearInterval(challengeTimer);
  }

  challengeDeadline = Date.now() + seconds * 1000;

  const timer = document.createElement("div");
  timer.className = "challenge-timer";
  timer.id = "challenge-countdown";
  timer.textContent = `Time left: ${seconds}s`;

  challengeContent.prepend(timer);

  challengeTimer = setInterval(() => {
    const left = Math.max(
      0,
      Math.ceil((challengeDeadline - Date.now()) / 1000)
    );

    const timerElement = document.getElementById("challenge-countdown");

    if (timerElement) {
      timerElement.textContent = `Time left: ${left}s`;
    }

    if (left <= 0) {
      clearInterval(challengeTimer);
      challengeTimer = null;
      onTimeout();
    }
  }, 150);
}

function awardKey(successText) {
  if (challengeTimer) {
    clearInterval(challengeTimer);
    challengeTimer = null;
  }

  completedChallenges.add(currentRoom);
  keys++;

  updateStats();
  closeChallenge(true);
  renderRoom();

  message.textContent = successText;
}

function challengeFailed(type) {
  if (challengeTimer) {
    clearInterval(challengeTimer);
    challengeTimer = null;
  }

  if (type === "boundary") {
    failToWellness(
      "Oh no! You may need a little more practice before heading out into the big, unknown world. Time for a Wellness Room reset. 💜"
    );
    return;
  }

  if (type === "clean") {
    failToWellness(
      "Time’s up! Your clothes still had cat hair on them, so you left traces behind. Back to the Wellness Room for a little recovery break! 💜"
    );
    return;
  }

  if (type === "poo") {
    failToWellness(
      "Oh no! There was still a mess left when the timer ran out. Take a breather in the Wellness Room and try again! 💜"
    );
    return;
  }

  if (type === "sliding") {
    failToWellness(
      "Oh no, the puzzle beat you this time! Back to the Wellness Room to recover from this failure. You can try again! 💜"
    );
  }
}

function failToWellness(text) {
  closeChallenge(true);
  stopCatMovement();
  stopMouseMovement();
  stopKeyboardMovement(true);

  currentRoom = "wellness";
  playerPosition = { x: 50, y: 55 };

  renderRoom();
  message.textContent = text;
}

function buildPooChallenge() {
  const grid = document.createElement("div");
  grid.className = "poo-grid";

  let removed = 0;

  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "poo-button";
    button.textContent = "💩";
    button.setAttribute("aria-label", "Clean up mess " + (i + 1));

    button.addEventListener("click", () => {
      if (button.classList.contains("cleaned")) {
        return;
      }

      button.classList.add("cleaned");
      removed++;

      if (removed === 10) {
        challengeFeedback.textContent =
          "Sparkling clean! You earned the key! 🔑";

        setTimeout(() => {
          if (activeChallenge === "poo") {
            awardKey("Amazing clean-up! You earned the bathroom key. 🔑");
          }
        }, 450);
      }
    });

    grid.append(button);
  }

  challengeContent.append(grid);
}

function buildBoundaryChallenge() {
  const list = document.createElement("div");
  list.className = "choice-list";

  const question = document.createElement("p");
  question.textContent =
    "Your shift ends in two minutes, and you already have plans. Just before you leave, your employer messages you with a large task to complete. What do you do?";
  challengeContent.append(question);

  const choices = [
    {
      text: "A. Explain that your shift is ending and you already have plans, and offer to discuss the task during your next shift.",
      correct: true
    },
    {
      text: "B. Cancel your plans, and take on the entire task without hesitation.",
      correct: false
    }
  ];

  choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      if (activeChallenge !== "boundary") return;

      list.querySelectorAll("button").forEach(option => {
        option.disabled = true;
      });

      const continueButton = document.createElement("button");
      continueButton.type = "button";
      continueButton.className = "primary-button";
      continueButton.textContent = "Okay!";

      if (choice.correct) {
        challengeFeedback.textContent =
          "Exactly! You can be kind and professional without giving up your own time. You earned the kitchen key! 🔑";

        continueButton.addEventListener("click", () => {
          if (activeChallenge === "boundary") {
            awardKey("Great boundary-setting! You earned the kitchen key. 🔑");
          }
        });
      } else {
        challengeFeedback.textContent =
          "Oh honey, a people-pleaser has entered the chat! If a colonizer walked into your house, you'd probably apologize for being in the way as well. You’re allowed to have boundaries and plans of your own. Just sayin'.";

        continueButton.addEventListener("click", () => {
          if (activeChallenge === "boundary") {
            failToWellness(
              "Oh man! That answer puts everyone else’s needs ahead of your own. Take a breather in the Wellness Room and try again when you’re ready. 💜"
            );
          }
        });
      }

      challengeContent.append(continueButton);
    });

    list.append(button);
  });

  challengeContent.append(list);
}

function buildSlidingChallenge() {
  const grid = document.createElement("div");
  grid.className = "sliding-grid";

  const timerNote = document.createElement("p");
  timerNote.className = "cleaning-help";
  timerNote.textContent =
    "Tip: move a letter into the empty square. Put A–H in alphabetical order, with the empty square at the end, to unlock the key.";

  challengeContent.append(grid, timerNote);

  let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (
    !isSolvable(tiles) ||
    tiles.every((value, index) => value === index + 1 || (index === 8 && value === 0))
  );

  function render() {
    grid.replaceChildren();

    tiles.forEach((value, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "slide-tile" + (value === 0 ? " empty" : "");

      if (value === 0) {
        button.textContent = "";
        button.setAttribute("aria-label", "Empty space");
      } else {
        const letter = String.fromCharCode(64 + value);
        button.textContent = letter;
        button.setAttribute("aria-label", "Letter " + letter);
      }

      button.addEventListener("click", () => {
        if (value === 0 || activeChallenge !== "sliding") return;

        const emptyIndex = tiles.indexOf(0);
        const distance =
          Math.abs(Math.floor(index / 3) - Math.floor(emptyIndex / 3)) +
          Math.abs((index % 3) - (emptyIndex % 3));

        if (distance !== 1) return;

        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        render();

        if (tiles.every((value, index) => index === 8 ? value === 0 : value === index + 1)) {
          challengeFeedback.textContent =
            "Alphabetical order complete! You can read the signs and labels beyond the house. Here’s your key! 🔑";

          if (challengeTimer) {
            clearInterval(challengeTimer);
            challengeTimer = null;
          }

          setTimeout(() => {
            if (activeChallenge === "sliding") {
              awardKey("Puzzle solved! You earned the living room key. 🔑");
            }
          }, 500);
        }
      });

      grid.append(button);
    });
  }

  render();
}

function isSolvable(array) {
  let inversions = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (
        array[i] &&
        array[j] &&
        array[i] > array[j]
      ) {
        inversions++;
      }
    }
  }

  return inversions % 2 === 0;
}

function buildCleaningChallenge() {
  const wrap = document.createElement("div");
  wrap.className = "cleaning-area";

  const art = document.createElement("div");
  art.className = "clothes-art";

  const shirt = document.createElement("span");
  shirt.textContent = "👕";

  const pants = document.createElement("span");
  pants.textContent = "👖";

  art.append(shirt, pants);

  const canvas = document.createElement("canvas");
  canvas.id = "hair-canvas";
  canvas.setAttribute("aria-label", "Wipe cat hair from the clothes");
  art.append(canvas);

  const help = document.createElement("p");
  help.className = "cleaning-help";
  help.textContent =
    "Hold your mouse button or keep your finger on the screen and wipe across the whole clothes image. Every area must be cleaned before time runs out!";

  const track = document.createElement("div");
  track.className = "progress-track";

  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = "0%";

  track.append(fill);
  wrap.append(art, help, track);
  challengeContent.append(wrap);

  cleaningCanvas = canvas;
  cleaningCtx = canvas.getContext("2d");

  const columns = 12;
  const rows = 6;
  let covered = new Set();
  let wiping = false;
  let lastPoint = null;
  let artWidth = 0;
  let artHeight = 0;

  function sizeCanvas() {
    const rect = art.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    artWidth = rect.width;
    artHeight = rect.height;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    cleaningCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cleaningCtx.clearRect(0, 0, rect.width, rect.height);
    cleaningCtx.globalCompositeOperation = "source-over";
    cleaningCtx.strokeStyle = "#5c5265";
    cleaningCtx.lineWidth = 2.4;
    cleaningCtx.lineCap = "round";

    for (let i = 0; i < 115; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const length = 3 + Math.random() * 9;

      cleaningCtx.beginPath();
      cleaningCtx.moveTo(x, y);
      cleaningCtx.lineTo(x + length, y - length * 0.5);
      cleaningCtx.stroke();
    }

    cleaningCtx.globalCompositeOperation = "destination-out";
    covered = new Set();
    updateProgress();
  }

  function updateProgress() {
    const total = columns * rows;
    const progress = Math.round((covered.size / total) * 100);
    fill.style.width = progress + "%";
  }

  function markCovered(x, y) {
    const brushRadius = 20;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const centerX = ((column + 0.5) / columns) * artWidth;
        const centerY = ((row + 0.5) / rows) * artHeight;

        if (Math.hypot(centerX - x, centerY - y) <= brushRadius + 2) {
          covered.add(row * columns + column);
        }
      }
    }

    updateProgress();

    if (covered.size === columns * rows) {
      finishCleaning();
    }
  }

  function finishCleaning() {
    if (activeChallenge !== "clean") return;

    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0";

    challengeFeedback.textContent =
      "Your clothes are completely clean! No traces left behind. Here’s your key! 🔑";

    if (challengeTimer) {
      clearInterval(challengeTimer);
      challengeTimer = null;
    }

    setTimeout(() => {
      if (activeChallenge === "clean") {
        awardKey("All clean! You earned the bedroom key. 🔑");
      }
    }, 500);
  }

  function wipe(event) {
    if (!wiping || !cleaningCtx || activeChallenge !== "clean") return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cleaningCtx.save();
    cleaningCtx.globalCompositeOperation = "destination-out";
    cleaningCtx.beginPath();
    cleaningCtx.arc(x, y, 20, 0, Math.PI * 2);
    cleaningCtx.fill();

    if (lastPoint) {
      cleaningCtx.lineWidth = 40;
      cleaningCtx.lineCap = "round";
      cleaningCtx.beginPath();
      cleaningCtx.moveTo(lastPoint.x, lastPoint.y);
      cleaningCtx.lineTo(x, y);
      cleaningCtx.stroke();
    }

    cleaningCtx.restore();

    const distance = lastPoint ? Math.hypot(x - lastPoint.x, y - lastPoint.y) : 0;
    const steps = Math.max(1, Math.ceil(distance / 10));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = lastPoint ? lastPoint.x + (x - lastPoint.x) * t : x;
      const py = lastPoint ? lastPoint.y + (y - lastPoint.y) * t : y;

      markCovered(px, py);

      if (covered.size === columns * rows) break;
    }

    lastPoint = { x, y };
  }

  sizeCanvas();

  canvas.addEventListener("pointerdown", event => {
    if (activeChallenge !== "clean") return;

    wiping = true;
    lastPoint = null;
    canvas.setPointerCapture(event.pointerId);
    wipe(event);
  });

  canvas.addEventListener("pointermove", wipe);

  ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => {
    canvas.addEventListener(type, () => {
      wiping = false;
      lastPoint = null;
    });
  });
}

const directions = {
  arrowleft: "left",
  a: "left",
  arrowright: "right",
  d: "right",
  arrowup: "up",
  w: "up",
  arrowdown: "down",
  s: "down"
};

window.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();
  const direction = directions[key];

  if (!direction || !gameStarted || gameOver) {
    return;
  }

  event.preventDefault();

  if (keyboardLocked || heldKey === key) {
    return;
  }

  stopMouseMovement();

  if (keyboardTimer) {
    clearInterval(keyboardTimer);
  }

  heldKey = key;
  heldDirection = direction;

  move(direction);

  const roomAtPress = currentRoom;

  keyboardTimer = setInterval(() => {
    if (
      keyboardLocked ||
      currentRoom !== roomAtPress ||
      gameOver
    ) {
      stopKeyboardMovement(true);
      return;
    }

    move(direction);
  }, 65);
});

window.addEventListener("keyup", event => {
  const key = event.key.toLowerCase();

  if (directions[key]) {
    if (heldKey === key || !heldKey) {
      stopKeyboardMovement(false);
      heldKey = null;
      keyboardLocked = false;
    }
  }
});

window.addEventListener("blur", () => {
  stopKeyboardMovement(false);
  heldKey = null;
  keyboardLocked = false;
});

board.addEventListener("click", event => {
  if (
    gameOver ||
    !gameStarted ||
    challengeModal.hidden === false ||
    event.target.closest("button")
  ) {
    return;
  }

  const rect = board.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  startMouseMovement(x, y);
});

document.querySelectorAll(".direction").forEach(button => {
  let timer = null;
  let roomAtPress = null;

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    setMoving(false);
  };

  button.addEventListener("pointerdown", event => {
    event.preventDefault();

    if (
      !gameStarted ||
      gameOver ||
      challengeModal.hidden === false
    ) {
      return;
    }

    stopMouseMovement();
    stopKeyboardMovement(true);

    roomAtPress = currentRoom;

    move(button.dataset.direction);

    timer = setInterval(() => {
      if (
        currentRoom !== roomAtPress ||
        gameOver ||
        challengeModal.hidden === false
      ) {
        stop();
        return;
      }

      move(button.dataset.direction);
    }, 65);
  });

  ["pointerup", "pointerleave", "pointercancel", "lostpointercapture"].forEach(type => {
    button.addEventListener(type, stop);
  });
});

startButton.addEventListener("click", () => {
    const gameMusic = document.getElementById("game-music");

gameMusic.volume = 0.35;
gameMusic.play().catch(error => {
    console.log("Game music could not start:", error);
});
  gameStarted = true;
  introModal.hidden = true;
  message.textContent = rooms[currentRoom].message;
  board.focus();
});

tryAgainButton.addEventListener("click", resetGame);

closeChallengeButton.addEventListener("click", () => {
  closeChallenge();
  message.textContent =
    "Challenge paused. Click the object when you’re ready to try again.";
});

renderRoom();


/* ===== LEVESCAPE ESCAPE ENDING ===== */

function showEscapeEnding() {
    escapeEnding.hidden = false;

    escapeEndingMessage.textContent =
        "You escaped... or did Levi let you escape?";

    escapeFreeButton.hidden = false;
    escapeStayButton.hidden = false;

    escapeStayButton.textContent =
        "Actually, I kind of liked it inside the house with Levi. 🐈‍⬛";

    escapeStayButton.dataset.confirmRestart = "no";
}


escapeFreeButton.addEventListener("click", () => {
    escapeEndingMessage.textContent = "You won! 🎉";

    escapeFreeButton.hidden = true;
    escapeStayButton.hidden = true;
});


escapeStayButton.addEventListener("click", () => {
    if (escapeStayButton.dataset.confirmRestart !== "yes") {
        escapeStayButton.dataset.confirmRestart = "yes";
        escapeStayButton.textContent = "Play Again 🔄";
        return;
    }

    // Reload the game to reset the rooms and all six keys.
    window.location.reload();
});
