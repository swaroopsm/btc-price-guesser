// Generate via chatGPT
// Prompt:
//   Generate 100 random names. The name should contain an animal, and adjective or skill that defines them, separated by a space
// Make it interesting and sound like character names
// Put the result in an array called: randomPlayerNames in JS

const randomPlayerNames = [
  "Swift Falcon",
  "Brave Wolf",
  "Silent Panther",
  "Fierce Tiger",
  "Clever Fox",
  "Mighty Bear",
  "Loyal Hound",
  "Vigilant Owl",
  "Fearless Hawk",
  "Bold Eagle",
  "Stealthy Leopard",
  "Cunning Viper",
  "Iron Rhino",
  "Gentle Stag",
  "Nimble Deer",
  "Silent Crow",
  "Majestic Stallion",
  "Thunder Lion",
  "Wise Tortoise",
  "Frost Wolf",
  "Shadow Raven",
  "Blazing Phoenix",
  "Golden Jackal",
  "Storm Bison",
  "Swift Hare",
  "Shimmering Dolphin",
  "Iron Cobra",
  "Lightning Falcon",
  "Swift Jaguar",
  "Crimson Bat",
  "Wild Badger",
  "Night Tiger",
  "Thunder Shark",
  "Raging Ram",
  "Sly Ferret",
  "Silent Lynx",
  "Sharp Eagle",
  "Vicious Wolverine",
  "Gliding Hawk",
  "Noble Elk",
  "Piercing Crane",
  "Silver Cheetah",
  "Gale Stork",
  "Frozen Penguin",
  "Radiant Swan",
  "Savage Hyena",
  "Silent Otter",
  "Iron Hippo",
  "Lightning Fox",
  "Velvet Panther",
  "Raging Bull",
  "Soaring Raven",
  "Golden Talon",
  "Blazing Mongoose",
  "Mystic Wolf",
  "Daring Tiger",
  "Shadow Fox",
  "Radiant Serpent",
  "Silent Falcon",
  "Wicked Viper",
  "Sturdy Rhino",
  "Cunning Owl",
  "Swift Sparrow",
  "Fearless Panther",
  "Wild Puma",
  "Ghost Lynx",
  "Majestic Eagle",
  "Furious Badger",
  "Crimson Stag",
  "Nimble Fox",
  "Thunder Eagle",
  "Iron Raven",
  "Frozen Leopard",
  "Shimmering Crane",
  "Stealth Wolf",
  "Silent Hawk",
  "Raging Bear",
  "Velvet Jaguar",
  "Savage Eagle",
  "Cunning Jackal",
  "Mighty Lion",
  "Storm Lioness",
  "Stealth Coyote",
  "Ghost Falcon",
  "Piercing Viper",
  "Sharp Lynx",
  "Thunder Crow",
  "Golden Fox",
  "Mystic Serpent",
  "Sly Hawk",
  "Blazing Cobra",
  "Silent Jaguar",
  "Raging Shark",
  "Fierce Falcon",
  "Frozen Wolf",
  "Swift Cheetah",
  "Wicked Raven",
  "Iron Vulture",
  "Silver Ocelot",
  "Vigilant Cougar",
  "Bold Otter",
];

export const generateRandomPlayerName = () => {
  const value = Math.random();
  const playerName =
    randomPlayerNames[Math.round(value * randomPlayerNames.length)];

  return playerName;
};
