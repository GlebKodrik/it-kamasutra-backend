import request from 'supertest';
import {app} from "../../src";

describe('/courses',() => {
 it("get status 200 and empty array", async () => {
   await request(app).get('/courses').expect(200, [
     {id: 1, curse: 'front-end'},
     {id: 2, curse: 'back-end'},
     {id: 3, curse: 'angular'},
     {id: 4, curse: 'js'}
   ])
 })
})