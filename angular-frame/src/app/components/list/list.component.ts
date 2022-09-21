import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/model/post/post';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public columnToDisplayPost = [
    'title',
    'description',
    'created_user',
    'created_at',
    'operation',
  ];
  actualPaginator?: MatPaginator;
  public dataSource = new MatTableDataSource<Post>();
  currentPage = 0;
  totalSize = 0;
  pageSize = 5;
  pageOptions = [5, 10, 15];
  postLists: any;

  constructor(private postService: PostService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * get post data.
   */
  public getPosts() {
    this.postService.getPosts().subscribe((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.postLists.length;
    });
  }

}
