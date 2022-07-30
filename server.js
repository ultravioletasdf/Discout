// Server dependencies 
const express = require("express");
const app = express();

// Manage files
const fs = require('fs');

// Manage local storage
const storage = require('store2');
const http = require("http");
const { isContext } = require("vm");
require('dotenv').config();

// Send alerts
const alert = require("alert");
const axios = require('axios');

const tools = require('./tools.js');

// Discord oAuth
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CREDS = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const REDIRECT = encodeURIComponent("http://localhost:3000/login");
const { URLSearchParams } = require('url');

// Use public directory
app.use(express.static(__dirname + '/public'));

// Set view engine for reading files
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let currentViews = parseInt(fs.readFileSync("public/views.txt"));
    currentViews++;
    fs.writeFileSync("public/views.txt", currentViews.toString());
    console.log(currentViews);
    const avatarUrl = `https://cdn.discordapp.com/avatars/${storage.get("id") ?? "undefined"}/${storage.get("avatar") ?? "undefined"}.png`
    res.render('index', { avatar: avatarUrl.includes("undefined") ? undefined : avatarUrl});
});

app.get('/login', async (req, res) => {
    if (req.query.code) {
        // Prepare params
        const params = new URLSearchParams();
        params.append('client_id', CLIENT_ID);
        params.append('client_secret', CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', 'http://localhost:3000/login');
        params.append('scope', 'identify');
        params.append('code', req.query.code);
        
        // Exchange for access token
        let response;
        try {
            response = await axios({
                method: 'post',
                url: `https://discord.com/api/oauth2/token`,
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                data: params
            });
        }
        catch (e) {
            // Try again if there is an error
            return res.redirect("https://discord.com/api/oauth2/authorize?client_id=978320738232717383&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds")
        }
        res.redirect(`login/?token=${response.data.access_token}`);
    }
    else if (req.query.token) {
        const response = await axios({
            method: 'post',
            url: 'http://discordapp.com/api/users/@me',
            headers: {
                Authorization: `Bearer ${req.query.token}`
            }
        });
        const user = response.data;
        storage(user);
        console.log(user);
        res.redirect("http://localhost:3000/")
    }
    else {
        res.redirect('https://discord.com/api/oauth2/authorize?client_id=978320738232717383&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds');  
    }
})
/*
app.get('/login', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=978320738232717383&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds');
});
*/
app.listen(3000);