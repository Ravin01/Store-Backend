import mongoose from "mongoose";

export const registrationSchema = mongoose.Schema({
  userId: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
  },
  userEmail: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role : Number
});


export const registrationModel = mongoose.model("users", registrationSchema);

export const normalUserSchema = mongoose.Schema({
  userEmail : {
    type : "string",
    required : true
  },
  cart : [{
    productName : 'string',
    productId : "string",
    price : 'string',
    productType : "string",
    image : "string"
  }],
  productBought : [{
    productName : 'string',
    productId : "string",
    price : 'string',
    productType : "string",
    image : "string"
  }]
})



export const normalUserModel = mongoose.model("normalUser", normalUserSchema)


export const productsSchema = mongoose.Schema({
  userEmail : 'string',
  products : [
    {
      productName : 'string',
      productId : 'string',
      productType : 'string',
      price : 'string',
      image : 'string'
    },
  ],
})


export const productsModel = mongoose.model("products", productsSchema)

