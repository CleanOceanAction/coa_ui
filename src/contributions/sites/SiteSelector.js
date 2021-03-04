import './SiteSelector.css';
import React, { useEffect, useState } from 'react';

import ThreeTierSelect from "../ThreeTierSelect.js";
import { getSites } from "./SiteAccessor"
export default function SiteSelector({isDisabled, title="Location", siteId, setSiteId}) {
    const [allSites, setAllSites] = useState([]);
    
    useEffect(() => {
        getSites().then((sites) => {
            console.log("sites", sites);
            setAllSites(sites);
        });
    }, []);

    return(
        <ThreeTierSelect
            isDisabled={isDisabled}
            title={title}
            allOptions={allSites}
            tier1Title="County*"
            tier1Prop="county"
            tier2Title="Town*"
            tier2Prop="town"
            tier3Title="Site*"
            tier3Prop="site_name"
            idProp="site_id"
            selectedId={siteId}
            setSelectedId={setSiteId}
        />
    );
}
  