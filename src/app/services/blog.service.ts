import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Blog } from '../models/blog.model';
import {Parse} from 'parse';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blog: Blog[] = [];
  toDelete=[];
  blogSubject = new Subject<Blog[]>();
  objectBlog = Parse.Object.extend("Blog");
  ObjectBlog= new this.objectBlog();
  constructor() {
    this.getBlog();
  }

  emitBlog() {
    this.blogSubject.next(this.blog);
  }
  saveBlog(data: Blog){
    this.ObjectBlog.save(data);
  }
  getBlog(){
    const blogs = new Parse.Query(this.objectBlog);
    blogs.find().then((listblog: any[]) => {
      console.log(listblog);
      this.blog=listblog;
      console.log(this.blog);
      this.emitBlog();
    });
  }
  getSingleBlog(objectId: string): Promise<any> {
    console.log(objectId);
    const blogs = new Parse.Query(this.objectBlog);
    //const point= {'__type':'Pointer', 'className':'Blog', 'objectId':objectId};
    blogs.get(objectId);
    return blogs.find().then(
      (listBlog) => {
      console.log(listBlog);
      return listBlog;
    },
    (error) => {
      return error.message;
    });
  }
  getUpdateBlog(objectId: string): Promise<any> {
    console.log(objectId);
    const blogs = new Parse.Query(this.objectBlog);
    blogs.get(objectId);
    return blogs.find().then(
      (listBlog) => {
      console.log(listBlog);
      return listBlog;
    },
    (error) => {
      return error.message;
    });
  }
  createNewBlog(newBlog: Blog) {
    console.log(this.blog);
    console.log(newBlog);
    this.blog.push(newBlog);
    this.saveBlog(newBlog);
    this.emitBlog();
  }

  removeBlog(blog: Blog) {
    let conf=confirm("Etes-vous certain de cette action");
    if(conf){
      const blogIndexToRemove = this.blog.findIndex(
        (blogEl) => {
          if(blogEl === blog) {
            return true;
          }
        }
      );
      this.toDelete=this.blog.splice(blogIndexToRemove, 1);
      console.log(this.toDelete[0].id);
      this.toDelete[0].destroy();
      this.emitBlog();
    };
  }
  uploadFile(file: File): Promise<any>{
    let  name = "photo.jpg";
    let  parseFile = new Parse.File(name, file);
    return parseFile.save().then((file) => {
      console.log(file.url());
      return file.url();
    },
    (error) => {
      return error.message;
    });
  }
}
