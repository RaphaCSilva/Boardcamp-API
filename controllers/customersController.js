import db from "../pg/db.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    const params = [];
    let pesquisa = "";
    if(cpf) {
        params.push(`${cof}%`);
        pesquisa += `wHERE cpf ILIKE $${params.length}`
    }

    try {
        const result = await db.query(`
            SELECT * FROM customers
            ${pesquisa}
        `, params);

        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getCustomer(req, res) {


}

export async function postCustomer(req, res) {


}

export async function updateCustomer(req, res) {

}