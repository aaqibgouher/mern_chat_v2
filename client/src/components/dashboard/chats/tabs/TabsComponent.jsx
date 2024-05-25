import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_TAB } from "../../../../actionTypes/helperActionTypes";

const TabsComponent = () => {
  const tabs = {
    solo: "SOLO",
    group: "GROUP",
    status: "STATUS",
  };
  const dispatch = useDispatch();
  const [tab, setTab] = useState(tabs.solo);
  const tabState = useSelector((state) => state.helperReducers.activeTab);

  //   update state
  const handleChange = (event, newValue) => {
    dispatch({
      type: ACTIVE_TAB,
      payload: newValue,
    });
  };

  //   if tab is changes, update local tab
  useEffect(() => {
    if (tabState) {
      setTab(tabState);
    }
  }, [tabState]);

  return (
    <>
      {/* Start: Tabs */}
      <Tabs value={tab} onChange={handleChange} aria-label="icon tabs example">
        <Tab icon={<PersonIcon />} value={tabs?.solo} />
        <Tab icon={<GroupsIcon />} value={tabs?.group} />
        <Tab icon={<DonutLargeIcon />} value={tabs?.status} />
      </Tabs>
      {/* End: Tabs */}
    </>
  );
};

export default TabsComponent;
