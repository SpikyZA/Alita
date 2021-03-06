const Discord = require('discord.js');

module.exports = {

  //Information about command
  name: "setlog",
  desc: "Set the log channel for your server",
  usage: "setlogs #channel",
  enabled: true,
  aliases: ["setlog"],
  category: "Admin",
  userPermissions: [ "ADMINISTRATOR" ],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  donator: false,
  cooldown: 5000,

  //Execute to command once the settings have been checked
  async execute(client, message, args, data){
    try{

      if(!args[0]){
        let content = `${message.guild.name}'s logChannel is:`+ "<#" + data.guild.prefix + ">" +`\n\nTo set up a new reportchannel use ` + "`" + data.guild.prefix + "setlog #channel`"
        return message.channel.send(content)
      }

//       if(args[0].length > 5){
//         let content = `Unable to assign prefix, make sure the prefix length is less than \`5 characters!\`\n\`\`\`${data.guild.prefix}setprefix [prefix]\`\`\``
//         return message.channel.send(content)
//       }
      
      let channel = message.mentions.channels.first().id;
      
      if(!channel) {
        let content = "You did not specify/mention a log channel! Please mention a channel";
        return message.channel.send(content);

      data.guild.logChannel = channel;
      await data.guild.save();

      let content = `Prefix has been successfully updated to <#${data.guild.logChannel}>`;
      return message.channel.send(content)

    } catch (err){
      //Log error into the database
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
      console.log(err)
    }

  },
};
