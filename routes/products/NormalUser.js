import Express from "express";
import { normalUserModel, registrationModel } from "../../db/dbModels";

export const normalUserRoute = Express.Router()

normalUserRoute.get('/:userEmail', async(req,res)=>{
    const {userEmail} = req.params
    try{
        const checkUser = await registrationModel.findOne({userEmail : userEmail})
        if(checkUser){
            const data = await normalUserModel.findOne({userEmail : userEmail},{_id : 0, userEmail : 1, cart : 1, productBought : 1})
            if(data){
                res.send(data)
            }else{
                res.status(401).send({msg : 'user data is not found'})
            }
        }else{
            res.status(409).send({msg : 'user not yet registered'})
        }
    }catch(err){
        console.error(err)
        res.status(500).send({msg : 'server error'})
    }
})


normalUserRoute.post('/cart/:userEmail', async(req,res)=>{
    const payload = req.body
    const {userEmail} = req.params
    try{
        const checkUser = await registrationModel.findOne({userEmail : userEmail})
        if(checkUser){
            const checkCart = await normalUserModel.findOne({userEmail : userEmail})
            if(checkCart){
                const checkCartData = checkCart.cart.find((item) => item.productId === payload.productId)
                if(checkCartData){
                    res.status(409).send({msg : 'already added'})
                }else{
                    const addCart = await normalUserModel.findOneAndUpdate({userEmail : userEmail}, {$push : {cart : payload}})
                    if(addCart){
                        res.send({msg : 'added successfully'})
                    }else{
                        res.status(402).send({msg : 'error while adding cart'})
                    }
                }
            }else{
                const newCart = {
                    userEmail : userEmail,
                    cart : [
                        {
                            productId : payload.productId,
                            price : payload.price,
                            productType : payload.productType,
                            image : payload.image,
                        }
                    ],
                    productBought : []
                }
                const created = await normalUserModel.create(newCart)
                if(created){
                    res.send({msg : 'created'})
                }else{
                    res.status(401).send({msg : 'error while creating cart'})
                }
            }
        }else{
            res.status(409).send({msg : 'user not yet registered'})
        }
    }catch(err){
        console.error(err)
        res.status(500).send({msg : 'server error'})
    }
})


normalUserRoute.post('/productBought/:userEmail', async(req,res)=>{
    const payload = req.body
    const {userEmail} = req.params
    try{
        const checkUser = await registrationModel.findOne({userEmail : userEmail})
        if(checkUser){
            const checkCart = await normalUserModel.findOne({userEmail : userEmail})
            if(checkCart){
                const checkData = checkCart.cart.find((i) => i.productId === payload.productId)
                if(checkData){
                    let filterData = checkCart.cart.filter((i) => i.productId !== payload.productId)
                    await normalUserModel.findOneAndUpdate({userEmail : userEmail}, {$set : {cart : filterData}})
                }
                    const addProduct = await normalUserModel.findOneAndUpdate({userEmail : userEmail}, {$push : {productBought : payload}})
                    if(addProduct){
                        res.send({msg : 'product Bought successfully'})
                    }else{
                        res.status(402).send({msg : 'error while adding cart'})
                    }
            }else{
                const newCart = {
                    userEmail : userEmail,
                    cart : [],
                    productBought : [
                        {
                            productId : payload.productId,
                            price : payload.price,
                            productType : payload.productType,
                            image : payload.image,
                        }
                    ]
                }
                const created = await normalUserModel.create(newCart)
                if(created){
                    res.send({msg : 'created'})
                }else{
                    res.status(401).send({msg : 'error while creating productBought'})
                }
            }
        }else{
            res.status(409).send({msg : 'user not yet registered'})
        }
    }catch(err){
        console.error(err)
        res.status(500).send({msg : 'server error'})
    }
})