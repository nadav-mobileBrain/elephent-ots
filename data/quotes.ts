interface Quote {
  quote: string;
  author: string;
}

const quotes: Quote[] = [
  {
    quote: "The elephant is the only wild animal with a memory that does not forget an offense, and once recollection is awakened there is no escape for the person who injured him.",
    author: "Sir Samuel White Baker"
  },
  {
    quote: "When you have got an elephant by the hind leg, and he is trying to run away, it's best to let him run.",
    author: "Abraham Lincoln"
  },
  {
    quote: "Nature's great masterpiece, an elephant - the only harmless great thing.",
    author: "John Donne"
  },
  {
    quote: "In the wild, an elephant herd is led by a matriarch, and when she dies, the family can fall apart.",
    author: "Mark Shand"
  },
  {
    quote: "Elephants can sense danger. They're able to detect an approaching tsunami or earthquake before it hits.",
    author: "Jennifer Richard Jacobson"
  },
  {
    quote: "The question is, are we happy to suppose that our grandchildren may never be able to see an elephant except in a picture book?",
    author: "David Attenborough"
  },
  {
    quote: "They say an elephant never forgets. What they don't tell you is, you never forget an elephant.",
    author: "Bill Murray"
  },
  {
    quote: "Of all African animals, the elephant is the most difficult for man to live with, yet its passing - if this must come - seems the most tragic of all.",
    author: "Iain Douglas-Hamilton"
  },
  {
    quote: "If anyone wants to know what elephants are like, they are like people only more so.",
    author: "Peter Corneille"
  },
  {
    quote: "Elephants love reunions. They recognize one another after years and years of separation and greet each other with wild, boisterous joy. There's bellowing and trumpeting, ear flapping and rubbing. Trunks entwine.",
    author: "Jennifer Richard Jacobson"
  },
  {
    quote: "The elephant, not only the largest but the most awkward of animals, at the same time is the most intelligent.",
    author: "Aristotle"
  },
  {
    quote: "It takes more than going on safari to understand the elephant. You must live through a drought, suffer the gentle persistence of the mud season, and feel the sun of the dry season on your skin.",
    author: "Mark Shand"
  },
  {
    quote: "Every creature was designed to serve a purpose. Learn from animals for they are there to teach you the way of life.",
    author: "Suzy Kassem"
  },
  {
    quote: "If elephants didn't exist, you couldn't invent one. They belong to a small group of living things so unlikely they challenge credulity and common sense.",
    author: "Lyall Watson"
  },
  {
    quote: "When we protect elephants, we're protecting the environment, we're protecting biodiversity, we're protecting what most people would call the creation.",
    author: "Wayne Pacelle"
  }
];

export function getDailyQuote(): Quote {
  // Get a quote based on the day of the month, so it changes each day
  // but stays the same all day
  const today = new Date();
  const dayOfMonth = today.getDate();
  const quoteIndex = dayOfMonth % quotes.length;
  
  return quotes[quoteIndex];
}

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export default quotes;