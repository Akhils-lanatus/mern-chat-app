export const errorHandler = (err) => {
  let message = "";
  if (err.code === 11000 && err.keyPattern && err.keyValue) {
    const keyPattern = Object.keys(err.keyPattern)[0];
    const keyValue = err.keyValue[keyPattern];
    return `Duplicate ${keyPattern} '${keyValue}' entered. Please try adding a new one.`;
  }
  if (err.name === "CastError") {
    return "Invalid id entered";
  }
  if (err.name === "ValidationError") {
    Object.keys(err.errors).forEach((key) => {
      message += err.errors[key].message;
      message += ", ";
    });
    let slicedErrorString = message.slice(0, -2);
    return slicedErrorString;
  }
  return err.message;
};
