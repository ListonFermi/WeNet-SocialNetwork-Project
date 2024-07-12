import { Types } from "mongoose"
import PayUOrderCollection from "../models/PayUOrderCollection"

export ={
    getPayUOrder: async function (PayUOrderId: string){
        try {
            return await PayUOrderCollection.findOne({_id: new Types.ObjectId(PayUOrderId)})
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}