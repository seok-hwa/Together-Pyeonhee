import 'react-native';
import React from 'react';
import AccountItem from '../Components/Screens/AssetsTab/Account/AccountItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('AccountItem 렌더링', () => {
  renderer.create(<AccountItem />);
});