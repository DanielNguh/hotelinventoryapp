import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { CommentsGuard } from './guard/comments.guard';

const routes: Routes = [{ path: '', component: CommentsComponent, resolve: {comments: CommentsGuard} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
