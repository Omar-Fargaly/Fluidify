import { useState } from "react";
import Modal from "./modal";

function AddButton() {
    const [isOpen, setIsOpen] = useState(false);
    const handleSave = (name) => {
        console.log('Saved:', name);
        setIsOpen(false);
        alert('saved');
      };
    return (  <>
        <button className="btn mt-1" onClick={() => setIsOpen(true)}>
            <img src="./Add-Button.svg" alt="" className="w-[45px]" />
        </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </>);
}

export default AddButton;