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
});


export const registrationModel = mongoose.model("users", registrationSchema);

export const normalUserSchema = mongoose.Schema({
  userEmail : {
    type : "string",
    required : true
  },
  cart : [{
    productId : "string",
    price : Number,
    productType : "string",
    image : "string"
  }],
  productBought : [{
    productId : "string",
    price : Number,
    productType : "string",
    image : "string"
  }]
})



export const normalUserModel = mongoose.model("normalUser", normalUserSchema)


export const productsSchema = mongoose.Schema({
  userEmail : 'string',
  products : [
    {
      productId : 'string',
      productType : 'string',
      price : Number,
      image : 'string'
    },
  ],
})


export const productsModel = mongoose.model("products", productsSchema)

