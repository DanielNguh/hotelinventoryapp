import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Comments } from '../comments';
import { CommentsService } from '../comments.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsGuard implements Resolve<Comments[]> {
  constructor(private commentsService: CommentsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Comments[] | Observable<Comments[]> | Promise<Comments[]> {
    return this.commentsService.getComments();
  }

}
