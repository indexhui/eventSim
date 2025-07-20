import { ExtendedEvent } from '../../types/game';

// 動物收集事件
export const animalEvents: ExtendedEvent[] = [
  // 常見動物遭遇事件
  {
    id: 'ANIMAL_EVENT_001',
    name: '便利商店的小花貓',
    description: '你在便利商店外看到一隻三花貓正在向路人撒嬌。牠看起來很親人，偶爾會蹭蹭路人的腿。',
    category: 'animal',
    difficulty: 'easy',
    tags: ['動物', '日常'],
    animalEncounter: {
      animalId: 'ANIMAL_001',
      encounterType: 'interaction',
      collectionChance: 70,
    },
    options: {
      A: {
        text: '蹲下來輕輕撫摸牠',
        statChanges: { 心情: 3, 同理心: 1 },
        consequences: ['小花貓發出滿足的呼嚕聲，似乎很喜歡你的撫摸。'],
        animalCollection: true,
      },
      B: {
        text: '買罐貓罐頭餵牠',
        statChanges: { 心情: 5, 儲蓄: -30, 同理心: 2 },
        consequences: ['小花貓開心地吃著罐頭，對你的好感度大增！'],
        animalCollection: true,
      },
      C: {
        text: '快步走過，避免打擾',
        statChanges: { 體力: -1 },
        consequences: ['你匆匆走過，小花貓只是看了你一眼。'],
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_002',
    name: '捷運站的麻雀群',
    description: '在等捷運時，你注意到月台上有一群麻雀在啄食地上的麵包屑。',
    category: 'animal',
    difficulty: 'easy',
    tags: ['動物', '通勤'],
    animalEncounter: {
      animalId: 'ANIMAL_002',
      encounterType: 'sighting',
      collectionChance: 50,
    },
    options: {
      A: {
        text: '靜靜觀察牠們',
        statChanges: { 心情: 2, 穩定性: 1 },
        consequences: ['你安靜地觀察著麻雀們的日常，感到內心平靜。'],
        animalCollection: true,
      },
      B: {
        text: '分享你的早餐麵包',
        statChanges: { 心情: 3, 體力: -2 },
        consequences: ['麻雀們開心地圍過來啄食，場面很療癒。'],
        animalCollection: true,
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_003',
    name: '公園裡的流浪柴犬',
    description: '晨跑時遇到一隻友善的柴犬，牠搖著尾巴朝你走來。',
    category: 'animal',
    difficulty: 'easy',
    tags: ['動物', '運動'],
    animalEncounter: {
      animalId: 'ANIMAL_003',
      encounterType: 'interaction',
      collectionChance: 60,
    },
    options: {
      A: {
        text: '停下來和牠玩一會',
        statChanges: { 心情: 5, 體力: -3, 社交傾向: 1 },
        consequences: ['柴犬開心地和你玩耍，你們成為了朋友！'],
        animalCollection: true,
      },
      B: {
        text: '輕輕摸摸牠的頭',
        statChanges: { 心情: 3, 社交傾向: 1 },
        consequences: ['柴犬享受地瞇起眼睛，尾巴搖得更歡了。'],
        animalCollection: true,
      },
      C: {
        text: '保持距離繼續跑步',
        statChanges: { 體力: -2 },
        consequences: ['你繼續跑步，柴犬失望地看著你離去。'],
      },
    },
  },

  // 不常見動物遭遇事件
  {
    id: 'ANIMAL_EVENT_004',
    name: '夜市的神秘倉鼠',
    description: '逛夜市時，你在一個攤位旁發現一隻小倉鼠正在啃食掉落的瓜子。這似乎不是野生的。',
    category: 'animal',
    difficulty: 'medium',
    tags: ['動物', '夜市'],
    animalEncounter: {
      animalId: 'ANIMAL_005',
      encounterType: 'interaction',
      collectionChance: 40,
    },
    options: {
      A: {
        text: '小心地接近觀察',
        statChanges: { 好奇心: 2 },
        conditions: [{ stat: '好奇心', operator: 'gte', value: 3 }],
        consequences: ['你的好奇心讓你發現了這隻特別的倉鼠！'],
        animalCollection: true,
      },
      B: {
        text: '買些堅果餵牠',
        statChanges: { 儲蓄: -20, 好奇心: 1 },
        consequences: ['倉鼠開心地把堅果塞進腮幫子裡。'],
        animalCollection: true,
      },
      C: {
        text: '告訴攤販有隻倉鼠',
        statChanges: { 同理心: 1 },
        consequences: ['攤販感謝你的提醒，但倉鼠已經跑掉了。'],
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_005',
    name: '大安森林公園的松鼠',
    description: '你在公園散步時，一隻靈活的松鼠在樹枝間跳躍，似乎在收集堅果。',
    category: 'animal',
    difficulty: 'medium',
    tags: ['動物', '公園'],
    animalEncounter: {
      animalId: 'ANIMAL_006',
      encounterType: 'sighting',
      collectionChance: 35,
    },
    options: {
      A: {
        text: '耐心等待好時機拍照',
        statChanges: { 時間感: 2, 體力: -2 },
        conditions: [{ stat: '時間感', operator: 'gte', value: 5 }],
        consequences: ['你的耐心得到回報，拍到了完美的照片！'],
        animalCollection: true,
      },
      B: {
        text: '丟些堅果吸引牠',
        statChanges: { 心情: 3 },
        consequences: ['松鼠機警地拿走堅果，快速爬回樹上。'],
        animalCollection: true,
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_006',
    name: '池塘邊的小鴨子',
    description: '公園池塘邊有隻小鴨子離群獨自游泳，看起來有點迷路。',
    category: 'animal',
    difficulty: 'medium',
    tags: ['動物', '公園'],
    animalEncounter: {
      animalId: 'ANIMAL_007',
      encounterType: 'rescue',
      collectionChance: 45,
    },
    options: {
      A: {
        text: '試著引導牠回到鴨群',
        statChanges: { 體力: -5, 同理心: 2 },
        conditions: [{ stat: '體力', operator: 'gte', value: 60 }],
        consequences: ['你成功幫助小鴨找到了家人！'],
        animalCollection: true,
      },
      B: {
        text: '在旁邊守護觀察',
        statChanges: { 心情: 2, 穩定性: 1 },
        consequences: ['小鴨最終自己找到了回去的路。'],
      },
    },
  },

  // 稀有動物遭遇事件
  {
    id: 'ANIMAL_EVENT_007',
    name: '深夜小巷的刺蝟',
    description: '深夜回家時，你在小巷裡發現一隻小刺蝟正在緩慢移動。這在城市裡相當罕見。',
    category: 'animal',
    difficulty: 'hard',
    tags: ['動物', '夜晚'],
    animalEncounter: {
      animalId: 'ANIMAL_009',
      encounterType: 'rescue',
      collectionChance: 25,
    },
    options: {
      A: {
        text: '小心地幫助牠到安全處',
        statChanges: { 體力: -3, 同理心: 3 },
        conditions: [
          { stat: '同理心', operator: 'gte', value: 6 },
          { stat: '穩定性', operator: 'gte', value: 4 }
        ],
        consequences: ['你溫柔地保護了這隻稀有的小刺蝟。'],
        animalCollection: true,
      },
      B: {
        text: '拍照後聯繫動保單位',
        statChanges: { 同理心: 2 },
        consequences: ['動保人員感謝你的通報，刺蝟得到妥善照顧。'],
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_008',
    name: '高樓陽台的神秘烏龜',
    description: '你在朋友家的陽台上發現一隻烏龜在曬太陽。沒人知道牠是從哪來的。',
    category: 'animal',
    difficulty: 'hard',
    tags: ['動物', '神秘'],
    animalEncounter: {
      animalId: 'ANIMAL_010',
      encounterType: 'sighting',
      collectionChance: 20,
    },
    options: {
      A: {
        text: '靜靜觀察這個慢活哲學家',
        statChanges: { 決斷力: -2, 時間感: 3 },
        conditions: [
          { stat: '決斷力', operator: 'lte', value: -6 },
          { stat: '時間感', operator: 'gte', value: 15 }
        ],
        consequences: ['你從烏龜身上學到了慢活的智慧。'],
        animalCollection: true,
      },
      B: {
        text: '幫牠準備一些水和食物',
        statChanges: { 同理心: 2 },
        consequences: ['烏龜慢慢地享用你的善意。'],
      },
    },
  },
  {
    id: 'ANIMAL_EVENT_009',
    name: '彩虹蝴蝶的祝福',
    description: '心情特別好的這天，一隻美麗的彩虹蝴蝶在你面前翩翩起舞。',
    category: 'animal',
    difficulty: 'hard',
    tags: ['動物', '幸運'],
    animalEncounter: {
      animalId: 'ANIMAL_011',
      encounterType: 'sighting',
      collectionChance: 15,
    },
    options: {
      A: {
        text: '靜心感受這美好時刻',
        statChanges: { 心情: 10, 好奇心: 2 },
        conditions: [{ stat: '心情', operator: 'gte', value: 85 }],
        consequences: ['蝴蝶似乎感受到你的喜悅，在你身邊飛舞了好一會。'],
        animalCollection: true,
      },
      B: {
        text: '跟隨蝴蝶的飛舞路線',
        statChanges: { 體力: -3, 好奇心: 3 },
        consequences: ['蝴蝶帶你發現了一片美麗的花園。'],
      },
    },
  },

  // 傳說動物遭遇事件
  {
    id: 'ANIMAL_EVENT_010',
    name: '夢幻金魚的邂逅',
    description: '在一個寧靜的夜晚，你在公園的許願池邊看到一條閃著金光的魚。這似乎就是傳說中的幻夢金魚。',
    category: 'animal',
    difficulty: 'legendary',
    tags: ['動物', '傳說'],
    animalEncounter: {
      animalId: 'ANIMAL_012',
      encounterType: 'sighting',
      collectionChance: 5,
    },
    options: {
      A: {
        text: '虔誠地許下心願',
        statChanges: { 心情: 20, 好奇心: 3, 同理心: 3 },
        conditions: [
          { stat: '好奇心', operator: 'gte', value: 8 },
          { stat: '同理心', operator: 'gte', value: 8 },
          { stat: '穩定性', operator: 'gte', value: 7 }
        ],
        consequences: ['金魚繞著池邊游了三圈，你感覺心願會實現。'],
        animalCollection: true,
      },
      B: {
        text: '靜靜欣賞這奇蹟',
        statChanges: { 心情: 10, 穩定性: 2 },
        consequences: ['能見到傳說中的金魚已經是莫大的幸運。'],
      },
    },
  },
];

// 動物離開威脅事件
export const animalThreatEvents: ExtendedEvent[] = [
  {
    id: 'ANIMAL_THREAT_001',
    name: '小花貓的離別危機',
    description: '你收集的小花貓最近看起來很焦躁，似乎是因為你最近太冷漠了。牠正準備離開去尋找更有愛的主人。',
    category: 'animal',
    difficulty: 'medium',
    tags: ['動物', '威脅'],
    animalEncounter: {
      animalId: 'ANIMAL_001',
      encounterType: 'threat',
      leaveCondition: {
        trait: '同理心',
        threshold: -3,
        operator: 'lte'
      }
    },
    options: {
      A: {
        text: '買牠最愛的罐頭挽留',
        statChanges: { 儲蓄: -50, 同理心: 2 },
        consequences: ['小花貓被你的誠意打動，決定留下來。'],
        preventAnimalLeave: true,
      },
      B: {
        text: '花時間陪牠玩耍',
        statChanges: { 體力: -5, 心情: 3, 同理心: 3 },
        consequences: ['你們重新建立了信任，小花貓開心地留了下來。'],
        preventAnimalLeave: true,
      },
      C: {
        text: '讓牠自由選擇',
        statChanges: { 心情: -10 },
        consequences: ['小花貓失望地離開了，去尋找新的歸宿。'],
      },
    },
  },
  {
    id: 'ANIMAL_THREAT_002',
    name: '柴犬的社交需求',
    description: '你的柴犬朋友最近很少見到你，牠開始和其他常來公園的人親近了。',
    category: 'animal',
    difficulty: 'medium',
    tags: ['動物', '威脅'],
    animalEncounter: {
      animalId: 'ANIMAL_003',
      encounterType: 'threat',
      leaveCondition: {
        trait: '社交傾向',
        threshold: -5,
        operator: 'lte'
      }
    },
    options: {
      A: {
        text: '每天固定時間去看牠',
        statChanges: { 體力: -3, 社交傾向: 3 },
        consequences: ['柴犬又重新認定你是牠最好的朋友！'],
        preventAnimalLeave: true,
      },
      B: {
        text: '帶牠去狗公園社交',
        statChanges: { 體力: -5, 心情: 5, 社交傾向: 4 },
        consequences: ['柴犬玩得很開心，你們的友誼更深了。'],
        preventAnimalLeave: true,
      },
      C: {
        text: '接受牠有了新朋友',
        statChanges: { 心情: -8, 社交傾向: -2 },
        consequences: ['柴犬選擇了更常陪伴牠的新主人。'],
      },
    },
  },
  {
    id: 'ANIMAL_THREAT_003',
    name: '刺蝟的安定需求',
    description: '你收集的稀有刺蝟因為你最近情緒起伏太大而感到不安，正考慮離開尋找更穩定的環境。',
    category: 'animal',
    difficulty: 'hard',
    tags: ['動物', '威脅'],
    animalEncounter: {
      animalId: 'ANIMAL_009',
      encounterType: 'threat',
      leaveCondition: {
        trait: '穩定性',
        threshold: 0,
        operator: 'lte'
      }
    },
    options: {
      A: {
        text: '冥想調整自己的情緒',
        statChanges: { 穩定性: 4, 心情: 3 },
        consequences: ['刺蝟感受到你的改變，決定再給你一次機會。'],
        preventAnimalLeave: true,
      },
      B: {
        text: '為牠布置安靜的環境',
        statChanges: { 儲蓄: -100, 穩定性: 2 },
        consequences: ['舒適的環境讓刺蝟感到安心，願意留下。'],
        preventAnimalLeave: true,
      },
      C: {
        text: '承認無法給牠需要的',
        statChanges: { 心情: -15, 同理心: 1 },
        consequences: ['你理解地讓刺蝟離開，希望牠找到更好的家。'],
      },
    },
  },
  {
    id: 'ANIMAL_THREAT_004',
    name: '金魚的純淨考驗',
    description: '傳說中的幻夢金魚感受到你內心的改變，你的某些特質已經不再純粹。牠正在考慮是否要離開。',
    category: 'animal',
    difficulty: 'legendary',
    tags: ['動物', '威脅'],
    animalEncounter: {
      animalId: 'ANIMAL_012',
      encounterType: 'threat',
      leaveCondition: {
        trait: '好奇心',
        threshold: 5,
        operator: 'lte'
      }
    },
    options: {
      A: {
        text: '重新找回初心',
        statChanges: { 好奇心: 5, 同理心: 3, 穩定性: 2 },
        conditions: [
          { stat: '同理心', operator: 'gte', value: 6 },
          { stat: '穩定性', operator: 'gte', value: 5 }
        ],
        consequences: ['你的真誠打動了金魚，牠決定繼續陪伴你。'],
        preventAnimalLeave: true,
      },
      B: {
        text: '許下最純粹的願望',
        statChanges: { 心情: 10 },
        conditions: [
          { stat: '好奇心', operator: 'gte', value: 7 }
        ],
        consequences: ['金魚被你的純粹願望感動，選擇留下。'],
        preventAnimalLeave: true,
      },
      C: {
        text: '感謝相遇，放手祝福',
        statChanges: { 心情: -20, 同理心: 5 },
        consequences: ['金魚化作一道金光消失，但你心中充滿感激。'],
      },
    },
  },
];

// 將動物事件加入事件池
export const allAnimalEvents = [...animalEvents, ...animalThreatEvents];