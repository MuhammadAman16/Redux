const logger = (param) => (state) => (next) => (action) => {
  console.log(param);
  console.log(state);
  console.log(next);
  console.log(action);
  next(action);
};

export default logger;
//currying: a function taking multiple arguments, is transformed
// into a sequence of functions taking single arguments
