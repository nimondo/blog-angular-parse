import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css']
})
export class BlogUpdateComponent implements OnInit {

  blog: Blog;

  constructor(private route: ActivatedRoute, private blogService: BlogService,
              private router: Router) {}

  ngOnInit() {
    this.blog = new Blog('', '');
    const id = this.route.snapshot.params['id'];
    this.blogService.getSingleBlog(id).then(
      (blog: Blog) => {
        console.log(blog);
        //this.blog = blog[0];
        console.log(this.blog);
        this.blog.title=blog[0].get('title');
        this.blog.author=blog[0].get('author');
        this.blog.contenu=blog[0].get('contenu');
        this.blog.photo=blog[0].get('photo');
      }
    );
  }

  onBack() {
    this.router.navigate(['/blog']);
  }

}
