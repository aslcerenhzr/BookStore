import mongoose from "mongoose";

//mongodb conn
var mongoURL = 'mongodb+srv://user:user123@cluster0.m1tf4.mongodb.net/Book'

const connectDB = () => {
    mongoose.connect(mongoURL, {
        useUnifiedTopology: true, useNewUrlParser: true,  tlsAllowInvalidCertificates: true, ssl: true
    });

    var connection = mongoose.connection
    connection.on('error', (error) => {
        console.log('Mongo DB Connection failed')
    })

    connection.once('open', () => {
        console.log('Mongo DB Connection successful')
    })
}
export default connectDB; 