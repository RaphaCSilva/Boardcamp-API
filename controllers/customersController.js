import db from "../pg/db.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {

        const params = [];
        let pesquisa = "";

        if(cpf) {
            params.push(`${cpf}%`);
            pesquisa += `wHERE cpf ILIKE $${params.length}`
        }

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

export async function getCustomerByID(req, res) {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.sendStatus(400);
    }

    try {
        const result = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(result.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function postCustomer(req, res) {


}

export async function updateCustomer(req, res) {

}