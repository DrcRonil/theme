import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public http: HttpClient) {
  }

  gridcolumnDefs: any;
  rowData: any;
  DefaultData: any;
  Mygrid1: any;

  ngOnInit() {
    this.gridcolumnDefs = [];
    //this.grid1();
  }
  grid1() {

    console.log('grid1')

    // this.gridcolumnDefs = [
    //   {
    //     field: 'country',
    //     enableRowGroup: true,

    //   },
    //   {
    //     field: 'sport',
    //     enableRowGroup: true,
    //   },
    //   {
    //     field: 'year',
    //     enableRowGroup: true,
    //     aggFunc: 'sum'

    //   },
    //   {
    //     field: 'gold',
    //     enableRowGroup: true,
    //     editable: true,
    //     cellRenderer: (params: any) => {
    //       if (params.data != undefined) {
    //         if (params.data.gold != null) {
    //           return "<span class='cellfullwidth' onmouseenter=ShowTooltipTableViewRAmt('14:30-04-2021:68.387:25361,14:31-05-2021:71.257:29345,14:30-06-2021:118.266:40516','')>" + params.data[params.column.colId] + "</span>"
    //         }
    //         else {
    //           if (params.data[params.column.colId] == null)
    //             return '<span></span>'
    //           else
    //             return '<span>' + params.data[params.column.colId] + '</span>'
    //         }
    //       }
    //       else
    //         return '<span></span>'
    //     }
    //   },
    //   {
    //     field: 'silver',
    //     enableRowGroup: true,
    //   },
    //   {
    //     field: 'bronze',
    //     enableRowGroup: true,
    //   },
    // ];

    this.http
      .get('http://192.168.0.209:1452/WeatherForecast')
      .subscribe((data: any) => {

        var columns = this.getKeys(data[0]);
        var colObj = {};
        this.gridcolumnDefs = [];
        for (var i = 0; i < columns.length; i++) {
          var visible = true;
          switch (columns[i].toLocaleLowerCase()) {

            case "shape":
              colObj = {
                //headerName: columns[i],
                field: columns[i],
                //comparator: columns[i].toString().toUpperCase().includes('DATE') ? dateComparator : null,
                cellClass: (params: any) => {
                  if (params.data != undefined && params.data != null) {
                    return ['txtcenter','txtblue'];
                  }
                  else
                    return ['txtcenter'];
                }

              }
              break;
            default:
              colObj = {
                //headerName: columns[i],
                field: columns[i],
                //comparator: columns[i].toString().toUpperCase().includes('DATE') ? dateComparator : null,
                cellClass: (params: any) => {
                  if (params.data != undefined && params.data != null) {
                    return ['txtcenter'];
                  }
                  else
                    return ['txtcenter'];
                }

              }
              break;
          }
          if (visible) {
            if (colObj != undefined)
              this.gridcolumnDefs.push(colObj);
          }
        }


        this.Mygrid1.setColumnDefs(this.gridcolumnDefs)
        this.Mygrid1.setRowData(data)

        // setTimeout(() => {
        //   this.Mygrid1.columnController.autoSizeAllColumns(false, "contextMenu");
        // }, 100)


      });

  }

  getKeys(obj: []) {
    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }
    return keys;
  }

  grid2() {
    console.log('grid2')
    // this.gridcolumnDefs=[];
    //this.Mygrid1.columnController.autoSizeAllColumns(false, "contextMenu");

  }
  Barcode: string = ''
  filtechange() {
    console.log('call')
  }

  setRowDoubleClicked(params: any) {
    this.setBarcodeTopRow(params.node.id);
  }

  setBarcodeTopRow(index: string) {

    for (let i = 0; i < this.Mygrid1.rowModel.rowsToDisplay.length; i++) {

      if (this.Mygrid1.rowModel.rowsToDisplay[i].id == index) {

        if (this.Mygrid1.rowModel.rowsToDisplay[i].isSelected()) {
          let allrow = this.Mygrid1.rowModel.rowsToDisplay[i]; //.splice(i, 1);
          this.Mygrid1.applyTransaction({ remove: [this.Mygrid1.rowModel.rowsToDisplay[i].data] });
          this.Mygrid1.applyTransaction({ add: [allrow.data], addIndex: this.Mygrid1.getSelectedRows().length });
        }
        else {
          
          let allrow = this.Mygrid1.rowModel.rowsToDisplay[i]; //.splice(i, 1);
          this.Mygrid1.applyTransaction({ remove: [this.Mygrid1.rowModel.rowsToDisplay[i].data] });
          this.Mygrid1.applyTransaction({ add: [allrow.data], addIndex: 0 });
          this.Mygrid1.rowModel.rowsToDisplay[0].selectThisNode(!this.Mygrid1.rowModel.rowsToDisplay[0].isSelected());
          this.Mygrid1.selectionController.setLastSelectedNode(this.Mygrid1.rowModel.rowsToDisplay[0])

            this.Mygrid1.redrawRows();
        }

        break;
      }
    }
    console.log('asdasd')
  }
  setBarcodeIndexRow(index: string) {

    for (let i = 0; i < this.Mygrid1.rowModel.rowsToDisplay.length; i++) {

      if (this.Mygrid1.rowModel.rowsToDisplay[i].id == index) {

        if (this.Mygrid1.rowModel.rowsToDisplay[i].isSelected()) {
          let allrow = this.Mygrid1.rowModel.rowsToDisplay[i]; //.splice(i, 1);
          this.Mygrid1.applyTransaction({ remove: [this.Mygrid1.rowModel.rowsToDisplay[i].data] });
          this.Mygrid1.applyTransaction({ add: [allrow.data], addIndex: this.Mygrid1.getSelectedRows().length });
        }
        else {
          console.log(this.Mygrid1.getSelectedRows().length)
          let allrow = this.Mygrid1.rowModel.rowsToDisplay[i]; //.splice(i, 1);
          let index = this.Mygrid1.getSelectedRows().length > 0 ? this.Mygrid1.getSelectedRows().length : 0;
          this.Mygrid1.applyTransaction({ remove: [this.Mygrid1.rowModel.rowsToDisplay[i].data] });
          this.Mygrid1.applyTransaction({ add: [allrow.data], addIndex: index });
          this.Mygrid1.rowModel.rowsToDisplay[index].selectThisNode(!this.Mygrid1.rowModel.rowsToDisplay[index].isSelected());
          this.Mygrid1.selectionController.setLastSelectedNode(this.Mygrid1.rowModel.rowsToDisplay[index])
          this.Mygrid1.redrawRows();
        }

        break;
      }
    }
  }


  selectWithBarcode(params: any) {

    console.log(params, this.Barcode)

    for (let i = 0; i < this.Mygrid1.rowModel.rowsToDisplay.length; i++) {

      if (this.Mygrid1.rowModel.rowsToDisplay[i].data.kapan + '-' + this.Mygrid1.rowModel.rowsToDisplay[i].data.RefNo == this.Barcode) {
        //this.Mygrid1.rowModel.rowsToDisplay[i].selectThisNode(!this.Mygrid1.rowModel.rowsToDisplay[i].isSelected());
        this.setBarcodeIndexRow(this.Mygrid1.rowModel.rowsToDisplay[i].id);
        break;
      }

    }


  }

  GetCellValueChange(event: any) {
    event.data.year = event.data.year + 1
    var changedData = [event.data];
    event.api.applyTransaction({ update: changedData });

    //this.Mygrid1.refreshCells()
  }

  setfilterchange(event: any) {
    console.log(event)

    const allrow = this.Mygrid1.getModel().rootNode.childrenAfterFilter;
    const allclm = this.Mygrid1.columnController.columnDefs;

    let obj: any = {};

    for (let i = 0; i < allclm.length; i++) {
      obj[allclm[i].field] = undefined;
    }

    let TCnt = 0, Tyear = 0, Tgold = 0, Tsilver = 0, Tbronze = 0;
    allrow.forEach(function (value: any) {
      TCnt++;
      Tyear += Number(value.data.weight);
      Tgold += Number(value.data.gold);
      Tsilver += Number(value.data.silver);
      Tbronze += Number(value.data.bronze);
      // console.log(value);
    });

    obj.name = 'Total';
    obj.weight = Tyear;
    obj.year = Tyear;
    obj.gold = Tgold;
    obj.silver = Tsilver;
    obj.bronze = Tbronze;
    obj.xyz = Tbronze;

    this.Mygrid1.setPinnedTopRowData([obj]);

  }

  setGrid(event: any) {
    this.Mygrid1 = event;
    this.Mygrid1.onFilterChanged(() => {
      console.log('aa')
    });

  }


  ShowTooltipTableViewRAmt(MTypeAmt: String, Type: String) {

    console.log(MTypeAmt, Type)

  }

}

