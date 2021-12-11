import 'react-native';
import React from 'react';
import PensionItem from '../Components/Screens/AssetsTab/BankingProductTabs/PensionItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('PensionItem 렌더링', () => {
  renderer.create(<PensionItem />);
});