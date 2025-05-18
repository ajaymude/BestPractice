


// Schema for the validation 

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/validationDemo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Schema with all validations
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: [3, 'Username must be at least 3 characters'],
    maxLength: [15, 'Username must be at most 15 characters']
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Email format is invalid']
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18'],
    max: [65, 'Must be under 65']
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: 'Role must be user, admin, or moderator'
    },
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number`
    }
  },
  password: {
    type: String,
    required: function () {
      return this.role !== 'guest'; // conditional required
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Model
const User = mongoose.model('User', userSchema);

// Example: Create a new user with invalid data to trigger validations
async function testValidations() {
  try {
    const newUser = new User({
      username: 'Jo',
      email: 'not-an-email',
      age: 17,
      role: 'superadmin',
      phone: '12345abcde',
      password: ''
    });

    await newUser.save();
  } catch (err) {
    console.log('\n❌ Validation Errors:');
    for (let field in err.errors) {
      console.log(`- ${field}: ${err.errors[field].message}`);
    }
  } finally {
    mongoose.disconnect();
  }
}

testValidations();




// output 

❌ Validation Errors:
- username: Username must be at least 3 characters
- email: Email format is invalid
- age: Must be at least 18
- role: Role must be user, admin, or moderator
- phone: 12345abcde is not a valid 10-digit phone number
