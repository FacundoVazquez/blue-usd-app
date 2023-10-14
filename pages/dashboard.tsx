/* eslint-disable arrow-body-style */

import { NextPage } from 'next';
import PriceComparator from '../components/price-comparator/price-comparator';

const Dashboard: NextPage = () => {
  return (
    <>
      <PriceComparator />
    </>
  );
};

export default Dashboard;
