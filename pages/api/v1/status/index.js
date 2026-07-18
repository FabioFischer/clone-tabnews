import database from "/infra/database.js";

async function status(request, response) {
  var result = await database.query(" SELECT 'Alive' as result; ");

  console.log(result.rows[0].result);

  response.status(200).json({ chave: "valor" });
}

export default status;
