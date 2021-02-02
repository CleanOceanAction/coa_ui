import React, { useEffect, useState } from 'react';

import ThreeTierSelect from "../ThreeTierSelect";
import { getItems } from "./ItemAccessor"
export default function ItemSelector({isDisabled, itemId, setItemId}) {
    const [allItems, setAllItems] = useState([]);
    
    useEffect(() => {
        getItems().then((items) => {
            console.log("items", items);
            setAllItems(items);
        });
    }, []);

    return(
        <ThreeTierSelect
            isDisabled={isDisabled}
            allOptions={allItems}
            tier1Title="Material*"
            tier1Prop="material"
            tier2Title="Category*"
            tier2Prop="category"
            tier3Title="Item*"
            tier3Prop="item_name"
            idProp="item_id"
            selectedId={itemId}
            setSelectedId={setItemId}
        />
    );
}
  