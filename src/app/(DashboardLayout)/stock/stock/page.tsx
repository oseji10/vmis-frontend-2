'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import ProductPerformance from '../../components/dashboard/ProductPerformance';

import Stocks from '../../components/tables/Stock';


const SamplePage = () => {
  return (
    <PageContainer title="Diseases" description="List of all diseases">
      <DashboardCard >
        <Stocks/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

