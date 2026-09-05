import { Puzzle } from '../engine/types';

export interface CampaignLevel extends Puzzle {
  levelNumber: number;
  tier: 'Kitten' | 'Playful' | 'Clever' | 'Master';
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
        0,
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
  }
];
