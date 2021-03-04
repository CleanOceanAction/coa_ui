import React, {useContext, useEffect, useState} from 'react';

import SelectCustom from "../../components/SelectCustom";
import { Popup, PopupWarning } from "../../components/Popup";
import { postData } from "../../BackendAccessor";
import { userContext } from "../UserContext";

export default function ItemPopup({
        show, onHide, onChange, items, selectedItem
    }) {
    const [material, setMaterial] = useState("");
    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");

    const {userState} = useContext(userContext);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [warning, setWarning] = useState("");

    const onSubmit = (isDone) => {
        console.log("onSubmit");
        
        const existingItem = items.find(item => 
            item["material"] === material
            && item["category"] === category
            && item["item_name"] === itemName);
        if (existingItem) {
            setWarning("Item already exists.");
            return;
        }

        if (selectedItem) {
            updateItem().then(() => {
                onChange();
            });
        }
        else {
            addItem()
            .then(() => {
                onChange();
            });
            clearValues();
        }
        if (isDone) {
            onClose();
        }
    };

    const clearValues = () => {
        setMaterial("");
        setCategory("");
        setItemName("");
    }

    const onClose = () => {
        clearValues();
        onHide();
    };

    const addItem = () => {
        console.log("AddItem");
        const request = generateObj();
        return postData("items/add", request, userState.token)
            .then((response) => {
                return response.json();
            });
    }

    const updateItem = () => {
        console.log("Update Item");
        const request = generateObj();
        request["item_id"] = selectedItem["item_id"];
        return postData("items/update", request, userState.token)
            .then((response) => {
                return response.json();
            });
    };

    const generateObj = () => {
        const obj = {}
        obj["material"] = material;
        obj["category"] = category;
        obj["item_name"] = itemName;
        return obj;
    }

    useEffect(() => {
        console.log("CustomPopup::useEffect selectedItem", selectedItem);
        if (selectedItem) {
            setMaterial(selectedItem["material"]);
            setCategory(selectedItem["category"]);
            setItemName(selectedItem["item_name"]);
        }
        else {
            setMaterial("");
            setCategory("");
            setItemName("");
        }
    }, [selectedItem]);

    useEffect(() => {
        console.log("CustomPopup::useEffect selectedItem", selectedItem);
        if (selectedItem) {
            setSubmitDisabled(
                selectedItem["material"] === material
                && selectedItem["category"] === category
                && selectedItem["item_name"] === itemName);
        }
        else {
            setSubmitDisabled(!material || !category || !itemName);
        }
    }, [selectedItem, material, category, itemName]);

    return(
        <div>
        <Popup
            show={show}
            onHide={onClose}
            title={(selectedItem ? "Update" : "Add")
                    + " Item "}
            body={
                <div>
                    Material
                    <SelectCustom
                        optionList={items}
                        property={"material"}
                        value={material}
                        setValue={setMaterial}
                    />
                    Category
                    <SelectCustom
                        optionList={items}
                        property={"category"}
                        value={category}
                        setValue={setCategory}
                    />
                    Item Name
                    <SelectCustom
                        optionList={items}
                        property={"item_name"}
                        value={itemName}
                        setValue={setItemName}
                    />
                </div>
            }
            submitText={selectedItem ? "Update": "Add"}
            submitDisabled={submitDisabled}
            showAddAnother={!selectedItem}
            onSubmit={onSubmit}
        />
        <PopupWarning
            show={show && !!warning}
            warning={warning}
            onHide={() => {setWarning("");}}
        />
        </div>
    );
} 
