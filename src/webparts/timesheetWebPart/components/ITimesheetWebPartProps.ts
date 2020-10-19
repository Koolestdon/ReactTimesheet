import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ITimesheetWebPartProps {
  description: string;
  context: WebPartContext;
  siteUrl: string;
  userName: string;
}
