import { database } from "../db/postgres.js"

export async function getElementByCustomerId(customerId){
    return await database.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
}

export async function getElementByGameId(gameId){
    return await database.query(`SELECT * FROM games WHERE id = $1`, [gameId])
}

export async function getElementsByGameId(gameId){
    const query = `
        SELECT * FROM rentals
        WHERE rentals."gameId" = $1
        AND rentals."returnDate" IS null
    `;
    const params = gameId;

    return await database.query(query, [params]);
}

export async function addElement(element){
    const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = element;
    const query = `
        INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const params = [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
    
    return await database.query(query, params);
}

export async function getElements(){
    const query = `
        SELECT 
            rentals.id,
            rentals."customerId",
            rentals."gameId",
            rentals."rentDate",
            rentals."daysRented",
            rentals."returnDate",
            rentals."originalPrice",
            rentals."delayFee",
            games.name,
            games."categoryId",
            categories.name AS "categoryName"
        FROM rentals
        JOIN customers ON customers.id = rentals."customerId"
        JOIN games ON games.id = rentals."gameId"
        JOIN categories on categories.id = games."categoryId"
    `
    return await database.query(query);
}

export async function updateElement(id){
    return;
}

export async function deleteElement(id){
    return;
}