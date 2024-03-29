import inquirer from 'inquirer';
import fetch from 'node-fetch';
import fs from 'fs';

let token = '';
let guilds = [];
let emojis = [];

async function main() {
    if (!fs.existsSync('./dl')) {
        fs.mkdirSync('./dl');
    }

    const tokenResponse = await inquirer.prompt([
        {
            type: 'password',
            name: 'token',
            message: 'Please enter your discord token',
        }
    ]);
    token = tokenResponse.token;
    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
            authorization: token,
        },
    });
    guilds = await guildsResponse.json();
    guilds.push({ name: 'All guilds', id: 'all' }); // Add an option to download all emojis from all guilds

    const guildSelectionResponse = await inquirer.prompt([
        {
            type: 'list',
            name: 'guild',
            message: 'Please select a guild',
            choices: guilds.map(guild => guild.name),
        }
    ]);

    if (guildSelectionResponse.guild === 'All guilds') {
        for (const guild of guilds) {
            if (guild.id === 'all') continue;
            const emojisResponse = await fetch(`https://discord.com/api/v10/guilds/${guild.id}/emojis`, {
                headers: {
                    authorization: token,
                },
            });
            emojis = await emojisResponse.json();
            for (const emoji of emojis) {
                console.log(`Downloading ${emoji.name}`);
                await fetch(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`).then(res => {
                    // need to replace invalid characters in guild name (only a-zA-Z0-9 and space are allowed)
                    guild.name = guild.name.replace(/[^a-zA-Z0-9 ]/g, '');
                    const dest = fs.createWriteStream(`./dl/${guild.name}-${emoji.name}.${emoji.animated ? 'gif' : 'png'}`);
                    res.body.pipe(dest);
                });
            }
        }
        return;
    }

    const guild = guilds.find(guild => guild.name === guildSelectionResponse.guild);
    const emojisResponse = await fetch(`https://discord.com/api/v10/guilds/${guild.id}/emojis`, {
        headers: {
            authorization: token,
        },
    });
    emojis = await emojisResponse.json();

    const downloadSelectionResponse = await inquirer.prompt([
        {
            type: 'list',
            name: 'download',
            message: 'Please select an option',
            choices: ['Download all emojis', 'Download individual emoji'],
        },
    ]);

    if (downloadSelectionResponse.download === 'Download all emojis') {
            for (const emoji of emojis) {
                console.log(`Downloading ${emoji.name}`);
                await fetch(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`).then(res => {
                    const dest = fs.createWriteStream(`./dl/${emoji.name}.${emoji.animated ? 'gif' : 'png'}`);
                    res.body.pipe(dest);
                });
        }
    } else {
    const emojiSelectionResponse = await inquirer.prompt([
        {
            type: 'list',
            name: 'emoji',
            message: 'Please select an emoji',
            choices: emojis.map(emoji => emoji.name),
        },
    ]);

    const emoji = emojis.find(emoji => emoji.name === emojiSelectionResponse.emoji);
    await fetch(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`)
        .then(res => {
            const dest = fs.createWriteStream(`./dl/${emoji.name}.${emoji.animated ? 'gif' : 'png'}`);
            res.body.pipe(dest);
        });
    }
}

main();