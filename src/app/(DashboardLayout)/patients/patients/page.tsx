'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import ProductPerformance from '../../components/dashboard/ProductPerformance';



import Patients from '../../components/tables/Patients';


const SamplePage = () => {
  return (
    <PageContainer title="Patients" description="List of all patients">
      <DashboardCard >
        <Patients/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

