const limits = [
  {
    state: 'Newbie',
    tags: 4,
    tagAssign: 4,
    tagPreferences: -1,
    tagRelevance: 10,
  },
  {
    state: 'Verified',
    tags: 9,
    tagAssign: 9,
    tagPreferences: -1,
    tagRelevance: 10,
  },
  {
    state: 'Human',
    tags: 16,
    tagAssign: -1,
    tagPreferences: -1,
    tagRelevance: -1,
  },
  {
    state: 'Suspended',
    tags: 0,
    tagAssign: 0,
    tagPreferences: 0,
    tagRelevance: 0,
  },
  {
    state: 'Zombie',
    tags: 0,
    tagAssign: 0,
    tagPreferences: 0,
    tagRelevance: 0,
  },
  {
    state: 'Undefined',
    tags: 0,
    tagAssign: 0,
    tagPreferences: 0,
    tagRelevance: 0,
  },
];

module.exports = { limits };
