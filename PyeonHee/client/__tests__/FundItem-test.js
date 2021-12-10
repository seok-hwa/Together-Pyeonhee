import 'react-native';
import React from 'react';
import FundItem from '../Components/Screens/AssetsTab/BankingProductTabs/FundItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('FundItem 렌더링', () => {
  renderer.create(<FundItem />);
});