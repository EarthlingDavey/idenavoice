const limits = [
  {
    state: 'Newbie',
    tags: 4,
    tagPreferences: -1,
    tagRelevance: 10,
  },
  {
    state: 'Verified',
    tags: 9,
    tagPreferences: -1,
    tagRelevance: 10,
  },
  {
    state: 'Human',
    tags: 16,
    tagPreferences: -1,
    tagRelevance: 10,
  },
  {
    state: 'Suspended',
    tags: 0,
    tagPreferences: 0,
    tagRelevance: 0,
  },
  {
    state: 'Zombie',
    tags: 0,
    tagPreferences: 0,
    tagRelevance: 0,
  },
  {
    state: 'Undefined',
    tags: 10,
    tagPreferences: 0,
    tagRelevance: 0,
  },
];

module.exports = { limits };
