import AddButton from "../tasks/addButton";
import LogoutButton from "../tasks/LogoutButton";
import Navitem from "../Navitem";

const NavData = [
    {
        "src": "./Tasks-icon.svg",
        "href": "/dashboard"
    },
    {
        "src": "./Priority-icon.svg",
        "href": "/dashboard"
    },
    {
        "src": "./Calender-icon.svg",
        "href": "/dashboard"
    },
]

function MobileNav() {
    return ( 
        <div className="fixed z-[2] flex justify-between items-center py-5 bottom-0 w-full px-4 bg-black/20 sm:hidden">
        <AddButton />
        <div className="flex gap-4">
            {NavData.map( (item, index) => (
                <Navitem key={index} href={item.href} name={item.src} />
            ))}
        </div>
        <LogoutButton/>
        </div>
     );
}

export default MobileNav;