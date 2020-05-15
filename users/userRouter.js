const express = require('express');
const db = require("./userDb")
const postDb = require("../posts/postDb");

const router = express.Router();

  // user request method.
router.post('/', validateUser(), (req, res) => {
  const newUser = {
    name: req.body.name,
  }

  db.insert(newUser)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((user) => {
    res.status(500).json({
      message: "user could not be created",
    });
  });
});

//new post request 
router.post('/:id/posts', validateUser(), validatePost(), (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id,
  };

  postDb
    .insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User's post could not be created",
      });
    });
});

//get request users
router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(users => res.status(200).send(users));
});

// get request user by id
router.get('/:id', validateUser(), (req, res) => {
  res.status(200).json(req.user);

  db.getById(req.params.id)
    .then((userId) => {
      res.status(200).json(userId);
    })
    .catch((err) => {
      console.log(err);
    })
});

// get posts by id
router.get('/:id/posts', validateUserId(), (req, res) => {
  db.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    SVGPathSegCurvetoQuadraticSmoothAbs((err) => {
      console.log(err);
    });
});

// delete posts and user request
router.delete("/:id", validateUserId(), (req, res) => {
  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User failed to be deleted",
      });
    });
});

// put request 
router.put("/:id", validateUserId(), (req, res) => {
  db.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({
      message: "User cannot be updated",
    });
  });
});


//custom middleware
function validateUserId(req, res, next) {
  return (req, res, next) => {
    db.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "User ID not found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
}

  // Validating User

function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing user data",
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "Missing user name",
      });
    } else {
      next();
    }
  };
}

  // Validating post
function validatePost(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing post data",
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        errorMessage: "Missing required text field",
      });
    } else {
      next();
    }
  };
}

module.exports = router;



