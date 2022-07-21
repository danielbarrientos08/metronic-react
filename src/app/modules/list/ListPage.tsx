import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SearchComponents} from './components/Search'

const profileBreadCrumbs: Array<PageLink> = [
]

const ListPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path='search'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Estudiantes por Carrera</PageTitle>
            <SearchComponents />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/list/search' />} />
    </Route>
  </Routes>
)

export default ListPage