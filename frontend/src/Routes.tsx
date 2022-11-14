import { Suspense, lazy } from "react";
import LoadingScreen from './components/LoadingScreen';


const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);





const Landing = Loadable(lazy(() => import("./views/Landing")));

const routes: any = [
    {
        path: "/",
        element: (
            <Landing />
        )
    },
];


export default routes;