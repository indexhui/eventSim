import { Animal } from '../types/game';

export const animals: Animal[] = [
  // 常見動物 (4個)
  {
    id: 'ANIMAL_001',
    name: '街頭小花貓',
    species: 'cat',
    rarity: 'common',
    description: '經常在便利商店附近出沒的三花貓，喜歡向路人撒嬌。',
    icon: '🐱',
    personalityAffinity: [
      { trait: '同理心', idealValue: 3, tolerance: 3 }
    ]
  },
  {
    id: 'ANIMAL_002',
    name: '都市麻雀',
    species: 'bird',
    rarity: 'common',
    description: '在捷運站和公園常見的小麻雀，總是成群結隊。',
    icon: '🐦',
    personalityAffinity: [
      { trait: '穩定性', idealValue: 2, tolerance: 4 }
    ]
  },
  {
    id: 'ANIMAL_003',
    name: '流浪柴犬',
    species: 'dog',
    rarity: 'common',
    description: '友善的流浪柴犬，常在公園散步的路線上遇見。',
    icon: '🐕',
    personalityAffinity: [
      { trait: '社交傾向', idealValue: 4, tolerance: 3 }
    ]
  },
  {
    id: 'ANIMAL_004',
    name: '公園鴿子',
    species: 'bird',
    rarity: 'common',
    description: '在都市公園隨處可見的鴿子，不太怕人。',
    icon: '🕊️',
    personalityAffinity: [
      { trait: '決斷力', idealValue: -2, tolerance: 5 }
    ]
  },

  // 不常見動物 (4個)
  {
    id: 'ANIMAL_005',
    name: '夜市倉鼠',
    species: 'hamster',
    rarity: 'uncommon',
    description: '從寵物店逃出來的黃金鼠，在夜市附近建立了新家。',
    icon: '🐹',
    unlockCondition: {
      stat: '好奇心',
      value: 3,
      operator: 'gte'
    },
    personalityAffinity: [
      { trait: '好奇心', idealValue: 5, tolerance: 2 }
    ]
  },
  {
    id: 'ANIMAL_006',
    name: '城市松鼠',
    species: 'squirrel',
    rarity: 'uncommon',
    description: '在大安森林公園活動的靈活松鼠，喜歡收集堅果。',
    icon: '🐿️',
    unlockCondition: {
      stat: '時間感',
      value: 5,
      operator: 'gte'
    },
    personalityAffinity: [
      { trait: '時間感', idealValue: 8, tolerance: 3 }
    ]
  },
  {
    id: 'ANIMAL_007',
    name: '池塘小鴨',
    species: 'duck',
    rarity: 'uncommon',
    description: '住在公園池塘的小鴨子，偶爾會上岸散步。',
    icon: '🦆',
    unlockCondition: {
      stat: '體力',
      value: 60,
      operator: 'gte'
    },
    personalityAffinity: [
      { trait: '穩定性', idealValue: 6, tolerance: 2 }
    ]
  },
  {
    id: 'ANIMAL_008',
    name: '捷運站小老鼠',
    species: 'mouse',
    rarity: 'uncommon',
    description: '聰明的小老鼠，熟悉所有捷運站的秘密通道。',
    icon: '🐭',
    unlockCondition: {
      stat: '專注力',
      value: -3,
      operator: 'lte'
    },
    personalityAffinity: [
      { trait: '專注力', idealValue: -5, tolerance: 2 }
    ]
  },

  // 稀有動物 (3個)
  {
    id: 'ANIMAL_009',
    name: '迷途刺蝟',
    species: 'hedgehog',
    rarity: 'rare',
    description: '罕見的都市刺蝟，只在深夜的小巷出沒。',
    icon: '🦔',
    unlockCondition: {
      personalityRange: [
        { trait: '同理心', min: 6, max: 10 },
        { trait: '穩定性', min: 4, max: 10 }
      ]
    },
    personalityAffinity: [
      { trait: '同理心', idealValue: 8, tolerance: 1 },
      { trait: '穩定性', idealValue: 7, tolerance: 1 }
    ]
  },
  {
    id: 'ANIMAL_010',
    name: '陽台烏龜',
    species: 'turtle',
    rarity: 'rare',
    description: '神秘的烏龜，偶爾會出現在高樓陽台上曬太陽。',
    icon: '🐢',
    unlockCondition: {
      personalityRange: [
        { trait: '決斷力', min: -10, max: -6 },
        { trait: '時間感', min: 15, max: 24 }
      ]
    },
    personalityAffinity: [
      { trait: '決斷力', idealValue: -8, tolerance: 1 },
      { trait: '時間感', idealValue: 20, tolerance: 2 }
    ]
  },
  {
    id: 'ANIMAL_011',
    name: '彩虹蝴蝶',
    species: 'butterfly',
    rarity: 'rare',
    description: '美麗的彩虹蝴蝶，只在心情特別好的時候才會出現。',
    icon: '🦋',
    unlockCondition: {
      stat: '心情',
      value: 85,
      operator: 'gte'
    },
    personalityAffinity: [
      { trait: '好奇心', idealValue: 7, tolerance: 1 },
      { trait: '社交傾向', idealValue: 6, tolerance: 2 }
    ]
  },

  // 傳說動物 (1個)
  {
    id: 'ANIMAL_012',
    name: '幻夢金魚',
    species: 'fish',
    rarity: 'legendary',
    description: '傳說中的金魚，據說能實現收集者的小小願望。',
    icon: '🐠',
    unlockCondition: {
      personalityRange: [
        { trait: '好奇心', min: 8, max: 10 },
        { trait: '同理心', min: 8, max: 10 },
        { trait: '穩定性', min: 7, max: 10 }
      ]
    },
    personalityAffinity: [
      { trait: '好奇心', idealValue: 10, tolerance: 0 },
      { trait: '同理心', idealValue: 10, tolerance: 0 },
      { trait: '穩定性', idealValue: 10, tolerance: 0 }
    ]
  }
];

// 根據ID獲取動物
export const getAnimalById = (id: string): Animal | undefined => {
  return animals.find(animal => animal.id === id);
};

// 根據稀有度獲取動物列表
export const getAnimalsByRarity = (rarity: Animal['rarity']): Animal[] => {
  return animals.filter(animal => animal.rarity === rarity);
};

// 檢查動物是否可以被收集（基於玩家狀態）
export const canCollectAnimal = (animal: Animal, playerStats: Record<string, number>): boolean => {
  if (!animal.unlockCondition) return true;

  const condition = animal.unlockCondition;

  // 檢查單一屬性條件
  if (condition.stat && condition.value !== undefined && condition.operator) {
    const statValue = playerStats[condition.stat];
    switch (condition.operator) {
      case 'gte': return statValue >= condition.value;
      case 'lte': return statValue <= condition.value;
      case 'gt': return statValue > condition.value;
      case 'lt': return statValue < condition.value;
      case 'eq': return statValue === condition.value;
    }
  }

  // 檢查範圍條件
  if (condition.personalityRange) {
    return condition.personalityRange.every(range => {
      const statValue = playerStats[range.trait];
      return statValue >= range.min && statValue <= range.max;
    });
  }

  return true;
};

// 計算動物對玩家的親和度
export const calculateAnimalAffinity = (animal: Animal, playerStats: Record<string, number>): number => {
  if (!animal.personalityAffinity || animal.personalityAffinity.length === 0) {
    return 50; // 預設親和度
  }

  let totalAffinity = 0;
  let count = 0;

  animal.personalityAffinity.forEach(affinity => {
    const statValue = playerStats[affinity.trait];
    const difference = Math.abs(statValue - affinity.idealValue);
    
    // 如果在容忍範圍內，親和度較高
    if (difference <= affinity.tolerance) {
      const affinityScore = 100 - (difference / affinity.tolerance) * 50;
      totalAffinity += affinityScore;
    } else {
      // 超出容忍範圍，親和度較低
      const affinityScore = 50 - Math.min(difference - affinity.tolerance, 50);
      totalAffinity += Math.max(0, affinityScore);
    }
    count++;
  });

  return Math.round(totalAffinity / count);
};