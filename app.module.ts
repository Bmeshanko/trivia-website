import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {CapitalsComponent} from "./capitals/capitals.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'capitals', component: CapitalsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CapitalsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent, CapitalsComponent]
})

export class AppModule { }
