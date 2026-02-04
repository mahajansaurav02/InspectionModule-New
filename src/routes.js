import React from 'react'
import EChawadiKamkajTap from './views/inspection-module/E-chawadi-kamkaj-tapasani/EChawadiKamkajTap'
import InspectionReport from './views/reports/Inspection-report/InspectionReport'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Reports
const InspectionOffline = React.lazy(() =>
  import('./views/inspection-module/inspection-offline/AuditFormtrial'),
)
const InspectionOnline = React.lazy(() =>
  import('./views/inspection-module/inspection-online/InspectionOnline'),
)
const CheckInspectionOffline = React.lazy(() =>
  import('./views/inspection-module/check-inspection-offline/CheckInspection'),
)
const CheckInspectionOnline = React.lazy(() =>
  import('./views/inspection-module/check-inspection-online/CheckInspectionOnline'),
)
const viewInspectionOffline = React.lazy(() =>
  import('./views/inspection-module/check-inspection-offline/viewInspection'),
)
const InspectionTableOffline = React.lazy(() =>
  import('./views/inspection-module/check-inspection-offline/InspectionTable'),
)
const InspectionTableOnline = React.lazy(() =>
  import('./views/inspection-module/check-inspection-offline/InspectionTable'),
)

const ShowSatbara = React.lazy(() =>
  import('../src/views/inspection-module/inspection-online/Sections/SectionTables/ShowSatbara'),
)
const ShowEightAView = React.lazy(() =>
  import('../src/views/inspection-module/inspection-online/Sections/SectionTables/ShowEightAView'),
)

const ferfarNondwahiSection1 = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarNondwahiSection1'),
)
const eHakkaSection = React.lazy(() =>
  import('./views/inspection-module/e-hakka-kamkaj-tapasani/eHakkaSection.js'),
)
const OdcAhvalTapasani = React.lazy(() =>
  import('./views/inspection-module/ODC-ahval-tapasani/OdcAhvalTapasani.js'),
)

const FerfarDetailsPage = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/FerfarDetailsPage'),
)

//Circular officer
const CircularForm1 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-1'))
const CircularForm2 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-2'))
const CircularForm3 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-3'))
const CircularForm5 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-5'))
const CircularForm8 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-8'))
const CircularForm9 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-9'))
const CircularForm10 = React.lazy(() => import('./views/Mandal_Office/Reports/circular-form-10'))
const CircularDataentryForm1 = React.lazy(() =>
  import('./views/Mandal_Office/DataEntryForm/CircularDataentryForm1'),
)
const CircularVillageForm1 = React.lazy(() =>
  import('./views/Mandal_Office/DataEntryForm/CircularVillageForm1'),
)

// Taluka officer
const TalukaForm1 = React.lazy(() => import('./views/Taluka_Office/Taluka-form-1'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/inspection-module/inspection-offline', name: 'TrialForm', element: InspectionOffline },
  { path: '/inspection-module/inspection-online', name: 'TrialForm', element: InspectionOnline },
  {
    path: '/inspection-module/check-inspection-offline',
    name: 'Inspection Check',
    element: CheckInspectionOffline,
  },
  {
    path: '/inspection-module/check-inspection-online',
    name: 'Inspection Check',
    element: CheckInspectionOnline,
  },
  {
    path: '/check-inspection-offline/ViewInspection',
    name: 'Print Inspection',
    element: viewInspectionOffline,
  },
  {
    path: '/inspection-module/check-inspection-offline/CheckInspection/InspectionTable',
    name: 'Inspection Check',
    element: InspectionTableOffline,
  },
  {
    path: '/inspection-module/check-inspection-online/CheckInspection/InspectionTable',
    name: 'Inspection Check',
    element: InspectionTableOnline,
  },
  {
    path: '/src/views/inspection-module/inspection-online/Sections/SectionTables/ShowSatbara.js',
    name: 'ShowSatbara',
    element: ShowSatbara,
  },
  {
    path: '/src/views/inspection-module/inspection-online/Sections/SectionTables/ShowEightAView.js',
    name: 'ShowEightAView',
    element: ShowEightAView,
  },
  {
    path: '/inspection-module/ferfarNondvahi/ferfarNondwahiSection1',
    name: 'ferfarNondwahiSection1',
    element: ferfarNondwahiSection1,
  },

  {
    path: '/ferfar-details/:id',
    name: 'Ferfar Details',
    element: FerfarDetailsPage,
  },

  {
    path: '/inspection-module/e-hakka-kamkaj-tapasani/eHakkaSection',
    name: 'eHakkaSection',
    element: eHakkaSection,
  },
  {
    path: '/inspection-module/E-chawadi-kamkaj-tapasani/EChawadiKamkajTap',
    name: 'EChawadiKamkajTap',
    element: EChawadiKamkajTap,
  },
  {
    path: '/reports/Inspection-report/InspectionReport',
    name: 'InspectionReport',
    element: InspectionReport,
  },
  // {
  //   path: '/inspection-module/ODC-ahval-tapasani/OdcAhvalTapasani',
  //   name: 'OdcAhvalTapasani',
  //   element: OdcAhvalTapasani,
  // },

  //ocr trial

  { path: '/Mandal_Office/circular-form-1', name: 'Circular Form', element: CircularForm1 },
  { path: '/Mandal_Office/circular-form-2', name: 'Circular Form', element: CircularForm2 },
  { path: '/Mandal_Office/circular-form-3', name: 'Circular Form', element: CircularForm3 },
  { path: '/Mandal_Office/circular-form-5', name: 'Circular Form', element: CircularForm5 },
  { path: '/Mandal_Office/circular-form-8', name: 'Circular Form', element: CircularForm8 },
  { path: '/Mandal_Office/circular-form-9', name: 'Circular Form', element: CircularForm9 },
  { path: '/Mandal_Office/circular-form-10', name: 'Circular Form', element: CircularForm10 },

  {
    path: '/Mandal_Office/DataEntryForm/CircularDataentryForm1',
    name: 'Circular Form',
    element: CircularDataentryForm1,
  },
  {
    path: '/Mandal_Office/DataEntryForm/CircularVillageForm1',
    name: 'Circular Form',
    element: CircularVillageForm1,
  },
  { path: '/Taluka_Office/Taluka-form-1', name: 'Circular Form', element: TalukaForm1 },
]

export default routes
