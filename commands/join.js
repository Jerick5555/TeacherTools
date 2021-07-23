const Room = require( '../models/room' );
const Class = require( '../models/class' );
const mongoose = require( 'mongoose' );
const Discord = require( 'discord.js' );
const room = require( '../models/room' );

module.exports = {
    name: "join",
    description: "Lets you join a room",
    syntax: "{room/class} {code}",
    category: "Main",
    execute ( message, args )
    {
        if(args[0]){

        
            if ( args[ 0 ].toLowerCase() == "room" )
            {
                Room.findOne( { Name: args[ 1 ] }, ( err, room ) =>
                {
                    if ( err ) console.log( err );
                    if ( room != null )
                    {
                        if ( message.author.id != room.Owner )
                        {
                            if ( !room.People.includes( message.author.id ) )
                            {
                                room.People.push( message.author.id );

                                room.save()
                                    .then( result => console.log( result ) )
                                    .catch( err => console.error( err ) );
                                message.channel.send( `You have successfully joined the room!` );
                            }
                            else
                            {
                                message.channel.send( 'You have already joined the room.' )
                            }
                        }
                        else
                        {
                            message.channel.send( 'Room Owner cannot join the room!' )
                        }
                    }
                        else
                    {
                        message.channel.send( "Invaild code!" );
                    }
                } );
            }
            else if ( args[ 0 ].toLowerCase() == "class" )
            {
                Class.findOne( { Name: args[ 1 ] }, ( err, aClass ) =>
                {
                    if ( err ) console.log( err );
                    if ( aClass != null )
                    {
                        if ( message.author.id != aClass.Teacher )
                        {
                            if ( !aClass.Students.includes( message.author.id ) )
                            {
                                aClass.Students.push( message.author.id );

                                aClass.save()
                                    .then( result => console.log( result ) )
                                    .catch( err => console.error( err ) );
                                message.channel.send( `You have successfully joined the room!` );
                            }
                            else
                            {
                                message.channel.send( 'You have already joined the room.' )
                            }
                        }
                        else
                        {
                            message.channel.send( 'Room Owner cannot join the room!' )
                        }
                    }
                    else
                    {
                        message.channel.send( "Invaild code!" );
                    }
                });
            }
            else {
            message.channel.send( "Specify room or class" );
            }
        }
        else{
        message.channel.send('Please specify what to join.')
        }
    }
};