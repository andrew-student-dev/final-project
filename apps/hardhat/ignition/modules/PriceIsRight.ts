import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const PriceIsRightModule = buildModule('PriceIsRightModule', (m) => {
  const hw = m.contract('PriceIsRight');

  return { hw };
});

export default PriceIsRightModule;