const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BqS2JxY1I0UE1mZ2RXNC9uNDU2cVE4V3F4b3ZRcTRqL0lzMVhxTVFsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2pibkM4MytmdmxZTU02MUxDUlo5U2FucTV0SkQxcXVHYWl4ZlJ5WmRDdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QUx0alRaTEJjUE43cjgxZGlLUHY1L1lWVEJrbWtmaWhkQzN6UVkxRWxBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsTXZqTTdXU3AzR2owN05TK25IT2Q1UzlCdlRhOGVIWUdhOTRCaXBhY0RJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlDVzVYYUdCc043OFdBS2psUUxzejdqYjFvVXdRTzRaR3g5YXN2VHBybjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM4ci9mYnJ3a1BNK1FrenNramJNRlpVbkJ1Z0Z4Y05FZnlLa1hGWit6Qmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0lQanBlUGNuQzVPTG5yS0Y5TldJU2pXdE9NZ2o0M3NwWVBtNm12OHQyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFQ2Q2hkTisyd1pKS290czdYemY4SU1rc3NXSzk3Zk85VTZZZ0pZTHFWcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN4cFFia1NBcnBpY1NCNUlRSzRTTlpDOWM4TENDR1ZMNk55MkxDbkdPZ3ljU011dHBjS1FIdUZTNEdjdmYvQUJIcmRUcTAxM3JGYXZTR2haRi9sVWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJNOVhuWkxQZ1dXc3ExTFBGeEZqdERLR09ER1diR056c215NFF1b1JWb2c4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4U0VHNVVZZVJqcXBEaHVPb2gwbzVRIiwicGhvbmVJZCI6Ijk0ZmFjMmFiLTI0MWMtNGYwNS05ZWM0LTg1YWM0NDYzOTM5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhc2FWV0ZJdmdlZElHTTJ5WHQ0TTdFUFE4VEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzFGWXRBTWpSUUFsTXd3ZktKSnJVL2ZhUGx3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldOTTVXMkVZIiwibWUiOnsiaWQiOiIyMzQ4MTA1MzcwMjI1OjY0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Isi/x7/Fgce/yL/GmcmoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMdlcvYlFIRU4vR3piWUdHQkFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6dWdwSnVTZjRXeFRGc29oT1N3OXFlODdaV0JTU1M2U3VlMWo0bWxQa0JZPSIsImFjY291bnRTaWduYXR1cmUiOiJKcTd4MEhsU0xSeXIxWnZod3JXR2x1UkZLSmhPVTY3eDNrWWtUbVpNRGFsa0RpOEszanRhcHZETm14T1hzM0tlUUNHN3N2czFOUzBZaDBPRkh0T3pCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibjBvSEN4YjVWcGR0M3lib2R6K2JOU2dkNkNkTUlwdnA3c2ZheEM4ZVRWRXJiOUdDQXhBS1FWVU9Cd0QzNVBkYlFTZXJWZ0pjYWNQN0d1OWVHNU42Z3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTA1MzcwMjI1OjY0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmM3b0tTYmtuK0ZzVXhiS0lUa3NQYW52TzJWZ1Vra3Vrcm50WStKcFQ1QVcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjUxMjk1ODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHlVIn0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Demon slayer",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348105370225",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
