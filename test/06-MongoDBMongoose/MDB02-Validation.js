


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

















///////////////////////////////////////////////////////

/**
 * MONGOOSE VALIDATION — ONE-SCREEN CHEAT SHEET (Mongoose v7+)
 * Run: node this-file.js  (requires: npm i mongoose)
 * NOTE:
 *  - trim/lowercase/uppercase are SANITIZERS (setters), not validators.
 *  - unique: true creates a UNIQUE INDEX; it is NOT a validator.
 */

const mongoose = require('mongoose');

(async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/valid_demo');

  // Helper: pretty-print validation errors
  const printErrors = (err) => {
    if (!err || !err.errors) return console.log('No validation error.');
    for (const [path, e] of Object.entries(err.errors)) {
      console.log(`✗ ${path}: ${e.message}`);
    }
  };

  /* ---------------------------------------------
   * SCHEMA: Covers all common validators & options
   * ---------------------------------------------
   */
  const UserSchema = new mongoose.Schema(
    {
      // STRING validators + sanitizers
      username: {
        type: String,
        required: [true, 'username is required'],          // required (can also be function)
        trim: true,                                        // trims whitespace (sanitizer)
        minlength: [3, 'username must be ≥ 3 chars'],
        maxlength: [30, 'username must be ≤ 30 chars'],
        match: [/^[a-z0-9_]+$/, 'username must be a-z, 0-9 or _ only'],
        lowercase: true,                                   // toLowerCase (sanitizer)
      },

      // Email with trim/lowercase/match; note unique is an index, not a validator
      email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'invalid email address'],
        unique: true, // creates unique index; does NOT validate at the app level
      },

      // ENUM (allowed values). Works with String and Number types.
      role: {
        type: String,
        enum: {
          values: ['user', 'moderator', 'admin'],
          message: 'role must be one of: user | moderator | admin',
        },
        default: 'user',
      },

      // Conditional REQUIRED — required only for admins:
      adminCode: {
        type: String,
        required: [
          function () {
            return this.role === 'admin';
          },
          'adminCode is required when role is admin',
        ],
        trim: true,
      },

      // NUMBER validators
      age: {
        type: Number,
        min: [13, 'age must be ≥ 13'],                    // min
        max: [120, 'age must be ≤ 120'],                  // max
        validate: {
          validator: Number.isInteger,
          message: 'age must be an integer',
        },
      },

      // DATE validators
      dob: {
        type: Date,
        max: [new Date(), 'dob cannot be in the future'],
      },

      // BOOLEAN with custom rule
      termsAccepted: {
        type: Boolean,
        required: true,
        validate: { validator: v => v === true, message: 'you must accept terms' },
      },

      // ARRAYS (of strings) — enum on elements + min/max length on array itself
      tags: [{ type: String, enum: ['tech', 'news', 'music', 'sports'] }], // element-level enum
      skills: {
        type: [String],
        minlength: [1, 'at least 1 skill required'],       // array length ≥ 1
        maxlength: [10, 'at most 10 skills allowed'],      // array length ≤ 10
        validate: {
          validator: arr => new Set(arr).size === arr.length,
          message: 'skills must be unique (no duplicates)',
        },
      },

      // OBJECTID — format validation; to ensure existence, use async validator (example below)
      manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
          validator: v => !v || mongoose.isValidObjectId(v),
          message: 'manager must be a valid ObjectId',
        },
      },

      // NESTED OBJECT + match
      address: {
        street: { type: String, trim: true },
        zip: {
          type: String,
          required: [true, 'zip is required'],
          match: [/^\d{5}(-\d{4})?$/, 'zip must be 12345 or 12345-6789'],
        },
      },

      // Cross-field validation: endDate must be after startDate
      startDate: Date,
      endDate: {
        type: Date,
        validate: {
          validator: function (v) {
            if (!v || !this.startDate) return true;
            return v > this.startDate;
          },
          message: 'endDate must be after startDate',
        },
      },

      // SUBDOCUMENTS — each subdoc can have its own validations
      posts: [
        {
          title: { type: String, required: true, trim: true },
          body: { type: String, required: true, minlength: 10 },
          createdAt: { type: Date, default: Date.now, immutable: true }, // immutable (setter guard)
        },
      ],

      // MAP with value validation and overall map-size constraint
      meta: {
        type: Map,
        of: { type: String, maxlength: [50, 'meta values must be ≤ 50 chars'] },
        validate: {
          validator: m => !m || m.size <= 10,
          message: 'meta can have at most 10 keys',
        },
      },

      // Custom validator (array syntax) example — even-length string
      referralCode: {
        type: String,
        validate: [
          v => !v || v.length % 2 === 0,
          'referralCode length must be even',
        ],
      },
    },
    { timestamps: true }
  );

  // INDEXES (remember: unique is not a validator — it throws duplicate key error from MongoDB)
  UserSchema.index({ email: 1 }, { unique: true });

  // Example: Async validator to ensure referenced manager actually EXISTS in DB
  // (Uncomment to enforce)
  // UserSchema.path('manager').validate({
  //   validator: async function (id) {
  //     if (!id) return true;
  //     const exists = await this.constructor.exists({ _id: id });
  //     return !!exists;
  //   },
  //   message: 'manager user does not exist',
  // });

  const User = mongoose.model('User', UserSchema);

  /* ---------------------------------------------
   * DEMO — create invalid & valid docs
   * ---------------------------------------------
   */
  // 1) INVALID EXAMPLE — triggers many validators
  try {
    const bad = new User({
      username: 'X',                  // too short (minlength)
      email: 'not-an-email',          // fails match
      role: 'superuser',              // not in enum
      // adminCode missing but role isn't admin (ok); if role=admin, would be required
      age: 12.5,                      // < 13 and not integer
      dob: new Date('2999-01-01'),    // future
      termsAccepted: false,           // must be true
      tags: ['tech', 'invalid'],      // 'invalid' not in enum
      skills: ['js', 'js'],           // duplicates; and array length ok
      manager: '123',                 // invalid ObjectId
      address: { zip: 'ABC' },        // fails match; street optional
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-01'),// endDate before startDate
      posts: [{ title: 'Hi', body: 'short' }], // body minlength 10
      meta: new Map([
        ['one', 'ok'],
        ['two', 'x'.repeat(60)],      // value too long
      ]),
      referralCode: 'abc',            // odd length (3)
    });
    await bad.validate(); // or await bad.save() to also hit unique index errors
  } catch (err) {
    console.log('\n--- INVALID DOC ERRORS ---');
    printErrors(err);
  }

  // 2) VALID EXAMPLE — passes all validators
  try {
    const ok = await User.create({
      username: 'john_doe',
      email: 'john@example.com',
      role: 'user',
      age: 25,
      dob: new Date('1999-05-05'),
      termsAccepted: true,
      tags: ['tech', 'music'],
      skills: ['javascript', 'node', 'react'],
      address: { street: '42 Main St', zip: '12345-6789' },
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-10'),
      posts: [{ title: 'Hello', body: 'This is a valid post body.' }],
      meta: new Map([['github', 'ajaymude']]),
      referralCode: 'ABCD',
    });
    console.log('\n✓ Created valid user:', ok.username, ok.email);
  } catch (err) {
    console.log('\nUnexpected error creating valid user:');
    console.error(err);
  }

  // 3) UNIQUE INDEX DEMO — duplicate email will throw Mongo duplicate key (not a validator)
  try {
    await User.create({
      username: 'another_user',
      email: 'john@example.com', // duplicate of the valid user above
      age: 20,
      termsAccepted: true,
      address: { zip: '12345' },
    });
  } catch (err) {
    console.log('\n--- DUPLICATE KEY (unique index) ---');
    console.log(err?.code === 11000 ? '✗ duplicate email (E11000)' : err);
  }

  // 4) UPDATE VALIDATORS — use runValidators: true
  //    Also pass { context: 'query' } if your validators depend on "this".
  const u = await User.findOne({ email: 'john@example.com' });
  try {
    await User.updateOne(
      { _id: u._id },
      { age: 10 },                           // violates min 13
      { runValidators: true }
    );
  } catch (err) {
    console.log('\n--- UPDATE (runValidators) ERRORS ---');
    // Update errors come as a ValidationError too
    printErrors(err);
  }

  // 5) validateSync example
  const doc = new User({ address: { zip: '12' }, termsAccepted: true, email: 'a@b.c' });
  const syncErr = doc.validateSync();
  if (syncErr) {
    console.log('\n--- validateSync ERRORS ---');
    printErrors(syncErr);
  }

  await mongoose.disconnect();
})().catch(console.error);

/* ========================= QUICK REFERENCE =========================
STRING:
  required, trim, minlength, maxlength, match, enum, lowercase, uppercase
NUMBER:
  min, max, enum (also works for numbers), custom validate
DATE:
  min, max
BOOLEAN:
  custom validate (e.g., must be true)
ARRAY:
  minlength, maxlength (array length), element-level validators (e.g., enum), custom validate
OBJECTID:
  format check via mongoose.isValidObjectId; existence check via async validator
CUSTOM:
  validate: [fn, 'msg']  OR  validate: { validator, message }
CONDITIONAL REQUIRED:
  required: [function(){ return this.role === 'admin' }, 'msg']
UNIQUE INDEX (NOT a validator):
  path: { unique: true }  + ensure index is created; catches duplicates with code 11000
UPDATES:
  use { runValidators: true } (and { context: 'query' } if "this" is needed)
===================================================================== */
