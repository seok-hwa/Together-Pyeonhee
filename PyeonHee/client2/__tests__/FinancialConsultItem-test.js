import 'react-native';
import React from 'react';
import FinancialConsultItem from '../Components/Screens/AssetsTab/CounselingTab/FinancialConsultItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('FinancialConsultItem 렌더링', () => {
  renderer.create(<FinancialConsultItem />);
});