import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";


const createUser = async (numUsers)=>{

    try {
         
        const usersPromise = [];
        for (let i = 0; i < numUsers; i++) {
         const tempUser = User.create({
             name: faker.person.fullName(),
             username: faker.internet.userName(),
             password:" password",
             bio: faker.lorem.sentence(10),
             avatar: {
                 public_id: faker.system.fileName(),
                 url: faker.image.avatar(),
             }
         });
         usersPromise.push(tempUser);
        

        }
        await Promise.all(usersPromise);
        console.log("User created",numUsers);
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
};

export {createUser}