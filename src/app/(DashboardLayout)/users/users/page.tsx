'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import ProductPerformance from '../../components/dashboard/ProductPerformance';
import Users from '../../components/tables/Users';


const SamplePage = () => {
  return (
    <PageContainer title="Diseases" description="List of all diseases">
      <DashboardCard >
        <Users/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

