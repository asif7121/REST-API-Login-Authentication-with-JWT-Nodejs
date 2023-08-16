import dotenv from 'dotenv'
dotenv.config();
import { RequestHandler } from "../../helpers/requestHandler.helper.js";
import constant from "../../utils/constant.js";
import  User from './user.model.js'
import bcrypt from 'bcrypt'
import GenerateJwt from '../../helpers/jwt.js';


export default {
    registerUser: async(req, res) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            isAdmin: req.body.isAdmin,
            
        });
        user = await user.save();
        if(!user){
            return RequestHandler.Error({
                res,
                statusCode: 400,
                error: constant.USER_NOT_REGISTERED
            })
        }return res.send(user)
    },

    user: async(req, res)=> {
        const {userId} = req.params
        const user = await User.findById(userId).select('-password')
        if(!user){
            return RequestHandler.Error({
                res,
                statusCode: 500,
                error: constant.NO_USER_AVAILABLE_WITH_THIS_ID
            });
        }return res.send(user);
    },

    userLogin: async(req, res)=> {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return RequestHandler.Error({
                res,
                statusCode: 404,
                error: constant.NO_USER_AVAILABLE_WITH_THIS_ID
            })
        }
        if(!(await bcrypt.compareSync(password, user.password))){
            return RequestHandler.Error({
                res,
                statusCode: 400,
                error: constant.CREDENTIAL_MISMATCH
            })
        }
        const token = GenerateJwt({ userId: user._id, isAdmin: user.isAdmin})
        return RequestHandler.Success({ res, data: token, message: constant.USER_LOGGED_IN})
    },

    userList: async(req, res)=> {
        const userList = await User.find().select('name email phone')
        if(!userList){
            return RequestHandler.Error({
                res,
                statusCode: 500,
                error: constant.NO_USER_AVAILABLE
            });
        }return res.send(userList);
    },
    deleteUser: async (req, res) => {
        try {
          const { userId } = req.params;
          const user = await User.findByIdAndDelete(userId);
          if (user)
            return RequestHandler.Success({
              res,
              statusCode: 201,
              message: constant.USER_DELETED_SUCCESSFULLY,
            });
          return RequestHandler.Error({
            res,
            error: constant.NO_USER_AVAILABLE,
          });
        } catch (err) {
          return RequestHandler.Error({
            res,
            statusCode: 400,
            error: constant.BAD_REQUEST,
          });
        }
      }
}