import { User } from './entity/User';
import * as brcypt from "bcryptjs"
import {Resolvers} from './resolvers_types'
export const resolvers:Resolvers = {
    Query:{
        // @ts-ignore
        me:async(_,__,{req})=>{
            const userId= req.session.userId;
            if(!userId)return null ;
            const user= await User.findOne(userId);
            return user;
        }
    },
    Mutation:{
        register:async(_,{email,password})=>{
            const salt = await brcypt.genSalt(2)
            const hashedPassword = await brcypt.hash(password,salt)
            User.create({email,password:hashedPassword}).save()
            return true;
        },
        // @ts-ignore
        login:async(_,{email,password},{req})=>{
            const user= await User.findOne({where:{email}});
            if(!user) return null;
            const valid = await brcypt.compare(password,user.password);
            if(!valid) return null;

            req.session.userId=user.id
            return user;
        },
    }
    
};
