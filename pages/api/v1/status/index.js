function status(request, response) {
  response.status(200).json({ message: "Aplicação ok!" });
}

export default status;
