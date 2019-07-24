import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import {Parse} from 'parse';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blogForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      contenu: ''
    });
  }
  
  onSaveBlog() {
    const title = this.blogForm.get('title').value;
    const author = this.blogForm.get('author').value;
    const contenu = this.blogForm.get('contenu').value;
    const newBlog = new Blog(title, author);
    newBlog.contenu = contenu;
    if(this.fileUrl && this.fileUrl !== '') {
      newBlog.photo = this.fileUrl;
    }
    this.blogService.createNewBlog(newBlog);
    this.router.navigate(['/blog']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.blogService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
detectFiles(event) {
  console.log(event.target.files[0]);
  this.onUploadFile(event.target.files[0]);
}

}
