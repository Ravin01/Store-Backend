import Express from "express";
import { productsModel } from "../../db/dbModels.js";
import { v4 } from "uuid";

export const productsRoute = Express.Router()


productsRoute.get('/', async(req,res)=>{
    try{
            const product = await productsModel.find({})
            if(product){
                res.send(product)
            }else{
                res.status(401).send({msg : 'error with getting product'})
            }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})



productsRoute.post('/:userEmail', async(req,res)=>{
    const payload = req.body
    const {userEmail} = req.params
    // payload = {
    //     productType = string,
    //     price = Number,
    //     image = string
    // }
    try{
        if(userEmail === 'admin@gmail.com'){
            const product = await productsModel.findOne({userEmail : userEmail})
            if(product){
                let moreProduct = {
                    productId : v4(),
                    productType : payload.productType,
                    price : payload.price,
                    image : payload.image
                }
                const addProduct = await productsModel.findOneAndUpdate({userEmail : userEmail}, { $push : {products : moreProduct}})
                if(addProduct){
                    res.send({msg : 'added successfully'})
                }else{
                    res.status(401).send({msg : 'problem with product add'})
                }
            }else{
                let firstProduct = {
                    userEmail : userEmail,
                    products : [
                        {
                            productId : v4(),
                            productType : payload.productType,
                            price : payload.price,
                            image : payload.image
                        }
                    ]
                } 
                const newProduct = await productsModel.create(firstProduct)
                if(newProduct){
                    res.send({msg : 'product added successfully'})
                }else{
                    res.status(401).send({msg : 'problem with add product'})
                }
            }
            
        }else{
            res.status(409).send({msg : 'your are not allowed to add product'})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})



productsRoute.put('/:userEmail/:productId', async(req,res)=>{
    const payload = req.body
    const {userEmail, productId} = req.params
    // payload = {
    //     productType = string,
    //     price = Number,
    //     image = string
    // }
    try{
        if(userEmail === 'admin@gmail.com'){
            let product = {
                productId : productId,
                productType : payload.productType,
                price : payload.price,
                image : payload.image
            }
            const data = await productsModel.findOne({userEmail : userEmail})
            let filterData = data.products.filter((i) => i.productId !== productId)
            // console.log(filterData)
            filterData.push(product)
            const updateData = await productsModel.findOneAndUpdate({userEmail : userEmail}, {$set : {products : filterData}})
            if(updateData){
                console.log(updateData)
                res.send({msg : 'updated successfully'})
            }else{
                res.status(402).send({msg : 'error while updating data'})
            }
        }else{
            res.status(409).send({msg : 'your are not allowed to update product details'})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


productsRoute.delete('/:userEmail/:productId', async(req,res)=>{
    const {userEmail, productId} = req.params
    try{
        if(userEmail === 'admin@gmail.com'){
            const data = await productsModel.findOne({userEmail : userEmail})
            let filterData = data.products.filter((i) => i.productId !== productId)
            let updatedData = await productsModel.findOneAndUpdate({userEmail : userEmail}, {$set : {products : filterData}})
            if(updatedData){
                res.send({msg : 'product deleted successfully'})
            }else{
                res.status(409).send({msg : 'error while deleting product'})
            }
        }else{
            res.status(409).send({msg : 'your are not allowed to delete product'})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


