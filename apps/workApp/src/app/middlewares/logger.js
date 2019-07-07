export default () => next => (action) => {
  try {
    console.log(action);
    return next(action);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
