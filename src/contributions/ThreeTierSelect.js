import './ThreeTierSelect.css';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const sortByLabel = (lhs, rhs) => {
    const LHS = lhs.label.toUpperCase();
    const RHS = rhs.label.toUpperCase();
    return (LHS < RHS) ? -1 : ((LHS > RHS) ? 1 : 0);
};

export default function ThreeTierSelect({isDisabled, allOptions,
        tier1Title, tier1Prop, tier2Title, tier2Prop, tier3Title, tier3Prop, idProp,
        selectedId, setSelectedId}) {
    const [selection, setSelection] = useState({
        "tier1": {},
        "tier2": {},
        "tier3": {}
    });
    const [tier1Options, setTier1Options] = useState([]);
    const [tier2Options, setTier2Options] = useState([]);
    const [tier3Options, setTier3Options] = useState([]);
    
    const setTier1 = (tier1Selection) => {
        console.log("setTier1", tier1Selection);
        setSelection({
            "tier1": tier1Selection,
            "tier2": {},
            "tier3": {}
        });
        setSelectedId(undefined);
    };
    
    const setTier2 = (tier2Selection) => {
        console.log("tier2Selection", tier2Selection);
        if (tier2Selection) {
            const option = allOptions.find(option => option[tier2Prop] === tier2Selection.value);
            if (option) {
                setSelection({
                    "tier1": {value: option[tier1Prop], label: option[tier1Prop]},
                    "tier2": {value: option[tier2Prop], label: option[tier2Prop]},
                    "tier3": {},
                });
            }
        }
        else {
            setSelection({
                "tier1": selection.tier1,
                "tier2": {},
                "tier3": {}
            })
        }
        setSelectedId(undefined);
    };

    const setTier3 = (tier3Selection) => {
        console.log("tier3Selection", tier3Selection);
        if (tier3Selection) {
            setSelectedId(tier3Selection.value);
        }
        else {
            setSelection({
                "tier1": selection.tier1,
                "tier2": selection.tier2,
                "tier3": {}
            });
        }
    }

    useEffect(() => {
        console.log("ThreeTierSelect::useEffect selectedId", selectedId);
        if (selectedId) {
            const option = allOptions.find(option => option?.[idProp]?.toString() === selectedId.toString());
            console.log(option);
            if (option && option[idProp] !== selection.tier3.value) {
                setSelection({
                    "tier1": {value: option[tier1Prop], label: option[tier1Prop]},
                    "tier2": {value: option[tier2Prop], label: option[tier2Prop]},
                    "tier3": {value: option[idProp], label: option[tier3Prop]},
                });
            }
        }
        else {
            setSelection({
                "tier1": selection.tier1,
                "tier2": selection.tier2,
                "tier3": {}
            });
        }
    }, [allOptions, selectedId, selection.tier1, selection.tier2, selection.tier3.value, tier1Prop, tier2Prop, tier3Prop, idProp]);

    useEffect(() => {
        console.log("ThreeTierSelect::useEffect selection", selection);
        const updateTier1Options = () => {
            const tier1Set = new Set();
            allOptions.forEach((option) => tier1Set.add(option[tier1Prop]));
            setTier1Options(Array.from(tier1Set).map(tier1Val => {
                return {"value": tier1Val, "label": tier1Val}; }).sort(sortByLabel));
        };

        const updateTier2AndTier3Options = () => {
            const tier2Set = new Set();
            const tier3Set = new Set();
            allOptions.forEach((option) => {
                if (!selection.tier1?.label || option[tier1Prop] === selection.tier1.label) {
                    tier2Set.add(option[tier2Prop]);
                    if (!selection.tier2?.label || option[tier2Prop] === selection.tier2.label) {
                        tier3Set.add(option[tier3Prop] + "|" + option[idProp]);
                    }
                }
            });
            let tier2Selections = Array.from(tier2Set).map(tier2Value => {
                return {"value": tier2Value, "label": tier2Value};
            }).sort(sortByLabel);
            setTier2Options(tier2Selections);

            let tier3Selections = Array.from(tier3Set).map(tier3Value => {
                return {"value": tier3Value.split("|")[1], "label": tier3Value.split("|")[0]};
            }).sort(sortByLabel);
            setTier3Options(tier3Selections);
        };
        
        console.log("in use effect");
        updateTier1Options();
        updateTier2AndTier3Options();
    }, [allOptions, selection, tier1Prop, tier2Prop, tier3Prop, idProp]);

    return(
        <div className="selections">
            {tier1Title}<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={selection.tier1}
                options={tier1Options}
                onChange={(selection) => setTier1(selection)}>
            </Select>
            {tier2Title}<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={selection.tier2}
                options={tier2Options}
                onChange={(selection) => setTier2(selection)}>
            </Select>
            {tier3Title}<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={selection.tier3}
                options={tier3Options}
                onChange={(selection) => setTier3(selection)}>
            </Select>
        </div>
    );
}
  