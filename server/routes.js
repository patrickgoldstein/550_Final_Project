const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    /*
    if(req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the our MCIT 550 Project!`)
    } else {
        res.send(`Hello! Welcome to our MCIT 550 Project!`)
    }
*/
    res.send(`Hello! Welcome to our MCIT 550 Project!`)

}




// ********************************************
//               GENERAL ROUTES
// ********************************************

//Route 1


/**
 * Print the correctness rate for each question among all users in ascending order (indicator of question difficulty)
 * @param {*} req 
 * @param {*} res 
 */

async function question(req, res) {
    connection.query(`

SELECT Correct.QuestionId, SubjectId, FORMAT(CorrectCount / TotalCount, 3) AS CorrectRate
FROM
(
SELECT QuestionId, COUNT(DISTINCT AnswerId) AS CorrectCount
FROM ANSWERS
WHERE IsCorrect = 1
GROUP BY QuestionId
) Correct
JOIN
(
SELECT QuestionId, COUNT(DISTINCT AnswerId) AS TotalCount
FROM ANSWERS
GROUP BY QuestionId
) Total
ON Correct.QuestionId = Total.QuestionId
JOIN EEDI_QUESTIONS E
ON Correct.QuestionId = E.QuestionId
ORDER BY CorrectCount / TotalCount
`

, function (error, results, fields) {

        if(error) {
            console.log(error)
            res.json({ error: error })
        } else if(results) {
            res.json({ results: results })
        }
    });

}






//Route 2


/**
 * Print the correctness rate for each subject among all users in ascending order (indicator of 
subject difficulty).

 * @param {*} req 
 * @param {*} res 
 */


async function subject(req, res) {
        connection.query(`



SELECT Correct.SubjectId, FORMAT(CorrectCount / TotalCount, 3) AS CorrectRate
FROM
(
    SELECT SubjectId, COUNT(DISTINCT AnswerId) AS CorrectCount
    FROM ANSWERS A
    JOIN EEDI_QUESTIONS E
    ON A.QuestionId = E.QuestionId
    WHERE IsCorrect = 1
    GROUP BY SubjectId
) Correct
JOIN
(
    SELECT SubjectId, COUNT(DISTINCT AnswerId) AS TotalCount
    FROM ANSWERS A
    JOIN EEDI_QUESTIONS E
    ON A.QuestionId = E.QuestionId
    GROUP BY SubjectId
) Total
ON Correct.SubjectId = Total.SubjectId
ORDER BY CorrectCount / TotalCount
`

, function (error, results, fields) {

            if(error) {
                console.log(error)
                res.json({ error: error })
            } else if(results) {
                res.json({ results: results })
            }
        });

    }


// ********************************************
//               User-Specific ROUTES
// ********************************************




//Route 3

/**
 * Print the count of correct answers of each subject for a specific user.
 */


async function userCorrectness(req, res) {

    const id = req.query.id;

    if(req.query.id && !isNaN(req.query.id)) {

        connection.query(`



SELECT UserId, SubjectId, COUNT(DISTINCT AnswerId) AS CorrectCount
FROM EEDI_QUESTIONS E
JOIN ANSWERS A
ON E.QuestionId = A.QuestionId
WHERE IsCorrect = 1 AND UserId = ${id}
GROUP BY UserId, SubjectId
`
, function (error, results, fields) {

            if(error) {
                console.log(error)
                res.json({ error: error })
            } else if(results) {
                res.json({ results: results })
            }
        });
}
else {
    res.json('Works');
}

    }









//Route 4


/**
 * Print the subjects with min / max count of correct answers for a specific user 
(indicator of user’s weakness and strength).
 * @param {*} req User-ID
 * @param {*} res 
 */

async function weaknessStrength (req, res) {

    const userid = req.query.id;

    if(req.query.id && !isNaN(req.query.id)) {

        connection.query(`

        WITH CORRECTCOUNT AS (
            SELECT A.UserId, E.SubjectId, COUNT(DISTINCT AnswerId) AS CorrectCount
            FROM EEDI_QUESTIONS E
            JOIN ANSWERS A
            ON E.QuestionId = A.QuestionId
            WHERE IsCorrect = 1
            GROUP BY UserId, SubjectId
        ),
        CORRECTCOUNTSUMMARY AS (
            SELECT UserId, MIN(CorrectCount) AS MinCorrect, MAX(CorrectCount) AS MaxCorrect
            FROM CORRECTCOUNT
            GROUP BY UserId
        )
        SELECT M1.UserId, MinCorrectSubject, MaxCorrectSubject
        FROM
        (
            SELECT C1.UserId, SubjectId AS MinCorrectSubject
            FROM CORRECTCOUNT C1
            JOIN CORRECTCOUNTSUMMARY C2
            ON C1.UserId = C2.UserId AND C1.CorrectCount = C2.MinCorrect
        ) M1
        JOIN
        (
            SELECT C2.UserId, SubjectId AS MaxCorrectSubject
            FROM CORRECTCOUNT C1
            JOIN CORRECTCOUNTSUMMARY C2
            ON C1.UserId = C2.UserId AND C1.CorrectCount = C2.MaxCorrect
        ) M2
        ON M1.UserId = M2.UserId
        WHERE M1.UserId = ${userid} 
        LIMIT 1`


, function (error, results, fields) {

            if(error) {
                console.log(error)
                res.json({ error: error })
            } else if(results) {
                res.json({ results: results })
            }
        });
}

    }

























//ROUTE 5

/*
* Takes in a user-id and returns questions that the user can use to improve. 
*/
async function growQuestions (req, res) {


    const userid = req.query.id;

    if(req.query.id && !isNaN(req.query.id)) {

        connection.query(`

        WITH UserSubjectSummary AS (
            WITH CORRECTCOUNT AS (
                SELECT UserId, SubjectId, COUNT(DISTINCT AnswerId) AS CorrectCount
                FROM EEDI_QUESTIONS E
                JOIN ANSWERS A
                ON E.QuestionId = A.QuestionId
                WHERE IsCorrect = 1
                GROUP BY UserId, SubjectId
            ),
            CORRECTCOUNTSUMMARY AS (
                SELECT UserId, MIN(CorrectCount) AS MinCorrect, MAX(CorrectCount) AS MaxCorrect
                FROM CORRECTCOUNT
                GROUP BY UserId
            )
            SELECT M1.UserId, MinCorrectSubject, MaxCorrectSubject
            FROM
            (
                SELECT C1.UserId, SubjectId AS MinCorrectSubject
                FROM CORRECTCOUNT C1
                JOIN CORRECTCOUNTSUMMARY C2
                ON C1.UserId = C2.UserId AND C1.CorrectCount = C2.MinCorrect
            ) M1
            JOIN 
            (
                SELECT C1.UserId, SubjectId AS MaxCorrectSubject
                FROM CORRECTCOUNT C1
                JOIN CORRECTCOUNTSUMMARY C2
                ON C1.UserId = C2.UserId AND C1.CorrectCount = C2.MaxCorrect
            ) M2
            ON M1.UserId = M2.UserId
        )
        SELECT UserId, QuestionId, A.category, A.SubjectId, Problem, options
        FROM MATHQA_QUESTIONS A
        JOIN MATHCATEGORY_SUBJECT B
        ON A.category = B.category
        JOIN UserSubjectSummary C
        ON B.SubjectId = MinCorrectSubject
        WHERE UserId = ${userid}`

, function (error, results, fields) {

            if(error) {
                console.log(error)
                res.json({ error: error })
            } else if(results) {
                res.json({ results: results })
            }
        });
}

    }











module.exports = {
    hello,
    growQuestions,
    weaknessStrength,
    userCorrectness,
    question,
    subject,
}