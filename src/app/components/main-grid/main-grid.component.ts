import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { LogLevel, ServiceUpdate } from "../../models/types";
import { GridOptions } from "ag-grid-community";
import { GridSearchService } from "../../services/grid-search.service";
import { Configuration } from "../../models/configuration";
import { LocalDateTimestamp } from "../../pipes/local-date-timestamp.pipe";
import { MatMenuTrigger } from "@angular/material/menu";
import { UsageService } from "../../services/usage.service";

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.sass']
})
export class MainGridComponent implements OnInit, OnDestroy
{
  public configurationsGridOptions: GridOptions;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService,
              private gridSearchService: GridSearchService, private usageService: UsageService)
  {
    this.configurationsGridOptions = <GridOptions> {};
    this.configurationsGridOptions.columnDefs = this.getColumnsDefinitions();
    this.configurationsGridOptions.getContextMenuItems = (params) => this.getDefaultContextMenuItems(params);
    this.configurationsGridOptions.getRowNodeId = (row) =>
    {
      return row.id;
    };

    this.configurationsGridOptions.suppressCellSelection = true;

    this.configurationsGridOptions.onCellContextMenu = (params) =>
    {
      if(this.trigger && this.trigger.menuOpen)
        this.trigger.closeMenu();

      let mouseEvent = params.event as MouseEvent;
      if(this.trigger && this.trigger.menuClosed && mouseEvent && mouseEvent.clientX && mouseEvent.clientY)
      {
        this.contextMenuPosition.x = `${mouseEvent.clientX}px`;
        this.contextMenuPosition.y = `${mouseEvent.clientY}px`;

        this.configurationsGridOptions.api.deselectAll();
        params.node.setSelected(true);
        this.trigger.openMenu();
      }
    };

    this.configurationService.serviceUpdateSubject.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH && this.configurationsGridOptions.api)
      {
        this.refreshGrid();
      }
    });

    this.gridSearchService.gridSearchTextSubject.subscribe((gridSearchTextValue) =>
    {
      if(this.configurationsGridOptions.api)
        this.configurationsGridOptions.api.setQuickFilter(gridSearchTextValue);
    });
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("MainGridComponent", message, logLevel);
  }

  public getSelectedConfiguration() : Configuration
  {
    if(this.configurationsGridOptions.api && this.configurationsGridOptions.api.getSelectedRows().length > 0)
      return this.configurationsGridOptions.api.getSelectedRows()[0] as Configuration;

    return null;
  }

  // This feature is not supported in the community version of ag-grid and has not been tested.
  public getDefaultContextMenuItems(params): any[]
  {
    return [
      {
        name: "Edit",
        disabled: true,
        action: () =>
        {
          this.editConfiguration();
        }
      },
      "separator",
      {
        name: "Delete",
        disabled: true,
        action: () =>
        {
          this.deleteConfiguration();
        }
      }
    ];
  }

  private getColumnsDefinitions(): any[]
  {
    return [
      {
        field: 'owner',
        sortable: true,
        minWidth: 100,
        width: 130
      },
      {
        field: 'key',
        sortable: true,
        minWidth: 150,
        width: 200
      },
      {
        field: 'value',
        sortable: true,
        minWidth: 200,
        width: 470
      },
      {
        field: 'lastUpdatedBy',
        sortable: true,
        minWidth: 100,
        maxWidth: 140,
        width: 140
      },
      {
        headerName: "Last Updated On",
        field: 'lastUpdatedOn',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        width: 150,
        valueGetter: (params) =>
        {
          let localDateTimeStamp = new LocalDateTimestamp();
          let timestamp = new Number((params.data as Configuration).lastUpdatedOn);
          return localDateTimeStamp.transform(timestamp.valueOf());
        }
      }
    ];
  }

  private refreshGrid()
  {
    let itemsToUpdate = [];
    let itemsToRemove = [];
    let itemsToAdd = [];

    let configurations = this.configurationService.getAllConfigurations();
    for(let index = 0; index < configurations.length; ++index)
    {
      let configuration = configurations[index];
      let configurationUpdateRowNode = this.configurationsGridOptions.api.getRowNode(configuration.id);

      if(configurationUpdateRowNode)
        itemsToUpdate.push(configuration);
      else
        itemsToAdd.push(configuration);
    }

    this.configurationsGridOptions.api.forEachNode((currentRow) =>
    {
      let foundMatchingRow = false;
      for(let index = 0; index < configurations.length; ++index)
      {
        if(currentRow.data.id === configurations[index].id)
        {
          foundMatchingRow = true;
          break;
        }
      }

      if(!foundMatchingRow)
        itemsToRemove.push(currentRow.data)
    });

    this.configurationsGridOptions.api.updateRowData({remove: itemsToRemove});
    this.configurationsGridOptions.api.updateRowData({update: itemsToUpdate});

    for(let index = 0; index < itemsToAdd.length; ++index)
      this.configurationsGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
  }

  public onGridReady(event): void
  {

  }

  ngOnInit(): void
  {
  }

  ngOnDestroy(): void
  {
    this.log("Closing two subscriptions in onDestroy.", LogLevel.DEBUG);
    this.configurationService.serviceUpdateSubject.unsubscribe();
    this.gridSearchService.gridSearchTextSubject.unsubscribe();
  }

  public editConfiguration(): void
  {
    let selectedConfiguration: Configuration = this.getSelectedConfiguration();
    if(selectedConfiguration)
      this.configurationService.editConfigurationSubject.next(selectedConfiguration);
  }

  public deleteConfiguration(): void
  {
    let selectedConfiguration: Configuration = this.getSelectedConfiguration();
    if(selectedConfiguration)
      this.configurationService.deleteConfiguration(selectedConfiguration.id);
    this.usageService.usage("deleted configuration");
  }

  public refreshConfiguration(): void
  {
    this.configurationService.loadAllConfigurations();
  }

  public cloneConfiguration(): void
  {
    let selectedConfiguration: Configuration = this.getSelectedConfiguration();
    if(selectedConfiguration)
      this.configurationService.cloneConfigurationSubject.next(selectedConfiguration);
  }

  public addConfiguration(): void
  {
    this.configurationService.addConfigurationSubject.next();
  }
}
