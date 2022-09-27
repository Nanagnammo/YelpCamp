const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // MY USER ID
            author: '630d923cd298a0d4b9427086',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, minima saepe ipsa eaque esse sint at odio perferendis qui aliquid modi placeat blanditiis quasi, facere rem corrupti est. Iste, ipsam.',
            price,
            geometry:{
                type: "Point",
                coordinates: [14.248783, 40.835934]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991623/YelpCamp/mbrpybrhhw2gf4p15eoc.jpg',
                  filename: 'YelpCamp/mbrpybrhhw2gf4p15eoc'
                },
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991629/YelpCamp/lhmn2a7r4ajf2yogk4bi.jpg',
                  filename: 'YelpCamp/lhmn2a7r4ajf2yogk4bi'
                },
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991630/YelpCamp/igskehaustjiotz6rekq.jpg',
                  filename: 'YelpCamp/igskehaustjiotz6rekq'
                },
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991639/YelpCamp/i1okj4xxqpuazkdfijlu.jpg',
                  filename: 'YelpCamp/i1okj4xxqpuazkdfijlu'
                },
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991644/YelpCamp/snwiritw3ioqjuc4leg6.jpg',
                  filename: 'YelpCamp/snwiritw3ioqjuc4leg6'
                },
                {
                  url: 'https://res.cloudinary.com/spacemicrowave/image/upload/v1662991650/YelpCamp/l6arfbcyarlnkdowkdfd.jpg',
                  filename: 'YelpCamp/l6arfbcyarlnkdowkdfd'
                }
              ]
        });
        await camp.save();
    }
};

seedDB().then(()=>{
    mongoose.connection.close();
});