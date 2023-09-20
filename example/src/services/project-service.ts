import { Inject } from '@severo-tech/injection-decorator';
import { IMyPrint } from './contracts/my-print';

export class ProjectService {

  @Inject('MyPrintConsole')
  private readonly myInjectablePrintObject!: IMyPrint;

  public async doSomething(): Promise<void> {
    this.myInjectablePrintObject.printMessage('Hello World');

    // Do whatever you want...
  }
}
