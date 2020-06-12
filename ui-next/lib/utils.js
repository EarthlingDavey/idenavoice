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

module.exports = {
  throttle,
};
