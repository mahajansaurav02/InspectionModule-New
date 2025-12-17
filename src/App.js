import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './i18n/i18n.js'
import FerfarDetailsPage from './views/inspection-module/ferfarNondvahi/ferfarSections/FerfarDetailsPage'
import ViewOtherFerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/otherFerfar/ViewOtherFerfarList'
import ViewReEntryFerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/reEntryFerfar/ViewReEntryFerfarList'
import ViewRejectedFerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/rejectedFerfar/ViewRejectedFerfarList'
import ViewsSection155FerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/section155Ferfar/ViewsSection155FerfarList'
import TrutiArjTooltip from './views/inspection-module/e-hakka-kamkaj-tapasani/truti-arj-tapasani/TrutiArjTooltip'
import TrutiArjList from './views/inspection-module/e-hakka-kamkaj-tapasani/truti-arj-tapasani/TrutiArjList'
import TalathiApplicationList from './views/inspection-module/e-hakka-kamkaj-tapasani/talathi-arj-tapasani/TalathiApplicationList'
import ApplicationDetailPage from './views/inspection-module/e-hakka-kamkaj-tapasani/ApplicationDetailPage'
import OdcAhvalTapasani from './views/inspection-module/ODC-ahval-tapasani/OdcAhvalTapasani'
import { MagniDurustiReporttapa } from './views/inspection-module/E-chawadi-kamkaj-tapasani/MagniDurustiReport/MagniDurustiReporttapa'
import { NirankGavNamunaTapa } from './views/inspection-module/E-chawadi-kamkaj-tapasani/NirankGavNamuna/NirankGavNamunaTapa'
import AkrushakDarTapa from './views/inspection-module/E-chawadi-kamkaj-tapasani/AkrushakDarTapa/AkrushakDarTapa'
import VasuliTapsil from './views/inspection-module/E-chawadi-kamkaj-tapasani/VasuliTapsil/VasuliTapsil'
import DyslrAkarbandTapasani from './views/inspection-module/E-chawadi-kamkaj-tapasani/DyslrAkarband/DyslrAkarbandTapasani'
import TemplateFerfar from './views/inspection-module/ferfarNondvahi/ferfarSections/templateFerfar/TemplateFerfar'
import ViewTemplateFerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/templateFerfar/ViewTemplateFerfarList'
import NiyantritFerfar from './views/inspection-module/ferfarNondvahi/ferfarSections/niyantritFerfar/NiyantritFerfar'
import ViewNiyantritFerfar from './views/inspection-module/ferfarNondvahi/ferfarSections/niyantritFerfar/ViewNiyantritFerfar'
import SthagitiFerfar from './views/inspection-module/ferfarNondvahi/ferfarSections/sthagitiFerfar/SthagitiFerfar'
import ViewSthagitiFerfarList from './views/inspection-module/ferfarNondvahi/ferfarSections/sthagitiFerfar/ViewSthagitiFerfarList'
import LoadingScreen from './views/ui/LoadingScreen'
import LoadingSpinner from './Models/LoadingSpinner'
import { loginSuccess } from './slices/authSlice'
import store from './store'
// import OrderFerfar from '.'
const loading = (
  <div className="loading-state">
    <LoadingSpinner message="Loading...." />
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const OrderFerfar = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/orderFerfar/OrderFerfar'),
)
const Section155Ferfar = React.lazy(() =>
  import(
    './views/inspection-module/ferfarNondvahi/ferfarSections/section155Ferfar/Section155Ferfar'
  ),
)
const ReEntryFerfar = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/reEntryFerfar/ReEntryFerfar'),
)
const OtherFerfar = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/otherFerfar/OtherFerfar'),
)
const RejectedFerfar = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/rejectedFerfar/RejectedFerfar'),
)

const ViewOrderFerfarLIst = React.lazy(() =>
  import('./views/inspection-module/ferfarNondvahi/ferfarSections/orderFerfar/ViewOrderFerfarLIst'),
)
const EHakkTooltips = React.lazy(() =>
  import('./views/inspection-module/e-hakka-kamkaj-tapasani/eHakkTooltips'),
)
class App extends Component {

 componentDidMount() {
    const savedAuth = localStorage.getItem('auth')
console.log(savedAuth,"================")
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth)
        store.dispatch(loginSuccess(parsedAuth))
      } catch (e) {
        console.error('Failed to rehydrate auth state', e)
        localStorage.removeItem('authState')
      }
    }
  }


  
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />{' '}
            <Route exact path="/register" name="Register Page" element={<Register />} />{' '}
            <Route exact path="/404" name="Page 404" element={<Page404 />} />{' '}
            <Route exact path="/500" name="Page 500" element={<Page500 />} />{' '}
            <Route path="*" name="Home" element={<DefaultLayout />} />{' '}
            {/* ferfar-Nondvahi-routes */}
            <Route
              exact
              path="/ferfarNondvahi/order-ferfar"
              name="order-ferfar"
              element={<OrderFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/other-ferfar"
              name="other-ferfarsaurav"
              element={<OtherFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/reentry-ferfar"
              name="reentry-ferfar"
              element={<ReEntryFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/rejected-ferfar"
              name="rejected-ferfar"
              element={<RejectedFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/section-155"
              name="section-155"
              element={<Section155Ferfar />}
            />
            <Route exact path="/ferfar-details/:id" element={<FerfarDetailsPage />} />
            <Route
              exact
              path="/ferfarNondvahi/niyantrit-ferfar"
              name="niyantrit-ferfar"
              element={<NiyantritFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/template-ferfar"
              name="template-ferfar"
              element={<TemplateFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/sthagiti-ferfar"
              name="sthagiti-ferfar"
              element={<SthagitiFerfar />}
            />
            {/* view-ferfar-routs */}
            <Route
              exact
              path="/ferfarNondvahi/order-ferfar/view"
              name="order-ferfar-view"
              element={<ViewOrderFerfarLIst />}
            />
            <Route
              exact
              path="/ferfarNondvahi/other-ferfar/view"
              name="other-ferfar-view"
              element={<ViewOtherFerfarList />}
            />
            <Route
              exact
              path="/ferfarNondvahi/reentry-ferfar/view"
              name="reEntry-ferfar-view"
              element={<ViewReEntryFerfarList />}
            />
            <Route
              exact
              path="/ferfarNondvahi/rejected-ferfar/view"
              name="rejected-ferfar-view"
              element={<ViewRejectedFerfarList />}
            />
            <Route
              exact
              path="/ferfarNondvahi/section155-ferfar/view"
              name="section155-ferfar-view"
              element={<ViewsSection155FerfarList />}
            />
            <Route
              exact
              path="/ferfarNondvahi/niyantrit-ferfar/view"
              name="niyantrit-ferfar-view"
              element={<ViewNiyantritFerfar />}
            />
            <Route
              exact
              path="/ferfarNondvahi/template-ferfar/view"
              name="template-ferfar-view"
              element={<ViewTemplateFerfarList />}
            />
            <Route
              exact
              path="/ferfarNondvahi/sthagiti-ferfar/view"
              name="sthagiti-ferfar-view"
              element={<ViewSthagitiFerfarList />}
            />
            {/* E-hakk-Tapasani=routes */}
            <Route
              exact
              path="/e-hakka-kamkaj-tapasani/info/:id"
              name="e-hakka-tapasani-tooltip"
              element={<EHakkTooltips />}
            />
            <Route
              exact
              path="/e-hakka-kamkaj-tapasani/info-truti-arj"
              name="e-hakka-tapasani-tooltip-truti"
              element={<TrutiArjTooltip />}
            />
            <Route
              exact
              path="/e-hakka-kamkaj-tapasani/truti-applications"
              name="e-hakka-tapasani-tooltip-truti"
              element={<TrutiArjList />}
            />
            <Route
              exact
              path="/e-hakka-kamkaj-tapasani/talathi-applications/:conditionId"
              name="e-hakka-tapasani-tooltip-talathi"
              element={<TalathiApplicationList />}
            />
            <Route
              exact
              path="/truti-applications-details/:id"
              name="e-hakka-tapasani-tooltip-truti"
              element={<ApplicationDetailPage />}
            />
            {/* <Route exact path="/ferfar-details/:id" element={<FerfarDetailsPage />} /> */}
            {/* odc अहवाल तपासणी  */}
            <Route
              exact
              path="/inspection-module/ODC-ahval-tapasani/OdcAhvalTapasani"
              name="OdcAhvalTapasani"
              element={<OdcAhvalTapasani />}
            />
            {/* E-chaeadi
                   तपासणी  */}
            <Route
              exact
              path="/e-chawadi-kamkaj-tapasani/nirank-namuna-tapasani"
              name="nirank-namuna-tapasani"
              element={<NirankGavNamunaTapa />}
            />
            <Route
              exact
              path="/e-chawadi-kamkaj-tapasani/magani-durusti-report"
              name="magani-durusti-report"
              element={<MagniDurustiReporttapa />}
            />
            <Route
              exact
              path="/e-chawadi-kamkaj-tapasani/akrushaki-dar-tapasani"
              name="akrushaki-dar-tapasani"
              element={<AkrushakDarTapa />}
            />
            <Route
              exact
              path="/e-chawadi-kamkaj-tapasani/vasuli-tapsil"
              name="vasuli-tapsil"
              element={<VasuliTapsil />}
            />
            <Route
              exact
              path="/e-chawadi-kamkaj-tapasani/dyslr-akarband"
              name="dyslr-akarband-tapsil"
              element={<DyslrAkarbandTapasani />}
            />
          </Routes>{' '}
        </Suspense>{' '}
      </HashRouter>
    )
  }
}

export default App
