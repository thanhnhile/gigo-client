import { Fragment } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "./components/Layout";


function App() {
  return (
    <Router>
        <div className="App">
        <Routes>
          {
            publicRoutes.map((route,index)=>{
              //null only its layout Fragment
              //none DefaultLayout
              //hava layout
              const Layout = route.hasOwnProperty('layout') ? route.layout ?? Fragment : DefaultLayout
              const Page = route.component;
              return <Route key={index} path={route.path} 
              element={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            })
          }
          </Routes>
        </div>
    </Router>
  );
}

export default App;
