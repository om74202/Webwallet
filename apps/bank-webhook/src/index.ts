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
    const paymentInfo: {
        token: string;
        userId: string;
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    try{await db.$transaction([
        db.balance.update({
            where:{
                userId:Number(paymentInfo.userId)
            },
            data:{
                amount:{
                    increment:paymentInfo.amount
                }
            }
        }),
    
        db.onRampTransaction.update({
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