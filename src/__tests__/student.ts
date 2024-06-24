import supertest from 'supertest';

import { StudentService } from '../modules/student/student.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../server';
import mongoose from 'mongoose';
const studentData = {
    name: 'Mezba',
    email: 'mezbani@mail.com',
    age: 35,
 };

 const app= createServer();
 
describe('student',()=>{

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
     });
  
     afterAll(async () => {
        await mongoose.disconnect();
     });
  

  describe("GET  student route",()=>{

    it("should return 404 for an unknown email",async()=>{
        const email = 'unknown@mail.com';
         await supertest(app).get(`/api/v1/student/${email}`).expect(404);
    });

    it('should return the student for correct email', async () => {
        const student = await StudentService.createStudent(studentData);

        const { statusCode, body } = await supertest(app).get(
           `/api/v1/student/${student?.email}`
        );

        expect(statusCode).toBe(200);
        expect(body.data.email).toBe(student?.email);
     });
  })

})