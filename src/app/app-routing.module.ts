import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home').then(m => m.HomeModule) },
  { path: 'artist', loadChildren: () => import('./artist').then(m => m.ArtistModule) },
  { path: 'album', loadChildren: () => import('./album').then(m => m.AlbumModule )},
  { path: 'album/:artistId', loadChildren: () => import('./album').then(m => m.AlbumModule )},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
