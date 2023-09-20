import { ProjectService } from './services';

// Initializing project Layers for Dependency Injection
import './infra'; // All other inner imports are under ./infra/index.ts

const main = async () => {
  const service = new ProjectService();

  await service.doSomething();
}

main().catch(console.error);
