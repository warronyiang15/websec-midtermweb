import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { csrfErrorHandler, doubleCsrfProtection } from "./csrf";
import rootRouter from "./routes";
// import {prisma } from "./adapters";

const port = process.env.PORT || 8000;

const app = express();

//! Limit it to 1MB enough
app.use(express.json({limit: '1mb'}));

if( process.env.NODE_ENV === 'production' ){
    app.set('trust proxy', 1);
}


app.use(
    session({
        cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: null, // session cookie
        },
        // use random secret
        name: "sessionId", // don't omit this option
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(cookieParser());
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);
app.use(rootRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
