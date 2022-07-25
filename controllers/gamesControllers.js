import db from "../pg/db.js";


export async function getGames(req, res) {

    const { name } = req.query;
    let pesquisa = "";
    const params = [];

    if(name){
        params.push(`${name}%`)
        pesquisa = `WHERE games.name ILIKE $${params.length}`;
    }

    try {
        const result = await db.query(`
            SELECT * FROM games, categories.name as "categoryName"
            FROM games
            JOIN categories ON games."categoryId" = categories.id
            ${pesquisa}
        `, params);

        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


}

export async function postGame(req,res) {



}