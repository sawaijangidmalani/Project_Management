import mongoose  from "mongoose";

const itemPrice = new mongoose.Schema(
      {
            item: {
                  type:String,
                  required:true,
                  trim:true,
            },
            price:{
                  type:String,
                  required:true,
                  trim:true,
            },
            qty: {
                  type:String,
                  trim:true,
            },
            date :{
                  type:Date,
                  required:true,
                  trim: true,
            }

      }
)
export default mongoose.model("Itemprice", itemPrice);