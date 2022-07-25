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
    
}

export async function updateRental(req, res) { 
    
}

export async function deleteRental(req, res) { 
    
}

function arrumaArray(row) {
    const [
        id, customerId, gameId,
        rentDate, daysRented, returnDate,
        originalPrice, delayFee, customerName,
        gameName, categoryId, categoryName
    ] = row;
  
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