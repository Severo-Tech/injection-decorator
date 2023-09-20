import { Injectable } from '@severo-tech/injection-decorator';
import { IMyPrint } from '../services/contracts/my-print';

@Injectable()
export class MyPrintConsole implements IMyPrint {

  public printMessage(message: string): void {
    console.log(message);
  }
}
