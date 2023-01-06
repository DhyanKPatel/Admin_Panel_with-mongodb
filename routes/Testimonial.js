const express = require('express');
const router = express();
const Testimonial = require('../controller/Testimonial');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  }
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

router.post('/addTestimonial',Testimonial.addTestimonial);
router.get('/addTesti',Testimonial.Testimonial);
router.get('/showTestimonial',Testimonial.showTestimonial);
router.post("/api/testimonial",upload.single('Image'),Testimonial.addData);
router.get("/editTestimonial/:id",Testimonial.editTest);
router.post("/api/testimonial/update/:id",upload.single("Image"),Testimonial.editData);
router.get("/api/testimonial/delete/:id",Testimonial.deleteData);

module.exports = router;