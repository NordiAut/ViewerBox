import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UrndatasourcedataService } from 'src/app/services/urndatasourcedata.service';
import { URNListModel } from 'src/app/shared/URNListModel';
import { URNSourceModel } from 'src/app/shared/URNSourceModel';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  urnSourceModel: URNSourceModel[];
  urnListModel: URNListModel[];

  source: LocalDataSource; // add a property to the component

  // table settings
  settings = {

    pager: {
      display: true,
      perPage: 3,
    },
    actions: {

      add: false,
      edit: false,
      position: 'right',
      columnTitle: '',
      custom: [
        { name: 'addCustom', title: '<p>Add</P>'}],
    },
    columns: {
      name: {
        title: 'name',
        filter: false
      },
      produktionId: {
        title: 'produktionId',
        filter: false
      }
    }
  };

  // table data
  // data = [
  //   {
  //     name: 'test1',
  //     produktionId: '123',
  //   },
  //   {
  //     name: 'test2',
  //     produktionId: '321',
  //   },
  //   {
  //     name: 'test3',
  //     produktionId: '222',
  //   },
  //   {
  //     name: 'test4',
  //     produktionId: '444',
  //   },
  //   {
  //     name: 'test5',
  //     produktionId: '555',
  //   }
  // ];


  constructor(private urnService: UrndatasourcedataService) {  }

  ngOnInit(): void {
    this.getAllUrn();
  }

  private getAllUrn(): void {
    const allURN$ = this.urnService.getAllUrn().subscribe(res => {
      console.log('Result from getOrders: ', res);
      this.urnSourceModel = res;
      this.buildTable();
    });
  }

  buildTable(): void {
    const data = new Array();
    this.urnSourceModel.forEach(element => {
      data.push(
        {
          name: element.name,
          produktionId: element.mountedTo
        }
      );
    });
    this.source = new LocalDataSource(data);
  }


  // tslint:disable-next-line:typedef
  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
