﻿
/**********************************************************
 * @INFO  [TABLE OF CONTENTS]
 * 1  Import_Modules
   * 1.1 Validating script for advertisement
 * 2  CREATE_THE_DISCORD_BOT_CLIENT
 * 3  Load_Discord_Buttons_and_Discord_Menus
 * 4  Create_the_client.memer
 * 5  create_the_languages_objects
 * 6  Raise_the_Max_Listeners
 * 7  Define_the_Client_Advertisments
 * 8  LOAD_the_BOT_Functions
 * 9  Login_to_the_Bot
 * 
 *   BOT CODED BY: BestGamersHK6966 | https://milrato.eu
 *********************************************************/



/**********************************************************
 * @param {1} Import_Modules for this FIle
 *********************************************************/
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap");
const fs = require("fs");
const OS = require('os');
const Events = require("events");
const emojis = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")
const advertisement = require("./botconfig/advertisement.json")
const { delay } = require("./handlers/functions")
require('dotenv').config()


/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings
 *********************************************************/
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users" ],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_BANS,
  Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  Discord.Intents.FLAGS.GUILD_INVITES,
  Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  Discord.Intents.FLAGS.GUILD_PRESENCES,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Discord.Intents.FLAGS.DIRECT_MESSAGES,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activities: [{ name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url }],
    status: "online"
  }
});



/**********************************************************
 * @param {4} Create_the_client.memer property from BestGamersHK's Api 
 *********************************************************/
const Meme = require("memer-api");
client.memer = new Meme(process.env.memer_api || config.memer_api); // GET a TOKEN HERE: https://discord.gg/Mc2FudJkgP





/**********************************************************
 * @param {5} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = {}
var langs = fs.readdirSync("./languages")
for (const lang of langs.filter(file => file.endsWith(".json"))) {
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions 




/**********************************************************
 * @param {6} Raise_the_Max_Listeners to 0 (default 10)
 *********************************************************/
client.setMaxListeners(0);
Events.defaultMaxListeners = 0;
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;
/**********************************************************
 * @param {8} Dashboard
 *********************************************************/
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path')
const app = express();
app.set('views', path.join(__dirname, 'dashboard', 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: false
}));

passport.use(new DiscordStrategy({
  clientID: 'YOUR_DISCORD_CLIENT_ID',
  clientSecret: 'YOUR_DISCORD_CLIENT_SECRET',
  callbackURL: 'https://yourdomain.com/auth/discord/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Handle user authentication, store user details, create session/token, etc.
  // 'profile' contains user information returned by Discord after authentication.
  return done(null, profile);
}));

// Route to start the authentication process
app.get('/auth/discord', passport.authenticate('discord'));

// Callback route after successful authentication
app.get('/auth/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/' // Redirect to homepage on failure
}), (req, res) => {
  // Successful authentication, handle further actions (e.g., redirect to dashboard)
  res.redirect('/dashboard');
});
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.redirect('/');
  }
  res.render('dashboard', { user });
});

app.get('/login', (req, res) => {
  req.session.user = {
    username: 'JohnDoe' // Simulated user login
  };
  res.redirect('/dashboard');
});

app.get('/invite', (req, res) => {
  const inviteURL = `YOUR_BOT_INVITE_URL`;
  res.render('invite', { inviteURL });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Dashboard is running on http://localhost:${PORT}`);
});
app.get('/invite', (req, res) => {
  const inviteURL = 'YOUR_BOT_INVITE_URL'; // Replace with your actual bot's invite URL
  res.render('invite', { inviteURL });
});
/**********************************************************
 * @param {7} Define_the_Client_Advertisments from the Config File
 *********************************************************/
client.ad = {
  enabled: advertisement.adenabled,
  statusad: advertisement.statusad,
  spacedot: advertisement.spacedot,
  textad: advertisement.textad
}
//

const configFile = path.join(__dirname, '/dashboard/config.json'); // Define the path to config.json

try {
  const configData = JSON.parse(fs.readFileSync(configFile, 'utf8')); // Read and parse the JSON file
  const botPrefix = configData.prefix;

  client.on('message', (message) => {
    if (message.content === `${botPrefix}ping`) {
      message.channel.send('Pong!');
    }
  });
} catch (err) {
  console.error('Error reading or parsing the config file:', err);
}


/**********************************************************
 * @param {8} LOAD_the_BOT_Functions 
 *********************************************************/
//those are must haves, they load the dbs, events and commands and important other stuff
function requirehandlers() {
  ["extraevents", "clientvariables", "command", "loaddb", "events", "erelahandler", "slashCommands"].forEach(handler => {
    try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  ["twitterfeed", /*"twitterfeed2",*/ "livelog", "youtube", "tiktok"].forEach(handler => {
    try { require(`./social_log/${handler}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  ["logger", "anti_nuke", "antidiscord", "antilinks", "anticaps", "antispam", "blacklist", "keyword", "antimention", "autobackup",

    "apply", "ticket", "ticketevent",
    "roster", "joinvc", "epicgamesverification", "boostlog",

    "welcome", "leave", "ghost_ping_detector", "antiselfbot",

    "jointocreate", "reactionrole", "ranking", "timedmessages",

    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat", "mute", "automeme", "counter"].forEach(handler => {
      try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
    });
} requirehandlers();


/**********************************************************
 * @param {9} Login_to_the_Bot
 *********************************************************/
client.login(process.env.token || config.token);


/**********************************************************
 * @INFO
 * Bot Coded by bestgamershk2 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 *********************************************************/