const mongoose = require('mongoose');
const Testimonial = new mongoose.Schema({
     
    name:{
         type: String
     },
     designation:{
        type: String
    },
    description: {
        type: String
    },
    Image: { 
        type: String }
});
const TestimonialModel = mongoose.model('Testimonial', Testimonial);

module.exports = TestimonialModel;