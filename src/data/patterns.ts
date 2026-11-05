import type { Puzzle } from '../engine/types';

// Fixed patterned boards, each independently verified to have exactly one solution.
export const PATTERN_MAPS: Puzzle[] = [
  {
    "id": "pattern-diagonal-ribbons",
    "name": "Diagonal Ribbons",
    "size": 9,
    "regions": [
      [
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4
      ],
      [
        0,
        1,
        1,
        2,
        2,
        3,
        2,
        4,
        4
      ],
      [
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5
      ],
      [
        1,
        1,
        2,
        3,
        3,
        4,
        4,
        5,
        5
      ],
      [
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6
      ],
      [
        2,
        3,
        5,
        4,
        4,
        5,
        5,
        6,
        6
      ],
      [
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7
      ],
      [
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7
      ],
      [
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        8,
        8
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
        "col": 7
      }
    ],
    "allowDisjointRegions": true
  },
  {
    "id": "pattern-diamond-rings",
    "name": "Diamond Rings",
    "size": 9,
    "regions": [
      [
        8,
        7,
        6,
        5,
        4,
        5,
        6,
        7,
        8
      ],
      [
        7,
        6,
        5,
        4,
        3,
        4,
        5,
        6,
        7
      ],
      [
        6,
        5,
        4,
        3,
        2,
        3,
        4,
        5,
        0
      ],
      [
        5,
        4,
        3,
        2,
        1,
        2,
        3,
        4,
        5
      ],
      [
        1,
        3,
        2,
        1,
        0,
        1,
        2,
        3,
        4
      ],
      [
        5,
        4,
        3,
        2,
        2,
        2,
        3,
        4,
        5
      ],
      [
        6,
        5,
        4,
        3,
        2,
        3,
        4,
        5,
        6
      ],
      [
        7,
        6,
        5,
        4,
        3,
        7,
        5,
        6,
        7
      ],
      [
        8,
        8,
        6,
        5,
        4,
        5,
        6,
        7,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 6
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 0
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
        "col": 5
      },
      {
        "row": 8,
        "col": 1
      }
    ],
    "allowDisjointRegions": true
  },
  {
    "id": "pattern-chevron",
    "name": "Chevron",
    "size": 9,
    "regions": [
      [
        2,
        2,
        1,
        0,
        0,
        6,
        3,
        2,
        2
      ],
      [
        3,
        2,
        2,
        1,
        0,
        1,
        2,
        2,
        3
      ],
      [
        4,
        3,
        2,
        2,
        6,
        2,
        2,
        6,
        4
      ],
      [
        4,
        4,
        3,
        2,
        2,
        2,
        3,
        4,
        4
      ],
      [
        5,
        4,
        2,
        3,
        6,
        3,
        4,
        6,
        5
      ],
      [
        3,
        5,
        4,
        4,
        5,
        4,
        4,
        5,
        6
      ],
      [
        7,
        6,
        5,
        4,
        4,
        4,
        6,
        6,
        5
      ],
      [
        7,
        7,
        8,
        5,
        4,
        5,
        6,
        2,
        7
      ],
      [
        8,
        4,
        7,
        6,
        3,
        6,
        7,
        7,
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
        "col": 5
      },
      {
        "row": 2,
        "col": 1
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
        "col": 6
      },
      {
        "row": 7,
        "col": 8
      },
      {
        "row": 8,
        "col": 0
      }
    ],
    "allowDisjointRegions": true
  },
  {
    "id": "pattern-heart",
    "name": "Heart",
    "size": 9,
    "regions": [
      [
        1,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4
      ],
      [
        1,
        1,
        0,
        0,
        3,
        0,
        0,
        4,
        5
      ],
      [
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5
      ],
      [
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        6
      ],
      [
        2,
        3,
        0,
        0,
        0,
        0,
        0,
        6,
        6
      ],
      [
        3,
        3,
        4,
        0,
        0,
        0,
        6,
        6,
        7
      ],
      [
        3,
        4,
        4,
        1,
        0,
        6,
        5,
        7,
        7
      ],
      [
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8
      ],
      [
        4,
        5,
        5,
        6,
        6,
        7,
        7,
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
        "col": 7
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
        "col": 8
      },
      {
        "row": 8,
        "col": 5
      }
    ],
    "allowDisjointRegions": true
  },
  {
    "id": "pattern-butterfly",
    "name": "Butterfly",
    "size": 9,
    "regions": [
      [
        1,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4
      ],
      [
        1,
        0,
        0,
        2,
        3,
        3,
        0,
        0,
        5
      ],
      [
        1,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        5
      ],
      [
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        5,
        6
      ],
      [
        2,
        3,
        3,
        0,
        0,
        0,
        5,
        6,
        6
      ],
      [
        3,
        4,
        0,
        0,
        0,
        0,
        0,
        6,
        7
      ],
      [
        3,
        0,
        0,
        0,
        5,
        0,
        0,
        0,
        7
      ],
      [
        4,
        0,
        0,
        5,
        2,
        6,
        0,
        0,
        3
      ],
      [
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8
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
        "col": 6
      },
      {
        "row": 5,
        "col": 1
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
    ],
    "allowDisjointRegions": true
  },
  {
    "id": "pattern-lightning-bolt",
    "name": "Lightning Bolt",
    "size": 9,
    "regions": [
      [
        4,
        1,
        1,
        2,
        2,
        0,
        0,
        4,
        4
      ],
      [
        1,
        6,
        2,
        2,
        0,
        0,
        3,
        4,
        5
      ],
      [
        6,
        2,
        2,
        0,
        0,
        1,
        4,
        5,
        5
      ],
      [
        2,
        4,
        0,
        0,
        0,
        0,
        0,
        2,
        6
      ],
      [
        2,
        3,
        2,
        4,
        0,
        0,
        5,
        6,
        6
      ],
      [
        3,
        3,
        4,
        0,
        0,
        5,
        4,
        4,
        7
      ],
      [
        3,
        4,
        0,
        0,
        1,
        3,
        6,
        4,
        7
      ],
      [
        4,
        4,
        0,
        5,
        5,
        6,
        7,
        7,
        5
      ],
      [
        8,
        5,
        5,
        6,
        6,
        5,
        7,
        6,
        8
      ]
    ],
    "solution": [
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 5
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
        "col": 8
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
        "col": 0
      }
    ],
    "allowDisjointRegions": true
  }
];
