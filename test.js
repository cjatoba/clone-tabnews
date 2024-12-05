try {
  const error = new Error();
  throw error;
} catch (error) {
  console.log(error.name);
  console.log(typeof error.name);

  console.log(error.message);
  console.log(typeof error.message);

  console.log(error.stack);
  console.log(typeof error.stack);

  console.log(typeof error);
}
