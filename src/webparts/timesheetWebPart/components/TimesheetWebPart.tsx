import * as React from 'react';
import styles from './TimesheetWebPart.module.scss';
import { ITimesheetWebPartProps } from './ITimesheetWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IReactTimesheet } from '../Model/IReactTimesheet';
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DatePicker } from 'office-ui-fabric-react';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { ISPList } from '../Model/IReactTimesheet';
require('../styles/custom.css');


export default class TimesheetWebPart extends React.Component<ITimesheetWebPartProps, IReactTimesheet> {
  totalForDay: number;

  constructor(props) {
    super(props);
    this.handleDate = this.handleDate.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleHours = this.handleHours.bind(this);
    this._onRenderFooterContent = this._onRenderFooterContent.bind(this);
    this.createItem = this.createItem.bind(this);
    this.getTimesheetItems = this.getTimesheetItems.bind(this);
    this.totalForDay= 0;
    

    this.state = {
      date: new Date(),
      hours: "1",
      description: "",
      selectedItems: [],
      hideDialog: true,
      showPanel: false,
      dpselectedItem: undefined,
      dpselectedItems: [],
      disableToggle: false,
      defaultChecked: false,
      status: "",
      required: "This is required",
      onSubmission: false
      
    };
    


  }

  public render(): React.ReactElement<ITimesheetWebPartProps> {
    const { dpselectedItem, dpselectedItems } = this.state;
    const { date, description, hours } = this.state;
    pnp.setup({
      spfxContext: this.props.context
    });

    this.getTimesheetItems();

    return (

      <form>
        <div className={styles.timesheetWebPart}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className="ms-Grid-col ms-u-sm12 block">
                <h2 className="ms-Label">Welcome {this.props.userName}, Please complete your timesheet for the day.</h2>
              </div>

              <div className="ms-Grid-col ms-u-sm12 block">
                <label className="ms-Label">Date</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <DatePicker placeholder="Select a date..."
                  onSelectDate={this.handleDate}
                  value={this.state.date}
                  formatDate={this._onFormatDate}
                  isRequired={true}
                  



                />

              </div>

              <div className="ms-Grid-col ms-u-sm12 block">
                <label className="ms-Label">Category</label><br />
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <Dropdown
                  placeHolder="Select an Option"
                  label=""
                  id="component"
                  selectedKey={dpselectedItem ? dpselectedItem.key : undefined}
                  ariaLabel="Basic dropdown"
                  options={[
                    { key: 'Billable', text: 'Billable' },
                    { key: 'Non-Billable', text: 'Non-Billable' },
                    { key: 'Upskilling', text: 'Upskilling' },
                    { key: 'Meeting', text: 'Meeting' }
                  ]}
                  onChanged={this.handleCategory}
                />
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <label className="ms-Label">Hours Spent</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <TextField type="number" step={0.5} value={this.state.hours} onChanged={this.handleHours}
                />
              </div>

              <div className="ms-Grid-col ms-u-sm12 block">
                <label className="ms-Label">Description</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <TextField multiline autoAdjustHeight value={this.state.description} onChanged={this.handleDesc}
                />
              </div>

              <div className="ms-Grid-col ms-u-sm7 block"></div>
              <div className="ms-Grid-col ms-u-sm2 block">
                <PrimaryButton className={styles.button} text="Create" onClick={() => { this.validateForm(); }} />
              </div>
              <div className="ms-Grid-col ms-u-sm2 block">
                <DefaultButton className={styles.button} text="Cancel" onClick={() => { this.setState({}); }} />
              </div>
              <div>
                <Panel
                  isOpen={this.state.showPanel}
                  type={PanelType.smallFixedFar}
                  onDismiss={this._onClosePanel}
                  isFooterAtBottom={false}
                  headerText="Are you sure you want to submit ?"
                  closeButtonAriaLabel="Close"
                  onRenderFooterContent={this._onRenderFooterContent}
                ><span>Please check the details filled and click on Confirm button to submit.</span>
                </Panel>
              </div>
              <Dialog
                hidden={this.state.hideDialog}
                onDismiss={this._closeDialog}
                dialogContentProps={{
                  type: DialogType.largeHeader,
                  title: 'Request Submitted Successfully',
                  subText: ""
                }}
                modalProps={{
                  titleAriaId: 'myLabelId',
                  subtitleAriaId: 'mySubTextId',
                  isBlocking: false,
                  containerClassName: 'ms-dialogMainOverride'
                }}>
                <div dangerouslySetInnerHTML={{ __html: this.state.status }} />
                <DialogFooter>
                  <PrimaryButton onClick={() => this.gotoHomePage()} text="Okay" />
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      </form>

    );


  }


  private handleDate = (date: Date | null | undefined): void => {
    this.setState({ date: date });
    // this.getTimesheetItems();
  }

  private _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }


  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton onClick={this.createItem} style={{ marginRight: '8px' }}>
          Confirm
        </PrimaryButton>
        <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
      </div>
    );
  }

  private _log(str: string): () => void {
    return (): void => {
      console.log(str);
    };
  }

  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  }

  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  }


  private handleCategory = (item: IDropdownOption): void => {

    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ dpselectedItem: item });

  }


  private handleHours(value: string): void {
    return this.setState({
      hours: value
    });
  }

  private handleDesc(value: string): void {

    return this.setState({
      description: value
    });
  }


  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  }

  private _showDialog = (status: string): void => {
    this.setState({ hideDialog: false });
    this.setState({ status: status });
  }

  private validateForm(): void {
    let allowCreate: boolean = true;
    this.setState({ onSubmission: true });

    if (this.state.dpselectedItem == null) {
      allowCreate = false;
      alert("Please provide a category");

    }

    if (parseFloat(this.state.hours) < 0) {
      allowCreate = false;
      alert("Invalid hours provided");
    }

    if (this.state.description.length === 0) {
      allowCreate = false;
      alert("Please provide a description");
    }

    if (allowCreate) {
      this._onShowPanel();
    }
    else {
      console.log("do nothing");
      //do nothing
    }
  }

  private gotoHomePage(): void {
    window.location.replace(this.props.siteUrl);
  }

  private createItem(): void {
    this._onClosePanel();
    this._showDialog("Submitting Request");
    var totalHours = (parseFloat(this.state.hours ) + this.totalForDay );

    var approvalStatus = "Approved";
    if (totalHours <= 8) {
    }
    else {
      approvalStatus ="Pending";
    }

    pnp.sp.web.lists.getByTitle("Timesheet").items.add({
      Title: this.props.userName + " - " + this.state.date.toDateString(),
      Description: this.state.description,
      Category: this.state.dpselectedItem.key,
      Date: this.state.date,
      Hours: this.state.hours,
      Status: approvalStatus

    }).then((iar: ItemAddResult) => {
      if (totalHours <= 8) {
        this.setState({ status: "Your request has been submitted sucessfully " });
      }
      else {
        this.setState({ status: "Your request has been submitted for overtime approval. " });
      }

    });
  }

  public
  private getTimesheetItems(): void {

    var list = pnp.sp.web.lists.getByTitle("Timesheet");
    var query = '<Where><Eq><FieldRef Name="Date"/><Value Type="DateTime" >' + this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate() + '</Value></Eq></Where>';
    var sumHours = 0;
    console.log(query);

    this.getItemsByViewQuery("Timesheet", query).then((items: ISPList[]) => {
      items.forEach((item: ISPList) => {
        //console.log(item.Id);
        sumHours += item.Hours;
      });

      this.totalForDay =sumHours;
      console.log(sumHours);
    })

    //this.setState({ totalForDay: sumHours });
    

  }

  public getItemsByViewQuery(listName: string, query: string): Promise<any> {
    const xml = '<View><Query>' + query + '</Query></View>';
    return pnp.sp.web.lists.getByTitle(listName).getItemsByCAMLQuery({ 'ViewXml': xml }).then((res: SPHttpClientResponse) => {
      return res;
    })
  }

}


