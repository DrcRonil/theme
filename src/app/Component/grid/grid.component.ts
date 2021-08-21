import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  // @Input() columnDefs: any;
  // @Input() rowData: any;
  // @Input() DefaultData: any;

  @Output() _gridApi = new EventEmitter<any>();
  @Output() filterchange = new EventEmitter<any>();
  @Output() CellValueChange = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();

  isRefresh: Boolean = true;
  isFilter: Boolean = false;
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public defaultColDef: any;
  public autoGroupColumnDef: any;
  public rowData: any;
  public DefaultData: any;
  public statusBar: any;
  public sideBar: any;
  rowGroupPanelShow = 'always';


  checked: boolean = false;

  constructor(private formBuilder: FormBuilder) {

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
      ],
      defaultToolPanel: 'columns',

    };


    this.defaultColDef = {
      flex: 1,
      minWidth: 10,
      filter: true,
      sortable: true,
      resizable: true,
      editable: false,
      enableRowGroup: true
    };
    this.autoGroupColumnDef = { minWidth: 200 };

    this.statusBar = {
      statusPanels: [{ statusPanel: 'agAggregationComponent' }],
    };

  }

  ngOnInit() {

  }

  onCellKeyPress(e: any) {

    // if (e.event.key.toString().toLocaleLowerCase() == 'e' && e.event.shiftKey==true) 
    //     this.excel();
  }

  onCellValueChanged(params: any) {
    this.CellValueChange.emit(params);
  }

  onFilterChanged(params: any) {

    if (params.columnApi.columnController.columnDefs.length > 0)
      this.filterchange.emit(params);
  }

  oncellEditingStarted() {
    this.isRefresh = false;
  }
  oncellEditingStopped() {
    this.isRefresh = true;
  }
  onRowDataChanged() {
    console.log('refresh grid')
    //  this.gridApi.closeToolPanel()

    // setTimeout(() => {
    //   this.gridApi.columnController.autoSizeAllColumns(false, "contextMenu");
    // }, 1000)

    interval(700).pipe(take(3)).subscribe(x => {
      this.gridApi.columnController.autoSizeAllColumns(false, "contextMenu");
    }
    );

  }
  onRowDataUpdated() {
    console.log('RowDataUpdated')

  }
  onSortChanged() {
    this.valuechange(this.mymodel.toString().trim().toLowerCase());
    console.log('Sort Change')
  }
  onModelUpdated(params: any) {
    console.log('ModelUpdated', params)
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([])
    this.DefaultData = [];

    this._gridApi.emit(this.gridApi);
    this.toolPanel();
  }

  toolPanel() {

    if (this.gridApi.getOpenedToolPanel() != null)
      this.gridApi.closeToolPanel()
    else
      this.gridApi.openToolPanel('columns')
  }

  sAll() {
    this.gridApi.selectAll()
  }
  dAll() {
    this.gridApi.deselectAll()

  }

  expand() {
    this.gridApi.expandAll()
  }
  collapse() {
    this.gridApi.collapseAll()
  }

  isFilterChange(event: Event) {
    console.log('isFilterChange')
    this.valuechange(this.mymodel.toString().trim().toLowerCase());
  }
  onRowDoubleClicked(param: Event) {
    this.rowDoubleClicked.emit(param)
  }

  getRowClass(params: any) {

    if (params.api.selectionController.lastSelectedNode == null)
      return null;

    if (params.node.id == params.api.selectionController.lastSelectedNode.id) {

      console.log(params.node.id,'call',params.api.selectionController.lastSelectedNode.id)
      if (params.api.selectionController.getSelectedRows().length > 2)
        return ['lastrowselect'];

    }
    return null;
  };


  inverseAll() {
    console.log('inverseAll')
    if (this.gridApi.getSelectedNodes().length > 0) {

      for (let i = 0; i < this.gridApi.rowModel.rowsToDisplay.length; i++) {

        this.gridApi.rowModel.rowsToDisplay[i].selectThisNode(!this.gridApi.rowModel.rowsToDisplay[i].isSelected());

      }
    }

  }


  mymodel: string = "";
  searchItem: SearchModel[] = [];


  valuechange(newValue: string) {
    console.log('valuechange')
    this.mymodel = newValue;
    const allrow = Array();
    const allcolm = this.gridApi.getColumnDefs()


    if (!this.isFilter && this.mymodel.toString().trim() != '') {
      this.gridApi.setQuickFilter(this.mymodel.toString().trim().toLowerCase());
    }
    else
      this.gridApi.setQuickFilter("");

    this.searchItem = [];
    var tmp = this.gridApi.rowModel.rowsToDisplay;

    if (this.mymodel.toString().trim() != '') {
      for (const { index, value } of tmp.map((value: any, index: any) => ({ index, value }))) {
        var alreadyExist = false;
        for (var key of allcolm) {

          if (value.data[key.field] != null && value.data[key.field].toString().toLowerCase().includes(this.mymodel.toLowerCase())) {
            this.searchItem.push({ 'id': index, 'value': key.field })

          }
        }
      }
    }
    console.log(this.searchItem)
    this.Check = 0;
    this.isNext = ''
    for (const index of this.gridColumnApi.columnController.getDisplayedColumns()) {

      if (this.mymodel.toString().trim() != '') {
        index.colDef.cellClassRules = {
          'txtred': "(x).toString().toLocaleLowerCase().includes('" + this.mymodel.toString().trim().toLocaleLowerCase() + "') && '" + this.mymodel.toString().trim() + "'!='' "
        }
      }
      else {
        index.colDef.cellClassRules = ''
      }
    }

    this.gridApi.redrawRows();
  }

  next() {
    if (this.isNext == "")
      this.isNext = "TRUE";

    if (this.isNext == "FALSE") {
      this.Check++;
      this.isNext = "TRUE";
    }
    if (this.Check < 0 || this.Check + 1 > this.searchItem.length)
      this.Check = 0;

    this.gridApi.ensureIndexVisible(this.searchItem[this.Check].id);
    this.gridApi.ensureColumnVisible(this.searchItem[this.Check].value);
    this.gridApi.setFocusedCell(this.searchItem[this.Check].id, this.searchItem[this.Check].value);

    this.Check++;

  }
  isNext: string = ''
  prev() {

    if (this.isNext == "")
      this.isNext = "FALSE";

    if (this.isNext == "TRUE") {
      this.Check--;
      this.isNext = "FALSE";
    }

    if (this.Check - 1 < 0)
      this.Check = this.searchItem.length;

    this.Check--;
    this.gridApi.ensureIndexVisible(this.searchItem[this.Check].id);
    this.gridApi.ensureColumnVisible(this.searchItem[this.Check].value);
    this.gridApi.setFocusedCell(this.searchItem[this.Check].id, this.searchItem[this.Check].value);

    if (this.Check < 0)
      this.Check = 0

  }

  excel() {
    this.gridApi.exportDataAsExcel()
  }

  Check: number = 0;

  autoSize() {

    if (this.isRefresh)
      this.gridColumnApi.autoSizeAllColumns(false, "contextMenu");

  }

  //autoSaveInterval = setInterval(() => { this.autoSize() }, 2500);

  ngOnChanges(changes: any) {

    if (this.columnDefs.length > 0) {
      this.gridColumnApi.resetColumnState()
      this.autoSize()
    }

  }
}
export type SearchModel = {
  id: number;
  value: string;
}

