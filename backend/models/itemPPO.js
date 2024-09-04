import mongoose from "mongoose"

const itemPPos = new mongoose.Schema(
{
      item:{
            type:String,
            ref:"Item",
            required:true,
      },
      avlqty:{
         type:String,
         ref:"Item",
         required:true
      },
      altqty:{
            type:String,
            required:true,
            trim:true
      },
      remqty: {
            type:String,
            required:true,
            trim:true
      },
      ivnumber: {
            type:String,
            required:true,
            trim:true
      },
      cost: {
            type:String,
            required:true,
          },
      pprice:{
            type:String,
            required:true,
          },
      ivdate:{
            type:Date,
            required:true,
            trim:true

      }

}
)
export default mongoose.model("ItemPPo",itemPPos)