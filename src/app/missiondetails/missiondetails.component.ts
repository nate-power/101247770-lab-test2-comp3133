import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {

  selectedFlightNumber!: number;
  selectedLaunch!: Mission;
  loading!: Boolean;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private spacexService: SpacexapiService) { }

  ngOnInit(): void {
    this.loading = true
    this.selectedFlightNumber = this.activatedRouter.snapshot.params['id'];
    this.spacexService.getLaunchById(this.selectedFlightNumber).pipe(finalize(() => this.loading = false)).subscribe({
      next: (data: any) => {
        this.selectedLaunch = {
          flight_number: data.flight_number,
          mission_name: data.mission_name,
          launch_year: data.launch_year,
          details: data.details,
          mission_patch_small: data.links.mission_patch_small,
          mission_patch: data.links.mission_patch,
          rocket_name: data.rocket.rocket_name,
          rocket_type: data.rocket.rocket_type,
          launch_site: data.launch_site.site_name_long,
          more_info: data.links.article_link
        }
      }, error: (error: any) => {
        this.router.navigate([""])
      }
    })
  }

  backToList() {
    this.router.navigate([''])
  }
}
