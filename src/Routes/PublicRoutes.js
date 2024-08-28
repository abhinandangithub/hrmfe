import { createBrowserHistory } from 'history'
import { memo } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FullLoader } from '../Components/LoaderBox/Loader'
import NotFound from './NotFound'

export const history = createBrowserHistory()

const RouteWrapper = FullLoader(() => import('./RouteWrapper'))

const metaDetails = {
  aboutUs: {
    title:
      'Digitize your business with cloud based ERP along with online e-invoicing (Fatoorah qr code) solution in Saudi Arabia',
    description:
      'Cloud based ERP and online e-invoicing (Fatoorah qr code) solution provider to digitize your business in 2 hours with low price',
    keyword: 'Digital Business, Cloud based ERP, e-invoice (Fatoorah qr code) in Saudi, fatoorah qr code'
  },
  pricing: {
    title: 'Low Budget online e-invoicing (Fatoorah qr code) solution with zatca procedure',
    description:
      'Safe, online, low budget e-invoicing (Fatoorah qr code) solution provider to improve your business in Saudi Arabia (KSA)',
    keyword: 'Low budget e-invoice solution, fatoorah Saudi arabia'
  }
}

const routes = [
  { path: '/', screen: FullLoader(() => import('../Screens/Login/Login')), headerFooter: false },
  { path: '/login', screen: FullLoader(() => import('../Screens/Login/Login')), headerFooter: false },
  {
    path: '/register',
    screen: FullLoader(() => import('../Screens/Register/Register')),
    headerFooter: false
  },
  { path: '/forgot-password', screen: FullLoader(() => import('../Screens/ForgotPassword/ForgotPassword')) },
  { path: '/reset-password', screen: FullLoader(() => import('../Screens/ResetPassword/ResetPassword')) },
  {
    path: '/email-verification',
    screen: FullLoader(() => import('../Screens/EmailVerification/EmailVerification')),
    headerFooter: false
  },
  { path: '/privacy-policy', screen: FullLoader(() => import('../Screens/PrivacyPolicy/PrivacyPolicy')) },
  {
    path: '/terms-and-conditions',
    screen: FullLoader(() => import('../Screens/TermsandConditions/TermsandConditions'))
  },

  { path: '/legal', screen: FullLoader(() => import('../Screens/Legal/Legal')) },
  {
    path: '/about-us',
    screen: FullLoader(() => import('../Screens/Aboutus/Aboutus')),
    metaObj: metaDetails.aboutUs
  },
  { path: '/careers', screen: FullLoader(() => import('../Screens/Careers/Careers')) },
  { path: '/contact-us', screen: FullLoader(() => import('../Screens/Contactus/Contactus')) },

  { path: '/data-security', screen: FullLoader(() => import('../Screens/DataSecurity/DataSecurity')) },
  {
    path: '/application-support-and-maintenance',
    screen: FullLoader(() => import('../Screens/ApplicationSupport/ApplicationSupport'))
  },
  {
    path: '/disaster-recovery',
    screen: FullLoader(() => import('../Screens/DisasterRecovery/DisasterRecovery'))
  },
  {
    path: '/enhancements-and-upgrades',
    screen: FullLoader(() => import('../Screens/EnhancementsUpgrades/EnhancementsUpgrades'))
  },
  {
    path: '/signature',
    screen: FullLoader(() => import('../Screens/Signature/Signature')),
    headerFooter: false
  }
]

function Routes() {
  return (
    <Switch>
      {routes.map(({ path, screen, exact = true, headerFooter = true, metaObj }) => (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={(props) => (
            <RouteWrapper {...props} headerFooter={headerFooter} metaObj={metaObj} screen={screen} />
          )}
        />
      ))}
      <Redirect from="/app" to="/login" />
      <Route component={NotFound} />
    </Switch>
  )
}

export default memo(Routes)
