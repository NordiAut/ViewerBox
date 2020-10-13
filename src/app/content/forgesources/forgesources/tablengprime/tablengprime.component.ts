import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UrndatasourcedataService } from 'src/app/services/urndatasourcedata.service';
import { URNSourceModel } from 'src/app/shared/URNSourceModel';


@Component({
  selector: 'app-tablengprime',
  templateUrl: './tablengprime.component.html',
  styleUrls: ['./tablengprime.component.scss']
})
export class TablengprimeComponent implements OnInit {

  private urnSourceModelSub$: Subscription = new Subscription();

  urnSourceModels: URNSourceModel[];
  urnListModels = [] as URNSourceModel[];
  urnListModel: URNSourceModel;
  selectedUrnListModel: URNSourceModel;
  cols: any[];
  displayDialogAdd: boolean;
  displayDialogDelete: boolean;
  newUrnListModel: boolean;
  submitted = false;


  @Output() sendModelAction = new EventEmitter<URNSourceModel>();


  constructor(private urnService: UrndatasourcedataService) { }

  ngOnInit(): void {
    this.getAllUrn();

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'mountedTo', header: 'Anhängepunkt' },
      { field: 'lastSync', header: 'Letzter Sync' },
     ];
  }


//   private getAllUrn(): void {
//     const allURN$ = this.urnService.getAllUrn().subscribe(res => {
//       console.log('Result from getOrders: ', res);
//       this.urnSourceModel = res;
//       this.buildTable();
//     });
//  }

  private getAllUrn(): void {
    this.urnSourceModelSub$ = this.urnService.getAllUrn().subscribe(res => {
      // console.log('Result from getOrders: ', res);
      this.urnSourceModels = res;
      // console.log('Result from urnSourceModel: ', this.urnSourceModels);
      this.buildTable();
      // console.log('Result from list: ', this.urnListModels);
      },
      error => {
        console.log(error);
      });
    }

  buildTable(): void {
    // console.log(this.urnSourceModels);
    this.urnListModels = [];
    this.urnSourceModels.forEach(element => {
    this.urnListModels.push(
        {
          urnSourceModelId: element.urnSourceModelId,
          name: element.name,
          urn: element.urn,
          urnType: element.urnType,
          urnGroupKey: element.urnGroupKey,
          mountedTo: element.mountedTo,
          lastSync: element.lastSync
        }
      );
    });
  }

  // Custom Sort
  customSort(event: SortEvent): any {
    // event.data = Data to sort
    // event.mode = 'single' or 'multiple' sort mode
    // event.field = Sort field in single sort
    // event.order = Sort order in single sort
    // event.multiSortMeta = SortMeta array in multiple sort

    event.data.sort((data1, data2) => {
        const value1 = data1[event.field];
        const value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) {
            result = -1;
        }
        else if (value1 != null && value2 == null) {
            result = 1;
        }
        else if (value1 == null && value2 == null) {
            result = 0;
        }
        else if (typeof value1 === 'string' && typeof value2 === 'string') {
            result = value1.localeCompare(value2);
        }
        else {
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }

        return (event.order * result);
    });
  }


  showDialogToAdd(): void {
    this.newUrnListModel = true;
    this.urnListModel = {};
    this.displayDialogAdd = true;
  }

  showDialogToDelete(): void {

    this.newUrnListModel = false;
    this.urnListModel = this.cloneModel(this.selectedUrnListModel);
    this.displayDialogDelete = true;
  }

  save(): void {

      this.urnService.addUrn(this.urnListModel).subscribe(

      res => {
        this.getAllUrn();
        console.log('res to add', res);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });

      this.urnListModel = null;
      this.displayDialogAdd = false;
    // this.getAllUrn();
    //  console.log('urnsourcemodel', this.urnSourceModels);
    //   console.log('urnListModel', this.urnListModel);
  }


  delete(): void {
    // this.deleteUrn(this.selectedUrnListModel.urnSourceModelId);,

    this.urnService.deleteUrn(this.selectedUrnListModel.urnSourceModelId).subscribe(
      res => {
        this.getAllUrn();
        console.log('res to delete', res);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
    // this.urnListModels = this.urnListModels.filter((val, i) => i !== index);
    this.urnListModel = null;
    this.displayDialogDelete = false;
    // this.getAllUrn();
    // console.log('urnsourcemodel', this.urnSourceModels);
    // console.log('urnListModel', this.urnListModel);
  }

  onRowSelect(event): void {

    this.sendUrnSourceModel(event.data);

    // Old
    // this.newUrnListModel = false;
    // this.urnListModel = this.cloneModel(event.data);
    // this.displayDialogDelete = true;
  }

  sendUrnSourceModel(urnSourceModel: URNSourceModel): void  {
    // console.log('sendUrnSourceModel called!');
    this.urnListModel = this.cloneModel(urnSourceModel);
    //  console.log('urnListModel', this.urnListModel);
    this.sendModelAction.emit(this.urnListModel);
  }

  cancel(): void {
    this.urnListModel = null;
    this.displayDialogDelete = false;
  }

  cloneModel(urn: URNSourceModel): URNSourceModel {
    const urnListModel = {};
    // tslint:disable-next-line:forin
    for (const prop in urn) {
      urnListModel[prop] = urn[prop];
    }
    return urnListModel;
  }

  openUrn(label: string, urn: string, urngroupkey: string): void {


    // const listinfos = document.getElementById("list_infos");
    // if (listinfos) listinfos.innerHTML = "";
    // const listlogging = document.getElementById("list_logging");
    // if (listlogging) listlogging.innerHTML = "";
    // const urnlabel = document.getElementById("urn_label");
    // if (urnlabel) urnlabel.innerHTML = label;
    // const viewerbox = document.querySelector("viewer-box") as any;
    // viewerbox.loadViewerboxSingleUrn(urn, "forge", urngroupkey);
  }


}
