'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import ProductPerformance from '../../components/dashboard/ProductPerformance';

import Sales from '../../components/tables/Transaction';
import Transactions from '../../components/tables/Transaction';


const SamplePage = () => {
  return (
    <PageContainer title="Transactions" description="List of all transactions">
      <DashboardCard >
        <Transactions/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

