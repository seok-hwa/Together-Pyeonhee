import 'react-native';
import React from 'react';
import AssetConsultItem from '../Components/Screens/AssetsTab/CounselingTab/AssetConsultItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('AssetConsultItem 렌더링', () => {
  renderer.create(<AssetConsultItem />);
});