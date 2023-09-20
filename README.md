# @severo-tech/injection-decorator

A very simple way to inject dependencies using decorators. It's means that it allow us to implements a easy dependency inversion, using SOLID and Clean Architecture principles.

## Installation
Installing package (npm):
```bash
npm install -S @severo-tech/injection-decorator
```

Installing package (yarn):
```bash
yarn add @severo-tech/injection-decorator
```

## Using

### Project setting up
```json
// tsconfig.json
{
  "compilerOptions": {
    ...
    "target": "ES5", // minimum target
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
  ...
}
```

### Code using

Segregating interfaces
```ts
// my-print.ts
export interface IMyPrint {
  printMessage: (message: string) => void;
}
```

You need to decorate your implementation classes to allow injection.
```ts
// my-print-console.ts
import { Injectable } from '@severo-tech/injection-decorator';
import { IMyPrint } from './my-print';

@Injectable()
export class MyPrintConsole implements IMyPrint {

  public printMessage(message: string): void {
    console.log(message);
  }
}
```

Afterwards, all decorated classes can be injected as an attribute in another class
```ts
// project-service.ts
import { Inject } from '@severo-tech/injection-decorator';

import { IMyPrint } from './my-print';

export class ProjectService {

  @Inject('MyPrintConsole')
  private readonly myInjectablePrintObject!: IMyPrint;

  public async doSomething(): Promise<void> {
    this.myInjectablePrintObject.printMessage('Hello World');
    ...
  }
}
```

### Executing project

To enable the proper construction of decorated objects as "Injectable" by the library, it is necessary for the .ts files to be loaded into Node's memory.

Therefore, it is necessary for all Injectable class files to be imported into the project's initial file (index.ts), before they are used within dependent classes.
```ts
// index.ts
import { ProjectService } from './project-service.ts';

// Initializing project Layers for Dependency Injection
import 'my-print-console.ts';

const main = async () => {
  const service = new ProjectService();

  await service.doSomething();
}

main().catch(console.error);
```

Executing
```bash
ts-node-dev --transpile-only ./index.ts
```


## Testing
Using the previous decorated classes, you can overload the injected object

```ts
// testing-injection.spec.ts
import { testUtils } from '@severo-tech/injection-decorator';

import { TestingInjection } from './testing-injection';

describe('TestingInjection', () => {
  let testingInjection: TestingInjection;

  let printMessageMock: jest.Mock;

  beforeAll(() => {
    testingInjection = new TestingInjection();

    printMessageMock = jest.fn();
    testUtils.overloadInjectable('MyInjectablePrint', { printMessage: printMessageMock })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should call mocked function', () => {
    testingInjection.doSomething();

    expect(printMessageMock).toBeCalledTimes(1);
    expect(printMessageMock).toBeCalledWith('Hello World')
  });
});

```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Severo-Tech/injection-decorator.


## License

The npm package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
