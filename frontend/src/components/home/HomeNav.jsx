import { useState } from "react";
import HomeModal from "./HomeModal";

function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);
    const handleSave = (name) => {
        console.log('Saved:', name);
        setIsOpen(false);
        alert('saved');
        // You can call an API or update parent state here
      };
    return (  <>
        <div className="flex justify-end gap-2 items-center mt-4">
        <button className="btn border rounded-xl px-2 py-1 " onClick={() => setIsOpen(true)}>
            Add
        </button>
        <div>
          Search Will be here
        </div>
        </div>
      <HomeModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </>);
}

export default HomeNav;