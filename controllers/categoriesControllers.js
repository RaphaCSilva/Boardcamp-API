import db from "../pg/db.js";

export async function getCategories(req, res){
    try {
        const result = await db.query(`
          SELECT * FROM categories
        `);
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postCategories(req, res){
    
    const categoria = req.body;

    try {
        const checagem = await db.query(`
            SELECT id FROM categories WHERE name = $1
        `,[categoria.name])
        if(result.rowCount > 0) {
            return res.sendStatus(409);
        }

        await db.query(`
            INSERT INTO categories(name) VALUES ($1)
        `, [categoria.name]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}