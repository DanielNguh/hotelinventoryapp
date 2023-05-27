import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';

@Component({
  selector: 'hinv-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments$ = this.commentService.getComments();

  comment$ = this.activatedRoute.data.pipe(pluck('comments'));

  constructor(
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }
}
