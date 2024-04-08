import React, { useContext } from "react";
import Customlayout from "./pages/Customlayout";
import Defaultpage from "./common/components/Defaultpage";
import DrawerMainPage from "./pages/DrawerHeader";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage"
import DailyAnalysis from "./pages/DailyAnalysis"
import ClipsRepo from "./pages/ClipsRepos";
import DetecionsRepo from "./pages/DetecionRepo";
import  VideoCollection  from "./pages/ToolVideos";
import AnnotationEditor from "./pages/AnnotationEditor";
export default function Routers(Redirectpath, getConstValue) {
  let route = [
    {
      path: "/",
      element: <Customlayout Redirectpath={Redirectpath} />,
      children: [
        { index: "/", element: <DrawerMainPage Redirectpath={Redirectpath}/>,
        children:[
          {
            index: true,
            element: <HomePage Redirectpath={Redirectpath} />,
          },
          {
            path: "/home-preview",
            element: <DailyAnalysis Redirectpath={Redirectpath} />,
          },
          {
            path: "/analyticsDetecionPage",
            element: <DetecionsRepo Redirectpath={Redirectpath} />
          },
          {
            path: "/DataPreTool",
            element: <HomePage Redirectpath={Redirectpath} />,
          },
          {path: "/video-farmes-viewer", element: <VideoCollection  Redirectpath={Redirectpath}/>},
          {path: "/video-farmes-extactor", element: <AnnotationEditor  Redirectpath={Redirectpath}/>}
        ]
      },       
        { path: "/signup", element: <div>hello user</div>},
        { path: "/errorPage", element: <ErrorPage Redirectpath={Redirectpath}/> },
        {
          path: "/home-preview1",
          element: <DailyAnalysis Redirectpath={Redirectpath} />,
        },
      ],
    },
    { path: "*", element: <Defaultpage /> }, 
  ];
  return route;
}

// "roughjs": "^4.6.6",