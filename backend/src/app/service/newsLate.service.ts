import AppError from "../errors/AppError"
import Subscriber from "../model/NewsLater"

const subscribe = async(email:string)=>{
   const subscriber = await Subscriber.findOne({email})
   if(subscriber){
    throw new AppError(501, 'you aleready subcribe')
   }
    const data = Subscriber.create({email})
    console.log(data)
    return data
}
export const NewsLaterService = {
    subscribe
}