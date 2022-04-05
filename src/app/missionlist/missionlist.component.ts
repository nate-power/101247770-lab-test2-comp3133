import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  launchList: Mission[] = []
  launch!: Mission
  loading!: Boolean;

  constructor(private router: Router, private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    this.loading = true
    this.spacexService.getAllLaunches().pipe(finalize(() => this.loading = false)).subscribe({
      next: (data: any) => {
        data.forEach((launch: any ) => {
          this.launch = {
            flight_number: launch.flight_number,
            mission_name: launch.mission_name,
            launch_year: launch.launch_year,
            details: launch.details,
            mission_patch_small: launch.links.mission_patch_small,
            mission_patch: launch.links.mission_patch,
            rocket_name: launch.rocket.rocket_name,
            rocket_type: launch.rocket.rocket_type,
            launch_site: launch.launch_site.site_name_long,
            more_info: launch.links.article_link
          }
          this.launchList.push(this.launch)
        })
      }
    })
  }

  getDetails(id: any) {
    this.router.navigate([`/details/${id}`])
  }

}
