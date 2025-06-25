interface Fact {
  id: number;
  content: string;
  category: 'biology' | 'behavior' | 'conservation' | 'culture';
}

const elephantFacts: Fact[] = [
  {
    id: 1,
    content: "Elephants are the largest land mammals on Earth. African elephants can weigh up to 6,350 kg (14,000 lb) and reach 3.96 meters (13 ft) at the shoulder.",
    category: "biology"
  },
  {
    id: 2,
    content: "An elephant's trunk contains over 40,000 muscles and can be used for breathing, lifting water, grasping objects, and producing sound. It's essentially a fusion of the nose and upper lip.",
    category: "biology"
  },
  {
    id: 3,
    content: "Elephants have the longest gestation period of any mammal – almost 22 months from conception to birth.",
    category: "biology"
  },
  {
    id: 4,
    content: "Elephants can use their trunks to produce sounds as low as 5 hertz, which are too low for humans to hear. These 'infrasounds' can travel several kilometers and are used to communicate with other elephants.",
    category: "biology"
  },
  {
    id: 5,
    content: "Elephants are known for their exceptional memory. They can remember migration routes, water sources, and even recognize other elephants they haven't seen for decades.",
    category: "behavior"
  },
  {
    id: 6,
    content: "Elephants are one of the few animals that can recognize themselves in a mirror, showing self-awareness and advanced cognitive abilities.",
    category: "behavior"
  },
  {
    id: 7,
    content: "Elephant herds are led by the oldest female, known as the matriarch. She uses her decades of experience to guide the family to food, water, and safety.",
    category: "behavior"
  },
  {
    id: 8,
    content: "Elephants show empathy and grief. They've been observed returning to the remains of deceased family members, touching the bones and standing over them in what appears to be mourning.",
    category: "behavior"
  },
  {
    id: 9,
    content: "African elephant populations have declined by over 60% in the last 50 years, primarily due to poaching for ivory and habitat loss.",
    category: "conservation"
  },
  {
    id: 10,
    content: "Asian elephants are endangered, with only about 40,000-50,000 remaining in the wild—roughly a tenth of the African elephant population.",
    category: "conservation"
  },
  {
    id: 11,
    content: "Elephants are 'ecosystem engineers.' Their feeding habits clear paths through dense vegetation, creating firebreaks and habitats for other species. Their dung spreads seeds and nutrients.",
    category: "conservation"
  },
  {
    id: 12,
    content: "An elephant can consume up to 136 kg (300 lb) of food and 45 liters (12 gallons) of water in a single day.",
    category: "biology"
  },
  {
    id: 13,
    content: "In Thailand, elephants were once featured on the national flag, and white elephants are still considered sacred.",
    category: "culture"
  },
  {
    id: 14,
    content: "The Hindu god Ganesh has the head of an elephant and is revered as the remover of obstacles and patron of arts and sciences.",
    category: "culture"
  },
  {
    id: 15,
    content: "Elephants have been working animals for over 4,000 years, used in warfare by rulers like Hannibal, who famously crossed the Alps with them to attack Rome.",
    category: "culture"
  },
  {
    id: 16,
    content: "Elephants can swim long distances using their trunk as a snorkel, and they regularly cross water to reach new feeding grounds.",
    category: "behavior"
  },
  {
    id: 17,
    content: "Elephants have a highly developed hippocampus, a brain region responsible for emotion and memory—it's relatively larger than in humans.",
    category: "biology"
  },
  {
    id: 18,
    content: "The elephants of Amboseli National Park in Kenya are part of the longest-running elephant research project in the world, started by Cynthia Moss in 1972.",
    category: "conservation"
  },
  {
    id: 19,
    content: "Elephants can detect seismic vibrations through their feet, allowing them to 'hear' sounds and movements from great distances.",
    category: "biology"
  },
  {
    id: 20,
    content: "In some African cultures, it's believed that chiefs are reincarnated as elephants after death.",
    category: "culture"
  },
  {
    id: 21,
    content: "Elephants use mud as sunscreen, coating their skin to protect from sun damage and parasites.",
    category: "behavior"
  },
  {
    id: 22,
    content: "Baby elephants can weigh around 90-120 kg (200-265 lb) at birth—about the same as 30 human babies combined.",
    category: "biology"
  },
  {
    id: 23,
    content: "Elephant tusks never stop growing throughout their lifetime, adding approximately 17 cm (7 inches) per year.",
    category: "biology"
  },
  {
    id: 24,
    content: "Elephants use their tusks to dig for water, strip bark from trees, and defend themselves. Unfortunately, these same tusks make them targets for poachers.",
    category: "conservation"
  },
  {
    id: 25,
    content: "A 2020 study confirmed that African forest and savanna elephants are actually different species—as genetically distinct from each other as lions are from tigers.",
    category: "biology"
  },
  {
    id: 26,
    content: "Elephants have been observed creating tools, such as using branches to swat flies or scratch hard-to-reach places.",
    category: "behavior"
  },
  {
    id: 27,
    content: "Elephants can purr like cats as a means of communication—they produce a low, vibrating sound by contracting muscles in their larynx.",
    category: "behavior"
  },
  {
    id: 28,
    content: "An elephant's skin can be up to 2.5 cm (1 inch) thick in places, but it's still sensitive enough to feel a fly landing.",
    category: "biology"
  },
  {
    id: 29,
    content: "Elephants create their own sunscreen by spraying dust onto their backs—the dust blocks harmful UV radiation.",
    category: "behavior"
  },
  {
    id: 30,
    content: "The oldest elephant on record lived to be 86 years old—well beyond their typical lifespan of 60-70 years in the wild.",
    category: "biology"
  }
];

export function getDailyFact(): Fact {
  // Get a fact based on the day of the month, so it changes each day
  // but stays the same all day
  const today = new Date();
  const dayOfMonth = today.getDate();
  const factIndex = dayOfMonth % elephantFacts.length;
  
  return elephantFacts[factIndex];
}

export function getRandomFact(): Fact {
  const randomIndex = Math.floor(Math.random() * elephantFacts.length);
  return elephantFacts[randomIndex];
}

export function getFactsByCategory(category: Fact['category']): Fact[] {
  return elephantFacts.filter(fact => fact.category === category);
}

export default elephantFacts;