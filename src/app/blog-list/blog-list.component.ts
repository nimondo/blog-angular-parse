import { Component, OnInit , OnDestroy} from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit , OnDestroy {
  blogs: Blog[];
  blogSubscription: Subscription;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogSubscription = this.blogService.blogSubject.subscribe(
      (blog: Blog[]) => {
        this.blogs = blog;
      }
    );
    this.blogService.emitBlog();
  }

  onNewBlog() {
    this.router.navigate(['/blog', 'new']);
  }

  onDeleteBlog(blog: Blog) {
    this.blogService.removeBlog(blog);
  }

  onViewBlog(id: string) {
    this.router.navigate(['/blog', 'view', id]);
  }
  onUpdateLink(id: string){
    this.router.navigate(['/blog', 'update', id]);
  }
  
  ngOnDestroy() {
    this.blogSubscription.unsubscribe();
  }
}
