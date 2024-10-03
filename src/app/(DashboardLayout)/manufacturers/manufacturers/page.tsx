'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import ProductPerformance from '../../components/dashboard/ProductPerformance';



import Drugs from '../../components/tables/Drugs';
import Manufacturers from '../../components/tables/Manufacturer';


const SamplePage = () => {
  return (
    <PageContainer title="Diseases" description="List of all diseases">
      <DashboardCard >
        <Manufacturers/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

