const usercontroller = {};
const { error } = require("winston");
const { User } = require("../models");
const { router } = require("../routes");
const Op = require("sequelize").Op;

/**
 * @method POST
 * @name create
 * @body {firstName: STRING,
    lastName: STRING,
    email: STRING,
    password:STRING,
    username string,
    profilePic: STRING,
  }
 * @description metodo para registrar un usuario.
     debe corroborar que no el usuario no este registrado previamente ( no pueden coincidir username o mail)
 */
usercontroller.create = async (req, res) => {
  try {
    
    //buscamos el usuario
    u = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: req.body.email,
            username: req.body.username,
          },
        ],
      },
    });
    if (u) {
      console.log(u)
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    if(req.file){
      req.body.profilePic  = process.env.DIRECCION +"/public/"+ req.file.filename
    }
    
    User.create(req.body);
    return res.status(200).json({ msg: "usuario creado correctamente" });
  } catch(error) {
    console.log(error)
    return res.status(400).json({ msg: "Error creando el usuario" });
  }
};
//getOne
usercontroller.getOne =  async  (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
       res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

//get ALL
usercontroller.getAll =  (req, res) => {
  User.findAll()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
//edit
usercontroller.edit =  async  (req, res) => {
  req.body.profilePic  = process.env.DIRECCION +"/public/"+ req.file.filename
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
//delete
usercontroller.delete =  async  (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = usercontroller;