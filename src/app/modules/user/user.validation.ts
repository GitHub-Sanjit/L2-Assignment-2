// import Joi from 'joi';
import Joi from 'joi';


export const orderValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().positive().required(),
})

const userValidationSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  username: Joi.string().allow('').optional(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().integer().optional(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(
    Joi.string().valid(
      'reading',
      'traveling',
      'photography',
      'gardening',
      'painting',
      'swimming',
      'writing',
      'cooking',
      'yoga',
      'hiking',
    ),
  ),
  address: Joi.object({
    street: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    country: Joi.string().allow('').optional(),
  }).optional(),
  orders: Joi.array().items(orderValidationSchema).default([]),
  isDeleted: Joi.boolean().default(false),
})

export default userValidationSchema
