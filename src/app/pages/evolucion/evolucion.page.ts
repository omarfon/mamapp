import { Component, OnInit } from '@angular/core';
import { EvolucionService } from 'src/app/service/evolucion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.page.html',
  styleUrls: ['./evolucion.page.scss'],
})
export class EvolucionPage implements OnInit {
  public evolution;
  public resumen;

  constructor( private evoSrv: EvolucionService,
              private routes: Router) { }

  ngOnInit() {
    this.evoSrv.getSemanas().subscribe(data =>{
      this.evolution = data
    })

  }
      goToDetailWeek(evo){
        /* console.log('lo que me viene en evo:', evo); */
        const evolucion = evo.semana;
        this.routes.navigate(['detail-week', {evo:evolucion}])

        /* this.navCtrl.push(DetailSemanaPage, {evo:evo}); */
      }

}
