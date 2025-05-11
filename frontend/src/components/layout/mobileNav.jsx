import AddButton from "../tasks/addButton";



function MobileNav() {
    return ( 
        <div className="fixed z-[2] flex justify-between items-center py-3 bottom-0 w-full px-4 bg-black/20 sm:hidden">
        <AddButton />
        <div className="flex gap-2">
        <AddButton />
        <AddButton />
        <AddButton />
        </div>
        <AddButton />
        </div>
     );
}

export default MobileNav;