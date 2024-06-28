import React from 'react'
import { useTranslation } from 'react-i18next'

import SaleChart from '../Dashboard_components/chart/Chart'
import Summary from '../Dashboard_components/summary/Summary'
import DashboardTables from '../Dashboard_components/tables/DashboardTables'

function Dashboard() {
  const { t } = useTranslation()
  return (
    <section>
      <h2 className="title">{t('dashboard')}</h2>
      <Summary />
      <SaleChart />
      <DashboardTables />
    </section>
  )
}

export default Dashboard
