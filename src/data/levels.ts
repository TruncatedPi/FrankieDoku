import { Puzzle } from '../engine/types';

export interface CampaignLevel extends Puzzle {
  levelNumber: number;
  tier: 'Kitten' | 'Playful' | 'Clever' | 'Master' | 'Explorer' | 'Adventurer' | 'Champion' | 'Legend' | 'Grandmaster' | 'Phantom' | 'Eclipse';
}

export const CAMPAIGN_LEVELS: CampaignLevel[] = [
  {
    "id": "level-1",
    "levelNumber": 1,
    "name": "Kitten Nursery #1",
    "tier": "Kitten",
    "size": 4,
    "difficulty": "easy",
    "regions": [
      [
        0,
        0,
        1,
        1
      ],
      [
        2,
        0,
        1,
        1
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        2,
        3,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      }
    ]
  },
  {
    "id": "level-2",
    "levelNumber": 2,
    "name": "Kitten Nursery #2",
    "tier": "Kitten",
    "size": 4,
    "difficulty": "easy",
    "regions": [
      [
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        0,
        2
      ],
      [
        1,
        1,
        3,
        2
      ],
      [
        3,
        3,
        3,
        2
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 1
      }
    ]
  },
  {
    "id": "level-3",
    "levelNumber": 3,
    "name": "Kitten Nursery #3",
    "tier": "Kitten",
    "size": 4,
    "difficulty": "easy",
    "regions": [
      [
        0,
        0,
        0,
        0
      ],
      [
        2,
        1,
        1,
        1
      ],
      [
        2,
        2,
        1,
        3
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      }
    ]
  },
  {
    "id": "level-4",
    "levelNumber": 4,
    "name": "Kitten Nursery #4",
    "tier": "Kitten",
    "size": 4,
    "difficulty": "easy",
    "regions": [
      [
        1,
        1,
        0,
        0
      ],
      [
        1,
        0,
        0,
        2
      ],
      [
        1,
        3,
        2,
        2
      ],
      [
        1,
        3,
        3,
        2
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 1
      }
    ]
  },
  {
    "id": "level-5",
    "levelNumber": 5,
    "name": "Kitten Nursery #5",
    "tier": "Kitten",
    "size": 4,
    "difficulty": "easy",
    "regions": [
      [
        0,
        0,
        1,
        1
      ],
      [
        2,
        0,
        1,
        1
      ],
      [
        2,
        2,
        3,
        1
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      }
    ]
  },
  {
    "id": "level-6",
    "levelNumber": 6,
    "name": "Curious Paws #6",
    "tier": "Kitten",
    "size": 5,
    "difficulty": "easy",
    "regions": [
      [
        0,
        0,
        0,
        2,
        2
      ],
      [
        0,
        1,
        1,
        2,
        2
      ],
      [
        0,
        3,
        1,
        2,
        2
      ],
      [
        0,
        3,
        3,
        2,
        2
      ],
      [
        0,
        3,
        4,
        4,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      }
    ]
  },
  {
    "id": "level-7",
    "levelNumber": 7,
    "name": "Curious Paws #7",
    "tier": "Kitten",
    "size": 5,
    "difficulty": "easy",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0
      ],
      [
        1,
        3,
        0,
        2,
        2
      ],
      [
        1,
        3,
        3,
        4,
        4
      ],
      [
        1,
        3,
        3,
        3,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 4
      }
    ]
  },
  {
    "id": "level-8",
    "levelNumber": 8,
    "name": "Curious Paws #8",
    "tier": "Kitten",
    "size": 5,
    "difficulty": "easy",
    "regions": [
      [
        2,
        0,
        1,
        1,
        1
      ],
      [
        2,
        2,
        1,
        1,
        1
      ],
      [
        2,
        2,
        2,
        3,
        3
      ],
      [
        2,
        2,
        3,
        3,
        4
      ],
      [
        4,
        4,
        4,
        4,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 4
      }
    ]
  },
  {
    "id": "level-9",
    "levelNumber": 9,
    "name": "Curious Paws #9",
    "tier": "Kitten",
    "size": 5,
    "difficulty": "easy",
    "regions": [
      [
        1,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        3,
        2
      ],
      [
        4,
        3,
        3,
        3,
        2
      ],
      [
        4,
        4,
        4,
        2,
        2
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 0
      }
    ]
  },
  {
    "id": "level-10",
    "levelNumber": 10,
    "name": "Curious Paws #10",
    "tier": "Kitten",
    "size": 5,
    "difficulty": "easy",
    "regions": [
      [
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        2,
        2
      ],
      [
        1,
        3,
        0,
        0,
        2
      ],
      [
        3,
        3,
        4,
        4,
        2
      ],
      [
        4,
        4,
        4,
        2,
        2
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 4,
        "col": 2
      }
    ]
  },
  {
    "id": "level-11",
    "levelNumber": 11,
    "name": "Playful Yarn #11",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        2,
        0,
        3,
        3
      ],
      [
        1,
        1,
        4,
        5,
        5,
        3
      ],
      [
        4,
        4,
        4,
        4,
        5,
        3
      ],
      [
        4,
        4,
        4,
        4,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 4
      }
    ]
  },
  {
    "id": "level-12",
    "levelNumber": 12,
    "name": "Playful Yarn #12",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        0,
        1,
        1,
        2,
        2
      ],
      [
        0,
        3,
        1,
        4,
        2,
        2
      ],
      [
        5,
        3,
        4,
        4,
        4,
        4
      ],
      [
        5,
        5,
        5,
        5,
        5,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 2
      }
    ]
  },
  {
    "id": "level-13",
    "levelNumber": 13,
    "name": "Playful Yarn #13",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        2
      ],
      [
        0,
        0,
        1,
        0,
        0,
        2
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        1,
        3,
        1,
        1,
        2,
        4
      ],
      [
        3,
        3,
        3,
        1,
        4,
        4
      ],
      [
        3,
        5,
        5,
        5,
        5,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 5,
        "col": 3
      }
    ]
  },
  {
    "id": "level-14",
    "levelNumber": 14,
    "name": "Playful Yarn #14",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        1,
        2,
        2
      ],
      [
        0,
        1,
        1,
        1,
        2,
        2
      ],
      [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      [
        0,
        3,
        1,
        2,
        2,
        2
      ],
      [
        3,
        3,
        4,
        4,
        5,
        2
      ],
      [
        3,
        3,
        3,
        4,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 5
      }
    ]
  },
  {
    "id": "level-15",
    "levelNumber": 15,
    "name": "Playful Yarn #15",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        1,
        5
      ],
      [
        2,
        0,
        1,
        1,
        1,
        5
      ],
      [
        2,
        0,
        0,
        1,
        3,
        5
      ],
      [
        2,
        2,
        3,
        3,
        3,
        5
      ],
      [
        4,
        4,
        3,
        3,
        5,
        5
      ],
      [
        4,
        3,
        3,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 5
      }
    ]
  },
  {
    "id": "level-16",
    "levelNumber": 16,
    "name": "Playful Yarn #16",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        1,
        1,
        1,
        2
      ],
      [
        0,
        1,
        1,
        1,
        2,
        2
      ],
      [
        0,
        3,
        3,
        3,
        3,
        5
      ],
      [
        0,
        3,
        4,
        4,
        4,
        5
      ],
      [
        0,
        3,
        4,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 5
      }
    ]
  },
  {
    "id": "level-17",
    "levelNumber": 17,
    "name": "Playful Yarn #17",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        3,
        3,
        3,
        3,
        2,
        5
      ],
      [
        3,
        3,
        4,
        4,
        4,
        5
      ],
      [
        3,
        4,
        4,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 5
      }
    ]
  },
  {
    "id": "level-18",
    "levelNumber": 18,
    "name": "Playful Yarn #18",
    "tier": "Playful",
    "size": 6,
    "difficulty": "medium",
    "regions": [
      [
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        2,
        2
      ],
      [
        1,
        3,
        3,
        3,
        2,
        2
      ],
      [
        1,
        1,
        3,
        2,
        2,
        4
      ],
      [
        5,
        3,
        3,
        4,
        2,
        4
      ],
      [
        5,
        5,
        5,
        4,
        4,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 5,
        "col": 1
      }
    ]
  },
  {
    "id": "level-19",
    "levelNumber": 19,
    "name": "Cardboard Castle #19",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        1,
        1,
        1,
        1,
        2,
        0,
        2
      ],
      [
        1,
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        1,
        3,
        1,
        4,
        2,
        2,
        2
      ],
      [
        3,
        3,
        3,
        4,
        4,
        5,
        5
      ],
      [
        3,
        6,
        6,
        4,
        4,
        5,
        5
      ],
      [
        3,
        6,
        6,
        4,
        4,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 6,
        "col": 2
      }
    ]
  },
  {
    "id": "level-20",
    "levelNumber": 20,
    "name": "Cardboard Castle #20",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        2,
        0,
        0,
        1,
        1
      ],
      [
        0,
        2,
        2,
        2,
        0,
        1,
        1
      ],
      [
        2,
        2,
        4,
        4,
        3,
        3,
        3
      ],
      [
        2,
        2,
        4,
        4,
        3,
        3,
        3
      ],
      [
        2,
        4,
        4,
        4,
        6,
        3,
        5
      ],
      [
        2,
        6,
        6,
        6,
        6,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 6,
        "col": 3
      }
    ]
  },
  {
    "id": "level-21",
    "levelNumber": 21,
    "name": "Cardboard Castle #21",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        1,
        1,
        1,
        2,
        2,
        2,
        0
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2,
        2
      ],
      [
        1,
        3,
        1,
        2,
        2,
        2,
        2
      ],
      [
        1,
        3,
        4,
        2,
        2,
        2,
        5
      ],
      [
        3,
        3,
        4,
        4,
        2,
        5,
        5
      ],
      [
        3,
        6,
        4,
        4,
        4,
        5,
        5
      ],
      [
        3,
        6,
        6,
        5,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 6
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 2
      }
    ]
  },
  {
    "id": "level-22",
    "levelNumber": 22,
    "name": "Cardboard Castle #22",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        2,
        0,
        0
      ],
      [
        1,
        1,
        1,
        5,
        2,
        3,
        3
      ],
      [
        4,
        1,
        1,
        5,
        2,
        3,
        3
      ],
      [
        6,
        6,
        5,
        5,
        2,
        3,
        3
      ],
      [
        6,
        6,
        6,
        6,
        6,
        3,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 1
      }
    ]
  },
  {
    "id": "level-23",
    "levelNumber": 23,
    "name": "Cardboard Castle #23",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        1,
        1,
        1,
        2,
        2,
        0,
        2
      ],
      [
        1,
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2,
        2
      ],
      [
        3,
        1,
        6,
        2,
        4,
        4,
        2
      ],
      [
        3,
        3,
        6,
        6,
        5,
        4,
        4
      ],
      [
        3,
        3,
        3,
        6,
        5,
        5,
        5
      ],
      [
        3,
        3,
        6,
        6,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 2
      }
    ]
  },
  {
    "id": "level-24",
    "levelNumber": 24,
    "name": "Cardboard Castle #24",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        2,
        0,
        0,
        1,
        1,
        1
      ],
      [
        2,
        2,
        3,
        3,
        3,
        4,
        4
      ],
      [
        2,
        2,
        3,
        3,
        3,
        4,
        4
      ],
      [
        2,
        5,
        5,
        5,
        5,
        5,
        4
      ],
      [
        2,
        6,
        6,
        6,
        5,
        4,
        4
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 2
      }
    ]
  },
  {
    "id": "level-25",
    "levelNumber": 25,
    "name": "Cardboard Castle #25",
    "tier": "Playful",
    "size": 7,
    "difficulty": "medium",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        2,
        1
      ],
      [
        0,
        3,
        4,
        4,
        4,
        2,
        2
      ],
      [
        0,
        3,
        5,
        5,
        4,
        2,
        6
      ],
      [
        3,
        3,
        5,
        5,
        4,
        6,
        6
      ],
      [
        3,
        3,
        3,
        5,
        6,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 6,
        "col": 6
      }
    ]
  },
  {
    "id": "level-26",
    "levelNumber": 26,
    "name": "Midnight Zoomies #26",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        2,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        2,
        2,
        3,
        3,
        1,
        1,
        1,
        4
      ],
      [
        2,
        2,
        5,
        3,
        3,
        4,
        4,
        4
      ],
      [
        2,
        2,
        5,
        5,
        5,
        4,
        7,
        4
      ],
      [
        2,
        6,
        6,
        5,
        5,
        7,
        7,
        4
      ],
      [
        2,
        6,
        6,
        6,
        7,
        7,
        7,
        7
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 2
      },
      {
        "row": 7,
        "col": 5
      }
    ]
  },
  {
    "id": "level-27",
    "levelNumber": 27,
    "name": "Midnight Zoomies #27",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2
      ],
      [
        4,
        1,
        1,
        1,
        2,
        2,
        2,
        2
      ],
      [
        4,
        1,
        1,
        1,
        2,
        2,
        2,
        3
      ],
      [
        4,
        4,
        4,
        4,
        2,
        2,
        2,
        3
      ],
      [
        4,
        4,
        4,
        4,
        5,
        5,
        3,
        3
      ],
      [
        6,
        4,
        4,
        5,
        5,
        7,
        3,
        7
      ],
      [
        6,
        6,
        6,
        5,
        5,
        7,
        7,
        7
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 3,
        "col": 7
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 0
      },
      {
        "row": 7,
        "col": 6
      }
    ]
  },
  {
    "id": "level-28",
    "levelNumber": 28,
    "name": "Midnight Zoomies #28",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        2,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        2,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        2,
        2,
        1,
        1,
        1
      ],
      [
        0,
        0,
        2,
        2,
        4,
        1,
        3,
        3
      ],
      [
        0,
        0,
        2,
        2,
        4,
        4,
        3,
        6
      ],
      [
        0,
        5,
        2,
        4,
        4,
        4,
        3,
        6
      ],
      [
        0,
        5,
        7,
        7,
        4,
        3,
        3,
        6
      ],
      [
        0,
        7,
        7,
        7,
        7,
        6,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 1
      },
      {
        "row": 6,
        "col": 7
      },
      {
        "row": 7,
        "col": 2
      }
    ]
  },
  {
    "id": "level-29",
    "levelNumber": 29,
    "name": "Midnight Zoomies #29",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        2,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        2,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        2,
        2,
        1,
        1,
        3
      ],
      [
        0,
        4,
        0,
        2,
        2,
        1,
        3,
        3
      ],
      [
        4,
        4,
        6,
        2,
        5,
        5,
        5,
        3
      ],
      [
        7,
        6,
        6,
        2,
        5,
        5,
        5,
        3
      ],
      [
        7,
        7,
        7,
        7,
        7,
        7,
        5,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 7
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 2
      },
      {
        "row": 7,
        "col": 0
      }
    ]
  },
  {
    "id": "level-30",
    "levelNumber": 30,
    "name": "Midnight Zoomies #30",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        2,
        0,
        0,
        3,
        1,
        1,
        1
      ],
      [
        0,
        2,
        2,
        3,
        3,
        1,
        3,
        1
      ],
      [
        0,
        2,
        4,
        3,
        3,
        3,
        3,
        1
      ],
      [
        4,
        4,
        4,
        5,
        5,
        3,
        6,
        6
      ],
      [
        4,
        7,
        7,
        5,
        5,
        3,
        6,
        6
      ],
      [
        4,
        7,
        7,
        7,
        5,
        5,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 7
      },
      {
        "row": 7,
        "col": 3
      }
    ]
  },
  {
    "id": "level-31",
    "levelNumber": 31,
    "name": "Midnight Zoomies #31",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        2,
        0,
        1,
        1,
        1
      ],
      [
        0,
        3,
        2,
        2,
        4,
        1,
        1,
        1
      ],
      [
        3,
        3,
        2,
        4,
        4,
        1,
        5,
        5
      ],
      [
        3,
        3,
        2,
        4,
        4,
        4,
        6,
        5
      ],
      [
        3,
        7,
        2,
        7,
        6,
        6,
        6,
        5
      ],
      [
        3,
        7,
        7,
        7,
        6,
        6,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 6,
        "col": 5
      },
      {
        "row": 7,
        "col": 2
      }
    ]
  },
  {
    "id": "level-32",
    "levelNumber": 32,
    "name": "Midnight Zoomies #32",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        1,
        1,
        1,
        1,
        1,
        3,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        3,
        2,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        3,
        2,
        0
      ],
      [
        1,
        1,
        3,
        3,
        3,
        3,
        2,
        2
      ],
      [
        1,
        4,
        7,
        7,
        3,
        2,
        2,
        2
      ],
      [
        1,
        4,
        7,
        5,
        5,
        2,
        6,
        6
      ],
      [
        4,
        4,
        7,
        5,
        6,
        6,
        6,
        6
      ],
      [
        4,
        7,
        7,
        5,
        5,
        5,
        5,
        5
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 5
      },
      {
        "row": 7,
        "col": 2
      }
    ]
  },
  {
    "id": "level-33",
    "levelNumber": 33,
    "name": "Midnight Zoomies #33",
    "tier": "Clever",
    "size": 8,
    "difficulty": "hard",
    "regions": [
      [
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        0
      ],
      [
        5,
        5,
        5,
        5,
        5,
        1,
        1,
        3
      ],
      [
        5,
        4,
        5,
        2,
        4,
        3,
        3,
        3
      ],
      [
        5,
        4,
        4,
        4,
        4,
        4,
        3,
        3
      ],
      [
        5,
        4,
        4,
        4,
        4,
        4,
        6,
        3
      ],
      [
        5,
        5,
        5,
        4,
        6,
        6,
        6,
        3
      ],
      [
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        3
      ],
      [
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 0
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 1
      }
    ]
  },
  {
    "id": "level-34",
    "levelNumber": 34,
    "name": "Cat Tree Summit #34",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        2,
        2,
        1,
        1,
        1,
        5,
        5
      ],
      [
        0,
        0,
        2,
        1,
        1,
        1,
        1,
        5,
        6
      ],
      [
        0,
        2,
        2,
        1,
        1,
        1,
        1,
        5,
        6
      ],
      [
        0,
        2,
        2,
        1,
        3,
        1,
        1,
        5,
        6
      ],
      [
        0,
        2,
        4,
        1,
        3,
        3,
        3,
        5,
        6
      ],
      [
        0,
        0,
        4,
        4,
        3,
        5,
        5,
        5,
        6
      ],
      [
        0,
        0,
        0,
        4,
        7,
        7,
        7,
        6,
        6
      ],
      [
        0,
        4,
        4,
        4,
        7,
        7,
        7,
        6,
        6
      ],
      [
        0,
        4,
        4,
        7,
        7,
        7,
        7,
        8,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 8,
        "col": 7
      }
    ]
  },
  {
    "id": "level-35",
    "levelNumber": 35,
    "name": "Cat Tree Summit #35",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        1,
        3
      ],
      [
        0,
        0,
        0,
        2,
        2,
        4,
        2,
        1,
        3
      ],
      [
        0,
        5,
        0,
        2,
        4,
        4,
        2,
        1,
        3
      ],
      [
        0,
        5,
        5,
        5,
        5,
        4,
        4,
        3,
        3
      ],
      [
        0,
        6,
        5,
        5,
        5,
        7,
        4,
        7,
        3
      ],
      [
        6,
        6,
        6,
        6,
        6,
        7,
        7,
        7,
        3
      ],
      [
        6,
        8,
        8,
        8,
        8,
        8,
        8,
        7,
        3
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 1
      },
      {
        "row": 7,
        "col": 6
      },
      {
        "row": 8,
        "col": 2
      }
    ]
  },
  {
    "id": "level-36",
    "levelNumber": 36,
    "name": "Cat Tree Summit #36",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        3,
        3,
        3,
        1,
        1,
        1,
        2,
        2,
        0
      ],
      [
        3,
        3,
        1,
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        3,
        3,
        3,
        3,
        3,
        1,
        1,
        2,
        2
      ],
      [
        3,
        3,
        3,
        1,
        1,
        1,
        2,
        2,
        2
      ],
      [
        3,
        3,
        3,
        1,
        1,
        4,
        2,
        2,
        2
      ],
      [
        3,
        5,
        3,
        5,
        6,
        4,
        4,
        4,
        2
      ],
      [
        5,
        5,
        5,
        5,
        6,
        6,
        4,
        7,
        2
      ],
      [
        5,
        8,
        5,
        6,
        6,
        7,
        7,
        7,
        7
      ],
      [
        8,
        8,
        5,
        6,
        6,
        7,
        7,
        7,
        7
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 8
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 7
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 5,
        "col": 1
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 6
      },
      {
        "row": 8,
        "col": 0
      }
    ]
  },
  {
    "id": "level-37",
    "levelNumber": 37,
    "name": "Cat Tree Summit #37",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        3,
        3,
        6,
        6
      ],
      [
        0,
        0,
        1,
        3,
        3,
        3,
        3,
        6,
        2
      ],
      [
        0,
        4,
        1,
        3,
        5,
        3,
        3,
        6,
        2
      ],
      [
        4,
        4,
        3,
        3,
        5,
        5,
        6,
        6,
        6
      ],
      [
        4,
        4,
        4,
        4,
        5,
        6,
        6,
        6,
        6
      ],
      [
        4,
        4,
        4,
        5,
        5,
        5,
        6,
        6,
        6
      ],
      [
        4,
        7,
        7,
        7,
        5,
        7,
        6,
        6,
        8
      ],
      [
        4,
        4,
        7,
        7,
        7,
        7,
        6,
        8,
        8
      ],
      [
        4,
        7,
        7,
        7,
        7,
        8,
        8,
        8,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 7
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 6
      }
    ]
  },
  {
    "id": "level-38",
    "levelNumber": 38,
    "name": "Cat Tree Summit #38",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        0
      ],
      [
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        0,
        0
      ],
      [
        1,
        3,
        3,
        3,
        2,
        2,
        2,
        0,
        0
      ],
      [
        1,
        4,
        4,
        3,
        3,
        3,
        2,
        0,
        0
      ],
      [
        4,
        4,
        4,
        3,
        3,
        5,
        5,
        5,
        6
      ],
      [
        4,
        8,
        4,
        5,
        5,
        5,
        5,
        5,
        6
      ],
      [
        4,
        8,
        4,
        7,
        7,
        7,
        5,
        6,
        6
      ],
      [
        4,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 2
      }
    ]
  },
  {
    "id": "level-39",
    "levelNumber": 39,
    "name": "Cat Tree Summit #39",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        1,
        1,
        1,
        2,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        0,
        4
      ],
      [
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        4
      ],
      [
        1,
        3,
        1,
        2,
        2,
        2,
        2,
        2,
        4
      ],
      [
        3,
        3,
        3,
        3,
        2,
        2,
        5,
        4,
        4
      ],
      [
        3,
        3,
        3,
        3,
        2,
        5,
        5,
        4,
        6
      ],
      [
        8,
        3,
        5,
        5,
        5,
        5,
        7,
        4,
        6
      ],
      [
        8,
        8,
        5,
        5,
        5,
        7,
        7,
        7,
        6
      ],
      [
        8,
        8,
        8,
        8,
        7,
        7,
        7,
        7,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 7,
        "col": 6
      },
      {
        "row": 8,
        "col": 2
      }
    ]
  },
  {
    "id": "level-40",
    "levelNumber": 40,
    "name": "Cat Tree Summit #40",
    "tier": "Clever",
    "size": 9,
    "difficulty": "hard",
    "regions": [
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        3,
        1,
        3,
        2,
        2,
        2,
        2,
        2,
        2
      ],
      [
        3,
        3,
        3,
        2,
        2,
        2,
        5,
        5,
        6
      ],
      [
        7,
        3,
        3,
        4,
        4,
        5,
        5,
        5,
        6
      ],
      [
        7,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        6
      ],
      [
        7,
        3,
        4,
        7,
        5,
        5,
        5,
        6,
        6
      ],
      [
        7,
        7,
        7,
        7,
        7,
        5,
        8,
        6,
        6
      ],
      [
        7,
        7,
        7,
        7,
        8,
        8,
        8,
        6,
        6
      ],
      [
        7,
        7,
        7,
        7,
        8,
        8,
        8,
        8,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 7,
        "col": 0
      },
      {
        "row": 8,
        "col": 7
      }
    ]
  },
  {
    "id": "level-41",
    "levelNumber": 41,
    "name": "Feline Dynasty #41",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        2
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        2
      ],
      [
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        4,
        2,
        2
      ],
      [
        3,
        3,
        3,
        1,
        5,
        1,
        4,
        4,
        2,
        2
      ],
      [
        3,
        6,
        3,
        1,
        5,
        5,
        7,
        4,
        4,
        2
      ],
      [
        6,
        6,
        3,
        5,
        5,
        5,
        7,
        4,
        8,
        8
      ],
      [
        6,
        6,
        9,
        9,
        7,
        7,
        7,
        4,
        8,
        8
      ],
      [
        6,
        6,
        9,
        9,
        7,
        7,
        7,
        8,
        8,
        8
      ],
      [
        6,
        6,
        6,
        9,
        9,
        9,
        9,
        9,
        9,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 8
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 9
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 0
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 8,
        "col": 7
      },
      {
        "row": 9,
        "col": 3
      }
    ]
  },
  {
    "id": "level-42",
    "levelNumber": 42,
    "name": "Feline Dynasty #42",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        2,
        2,
        4,
        5,
        5,
        3,
        3
      ],
      [
        0,
        0,
        2,
        2,
        2,
        4,
        5,
        5,
        3,
        1
      ],
      [
        0,
        2,
        2,
        2,
        4,
        4,
        5,
        5,
        3,
        3
      ],
      [
        0,
        2,
        4,
        4,
        4,
        5,
        5,
        5,
        3,
        3
      ],
      [
        0,
        0,
        0,
        4,
        4,
        4,
        5,
        7,
        7,
        3
      ],
      [
        0,
        0,
        4,
        4,
        4,
        5,
        5,
        9,
        7,
        3
      ],
      [
        0,
        6,
        4,
        6,
        8,
        5,
        9,
        9,
        7,
        3
      ],
      [
        6,
        6,
        6,
        6,
        8,
        8,
        9,
        7,
        7,
        7
      ],
      [
        6,
        6,
        6,
        8,
        8,
        8,
        9,
        7,
        7,
        9
      ],
      [
        8,
        8,
        8,
        8,
        8,
        8,
        9,
        9,
        9,
        9
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 9
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 1
      },
      {
        "row": 7,
        "col": 7
      },
      {
        "row": 8,
        "col": 4
      },
      {
        "row": 9,
        "col": 6
      }
    ]
  },
  {
    "id": "level-43",
    "levelNumber": 43,
    "name": "Feline Dynasty #43",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        4,
        6
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        4,
        6
      ],
      [
        2,
        0,
        1,
        1,
        3,
        1,
        3,
        1,
        4,
        6
      ],
      [
        2,
        2,
        2,
        1,
        3,
        1,
        3,
        1,
        4,
        6
      ],
      [
        2,
        5,
        5,
        3,
        3,
        3,
        3,
        4,
        4,
        6
      ],
      [
        2,
        5,
        5,
        5,
        7,
        3,
        9,
        9,
        4,
        6
      ],
      [
        2,
        5,
        5,
        5,
        7,
        7,
        7,
        9,
        6,
        6
      ],
      [
        2,
        5,
        5,
        5,
        7,
        7,
        7,
        9,
        6,
        6
      ],
      [
        2,
        2,
        5,
        7,
        7,
        7,
        7,
        9,
        6,
        8
      ],
      [
        2,
        2,
        5,
        7,
        7,
        7,
        9,
        9,
        8,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 8,
        "col": 9
      },
      {
        "row": 9,
        "col": 6
      }
    ]
  },
  {
    "id": "level-44",
    "levelNumber": 44,
    "name": "Feline Dynasty #44",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        2,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1,
        3,
        0,
        2,
        2,
        2,
        2
      ],
      [
        1,
        1,
        4,
        4,
        3,
        3,
        2,
        2,
        2,
        2
      ],
      [
        1,
        6,
        6,
        4,
        4,
        3,
        3,
        2,
        5,
        2
      ],
      [
        1,
        6,
        6,
        6,
        4,
        3,
        5,
        5,
        5,
        5
      ],
      [
        6,
        6,
        8,
        6,
        7,
        7,
        5,
        5,
        5,
        5
      ],
      [
        6,
        6,
        8,
        8,
        7,
        7,
        7,
        5,
        9,
        5
      ],
      [
        8,
        8,
        8,
        8,
        7,
        7,
        7,
        7,
        9,
        9
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 6
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 7
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 8
      },
      {
        "row": 6,
        "col": 1
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 9,
        "col": 9
      }
    ]
  },
  {
    "id": "level-45",
    "levelNumber": 45,
    "name": "Feline Dynasty #45",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        2
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        2
      ],
      [
        0,
        3,
        0,
        1,
        1,
        2,
        2,
        2,
        2,
        2
      ],
      [
        3,
        3,
        5,
        1,
        1,
        2,
        2,
        2,
        4,
        4
      ],
      [
        3,
        5,
        5,
        1,
        1,
        4,
        4,
        4,
        4,
        4
      ],
      [
        3,
        5,
        5,
        5,
        5,
        4,
        6,
        6,
        6,
        6
      ],
      [
        3,
        3,
        7,
        5,
        7,
        6,
        6,
        8,
        8,
        6
      ],
      [
        7,
        7,
        7,
        7,
        7,
        9,
        8,
        8,
        8,
        6
      ],
      [
        7,
        7,
        7,
        7,
        7,
        9,
        9,
        8,
        8,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 9
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 6,
        "col": 6
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 7
      },
      {
        "row": 9,
        "col": 5
      }
    ]
  },
  {
    "id": "level-46",
    "levelNumber": 46,
    "name": "Feline Dynasty #46",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        2,
        0
      ],
      [
        3,
        3,
        3,
        3,
        1,
        1,
        0,
        0,
        2,
        2
      ],
      [
        3,
        4,
        3,
        3,
        3,
        3,
        2,
        2,
        2,
        2
      ],
      [
        4,
        4,
        4,
        5,
        3,
        5,
        5,
        5,
        5,
        2
      ],
      [
        4,
        4,
        4,
        5,
        5,
        5,
        6,
        6,
        6,
        6
      ],
      [
        4,
        8,
        4,
        7,
        7,
        7,
        6,
        6,
        6,
        6
      ],
      [
        4,
        8,
        8,
        8,
        7,
        7,
        6,
        9,
        9,
        9
      ],
      [
        8,
        8,
        8,
        7,
        7,
        7,
        9,
        9,
        9,
        9
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 9
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 6,
        "col": 7
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 2
      },
      {
        "row": 9,
        "col": 6
      }
    ]
  },
  {
    "id": "level-47",
    "levelNumber": 47,
    "name": "Feline Dynasty #47",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        2,
        1,
        1
      ],
      [
        0,
        0,
        0,
        2,
        2,
        2,
        2,
        2,
        5,
        5
      ],
      [
        3,
        0,
        0,
        0,
        2,
        2,
        2,
        2,
        5,
        5
      ],
      [
        3,
        0,
        0,
        0,
        4,
        2,
        4,
        2,
        5,
        5
      ],
      [
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5
      ],
      [
        8,
        3,
        3,
        3,
        4,
        4,
        7,
        5,
        6,
        6
      ],
      [
        8,
        3,
        3,
        3,
        7,
        7,
        7,
        9,
        9,
        6
      ],
      [
        8,
        8,
        7,
        7,
        7,
        9,
        9,
        9,
        6,
        6
      ],
      [
        8,
        8,
        8,
        8,
        7,
        7,
        9,
        9,
        6,
        6
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 8
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 6,
        "col": 9
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 8,
        "col": 1
      },
      {
        "row": 9,
        "col": 6
      }
    ]
  },
  {
    "id": "level-48",
    "levelNumber": 48,
    "name": "Feline Dynasty #48",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        0,
        1,
        2,
        2,
        2,
        3,
        3
      ],
      [
        0,
        0,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3
      ],
      [
        0,
        0,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        3
      ],
      [
        0,
        0,
        1,
        1,
        4,
        2,
        2,
        3,
        3,
        3
      ],
      [
        5,
        0,
        4,
        4,
        4,
        2,
        3,
        3,
        3,
        3
      ],
      [
        5,
        5,
        5,
        4,
        4,
        4,
        3,
        3,
        7,
        3
      ],
      [
        5,
        5,
        4,
        4,
        4,
        6,
        6,
        6,
        7,
        3
      ],
      [
        5,
        5,
        4,
        6,
        6,
        6,
        8,
        7,
        7,
        7
      ],
      [
        5,
        5,
        6,
        6,
        6,
        6,
        8,
        8,
        7,
        7
      ],
      [
        5,
        5,
        6,
        6,
        8,
        8,
        8,
        8,
        9,
        7
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 7
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 1
      },
      {
        "row": 6,
        "col": 5
      },
      {
        "row": 7,
        "col": 9
      },
      {
        "row": 8,
        "col": 6
      },
      {
        "row": 9,
        "col": 8
      }
    ]
  },
  {
    "id": "level-49",
    "levelNumber": 49,
    "name": "Feline Dynasty #49",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        2
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        2,
        1
      ],
      [
        0,
        3,
        0,
        0,
        2,
        2,
        2,
        2,
        1,
        1
      ],
      [
        3,
        3,
        3,
        4,
        4,
        6,
        2,
        2,
        1,
        5
      ],
      [
        3,
        3,
        4,
        4,
        4,
        6,
        6,
        5,
        5,
        5
      ],
      [
        3,
        9,
        4,
        4,
        6,
        6,
        5,
        5,
        5,
        7
      ],
      [
        3,
        9,
        4,
        6,
        6,
        7,
        7,
        7,
        7,
        7
      ],
      [
        3,
        9,
        4,
        9,
        6,
        7,
        8,
        8,
        7,
        7
      ],
      [
        3,
        9,
        9,
        9,
        6,
        6,
        8,
        8,
        8,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 9
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 8
      },
      {
        "row": 8,
        "col": 6
      },
      {
        "row": 9,
        "col": 2
      }
    ]
  },
  {
    "id": "level-50",
    "levelNumber": 50,
    "name": "Feline Dynasty #50",
    "tier": "Master",
    "size": 10,
    "difficulty": "expert",
    "regions": [
      [
        2,
        2,
        2,
        3,
        0,
        0,
        3,
        1,
        1,
        1
      ],
      [
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        1
      ],
      [
        2,
        3,
        2,
        3,
        3,
        3,
        3,
        3,
        4,
        4
      ],
      [
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        4
      ],
      [
        2,
        2,
        6,
        6,
        6,
        3,
        3,
        4,
        4,
        4
      ],
      [
        2,
        2,
        6,
        5,
        6,
        3,
        3,
        3,
        4,
        4
      ],
      [
        8,
        2,
        6,
        5,
        6,
        6,
        4,
        4,
        4,
        7
      ],
      [
        8,
        5,
        5,
        5,
        5,
        6,
        4,
        4,
        7,
        7
      ],
      [
        8,
        8,
        8,
        5,
        5,
        9,
        7,
        7,
        7,
        7
      ],
      [
        8,
        8,
        8,
        9,
        9,
        9,
        9,
        9,
        9,
        9
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 9
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 5
      },
      {
        "row": 7,
        "col": 8
      },
      {
        "row": 8,
        "col": 1
      },
      {
        "row": 9,
        "col": 6
      }
    ]
  },
  {
    "id": "level-51",
    "levelNumber": 51,
    "name": "Explorer Trail #1",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[0,1,1,1,1,2,2,2],[0,1,1,1,1,1,1,2],[3,1,1,1,2,2,2,2],[3,3,4,4,4,4,4,2],[3,3,4,4,4,2,2,2],[5,5,5,4,4,4,6,6],[5,5,5,5,4,6,6,6],[5,7,7,7,6,6,6,6]],
    "solution": [{"row":0,"col":0},{"row":1,"col":5},{"row":2,"col":7},{"row":3,"col":1},{"row":4,"col":4},{"row":5,"col":2},{"row":6,"col":6},{"row":7,"col":3}]
  },
  {
    "id": "level-52",
    "levelNumber": 52,
    "name": "Explorer Trail #2",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[0,0,2,2,2,1,1,1],[0,2,2,2,2,1,1,1],[4,6,6,2,2,1,1,1],[4,6,2,2,2,1,3,3],[4,6,6,5,6,6,6,6],[4,4,6,5,5,5,5,6],[6,6,6,5,6,5,6,6],[6,6,6,6,6,6,6,7]],
    "solution": [{"row":0,"col":1},{"row":1,"col":5},{"row":2,"col":3},{"row":3,"col":6},{"row":4,"col":0},{"row":5,"col":4},{"row":6,"col":2},{"row":7,"col":7}]
  },
  {
    "id": "level-53",
    "levelNumber": 53,
    "name": "Explorer Trail #3",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[2,2,2,1,1,1,0,0],[2,2,2,2,1,1,1,0],[2,2,3,3,3,3,1,0],[2,2,2,2,4,3,1,0],[4,4,4,4,4,3,3,6],[4,5,4,4,4,4,3,6],[4,4,4,4,4,3,3,6],[7,7,7,7,7,6,6,6]],
    "solution": [{"row":0,"col":6},{"row":1,"col":4},{"row":2,"col":0},{"row":3,"col":5},{"row":4,"col":3},{"row":5,"col":1},{"row":6,"col":7},{"row":7,"col":2}]
  },
  {
    "id": "level-54",
    "levelNumber": 54,
    "name": "Explorer Trail #4",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[0,0,0,7,7,7,7,1],[0,0,0,7,1,1,1,1],[0,7,7,7,2,2,2,1],[5,5,5,7,2,4,2,3],[5,5,5,7,4,4,4,3],[5,5,5,7,4,7,4,4],[6,5,5,7,4,7,4,4],[7,7,7,7,7,7,4,4]],
    "solution": [{"row":0,"col":1},{"row":1,"col":6},{"row":2,"col":4},{"row":3,"col":7},{"row":4,"col":5},{"row":5,"col":2},{"row":6,"col":0},{"row":7,"col":3}]
  },
  {
    "id": "level-55",
    "levelNumber": 55,
    "name": "Explorer Trail #5",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[1,1,1,0,0,0,6,6],[1,1,6,6,6,0,6,6],[4,1,1,2,6,6,6,6],[4,4,2,2,2,2,6,3],[6,4,2,2,2,5,6,7],[6,4,2,2,2,5,6,7],[6,6,6,6,6,6,6,7],[6,6,6,7,7,7,7,7]],
    "solution": [{"row":0,"col":4},{"row":1,"col":0},{"row":2,"col":3},{"row":3,"col":7},{"row":4,"col":1},{"row":5,"col":5},{"row":6,"col":2},{"row":7,"col":6}]
  },
  {
    "id": "level-56",
    "levelNumber": 56,
    "name": "Explorer Trail #6",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[2,2,2,2,2,0,0,0],[2,2,2,2,1,1,1,0],[2,2,2,2,2,3,1,1],[2,2,2,2,2,3,1,1],[4,2,5,5,5,3,3,1],[6,6,6,5,3,3,3,1],[6,6,6,5,3,3,3,1],[6,6,6,6,6,7,7,1]],
    "solution": [{"row":0,"col":7},{"row":1,"col":4},{"row":2,"col":2},{"row":3,"col":5},{"row":4,"col":0},{"row":5,"col":3},{"row":6,"col":1},{"row":7,"col":6}]
  },
  {
    "id": "level-57",
    "levelNumber": 57,
    "name": "Explorer Trail #7",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[5,0,0,0,0,0,0,0],[5,5,5,1,1,1,1,0],[5,5,1,1,1,2,2,0],[5,5,5,3,4,2,0,0],[5,5,5,5,4,4,0,6],[5,5,4,4,4,0,0,6],[7,7,4,4,4,0,6,6],[7,0,0,0,0,0,6,6]],
    "solution": [{"row":0,"col":2},{"row":1,"col":4},{"row":2,"col":6},{"row":3,"col":3},{"row":4,"col":5},{"row":5,"col":1},{"row":6,"col":7},{"row":7,"col":0}]
  },
  {
    "id": "level-58",
    "levelNumber": 58,
    "name": "Explorer Trail #8",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[1,1,1,0,0,0,0,0],[1,3,1,1,0,0,2,6],[1,3,3,1,1,2,2,6],[1,1,3,3,1,2,4,6],[5,5,5,5,6,6,4,6],[5,5,5,5,5,6,4,6],[5,5,5,5,5,6,6,6],[7,5,5,5,5,5,5,5]],
    "solution": [{"row":0,"col":4},{"row":1,"col":2},{"row":2,"col":5},{"row":3,"col":3},{"row":4,"col":6},{"row":5,"col":1},{"row":6,"col":7},{"row":7,"col":0}]
  },
  {
    "id": "level-59",
    "levelNumber": 59,
    "name": "Explorer Trail #9",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[7,7,0,0,0,0,0,7],[1,7,0,0,0,7,7,7],[1,7,7,7,7,7,2,7],[5,5,4,3,4,4,4,7],[5,5,4,4,4,4,4,7],[5,5,5,4,6,4,4,7],[5,5,5,4,6,6,6,7],[5,7,7,7,7,7,7,7]],
    "solution": [{"row":0,"col":2},{"row":1,"col":0},{"row":2,"col":6},{"row":3,"col":3},{"row":4,"col":5},{"row":5,"col":1},{"row":6,"col":4},{"row":7,"col":7}]
  },
  {
    "id": "level-60",
    "levelNumber": 60,
    "name": "Explorer Trail #10",
    "tier": "Explorer",
    "size": 8,
    "difficulty": "hard",
    "regions": [[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,2],[3,3,5,0,0,0,4,2],[3,6,5,0,0,0,4,2],[3,6,5,5,5,4,4,4],[3,6,5,5,5,7,7,7],[3,6,6,5,5,7,7,7],[6,6,5,5,5,7,7,7]],
    "solution": [{"row":0,"col":3},{"row":1,"col":1},{"row":2,"col":7},{"row":3,"col":0},{"row":4,"col":6},{"row":5,"col":4},{"row":6,"col":2},{"row":7,"col":5}]
  },
  {
    "id": "level-61",
    "levelNumber": 61,
    "name": "Adventurer Path #1",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[0,0,0,0,0,0,0,0,0],[1,1,1,0,0,3,3,3,3],[2,2,1,1,0,3,3,3,3],[5,5,5,5,0,3,3,3,3],[5,5,5,5,0,6,3,4,7],[5,5,5,5,5,6,6,6,7],[5,5,5,5,5,6,6,7,7],[5,5,5,5,5,8,7,7,7],[5,5,8,8,8,8,7,7,7]],
    "solution": [{"row":0,"col":4},{"row":1,"col":2},{"row":2,"col":0},{"row":3,"col":5},{"row":4,"col":7},{"row":5,"col":1},{"row":6,"col":6},{"row":7,"col":8},{"row":8,"col":3}]
  },
  {
    "id": "level-62",
    "levelNumber": 62,
    "name": "Adventurer Path #2",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[0,0,0,0,1,1,1,4,4],[0,6,6,0,0,1,1,4,4],[2,6,0,0,0,0,3,4,4],[2,6,6,3,3,3,3,4,4],[5,5,6,6,6,6,6,6,4],[5,5,6,6,7,7,7,6,4],[5,5,5,6,7,7,7,6,6],[5,6,6,6,7,7,8,6,6],[5,5,7,7,7,7,8,6,6]],
    "solution": [{"row":0,"col":2},{"row":1,"col":5},{"row":2,"col":0},{"row":3,"col":3},{"row":4,"col":8},{"row":5,"col":1},{"row":6,"col":7},{"row":7,"col":4},{"row":8,"col":6}]
  },
  {
    "id": "level-63",
    "levelNumber": 63,
    "name": "Adventurer Path #3",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[4,4,4,4,4,4,4,4,0],[4,2,2,5,5,1,1,4,0],[4,2,5,5,5,1,1,4,4],[4,5,5,5,3,3,3,3,4],[4,5,5,5,3,3,4,4,4],[4,6,5,5,5,3,3,3,4],[6,6,5,6,4,4,4,4,4],[6,6,7,6,4,8,8,8,8],[6,6,6,6,4,4,4,8,8]],
    "solution": [{"row":0,"col":8},{"row":1,"col":5},{"row":2,"col":1},{"row":3,"col":4},{"row":4,"col":6},{"row":5,"col":3},{"row":6,"col":0},{"row":7,"col":2},{"row":8,"col":7}]
  },
  {
    "id": "level-64",
    "levelNumber": 64,
    "name": "Adventurer Path #4",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[0,0,0,0,0,0,0,0,0],[1,1,1,0,3,3,2,6,6],[1,1,1,0,3,3,2,2,6],[0,0,0,0,0,3,3,6,6],[7,7,7,4,0,3,3,6,6],[7,7,7,4,0,5,5,6,6],[7,7,7,4,0,5,6,6,6],[7,7,7,7,0,5,6,6,0],[8,8,7,7,0,0,0,0,0]],
    "solution": [{"row":0,"col":4},{"row":1,"col":1},{"row":2,"col":7},{"row":3,"col":5},{"row":4,"col":3},{"row":5,"col":6},{"row":6,"col":8},{"row":7,"col":2},{"row":8,"col":0}]
  },
  {
    "id": "level-65",
    "levelNumber": 65,
    "name": "Adventurer Path #5",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[4,4,4,2,0,0,0,1,1],[4,4,4,2,0,2,0,1,1],[4,4,4,2,2,2,2,1,1],[4,4,4,4,4,4,2,3,1],[5,5,4,4,4,2,2,7,1],[6,5,5,2,2,2,7,7,1],[6,6,6,2,7,7,7,7,7],[8,8,8,2,2,2,7,7,7],[8,8,8,7,7,7,7,7,7]],
    "solution": [{"row":0,"col":5},{"row":1,"col":8},{"row":2,"col":3},{"row":3,"col":7},{"row":4,"col":4},{"row":5,"col":2},{"row":6,"col":0},{"row":7,"col":6},{"row":8,"col":1}]
  },
  {
    "id": "level-66",
    "levelNumber": 66,
    "name": "Adventurer Path #6",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[0,0,0,0,0,0,3,3,1],[0,0,0,0,0,0,3,1,1],[2,2,0,0,0,3,3,1,1],[3,3,3,3,3,3,1,1,1],[3,6,6,5,5,3,4,4,1],[3,6,6,5,5,3,7,1,1],[3,8,6,6,6,3,7,7,7],[3,8,6,8,8,3,3,3,7],[3,8,8,8,7,7,7,7,7]],
    "solution": [{"row":0,"col":5},{"row":1,"col":7},{"row":2,"col":0},{"row":3,"col":3},{"row":4,"col":6},{"row":5,"col":4},{"row":6,"col":2},{"row":7,"col":8},{"row":8,"col":1}]
  },
  {
    "id": "level-67",
    "levelNumber": 67,
    "name": "Adventurer Path #7",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[1,1,2,2,0,0,0,0,4],[1,2,2,2,2,0,4,4,4],[2,2,2,2,2,0,4,3,3],[2,2,2,4,4,4,4,3,3],[2,4,4,4,5,4,5,3,3],[2,2,2,5,5,5,5,3,3],[2,2,2,6,6,5,7,7,3],[2,2,2,8,5,5,7,3,3],[2,2,2,8,8,8,7,7,7]],
    "solution": [{"row":0,"col":7},{"row":1,"col":0},{"row":2,"col":2},{"row":3,"col":8},{"row":4,"col":1},{"row":5,"col":5},{"row":6,"col":3},{"row":7,"col":6},{"row":8,"col":4}]
  },
  {
    "id": "level-68",
    "levelNumber": 68,
    "name": "Adventurer Path #8",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[2,2,2,2,2,2,2,0,0],[2,2,2,1,1,1,2,0,0],[2,7,2,2,7,7,7,0,7],[4,7,2,7,7,3,7,0,7],[4,7,7,7,5,5,7,7,7],[4,7,5,5,5,5,5,5,7],[4,7,5,5,5,6,6,6,7],[5,7,5,5,5,8,8,8,7],[5,5,5,5,5,8,8,7,7]],
    "solution": [{"row":0,"col":8},{"row":1,"col":4},{"row":2,"col":2},{"row":3,"col":5},{"row":4,"col":0},{"row":5,"col":3},{"row":6,"col":7},{"row":7,"col":1},{"row":8,"col":6}]
  },
  {
    "id": "level-69",
    "levelNumber": 69,
    "name": "Adventurer Path #9",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[2,2,2,0,0,8,8,8,8],[2,2,2,0,0,0,4,8,1],[2,2,2,2,4,4,4,8,8],[2,2,3,4,4,4,4,4,8],[4,4,4,4,4,4,6,6,8],[4,5,5,7,6,6,6,6,8],[4,4,4,7,6,6,6,8,8],[4,7,7,7,6,6,6,6,8],[4,4,7,7,7,6,8,8,8]],
    "solution": [{"row":0,"col":4},{"row":1,"col":8},{"row":2,"col":0},{"row":3,"col":2},{"row":4,"col":5},{"row":5,"col":1},{"row":6,"col":6},{"row":7,"col":3},{"row":8,"col":7}]
  },
  {
    "id": "level-70",
    "levelNumber": 70,
    "name": "Adventurer Path #10",
    "tier": "Adventurer",
    "size": 9,
    "difficulty": "hard",
    "regions": [[3,3,3,3,3,3,0,0,0],[3,1,1,1,1,0,0,0,0],[3,3,3,1,2,2,2,0,0],[3,5,3,3,3,6,6,0,0],[3,5,6,6,3,6,6,0,4],[3,5,5,6,6,6,6,4,4],[3,6,6,6,6,6,4,4,4],[3,7,6,6,6,6,4,4,4],[7,7,7,7,6,6,6,8,8]],
    "solution": [{"row":0,"col":6},{"row":1,"col":3},{"row":2,"col":5},{"row":3,"col":0},{"row":4,"col":8},{"row":5,"col":2},{"row":6,"col":4},{"row":7,"col":1},{"row":8,"col":7}]
  },
  {
    "id": "level-71",
    "levelNumber": 71,
    "name": "Champion Arena #1",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[0,0,0,2,2,1,1,1,1,1],[0,0,2,2,2,1,1,1,1,1],[4,4,4,4,2,1,1,1,4,1],[4,6,6,4,2,1,1,1,4,3],[4,4,6,4,4,4,4,1,4,3],[5,4,6,6,6,6,4,4,4,3],[8,4,4,4,6,6,6,6,4,3],[8,8,8,6,6,6,7,7,4,4],[8,8,6,6,6,6,9,9,9,4],[8,8,6,6,9,9,9,9,4,4]],
    "solution": [{"row":0,"col":2},{"row":1,"col":8},{"row":2,"col":4},{"row":3,"col":9},{"row":4,"col":3},{"row":5,"col":0},{"row":6,"col":5},{"row":7,"col":7},{"row":8,"col":1},{"row":9,"col":6}]
  },
  {
    "id": "level-72",
    "levelNumber": 72,
    "name": "Champion Arena #2",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[4,4,4,0,2,2,1,1,3,3],[4,4,7,7,2,2,1,1,1,3],[4,4,7,2,2,2,1,1,3,3],[4,4,7,5,2,2,1,3,3,3],[4,7,7,5,5,7,7,7,3,3],[4,4,7,5,5,5,5,7,3,6],[4,4,7,5,5,5,5,7,6,6],[9,7,7,7,5,7,5,7,8,8],[9,9,9,7,5,7,5,7,7,8],[9,9,7,7,7,7,7,7,8,8]],
    "solution": [{"row":0,"col":3},{"row":1,"col":6},{"row":2,"col":4},{"row":3,"col":7},{"row":4,"col":0},{"row":5,"col":5},{"row":6,"col":8},{"row":7,"col":2},{"row":8,"col":9},{"row":9,"col":1}]
  },
  {
    "id": "level-73",
    "levelNumber": 73,
    "name": "Champion Arena #3",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[3,3,3,3,3,3,0,0,0,1],[3,1,1,1,1,1,1,1,1,1],[3,3,1,3,4,4,4,2,2,1],[3,3,3,3,4,4,4,2,2,1],[4,4,4,4,4,6,5,5,5,1],[4,4,4,8,4,6,6,5,5,1],[7,9,8,8,6,6,6,5,5,1],[7,9,8,8,6,1,6,5,5,1],[9,9,9,8,6,1,6,6,5,1],[9,9,9,8,6,1,1,1,1,1]],
    "solution": [{"row":0,"col":6},{"row":1,"col":9},{"row":2,"col":7},{"row":3,"col":2},{"row":4,"col":4},{"row":5,"col":8},{"row":6,"col":5},{"row":7,"col":0},{"row":8,"col":3},{"row":9,"col":1}]
  },
  {
    "id": "level-74",
    "levelNumber": 74,
    "name": "Champion Arena #4",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,9],[2,1,1,1,1,9,9,9,9,9],[2,2,2,1,1,9,4,3,3,6],[2,5,2,1,1,9,4,4,4,6],[5,5,2,2,9,9,6,6,6,6],[5,5,5,8,9,6,6,6,6,6],[5,5,8,8,9,7,7,6,6,6],[8,8,8,8,9,9,7,9,6,6],[8,8,8,8,9,9,9,9,6,6]],
    "solution": [{"row":0,"col":9},{"row":1,"col":3},{"row":2,"col":0},{"row":3,"col":8},{"row":4,"col":6},{"row":5,"col":1},{"row":6,"col":7},{"row":7,"col":5},{"row":8,"col":2},{"row":9,"col":4}]
  },
  {
    "id": "level-75",
    "levelNumber": 75,
    "name": "Champion Arena #5",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[3,1,2,2,2,2,2,2,0,0],[3,1,1,1,2,2,2,2,0,1],[3,1,3,1,2,2,2,2,0,1],[3,1,3,1,1,2,2,2,0,1],[3,3,3,3,1,2,4,1,1,1],[5,3,1,1,1,1,1,1,8,1],[5,1,1,7,7,6,6,8,8,1],[5,1,7,7,7,7,9,8,8,1],[7,1,7,7,7,9,9,8,8,1],[7,7,7,9,9,9,9,8,8,8]],
    "solution": [{"row":0,"col":9},{"row":1,"col":1},{"row":2,"col":7},{"row":3,"col":2},{"row":4,"col":6},{"row":5,"col":0},{"row":6,"col":5},{"row":7,"col":3},{"row":8,"col":8},{"row":9,"col":4}]
  },
  {
    "id": "level-76",
    "levelNumber": 76,
    "name": "Champion Arena #6",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[1,1,1,1,2,2,0,0,0,8],[8,8,1,1,2,2,2,0,2,8],[8,8,8,8,2,2,2,2,2,8],[8,3,3,8,2,2,8,8,8,8],[3,3,3,8,8,8,8,4,4,8],[3,3,8,8,7,7,7,4,5,5],[3,3,8,6,7,7,7,5,5,5],[3,3,8,7,7,7,8,8,5,8],[3,9,8,8,8,8,8,8,8,8],[9,9,9,9,9,9,9,9,9,9]],
    "solution": [{"row":0,"col":6},{"row":1,"col":2},{"row":2,"col":4},{"row":3,"col":1},{"row":4,"col":7},{"row":5,"col":9},{"row":6,"col":3},{"row":7,"col":5},{"row":8,"col":8},{"row":9,"col":0}]
  },
  {
    "id": "level-77",
    "levelNumber": 77,
    "name": "Champion Arena #7",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[1,1,1,1,1,1,0,0,0,0],[3,3,1,1,1,1,0,0,0,0],[3,3,3,3,3,3,3,2,0,0],[5,5,3,3,3,3,6,6,6,6],[5,3,3,3,4,4,6,6,6,6],[5,5,5,5,5,6,6,6,6,6],[5,5,7,7,5,5,5,8,6,6],[5,7,7,7,7,7,8,8,8,6],[5,7,9,7,6,6,6,8,8,6],[5,7,9,7,6,6,6,6,6,6]],
    "solution": [{"row":0,"col":6},{"row":1,"col":4},{"row":2,"col":7},{"row":3,"col":3},{"row":4,"col":5},{"row":5,"col":0},{"row":6,"col":9},{"row":7,"col":1},{"row":8,"col":8},{"row":9,"col":2}]
  },
  {
    "id": "level-78",
    "levelNumber": 78,
    "name": "Champion Arena #8",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[0,0,0,0,0,0,0,0,2,2],[1,3,3,3,5,5,0,2,2,2],[3,3,3,3,3,5,0,2,2,2],[3,3,3,5,5,5,0,0,2,2],[6,6,6,0,0,5,4,0,2,7],[6,6,6,0,5,5,4,0,7,7],[6,6,0,0,0,0,0,0,7,7],[8,8,0,8,8,8,8,8,7,8],[8,8,0,0,8,8,8,8,8,8],[8,8,8,8,8,8,8,8,8,9]],
    "solution": [{"row":0,"col":3},{"row":1,"col":0},{"row":2,"col":7},{"row":3,"col":2},{"row":4,"col":6},{"row":5,"col":4},{"row":6,"col":1},{"row":7,"col":8},{"row":8,"col":5},{"row":9,"col":9}]
  },
  {
    "id": "level-79",
    "levelNumber": 79,
    "name": "Champion Arena #9",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[5,5,5,0,0,0,1,4,4,2],[5,5,5,1,1,1,1,4,4,2],[5,5,5,5,1,1,1,4,7,2],[5,5,5,5,5,3,4,4,7,2],[5,5,7,7,7,7,4,4,7,2],[5,5,7,6,6,7,4,7,7,9],[7,7,7,6,9,7,4,7,9,9],[7,8,8,6,9,7,7,7,7,9],[8,8,8,6,9,9,9,9,7,9],[8,8,8,6,9,9,9,9,9,9]],
    "solution": [{"row":0,"col":4},{"row":1,"col":6},{"row":2,"col":9},{"row":3,"col":5},{"row":4,"col":7},{"row":5,"col":1},{"row":6,"col":3},{"row":7,"col":0},{"row":8,"col":2},{"row":9,"col":8}]
  },
  {
    "id": "level-80",
    "levelNumber": 80,
    "name": "Champion Arena #10",
    "tier": "Champion",
    "size": 10,
    "difficulty": "expert",
    "regions": [[0,0,0,3,3,3,3,3,3,1],[0,0,0,3,3,3,1,1,3,1],[0,0,2,3,1,1,1,1,1,1],[5,5,5,3,3,3,3,3,3,1],[5,5,5,6,6,4,4,4,6,7],[8,5,5,6,6,6,4,4,6,7],[8,5,8,6,6,6,6,6,6,7],[8,8,8,6,6,6,6,6,6,7],[8,8,8,8,6,6,6,6,6,7],[8,8,8,8,6,6,6,9,7,7]],
    "solution": [{"row":0,"col":0},{"row":1,"col":6},{"row":2,"col":2},{"row":3,"col":8},{"row":4,"col":5},{"row":5,"col":1},{"row":6,"col":4},{"row":7,"col":9},{"row":8,"col":3},{"row":9,"col":7}]
  },
  {
    "id": "level-81",
    "levelNumber": 81,
    "name": "Legend Quest #1",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[3,3,3,1,1,1,1,1,1,0,0],[3,3,3,1,9,1,1,9,9,0,9],[3,3,2,2,9,1,1,1,9,0,9],[3,3,3,3,9,9,9,9,9,9,9],[3,3,6,6,6,5,5,5,5,4,9],[3,6,6,6,5,5,5,5,5,5,9],[3,6,6,6,5,5,5,9,9,5,9],[3,7,7,6,6,9,9,9,9,5,9],[3,7,6,6,6,9,8,8,9,5,9],[10,10,10,10,9,9,10,10,9,5,9],[10,10,10,10,10,10,10,10,9,9,9]],
    "solution": [{"row":0,"col":10},{"row":1,"col":5},{"row":2,"col":2},{"row":3,"col":0},{"row":4,"col":9},{"row":5,"col":7},{"row":6,"col":3},{"row":7,"col":1},{"row":8,"col":6},{"row":9,"col":8},{"row":10,"col":4}]
  },
  {
    "id": "level-82",
    "levelNumber": 82,
    "name": "Legend Quest #2",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[9,9,9,9,9,9,9,9,9,9,0],[9,2,2,2,2,2,1,1,0,0,0],[9,9,2,2,2,5,5,1,0,0,0],[3,9,9,5,2,5,5,5,5,6,6],[3,3,9,5,5,5,5,4,6,6,6],[3,3,9,5,5,5,5,5,6,6,6],[9,9,9,7,5,9,5,5,8,6,6],[9,9,7,7,9,9,8,8,8,8,6],[9,7,7,7,9,8,8,8,8,8,8],[9,9,9,9,9,8,8,8,9,8,8],[9,9,10,10,9,9,9,9,9,8,8]],
    "solution": [{"row":0,"col":10},{"row":1,"col":6},{"row":2,"col":4},{"row":3,"col":0},{"row":4,"col":7},{"row":5,"col":5},{"row":6,"col":9},{"row":7,"col":2},{"row":8,"col":8},{"row":9,"col":1},{"row":10,"col":3}]
  },
  {
    "id": "level-83",
    "levelNumber": 83,
    "name": "Legend Quest #3",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[0,0,0,10,10,10,10,10,10,10,2],[0,0,0,10,3,3,3,1,1,2,2],[0,0,0,10,3,3,3,2,2,2,2],[0,0,0,10,3,10,10,10,10,2,2],[0,0,0,10,10,10,7,2,2,2,4],[5,5,5,10,7,7,7,7,2,2,4],[5,6,6,10,7,7,7,9,8,8,4],[10,10,10,10,7,7,9,9,8,8,8],[10,10,10,10,7,9,9,9,8,8,8],[10,10,10,10,9,9,9,9,8,8,8],[10,10,10,10,10,10,10,10,10,8,8]],
    "solution": [{"row":0,"col":1},{"row":1,"col":7},{"row":2,"col":9},{"row":3,"col":4},{"row":4,"col":10},{"row":5,"col":0},{"row":6,"col":2},{"row":7,"col":5},{"row":8,"col":8},{"row":9,"col":6},{"row":10,"col":3}]
  },
  {
    "id": "level-84",
    "levelNumber": 84,
    "name": "Legend Quest #4",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[1,1,1,1,1,1,0,0,0,6,6],[1,2,2,2,2,1,1,1,1,1,6],[1,1,1,2,2,2,2,1,2,1,6],[4,5,1,1,3,2,2,2,2,1,6],[4,5,5,1,1,1,2,6,1,1,6],[5,5,5,5,5,1,6,6,1,6,6],[5,5,5,5,5,1,1,6,6,6,6],[8,5,8,5,8,7,1,1,6,6,6],[8,8,8,8,8,7,7,1,6,6,6],[8,8,9,9,9,7,7,1,10,10,10],[8,8,8,8,8,8,8,1,1,1,10]],
    "solution": [{"row":0,"col":7},{"row":1,"col":9},{"row":2,"col":6},{"row":3,"col":4},{"row":4,"col":0},{"row":5,"col":2},{"row":6,"col":8},{"row":7,"col":5},{"row":8,"col":1},{"row":9,"col":3},{"row":10,"col":10}]
  },
  {
    "id": "level-85",
    "levelNumber": 85,
    "name": "Legend Quest #5",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[5,5,5,5,5,0,0,1,1,1,1],[5,3,3,3,0,0,0,1,1,1,1],[5,3,3,3,3,2,0,0,4,1,1],[5,3,3,3,3,0,0,0,4,4,4],[5,5,5,5,5,7,7,4,4,4,5],[5,6,6,6,5,7,7,7,7,7,5],[6,6,6,6,5,7,7,7,7,7,5],[5,6,5,5,5,7,7,7,7,7,5],[5,5,5,10,5,5,5,7,7,8,5],[5,9,9,10,10,10,5,7,8,8,5],[5,10,10,10,5,5,5,5,5,5,5]],
    "solution": [{"row":0,"col":6},{"row":1,"col":10},{"row":2,"col":5},{"row":3,"col":2},{"row":4,"col":8},{"row":5,"col":4},{"row":6,"col":0},{"row":7,"col":7},{"row":8,"col":9},{"row":9,"col":1},{"row":10,"col":3}]
  },
  {
    "id": "level-86",
    "levelNumber": 86,
    "name": "Legend Quest #6",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[0,0,0,3,3,3,3,4,4,4,4],[0,0,0,3,3,3,3,4,1,1,1],[0,3,3,3,3,3,3,4,2,1,1],[3,3,3,4,4,3,3,4,4,1,4],[3,3,3,4,3,3,5,5,4,4,4],[3,3,3,4,6,3,5,5,7,7,4],[3,3,3,4,6,5,5,7,7,7,4],[9,8,8,4,6,6,5,7,7,7,4],[9,8,8,4,6,6,6,6,7,4,4],[9,8,4,4,6,6,6,4,4,4,10],[9,8,8,4,4,4,4,4,10,10,10]],
    "solution": [{"row":0,"col":1},{"row":1,"col":10},{"row":2,"col":8},{"row":3,"col":5},{"row":4,"col":3},{"row":5,"col":6},{"row":6,"col":4},{"row":7,"col":7},{"row":8,"col":2},{"row":9,"col":0},{"row":10,"col":9}]
  },
  {
    "id": "level-87",
    "levelNumber": 87,
    "name": "Legend Quest #7",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[9,9,9,0,0,0,0,0,0,0,0],[9,4,9,9,1,0,0,0,0,0,0],[9,4,4,9,1,0,0,0,2,2,2],[9,4,4,9,4,4,3,5,5,2,2],[9,4,4,4,4,4,3,5,5,5,5],[9,9,9,9,4,4,9,9,5,5,5],[7,7,7,9,4,4,9,5,5,6,6],[7,7,7,9,4,9,9,5,5,5,5],[7,7,8,9,9,9,5,5,5,5,5],[7,7,7,7,7,9,5,5,5,5,5],[10,10,10,7,7,9,9,9,9,5,5]],
    "solution": [{"row":0,"col":7},{"row":1,"col":4},{"row":2,"col":9},{"row":3,"col":6},{"row":4,"col":3},{"row":5,"col":8},{"row":6,"col":10},{"row":7,"col":0},{"row":8,"col":2},{"row":9,"col":5},{"row":10,"col":1}]
  },
  {
    "id": "level-88",
    "levelNumber": 88,
    "name": "Legend Quest #8",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[2,2,2,2,0,0,0,0,0,0,1],[2,2,2,2,0,5,5,0,0,0,1],[0,0,2,2,0,5,5,0,0,0,4],[0,2,2,2,0,3,5,5,5,4,4],[0,0,2,2,0,5,5,5,4,4,4],[7,0,0,0,0,5,5,5,5,5,4],[7,6,6,0,5,5,5,5,5,5,4],[7,0,0,0,0,5,5,8,8,8,8],[0,0,9,9,0,10,8,8,8,8,8],[0,9,9,9,0,10,10,8,8,8,8],[0,0,9,9,0,10,10,8,8,8,8]],
    "solution": [{"row":0,"col":4},{"row":1,"col":10},{"row":2,"col":3},{"row":3,"col":5},{"row":4,"col":9},{"row":5,"col":7},{"row":6,"col":2},{"row":7,"col":0},{"row":8,"col":8},{"row":9,"col":1},{"row":10,"col":6}]
  },
  {
    "id": "level-89",
    "levelNumber": 89,
    "name": "Legend Quest #9",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[1,1,1,1,1,1,1,1,1,0,0],[5,5,1,2,1,1,2,2,2,0,2],[5,5,5,2,2,2,2,4,2,2,2],[5,3,3,3,2,4,4,4,4,4,2],[5,5,2,2,2,4,4,4,4,4,2],[5,5,2,6,6,6,4,4,4,4,2],[2,5,2,6,6,6,6,7,7,7,2],[2,5,2,2,6,2,2,7,7,8,2],[2,2,2,2,2,2,2,8,8,8,2],[2,2,9,9,9,8,8,8,8,8,8],[9,9,9,10,10,8,8,8,8,8,8]],
    "solution": [{"row":0,"col":10},{"row":1,"col":5},{"row":2,"col":8},{"row":3,"col":1},{"row":4,"col":6},{"row":5,"col":0},{"row":6,"col":3},{"row":7,"col":7},{"row":8,"col":9},{"row":9,"col":2},{"row":10,"col":4}]
  },
  {
    "id": "level-90",
    "levelNumber": 90,
    "name": "Legend Quest #10",
    "tier": "Legend",
    "size": 11,
    "difficulty": "expert",
    "regions": [[2,2,2,2,5,5,0,1,1,1,1],[2,2,2,2,3,5,5,5,1,6,1],[2,2,3,3,3,5,5,5,5,6,6],[4,2,3,3,3,5,5,5,5,5,6],[4,2,3,3,3,5,5,5,5,5,6],[7,7,7,7,5,5,5,5,6,6,6],[7,7,7,7,5,6,5,6,6,8,8],[7,7,7,7,7,6,6,6,8,8,8],[7,7,7,7,7,9,9,8,8,8,8],[7,7,7,7,10,10,9,9,8,8,8],[7,7,7,7,10,9,9,8,8,8,8]],
    "solution": [{"row":0,"col":6},{"row":1,"col":10},{"row":2,"col":1},{"row":3,"col":3},{"row":4,"col":0},{"row":5,"col":5},{"row":6,"col":8},{"row":7,"col":2},{"row":8,"col":9},{"row":9,"col":7},{"row":10,"col":4}]
  },
  {
    "id": "level-91",
    "levelNumber": 91,
    "name": "Grandmaster Trial #1",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[2,2,2,2,0,0,0,0,0,0,0,11],[2,2,11,11,11,11,1,0,0,0,0,11],[11,2,11,4,4,11,0,0,0,3,3,11],[11,11,11,4,4,11,11,11,0,3,5,11],[4,4,11,4,11,11,4,11,5,5,5,11],[4,4,4,4,4,4,4,11,11,11,5,11],[7,7,7,6,6,8,4,11,5,5,5,11],[7,7,6,6,6,8,8,11,11,5,5,11],[7,7,6,6,8,8,8,8,11,11,11,11],[7,7,9,9,8,8,8,8,10,10,10,11],[7,9,9,9,9,9,10,10,10,10,10,11],[11,11,11,11,11,11,11,11,11,11,11,11]],
    "solution": [{"row":0,"col":8},{"row":1,"col":6},{"row":2,"col":1},{"row":3,"col":9},{"row":4,"col":3},{"row":5,"col":10},{"row":6,"col":4},{"row":7,"col":0},{"row":8,"col":5},{"row":9,"col":2},{"row":10,"col":7},{"row":11,"col":11}]
  },
  {
    "id": "level-92",
    "levelNumber": 92,
    "name": "Grandmaster Trial #2",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[2,2,2,2,2,2,2,2,0,0,0,5],[2,2,2,2,3,1,1,0,0,0,0,5],[2,2,2,2,3,1,1,3,3,0,0,5],[2,2,2,2,3,3,3,3,3,0,3,5],[2,4,2,2,3,3,3,3,3,3,3,5],[2,2,2,10,5,5,5,5,3,5,5,5],[7,7,10,10,5,8,6,5,5,5,9,5],[7,7,10,10,5,8,6,8,8,9,9,5],[10,10,10,10,5,8,8,8,8,9,9,5],[10,10,10,10,5,8,8,11,11,11,9,5],[10,10,10,10,5,8,8,5,5,11,9,5],[10,10,10,10,5,5,5,5,5,11,11,5]],
    "solution": [{"row":0,"col":8},{"row":1,"col":5},{"row":2,"col":2},{"row":3,"col":4},{"row":4,"col":1},{"row":5,"col":11},{"row":6,"col":6},{"row":7,"col":0},{"row":8,"col":7},{"row":9,"col":10},{"row":10,"col":3},{"row":11,"col":9}]
  },
  {
    "id": "level-93",
    "levelNumber": 93,
    "name": "Grandmaster Trial #3",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[1,1,1,2,2,2,0,0,5,5,5,5],[1,1,1,2,2,2,2,2,5,3,5,5],[10,1,4,4,2,4,4,4,3,3,5,5],[10,1,4,4,4,4,4,3,3,3,5,5],[10,1,4,4,4,10,4,6,6,3,5,7],[10,4,4,4,4,10,6,6,6,5,5,7],[10,10,10,10,10,10,6,6,6,5,5,7],[10,9,8,8,8,10,6,6,6,7,7,7],[10,9,9,8,8,10,6,6,6,6,7,10],[10,9,11,11,11,10,6,6,6,6,7,10],[10,9,11,11,11,10,6,6,7,7,7,10],[10,9,11,11,11,10,10,10,10,10,10,10]],
    "solution": [{"row":0,"col":7},{"row":1,"col":0},{"row":2,"col":4},{"row":3,"col":9},{"row":4,"col":6},{"row":5,"col":10},{"row":6,"col":8},{"row":7,"col":11},{"row":8,"col":3},{"row":9,"col":1},{"row":10,"col":5},{"row":11,"col":2}]
  },
  {
    "id": "level-94",
    "levelNumber": 94,
    "name": "Grandmaster Trial #4",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[2,2,2,2,2,2,2,0,0,0,1,1],[2,2,2,2,2,2,2,0,5,0,1,5],[2,2,2,2,2,2,2,0,5,5,5,5],[4,2,2,2,2,2,2,2,2,5,3,3],[4,2,2,2,2,2,2,2,2,5,3,5],[7,7,7,2,2,6,2,2,2,5,3,5],[7,7,6,6,6,6,6,2,2,5,5,5],[7,7,7,7,9,9,9,2,2,2,9,5],[7,7,9,9,9,8,8,9,9,9,9,5],[7,7,7,9,9,9,9,9,5,5,9,5],[7,7,9,9,10,9,11,9,9,5,9,5],[7,7,7,10,10,11,11,11,11,5,5,5]],
    "solution": [{"row":0,"col":8},{"row":1,"col":10},{"row":2,"col":2},{"row":3,"col":11},{"row":4,"col":0},{"row":5,"col":9},{"row":6,"col":3},{"row":7,"col":1},{"row":8,"col":5},{"row":9,"col":7},{"row":10,"col":4},{"row":11,"col":6}]
  },
  {
    "id": "level-95",
    "levelNumber": 95,
    "name": "Grandmaster Trial #5",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[1,1,3,0,0,0,3,3,3,3,3,3],[1,3,3,0,2,0,3,5,5,5,5,3],[1,1,3,2,2,0,3,5,5,5,5,3],[3,3,3,3,3,3,3,5,5,5,3,3],[8,8,3,4,4,4,4,4,6,5,5,5],[8,8,3,6,6,6,6,6,6,6,7,5],[8,8,3,3,3,3,6,6,6,7,7,7],[8,8,8,8,8,3,9,9,6,7,7,7],[8,8,3,3,3,3,3,9,9,9,7,7],[8,8,8,11,11,11,3,9,9,9,7,7],[8,8,8,11,11,11,3,10,10,9,7,7],[8,8,8,11,11,3,3,3,3,3,3,7]],
    "solution": [{"row":0,"col":5},{"row":1,"col":0},{"row":2,"col":4},{"row":3,"col":2},{"row":4,"col":6},{"row":5,"col":11},{"row":6,"col":8},{"row":7,"col":10},{"row":8,"col":1},{"row":9,"col":9},{"row":10,"col":7},{"row":11,"col":3}]
  },
  {
    "id": "level-96",
    "levelNumber": 96,
    "name": "Grandmaster Trial #6",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[5,5,5,5,5,1,0,0,0,0,0,0],[5,2,2,1,1,1,0,1,1,0,0,0],[5,5,2,2,2,1,1,1,1,1,1,1],[5,2,2,2,1,1,1,4,3,3,1,1],[5,2,2,2,2,6,6,4,3,6,1,1],[5,5,6,6,2,6,6,6,6,6,1,1],[5,5,5,6,6,6,6,6,6,6,5,1],[5,5,5,7,7,7,6,6,6,6,5,1],[10,5,7,8,8,7,6,6,6,6,5,9],[10,5,7,7,7,7,6,5,5,5,5,9],[10,5,5,7,7,7,5,5,11,11,11,11],[10,10,5,5,5,5,5,11,11,11,11,11]],
    "solution": [{"row":0,"col":6},{"row":1,"col":4},{"row":2,"col":2},{"row":3,"col":9},{"row":4,"col":7},{"row":5,"col":1},{"row":6,"col":8},{"row":7,"col":5},{"row":8,"col":3},{"row":9,"col":11},{"row":10,"col":0},{"row":11,"col":10}]
  },
  {
    "id": "level-97",
    "levelNumber": 97,
    "name": "Grandmaster Trial #7",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[10,10,0,0,0,0,10,10,4,4,4,4],[1,10,2,0,0,0,0,10,4,4,4,4],[1,10,2,2,2,10,10,10,10,4,4,4],[1,10,10,2,2,10,3,3,10,4,4,4],[5,5,10,10,10,10,6,6,10,4,4,4],[5,5,5,6,6,6,6,6,10,4,4,4],[7,7,5,6,6,10,10,10,10,4,4,4],[7,7,6,6,6,6,9,9,10,4,4,4],[11,11,6,9,6,9,9,9,10,10,4,8],[11,9,9,9,9,9,9,11,11,10,8,8],[11,11,11,11,9,9,11,11,10,10,10,10],[11,11,11,11,11,11,11,11,11,11,10,10]],
    "solution": [{"row":0,"col":5},{"row":1,"col":0},{"row":2,"col":3},{"row":3,"col":7},{"row":4,"col":9},{"row":5,"col":2},{"row":6,"col":4},{"row":7,"col":1},{"row":8,"col":11},{"row":9,"col":6},{"row":10,"col":10},{"row":11,"col":8}]
  },
  {
    "id": "level-98",
    "levelNumber": 98,
    "name": "Grandmaster Trial #8",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[2,9,9,9,0,9,9,9,9,9,9,9],[2,2,2,9,0,0,1,1,9,3,3,8],[2,2,2,9,0,0,9,9,9,3,3,8],[2,2,4,9,0,0,9,3,3,3,3,8],[2,2,4,9,9,9,9,3,5,3,3,8],[2,4,4,4,4,9,6,6,5,5,3,8],[4,4,4,4,4,9,6,5,5,5,3,8],[4,4,4,4,4,9,7,7,7,5,8,8],[4,4,4,9,9,9,7,7,5,5,8,8],[9,9,9,9,11,9,7,7,5,8,8,9],[10,9,10,9,11,9,9,9,9,9,9,9],[10,10,10,9,11,11,11,11,11,11,11,11]],
    "solution": [{"row":0,"col":4},{"row":1,"col":7},{"row":2,"col":1},{"row":3,"col":10},{"row":4,"col":2},{"row":5,"col":9},{"row":6,"col":6},{"row":7,"col":8},{"row":8,"col":11},{"row":9,"col":3},{"row":10,"col":0},{"row":11,"col":5}]
  },
  {
    "id": "level-99",
    "levelNumber": 99,
    "name": "Grandmaster Trial #9",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[3,3,3,0,0,0,1,3,3,3,3,3],[3,2,3,0,1,1,1,3,1,1,1,3],[2,2,3,3,3,1,1,1,1,1,1,3],[3,2,3,4,3,3,3,3,3,3,3,3],[3,3,3,4,4,4,4,4,5,5,5,3],[3,4,4,4,3,4,6,5,5,5,3,3],[3,3,3,3,3,4,6,5,5,5,5,3],[3,8,3,8,3,6,6,5,5,7,9,3],[3,8,8,8,3,6,6,5,7,7,9,3],[3,10,8,8,3,6,6,5,9,9,9,3],[3,10,8,8,3,8,5,5,9,9,9,9],[10,10,8,8,8,8,8,9,9,9,11,11]],
    "solution": [{"row":0,"col":3},{"row":1,"col":5},{"row":2,"col":0},{"row":3,"col":7},{"row":4,"col":4},{"row":5,"col":8},{"row":6,"col":6},{"row":7,"col":9},{"row":8,"col":2},{"row":9,"col":10},{"row":10,"col":1},{"row":11,"col":11}]
  },
  {
    "id": "level-100",
    "levelNumber": 100,
    "name": "Grandmaster Trial #10",
    "tier": "Grandmaster",
    "size": 12,
    "difficulty": "expert",
    "regions": [[9,9,9,9,0,0,0,9,9,9,3,3],[1,1,1,9,0,0,0,9,3,3,3,3],[1,1,2,9,9,9,0,9,9,9,3,3],[9,2,2,4,4,9,9,9,5,9,9,3],[9,6,4,4,4,4,5,9,5,9,3,3],[9,6,6,4,4,4,5,5,5,9,3,3],[9,6,9,9,5,5,5,5,7,9,9,9],[9,6,6,9,9,9,5,5,7,9,11,11],[9,6,6,9,8,9,9,9,9,9,9,11],[9,6,6,9,8,8,10,9,9,9,9,11],[9,6,6,9,8,8,10,9,9,9,11,11],[9,9,9,9,10,10,10,9,9,9,11,11]],
    "solution": [{"row":0,"col":5},{"row":1,"col":0},{"row":2,"col":2},{"row":3,"col":11},{"row":4,"col":3},{"row":5,"col":7},{"row":6,"col":1},{"row":7,"col":8},{"row":8,"col":4},{"row":9,"col":9},{"row":10,"col":6},{"row":11,"col":10}]
  },
  {
    "id": "level-101",
    "levelNumber": 101,
    "name": "Phantom Void #1 (5×5)",
    "tier": "Phantom",
    "size": 5,
    "difficulty": "medium",
    "regions": [[0,0,0,0,-1],[0,0,0,-1,1],[-1,2,2,2,2],[4,4,-1,3,2],[4,-1,2,2,2]],
    "solution": [{"row":0,"col":2},{"row":1,"col":4},{"row":2,"col":1},{"row":3,"col":3},{"row":4,"col":0}]
  },
  {
    "id": "level-102",
    "levelNumber": 102,
    "name": "Phantom Void #2 (6×6)",
    "tier": "Phantom",
    "size": 6,
    "difficulty": "medium",
    "regions": [[-1,1,1,1,0,0],[1,1,2,1,0,-1],[2,-1,2,1,5,5],[2,2,2,-1,3,5],[4,4,4,5,-1,5],[4,4,-1,5,5,5]],
    "solution": [{"row":0,"col":5},{"row":1,"col":0},{"row":2,"col":2},{"row":3,"col":4},{"row":4,"col":1},{"row":5,"col":3}]
  },
  {
    "id": "level-103",
    "levelNumber": 103,
    "name": "Phantom Void #3 (7×7)",
    "tier": "Phantom",
    "size": 7,
    "difficulty": "medium",
    "regions": [[1,-1,2,4,4,4,0],[1,1,2,4,-1,4,4],[4,4,2,4,3,3,-1],[-1,4,4,4,3,3,6],[5,4,5,-1,3,6,6],[5,5,5,5,5,-1,6],[5,5,-1,5,6,6,6]],
    "solution": [{"row":0,"col":6},{"row":1,"col":0},{"row":2,"col":2},{"row":3,"col":4},{"row":4,"col":1},{"row":5,"col":3},{"row":6,"col":5}]
  },
  {
    "id": "level-104",
    "levelNumber": 104,
    "name": "Phantom Void #4 (7×7)",
    "tier": "Phantom",
    "size": 7,
    "difficulty": "medium",
    "regions": [[5,5,-1,5,5,0,0],[5,5,1,5,-1,2,0],[5,5,5,5,2,2,-1],[4,-1,5,3,3,2,2],[4,6,5,-1,2,2,2],[-1,6,5,5,5,5,5],[6,6,6,6,6,-1,5]],
    "solution": [{"row":0,"col":6},{"row":1,"col":2},{"row":2,"col":5},{"row":3,"col":3},{"row":4,"col":0},{"row":5,"col":4},{"row":6,"col":1}]
  },
  {
    "id": "level-105",
    "levelNumber": 105,
    "name": "Phantom Void #5 (8×8)",
    "tier": "Phantom",
    "size": 8,
    "difficulty": "hard",
    "regions": [[3,-1,2,2,0,0,0,0],[3,1,2,2,2,-1,0,0],[3,3,2,2,3,3,-1,0],[-1,3,3,3,3,3,3,0],[5,3,6,-1,4,4,4,6],[5,3,6,6,-1,6,6,6],[3,3,6,6,6,6,6,-1],[3,3,-1,6,6,6,6,7]],
    "solution": [{"row":0,"col":5},{"row":1,"col":1},{"row":2,"col":3},{"row":3,"col":6},{"row":4,"col":4},{"row":5,"col":0},{"row":6,"col":2},{"row":7,"col":7}]
  },
  {
    "id": "level-106",
    "levelNumber": 106,
    "name": "Phantom Void #6 (8×8)",
    "tier": "Phantom",
    "size": 8,
    "difficulty": "hard",
    "regions": [[-1,1,1,1,0,0,0,0],[1,1,-1,1,0,0,1,0],[4,2,2,1,-1,3,1,0],[4,-1,5,1,3,3,1,0],[4,5,5,1,3,3,1,-1],[5,5,5,1,1,-1,1,1],[5,5,5,-1,1,1,1,6],[5,5,5,5,5,7,-1,6]],
    "solution": [{"row":0,"col":6},{"row":1,"col":3},{"row":2,"col":1},{"row":3,"col":4},{"row":4,"col":0},{"row":5,"col":2},{"row":6,"col":7},{"row":7,"col":5}]
  },
  {
    "id": "level-107",
    "levelNumber": 107,
    "name": "Phantom Void #7 (9×9)",
    "tier": "Phantom",
    "size": 9,
    "difficulty": "hard",
    "regions": [[7,7,0,0,0,0,-1,7,7],[1,7,7,7,7,0,0,7,-1],[1,7,2,-1,7,0,7,7,3],[1,7,2,4,7,7,7,-1,3],[1,7,7,4,-1,5,5,5,3],[6,-1,7,7,5,5,5,5,5],[6,6,-1,7,5,5,5,5,5],[6,6,6,7,7,-1,5,5,5],[-1,6,6,6,8,8,8,5,5]],
    "solution": [{"row":0,"col":5},{"row":1,"col":0},{"row":2,"col":2},{"row":3,"col":8},{"row":4,"col":3},{"row":5,"col":7},{"row":6,"col":1},{"row":7,"col":4},{"row":8,"col":6}]
  },
  {
    "id": "level-108",
    "levelNumber": 108,
    "name": "Phantom Void #8 (10×10)",
    "tier": "Phantom",
    "size": 10,
    "difficulty": "expert",
    "regions": [[9,9,0,0,0,0,-1,9,9,2],[-1,9,0,0,0,0,4,1,9,2],[3,9,9,9,4,4,4,-1,9,2],[3,3,-1,9,9,4,4,4,9,9],[3,3,3,-1,9,9,4,4,4,9],[5,3,3,3,-1,9,9,9,9,9],[5,-1,9,9,9,9,9,6,6,9],[5,9,9,7,7,-1,6,6,6,9],[5,9,8,7,7,7,6,6,-1,9],[9,9,9,9,9,9,9,9,9,-1]],
    "solution": [{"row":0,"col":3},{"row":1,"col":7},{"row":2,"col":9},{"row":3,"col":1},{"row":4,"col":6},{"row":5,"col":0},{"row":6,"col":8},{"row":7,"col":4},{"row":8,"col":2},{"row":9,"col":5}]
  },
  {
    "id": "level-109",
    "levelNumber": 109,
    "name": "Phantom Void #9 (11×11)",
    "tier": "Phantom",
    "size": 11,
    "difficulty": "expert",
    "regions": [[2,0,0,0,0,0,-1,8,8,8,8],[2,2,-1,0,3,3,3,1,1,3,8],[2,8,8,8,8,3,3,3,-1,3,8],[8,8,8,-1,8,3,3,3,3,3,8],[8,-1,8,3,3,3,5,4,4,3,8],[-1,8,8,3,3,3,5,4,4,8,8],[10,8,7,7,7,-1,5,4,4,8,6],[10,8,8,7,7,5,5,-1,8,8,8],[10,8,8,8,8,8,8,8,8,-1,8],[10,10,10,8,8,8,9,9,9,9,-1],[10,10,8,8,-1,8,8,8,8,8,8]],
    "solution": [{"row":0,"col":3},{"row":1,"col":7},{"row":2,"col":0},{"row":3,"col":5},{"row":4,"col":8},{"row":5,"col":6},{"row":6,"col":10},{"row":7,"col":4},{"row":8,"col":2},{"row":9,"col":9},{"row":10,"col":1}]
  },
  {
    "id": "level-110",
    "levelNumber": 110,
    "name": "Phantom Void #10 (12×12)",
    "tier": "Phantom",
    "size": 12,
    "difficulty": "expert",
    "regions": [[1,0,1,1,1,1,1,1,1,-1,1,1],[1,1,1,4,4,4,1,1,1,1,1,-1],[-1,4,4,4,4,4,4,2,2,1,3,3],[6,6,6,4,4,4,4,4,2,1,-1,3],[6,6,6,-1,5,4,4,4,4,1,3,3],[6,6,6,6,5,5,-1,1,1,1,1,3],[6,6,6,6,5,6,1,-1,7,7,1,1],[8,-1,6,6,6,6,1,1,7,7,9,1],[8,8,8,6,-1,6,1,7,7,9,9,1],[8,8,1,1,1,-1,1,1,9,9,9,1],[10,10,-1,1,1,1,1,1,1,1,9,1],[10,10,10,10,11,11,1,1,-1,1,1,1]],
    "solution": [{"row":0,"col":1},{"row":1,"col":6},{"row":2,"col":8},{"row":3,"col":11},{"row":4,"col":7},{"row":5,"col":5},{"row":6,"col":3},{"row":7,"col":9},{"row":8,"col":2},{"row":9,"col":10},{"row":10,"col":0},{"row":11,"col":4}]
  },
  {
    "id": "level-111",
    "levelNumber": 111,
    "name": "Eclipse Chasm #1 (6×6)",
    "tier": "Eclipse",
    "size": 6,
    "difficulty": "medium",
    "regions": [[2,0,0,-1,2,-1],[2,-1,-1,2,2,1],[2,2,2,2,-1,-1],[-1,3,-1,2,2,2],[-1,-1,5,4,4,2],[5,5,5,-1,-1,2]],
    "solution": [{"row":0,"col":2},{"row":1,"col":5},{"row":2,"col":3},{"row":3,"col":1},{"row":4,"col":4},{"row":5,"col":0}]
  },
  {
    "id": "level-112",
    "levelNumber": 112,
    "name": "Eclipse Chasm #2 (7×7)",
    "tier": "Eclipse",
    "size": 7,
    "difficulty": "medium",
    "regions": [[-1,-1,2,2,0,0,0],[1,1,-1,2,2,-1,0],[1,1,-1,-1,2,2,0],[1,-1,3,3,-1,2,4],[1,5,5,-1,-1,2,4],[-1,5,5,2,2,2,-1],[6,5,5,5,5,-1,-1]],
    "solution": [{"row":0,"col":4},{"row":1,"col":1},{"row":2,"col":5},{"row":3,"col":3},{"row":4,"col":6},{"row":5,"col":2},{"row":6,"col":0}]
  },
  {
    "id": "level-113",
    "levelNumber": 113,
    "name": "Eclipse Chasm #3 (7×7)",
    "tier": "Eclipse",
    "size": 7,
    "difficulty": "medium",
    "regions": [[-1,-1,2,2,0,0,0],[1,1,-1,2,2,-1,0],[1,1,-1,-1,2,2,0],[1,-1,3,3,-1,2,4],[1,5,5,-1,-1,2,4],[-1,5,5,2,2,2,-1],[6,5,5,5,5,-1,-1]],
    "solution": [{"row":0,"col":4},{"row":1,"col":1},{"row":2,"col":5},{"row":3,"col":3},{"row":4,"col":6},{"row":5,"col":2},{"row":6,"col":0}]
  },
  {
    "id": "level-114",
    "levelNumber": 114,
    "name": "Eclipse Chasm #4 (8×8)",
    "tier": "Eclipse",
    "size": 8,
    "difficulty": "hard",
    "regions": [[4,4,1,-1,4,4,-1,0],[-1,4,1,-1,4,4,4,4],[4,4,4,4,-1,-1,2,4],[4,4,-1,4,3,3,-1,4],[4,4,-1,4,-1,3,4,4],[4,-1,4,4,5,5,4,-1],[-1,-1,4,6,4,4,4,4],[7,4,4,4,4,-1,4,-1]],
    "solution": [{"row":0,"col":7},{"row":1,"col":2},{"row":2,"col":6},{"row":3,"col":4},{"row":4,"col":1},{"row":5,"col":5},{"row":6,"col":3},{"row":7,"col":0}]
  },
  {
    "id": "level-115",
    "levelNumber": 115,
    "name": "Eclipse Chasm #5 (8×8)",
    "tier": "Eclipse",
    "size": 8,
    "difficulty": "hard",
    "regions": [[0,0,1,1,-1,2,2,-1],[-1,0,-1,1,1,1,2,2],[3,0,-1,-1,3,1,2,2],[3,3,3,3,3,-1,-1,4],[3,-1,3,3,3,3,-1,4],[-1,5,3,-1,3,3,3,4],[3,3,3,7,-1,6,3,-1],[3,-1,3,7,7,-1,3,3]],
    "solution": [{"row":0,"col":0},{"row":1,"col":4},{"row":2,"col":6},{"row":3,"col":2},{"row":4,"col":7},{"row":5,"col":1},{"row":6,"col":5},{"row":7,"col":3}]
  },
  {
    "id": "level-116",
    "levelNumber": 116,
    "name": "Eclipse Chasm #6 (9×9)",
    "tier": "Eclipse",
    "size": 9,
    "difficulty": "hard",
    "regions": [[-1,0,0,0,-1,0,0,0,0],[6,0,-1,0,0,0,1,1,-1],[6,0,0,-1,3,3,-1,4,2],[6,-1,0,0,-1,3,4,4,4],[6,0,0,-1,0,-1,4,4,4],[6,0,-1,5,0,-1,4,4,4],[6,0,0,0,0,0,4,-1,-1],[6,8,8,7,7,0,-1,-1,0],[-1,-1,8,7,0,0,0,0,0]],
    "solution": [{"row":0,"col":1},{"row":1,"col":6},{"row":2,"col":8},{"row":3,"col":5},{"row":4,"col":7},{"row":5,"col":3},{"row":6,"col":0},{"row":7,"col":4},{"row":8,"col":2}]
  },
  {
    "id": "level-117",
    "levelNumber": 117,
    "name": "Eclipse Chasm #7 (9×9)",
    "tier": "Eclipse",
    "size": 9,
    "difficulty": "hard",
    "regions": [[2,2,2,2,-1,0,-1,1,1],[2,-1,2,2,-1,1,1,1,1],[2,2,-1,2,1,1,-1,5,5],[3,-1,2,2,4,-1,5,5,5],[3,3,-1,2,4,4,4,-1,5],[-1,6,6,2,2,2,2,-1,5],[6,6,8,-1,7,7,2,2,-1],[6,8,8,-1,8,7,7,2,-1],[-1,8,8,8,8,-1,7,2,2]],
    "solution": [{"row":0,"col":5},{"row":1,"col":7},{"row":2,"col":3},{"row":3,"col":0},{"row":4,"col":4},{"row":5,"col":8},{"row":6,"col":1},{"row":7,"col":6},{"row":8,"col":2}]
  },
  {
    "id": "level-118",
    "levelNumber": 118,
    "name": "Eclipse Chasm #8 (10×10)",
    "tier": "Eclipse",
    "size": 10,
    "difficulty": "expert",
    "regions": [[-1,-1,0,0,1,1,1,1,1,1],[2,2,5,5,5,1,-1,-1,5,1],[2,2,5,-1,5,-1,5,5,5,3],[2,2,5,4,-1,-1,5,5,3,3],[2,-1,5,4,4,4,-1,5,5,3],[2,8,5,5,4,4,4,5,-1,-1],[6,8,-1,5,5,5,5,5,-1,5],[-1,8,-1,5,5,7,7,5,5,5],[8,8,8,-1,-1,8,9,5,5,5],[8,8,8,8,8,8,9,-1,5,-1]],
    "solution": [{"row":0,"col":3},{"row":1,"col":9},{"row":2,"col":1},{"row":3,"col":8},{"row":4,"col":4},{"row":5,"col":7},{"row":6,"col":0},{"row":7,"col":5},{"row":8,"col":2},{"row":9,"col":6}]
  },
  {
    "id": "level-119",
    "levelNumber": 119,
    "name": "Eclipse Chasm #9 (11×11)",
    "tier": "Eclipse",
    "size": 11,
    "difficulty": "expert",
    "regions": [[10,-1,10,-1,1,1,10,10,10,10,0],[10,10,10,1,1,1,10,-1,-1,0,0],[10,10,1,1,2,2,10,10,-1,-1,6],[-1,10,-1,10,10,10,10,10,3,6,6],[10,10,10,10,4,4,4,-1,3,6,-1],[5,5,5,10,4,-1,-1,6,6,6,6],[10,10,10,10,-1,-1,8,8,6,6,6],[10,7,-1,10,-1,8,8,8,6,6,6],[-1,10,10,10,10,10,8,10,6,-1,10],[10,10,9,-1,9,10,-1,10,6,10,10],[10,-1,9,9,9,10,10,10,10,10,-1]],
    "solution": [{"row":0,"col":10},{"row":1,"col":3},{"row":2,"col":5},{"row":3,"col":8},{"row":4,"col":4},{"row":5,"col":0},{"row":6,"col":9},{"row":7,"col":1},{"row":8,"col":6},{"row":9,"col":2},{"row":10,"col":7}]
  },
  {
    "id": "level-120",
    "levelNumber": 120,
    "name": "Eclipse Chasm #10 (12×12)",
    "tier": "Eclipse",
    "size": 12,
    "difficulty": "expert",
    "regions": [[0,2,2,2,-1,1,1,1,2,2,-1,2],[0,2,1,1,1,1,-1,-1,2,2,2,2],[2,2,2,2,-1,1,1,1,2,-1,2,2],[-1,-1,4,2,3,3,2,2,2,2,2,2],[2,2,4,2,2,2,2,-1,2,2,-1,2],[-1,2,4,4,2,5,5,5,2,-1,2,2],[2,2,2,2,2,2,5,5,-1,2,6,-1],[2,-1,9,-1,7,2,2,2,2,2,8,8],[2,9,9,7,7,-1,2,10,-1,10,10,8],[2,9,-1,7,7,2,2,10,10,10,10,-1],[2,2,2,-1,2,2,-1,10,10,10,10,10],[2,2,-1,2,2,-1,11,10,10,10,10,10]],
    "solution": [{"row":0,"col":0},{"row":1,"col":3},{"row":2,"col":8},{"row":3,"col":5},{"row":4,"col":2},{"row":5,"col":7},{"row":6,"col":10},{"row":7,"col":4},{"row":8,"col":11},{"row":9,"col":1},{"row":10,"col":9},{"row":11,"col":6}]
  },
];
