import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotasService } from '../../service/notas.service';

@Component({
  selector: 'app-detail-week',
  templateUrl: './detail-week.page.html',
  styleUrls: ['./detail-week.page.scss'],
})
export class DetailWeekPage implements OnInit {
  public evo;
  public semana;
  public dataSemana;
  public evolution;

  constructor(private routes: Router, 
              public route: ActivatedRoute,
              public notaSrv: NotasService) {
  
   }

  ngOnInit() {
    this.evo = this.route.snapshot.paramMap.get("evo");
    
    this.notaSrv.getNota(this.evo).subscribe(data => {
      this.evolution = data;
      console.log('this.evolution:', this.evolution);
});
  }

}
