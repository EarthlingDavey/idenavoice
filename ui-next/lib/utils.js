const throttle = (func, delay) => {
  // console.log('hi');
  let inProgress = false;
  return (...args) => {
    if (inProgress) {
      return;
    }
    inProgress = true;
    func(...args);
    setTimeout(() => {
      inProgress = false;
    }, delay);
  };
};

const spareCredits = (tags) => {
  let spareVoteCredits = 100;

  for (let i = 0; i < tags.length; i++) {
    const t = tags[i];
    // console.log(t);
    spareVoteCredits = spareVoteCredits - Math.pow(t.qty, 2);
  }
  return spareVoteCredits;
};

module.exports = {
  throttle,
  spareCredits,
};
