const Room = require( '../models/room' );
const Classroom = require( '../models/class' );
const mongoose = require( 'mongoose' );
const Discord = require( 'discord.js' );
const room = require( '../models/room' );
const Client = require( '../index' ).client;

module.exports = {
    name: "show",
    description: "Shows people in the room.",
    syntax: "{room/class} {room code}",
    category: "Main",
    execute ( message, args )
    {
        if ( args[ 0 ] == 'room' )
        {
            Room.findOne( { Name: args[ 1 ] }, ( err, room ) =>
            {
                if ( err ) console.log( err );
                if ( room != null )
                {
                    const embed = new Discord.MessageEmbed()
                        //can be formatted better
                        .setTitle( `Room Code: ${ args[ 1 ] }` )
                        .setColor( '#000000' )
                        //access the new db here future matthew..
                        .addField( "Owner: ", `<@${room.Owner}>`, true )
                        if(room.__v != 0){
                            let pings = []
                            for (let i = 0; i < room.__v; i++){
                                pings.push(`<@${room.People[i]}>`)
                            }     
                            embed.addField( 'Participants: ', pings.join( '\n' ))
                        }
                        else{
                            embed.addField( 'Participants: ', 'Class Empty')
                        }

                    message.channel.send( embed );
                }

                else
                {
                    message.channel.send( "Invaild code!" );
                }
            } );
        }
        else if ( args[ 0 ] == 'class' ) {
        Classroom.findOne( { Name: args[ 1 ] }, ( err, classroom ) =>
        {
            if ( err ) console.log( err );
            if ( classroom != null )
            {
                console.log(`<@${classroom.Teacher}>`)
                message.channel.send(`<@${classroom.Teacher}>`)
                const embed = new Discord.MessageEmbed()
                    //can be formatted better
                    .setTitle( `Room Code: ${ args[ 1 ] }` )
                    .setColor( '#000000' )
                    //access the new db here future matthew..
                    .addField( "Teacher: ", `<@${classroom.Teacher}>`, true )
                    if(classroom.__v != 0){
                        let pings = []
                        for (let i = 0; i < classroom.__v; i++){
                            pings.push(`<@${classroom.Students[i]}>`)
                        }     
                        embed.addField( 'Classmates: ', pings.join( '\n' ))
                    }
                    else{
                        embed.addField( 'Classmates: ', 'Class Empty')
                    }
                    
                message.channel.send( embed );
            }

            else
            {
                message.channel.send( "Invaild code!" );
            }
        } );
    }
    else{
        message.channel.send( "Please specify the class/room." );
    }
}
};