import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { SharedModule } from '@shared/shared.module';

import { MyModalComponent } from './modal/my-modal.component';
import { HomeComponent } from './page/home.component';
import { PostItemComponent } from './page/post-item/post-item.component';

import { HomeRoutingModule } from './home.routing';
import { FormsModule } from '@angular/forms';
import { NewPostComponent } from './page/new-post/new-post.component';

@NgModule({
  declarations: [
    HomeComponent,
    MyModalComponent,
    NewPostComponent,
    PostItemComponent
  ],
  imports: [SharedModule, NgxMasonryModule, HomeRoutingModule, FormsModule],
  exports: [],
  providers: [],
  entryComponents: [MyModalComponent, NewPostComponent]
})
export class HomeModule {}
