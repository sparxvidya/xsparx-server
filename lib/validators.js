import {body, check, param, validationResult} from "express-validator";
import { ErrorHandler } from "../utils/utility.js";



const validateHandler  = ( req , res , next) => {

    const errors = validationResult(req);
   
     const errorMessages = errors.array()
     .map((error)=>error.msg)
     .join(", ");

    console.log( errorMessages);

    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400));
};
const registerValidator = () => [
  body("name","please Enter Name").notEmpty(),
  body("username","please Enter  username").notEmpty(),
  body("password","please Enter password").notEmpty(),
  body("bio","please Enter bio").notEmpty(),
];

const loginValidator = () => [
    body("username","please Enter  username").notEmpty(),
    body("password","please Enter password").notEmpty(),
  ];
  const newGroupValidator = () => [
    body("name","please Enter Name").notEmpty(),
    body("members").notEmpty()
    .withMessage("please Enter memebers")
    .isArray({min: 2, max: 100})
    .withMessage(" memebers must be between 2-100")
    ,
  ];
  const addMemberValidator = () => [
    body("chatId","please Enter Chat ID").notEmpty(),
    body("members").notEmpty()
    .withMessage("please Enter memebers")
    .isArray({min: 1, max: 97})
    .withMessage(" memebers must be between 1-97")
    ,
  ];
  const removeMemberValidator = () => [
    body("chatId","please Enter Chat ID").notEmpty(),
    body("userId","please Enter User ID").notEmpty(),
  ]
  
  const sendAttachmentsValidator = () => [
    body("chatId","please Enter Chat ID").notEmpty(),
  ];
  
  const ChatIdValidator = () => [
    param("id","please Enter Chat ID").notEmpty(),
  
  ]
  const renameValidator = () => [
    param("id","please Enter Chat ID").notEmpty(),
    body("name","please Enter New Name").notEmpty(),
  
  ]
  const sendRequestValidator = () => [
    body("userId","please Enter User ID").notEmpty(),
  
  ]
  const acceptRequestValidator = () => [
    body("requestId","please Enter Request ID").notEmpty(),
    body("accept",).notEmpty()
    .withMessage("please select Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
  ];

  const adminLoginValidator = () => [
    body("secretKey","please Enter secret  Key").notEmpty(),
   
  ];

export {
    registerValidator,
    validateHandler,
    loginValidator,
    newGroupValidator,
    addMemberValidator,
    removeMemberValidator,
    sendAttachmentsValidator,
    ChatIdValidator,
    renameValidator,
    sendRequestValidator,
    acceptRequestValidator,
    adminLoginValidator,
 
};