import express, { json } from "express"
import db from "@repo/db/client"

const app=express()
app.get('/',(req,res)=>{
    console.log("hii")
    res.json({
        message:"hiiiiiiiiiiiii"
    })

})

app.post('hdfcWeebhook',async (req,res)=>{
    const paymentInfo={
        token:req.body.token,
        userId:req.body.userId,
        amount:req.body.amount
    }
    try{await db.$transaction([
        db.balance.update({
            where:{
                userId:Number(paymentInfo.userId)
            },
            data:{
                amount:Number(paymentInfo.amount)
            }
        }),
    
        db.onRampTransaction.updateMany({
            where:{
                token:paymentInfo.token
            },
            data:{
                status:"Success"
            }
        })
    ])
    res.json({
        message: "Captured"
    })
        }catch(e){
            res.status(411).json({
                message:"Error while processing webhook "
            })
    }
    
})
app.listen(3003);