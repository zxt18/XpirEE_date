import { Component, OnInit } from '@angular/core';
import { ListService } from './shared/list.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ListService]
})
export class listComponent implements OnInit {
    ProjectListArray: any[];
    constructor(private listService: ListService) { }

    ngOnInit() {
        this.listService.getPROJECTlist().snapshotchanges()
            .subscribe(item => {
                this.ProjectListArray = [];
                item.forEach(element => {
                    var x = element.payload.toJSON();
                    x["&key"] = element.key;
                    this.ProjectListArray.push(x);
                })

                this.ProjectListArray.sort((a,b)=> {
                    return a.isChecked - b.isChecked;
                })
            });
  }
    onAdd(itemTitle) {
        this.listService.addTitle(itemTitle.value);
        itemTitle.value = null;
    }
    alterCheck($key: string, isChecked) {
        this.listService.checkOrUnCheckTitle($key, !isChecked);
    }

    onDelete($key: string) {
        this.listService.removeTitle($key);
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/