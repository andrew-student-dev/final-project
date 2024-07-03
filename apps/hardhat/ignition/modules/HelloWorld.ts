import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const HelloWorldModule = buildModule('HelloWorldModule', (m) => {
  const hw = m.contract('HelloWorld');

  return { hw };
});

export default HelloWorldModule;
