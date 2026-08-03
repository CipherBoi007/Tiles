import { marbleImages } from './marbleImages';
import { woodenImages } from './woodenImages';
import { bathroomImages } from './bathroomImages';
import { outdoorImages } from './outdoorImages';
import { kitchenImages } from './kitchenImages';
import { generalImages } from './generalImages';

// Helper to shuffle an array
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// State trackers to rotate images without immediate repeats
const trackers = {
  marble: { pool: shuffle(marbleImages), index: 0 },
  wooden: { pool: shuffle(woodenImages), index: 0 },
  bathroom: { pool: shuffle(bathroomImages), index: 0 },
  outdoor: { pool: shuffle(outdoorImages), index: 0 },
  kitchen: { pool: shuffle(kitchenImages), index: 0 },
  general: { pool: shuffle(generalImages), index: 0 }
};

const getNextImage = (category) => {
  const tracker = trackers[category] || trackers.general;
  const image = tracker.pool[tracker.index];
  
  tracker.index++;
  if (tracker.index >= tracker.pool.length) {
    tracker.pool = shuffle(tracker.pool);
    tracker.index = 0;
  }
  
  return image;
};

export const getUniqueImage = (categoryName) => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('marble') || name.includes('stone') || name.includes('granite')) {
    return getNextImage('marble');
  } else if (name.includes('wood') || name.includes('timber') || name.includes('oak')) {
    return getNextImage('wooden');
  } else if (name.includes('bath') || name.includes('shower') || name.includes('washroom')) {
    return getNextImage('bathroom');
  } else if (name.includes('out') || name.includes('patio') || name.includes('garden') || name.includes('exterior')) {
    return getNextImage('outdoor');
  } else if (name.includes('kitchen') || name.includes('dining')) {
    return getNextImage('kitchen');
  } else {
    return getNextImage('general');
  }
};
