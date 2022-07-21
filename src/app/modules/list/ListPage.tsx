import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SearchComponents} from './components/Search'
import {ListHeader} from './ListHeader'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/list/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ListPage = () => (
  <Routes>
    <Route
      element={
        <>
          <ListHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='search'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Search</PageTitle>
            <SearchComponents />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/list/search' />} />
    </Route>
  </Routes>
)

export default ListPage