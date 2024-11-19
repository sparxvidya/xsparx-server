import express from 'express';
import {
    addMembers,
     deleteChat,
      getChatDetails,
       getMessages,
       getMyChats,
        getMyGroups,
         leaveGroup,
          newGroupChat,
           removeMember, 
           renameGroup,
            sendAttachments,
         } from '../controllers/chat.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachmentMulter } from '../middlewares/multer.js';
import {
     addMemberValidator, 
    ChatIdValidator,
      newGroupValidator, 
      removeMemberValidator,
       renameValidator,
       sendAttachmentsValidator, 
       validateHandler
     } from '../lib/validators.js';

const app = express.Router();


//line of code of isauthenticaded do not change

app.use(isAuthenticated);

app.post("/new",newGroupValidator(), validateHandler,  newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers",addMemberValidator(), validateHandler, addMembers);

app.put("/removeMember", removeMemberValidator(), validateHandler, removeMember);

app.delete("/leave/:id", ChatIdValidator() , validateHandler,  leaveGroup);

// send  Attachment

app.post("/message", attachmentMulter, sendAttachmentsValidator(), validateHandler, sendAttachments);

//Get Message

app.get("/message/:id", ChatIdValidator() , validateHandler,  getMessages);

//Get chat information,rename , delete

app.route("/:id")
.get( ChatIdValidator() , validateHandler, getChatDetails)
.put(renameValidator(), validateHandler,    renameGroup)
.delete(ChatIdValidator() , validateHandler, deleteChat);



export default app;