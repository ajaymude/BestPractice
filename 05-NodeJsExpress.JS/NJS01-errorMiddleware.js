const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // NOTE: checking for invalid ObjectId moved to it's own middleware
  // See README for further info.

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;












// errorHandler 

// 

// project setup 



// db connnection 





// 404 handler 
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound

app.use(notFound);
app.use(errorHandlerMiddleware);

// error handler 

// creating a error object 
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}


 CustomAPIError('message', 500) // we are calling the constructor of the class
 // super is used to call the constructor of the parent class
 // this.statusCode = statusCode // this is used to set the value of the statusCode property of the class 

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }





// if the user have 4 argument in the function it is mean it is a 
// global error handler 

const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware








// async wrapper 
// if we pass any any value in next() , it will call the global error handler 
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper









// controller with the async wrapper 
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})


// controller with the error handler
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})






// route setup for the 

const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
router.get('/' , funName);

module.exports = router





// param middleware 

const express = require('express');
const app = express();
const router = express.Router();

// Dummy user database
const users = {
  1: { id: 1, name: "Alice" },
  2: { id: 2, name: "Bob" }
};

// Define router.param middleware for 'userId'
router.param('userId', (req, res, next, userId) => {
  const user = users[userId];
  if (user) {
    req.user = user; // attach the user to the request
    next();
  } else {
    res.status(404).send('User not found');
  }
});

// Route that uses the userId param
router.get('/users/:userId', (req, res) => {
  res.send(`User Name: ${req.user.name}`);
});

// Mount the router
app.use('/', router);

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});




































export const asyncHandler = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};







// make a list of the built in class in  the js 
// what is the class in the js , why we use tthis , 
// learn the every this about the class 
// how to create the class 
// what is the advance feature of the class 
// what is the constructe in the class 
// what is the super , this called constructor of the parent class 
// what is the instance of the class 