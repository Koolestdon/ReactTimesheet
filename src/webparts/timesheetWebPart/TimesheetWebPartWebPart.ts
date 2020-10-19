import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TimesheetWebPartWebPartStrings';
import TimesheetWebPart from './components/TimesheetWebPart';
import { ITimesheetWebPartProps } from './components/ITimesheetWebPartProps';
import { ISPList } from './Model/IReactTimesheet';



export interface ITimesheetWebPartWebPartProps {
  description: string;
}

export default class TimesheetWebPartWebPart extends BaseClientSideWebPart<ITimesheetWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITimesheetWebPartProps> = React.createElement(
      TimesheetWebPart,
      {
        context: this.context,
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        userName: this.context.pageContext.user.displayName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
