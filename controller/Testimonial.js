const logger = require('../logger/logger');
const TestimonialModel = require('../model/Testimonial_Model');

exports.addTestimonial = async (req, res) => {
    try {
      res.render("addTesti");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  exports.Testimonial = async (req, res) => {
    try {
     const userData = await TestimonialModel.find();
     console.log(userData)
      res.render("Testimonial", { userData: userData });
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.showTestimonial = async(req, res) => {
    res.render('addTesti', {
        values: req.body,
    })
}

exports.addData = (req, res) => {
  try {
    console.log(req.file.filename);
      const data = {
        name: req.body.name,
        designation: req.body.designation,
        description: req.body.description,
        Image: req.file.filename,
      };

      const testData = new TestimonialModel(data);
      testData.save().then((data) => {
        res.redirect("/addTesti");
      });
    
  } catch (err) {
    console.log(err);
  }
};


exports.editTest = (req, res) => {
  console.log(req.params)
  TestimonialModel.findById(req.params.id, function (err, result) {
    console.log(result)
    res.render("editTestimonial", {
      users: result,
    });
  });
};

exports.editData = async (req, res) => {
  try {
   
    const data = {
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
    };

    if (req.file) {
      data.Image = req.file.filename;
    }

    await TestimonialModel.findByIdAndUpdate(req.params.id, data);
    res.redirect("/addTesti");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  TestimonialModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `cannot Delete user with ${id}.May be is wrong` });
      } else {
        res.redirect("/addTesti");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id" + id,
      });
    });
};

