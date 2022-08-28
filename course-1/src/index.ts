import express, {Request, Response} from 'express'
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "./types";
import {CourseCreateModel} from "./models/course-create-model";

export const app = express()
const port = 3000

const jsonMiddleWare = express.json();
app.use(jsonMiddleWare);

type TCourses = {
  id: number,
  curse: string,
}

const db = [
  {id: 1, curse: 'front-end'},
  {id: 2, curse: 'back-end'},
  {id: 3, curse: 'angular'},
  {id: 4, curse: 'js'}
]

app.get('/' , (req, res) => {
  res.json('Привет backend')
});

app.get('/courses', (req: RequestWithQuery<CourseCreateModel>, res: Response<TCourses[]>) => {
  let foundCurseQuery = db;
  if (req.query.title) {
    foundCurseQuery = db.filter(({curse}) => curse.indexOf(req.query.title) > -1);
  }

  res.json(foundCurseQuery);
})

app.get('/courses/:id', (req: RequestWithParams<{id: string}>, res) => {
  const foundCurse = db.find(({id}) => id === Number(req.params.id)) || [];
  res.json(foundCurse);
})

app.post('/courses', (req: RequestWithBody<{curse: string}>,res) => {
  const {curse} = req.body;
  if (!curse) {
    res.send(400);
    return;
  }
  const createdCourses = {
    id: Number(new Date()), curse: req.body.curse
  };
  db.push(createdCourses);

  res.status(201).json(createdCourses);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})