import db from "../pg/db.js";

export async function getRentals(req, res) { 
    const { customerId, gameId } = req.query;

    const params = [];
    let pesquisa = "";
    const teste = [];
    
    if (customerId) {
        params.push(customerId);
        teste.push(`rentals."customerId = $${params.length}`);
    }

    if (gameId) {
        params.push(gameId);
        teste.push(`rentals."gameId" = $${params.length}`);
    }

    if (params.length > 0) {
        pesquisa += `WHERE ${teste.join(" AND ")}`;
    }

    const result = await db.query({
        text: `
            SELECT rentals.*, customers.name AS customer, games.name, categories.*
            FROM rentals
            JOIN categories ON categories.id = games."categoryId"
            JOIN games ON games.id = rentals."gameId"
            JOIN customers ON customers.id = rentals."customerId"
            ${pesquisa}
        `,
        rowMode: "array"
    }, params);

    res.send(result.rows.map(arrumaArray));
}

export async function postRental(req, res) { 
    const {customerId, gameId, daysRented} = req.body;

    try {
        const gameExist = await db.query(`
            SELECT * FROM games WHERE id = $1
        `,[gameId]);
        if(gameExist === 0) {
            return res.sendStatus(400);
        }

        const game = gameExist.rows[0];
        const { pricePerDay } = game;

        const costumerExist = await db.query(`
            SELECT id FROM customers WHERE id = $1
        `, [customerId]);
        if(costumerExist.rowCount === 0) {
            return res.sendStatus(400);
        }

        const result = await db.query(`
            SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null
        `, [gameId]);

        if (result.rowCount > 0) {
            if(game.stockTotal === result.rowCount) {
                return res.sendStatus(400);
            }
        }

        const Preco = daysRented * pricePerDay;

        await db.query(`
            INSERT INTO 
                rentals ("customerId", "gameId", "rentDate", "dayRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, NOW(), $3, null, $4, null);
        `, [customerId, gameId, daysRented, Preco]);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updateRental(req, res) { 
    const {id} = req.params;

    try {

        const result = await db.query(`
            SELECT * FROM rentals WHERE id = $1
        `, [id]);
        
        if(result.rowCount === 0) {
            return res.sendStatus(404);
        } 

        const rental = result.rows[0];
        const {daysRented, originalPrice} = rental;

        if(rental.returnDate) {
            return res.sendStatus(400);
        } else {
            const diferenca = new Date().getTime() - new Date(rental.rentDate).getTime();
            const diferencaEmDias = Math.floor( diferenca / (24 * 3600 * 1000));

            let delayfee = 0;

            if (diferencaEmDias > daysRented) { 
                const diasAdicionais = diferencaEmDias - daysRented;
                delayfee = diasAdicionais * originalPrice;
            }

            await db.query(`
                UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2
            `, [delayfee, id]);

            res.sendStatus(200);
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteRental(req, res) { 
    
    const {id} = req.params;

    try {

        const result = await db.query(`
            SELECT * FROM rentals WHERE id = $1
        `, [id]);
        
        if(result.rowCount === 0){
            res.sendStatus(404);
        } else {
            const rental = result.rows[0];
            if(!rental.returnDate) {
                return res.sendStatus(400);
            } else {
                await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
            }
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

function arrumaArray(row) {
    const [ id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, customerName, gameName, categoryId, categoryName ] = row;
  
    return {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: {
            id: customerId,
            name: customerName
        },
        game: {
            id: gameId,
            name: gameName,
            categoryId,
            categoryName
        }
    }
}